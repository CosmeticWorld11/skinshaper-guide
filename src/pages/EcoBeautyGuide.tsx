
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Leaf, Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const EcoBeautyGuide = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="eco-beauty-guide-page">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
              Eco Beauty Guide
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sustainable & Natural Beauty Tips for a Healthier You and Planet
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead">
              Eco-beauty focuses on sustainable, non-toxic, and cruelty-free beauty practices 
              that are better for your skin and the planet. Below is a detailed guide on 
              eco-friendly beauty, including skincare, makeup, and lifestyle tips.
            </p>
            
            <div className="my-12">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <span className="flex items-center justify-center bg-green-100 text-green-700 w-8 h-8 rounded-full mr-3">1</span>
                Understanding Eco-Beauty
              </h2>
              <p>Eco-beauty is about choosing products and habits that:</p>
              <ul className="space-y-2 my-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Use natural and organic ingredients</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Avoid harmful chemicals (like parabens, sulfates, and synthetic fragrances)</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Support cruelty-free and vegan brands</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Use minimal, biodegradable, or recyclable packaging</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Reduce water and energy consumption</span>
                </li>
              </ul>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <span className="flex items-center justify-center bg-green-100 text-green-700 w-8 h-8 rounded-full mr-3">2</span>
                Eco-Friendly Skincare Tips
              </h2>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Choose Natural & Organic Products
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Look for certified organic brands (USDA Organic, Ecocert, or COSMOS).</li>
                  <li>Pick skincare with botanical extracts, essential oils, and plant-based ingredients like aloe vera, chamomile, or green tea.</li>
                  <li>Avoid synthetic dyes, artificial fragrances, parabens, sulfates, and phthalates, which can harm both skin and the environment.</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Switch to Refillable & Minimal Packaging
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Choose glass or metal containers over plastic.</li>
                  <li>Buy from brands that offer refillable packaging (like Kjaer Weis, Fenty Beauty, and Lush).</li>
                  <li>Look for biodegradable or compostable packaging.</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  DIY Natural Beauty Alternatives
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Face mask: Mix honey, turmeric, and yogurt for glowing skin.</li>
                  <li>Lip balm: Use coconut oil, beeswax, and essential oils.</li>
                  <li>Exfoliator: Blend coffee grounds, sugar, and olive oil.</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Avoid Overwashing & Waste
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Use micellar water or reusable cotton pads instead of disposable wipes.</li>
                  <li>Use bar cleansers or powder-based products to save packaging.</li>
                </ul>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <span className="flex items-center justify-center bg-green-100 text-green-700 w-8 h-8 rounded-full mr-3">3</span>
                Eco-Friendly Makeup Tips
              </h2>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Use Clean Beauty Brands
                </h3>
                <p className="my-2">Look for cruelty-free and vegan brands like:</p>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>RMS Beauty</li>
                  <li>Ilia Beauty</li>
                  <li>Axiology (zero-waste lipstick)</li>
                  <li>Bite Beauty</li>
                  <li>E.L.F. (affordable & vegan)</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Go Minimalist
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Stick to multi-use products (e.g., a lip and cheek tint).</li>
                  <li>Use powder-based makeup (less preservatives and water waste).</li>
                  <li>Choose compostable makeup wipes or reusable makeup remover pads.</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Check Ingredients
                </h3>
                <p className="my-2">Avoid:</p>
                <ul className="ml-8 space-y-2 my-3">
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Silicones (bad for the environment)</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Microplastics (common in exfoliants and glitter)</span>
                  </li>
                  <li className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Talc (linked to environmental concerns)</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <span className="flex items-center justify-center bg-green-100 text-green-700 w-8 h-8 rounded-full mr-3">4</span>
                Sustainable Haircare & Bathing Tips
              </h2>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Switch to Shampoo & Conditioner Bars
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Brands like Ethique, Lush, and HiBAR offer plastic-free options.</li>
                  <li>Lasts longer than bottled products & reduces plastic waste.</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Use a Wooden or Bamboo Brush
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Plastic brushes take hundreds of years to break down.</li>
                  <li>Bamboo is biodegradable & gentler on hair.</li>
                </ul>
              </div>
              
              <div className="my-6">
                <h3 className="text-xl font-medium">
                  <Check className="h-5 w-5 text-green-600 inline mr-2" />
                  Air Dry Hair & Reduce Heat Styling
                </h3>
                <ul className="ml-8 space-y-2 my-3 list-disc">
                  <li>Saves electricity and reduces heat damage.</li>
                  <li>Use natural oils (coconut, argan, jojoba) for hydration.</li>
                </ul>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <span className="flex items-center justify-center bg-green-100 text-green-700 w-8 h-8 rounded-full mr-3">5</span>
                Eco-Friendly Beauty Lifestyle Tips
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 my-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-medium mb-3">
                    <Check className="h-5 w-5 text-green-600 inline mr-2" />
                    Switch to Sustainable Tools
                  </h3>
                  <ul className="space-y-2 list-disc ml-6">
                    <li>Use reusable makeup sponges and brushes instead of single-use applicators.</li>
                    <li>Try biodegradable cotton swabs or washable bamboo rounds.</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-medium mb-3">
                    <Check className="h-5 w-5 text-green-600 inline mr-2" />
                    Choose Reef-Safe Sunscreen
                  </h3>
                  <ul className="space-y-2 list-disc ml-6">
                    <li>Avoid sunscreens with oxybenzone and octinoxate, which harm marine life.</li>
                    <li>Opt for zinc oxide or titanium dioxide-based sunscreens.</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-medium mb-3">
                    <Check className="h-5 w-5 text-green-600 inline mr-2" />
                    DIY Natural Perfume
                  </h3>
                  <p>Make your own using essential oils (lavender, vanilla, citrus) mixed with jojoba oil.</p>
                </div>
                
                <div className="bg-green-50 p-6 rounded-xl">
                  <h3 className="text-xl font-medium mb-3">
                    <Check className="h-5 w-5 text-green-600 inline mr-2" />
                    Reduce Water Waste
                  </h3>
                  <ul className="space-y-2 list-disc ml-6">
                    <li>Take shorter showers.</li>
                    <li>Turn off the tap while cleansing or brushing your teeth.</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="my-12">
              <h2 className="text-2xl font-serif font-semibold flex items-center">
                <span className="flex items-center justify-center bg-green-100 text-green-700 w-8 h-8 rounded-full mr-3">6</span>
                Eco-Beauty Brands to Explore
              </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                <div className="border border-green-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Skincare</h3>
                  <p>Tata Harper, Herbivore Botanicals, The Body Shop</p>
                </div>
                
                <div className="border border-green-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Makeup</h3>
                  <p>Ilia Beauty, Kjaer Weis, E.L.F., Aether Beauty</p>
                </div>
                
                <div className="border border-green-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Haircare</h3>
                  <p>Lush, Plaine Products, Rahua</p>
                </div>
                
                <div className="border border-green-100 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Sunscreen</h3>
                  <p>Coola, Sun Bum (reef-safe)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-8 rounded-xl my-12">
              <h2 className="text-2xl font-serif font-semibold mb-4">Ready to start your eco-beauty journey?</h2>
              <p className="mb-6">
                Our experts can provide personalized eco-friendly beauty recommendations tailored to your skin type and concerns.
              </p>
              <Button className="bg-green-600 hover:bg-green-700">
                Get Personalized Recommendations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EcoBeautyGuide;
