
import { toast } from "sonner";
import { mongoDbService } from "./mongoDbService";
import { pipeline, env } from '@huggingface/transformers';
import { ObjectId } from "mongodb";

// Configure transformers.js to always download models
env.allowLocalModels = false;
env.useBrowserCache = false;

const MAX_IMAGE_DIMENSION = 1024;

function resizeImageIfNeeded(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, image: HTMLImageElement) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;

  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }

    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(image, 0, 0, width, height);
    return true;
  }

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(image, 0, 0);
  return false;
}

export interface AnalysisResult {
  colorAnalysis: {
    dominant: string[];
    complementary: string[];
    seasonal: string;
  };
  styleMatch: {
    primaryStyle: string;
    secondaryStyles: string[];
    bodyTypeRecommendations: string[];
  };
  trendReport: {
    current: string[];
    upcoming: string[];
    compatibility: number;
  };
  outfitSuggestions: {
    occasion: string;
    items: {
      type: string;
      description: string;
      color: string;
    }[];
  }[];
  userId: string;
  createdAt: Date;
  imageUrl?: string;
}

export class FashionAnalysisService {
  private static instance: FashionAnalysisService | null = null;
  
  static getInstance(): FashionAnalysisService {
    if (!this.instance) {
      this.instance = new FashionAnalysisService();
    }
    return this.instance;
  }
  
  async analyzeImage(imageElement: HTMLImageElement, userId: string): Promise<AnalysisResult> {
    try {
      toast.info("Starting image analysis...");
      console.log('Starting fashion analysis process...');
      
      // Use the segmentation model to identify clothing items
      const segmenter = await pipeline('image-segmentation', 'Xenova/segformer-b0-finetuned-ade-512-512', {
        device: 'webgpu',
      });
      
      // Convert HTMLImageElement to canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) throw new Error('Could not get canvas context');
      
      // Resize image if needed and draw it to canvas
      const wasResized = resizeImageIfNeeded(canvas, ctx, imageElement);
      console.log(`Image ${wasResized ? 'was' : 'was not'} resized. Final dimensions: ${canvas.width}x${canvas.height}`);
      
      // Get image data as base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      console.log('Image converted to base64');
      
      // Process the image with the segmentation model
      console.log('Processing with segmentation model...');
      
      toast.info("Analyzing image segments...");
      const segments = await segmenter(imageData);
      console.log('Segmentation result:', segments);
      
      // For now, return mock data while AI model processes
      // In a real implementation, we would analyze the segments to determine colors, styles, etc.
      const result: AnalysisResult = {
        colorAnalysis: {
          dominant: ["Navy Blue", "Cream", "Burgundy"],
          complementary: ["Gold", "Forest Green", "Coral"],
          seasonal: "Autumn"
        },
        styleMatch: {
          primaryStyle: "Classic Elegance",
          secondaryStyles: ["Casual Chic", "Minimalist"],
          bodyTypeRecommendations: [
            "Structured blazers to enhance shoulders",
            "High-waisted bottoms to elongate legs",
            "V-neck tops to create vertical lines"
          ]
        },
        trendReport: {
          current: ["Oversized Silhouettes", "Earth Tones", "Sustainable Fabrics"],
          upcoming: ["Digital Prints", "Vintage Revival", "Statement Sleeves"],
          compatibility: 85
        },
        outfitSuggestions: [
          {
            occasion: "Casual Day Out",
            items: [
              { type: "Top", description: "Cream silk blouse", color: "#F8F4E3" },
              { type: "Bottom", description: "Navy tailored trousers", color: "#1B2A41" },
              { type: "Shoes", description: "Tan leather loafers", color: "#AD8E70" },
              { type: "Accessory", description: "Gold pendant necklace", color: "#D4AF37" }
            ]
          },
          {
            occasion: "Work Meeting",
            items: [
              { type: "Dress", description: "Burgundy wrap dress", color: "#800020" },
              { type: "Outerwear", description: "Classic beige trench coat", color: "#E8DCCA" },
              { type: "Shoes", description: "Black pointed heels", color: "#000000" },
              { type: "Accessory", description: "Structured leather bag", color: "#5D4037" }
            ]
          }
        ],
        userId: userId,
        createdAt: new Date()
      };
      
      // Save the analysis result to MongoDB
      try {
        const analysisCollection = await mongoDbService.getCollection("fashionAnalysis");
        await analysisCollection.insertOne(result);
        console.log("Analysis saved to database");
      } catch (dbError) {
        console.error("Error saving analysis to database:", dbError);
        // Continue even if saving to DB fails
      }
      
      toast.success("Analysis completed successfully!");
      return result;
    } catch (error) {
      console.error('Error in fashion analysis:', error);
      toast.error("Error analyzing image. Please try again.");
      throw error;
    }
  }
  
  async loadImage(file: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  }
  
  async getUserAnalyses(userId: string): Promise<AnalysisResult[]> {
    try {
      const analysisCollection = await mongoDbService.getCollection("fashionAnalysis");
      const analyses = await analysisCollection.find({ userId }).sort({ createdAt: -1 }).toArray();
      return analyses as unknown as AnalysisResult[];
    } catch (error) {
      console.error("Error fetching user analyses:", error);
      return [];
    }
  }
  
  async getAnalysisById(analysisId: string): Promise<AnalysisResult | null> {
    try {
      const analysisCollection = await mongoDbService.getCollection("fashionAnalysis");
      const analysis = await analysisCollection.findOne({ _id: mongoDbService.toObjectId(analysisId) });
      return analysis as unknown as AnalysisResult;
    } catch (error) {
      console.error("Error fetching analysis by ID:", error);
      return null;
    }
  }
}

export const fashionAnalysisService = FashionAnalysisService.getInstance();
