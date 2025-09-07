import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Home, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link to="/">
            <Button className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          
          <Link to="/products">
            <Button variant="outline" className="w-full">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
