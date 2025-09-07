import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard } from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import { mockProducts } from '@/data/mockProducts';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
  const query = useQuery().get('query') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    // Use mockProducts for search (frontend-only)
    const term = query.trim().toLowerCase();
    const filtered = mockProducts.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
    setResults(filtered);
    setLoading(false);
  }, [query]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
        {loading ? (
          <p>Loading...</p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(product => (
              <ProductCard key={product.id || product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try a different search term.</p>
          </div>
        )}
        <Button className="mt-8" onClick={() => window.history.back()}>Go Back</Button>
      </div>
    </div>
  );
}
