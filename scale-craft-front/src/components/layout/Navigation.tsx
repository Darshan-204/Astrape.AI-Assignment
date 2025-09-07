import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { decodeJWT } from '@/lib/jwt';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export const Navigation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchRedirect = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return;
    window.location.href = `/search?query=${encodeURIComponent(searchTerm)}`;
  };
  const { itemCount } = useCart();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = localStorage.getItem('token');
  const isLoggedIn = Boolean(token);
  const user = token ? decodeJWT(token) : null;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const backendUrl = process.env.BACKEND_URL || 'https://astrape-ai-assignment-9btq.vercel.app';
      await fetch(`${backendUrl}/api/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (err) {
      // Optionally handle error
    }
    localStorage.removeItem('token');
    toast({
      title: 'Logged out!',
      description: 'Please login again.',
      variant: 'default',
    });
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <span className="text-white font-bold text-lg">E</span>
          </div>
          <span className="font-bold text-xl">EcommStore</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/products') ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            Products
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-sm mx-6">
          <form className="relative w-full" onSubmit={handleSearchRedirect}>
            <button
              type="submit"
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: 0,
                margin: 0,
                cursor: 'pointer',
                zIndex: 2
              }}
              tabIndex={-1}
            >
              <Search className="text-muted-foreground h-4 w-4" />
            </button>
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '2.2rem' }}
            />
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              {user?.name && (
                <span className="font-medium text-sm text-muted-foreground mr-2">{user.name}</span>
              )}
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {itemCount}
                </Badge>
              )}
            </Button>
          </Link>
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search products..." className="pl-10" />
              </div>
              
              <nav className="flex flex-col space-y-2">
                <Link
                  to="/"
                  className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                    isActive('/') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className={`text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                    isActive('/products') ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};