
// Fashion Analysis Utilities

// Types for fashion analysis
export interface ColorPalette {
  dominant: string[];
  complementary: string[];
  seasonal: string;
}

export interface StyleProfile {
  primaryStyle: string;
  secondaryStyles: string[];
  bodyTypeRecommendations: string[];
}

export interface TrendAnalysis {
  current: string[];
  upcoming: string[];
  compatibility: number;
}

export interface OutfitItem {
  type: string;
  description: string;
  color: string;
  imageUrl?: string;
}

export interface OutfitSuggestion {
  occasion: string;
  items: OutfitItem[];
}

export interface FashionAnalysisResult {
  colorPalette: ColorPalette;
  styleProfile: StyleProfile;
  trendAnalysis: TrendAnalysis;
  outfitSuggestions: OutfitSuggestion[];
}

/**
 * Simulates analyzing a fashion image to determine color palette, style, and trends
 * Note: This is a mock function that returns predefined results
 * In a real application, this would connect to an AI service
 */
export const analyzeFashionImage = async (imageFile: File): Promise<FashionAnalysisResult> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // This would be replaced with actual AI analysis in a production app
  return {
    colorPalette: {
      dominant: ["Navy Blue", "Cream", "Burgundy"],
      complementary: ["Gold", "Forest Green", "Coral"],
      seasonal: "Autumn"
    },
    styleProfile: {
      primaryStyle: "Classic Elegance",
      secondaryStyles: ["Casual Chic", "Minimalist"],
      bodyTypeRecommendations: [
        "Structured blazers to enhance shoulders",
        "High-waisted bottoms to elongate legs",
        "V-neck tops to create vertical lines"
      ]
    },
    trendAnalysis: {
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
    ]
  };
};

/**
 * Simulates generating personalized style tips based on user preferences and analysis
 */
export const generateStyleTips = (styleProfile: StyleProfile): string[] => {
  // In a real app, this would use AI to generate personalized tips
  
  // Sample tips based on style profile
  const tipsByStyle: Record<string, string[]> = {
    "Classic Elegance": [
      "Invest in high-quality basic pieces that won't go out of style",
      "Choose structured silhouettes over loose, unstructured pieces",
      "Opt for neutral colors with occasional pops of rich, jewel tones",
      "Accessorize with timeless pieces like pearl earrings or a gold watch"
    ],
    "Casual Chic": [
      "Pair comfortable basics with one statement piece",
      "Mix textures to add visual interest to simple outfits",
      "Choose elevated versions of casual classics like premium t-shirts",
      "Use accessories to dress up an otherwise casual look"
    ],
    "Minimalist": [
      "Focus on clean lines and simple silhouettes",
      "Build a capsule wardrobe with versatile pieces that mix and match easily",
      "Choose quality fabrics in a limited color palette",
      "Select architectural jewelry and accessories with geometric shapes"
    ]
  };
  
  let tips: string[] = [];
  
  // Add tips for primary style
  if (styleProfile.primaryStyle in tipsByStyle) {
    tips = [...tipsByStyle[styleProfile.primaryStyle]];
  }
  
  // Add a few tips from secondary styles
  styleProfile.secondaryStyles.forEach(style => {
    if (style in tipsByStyle && tipsByStyle[style].length > 0) {
      tips.push(tipsByStyle[style][0]);
    }
  });
  
  return tips;
};

/**
 * Helper function to match colors to seasonal palettes
 */
export const getSeasonalColorPalette = (season: string): string[] => {
  const seasonalColors: Record<string, string[]> = {
    "Spring": ["Peach", "Coral", "Clear Yellow", "Light Green", "Aqua", "Light Blue"],
    "Summer": ["Powder Blue", "Lavender", "Soft Pink", "Mauve", "Periwinkle", "Slate Gray"],
    "Autumn": ["Olive Green", "Rust", "Gold", "Burnt Orange", "Teal", "Burgundy"],
    "Winter": ["Black", "White", "Navy", "Royal Blue", "Emerald", "True Red"]
  };
  
  return seasonalColors[season] || [];
};

/**
 * Get color code from common color names
 */
export const getColorCode = (colorName: string): string => {
  const colorMap: Record<string, string> = {
    // Neutrals
    "Black": "#000000",
    "White": "#FFFFFF",
    "Gray": "#808080",
    "Silver": "#C0C0C0",
    "Cream": "#FFFDD0",
    "Beige": "#F5F5DC",
    "Tan": "#D2B48C",
    "Brown": "#964B00",
    
    // Blues
    "Navy Blue": "#000080",
    "Royal Blue": "#4169E1",
    "Sky Blue": "#87CEEB",
    "Teal": "#008080",
    "Turquoise": "#40E0D0",
    "Aqua": "#00FFFF",
    "Powder Blue": "#B0E0E6",
    "Periwinkle": "#CCCCFF",
    
    // Reds & Pinks
    "Red": "#FF0000",
    "Burgundy": "#800020",
    "Maroon": "#800000",
    "Coral": "#FF7F50",
    "Pink": "#FFC0CB",
    "Mauve": "#E0B0FF",
    "Rose": "#FF007F",
    "Salmon": "#FA8072",
    
    // Yellows & Oranges
    "Yellow": "#FFFF00",
    "Gold": "#FFD700",
    "Orange": "#FFA500",
    "Peach": "#FFE5B4",
    "Burnt Orange": "#CC5500",
    "Amber": "#FFBF00",
    
    // Greens
    "Green": "#008000",
    "Olive Green": "#556B2F",
    "Forest Green": "#228B22",
    "Lime": "#00FF00",
    "Mint": "#98FB98",
    "Emerald": "#50C878",
    "Sage": "#BCB88A",
    
    // Purples
    "Purple": "#800080",
    "Lavender": "#E6E6FA",
    "Violet": "#8F00FF",
    "Plum": "#8E4585",
    "Indigo": "#4B0082"
  };
  
  return colorMap[colorName] || "#CCCCCC"; // Default to light gray if color not found
};
