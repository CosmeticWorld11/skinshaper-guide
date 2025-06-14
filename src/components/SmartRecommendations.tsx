
import React, { useState, useEffect } from 'react';
import { Sparkles, RefreshCw, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { recommendationEngine, ProductRecommendation, RoutineRecommendation } from '@/services/recommendationEngine';
import RecommendationCard from './RecommendationCard';
import RoutineCard from './RoutineCard';

const SmartRecommendations: React.FC = () => {
  const [productRecommendations, setProductRecommendations] = useState<ProductRecommendation[]>([]);
  const [routineRecommendations, setRoutineRecommendations] = useState<RoutineRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const products = recommendationEngine.getPersonalizedProductRecommendations(9);
      const routines = recommendationEngine.getPersonalizedRoutineRecommendations(6);
      
      setProductRecommendations(products);
      setRoutineRecommendations(routines);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWishlistAdd = (productId: string) => {
    // In a real app, this would save to user's wishlist
    console.log('Added to wishlist:', productId);
  };

  const filteredProducts = categoryFilter === 'all' 
    ? productRecommendations 
    : productRecommendations.filter(p => p.category === categoryFilter);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <Sparkles className="h-12 w-12 mx-auto text-primary animate-pulse mb-4" />
          <h2 className="text-xl font-semibold mb-2">Analyzing Your Preferences</h2>
          <p className="text-muted-foreground">Creating personalized recommendations just for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            Smart Recommendations
          </h2>
          <p className="text-muted-foreground mt-1">
            Personalized suggestions based on your preferences and skin profile
          </p>
        </div>
        <Button onClick={loadRecommendations} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="products" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="products">Products ({productRecommendations.length})</TabsTrigger>
          <TabsTrigger value="routines">Routines ({routineRecommendations.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filter by category:</span>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="skincare">Skincare</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
                <SelectItem value="fragrance">Fragrance</SelectItem>
                <SelectItem value="haircare">Hair Care</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <RecommendationCard
                key={product.id}
                product={product}
                onAddToWishlist={handleWishlistAdd}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No products found for this category.</p>
              <Button 
                variant="outline" 
                onClick={() => setCategoryFilter('all')}
                className="mt-2"
              >
                Show All Products
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="routines" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routineRecommendations.map(routine => (
              <RoutineCard key={routine.id} routine={routine} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartRecommendations;
