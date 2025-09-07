import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { mockProducts } from '@/data/mockProducts';
import { CartItem, Product } from '@/types';
import { toast } from '@/components/ui/use-toast';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      const newItems = [...state.items, action.payload];
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id });
      }
      
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0,
      };
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  // Fetch cart from backend on mount and hydrate from mockProducts
  // Fetch cart from backend on mount and on login event
  React.useEffect(() => {
    const fetchCart = async () => {
  const backendUrl = import.meta.env.BACKEND_URL || 'https://astrape-ai-assignment-9btq.vercel.app';
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await fetch(`${backendUrl}/api/cart`, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.cart && Array.isArray(data.cart.items)) {
          dispatch({ type: 'CLEAR_CART' });
          data.cart.items.forEach((item: { productId: string; quantity: number }) => {
            const product = mockProducts.find((p) => p.id === item.productId);
            if (product) {
              const cartItem: CartItem = { ...product, quantity: item.quantity };
              dispatch({ type: 'ADD_ITEM', payload: cartItem });
            }
          });
        }
      } catch {}
    };
    // Run on mount
    fetchCart();
    // Also run on login event
    window.addEventListener('user-logged-in', fetchCart);
    return () => {
      window.removeEventListener('user-logged-in', fetchCart);
    };
  }, []);

  const addItem = (product: Product) => {
    const cartItem = { ...product, quantity: 1 };
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    // Sync with backend
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://astrape-ai-assignment-9btq.vercel.app/';
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${backendUrl}/api/cart/add`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 })
      });
    }
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
    // Sync with backend
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://astrape-ai-assignment-9btq.vercel.app/';
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${backendUrl}/api/cart/remove`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: id })
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    // Sync with backend
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'https://astrape-ai-assignment-9btq.vercel.app/';
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${backendUrl}/api/cart/update`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId: id, quantity })
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};