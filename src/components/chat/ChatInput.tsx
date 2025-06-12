
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Image, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = () => {
    if (inputValue.trim() === "" && !selectedImage) return;
    
    onSendMessage(inputValue.trim() || "Please analyze this image", selectedImage || undefined);
    setInputValue("");
    setSelectedImage(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      toast({
        title: "Image selected",
        description: `${file.name} ready to send`,
      });
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-3 bg-white border-t border-gray-200">
      {selectedImage && (
        <div className="mb-3 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <Image className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-700 truncate max-w-[200px]">
              {selectedImage.name}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeImage}
            className="h-6 w-6 p-0"
          >
            ×
          </Button>
        </div>
      )}
      
      <div className="flex items-center rounded-full bg-gray-100 px-3 py-1 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white transition-all">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
        />
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="p-1 text-gray-500 hover:text-primary transition-colors"
          title="Upload image for analysis"
          aria-label="Upload image"
        >
          <Upload className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question or upload an image..."
          className="flex-1 bg-transparent py-2 px-2 outline-none text-sm text-foreground"
          ref={inputRef}
          disabled={disabled}
        />
        <button
          onClick={handleSend}
          disabled={disabled || (inputValue.trim() === "" && !selectedImage)}
          className={cn(
            "p-1 rounded-full transition-colors",
            disabled || (inputValue.trim() === "" && !selectedImage)
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          )}
          aria-label="Send message"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
