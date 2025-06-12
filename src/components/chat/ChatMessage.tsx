
import React from "react";
import { Bot, User, ThumbsUp, ThumbsDown } from "lucide-react";
import { cn } from "@/lib/utils";
import MarkdownRenderer from "./MarkdownRenderer";

export type Message = {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  liked?: boolean;
  disliked?: boolean;
};

interface ChatMessageProps {
  message: Message;
  onFeedback: (messageId: string, isPositive: boolean) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, onFeedback }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className={cn("mb-4 max-w-[85%] flex flex-col animate-fade-in", {
        "ml-auto": message.isUser,
      })}
    >
      <div
        className={cn("rounded-xl p-3 relative", {
          "bg-primary text-primary-foreground": message.isUser,
          "bg-white border border-gray-200 shadow-sm text-foreground": !message.isUser,
        })}
      >
        <div className="flex mb-1 items-center">
          {!message.isUser && (
            <Bot className="h-4 w-4 mr-1 text-primary" />
          )}
          {message.isUser && (
            <User className="h-4 w-4 mr-1 text-primary-foreground" />
          )}
          <span className="text-xs">
            {message.isUser ? "You" : "Beauty Assistant"} •{" "}
            {formatTime(message.timestamp)}
          </span>
        </div>
        
        {/* Use markdown renderer for bot messages, simple text for user messages */}
        {message.isUser ? (
          <div 
            className="text-sm"
            dangerouslySetInnerHTML={{ 
              __html: message.content.replace(/\n/g, '<br>') 
            }}
          />
        ) : (
          <MarkdownRenderer 
            content={message.content} 
            className="text-sm text-inherit"
          />
        )}
      </div>
      
      {/* Feedback buttons for bot messages */}
      {!message.isUser && (
        <div className="flex mt-1 self-start">
          <button 
            onClick={() => onFeedback(message.id, true)}
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
            onClick={() => onFeedback(message.id, false)}
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
  );
};

export default ChatMessage;
