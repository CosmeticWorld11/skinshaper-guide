
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnalysisTool from "@/components/AnalysisTool";
import FeatureNavigation from "@/components/FeatureNavigation";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navbar />
      <Hero />
      <AnalysisTool />
      
      <section className="py-10 bg-accent/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-serif font-semibold text-center mb-6 text-foreground">
            Latest Beauty and Fashion Trends
          </h2>
          <Tabs defaultValue="beauty" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="beauty">Beauty</TabsTrigger>
              <TabsTrigger value="fashion">Fashion</TabsTrigger>
            </TabsList>
            <TabsContent value="beauty" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1596704017254-9759879d8351?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Skincare routine" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2 text-foreground">Glowing Skin Trends</h3>
                  <p className="text-sm text-muted-foreground">The latest innovations in dewy, glass skin techniques</p>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Makeup palette" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2 text-foreground">Minimalist Makeup</h3>
                  <p className="text-sm text-muted-foreground">Achieve more with less using multi-purpose products</p>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1597931663067-56b5c9f6000a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Hair care products" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2 text-foreground">Natural Hair Care</h3>
                  <p className="text-sm text-muted-foreground">Embrace your natural texture with these nourishing methods</p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="fashion" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-background rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Sustainable fashion" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2 text-foreground">Sustainable Style</h3>
                  <p className="text-sm text-muted-foreground">Eco-friendly fashion choices that don't sacrifice style</p>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Seasonal colors" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2 text-foreground">Season's Palette</h3>
                  <p className="text-sm text-muted-foreground">This season's trending colors and how to wear them</p>
                </div>
                <div className="bg-background rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Accessories" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium mb-2 text-foreground">Statement Accessories</h3>
                  <p className="text-sm text-muted-foreground">Elevate any outfit with these trending accessories</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <FeatureNavigation />
      <Recommendations />
      <Footer />
    </div>
  );
};

export default Index;
