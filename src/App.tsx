
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Chatbot from "./components/Chatbot";
import UserPreferencesPanel from "./components/UserPreferencesPanel";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import EcoBeautyGuide from "./pages/EcoBeautyGuide";
import RecommendationsPage from "./pages/RecommendationsPage";
import SkincareRoutinePlanner from "./pages/SkincareRoutinePlanner";
import CustomRoutinePlanner from "./pages/CustomRoutinePlanner";
import FashionAnalysis from "./pages/FashionAnalysis";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Help from "./pages/Help";
import Products from "./pages/Products";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AnalysisTool from "./components/AnalysisTool";
import { useNotificationInit } from "./hooks/useNotificationInit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const AppContent = () => {
  useNotificationInit();
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/eco-beauty-guide" element={<EcoBeautyGuide />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/skincare-planner" element={<SkincareRoutinePlanner />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route path="/help" element={<Help />} />
        <Route path="/custom-planner" element={
          <ProtectedRoute>
            <CustomRoutinePlanner />
          </ProtectedRoute>
        } />
        <Route path="/fashion" element={<FashionAnalysis />} />
        <Route path="/analysis" element={<AnalysisTool />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Chatbot />
      <UserPreferencesPanel />
      <Toaster />
      <Sonner />
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
