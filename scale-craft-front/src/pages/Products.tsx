import { useState, useMemo } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/layout/Navigation';
import { ProductCard } from '@/components/products/ProductCard';
import { ProductFilters } from '@/components/products/ProductFilters';
import { mockProducts } from '@/data/mockProducts';
import { FilterOptions } from '@/types';

export default function Products() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    // If you want to use mockProducts for search:
    const term = searchTerm.trim().toLowerCase();
    const results = mockProducts.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
    setSearchResults(results);
    setIsSearching(false);
  };
  
  // Get unique categories from products
  const categories = useMemo(() => {
    const cats = mockProducts.map(p => p.category);
    return [...new Set(cats)];
  }, []);

  // Filter and sort products based on current filters
  const filteredProducts = useMemo(() => {
    let filtered = [...mockProducts];
    if (filters.category) {
      filtered = filtered.filter(p => p.category === filters.category);
    }
    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.price >= filters.priceRange!.min && p.price <= filters.priceRange!.max
      );
    }
    if (filters.inStock) {
      filtered = filtered.filter(p => p.inStock);
    }
    if (filters.featured) {
      filtered = filtered.filter(p => p.featured);
    }
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let aVal: any, bVal: any;
        switch (filters.sortBy) {
          case 'name':
            aVal = a.name;
            bVal = b.name;
            break;
          case 'price':
            aVal = a.price;
            bVal = b.price;
            break;
          case 'rating':
            aVal = a.rating || 0;
            bVal = b.rating || 0;
            break;
          default:
            return 0;
        }
        if (filters.sortOrder === 'desc') {
          return bVal > aVal ? 1 : -1;
        }
        return aVal > bVal ? 1 : -1;
      });
    }
    return filtered;
  }, [filters]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header */}
      <section className="bg-gradient-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">All Products</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore our complete collection with advanced filtering options to find exactly what you're looking for.
            </p>
          </div>
        </div>
      </section>

      {/* Products with Filters */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                filters={filters}
                onFiltersChange={setFilters}
                categories={categories}
              />
            </div>
            
            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredProducts.length} of {mockProducts.length} products
                </p>
                  <form className="mt-6 flex justify-center" onSubmit={handleSearch}>
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      placeholder="Search products..."
                      className="border rounded-l px-4 py-2 w-64"
                    />
                    <Button type="submit" className="rounded-l-none">Search</Button>
                  </form>
              </div>
              
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters to see more products.
                  </p>
                  <Button onClick={() => setFilters({})}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
                        {searchResults !== null
                          ? `Showing ${searchResults.length} search results`
                          : `Showing ${filteredProducts.length} of ${mockProducts.length} products`}
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
                <li><a href="/products" className="hover:text-foreground">All Products</a></li>
                <li><a href="/products" className="hover:text-foreground">Featured</a></li>
                <li><a href="/products" className="hover:text-foreground">New Arrivals</a></li>
                <li><a href="/products" className="hover:text-foreground">Sale</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">FAQ</a></li>
                <li><a href="#" className="hover:text-foreground">Shipping</a></li>
                <li><a href="#" className="hover:text-foreground">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="/login" className="hover:text-foreground">Sign In</a></li>
                <li><a href="/signup" className="hover:text-foreground">Create Account</a></li>
                <li><a href="/cart" className="hover:text-foreground">View Cart</a></li>
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
}