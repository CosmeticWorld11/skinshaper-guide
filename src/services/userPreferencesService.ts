
export interface UserPreferences {
  skinType: 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal' | null;
  skinConcerns: string[];
  favoriteColors: string[];
  budgetRange: 'budget' | 'mid-range' | 'luxury' | null;
  ecoFriendlyPreference: boolean;
  allergies: string[];
  chatHistory: boolean;
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  skinType: null,
  skinConcerns: [],
  favoriteColors: [],
  budgetRange: null,
  ecoFriendlyPreference: true,
  allergies: [],
  chatHistory: true,
  notifications: false,
  darkMode: false,
  language: 'en'
};

const STORAGE_KEY = 'eco_skin_user_preferences';

class UserPreferencesService {
  getPreferences(): UserPreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
      }
    } catch (error) {
      console.error('Error loading user preferences:', error);
    }
    return DEFAULT_PREFERENCES;
  }

  updatePreferences(updates: Partial<UserPreferences>): void {
    try {
      const current = this.getPreferences();
      const updated = { ...current, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      
      // Dispatch custom event for components to listen to
      window.dispatchEvent(new CustomEvent('preferencesUpdated', { 
        detail: updated 
      }));
    } catch (error) {
      console.error('Error saving user preferences:', error);
    }
  }

  clearPreferences(): void {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('preferencesUpdated', { 
      detail: DEFAULT_PREFERENCES 
    }));
  }

  // Get personalized context for AI chat
  getAIContext(): string {
    const prefs = this.getPreferences();
    const context = [];
    
    if (prefs.skinType) {
      context.push(`User has ${prefs.skinType} skin`);
    }
    
    if (prefs.skinConcerns.length > 0) {
      context.push(`Skin concerns: ${prefs.skinConcerns.join(', ')}`);
    }
    
    if (prefs.budgetRange) {
      context.push(`Budget preference: ${prefs.budgetRange}`);
    }
    
    if (prefs.ecoFriendlyPreference) {
      context.push('Prefers eco-friendly products');
    }
    
    if (prefs.allergies.length > 0) {
      context.push(`Allergies: ${prefs.allergies.join(', ')}`);
    }
    
    return context.length > 0 ? context.join('. ') : '';
  }
}

export const userPreferencesService = new UserPreferencesService();
