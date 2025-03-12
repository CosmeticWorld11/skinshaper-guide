
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, Tag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Hydrating Serum",
    description: "Intense moisture for dry skin with hyaluronic acid",
    price: "$45.00",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.8,
    tags: ["Hydration", "Anti-Aging"],
  },
  {
    id: 2,
    name: "Brightening Cream",
    description: "Vitamin C formula for even skin tone and radiance",
    price: "$38.00",
    image: "https://images.unsplash.com/photo-1570178186412-4283c2fb6a79?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.6,
    tags: ["Brightening", "Even Tone"],
  },
  {
    id: 3,
    name: "Gentle Cleanser",
    description: "Soft, pH-balanced cleanser for sensitive skin",
    price: "$26.00",
    image: "https://images.unsplash.com/photo-1611930022073-84f3c687a3fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.7,
    tags: ["Cleansing", "Sensitive"],
  },
  {
    id: 4,
    name: "SPF Moisturizer",
    description: "Daily protection with SPF 30 and antioxidants",
    price: "$32.00",
    image: "https://images.unsplash.com/photo-1599305090896-89f40ea92fda?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    rating: 4.9,
    tags: ["Protection", "Hydration"],
  },
];

const ProductCard = ({ product }: { product: typeof products[0] }) => {
  return (
    <div className="glass-card rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm text-primary rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 mr-1 fill-gold-500 text-gold-500" />
          {product.rating}
        </div>
      </div>
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-skin-100 text-skin-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-medium mb-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-semibold">{product.price}</span>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-primary text-primary hover:bg-primary/10"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Personalized Recommendations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your skin analysis, we've curated a selection of products
            specially formulated for your skin type and concerns.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-16">
          <div className="glass-card rounded-2xl p-8 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blush-100/40 to-skin-100/40 -z-10"></div>
            
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Complete Skincare Routine
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get a personalized morning and evening skincare routine based on
                  your unique skin profile and concerns.
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold mb-1">
                        Morning Routine
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Gentle cleansing, hydration, and sun protection
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold mb-1">
                        Evening Routine
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Double cleansing, treatment serums, and moisturization
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Tag className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-4">
                      <h4 className="text-sm font-semibold mb-1">
                        Special Treatments
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Weekly exfoliation and masks for extra care
                      </p>
                    </div>
                  </div>
                </div>

                <Button className="rounded-full bg-primary hover:bg-primary/90">
                  Get Personalized Routine
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="relative">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1629198688000-71f23e745b6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80"
                    alt="Skincare Routine"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg w-48">
                  <h4 className="text-sm font-semibold mb-2">Routine Benefits</h4>
                  <ul className="text-xs space-y-1">
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Improved hydration
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Reduced fine lines
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Even skin tone
                    </li>
                    <li className="flex items-center">
                      <div className="w-1 h-1 rounded-full bg-green-500 mr-2"></div>
                      Long-term protection
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
