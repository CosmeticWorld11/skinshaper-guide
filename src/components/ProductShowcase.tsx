
import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { recommendationEngine, ProductRecommendation } from '@/services/recommendationEngine';
import { useToast } from '@/hooks/use-toast';

const ProductShowcase: React.FC = () => {
  const [products, setProducts] = useState<ProductRecommendation[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductRecommendation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('match');
  const [showEcoOnly, setShowEcoOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchTerm, selectedCategory, priceRange, sortBy, showEcoOnly]);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const allProducts = recommendationEngine.getProductsByCategory('all', 12);
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
      toast({
        title: "Error loading products",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchTerm) {
      const results = recommendationEngine.searchProducts(searchTerm, 50);
      filtered = results;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price range filter
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'under-25':
          filtered = filtered.filter(product => product.price < 25);
          break;
        case '25-50':
          filtered = filtered.filter(product => product.price >= 25 && product.price <= 50);
          break;
        case '50-75':
          filtered = filtered.filter(product => product.price >= 50 && product.price <= 75);
          break;
        case 'over-75':
          filtered = filtered.filter(product => product.price > 75);
          break;
      }
    }

    // Eco-friendly filter
    if (showEcoOnly) {
      filtered = filtered.filter(product => product.ecoFriendly);
    }

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // match
        filtered.sort((a, b) => b.matchScore - a.matchScore);
    }

    setFilteredProducts(filtered);
  };

  const handleWishlist = (productId: string, productName: string) => {
    toast({
      title: "Added to wishlist! 💖",
      description: `${productName} saved for later`,
      duration: 3000,
    });
  };

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'skincare', label: 'Skincare' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'fragrance', label: 'Fragrance' },
    { value: 'haircare', label: 'Hair Care' }
  ];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Products</h2>
          <p className="text-muted-foreground">Finding the best matches for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Product Showcase</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover our curated collection of eco-friendly beauty products, 
          personalized to match your skin type and preferences.
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger>
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-25">Under $25</SelectItem>
                <SelectItem value="25-50">$25 - $50</SelectItem>
                <SelectItem value="50-75">$50 - $75</SelectItem>
                <SelectItem value="over-75">Over $75</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant={showEcoOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setShowEcoOnly(!showEcoOnly)}
              className="flex items-center gap-2"
            >
              🌿 Eco-Friendly Only
            </Button>
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} products found
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your filters or search terms
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setPriceRange('all');
                setShowEcoOnly(false);
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-primary/10 text-primary ml-2"
                    >
                      {Math.round(product.matchScore)}%
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">{product.rating}</span>
                    </div>
                    {product.reviews && (
                      <span className="text-muted-foreground">({product.reviews})</span>
                    )}
                    <span className="font-semibold">${product.price}</span>
                    {product.ecoFriendly && (
                      <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                        🌿
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="text-xs text-primary">
                    💡 {product.reasonForRecommendation}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button size="sm" className="flex-1" disabled={!product.inStock}>
                  <ShoppingBag className="h-3 w-3 mr-1" />
                  {product.inStock ? 'View Details' : 'Out of Stock'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleWishlist(product.id, product.name)}
                >
                  <Heart className="h-3 w-3" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;
