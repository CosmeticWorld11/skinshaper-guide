
// Analysis utilities for skin assessment and recommendations

export interface SkinAnalysisResult {
  skinType: string;
  skinConcerns: string[];
  skinScore: number;
  recommendations: ProductRecommendation[];
}

export interface ProductRecommendation {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  imageUrl: string;
  price: string;
}

/**
 * Simulates analyzing an image to determine skin type and concerns
 * Note: This is a mock function that returns predefined results
 * In a real application, this would connect to an AI service
 */
export const analyzeImage = async (imageFile: File): Promise<SkinAnalysisResult> => {
  // Simulate analysis delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock analysis results - in a real app this would come from AI analysis
  return {
    skinType: "Combination",
    skinConcerns: ["Mild Dryness", "T-Zone Oiliness", "Fine Lines"],
    skinScore: 72,
    recommendations: [
      {
        id: "prod-1",
        name: "Hydrating Serum",
        description: "Intensive hydration serum with hyaluronic acid",
        ingredients: ["Hyaluronic Acid", "Glycerin", "Aloe Vera"],
        benefits: ["Deep hydration", "Plumps skin", "Reduces fine lines"],
        imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        price: "$45.00"
      },
      {
        id: "prod-2",
        name: "Balancing Cleanser",
        description: "Gentle cleanser for combination skin",
        ingredients: ["Salicylic Acid", "Tea Tree Oil", "Chamomile"],
        benefits: ["Removes impurities", "Balances oil production", "Soothes skin"],
        imageUrl: "https://images.unsplash.com/photo-1611930022073-84f3c687a3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        price: "$28.00"
      },
      {
        id: "prod-3",
        name: "Antioxidant Day Cream",
        description: "Protective moisturizer with SPF 30",
        ingredients: ["Vitamin C", "Vitamin E", "Zinc Oxide"],
        benefits: ["Sun protection", "Antioxidant defense", "Hydration"],
        imageUrl: "https://images.unsplash.com/photo-1599305090896-89f40ea92fda?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
        price: "$38.00"
      }
    ]
  };
};

/**
 * Simulates getting personalized skincare routine based on skin analysis
 */
export const getPersonalizedRoutine = (skinType: string, concerns: string[]): {
  morning: string[];
  evening: string[];
  weekly: string[];
} => {
  // Base routines by skin type
  const routines = {
    "Dry": {
      morning: [
        "Gentle Cream Cleanser",
        "Hydrating Toner",
        "Vitamin C Serum",
        "Rich Moisturizer",
        "SPF 30+ Sunscreen"
      ],
      evening: [
        "Oil Cleanser",
        "Gentle Cream Cleanser",
        "Hydrating Toner",
        "Hyaluronic Acid Serum",
        "Night Cream",
        "Facial Oil"
      ],
      weekly: [
        "Gentle Exfoliation (2x per week)",
        "Hydrating Mask (2-3x per week)"
      ]
    },
    "Oily": {
      morning: [
        "Gel Cleanser",
        "Balancing Toner",
        "Lightweight Antioxidant Serum",
        "Oil-Free Moisturizer",
        "SPF 30+ Sunscreen (Oil-Free)"
      ],
      evening: [
        "Micellar Water",
        "Gel Cleanser",
        "Balancing Toner",
        "Niacinamide Serum",
        "Lightweight Gel Moisturizer"
      ],
      weekly: [
        "Clay Mask (1-2x per week)",
        "Chemical Exfoliation with BHA (2x per week)"
      ]
    },
    "Combination": {
      morning: [
        "Gentle Foaming Cleanser",
        "Alcohol-Free Toner",
        "Vitamin C Serum",
        "Lightweight Moisturizer",
        "SPF 30+ Sunscreen"
      ],
      evening: [
        "Micellar Water",
        "Gentle Foaming Cleanser",
        "Alcohol-Free Toner",
        "Hyaluronic Acid Serum",
        "Lightweight Moisturizer (more on dry areas)"
      ],
      weekly: [
        "Clay Mask on T-Zone (1x per week)",
        "Hydrating Mask on Dry Areas (1x per week)",
        "Gentle Exfoliation (2x per week)"
      ]
    },
    "Normal": {
      morning: [
        "Gentle Cleanser",
        "Hydrating Toner",
        "Antioxidant Serum",
        "Lightweight Moisturizer",
        "SPF 30+ Sunscreen"
      ],
      evening: [
        "Micellar Water",
        "Gentle Cleanser",
        "Hydrating Toner",
        "Treatment Serum",
        "Nourishing Moisturizer"
      ],
      weekly: [
        "Exfoliation (2x per week)",
        "Treatment Mask (1x per week)"
      ]
    },
    "Sensitive": {
      morning: [
        "Fragrance-Free Gentle Cleanser",
        "Soothing Toner (Fragrance-Free)",
        "Calming Serum",
        "Gentle Moisturizer",
        "Mineral SPF 30+ Sunscreen"
      ],
      evening: [
        "Fragrance-Free Gentle Cleanser",
        "Soothing Toner (Fragrance-Free)",
        "Calming Serum",
        "Gentle Moisturizer"
      ],
      weekly: [
        "Gentle Enzyme Exfoliation (1x per week)",
        "Soothing Mask (1x per week)"
      ]
    }
  };

  // Start with the base routine for the skin type (default to Normal if type not found)
  const skinTypeKey = skinType as keyof typeof routines;
  const baseRoutine = routines[skinTypeKey] || routines["Normal"];
  
  // Make a copy of the base routine
  const personalizedRoutine = {
    morning: [...baseRoutine.morning],
    evening: [...baseRoutine.evening],
    weekly: [...baseRoutine.weekly]
  };

  // Adjust routine based on concerns
  concerns.forEach(concern => {
    if (concern.includes("Acne") || concern.includes("Breakout")) {
      personalizedRoutine.morning.splice(3, 0, "Salicylic Acid Treatment");
      personalizedRoutine.evening.splice(4, 0, "Benzoyl Peroxide Spot Treatment");
      personalizedRoutine.weekly.push("Anti-Acne Mask (1x per week)");
    }
    
    if (concern.includes("Aging") || concern.includes("Fine Line") || concern.includes("Wrinkle")) {
      personalizedRoutine.evening.splice(4, 0, "Retinol Serum (start 1-2x per week)");
      personalizedRoutine.morning.splice(2, 1, "Vitamin C + Peptide Serum");
      personalizedRoutine.weekly.push("Anti-Aging Mask (1x per week)");
    }
    
    if (concern.includes("Hyperpigmentation") || concern.includes("Dark Spot")) {
      personalizedRoutine.morning.splice(2, 1, "Vitamin C + Niacinamide Serum");
      personalizedRoutine.evening.splice(4, 0, "Alpha Arbutin Serum");
      personalizedRoutine.weekly.push("Brightening Mask (1x per week)");
    }
    
    if (concern.includes("Dryness") || concern.includes("Dehydration")) {
      personalizedRoutine.morning.splice(3, 1, "Rich Moisturizer with Ceramides");
      personalizedRoutine.evening.push("Occlusive Balm (on very dry areas)");
      personalizedRoutine.weekly.push("Intensive Hydrating Mask (2-3x per week)");
    }
    
    if (concern.includes("Oiliness")) {
      personalizedRoutine.morning.splice(3, 1, "Oil-Control Moisturizer");
      personalizedRoutine.evening.splice(4, 0, "Niacinamide Serum");
      personalizedRoutine.weekly.push("Oil-Control Mask (1-2x per week)");
    }
  });

  // Remove duplicates that might have been added
  return {
    morning: [...new Set(personalizedRoutine.morning)],
    evening: [...new Set(personalizedRoutine.evening)],
    weekly: [...new Set(personalizedRoutine.weekly)]
  };
};

/**
 * Simulated function to process and enhance a face image
 * This would connect to an AI service in a real app
 */
export const enhanceFaceImage = async (imageFile: File): Promise<string> => {
  // In a real app, this would send the image to an AI service for processing
  // For now, we'll just return the original image URL
  return URL.createObjectURL(imageFile);
};
