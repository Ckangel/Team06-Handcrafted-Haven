"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, Heart, ShoppingCart, Loader2 } from "lucide-react";
import { useWishlist } from "@/app/context/WishlistContext";

interface Product {
  id: number;
  name: string;
  artisan: string;
  price: number;
  original_price: number | null;
  image_url: string;
  badge: string | null;
  rating: number;
  reviews: number;
  category: string;
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const [togglingWishlist, setTogglingWishlist] = useState<number | null>(null);
  const { isInWishlist, toggleItem } = useWishlist();

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const res = await fetch("/api/products/featured");
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = async (product: Product) => {
    setAddingToCart(product.id);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });
      
      if (res.ok) {
        window.dispatchEvent(new CustomEvent("cart-updated"));
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setAddingToCart(null);
    }
  };

  const handleToggleWishlist = async (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    setTogglingWishlist(productId);
    try {
      await toggleItem(productId);
    } finally {
      setTogglingWishlist(null);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our hand-picked selection of exceptional handcrafted items from talented artisans
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional handcrafted items from talented artisans
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No featured products available at the moment.</p>
            <Link href="/shop" className="text-amber-600 hover:text-amber-700 mt-2 inline-block">
              Browse all products →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all"
              >
                {/* IMAGE */}
                <Link href={`/shop/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => (e.currentTarget.src = "/fallback.png")}
                    />

                    {/* BADGE */}
                    {product.badge && (
                      <div className="absolute top-3 left-3 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.badge}
                      </div>
                    )}

                    {/* HEART BUTTON */}
                    <button 
                      className={`absolute top-3 right-3 transition-all bg-white p-2 rounded-full shadow cursor-pointer hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        isInWishlist(product.id) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                      onClick={(e) => handleToggleWishlist(e, product.id)}
                      disabled={togglingWishlist === product.id}
                      aria-label={isInWishlist(product.id) ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    >
                      {togglingWishlist === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-gray-400" />
                      ) : (
                        <Heart 
                          className={`h-4 w-4 transition-colors ${
                            isInWishlist(product.id) 
                              ? "fill-red-500 text-red-500" 
                              : "text-gray-700 hover:text-red-500"
                          }`} 
                        />
                      )}
                    </button>
                  </div>
                </Link>

                {/* CONTENT */}
                <div className="p-4 space-y-3">
                  <div>
                    <Link href={`/shop/${product.id}`} className="hover:text-amber-600 transition-colors">
                      <h3 className="text-gray-900 font-semibold line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-gray-600 text-sm">by {product.artisan}</p>
                    <p className="text-gray-400 text-xs">{product.category}</p>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(Number(product.rating))
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm">({product.reviews})</span>
                  </div>

                  {/* PRICE + ADD BUTTON */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-900 font-bold">${Number(product.price).toFixed(2)}</span>
                      {product.original_price && (
                        <span className="text-gray-400 line-through text-sm">
                          ${Number(product.original_price).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id}
                      className="px-3 py-1.5 text-sm font-medium text-white rounded-lg bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 transition-all"
                      aria-label={`Add ${product.name} to cart`}
                    >
                      {addingToCart === product.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4" />
                          Add
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center px-8 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-md hover:shadow-lg transition-all"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
