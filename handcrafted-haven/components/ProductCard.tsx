"use client";
import { Heart, Star } from "lucide-react";

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
  name, 
  artisan, 
  price, 
  originalPrice,
  rating, 
  reviews, 
  image,
  badge
}: ProductCardProps) {
  return (
    <div className="group overflow-hidden border-2 rounded-xl hover:border-gray-300 hover:shadow-xl transition-all cursor-pointer bg-white">
      
      {/* IMAGE */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img 
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => (e.currentTarget.src = "/fallback.png")} 
        />

        {/* BADGE */}
        {badge && (
          <div className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {badge}
          </div>
        )}

        {/* HEART BUTTON */}
        <button 
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white p-2 rounded-full shadow"
        >
          <Heart className="h-4 w-4 text-gray-700" />
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
          <button className="px-3 py-1 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
