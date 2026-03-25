import { createContext, useContext, useState, type ReactNode } from 'react';

// ─── Types ───────────────────────────────────────────────────────────────────
export interface CartProduct {
  id: number;
  name: string;
  weight: string;
  weightKg: number;
  price: number;
  img: string;
  accentColor: string;
}

export interface CartItem extends CartProduct {
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (p: CartProduct) => void;
  removeItem: (id: number) => void;
  updateQty: (id: number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalKg: number;
  // Subscription plan
  planName: string;
  planKg: number;
  setPlan: (name: string, kg: number) => void;
}

// ─── Context ─────────────────────────────────────────────────────────────────
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [planName, setPlanName] = useState('PLAN COSECHA');
  const [planKg, setPlanKg] = useState(10);

  const addItem = (p: CartProduct) =>
    setItems(prev => {
      const hit = prev.find(i => i.id === p.id);
      if (hit) return prev.map(i => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...p, qty: 1 }];
    });

  const removeItem = (id: number) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i))
        .filter(i => i.qty > 0),
    );

  const clearCart = () => setItems([]);

  const setPlan = (name: string, kg: number) => {
    setPlanName(name);
    setPlanKg(kg);
  };

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
  const totalKg    = items.reduce((s, i) => s + i.weightKg * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQty, clearCart,
        totalItems, totalPrice, totalKg,
        planName, planKg, setPlan,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
