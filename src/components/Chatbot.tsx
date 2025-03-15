
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
  ThumbsUp,
  ThumbsDown,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
};

type PromptCategory = {
  name: string;
  prompts: string[];
};

const initialMessages: Message[] = [
  {
    id: "1",
    content: "👋 Hi there! I'm your beauty assistant. How can I help you today? I can answer questions about skincare, eco-friendly beauty products, fashion, and our website features.",
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

// Define topic-specific responses for more relevant answers
const responsesByTopic = {
  skincare: [
    "For dry skin, I recommend using a hydrating serum with hyaluronic acid followed by a rich moisturizer. Our hydrating collection has several options.",
    "If you're dealing with acne, look for products containing salicylic acid or benzoyl peroxide. Our clarifying toner helps control excess oil and clear pores.",
    "For sensitive skin, it's best to use fragrance-free products with soothing ingredients like aloe vera, chamomile, or centella asiatica.",
    "A good anti-aging routine should include retinol, vitamin C, peptides, and sunscreen. Start with our beginner retinol serum if you're new to these ingredients.",
    "Your skin barrier might be compromised if you're experiencing redness, irritation, and increased sensitivity. Focus on gentle cleansing and barrier repair products.",
  ],
  eco: [
    "Our eco-friendly products use recyclable packaging and sustainably sourced ingredients to minimize environmental impact.",
    "For sustainable beauty options, look for products with minimal packaging and natural, ethically sourced ingredients. Our eco-beauty guide has more details.",
    "Our refillable container program allows you to reduce waste by purchasing only product refills after your initial purchase.",
    "We have a complete line of vegan and cruelty-free products that perform just as well as traditional formulations.",
    "All our eco-friendly products are free from microplastics, harmful preservatives, and synthetic fragrances.",
  ],
  fashion: [
    "Current fashion trends include sustainable fabrics, vintage-inspired pieces, and minimalist designs. Check our style section for more inspiration.",
    "When choosing glasses, consider the opposite shape of your face - round faces pair well with angular frames, while square faces look good with rounded frames.",
    "For your skin tone, I'd recommend warm-toned makeup with golden or peach undertones. Our seasonal color analysis can help you find your perfect palette.",
    "Capsule wardrobes are an excellent way to reduce fashion waste. Focus on high-quality pieces in neutral colors that can be mixed and matched easily.",
    "The most flattering hairstyles for your face shape would emphasize your cheekbones while softening your jawline. Our virtual hair try-on tool can help you visualize options.",
  ],
  application: [
    "You can find the weekly skincare planner by navigating to the 'Skincare Planner' section in the main menu or by going directly to /skincare-planner.",
    "The custom routine builder allows you to create a personalized skincare routine based on your specific needs. Access it through the 'Custom Planner' section.",
    "Our skin analysis tool uses advanced algorithms to assess your skin concerns from uploaded photos and provide tailored recommendations.",
    "You can save your favorite products and routines by creating an account and using the bookmark feature on each item.",
    "The eco-beauty guide section provides information about sustainable beauty practices and environmentally friendly product options.",
  ],
};

// Custom conversation starters based on topics
const conversationStarters = [
  "Tell me about eco-friendly skincare options",
  "How do I build a daily skincare routine?",
  "What makeup trends are popular this season?",
  "Where can I find the skin analysis tool?",
  "What's the difference between serums and moisturizers?",
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>(promptCategories[0].name);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

    // Show inactivity prompt if user hasn't interacted after a while
    if (isOpen && messages.length === 1) {
      const inactivityTimer = setTimeout(() => {
        if (!hasInteracted && messages.length === 1) {
          const suggestionMessage: Message = {
            id: Date.now().toString(),
            content: "Need some ideas? Try asking about skincare routines, eco-friendly products, or fashion trends!",
            isUser: false,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, suggestionMessage]);
        }
      }, 10000); // 10 seconds

      return () => clearTimeout(inactivityTimer);
    }
  }, [isOpen, hasInteracted, messages.length]);

  const isRelevantQuestion = (question: string): boolean => {
    const relevantKeywords = [
      "skin", "beauty", "cosmetic", "treatment", "fashion", "makeup", "hair", 
      "routine", "product", "eco", "natural", "organic", "sustainable", 
      "skincare", "face", "body", "style", "trend", "website", "app", "application",
      "guide", "recommendation", "planner", "analysis", "age", "aging", "wrinkle",
      "pimple", "acne", "dry", "oily", "sensitive", "combination", "sunscreen",
      "moisturizer", "cleanser", "toner", "serum", "retinol", "vitamin c",
      "hyaluronic", "collagen", "exfoliate", "mask", "spf", "uv", "sun",
      "color", "tone", "texture", "pattern", "clothes", "dress", "outfit",
      "seasonal", "vegan", "cruelty-free", "recyclable", "refill", "packaging",
      "ingredients", "clean", "green", "weekly", "daily", "morning", "night"
    ];
    
    const lowerCaseQuestion = question.toLowerCase();
    return relevantKeywords.some(keyword => lowerCaseQuestion.includes(keyword));
  };

  const analyzeQuestionTopic = (question: string): string => {
    const skinKeywords = ["skin", "acne", "dry", "oily", "sensitive", "moisturizer", "cleanser", "toner", "serum", "retinol", "vitamin c", "hyaluronic", "routine", "aging", "wrinkle", "pimple", "texture", "exfoliate", "mask", "sunscreen", "spf"];
    const ecoKeywords = ["eco", "sustainable", "natural", "organic", "vegan", "cruelty-free", "recyclable", "refill", "packaging", "ingredients", "clean", "green"];
    const fashionKeywords = ["fashion", "makeup", "hair", "style", "trend", "color", "tone", "pattern", "clothes", "dress", "outfit", "seasonal", "hairstyle", "eyewear", "face shape", "body type"];
    const appKeywords = ["website", "app", "application", "guide", "recommendation", "planner", "analysis", "weekly", "daily", "morning", "night", "routine", "save", "favorite", "custom"];

    const lowerCaseQuestion = question.toLowerCase();
    
    let maxMatches = 0;
    let bestMatch = "application"; // Default topic

    const topics = [
      { name: "skincare", keywords: skinKeywords },
      { name: "eco", keywords: ecoKeywords },
      { name: "fashion", keywords: fashionKeywords },
      { name: "application", keywords: appKeywords }
    ];

    topics.forEach(topic => {
      const matches = topic.keywords.filter(keyword => lowerCaseQuestion.includes(keyword)).length;
      if (matches > maxMatches) {
        maxMatches = matches;
        bestMatch = topic.name;
      }
    });

    return bestMatch;
  };

  const generateResponse = (input: string): string => {
    // Determine which topic the question belongs to
    const topic = analyzeQuestionTopic(input);
    const topicResponses = responsesByTopic[topic as keyof typeof responsesByTopic];
    
    // Pick a relevant response from the appropriate topic
    return topicResponses[Math.floor(Math.random() * topicResponses.length)];
  };

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

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    setHasInteracted(true);
    
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
    if (!isOpen) {
      // Reset if closing and reopening
      if (messages.length > 5) {
        setMessages(initialMessages);
        setHasInteracted(false);
      }
    }
  };

  const clearChat = () => {
    setMessages(initialMessages);
    setHasInteracted(false);
    toast({
      title: "Chat history cleared",
      description: "Your conversation has been reset.",
      duration: 3000,
    });
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
          "fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 animate-bounce",
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
            <div className="flex items-center">
              <button 
                onClick={clearChat}
                className="p-1 mr-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
                title="Clear chat history"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
              <button 
                onClick={toggleChat} 
                className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
              >
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn("mb-4 max-w-[85%] flex flex-col", {
                  "ml-auto": message.isUser,
                })}
              >
                <div
                  className={cn("rounded-xl p-3 relative animate-fade-in", {
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
                
                {/* Feedback buttons for bot messages */}
                {!message.isUser && (
                  <div className="flex mt-1 self-start">
                    <button 
                      onClick={() => handleFeedback(message.id, true)}
                      className={cn(
                        "p-1 rounded-full mr-1 transition-colors",
                        message.liked 
                          ? "bg-green-100 text-green-600" 
                          : "text-gray-400 hover:text-gray-600"
                      )}
                      aria-label="Helpful response"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <button 
                      onClick={() => handleFeedback(message.id, false)}
                      className={cn(
                        "p-1 rounded-full transition-colors",
                        message.disliked 
                          ? "bg-red-100 text-red-600" 
                          : "text-gray-400 hover:text-gray-600"
                      )}
                      aria-label="Unhelpful response"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center mb-4 max-w-[85%] animate-fade-in">
                <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 text-primary animate-spin" />
                    <span className="text-xs text-gray-500">Beauty Assistant is typing...</span>
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
                      "whitespace-nowrap px-3 py-1 mr-2 text-xs rounded-full transition-colors",
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

          {/* Quick Conversation Starters */}
          {messages.length === 1 && (
            <div className="p-3 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {conversationStarters.map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => handlePromptClick(starter)}
                    className="text-xs py-1 px-3 bg-white border border-gray-200 hover:bg-gray-100 rounded-full text-gray-700 transition-colors whitespace-nowrap shadow-sm"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Chat Input */}
          <div className="p-3 bg-white border-t border-gray-200">
            <div className="flex items-center rounded-full bg-gray-100 px-3 py-1 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white transition-all">
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
