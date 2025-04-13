
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnalysisTool from "@/components/AnalysisTool";
import FeatureNavigation from "@/components/FeatureNavigation";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Brush, Shirt, TrendingUp, ShoppingBag } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navbar />
      <Hero />
      <AnalysisTool />
      
      <section className="py-10 bg-skin-50/50">
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
                <Card className="bg-background border-skin-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Sustainable fashion" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 text-foreground">Sustainable Style</h3>
                    <p className="text-sm text-muted-foreground">Eco-friendly fashion choices that don't sacrifice style</p>
                    <div className="mt-3">
                      <Link to="/fashion" className="text-skin-600 text-sm font-medium hover:underline">
                        Explore →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-skin-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Seasonal colors" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 text-foreground">AI Color Analysis</h3>
                    <p className="text-sm text-muted-foreground">Find your perfect color palette with our AI tools</p>
                    <div className="mt-3">
                      <Link to="/fashion" className="text-skin-600 text-sm font-medium hover:underline">
                        Try it now →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-background border-skin-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Accessories" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2 text-foreground">Style Matching</h3>
                    <p className="text-sm text-muted-foreground">Let AI help you discover your unique fashion style</p>
                    <div className="mt-3">
                      <Link to="/fashion" className="text-skin-600 text-sm font-medium hover:underline">
                        Discover more →
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our AI Fashion Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center">
                    <Brush className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Color Analysis</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Find your perfect color palette with our AI tools
                </p>
                <div className="mt-4 flex justify-center">
                  <Link to="/fashion">
                    <Button variant="outline" size="sm" className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center">
                    <Shirt className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Style Matching</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Discover your unique fashion personality
                </p>
                <div className="mt-4 flex justify-center">
                  <Link to="/fashion">
                    <Button variant="outline" size="sm" className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Trend Detection</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Stay ahead with real-time fashion trends
                </p>
                <div className="mt-4 flex justify-center">
                  <Link to="/fashion">
                    <Button variant="outline" size="sm" className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Outfit Generation</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Get AI-powered complete outfit recommendations
                </p>
                <div className="mt-4 flex justify-center">
                  <Link to="/fashion">
                    <Button variant="outline" size="sm" className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Link to="/fashion">
              <Button className="bg-skin-600 hover:bg-skin-700 rounded-full px-8 py-6 text-lg">
                Try AI Fashion Analysis
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <FeatureNavigation />
      <Recommendations />
      <Footer />
    </div>
  );
};

export default Index;
