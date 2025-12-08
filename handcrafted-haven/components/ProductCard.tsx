"use client";
import { Heart, Star, Loader2 } from "lucide-react";
import { useState } from "react";
import { useWishlist } from "@/app/context/WishlistContext";

interface ProductCardProps {
  id: string;
  name: string;
  artisan: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

export function ProductCard({ 
  id,
  name, 
  artisan, 
  price, 
  originalPrice,
  rating, 
  reviews, 
  image,
  badge
}: ProductCardProps) {
  const { isInWishlist, toggleItem } = useWishlist();
  const [togglingWishlist, setTogglingWishlist] = useState(false);
  const productId = Number(id);
  const inWishlist = isInWishlist(productId);

  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTogglingWishlist(true);
    try {
      await toggleItem(productId);
    } finally {
      setTogglingWishlist(false);
    }
  };

  return (
    <article 
      className="group overflow-hidden rounded-xl hover:shadow-xl transition-all cursor-pointer bg-white shadow-sm border border-gray-100 hover:border-gray-200"
      aria-label={`${name} by ${artisan}, $${price.toFixed(2)}`}
    >
      
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => (e.currentTarget.src = "/android-chrome-512x512.png")} 
        />

        {/* BADGE */}
        {badge && (
          <div className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {badge}
          </div>
        )}

        {/* HEART BUTTON */}
        <button 
          className={`absolute top-3 right-3 transition-all bg-white p-2 rounded-full shadow cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
            inWishlist ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
          onClick={handleToggleWishlist}
          disabled={togglingWishlist}
          aria-label={inWishlist ? `Remove ${name} from wishlist` : `Add ${name} to wishlist`}
          aria-pressed={inWishlist}
        >
          {togglingWishlist ? (
            <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
          ) : (
            <Heart className={`h-4 w-4 transition-colors ${inWishlist ? "fill-red-500 text-red-500" : "text-gray-700 hover:text-red-500"}`} />
          )}
          <span className="sr-only">{inWishlist ? "Remove from wishlist" : "Add to wishlist"}</span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="text-gray-900 line-clamp-1">{name}</h3>
          <p className="text-gray-600">by {artisan}</p>
        </div>

        {/* RATING */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-gray-600">({reviews})</span>
        </div>

        {/* PRICE + ADD BUTTON */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-gray-900">${price.toFixed(2)}</span>
            {originalPrice && (
              <span className="text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* NORMAL BUTTON */}
          <button 
            className="px-3 py-1 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all"
            aria-label={`Add ${name} to cart`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );
}
