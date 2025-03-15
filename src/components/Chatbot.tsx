
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Send,
  X,
  ChevronDown,
  Bot,
  User,
  Image,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
};

type PromptCategory = {
  name: string;
  prompts: string[];
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 Hi there! I'm your beauty assistant. How can I help you today?",
    isUser: false,
    timestamp: new Date(),
  },
];

const promptCategories: PromptCategory[] = [
  {
    name: "Skin Analysis",
    prompts: [
      "Analyze my skin for acne, dryness, or pigmentation",
      "What's my skin type?",
      "How can I improve my skin texture?",
      "Check for signs of aging on my face",
    ],
  },
  {
    name: "Treatment Recommendations",
    prompts: [
      "Suggest treatments for dark circles",
      "Best treatments for my skin type",
      "Step-by-step skincare routine",
      "Non-invasive anti-aging options",
    ],
  },
  {
    name: "Fashion & Style",
    prompts: [
      "What hairstyle suits my face shape?",
      "Suggest eyewear for my face",
      "Makeup shades for my skin tone",
      "Fashion trends for my body type",
    ],
  },
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(promptCategories[0].name);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const isRelevantQuestion = (question: string): boolean => {
    const relevantKeywords = [
      "skin", "beauty", "cosmetic", "treatment", "fashion", "makeup", "hair", 
      "routine", "product", "eco", "natural", "organic", "sustainable", 
      "skincare", "face", "body", "style", "trend", "website", "app", "application",
      "guide", "recommendation", "planner", "analysis"
    ];
    
    const lowerCaseQuestion = question.toLowerCase();
    return relevantKeywords.some(keyword => lowerCaseQuestion.includes(keyword));
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Generate response based on relevance
    setTimeout(() => {
      let responseContent: string;
      
      if (isRelevantQuestion(newUserMessage.content)) {
        responseContent = generateResponse(newUserMessage.content);
      } else {
        responseContent = "Ask questions or doubt related to fashion, cosmetic treatment and eco friendly treatment for skin and any other queries related to application.";
      }
      
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateResponse = (input: string): string => {
    const responses = [
      "I'd recommend our hydrating serum for dry skin concerns. It contains hyaluronic acid which helps retain moisture.",
      "For your concerns about acne, look for products with salicylic acid or benzoyl peroxide. Our clarifying toner could be a good option.",
      "Based on your skin type, you might benefit from a gentle cleanser followed by a lightweight moisturizer.",
      "That's a great question! For anti-aging concerns, ingredients like retinol, vitamin C, and peptides can be very effective.",
      "If you're looking for makeup recommendations, I'd need to know more about your skin tone and type. Would you like to upload a photo for analysis?",
      "For sustainable beauty options, consider products with minimal packaging and natural ingredients. Our eco-beauty guide has more details.",
      "The current fashion trends include sustainable fabrics and vintage-inspired styles. Check our style section for more inspiration.",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300",
          isOpen ? "bg-gray-200" : "bg-primary text-white"
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
          "fixed right-6 bottom-24 z-50 w-80 sm:w-96 rounded-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out transform origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100"
            : "scale-90 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-[30rem] bg-white border border-gray-200 rounded-xl overflow-hidden">
          {/* Chat Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2" />
              <div>
                <h3 className="font-medium">Beauty Assistant</h3>
                <p className="text-xs opacity-80">Online | AI Powered</p>
              </div>
            </div>
            <button onClick={toggleChat} className="p-1">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("mb-4 max-w-[85%] flex", {
                  "ml-auto": message.isUser,
                })}
              >
                <div
                  className={cn("rounded-xl p-3 relative", {
                    "bg-primary text-white": message.isUser,
                    "bg-white border border-gray-200 shadow-sm": !message.isUser,
                  })}
                >
                  <div className="flex mb-1 items-center">
                    {!message.isUser && (
                      <Bot className="h-4 w-4 mr-1 text-primary" />
                    )}
                    {message.isUser && (
                      <User className="h-4 w-4 mr-1 text-white" />
                    )}
                    <span className="text-xs">
                      {message.isUser ? "You" : "Beauty Assistant"} •{" "}
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center mb-4 max-w-[85%]">
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <div className="flex items-center">
                    <span className="dot-typing"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          {messages.length <= 2 && (
            <div className="p-3 bg-white border-t border-gray-100">
              <div className="flex border-b pb-2 mb-2 overflow-x-auto">
                {promptCategories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setActiveCategory(category.name)}
                    className={cn(
                      "whitespace-nowrap px-3 py-1 mr-2 text-xs rounded-full",
                      activeCategory === category.name
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {promptCategories
                  .find((cat) => cat.name === activeCategory)
                  ?.prompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt)}
                      className="text-xs py-1 px-3 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors whitespace-nowrap"
                    >
                      {prompt}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1">
              <button className="p-1 text-gray-500 hover:text-primary">
                <Image className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 bg-transparent py-2 px-2 outline-none text-sm"
                ref={inputRef}
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === ""}
                className={cn(
                  "p-1 rounded-full",
                  inputValue.trim() === ""
                    ? "text-gray-400"
                    : "text-primary hover:bg-primary/10"
                )}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
        .dot-typing {
          position: relative;
          left: -9999px;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: #9ca3af;
          color: #9ca3af;
          box-shadow: 9984px 0 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
            10014px 0 0 0 #9ca3af;
          animation: dot-typing 1.5s infinite linear;
        }

        @keyframes dot-typing {
          0% {
            box-shadow: 9984px 0 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
              10014px 0 0 0 #9ca3af;
          }
          16.667% {
            box-shadow: 9984px -10px 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
              10014px 0 0 0 #9ca3af;
          }
          33.333% {
            box-shadow: 9984px 0 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
              10014px 0 0 0 #9ca3af;
          }
          50% {
            box-shadow: 9984px 0 0 0 #9ca3af, 9999px -10px 0 0 #9ca3af,
              10014px 0 0 0 #9ca3af;
          }
          66.667% {
            box-shadow: 9984px 0 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
              10014px 0 0 0 #9ca3af;
          }
          83.333% {
            box-shadow: 9984px 0 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
              10014px -10px 0 0 #9ca3af;
          }
          100% {
            box-shadow: 9984px 0 0 0 #9ca3af, 9999px 0 0 0 #9ca3af,
              10014px 0 0 0 #9ca3af;
          }
        }
        `}
      </style>
    </>
  );
};

export default Chatbot;
