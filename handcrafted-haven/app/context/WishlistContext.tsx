"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/app/context/ToastContext";

interface WishlistItem {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  image?: string;
  badge?: string;
  artisanName?: string;
  addedAt?: string;
}

interface WishlistContextType {
  items: WishlistItem[];
  itemCount: number;
  isInWishlist: (productId: number) => boolean;
  addItem: (productId: number) => Promise<void>;
  removeItem: (productId: number) => Promise<void>;
  toggleItem: (productId: number) => Promise<void>;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const { status } = useSession();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const { showToast } = useToast();

  // Fetch wishlist from server when logged in
  const refreshWishlist = useCallback(async () => {
    if (status !== "authenticated") {
      setItems([]);
      return;
    }

    try {
      const res = await fetch("/api/wishlist");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }, [status]);

  // Load wishlist on login
  useEffect(() => {
    if (status === "authenticated") {
      refreshWishlist();
    } else if (status === "unauthenticated") {
      setItems([]);
    }
  }, [status, refreshWishlist]);

  const isInWishlist = useCallback((productId: number) => {
    return items.some(item => item.productId === productId);
  }, [items]);

  const addItem = useCallback(async (productId: number) => {
    if (status !== "authenticated") {
      showToast({
        tone: "warning",
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist.",
      });
      return;
    }

    try {
      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        await refreshWishlist();
        showToast({
          tone: "success",
          title: "Saved to wishlist",
          description: "We've added this item to your wishlist.",
        });
      } else {
        showToast({
          tone: "error",
          title: "Could not add item",
          description: data?.error || "Please try again in a moment.",
        });
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      showToast({
        tone: "error",
        title: "Wishlist error",
        description: "We could not add that item right now.",
      });
    }
  }, [status, refreshWishlist, showToast]);

  const removeItem = useCallback(async (productId: number) => {
    if (status !== "authenticated") return;

    try {
      const res = await fetch(`/api/wishlist?productId=${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setItems(prev => prev.filter(item => item.productId !== productId));
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }, [status]);

  const toggleItem = useCallback(async (productId: number) => {
    if (isInWishlist(productId)) {
      await removeItem(productId);
    } else {
      await addItem(productId);
    }
  }, [isInWishlist, removeItem, addItem]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        itemCount: items.length,
        isInWishlist,
        addItem,
        removeItem,
        toggleItem,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
