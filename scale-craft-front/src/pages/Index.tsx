import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/layout/Navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { mockProducts } from '@/data/mockProducts';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const featuredProducts = mockProducts.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">New Collection Available</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Discover Amazing
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Products
            </span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Shop the latest trends with our curated collection of premium products. 
            Quality guaranteed, fast shipping, and excellent customer service.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/products">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Handpicked items that our customers love the most. Discover what makes these products special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl">EcommStore</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your trusted partner for quality products and exceptional shopping experience.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">All Products</Link></li>
                <li><Link to="/" className="hover:text-foreground">Featured</Link></li>
                <li><Link to="/" className="hover:text-foreground">New Arrivals</Link></li>
                <li><Link to="/" className="hover:text-foreground">Sale</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground">Contact Us</Link></li>
                <li><Link to="/" className="hover:text-foreground">FAQ</Link></li>
                <li><Link to="/" className="hover:text-foreground">Shipping</Link></li>
                <li><Link to="/" className="hover:text-foreground">Returns</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/login" className="hover:text-foreground">Sign In</Link></li>
                <li><Link to="/signup" className="hover:text-foreground">Create Account</Link></li>
                <li><Link to="/cart" className="hover:text-foreground">View Cart</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EcommStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
