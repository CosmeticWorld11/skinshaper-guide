
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Sun, Moon, CircleCheck, ChevronDown, PenLine } from "lucide-react";
import { Link } from "react-router-dom";

const routines = [
  {
    type: "Oily & Acne-Prone Skin",
    exfoliation: {
      days: "Tuesday & Friday",
      treatment: "Oat & Yogurt Scrub to unclog pores."
    },
    mask: {
      days: "Wednesday & Saturday",
      treatment: "Charcoal & Clay Mask to detoxify."
    },
    selfCare: {
      day: "Sunday",
      treatment: "Green Tea & Aloe Soothing Treatment for acne scars."
    }
  },
  {
    type: "Dry & Dehydrated Skin",
    exfoliation: {
      days: "Tuesday & Friday",
      treatment: "Brown Sugar & Honey Scrub for gentle hydration."
    },
    mask: {
      days: "Wednesday & Saturday",
      treatment: "Avocado & Honey Hydration Mask."
    },
    selfCare: {
      day: "Sunday",
      treatment: "Overnight Shea Butter & Vitamin E Treatment."
    }
  },
  {
    type: "Combination Skin",
    exfoliation: {
      days: "Tuesday & Friday",
      treatment: "Rice Flour & Honey Scrub for balancing."
    },
    mask: {
      days: "Wednesday & Saturday",
      treatment: "Papaya & Rose Water Mask for brightening."
    },
    selfCare: {
      day: "Sunday",
      treatment: "Facial Massage with Jojoba Oil."
    }
  },
  {
    type: "Sensitive Skin",
    exfoliation: {
      days: "Tuesday only (once per week)",
      treatment: "Ground Oats & Almond Oil Scrub (super gentle)."
    },
    mask: {
      days: "Wednesday & Saturday",
      treatment: "Aloe & Cucumber Soothing Mask."
    },
    selfCare: {
      day: "Sunday",
      treatment: "Chamomile Tea Ice Cube Facial for calming redness."
    }
  },
  {
    type: "Mature & Anti-Aging Skin",
    exfoliation: {
      days: "Tuesday & Friday",
      treatment: "Coffee & Honey Scrub to stimulate collagen."
    },
    mask: {
      days: "Wednesday & Saturday",
      treatment: "Banana & Yogurt Firming Mask."
    },
    selfCare: {
      day: "Sunday",
      treatment: "Rosehip Oil & Gua Sha Facial Massage for anti-aging benefits."
    }
  }
];

const SkincareRoutinePlanner = () => {
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  
  const handleSelectSkinType = (skinType: string) => {
    setSelectedSkinType(skinType === selectedSkinType ? null : skinType);
  };

  return (
    <div className="min-h-screen bg-background" data-testid="skincare-planner-page">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
              Weekly Skincare Planner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sustainable & Natural Beauty Schedule for Your Skin Type
            </p>
          </div>
          
          <div className="flex justify-center mb-8">
            <Link to="/custom-planner">
              <Button className="rounded-full gap-2">
                <PenLine className="h-4 w-4" />
                Create Your Custom Routine
              </Button>
            </Link>
          </div>
          
          <div className="glass-card rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-6">Daily Skincare Routine</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-skin-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-skin-100 p-2 rounded-full">
                    <Sun className="h-5 w-5 text-skin-700" />
                  </div>
                  <h3 className="text-xl font-medium">Morning Routine</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Gentle Cleanser</p>
                      <p className="text-sm text-muted-foreground">Use a natural cleanser for your skin type</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Hydrating Toner</p>
                      <p className="text-sm text-muted-foreground">Balance pH and prep skin for moisturizer</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Moisturizer</p>
                      <p className="text-sm text-muted-foreground">Lock in hydration with natural ingredients</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Mineral Sunscreen</p>
                      <p className="text-sm text-muted-foreground">Apply SPF 30+ (even on cloudy days)</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blush-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blush-100 p-2 rounded-full">
                    <Moon className="h-5 w-5 text-blush-700" />
                  </div>
                  <h3 className="text-xl font-medium">Evening Routine</h3>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Oil or Cream Cleanser</p>
                      <p className="text-sm text-muted-foreground">Remove makeup and impurities</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Second Cleanse (Optional)</p>
                      <p className="text-sm text-muted-foreground">Gentle water-based cleanser</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Toner</p>
                      <p className="text-sm text-muted-foreground">Balance skin's pH</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="font-medium">Night Treatment</p>
                      <p className="text-sm text-muted-foreground">Rich moisturizer or facial oil</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-serif font-semibold mb-6">Weekly Skincare Plans by Skin Type</h2>
          
          <div className="space-y-4 mb-12">
            {routines.map((routine, index) => (
              <div 
                key={index} 
                className={`glass-card rounded-xl overflow-hidden transition-all duration-300 ${selectedSkinType === routine.type ? 'ring-2 ring-primary' : ''}`}
              >
                <div 
                  className="flex items-center justify-between p-5 cursor-pointer"
                  onClick={() => handleSelectSkinType(routine.type)}
                >
                  <h3 className="text-lg font-medium">{routine.type}</h3>
                  <ChevronDown className={`h-5 w-5 transition-transform ${selectedSkinType === routine.type ? 'rotate-180' : ''}`} />
                </div>
                
                {selectedSkinType === routine.type && (
                  <div className="p-5 pt-0 border-t border-skin-100 animate-fade-in">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Exfoliation</h4>
                        <p className="text-sm font-medium text-green-700 mb-1">{routine.exfoliation.days}</p>
                        <p className="text-sm">{routine.exfoliation.treatment}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Masks</h4>
                        <p className="text-sm font-medium text-purple-700 mb-1">{routine.mask.days}</p>
                        <p className="text-sm">{routine.mask.treatment}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Self-Care Day</h4>
                        <p className="text-sm font-medium text-blue-700 mb-1">{routine.selfCare.day}</p>
                        <p className="text-sm">{routine.selfCare.treatment}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-skin-100">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-primary border-primary rounded-full hover:bg-primary/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          localStorage.setItem("selectedSkinType", routine.type);
                          window.alert(`${routine.type} plan saved as your default!`);
                        }}
                      >
                        Set as My Default Routine
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="bg-skin-50 p-6 rounded-xl mb-12">
            <h3 className="text-xl font-medium mb-4">Important Tips for All Skin Types</h3>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Use lukewarm water (hot water can strip natural oils)</span>
              </li>
              <li className="flex items-start">
                <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Always do a patch test before using a new recipe</span>
              </li>
              <li className="flex items-start">
                <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Drink plenty of water to keep your skin hydrated</span>
              </li>
              <li className="flex items-start">
                <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Get enough sleep for natural skin repair</span>
              </li>
              <li className="flex items-start">
                <CircleCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Use reusable tools (cotton pads, face cloths) to reduce waste</span>
              </li>
            </ul>
          </div>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/analysis">
              <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                Get Your Skin Analysis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            
            <Link to="/custom-planner">
              <Button variant="outline" className="rounded-full px-6 border-primary text-primary hover:bg-primary/10">
                Create Custom Routine
                <PenLine className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SkincareRoutinePlanner;
