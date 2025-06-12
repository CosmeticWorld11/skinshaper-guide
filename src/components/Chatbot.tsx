import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { geminiService } from "@/services/geminiService";
import { userPreferencesService } from "@/services/userPreferencesService";
import { useLocation } from "react-router-dom";

// Import the chat components
import ChatHeader from "./chat/ChatHeader";
import ChatMessage, { type Message } from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import TypingIndicator from "./chat/TypingIndicator";
import PromptSuggestions from "./chat/PromptSuggestions";
import ErrorBoundary from "./chat/ErrorBoundary";

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 Hi there! I'm your AI beauty assistant. I can help you with:\n\n• **Skin analysis** - Upload photos for personalized advice\n• **Eco-friendly beauty** products and routines\n• **Fashion & style** recommendations\n• **Makeup tips** and color matching\n\nHow can I help you look and feel your best today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const STORAGE_KEY = "beauty_assistant_chat";

const Chatbot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Only load saved messages if user preferences allow it
    const preferences = userPreferencesService.getPreferences();
    if (preferences.chatHistory) {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages, (key, value) => {
            if (key === 'timestamp' && value) {
              return new Date(value);
            }
            return value;
          });
          return parsedMessages;
        } catch (error) {
          console.error("Error parsing saved messages:", error);
          return initialMessages;
        }
      }
    }
    return initialMessages;
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save messages to localStorage only if user preferences allow it
  useEffect(() => {
    const preferences = userPreferencesService.getPreferences();
    if (messages.length > 0 && preferences.chatHistory) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Reset chat position when navigating between pages
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Show inactivity prompt
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      const inactivityTimer = setTimeout(() => {
        if (!hasInteracted && messages.length === 1) {
          const suggestionMessage: Message = {
            id: Date.now().toString(),
            content: "💡 **Try these popular requests:**\n\n• Upload a selfie for skin analysis\n• \"What's the best skincare routine for dry skin?\"\n• \"Show me eco-friendly makeup brands\"\n• \"What colors look best on me?\"",
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => {
            if (!prev.some(msg => msg.content === suggestionMessage.content)) {
              return [...prev, suggestionMessage];
            }
            return prev;
          });
        }
      }, 10000);

      return () => clearTimeout(inactivityTimer);
    }
  }, [isOpen, hasInteracted, messages.length]);

  const handleFeedback = (messageId: string, isPositive: boolean) => {
    setMessages(prev => 
      prev.map(msg => {
        if (msg.id === messageId) {
          return {
            ...msg,
            liked: isPositive ? true : undefined,
            disliked: !isPositive ? true : undefined
          };
        }
        return msg;
      })
    );

    toast({
      title: isPositive ? "Thank you for your feedback! 💖" : "We'll improve our responses",
      description: isPositive 
        ? "We're glad our beauty advice was helpful." 
        : "Thanks for letting us know. This helps us provide better recommendations.",
      duration: 3000,
    });
  };

  const handleSendMessage = async (message: string, image?: File) => {
    setHasInteracted(true);
    
    let messageContent = message;
    if (image) {
      messageContent = `${message}\n\n📷 *[Image attached: ${image.name}]*`;
    }
    
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: messageContent,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsTyping(true);

    try {
      // Get enhanced context with user preferences
      const userContext = userPreferencesService.getAIContext();
      const chatContext = messages
        .slice(-3) // Get last 3 messages for context
        .map(msg => `${msg.isUser ? 'User' : 'Assistant'}: ${msg.content}`)
        .join("\n");
      
      const pageContext = `Current page: ${location.pathname}`;
      const fullContext = [userContext, chatContext, pageContext]
        .filter(Boolean)
        .join("\n");
      
      console.log("Sending request to Gemini API with personalized context");
      const aiResponse = await geminiService.generateResponse(
        message,
        fullContext,
        image
      );
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
      
      if (image) {
        toast({
          title: "Image analyzed successfully! 📸",
          description: "Your photo has been processed for personalized recommendations.",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting to my AI services right now. Please try again in a moment. 🔄",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Unable to process your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setTimeout(() => {
      handleSendMessage(prompt);
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const clearChat = () => {
    setMessages(initialMessages);
    setHasInteracted(false);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Chat history cleared ✨",
      description: "Ready for a fresh beauty consultation!",
      duration: 3000,
    });
  };

  return (
    <ErrorBoundary>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/50",
          isOpen ? "bg-gray-200 hover:bg-gray-300" : "bg-primary text-white hover:bg-primary/90"
        )}
        aria-label={isOpen ? "Close beauty assistant chat" : "Open beauty assistant chat"}
        title={isOpen ? "Close chat" : "Chat with AI Beauty Assistant"}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          "fixed right-6 bottom-24 z-50 w-80 sm:w-96 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform origin-bottom-right bg-white",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        )}
        role="dialog"
        aria-label="Beauty Assistant Chat"
        aria-modal={isOpen}
      >
        <div className="flex flex-col h-[32rem] bg-white border border-gray-200 rounded-xl overflow-hidden">
          <ChatHeader onClearChat={clearChat} onToggle={toggleChat} />

          {/* Chat Messages */}
          <div 
            className="flex-1 overflow-y-auto p-4 bg-gray-50"
            role="log"
            aria-label="Chat messages"
            aria-live="polite"
          >
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
                onFeedback={handleFeedback}
              />
            ))}

            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips for new conversations */}
          {messages.length <= 2 && (
            <PromptSuggestions onPromptClick={handlePromptClick} />
          )}

          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isTyping}
          />
        </div>
      </div>

      <style>
        {`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        `}
      </style>
    </ErrorBoundary>
  );
};

export default Chatbot;
