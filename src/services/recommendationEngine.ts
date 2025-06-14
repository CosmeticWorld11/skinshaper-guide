
import { userPreferencesService, UserPreferences } from './userPreferencesService';

export interface ProductRecommendation {
  id: string;
  name: string;
  brand: string;
  category: 'skincare' | 'makeup' | 'fragrance' | 'haircare';
  price: number;
  rating: number;
  description: string;
  ingredients: string[];
  benefits: string[];
  suitableFor: string[];
  ecoFriendly: boolean;
  imageUrl: string;
  matchScore: number;
  reasonForRecommendation: string;
}

export interface RoutineRecommendation {
  id: string;
  name: string;
  timeOfDay: 'morning' | 'evening' | 'weekly';
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  steps: {
    order: number;
    product: string;
    instruction: string;
    duration?: string;
  }[];
  suitableFor: string[];
  benefits: string[];
  matchScore: number;
}

class RecommendationEngine {
  private readonly productDatabase: Omit<ProductRecommendation, 'matchScore' | 'reasonForRecommendation'>[] = [
    {
      id: '1',
      name: 'Gentle Foam Cleanser',
      brand: 'EcoGlow',
      category: 'skincare',
      price: 24.99,
      rating: 4.5,
      description: 'A gentle, sulfate-free cleanser perfect for sensitive skin',
      ingredients: ['Aloe Vera', 'Chamomile', 'Green Tea'],
      benefits: ['Gentle cleansing', 'Soothes irritation', 'Maintains skin barrier'],
      suitableFor: ['sensitive', 'dry', 'normal'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Hydrating Serum',
      brand: 'GreenBeauty',
      category: 'skincare',
      price: 45.00,
      rating: 4.8,
      description: 'Intensive hydrating serum with hyaluronic acid',
      ingredients: ['Hyaluronic Acid', 'Vitamin B5', 'Ceramides'],
      benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines'],
      suitableFor: ['dry', 'combination', 'mature'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Natural Tinted Moisturizer',
      brand: 'PureGlow',
      category: 'makeup',
      price: 32.00,
      rating: 4.3,
      description: 'Light coverage tinted moisturizer with SPF 20',
      ingredients: ['Zinc Oxide', 'Jojoba Oil', 'Vitamin E'],
      benefits: ['Light coverage', 'Sun protection', 'Moisturizing'],
      suitableFor: ['normal', 'dry', 'sensitive'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg'
    }
  ];

  private readonly routineDatabase: Omit<RoutineRecommendation, 'matchScore'>[] = [
    {
      id: '1',
      name: 'Gentle Morning Routine',
      timeOfDay: 'morning',
      duration: '10 minutes',
      difficulty: 'beginner',
      steps: [
        { order: 1, product: 'Gentle cleanser', instruction: 'Cleanse face with lukewarm water' },
        { order: 2, product: 'Hydrating toner', instruction: 'Apply with cotton pad or pat in with hands' },
        { order: 3, product: 'Moisturizer with SPF', instruction: 'Apply evenly, don\'t forget neck' }
      ],
      suitableFor: ['sensitive', 'dry', 'normal'],
      benefits: ['Gentle cleansing', 'Hydration', 'Sun protection']
    },
    {
      id: '2',
      name: 'Oil Control Evening Routine',
      timeOfDay: 'evening',
      duration: '15 minutes',
      difficulty: 'intermediate',
      steps: [
        { order: 1, product: 'Oil cleanser', instruction: 'Remove makeup and sunscreen' },
        { order: 2, product: 'Salicylic acid cleanser', instruction: 'Deep clean pores' },
        { order: 3, product: 'Niacinamide serum', instruction: 'Apply to control oil production' },
        { order: 4, product: 'Light moisturizer', instruction: 'Hydrate without clogging pores' }
      ],
      suitableFor: ['oily', 'combination'],
      benefits: ['Deep cleansing', 'Oil control', 'Pore refinement']
    }
  ];

  getPersonalizedProductRecommendations(limit: number = 6): ProductRecommendation[] {
    const preferences = userPreferencesService.getPreferences();
    
    return this.productDatabase
      .map(product => this.scoreProduct(product, preferences))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  getPersonalizedRoutineRecommendations(limit: number = 3): RoutineRecommendation[] {
    const preferences = userPreferencesService.getPreferences();
    
    return this.routineDatabase
      .map(routine => this.scoreRoutine(routine, preferences))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  private scoreProduct(
    product: Omit<ProductRecommendation, 'matchScore' | 'reasonForRecommendation'>, 
    preferences: UserPreferences
  ): ProductRecommendation {
    let score = 0;
    const reasons: string[] = [];

    // Skin type match
    if (preferences.skinType && product.suitableFor.includes(preferences.skinType)) {
      score += 30;
      reasons.push(`Perfect for ${preferences.skinType} skin`);
    }

    // Budget preference
    if (preferences.budgetRange) {
      const budgetScore = this.getBudgetScore(product.price, preferences.budgetRange);
      score += budgetScore;
      if (budgetScore > 15) {
        reasons.push(`Fits your ${preferences.budgetRange} budget`);
      }
    }

    // Eco-friendly preference
    if (preferences.ecoFriendlyPreference && product.ecoFriendly) {
      score += 20;
      reasons.push('Eco-friendly choice');
    }

    // Skin concerns match
    preferences.skinConcerns.forEach(concern => {
      if (product.benefits.some(benefit => 
        benefit.toLowerCase().includes(concern.toLowerCase()) ||
        concern.toLowerCase().includes(benefit.toLowerCase())
      )) {
        score += 15;
        reasons.push(`Addresses ${concern.toLowerCase()}`);
      }
    });

    // Base score from rating
    score += product.rating * 4;

    return {
      ...product,
      matchScore: Math.min(score, 100),
      reasonForRecommendation: reasons.length > 0 ? reasons.join(', ') : 'High-quality product'
    };
  }

  private scoreRoutine(
    routine: Omit<RoutineRecommendation, 'matchScore'>, 
    preferences: UserPreferences
  ): RoutineRecommendation {
    let score = 0;

    // Skin type match
    if (preferences.skinType && routine.suitableFor.includes(preferences.skinType)) {
      score += 40;
    }

    // Skin concerns match
    preferences.skinConcerns.forEach(concern => {
      if (routine.benefits.some(benefit => 
        benefit.toLowerCase().includes(concern.toLowerCase())
      )) {
        score += 20;
      }
    });

    // Base score
    score += 30;

    return {
      ...routine,
      matchScore: Math.min(score, 100)
    };
  }

  private getBudgetScore(price: number, budgetRange: string): number {
    switch (budgetRange) {
      case 'budget':
        return price <= 25 ? 25 : price <= 40 ? 15 : 5;
      case 'mid-range':
        return price >= 20 && price <= 60 ? 25 : price <= 80 ? 15 : 5;
      case 'luxury':
        return price >= 50 ? 25 : price >= 30 ? 15 : 5;
      default:
        return 10;
    }
  }
}

export const recommendationEngine = new RecommendationEngine();
