
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Leaf, Home, Droplet, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const EcoTreatment = ({ treatment }: { treatment: {
  id: number;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  time: string;
  ingredients: string[];
}}) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={treatment.image}
          alt={treatment.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-primary rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {treatment.time}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-full bg-green-50 text-green-600">
            {treatment.icon}
          </div>
          <h3 className="text-lg font-medium">{treatment.title}</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-3">
          {treatment.description}
        </p>
        <div className="mb-3">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2">Key Ingredients</h4>
          <div className="flex flex-wrap gap-2">
            {treatment.ingredients.map((ingredient, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-skin-100 text-skin-700"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-end">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary text-primary hover:bg-primary/10"
          >
            View Recipe
          </Button>
        </div>
      </div>
    </div>
  );
};

const treatments = [
  {
    id: 1,
    title: "Honey Oatmeal Mask",
    description: "Soothing and hydrating treatment for dry and sensitive skin",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    icon: <Droplet className="h-4 w-4" />,
    time: "15 mins",
    ingredients: ["Honey", "Oatmeal", "Yogurt"],
  },
  {
    id: 2,
    title: "Avocado Moisture Treatment",
    description: "Rich in antioxidants and natural oils for deep hydration",
    image: "https://images.unsplash.com/photo-1570178186412-4283c2fb6a79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    icon: <Leaf className="h-4 w-4" />,
    time: "20 mins",
    ingredients: ["Avocado", "Olive Oil", "Aloe Vera"],
  },
  {
    id: 3,
    title: "Green Tea Toner",
    description: "Anti-inflammatory and antioxidant-rich skin refresher",
    image: "https://images.unsplash.com/photo-1611930022073-84f3c687a3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    icon: <Shield className="h-4 w-4" />,
    time: "5 mins",
    ingredients: ["Green Tea", "Witch Hazel", "Cucumber"],
  },
  {
    id: 4,
    title: "Coconut Coffee Scrub",
    description: "Natural exfoliant that revitalizes and brightens skin",
    image: "https://images.unsplash.com/photo-1599305090896-89f40ea92fda?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    icon: <Home className="h-4 w-4" />,
    time: "10 mins",
    ingredients: ["Coffee Grounds", "Coconut Oil", "Brown Sugar"],
  },
];

const Recommendations = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Eco-Friendly Home Treatments
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover natural, sustainable skincare treatments you can make at home
            with simple ingredients from your kitchen.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {treatments.map((treatment) => (
            <EcoTreatment key={treatment.id} treatment={treatment} />
          ))}
        </div>

        <div className="mt-16">
          <div className="glass-card rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blush-100/40 to-green-100/40 -z-10"></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Sustainable Beauty Routine
                </h3>
                <p className="text-muted-foreground mb-6">
                  Build an eco-conscious skincare routine with these natural treatments
                  that are gentle on your skin and the environment.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold mb-1">
                        Morning Ritual
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Gentle cleansing with plant-based ingredients and natural toning
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold mb-1">
                        Evening Ritual
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Deep cleansing, nourishing treatments, and overnight recovery masks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Leaf className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold mb-1">
                        Weekly Treatments
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Exfoliation, deep hydration masks, and targeted treatments
                      </p>
                    </div>
                  </div>
                </div>

                <Link to="/eco-beauty-guide">
                  <Button className="rounded-full bg-primary hover:bg-primary/90">
                    Get Your Eco Beauty Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="Eco Beauty Routine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg w-48">
                  <h4 className="text-sm font-semibold mb-2">Benefits</h4>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Environmentally friendly
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      No harsh chemicals
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Cost-effective solutions
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Customizable for your skin
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recommendations;
