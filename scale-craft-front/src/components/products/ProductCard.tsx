import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden border-product-border hover:shadow-product transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.featured && (
            <Badge variant="secondary" className="bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
          {hasDiscount && (
            <Badge variant="destructive" className="bg-sale-badge">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="bg-muted text-muted-foreground">
              Out of Stock
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 h-8 w-8 bg-background/80 backdrop-blur-sm hover:bg-background"
          onClick={toggleWishlist}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
            }`}
          />
        </Button>

        {/* Quick Add Button */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="bg-white text-black hover:bg-white/90"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-sm leading-none tracking-tight line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount || 0})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-price">
              ${product.price}
            </span>
            {hasDiscount && (
              <span className="text-sm line-through text-price-original">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full"
          variant={product.inStock ? "default" : "secondary"}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </CardFooter>
    </Card>
  );
};