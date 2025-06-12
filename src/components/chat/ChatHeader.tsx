
import React from "react";
import { Sparkles, RefreshCw, ChevronDown } from "lucide-react";

interface ChatHeaderProps {
  onClearChat: () => void;
  onToggle: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onClearChat, onToggle }) => {
  return (
    <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 mr-2" />
        <div>
          <h3 className="font-medium">Beauty Assistant</h3>
          <p className="text-xs opacity-80">AI Powered by Gemini</p>
        </div>
      </div>
      <div className="flex items-center">
        <button 
          onClick={onClearChat}
          className="p-1 mr-2 hover:bg-primary-foreground/20 rounded-full transition-colors"
          title="Clear chat history"
          aria-label="Clear chat history"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
        <button 
          onClick={onToggle} 
          className="p-1 hover:bg-primary-foreground/20 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
