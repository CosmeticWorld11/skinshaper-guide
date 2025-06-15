
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Recommendations from "@/components/Recommendations";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const RecommendationsPage = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="recommendations-page">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" size="sm" className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
            Your Personalized Beauty Recommendations
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Based on your analysis results, we've curated these eco-friendly treatments
            specifically for your skin type and concerns.
          </p>
        </div>
      </div>
      
      <Recommendations />
      
      <Footer />
    </div>
  );
};

export default RecommendationsPage;
