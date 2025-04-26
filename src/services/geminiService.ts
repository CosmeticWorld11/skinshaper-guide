
import { toast } from "sonner";

// Types for Gemini API interaction
export type GeminiMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

type GeminiResponse = {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
    };
    finishReason: string;
  }>;
};

export class GeminiService {
  private apiKey: string | null = null;
  private static instance: GeminiService | null = null;
  
  constructor() {
    // Initialize with default API key
    this.apiKey = "AIzaSyCTq20_yJ2ZLiYiBlCnRGuti5kMLO0GelA";
    console.log("GeminiService initialized with default API key");
  }
  
  // Singleton pattern
  static getInstance(): GeminiService {
    if (!this.instance) {
      this.instance = new GeminiService();
    }
    return this.instance;
  }

  setApiKey(key: string): void {
    if (!key || key.trim() === "") {
      console.error("Attempted to set empty API key");
      return;
    }
    
    this.apiKey = key.trim();
    localStorage.setItem("gemini_api_key", this.apiKey);
    console.log("API key set and saved to localStorage");
    toast.success("API key saved successfully");
  }

  getApiKey(): string | null {
    return this.apiKey;
  }

  clearApiKey(): void {
    this.apiKey = null;
    localStorage.removeItem("gemini_api_key");
    console.log("API key cleared from service and localStorage");
  }

  async generateResponse(prompt: string, context: string = ""): Promise<string> {
    console.log("generateResponse called with prompt:", prompt.substring(0, 20) + '...');
    
    if (!this.apiKey) {
      console.error("No API key available");
      return "Please set your Gemini API key in the settings to use the AI assistant.";
    }
    
    try {
      console.log("Generating response with Gemini API");
      // Create prompt with context
      const fullPrompt = `You are a helpful beauty assistant AI for ECO-Skin.
            
Context about our website: ${context || "We offer eco-friendly beauty products, skincare routines, fashion tips, and personalized product recommendations."}
            
The user's question is: ${prompt}
            
Please provide a helpful, accurate, and friendly response. Focus on skincare, beauty, eco-friendly products, or our website features as appropriate to the question.
If the question is not related to beauty, skincare, fashion, or our website features, politely redirect the conversation.
Keep your answer concise (100 words maximum) and conversational.`;

      // Call Gemini API
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: fullPrompt }]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API error:", errorData);
        
        return "I'm having trouble connecting to my AI services right now. Please try asking a different question.";
      }

      const data = await response.json() as GeminiResponse;
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        console.log("Successfully generated AI response");
        return data.candidates[0].content.parts[0].text;
      } else {
        console.error("Empty or invalid response from Gemini API");
        return "I wasn't able to generate a response. Please try asking a different question.";
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I encountered an error while processing your request. Please try again later.";
    }
  }
}

// Initialize and export the singleton instance
export const geminiService = GeminiService.getInstance();
