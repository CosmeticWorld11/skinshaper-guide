
import { GoogleGenerativeAI } from "@google/generative-ai";

class GeminiService {
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    // Built-in API key for ECO Skin Beauty Assistant
    const API_KEY = "AIzaSyBvZxqKoI1V8YHZHf3mQ7XrP9NmLdEfGhI";
    this.genAI = new GoogleGenerativeAI(API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }

  async generateResponse(message: string, context?: string, image?: File): Promise<string> {
    try {
      const systemPrompt = `You are a helpful beauty assistant for ECO Skin, specializing in:
      - Skin analysis and skincare advice
      - Eco-friendly beauty product recommendations
      - Fashion and style guidance
      - Makeup and color analysis
      - Sustainable beauty practices
      
      Current context: ${context || "General beauty consultation"}
      
      Please provide helpful, accurate, and personalized advice. If analyzing an image, be specific about what you observe and provide actionable recommendations.`;

      let prompt = `${systemPrompt}\n\nUser question: ${message}`;

      if (image) {
        // Convert image to base64 for Gemini API
        const imageData = await this.fileToGenerativePart(image);
        const result = await this.model.generateContent([prompt, imageData]);
        const response = await result.response;
        return response.text();
      } else {
        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        return response.text();
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw new Error("Failed to generate response. Please try again.");
    }
  }

  private async fileToGenerativePart(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result as string;
        const base64Content = base64Data.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        resolve({
          inlineData: {
            data: base64Content,
            mimeType: file.type,
          },
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}

export const geminiService = new GeminiService();
