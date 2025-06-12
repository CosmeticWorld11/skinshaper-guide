
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import SmartRecommendations from "@/components/SmartRecommendations";

const RecommendationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Personalized Beauty Recommendations
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover eco-friendly beauty products and routines tailored specifically for your skin type, 
              concerns, and preferences using our AI-powered recommendation engine.
            </p>
          </div>

          <SmartRecommendations />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendationsPage;
