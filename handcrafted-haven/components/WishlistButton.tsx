"use client";

import { Heart, Loader2 } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/app/context/WishlistContext";

interface WishlistButtonProps {
  productId: number;
  productName: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  showOnHover?: boolean;
}

export default function WishlistButton({ 
  productId, 
  productName,
  className = "",
  size = "md",
  showOnHover = false,
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const [isToggling, setIsToggling] = useState(false);
  const inWishlist = isInWishlist(productId);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsToggling(true);
    try {
      await toggleItem(productId);
    } finally {
      setIsToggling(false);
    }
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizes = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <button 
      onClick={handleToggle}
      disabled={isToggling}
      className={`
        ${sizeClasses[size]}
        rounded-full bg-white shadow-md 
        cursor-pointer
        transition-all duration-200
        hover:scale-110 hover:shadow-lg
        focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${showOnHover && !inWishlist ? "opacity-0 group-hover:opacity-100" : "opacity-100"}
        ${className}
      `}
      aria-label={inWishlist ? `Remove ${productName} from wishlist` : `Add ${productName} to wishlist`}
      aria-pressed={inWishlist}
    >
      {isToggling ? (
        <Loader2 className={`${iconSizes[size]} animate-spin text-gray-400`} />
      ) : (
        <Heart 
          className={`${iconSizes[size]} transition-colors ${
            inWishlist 
              ? "fill-red-500 text-red-500" 
              : "text-gray-600 hover:text-red-500"
          }`} 
        />
      )}
      <span className="sr-only">
        {inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      </span>
    </button>
  );
}
