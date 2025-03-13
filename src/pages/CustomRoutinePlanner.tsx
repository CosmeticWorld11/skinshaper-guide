
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarCheck, PenLine } from "lucide-react";
import { Link } from "react-router-dom";
import CustomRoutineBuilder from "@/components/CustomRoutineBuilder";

const CustomRoutinePlanner = () => {
  return (
    <div className="min-h-screen bg-background" data-testid="custom-planner-page">
      <Navbar />
      
      <main className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <Link to="/skincare-planner">
              <Button variant="outline" size="sm" className="rounded-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Weekly Planner
              </Button>
            </Link>
          </div>
          
          <div className="mb-10 text-center">
            <div className="inline-flex items-center justify-center p-2 bg-purple-100 rounded-full mb-4">
              <PenLine className="h-6 w-6 text-purple-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-semibold mb-6">
              Custom Skincare Planner
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Design your personal eco-friendly weekly routine
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 md:p-8 mb-12">
            <p className="mb-6 text-muted-foreground">
              Create a personalized skincare schedule that fits your lifestyle and skin needs. 
              Add specific treatments for each day of the week and track your progress.
            </p>
            
            <CustomRoutineBuilder />
          </div>
          
          <div className="bg-blush-50 rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-serif font-semibold mb-4">Tips for Creating Your Routine</h2>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                  <CalendarCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Be Consistent</p>
                  <p className="text-sm text-muted-foreground">Aim for consistency rather than complexity in your routine</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                  <CalendarCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Don't Over-Exfoliate</p>
                  <p className="text-sm text-muted-foreground">Limit exfoliation to 1-2 times per week to avoid irritation</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                  <CalendarCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Rotate Your Masks</p>
                  <p className="text-sm text-muted-foreground">Use different masks throughout the week to address various concerns</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white rounded-full p-1 mt-0.5 mr-3">
                  <CalendarCheck className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="font-medium">Listen to Your Skin</p>
                  <p className="text-sm text-muted-foreground">Adjust your routine based on how your skin responds</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CustomRoutinePlanner;
