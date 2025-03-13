
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import EcoBeautyGuide from "./pages/EcoBeautyGuide";
import RecommendationsPage from "./pages/RecommendationsPage";
import SkincareRoutinePlanner from "./pages/SkincareRoutinePlanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
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
          {/* We'll add these routes later when we implement these pages */}
          <Route path="/analysis" element={<Index />} />
          <Route path="/fashion" element={<Index />} />
          <Route path="/about" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
