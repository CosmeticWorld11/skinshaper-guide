
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Image, Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import VoiceInput from "./VoiceInput";

interface ChatInputProps {
  onSendMessage: (message: string, image?: File) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled = false }) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSend = async () => {
    if (inputValue.trim() === "" && !selectedImage) return;
    
    setIsProcessing(true);
    
    try {
      await onSendMessage(inputValue.trim() || "Please analyze this image", selectedImage || undefined);
      setInputValue("");
      setSelectedImage(null);
      setImagePreview(null);
      
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Message failed to send",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setInputValue(prev => prev + (prev ? " " : "") + transcript);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    toast({
      title: "Voice input captured! 🎤",
      description: "Your speech has been converted to text.",
      duration: 2000,
    });
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
          description: "Please select an image file (JPG, PNG, WebP)",
          variant: "destructive",
        });
        return;
      }

      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      toast({
        title: "Image selected ✨",
        description: `${file.name} ready for analysis`,
      });
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    toast({
      title: "Image removed",
      description: "Image has been deselected",
      duration: 2000,
    });
  };

  const isInputDisabled = disabled || isProcessing;
  const canSend = !isInputDisabled && (inputValue.trim() !== "" || selectedImage);

  return (
    <div className="p-3 bg-white border-t border-gray-200">
      {selectedImage && imagePreview && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Selected Image:</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={removeImage}
              disabled={isProcessing}
              className="h-6 w-6 p-0 hover:bg-red-100"
              aria-label="Remove selected image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <img 
              src={imagePreview} 
              alt="Selected for analysis"
              className="w-16 h-16 object-cover rounded-lg border-2 border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 truncate">{selectedImage.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className={cn(
        "flex items-center rounded-full bg-gray-100 px-3 py-1 transition-all",
        "focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white",
        isProcessing && "opacity-75"
      )}>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageSelect}
          accept="image/*"
          className="hidden"
          aria-label="Upload image for analysis"
        />
        
        <button 
          onClick={() => fileInputRef.current?.click()}
          disabled={isInputDisabled}
          className={cn(
            "p-1 transition-colors rounded-full",
            isInputDisabled 
              ? "text-gray-400 cursor-not-allowed" 
              : "text-gray-500 hover:text-primary hover:bg-primary/10"
          )}
          title="Upload image for skin or style analysis"
          aria-label="Upload image for analysis"
        >
          <Upload className="h-5 w-5" />
        </button>
        
        <VoiceInput 
          onTranscript={handleVoiceTranscript}
          disabled={isInputDisabled}
        />
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={selectedImage ? "Ask about your image..." : "Ask about skincare, beauty, or fashion..."}
          className="flex-1 bg-transparent py-2 px-2 outline-none text-sm text-foreground placeholder:text-gray-500"
          ref={inputRef}
          disabled={isInputDisabled}
          aria-label="Type your beauty question"
        />
        
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={cn(
            "p-1 rounded-full transition-colors min-w-[32px] min-h-[32px] flex items-center justify-center",
            !canSend
              ? "text-gray-400 cursor-not-allowed"
              : "text-primary hover:bg-primary/10"
          )}
          aria-label={selectedImage ? "Send image for analysis" : "Send message"}
          title={selectedImage ? "Send image for analysis" : "Send message"}
        >
          {isProcessing ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 text-center">
        {isProcessing 
          ? "Processing your request..." 
          : "Upload photos, use voice input, or type for personalized beauty advice"
        }
      </div>
    </div>
  );
};

export default ChatInput;
