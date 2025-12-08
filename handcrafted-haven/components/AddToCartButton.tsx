"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    artisanName?: string;
  };
  className?: string;
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    await addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image || "",
      artisanName: product.artisanName,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      disabled={added}
      className={`inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#44AF69] focus-visible:ring-offset-2 disabled:cursor-default ${
        added
          ? "bg-green-100 text-green-700"
          : "bg-[#44AF69] text-white hover:bg-[#3d9d5f]"
      } ${className}`}
      aria-label={added ? `${product.name} added to cart` : `Add ${product.name} to cart`}
      aria-live="polite"
    >
      {added ? (
        <>
          <Check className="h-4 w-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="h-4 w-4" />
          Add
        </>
      )}
    </button>
  );
}
