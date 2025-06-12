
import React from "react";
import { Loader2 } from "lucide-react";

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center mb-4 max-w-[85%] animate-fade-in">
      <div className="bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Loader2 className="h-4 w-4 text-primary animate-spin" />
          <span className="text-xs text-gray-500">Beauty Assistant is thinking...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
