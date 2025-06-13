
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
  reviews?: number;
  inStock: boolean;
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
    // Skincare Products
    {
      id: '1',
      name: 'Gentle Foam Cleanser',
      brand: 'EcoGlow',
      category: 'skincare',
      price: 24.99,
      rating: 4.5,
      description: 'A gentle, sulfate-free cleanser perfect for sensitive skin with natural botanicals',
      ingredients: ['Aloe Vera', 'Chamomile', 'Green Tea', 'Coconut-derived surfactants'],
      benefits: ['Gentle cleansing', 'Soothes irritation', 'Maintains skin barrier', 'Removes impurities'],
      suitableFor: ['sensitive', 'dry', 'normal'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 1250,
      inStock: true
    },
    {
      id: '2',
      name: 'Hydrating Serum',
      brand: 'GreenBeauty',
      category: 'skincare',
      price: 45.00,
      rating: 4.8,
      description: 'Intensive hydrating serum with multiple molecular weights of hyaluronic acid',
      ingredients: ['Hyaluronic Acid', 'Vitamin B5', 'Ceramides', 'Niacinamide'],
      benefits: ['Deep hydration', 'Plumps skin', 'Reduces fine lines', 'Improves texture'],
      suitableFor: ['dry', 'combination', 'normal', 'mature'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 2180,
      inStock: true
    },
    {
      id: '3',
      name: 'Vitamin C Brightening Serum',
      brand: 'Pure Radiance',
      category: 'skincare',
      price: 52.00,
      rating: 4.6,
      description: 'Stable vitamin C serum with ferulic acid for maximum antioxidant protection',
      ingredients: ['L-Ascorbic Acid', 'Ferulic Acid', 'Vitamin E', 'Hyaluronic Acid'],
      benefits: ['Brightens skin', 'Reduces dark spots', 'Antioxidant protection', 'Even skin tone'],
      suitableFor: ['normal', 'combination', 'oily'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 890,
      inStock: true
    },
    {
      id: '4',
      name: 'Retinol Night Treatment',
      brand: 'Youth Renewal',
      category: 'skincare',
      price: 68.00,
      rating: 4.4,
      description: 'Gentle retinol treatment with squalane for anti-aging benefits',
      ingredients: ['Retinol', 'Squalane', 'Peptides', 'Ceramides'],
      benefits: ['Anti-aging', 'Reduces fine lines', 'Improves texture', 'Boosts collagen'],
      suitableFor: ['normal', 'combination', 'mature'],
      ecoFriendly: false,
      imageUrl: '/placeholder.svg',
      reviews: 675,
      inStock: true
    },
    {
      id: '5',
      name: 'Niacinamide Pore Refining Serum',
      brand: 'Clear Skin Co',
      category: 'skincare',
      price: 28.00,
      rating: 4.7,
      description: 'Oil-control serum with 10% niacinamide and zinc for pore refinement',
      ingredients: ['Niacinamide', 'Zinc PCA', 'Hyaluronic Acid', 'Witch Hazel'],
      benefits: ['Controls oil', 'Minimizes pores', 'Reduces blemishes', 'Balances skin'],
      suitableFor: ['oily', 'combination', 'acne-prone'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 1560,
      inStock: true
    },
    // Makeup Products
    {
      id: '6',
      name: 'Natural Tinted Moisturizer',
      brand: 'PureGlow',
      category: 'makeup',
      price: 32.00,
      rating: 4.3,
      description: 'Light coverage tinted moisturizer with SPF 30 and natural finish',
      ingredients: ['Zinc Oxide', 'Jojoba Oil', 'Vitamin E', 'Iron Oxides'],
      benefits: ['Light coverage', 'Sun protection', 'Moisturizing', 'Natural finish'],
      suitableFor: ['normal', 'dry', 'sensitive'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 920,
      inStock: true
    },
    {
      id: '7',
      name: 'Cream Blush Palette',
      brand: 'Bloom Beauty',
      category: 'makeup',
      price: 38.00,
      rating: 4.5,
      description: 'Multi-use cream blush palette with buildable, natural-looking colors',
      ingredients: ['Coconut Oil', 'Shea Butter', 'Natural Pigments', 'Vitamin E'],
      benefits: ['Natural flush', 'Buildable color', 'Long-lasting', 'Multi-use'],
      suitableFor: ['all skin types'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 735,
      inStock: true
    },
    {
      id: '8',
      name: 'Mascara - Lengthening Formula',
      brand: 'Lash Perfect',
      category: 'makeup',
      price: 26.00,
      rating: 4.6,
      description: 'Clean mascara formula that lengthens and separates lashes naturally',
      ingredients: ['Rice Bran Wax', 'Carnauba Wax', 'Iron Oxides', 'Vitamin E'],
      benefits: ['Lengthens lashes', 'No clumping', 'Easy removal', 'Flake-free'],
      suitableFor: ['sensitive eyes', 'contact lens wearers'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 1124,
      inStock: true
    },
    // Fragrance Products
    {
      id: '9',
      name: 'Citrus Garden Eau de Parfum',
      brand: 'Nature\'s Essence',
      category: 'fragrance',
      price: 85.00,
      rating: 4.4,
      description: 'Fresh citrus fragrance with bergamot, lemon, and white tea notes',
      ingredients: ['Bergamot Oil', 'Lemon Extract', 'White Tea', 'Cedarwood'],
      benefits: ['Long-lasting', 'Fresh scent', 'Mood boosting', 'Natural ingredients'],
      suitableFor: ['day wear', 'spring/summer'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 456,
      inStock: true
    },
    {
      id: '10',
      name: 'Vanilla Sandalwood Perfume Oil',
      brand: 'Botanical Scents',
      category: 'fragrance',
      price: 42.00,
      rating: 4.7,
      description: 'Warm, comforting fragrance oil with vanilla and sandalwood base',
      ingredients: ['Vanilla Extract', 'Sandalwood Oil', 'Jojoba Oil', 'Amber'],
      benefits: ['Intimate scent', 'Skin-friendly', 'Long-lasting', 'Alcohol-free'],
      suitableFor: ['evening wear', 'sensitive skin'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 312,
      inStock: true
    },
    // Hair Care Products
    {
      id: '11',
      name: 'Nourishing Hair Mask',
      brand: 'Healthy Hair Co',
      category: 'haircare',
      price: 34.00,
      rating: 4.5,
      description: 'Deep conditioning mask with argan oil and keratin for damaged hair',
      ingredients: ['Argan Oil', 'Keratin', 'Shea Butter', 'Coconut Oil'],
      benefits: ['Deep conditioning', 'Repairs damage', 'Adds shine', 'Strengthens hair'],
      suitableFor: ['dry hair', 'damaged hair', 'color-treated'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 834,
      inStock: true
    },
    {
      id: '12',
      name: 'Volumizing Dry Shampoo',
      brand: 'Fresh Roots',
      category: 'haircare',
      price: 18.00,
      rating: 4.3,
      description: 'Natural dry shampoo that adds volume and absorbs excess oil',
      ingredients: ['Rice Starch', 'Kaolin Clay', 'Lavender Oil', 'Rosemary Extract'],
      benefits: ['Absorbs oil', 'Adds volume', 'Fresh scent', 'Extends wash days'],
      suitableFor: ['oily hair', 'fine hair', 'all hair types'],
      ecoFriendly: true,
      imageUrl: '/placeholder.svg',
      reviews: 1089,
      inStock: true
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
        { order: 1, product: 'Gentle cleanser', instruction: 'Cleanse face with lukewarm water for 30 seconds', duration: '2 min' },
        { order: 2, product: 'Hydrating toner', instruction: 'Apply with cotton pad or pat in with hands', duration: '1 min' },
        { order: 3, product: 'Vitamin C serum', instruction: 'Apply 2-3 drops, avoiding eye area', duration: '2 min' },
        { order: 4, product: 'Moisturizer with SPF', instruction: 'Apply evenly, don\'t forget neck and ears', duration: '5 min' }
      ],
      suitableFor: ['sensitive', 'dry', 'normal'],
      benefits: ['Gentle cleansing', 'Hydration', 'Sun protection', 'Antioxidant boost']
    },
    {
      id: '2',
      name: 'Oil Control Evening Routine',
      timeOfDay: 'evening',
      duration: '15 minutes',
      difficulty: 'intermediate',
      steps: [
        { order: 1, product: 'Oil cleanser', instruction: 'Remove makeup and sunscreen thoroughly', duration: '3 min' },
        { order: 2, product: 'Salicylic acid cleanser', instruction: 'Deep clean pores with gentle circular motions', duration: '2 min' },
        { order: 3, product: 'Niacinamide serum', instruction: 'Apply to T-zone and problem areas', duration: '2 min' },
        { order: 4, product: 'Light moisturizer', instruction: 'Hydrate without clogging pores', duration: '3 min' },
        { order: 5, product: 'Spot treatment', instruction: 'Apply to active breakouts only', duration: '5 min' }
      ],
      suitableFor: ['oily', 'combination', 'acne-prone'],
      benefits: ['Deep cleansing', 'Oil control', 'Pore refinement', 'Blemish treatment']
    },
    {
      id: '3',
      name: 'Anti-Aging Night Routine',
      timeOfDay: 'evening',
      duration: '20 minutes',
      difficulty: 'advanced',
      steps: [
        { order: 1, product: 'Gentle cleanser', instruction: 'Remove all traces of makeup and impurities', duration: '3 min' },
        { order: 2, product: 'Exfoliating toner', instruction: 'Use 2-3 times per week only', duration: '2 min' },
        { order: 3, product: 'Retinol serum', instruction: 'Start with once a week, build up gradually', duration: '5 min' },
        { order: 4, product: 'Hydrating serum', instruction: 'Layer over retinol for extra moisture', duration: '5 min' },
        { order: 5, product: 'Night cream', instruction: 'Apply generously to face and neck', duration: '5 min' }
      ],
      suitableFor: ['mature', 'normal', 'combination'],
      benefits: ['Anti-aging', 'Cell renewal', 'Deep hydration', 'Wrinkle reduction']
    },
    {
      id: '4',
      name: 'Sensitive Skin Care',
      timeOfDay: 'evening',
      duration: '12 minutes',
      difficulty: 'beginner',
      steps: [
        { order: 1, product: 'Micellar water', instruction: 'Gently remove makeup without rubbing', duration: '2 min' },
        { order: 2, product: 'Cream cleanser', instruction: 'Massage gently, rinse with cool water', duration: '3 min' },
        { order: 3, product: 'Calming toner', instruction: 'Pat gently, never rub or wipe', duration: '2 min' },
        { order: 4, product: 'Barrier repair serum', instruction: 'Apply to strengthen skin barrier', duration: '5 min' }
      ],
      suitableFor: ['sensitive', 'reactive', 'rosacea-prone'],
      benefits: ['Gentle care', 'Reduces irritation', 'Strengthens barrier', 'Calms redness']
    },
    {
      id: '5',
      name: 'Weekly Deep Treatment',
      timeOfDay: 'weekly',
      duration: '45 minutes',
      difficulty: 'intermediate',
      steps: [
        { order: 1, product: 'Clay mask', instruction: 'Apply to clean skin, avoid eye area', duration: '15 min' },
        { order: 2, product: 'Gentle exfoliant', instruction: 'Use circular motions, rinse thoroughly', duration: '5 min' },
        { order: 3, product: 'Hydrating mask', instruction: 'Apply thick layer, relax and unwind', duration: '20 min' },
        { order: 4, product: 'Face oil', instruction: 'Seal in moisture with 2-3 drops', duration: '5 min' }
      ],
      suitableFor: ['all skin types'],
      benefits: ['Deep cleansing', 'Exfoliation', 'Intensive hydration', 'Skin renewal']
    },
    {
      id: '6',
      name: '5-Minute Quick Refresh',
      timeOfDay: 'morning',
      duration: '5 minutes',
      difficulty: 'beginner',
      steps: [
        { order: 1, product: 'Micellar water', instruction: 'Quick cleanse with cotton pad', duration: '1 min' },
        { order: 2, product: 'Facial mist', instruction: 'Spritz for instant hydration', duration: '1 min' },
        { order: 3, product: 'Tinted moisturizer', instruction: 'Apply for natural coverage and protection', duration: '3 min' }
      ],
      suitableFor: ['busy mornings', 'all skin types'],
      benefits: ['Quick refresh', 'Instant glow', 'Time-saving', 'Effortless beauty']
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

  getProductsByCategory(category: string, limit: number = 9): ProductRecommendation[] {
    const preferences = userPreferencesService.getPreferences();
    
    return this.productDatabase
      .filter(product => category === 'all' || product.category === category)
      .map(product => this.scoreProduct(product, preferences))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  searchProducts(query: string, limit: number = 6): ProductRecommendation[] {
    const preferences = userPreferencesService.getPreferences();
    const searchTerm = query.toLowerCase();
    
    return this.productDatabase
      .filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.benefits.some(benefit => benefit.toLowerCase().includes(searchTerm)) ||
        product.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm))
      )
      .map(product => this.scoreProduct(product, preferences))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, limit);
  }

  private scoreProduct(
    product: Omit<ProductRecommendation, 'matchScore' | 'reasonForRecommendation'>, 
    preferences: UserPreferences
  ): ProductRecommendation {
    let score = 0;
    const reasons: string[] = [];

    // Skin type match (highest priority)
    if (preferences.skinType && product.suitableFor.includes(preferences.skinType)) {
      score += 35;
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

    // Allergies check (penalty for allergens)
    const hasAllergens = preferences.allergies.some(allergy =>
      product.ingredients.some(ingredient =>
        ingredient.toLowerCase().includes(allergy.toLowerCase())
      )
    );
    if (hasAllergens) {
      score -= 30;
      reasons.push('⚠️ Contains allergens you specified');
    }

    // Base score from rating and reviews
    score += product.rating * 5;
    if (product.reviews && product.reviews > 500) {
      score += 5;
      reasons.push(`${product.reviews} verified reviews`);
    }

    // Stock availability
    if (!product.inStock) {
      score -= 20;
      reasons.push('Currently out of stock');
    }

    return {
      ...product,
      matchScore: Math.max(0, Math.min(score, 100)),
      reasonForRecommendation: reasons.length > 0 ? reasons.join(', ') : 'High-quality product with great reviews'
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

    // Difficulty preference (beginners get higher scores for beginner routines)
    if (routine.difficulty === 'beginner') {
      score += 15;
    }

    // Base score
    score += 25;

    return {
      ...routine,
      matchScore: Math.min(score, 100)
    };
  }

  private getBudgetScore(price: number, budgetRange: string): number {
    switch (budgetRange) {
      case 'budget':
        return price <= 30 ? 25 : price <= 50 ? 15 : 5;
      case 'mid-range':
        return price >= 25 && price <= 70 ? 25 : price <= 90 ? 15 : 5;
      case 'luxury':
        return price >= 60 ? 25 : price >= 40 ? 15 : 5;
      default:
        return 10;
    }
  }
}

export const recommendationEngine = new RecommendationEngine();
