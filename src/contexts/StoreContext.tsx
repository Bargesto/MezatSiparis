import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Product, Order, ProductSize, ShoeSize } from '../types';
import { initialProducts } from '../data/initialProducts';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  placeOrder: (productId: string, size: ProductSize | ShoeSize, instagramUsername: string) => void;
  getStockForSize: (productId: string, size: ProductSize | ShoeSize) => number;
}

const StoreContext = createContext<StoreContextType | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('orders');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (productId: string, size: ProductSize | ShoeSize, instagramUsername: string) => {
    const product = products.find(p => p.id === productId);
    
    // Enhanced validation
    if (!product || !product.sizes[size] || product.sizes[size] <= 0) {
      console.error('Invalid order: Product not found or out of stock');
      return;
    }

    // Update stock
    setProducts(products.map(p => {
      if (p.id === productId) {
        const newStock = p.sizes[size] - 1;
        if (newStock < 0) return p; // Additional safety check
        
        return {
          ...p,
          sizes: {
            ...p.sizes,
            [size]: newStock
          }
        };
      }
      return p;
    }));

    // Add order
    setOrders([...orders, {
      id: Math.random().toString(36).substr(2, 9),
      productId,
      instagramUsername,
      size,
      timestamp: Date.now(),
    }]);
  };

  const getStockForSize = (productId: string, size: ProductSize | ShoeSize) => {
    const product = products.find(p => p.id === productId);
    return product ? product.sizes[size] : 0;
  };

  return (
    <StoreContext.Provider value={{ products, orders, placeOrder, getStockForSize }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
}