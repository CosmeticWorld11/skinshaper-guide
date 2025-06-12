
import React from 'react';
import { Star, Share2, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ProductRecommendation } from '@/services/recommendationEngine';
import { socialSharingService } from '@/services/socialSharingService';
import { useToast } from '@/hooks/use-toast';

interface RecommendationCardProps {
  product: ProductRecommendation;
  onAddToWishlist?: (productId: string) => void;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ 
  product, 
  onAddToWishlist 
}) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareableProduct = socialSharingService.createShareableProduct(product);
    const success = await socialSharingService.shareContent(shareableProduct, {
      platform: 'copy'
    });

    if (success) {
      toast({
        title: "Product shared! 📋",
        description: "Product details copied to clipboard",
        duration: 3000,
      });
    }
  };

  const handleWishlist = () => {
    onAddToWishlist?.(product.id);
    toast({
      title: "Added to wishlist! 💖",
      description: `${product.name} saved for later`,
      duration: 3000,
    });
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-sm">{product.name}</h3>
              <p className="text-xs text-muted-foreground">{product.brand}</p>
            </div>
            <div className="flex items-center gap-1">
              <Badge 
                variant="secondary" 
                className="text-xs bg-primary/10 text-primary"
              >
                {Math.round(product.matchScore)}% match
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs ml-1">{product.rating}</span>
            </div>
            <span className="text-sm font-semibold">${product.price}</span>
            {product.ecoFriendly && (
              <Badge variant="outline" className="text-xs text-green-600 border-green-200">
                🌿 Eco
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          
          <p className="text-xs text-primary">
            💡 {product.reasonForRecommendation}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button size="sm" className="flex-1">
          <ShoppingBag className="h-3 w-3 mr-1" />
          View
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleWishlist}
        >
          <Heart className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleShare}
        >
          <Share2 className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecommendationCard;
