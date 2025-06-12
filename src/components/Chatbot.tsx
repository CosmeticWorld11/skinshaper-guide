
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { geminiService } from "@/services/geminiService";
import { useLocation } from "react-router-dom";

// Import the new chat components
import ChatHeader from "./chat/ChatHeader";
import ChatMessage, { type Message } from "./chat/ChatMessage";
import ChatInput from "./chat/ChatInput";
import TypingIndicator from "./chat/TypingIndicator";
import PromptSuggestions from "./chat/PromptSuggestions";
import ErrorBoundary from "./chat/ErrorBoundary";

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 Hi there! I'm your beauty assistant. How can I help you today? I can answer questions about skincare, eco-friendly beauty products, fashion, and our website features.",
    isUser: false,
    timestamp: new Date(),
  },
];

const STORAGE_KEY = "beauty_assistant_chat";

const Chatbot = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    // Load saved messages from localStorage
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
    return initialMessages;
  });
  
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
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
            content: "Need some ideas? Try asking about skincare routines, eco-friendly products, or fashion trends!",
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
            liked: isPositive ? true : msg.liked,
            disliked: !isPositive ? true : msg.disliked
          };
        }
        return msg;
      })
    );

    toast({
      title: isPositive ? "Thank you for your feedback!" : "We'll improve our responses",
      description: isPositive 
        ? "We're glad our response was helpful." 
        : "Thanks for letting us know. This helps us improve.",
      duration: 3000,
    });
  };

  const handleSendMessage = async (message: string, image?: File) => {
    setHasInteracted(true);
    
    let messageContent = message;
    if (image) {
      messageContent = `${message}\n\n[Image: ${image.name}]`;
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
      // Get website context
      const context = messages
        .slice(0, 5)
        .map(msg => msg.content)
        .join("\n");
      
      const pageContext = `User is currently on page: ${location.pathname}`;
      const fullContext = `${context}\n${pageContext}`;
      
      console.log("Sending request to Gemini API");
      const aiResponse = await geminiService.generateResponse(
        message,
        fullContext
      );
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, newBotMessage]);
    } catch (error) {
      console.error("Error generating response:", error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting to my AI services right now. Please try again later.",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
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
      title: "Chat history cleared",
      description: "Your conversation has been reset.",
      duration: 3000,
    });
  };

  return (
    <ErrorBoundary>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
          isOpen ? "bg-gray-200 hover:bg-gray-300" : "bg-primary text-white hover:bg-primary/90"
        )}
        aria-label="Chat with beauty assistant"
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
      >
        <div className="flex flex-col h-[30rem] bg-white border border-gray-200 rounded-xl overflow-hidden">
          <ChatHeader onClearChat={clearChat} onToggle={toggleChat} />

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
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

          {/* Quick Conversation Starters for brand new chat */}
          {messages.length === 1 && (
            <PromptSuggestions onPromptClick={handlePromptClick} showCategories={false} />
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
