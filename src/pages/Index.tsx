
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnalysisTool from "@/components/AnalysisTool";
import FeatureNavigation from "@/components/FeatureNavigation";
import Recommendations from "@/components/Recommendations";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brush, Shirt, TrendingUp, ShoppingBag, Loader2 } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleFashionAnalysisClick = () => {
    navigate("/fashion");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading your beauty experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background animate-fade-in" data-testid="home-page">
      <Navbar />
      <Hero />
      <AnalysisTool />
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center mb-12">Our AI Fashion Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center group-hover:bg-skin-200 transition-colors">
                    <Brush className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Color Analysis</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Find your perfect color palette with our AI tools
                </p>
                <div className="flex justify-center">
                  <Link to="/fashion">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center group-hover:bg-skin-200 transition-colors">
                    <Shirt className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Style Matching</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Discover your unique fashion personality
                </p>
                <div className="flex justify-center">
                  <Link to="/fashion">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center group-hover:bg-skin-200 transition-colors">
                    <TrendingUp className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Trend Detection</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Stay ahead with real-time fashion trends
                </p>
                <div className="flex justify-center">
                  <Link to="/fashion">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-skin-50 border-skin-100 hover:shadow-md transition-all hover:-translate-y-1 group">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-skin-100 flex items-center justify-center group-hover:bg-skin-200 transition-colors">
                    <ShoppingBag className="h-6 w-6 text-skin-600" />
                  </div>
                </div>
                <h3 className="text-xl font-serif font-semibold text-center mb-2">Outfit Generation</h3>
                <p className="text-sm text-center text-muted-foreground mb-4">
                  Get AI-powered complete outfit recommendations
                </p>
                <div className="flex justify-center">
                  <Link to="/fashion">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full border-skin-200 hover:bg-skin-100 hover:text-skin-700"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button 
              onClick={handleFashionAnalysisClick}
              className="bg-skin-600 hover:bg-skin-700 rounded-full px-8 py-6 text-lg transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Try AI Fashion Analysis
            </Button>
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
