
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chatbot from "./components/Chatbot";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import EcoBeautyGuide from "./pages/EcoBeautyGuide";
import RecommendationsPage from "./pages/RecommendationsPage";
import SkincareRoutinePlanner from "./pages/SkincareRoutinePlanner";
import CustomRoutinePlanner from "./pages/CustomRoutinePlanner";
import FashionAnalysis from "./pages/FashionAnalysis";
import Auth from "./pages/Auth";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AnalysisTool from "./components/AnalysisTool";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/eco-beauty-guide" element={<EcoBeautyGuide />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
            <Route path="/skincare-planner" element={<SkincareRoutinePlanner />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/custom-planner" element={
              <ProtectedRoute>
                <CustomRoutinePlanner />
              </ProtectedRoute>
            } />
            <Route path="/fashion" element={<FashionAnalysis />} />
            <Route path="/analysis" element={<AnalysisTool />} />
            <Route path="/about" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
