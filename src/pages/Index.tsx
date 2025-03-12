
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AnalysisTool from "@/components/AnalysisTool";
import Recommendations from "@/components/Recommendations";
import Chatbot from "@/components/Chatbot";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="home-page">
      <Navbar />
      <Hero />
      <AnalysisTool />
      <Recommendations />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default Index;
