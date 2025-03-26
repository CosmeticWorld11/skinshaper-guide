
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load API key when dialog opens
    if (isOpen) {
      const savedKey = geminiService.getApiKey();
      if (savedKey) {
        setApiKey(savedKey);
        console.log("Loaded existing API key into dialog");
      }
    }
  }, [isOpen]);

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    setIsLoading(true);
    console.log("Testing API key before saving:", apiKey.substring(0, 5) + '...');
    
    try {
      // Test the API key with a simple request before saving
      const testResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.0-pro:generateContent?key=${apiKey.trim()}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: "Hello" }]
              }
            ],
            generationConfig: {
              maxOutputTokens: 10,
            },
          }),
        }
      );
      
      if (!testResponse.ok) {
        const errorData = await testResponse.json();
        console.error("API key test failed:", errorData);
        toast.error("Invalid API key. Please check and try again.");
        setIsLoading(false);
        return;
      }
      
      // If we reached here, the key is valid
      console.log("API key verified successfully, saving");
      geminiService.setApiKey(apiKey.trim());
      toast.success("API key verified and saved successfully");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error testing API key:", error);
      toast.error("Could not verify the API key. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Allow direct entry of predefined key for testing
  const handleSetTestKey = () => {
    const testKey = "AIzaSyCznpxXJOb4zPeU3aSxGFL3si7MtbbPYTs"; // The key provided in the question
    setApiKey(testKey);
    console.log("Set test key in input field");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-background text-foreground">
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
              className="font-mono text-foreground bg-background border-input"
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSetTestKey}
              className="mt-2 text-xs"
            >
              Use Test Key
            </Button>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button variant="ghost" onClick={onClose} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="mr-2">Verifying...</span>
                <span className="animate-spin">⋯</span>
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save API Key
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeminiApiSetup;
