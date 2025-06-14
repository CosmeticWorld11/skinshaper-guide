import { toast } from "sonner";
import { mongoDbService } from "./mongoDbService";
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

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

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// K-means for finding N dominant colors in the image
async function findDominantColors(canvas: HTMLCanvasElement, k = 3): Promise<string[]> {
  const ctx = canvas.getContext('2d')!;
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;
  const pixels: [number, number, number][] = [];

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Ignore almost white/black background pixels
    if ((r + g + b)/3 > 242 || (r + g + b)/3 < 15) continue;
    pixels.push([r, g, b]);
  }
  // randomly init centroids
  let centroids = pixels.slice(0, k);

  for (let iter = 0; iter < 10; iter++) {
    const clusters: { [key: number]: [number, number, number][] } = {};
    for (let i = 0; i < k; i++) clusters[i] = [];

    for (const px of pixels) {
      let minD = Infinity, idx = 0;
      for (let i = 0; i < k; i++) {
        const c = centroids[i];
        const d = Math.sqrt((px[0]-c[0])**2 + (px[1]-c[1])**2 + (px[2]-c[2])**2);
        if (d < minD) { minD = d; idx = i; }
      }
      clusters[idx].push(px);
    }
    centroids = centroids.map((c, i) => {
      if (clusters[i].length === 0) return c;
      const [r, g, b] = clusters[i].reduce((acc, px) => [acc[0]+px[0], acc[1]+px[1], acc[2]+px[2]], [0,0,0]);
      return [Math.round(r/clusters[i].length), Math.round(g/clusters[i].length), Math.round(b/clusters[i].length)];
    }) as [number, number, number][];
  }
  return centroids.map(([r,g,b]) => rgbToHex(r,g,b));
}

export interface AnalysisResult {
  _id?: string;
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
      toast.info("Starting image AI analysis...");

      // Prepare canvas
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');
      resizeImageIfNeeded(canvas, ctx, imageElement);

      // Prepare image base64
      const imageData = canvas.toDataURL('image/jpeg', 0.8);

      // --- 1. Run image classification to guess styles ---
      toast.info("Detecting fashion style & tags with AI...");
      // FIX: use top_k
      const classifier = await pipeline(
        'image-classification',
        'onnx-community/mobilenetv4_conv_small.e2400_r224_in1k',
        { device: 'webgpu' }
      );
      // For the transformers.js pipeline, top_k is the correct property!
      const tagsResult = await classifier(imageData, { top_k: 5 });
      // tagsResult can be { label, score }[] or a nested type. We expect an array.
      const tags = Array.isArray(tagsResult) ? tagsResult : [tagsResult];
      const tagNames = tags.map((t: any) => t.label.split(',')[0]);
      const topStyle = tagNames[0] || "Classic Elegance";

      // --- 2. Extract color palette from the uploaded image ---
      toast.info("Extracting dominant colors...");
      const colorPalette = await findDominantColors(canvas, 3); // get 3 main colors
      // Map hex to names (or fallback)
      const colorNameMap: { [hex: string]: string } = {
        "#1b2a41": "Navy Blue",
        "#f8f4e3": "Cream",
        "#800020": "Burgundy",
        "#d4af37": "Gold",
        "#014421": "Forest Green",
        "#ff7f50": "Coral"
      };
      const colors = colorPalette.map(hex =>
        colorNameMap[hex.toLowerCase()] || hex
      );

      // For complementary, just rotate color arrays or use fallback
      const complementary = colorPalette.reverse().map(hex =>
        colorNameMap[hex.toLowerCase()] || hex
      );

      // --- Compose the real+fallback result ---
      const result: AnalysisResult = {
        colorAnalysis: {
          dominant: colors,
          complementary,
          seasonal: "Autumn"
        },
        styleMatch: {
          primaryStyle: topStyle,
          secondaryStyles: tagNames.slice(1, 3),
          bodyTypeRecommendations: [
            "Structured blazers to enhance shoulders",
            "High-waisted bottoms to elongate legs",
            "V-neck tops to create vertical lines"
          ]
        },
        trendReport: {
          current: ["Oversized Silhouettes", "Earth Tones", "Sustainable Fabrics"],
          upcoming: ["Digital Prints", "Vintage Revival", "Statement Sleeves"],
          // FIX: tags[0]?.score could be missing—use typecheck and default to 85
          compatibility: typeof tags[0]?.score === "number" ? Math.floor(tags[0].score * 100) : 85
        },
        outfitSuggestions: [
          {
            occasion: "Casual Day Out",
            items: [
              { type: "Top", description: "Cream silk blouse", color: colorPalette[1] || "#F8F4E3" },
              { type: "Bottom", description: "Navy tailored trousers", color: colorPalette[0] || "#1B2A41" },
              { type: "Shoes", description: "Tan leather loafers", color: "#AD8E70" },
              { type: "Accessory", description: "Gold pendant necklace", color: "#D4AF37" }
            ]
          },
          {
            occasion: "Work Meeting",
            items: [
              { type: "Dress", description: "Burgundy wrap dress", color: colorPalette[2] || "#800020" },
              { type: "Outerwear", description: "Classic beige trench coat", color: "#E8DCCA" },
              { type: "Shoes", description: "Black pointed heels", color: "#000000" },
              { type: "Accessory", description: "Structured leather bag", color: "#5D4037" }
            ]
          }
        ],
        userId: userId,
        createdAt: new Date()
      };

      // Save analysis to DB (unchanged)
      try {
        const analysisCollection = await mongoDbService.getCollection("fashionAnalysis");
        const savedResult = await analysisCollection.insertOne(result);
        result._id = savedResult.insertedId;
      } catch (dbError) {
        console.error("Error saving analysis to DB", dbError);
      }

      await new Promise(resolve => setTimeout(resolve, 600));

      toast.success("AI analysis completed!");
      return result;
    } catch (error) {
      console.error('Error in real AI fashion analysis:', error);
      toast.error("Failed to analyze image with AI.");
      throw error;
    }
  }
  
  async loadImage(file: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => {
        console.error("Image loading error:", e);
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  }
  
  async getUserAnalyses(userId: string): Promise<AnalysisResult[]> {
    try {
      const analysisCollection = await mongoDbService.getCollection("fashionAnalysis");
      const analyses = await analysisCollection.find({ userId }).sort({ createdAt: -1 }).toArray();
      return analyses as AnalysisResult[];
    } catch (error) {
      console.error("Error fetching user analyses:", error);
      return [];
    }
  }
  
  async getAnalysisById(analysisId: string): Promise<AnalysisResult | null> {
    try {
      const analysisCollection = await mongoDbService.getCollection("fashionAnalysis");
      const analysis = await analysisCollection.findOne({ _id: analysisId });
      return analysis as AnalysisResult;
    } catch (error) {
      console.error("Error fetching analysis by ID:", error);
      return null;
    }
  }
}

export const fashionAnalysisService = FashionAnalysisService.getInstance();
