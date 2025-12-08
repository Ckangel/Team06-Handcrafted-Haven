"use client";
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useSession } from "next-auth/react";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  notes?: string;
  artisanId?: string;
  artisanName?: string;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateNotes: (productId: string, notes: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "handcrafted-haven-cart";
const MAX_QUANTITY = 10;
const MAX_NOTES_LENGTH = 140;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();

  const isLoggedIn = status === "authenticated";
  const userId = (session?.user as any)?.id;

  // Calculate derived values
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Load cart from localStorage (for guests) or API (for logged-in users)
  useEffect(() => {
    async function loadCart() {
      setIsLoading(true);
      try {
        if (isLoggedIn && userId) {
          // Fetch cart from database
          const res = await fetch("/api/cart");
          if (res.ok) {
            const data = await res.json();
            setItems(data.items || []);
          }
        } else if (status === "unauthenticated") {
          // Load from localStorage for guests
          const stored = localStorage.getItem(CART_STORAGE_KEY);
          if (stored) {
            setItems(JSON.parse(stored));
          }
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (status !== "loading") {
      loadCart();
    }
  }, [isLoggedIn, userId, status]);

  // Sync cart to localStorage for guests
  useEffect(() => {
    if (!isLoggedIn && status === "unauthenticated") {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isLoggedIn, status]);

  // Merge guest cart when user logs in
  useEffect(() => {
    async function mergeGuestCart() {
      if (isLoggedIn && userId) {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const guestItems: CartItem[] = JSON.parse(stored);
          if (guestItems.length > 0) {
            try {
              // Merge guest cart with user cart
              await fetch("/api/cart/merge", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: guestItems }),
              });
              // Clear localStorage
              localStorage.removeItem(CART_STORAGE_KEY);
              // Reload cart from server
              const res = await fetch("/api/cart");
              if (res.ok) {
                const data = await res.json();
                setItems(data.items || []);
              }
            } catch (error) {
              console.error("Failed to merge guest cart:", error);
            }
          }
        }
      }
    }
    mergeGuestCart();
  }, [isLoggedIn, userId]);

  const syncToServer = useCallback(async (newItems: CartItem[]) => {
    if (isLoggedIn) {
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: newItems }),
        });
      } catch (error) {
        console.error("Failed to sync cart to server:", error);
      }
    }
  }, [isLoggedIn]);

  const addItem = useCallback((item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.productId === item.productId);
      let newItems: CartItem[];

      if (existingIndex > -1) {
        // Update quantity of existing item
        newItems = prev.map((i, idx) => {
          if (idx === existingIndex) {
            const newQty = Math.min(i.quantity + (item.quantity || 1), MAX_QUANTITY);
            return { ...i, quantity: newQty };
          }
          return i;
        });
      } else {
        // Add new item
        newItems = [
          ...prev,
          { ...item, quantity: Math.min(item.quantity || 1, MAX_QUANTITY) },
        ];
      }

      syncToServer(newItems);
      return newItems;
    });
  }, [syncToServer]);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => {
      const newItems = prev.filter((i) => i.productId !== productId);
      syncToServer(newItems);
      return newItems;
    });
  }, [syncToServer]);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }
    setItems((prev) => {
      const newItems = prev.map((i) => {
        if (i.productId === productId) {
          return { ...i, quantity: Math.min(quantity, MAX_QUANTITY) };
        }
        return i;
      });
      syncToServer(newItems);
      return newItems;
    });
  }, [removeItem, syncToServer]);

  const updateNotes = useCallback((productId: string, notes: string) => {
    const trimmedNotes = notes.slice(0, MAX_NOTES_LENGTH);
    setItems((prev) => {
      const newItems = prev.map((i) => {
        if (i.productId === productId) {
          return { ...i, notes: trimmedNotes };
        }
        return i;
      });
      syncToServer(newItems);
      return newItems;
    });
  }, [syncToServer]);

  const clearCart = useCallback(() => {
    setItems([]);
    syncToServer([]);
    if (!isLoggedIn) {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [isLoggedIn, syncToServer]);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        updateNotes,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
