
import React, { useState, useEffect } from 'react';
import { Settings, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { userPreferencesService, UserPreferences } from '@/services/userPreferencesService';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const UserPreferencesPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(
    userPreferencesService.getPreferences()
  );
  const { toast } = useToast();

  useEffect(() => {
    const handlePreferencesUpdate = (event: CustomEvent) => {
      setPreferences(event.detail);
    };

    window.addEventListener('preferencesUpdated', handlePreferencesUpdate as EventListener);
    return () => {
      window.removeEventListener('preferencesUpdated', handlePreferencesUpdate as EventListener);
    };
  }, []);

  const handleSave = () => {
    userPreferencesService.updatePreferences(preferences);
    setIsOpen(false);
    toast({
      title: "Preferences saved! ✨",
      description: "Your beauty preferences have been updated.",
      duration: 3000,
    });
  };

  const skinConcernsOptions = [
    'Acne', 'Dark circles', 'Fine lines', 'Hyperpigmentation', 
    'Large pores', 'Dryness', 'Oiliness', 'Sensitivity', 'Dullness'
  ];

  const handleSkinConcernChange = (concern: string, checked: boolean) => {
    setPreferences(prev => ({
      ...prev,
      skinConcerns: checked 
        ? [...prev.skinConcerns, concern]
        : prev.skinConcerns.filter(c => c !== concern)
    }));
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 p-2 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors"
        aria-label="Open preferences"
        title="Beauty Preferences"
      >
        <Settings className="h-5 w-5 text-gray-600" />
      </button>

      {/* Preferences Panel */}
      <div
        className={cn(
          "fixed inset-0 z-50 transition-all duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Panel */}
        <div className={cn(
          "absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 overflow-y-auto",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Beauty Preferences</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Skin Type */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Skin Type</Label>
                <Select 
                  value={preferences.skinType || ""} 
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, skinType: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your skin type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="dry">Dry</SelectItem>
                    <SelectItem value="oily">Oily</SelectItem>
                    <SelectItem value="combination">Combination</SelectItem>
                    <SelectItem value="sensitive">Sensitive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Skin Concerns */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Skin Concerns</Label>
                <div className="grid grid-cols-2 gap-2">
                  {skinConcernsOptions.map((concern) => (
                    <div key={concern} className="flex items-center space-x-2">
                      <Checkbox
                        id={concern}
                        checked={preferences.skinConcerns.includes(concern)}
                        onCheckedChange={(checked) => handleSkinConcernChange(concern, !!checked)}
                      />
                      <Label htmlFor={concern} className="text-xs">{concern}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Budget Preference</Label>
                <Select 
                  value={preferences.budgetRange || ""} 
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, budgetRange: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget-friendly</SelectItem>
                    <SelectItem value="mid-range">Mid-range</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preferences Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Eco-friendly products</Label>
                  <Switch
                    checked={preferences.ecoFriendlyPreference}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, ecoFriendlyPreference: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Save chat history</Label>
                  <Switch
                    checked={preferences.chatHistory}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, chatHistory: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label className="text-sm">Enable notifications</Label>
                  <Switch
                    checked={preferences.notifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, notifications: checked }))}
                  />
                </div>
              </div>

              {/* Save Button */}
              <Button onClick={handleSave} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPreferencesPanel;
