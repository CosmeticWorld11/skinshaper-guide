
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Key, Save, X } from "lucide-react";
import { geminiService } from "@/services/geminiService";
import { toast } from "sonner";

type GeminiApiSetupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
};

const GeminiApiSetup: React.FC<GeminiApiSetupProps> = ({ isOpen, onClose, onSave }) => {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    // Load API key when dialog opens
    if (isOpen) {
      const savedKey = geminiService.getApiKey();
      if (savedKey) {
        setApiKey(savedKey);
      }
    }
  }, [isOpen]);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    geminiService.setApiKey(apiKey.trim());
    toast.success("API key saved successfully");
    onSave();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white text-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Key className="h-5 w-5" />
            Gemini API Key Setup
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your Gemini API key to enable AI-powered responses in the chatbot.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key"
              className="font-mono text-foreground bg-background"
            />
          </div>
          
          <div className="text-xs text-muted-foreground space-y-2">
            <p>
              Get your API key from the{" "}
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Google AI Studio
              </a>
            </p>
            <p>Your API key is stored locally in your browser and is not sent to our servers.</p>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save API Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeminiApiSetup;
