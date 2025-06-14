
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  disabled?: boolean;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onTranscript, disabled = false }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if speech recognition is supported
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';
      
      recognitionInstance.onstart = () => {
        setIsListening(true);
      };
      
      recognitionInstance.onend = () => {
        setIsListening(false);
      };
      
      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTranscript(transcript);
        toast({
          title: "Voice captured! 🎤",
          description: `"${transcript}"`,
          duration: 3000,
        });
      };
      
      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        let errorMessage = 'Failed to capture voice';
        switch (event.error) {
          case 'no-speech':
            errorMessage = 'No speech detected. Please try again.';
            break;
          case 'audio-capture':
            errorMessage = 'Microphone access denied or unavailable.';
            break;
          case 'network':
            errorMessage = 'Network error occurred during voice recognition.';
            break;
        }
        
        toast({
          title: "Voice input error",
          description: errorMessage,
          variant: "destructive",
        });
      };
      
      setRecognition(recognitionInstance);
    }
  }, [onTranscript, toast]);

  const startListening = () => {
    if (recognition && !isListening) {
      try {
        recognition.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        toast({
          title: "Voice input error",
          description: "Failed to start voice recognition",
          variant: "destructive",
        });
      }
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
    }
  };

  if (!isSupported) {
    return null; // Don't render if not supported
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={isListening ? stopListening : startListening}
      disabled={disabled}
      className={cn(
        "p-1 transition-all duration-200",
        isListening 
          ? "bg-red-100 text-red-600 hover:bg-red-200 animate-pulse" 
          : "text-gray-500 hover:text-primary hover:bg-primary/10"
      )}
      aria-label={isListening ? "Stop voice input" : "Start voice input"}
      title={isListening ? "Click to stop recording" : "Click and speak your message"}
    >
      {isListening ? (
        <Square className="h-4 w-4 fill-current" />
      ) : (
        <Mic className="h-4 w-4" />
      )}
    </Button>
  );
};

export default VoiceInput;
