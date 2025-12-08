"use client";

import { useWishlist } from "@/app/context/WishlistContext";
import { useCart } from "@/app/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const { items, removeItem } = useWishlist();
  const { addItem: addToCart } = useCart();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#44AF69]"></div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Sign in to view your wishlist</h1>
          <p className="text-gray-600 mb-6">Save your favorite items and access them anytime</p>
          <Link
            href="/login"
            className="inline-flex items-center px-6 py-3 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
          >
            Sign In
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    );
  }

  const handleMoveToCart = async (item: typeof items[0]) => {
    addToCart({
      productId: String(item.productId),
      name: item.name,
      price: item.price,
      image: item.image || "",
      quantity: 1,
    });
    await removeItem(item.productId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            <p className="text-gray-600 mt-1">{items.length} item{items.length !== 1 ? 's' : ''} saved</p>
          </div>
          <Heart className="w-8 h-8 text-[#F8333C]" />
        </div>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Browse our collection and save items you love</p>
            <Link
              href="/shop"
              className="inline-flex items-center px-6 py-3 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
            >
              Start Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.productId}
                className="bg-white rounded-xl shadow-sm overflow-hidden group hover:shadow-lg transition"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  {item.badge && (
                    <span className="absolute top-2 left-2 bg-[#F8333C] text-white text-xs px-2 py-1 rounded">
                      {item.badge}
                    </span>
                  )}
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4 text-[#F8333C]" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/products/${item.productId}`}>
                    <h3 className="font-semibold text-gray-800 hover:text-[#44AF69] transition truncate">
                      {item.name}
                    </h3>
                  </Link>
                  {item.artisanName && (
                    <p className="text-sm text-gray-500 mt-1">by {item.artisanName}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-[#44AF69]">
                      ${Number(item.price).toFixed(2)}
                    </span>
                    {item.originalPrice && Number(item.originalPrice) > Number(item.price) && (
                      <span className="text-sm text-gray-400 line-through">
                        ${Number(item.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleMoveToCart(item)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition text-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.productId)}
                      className="p-2 border border-gray-200 rounded-lg hover:border-[#F8333C] hover:text-[#F8333C] transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Link
            href="/shop"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:border-[#44AF69] hover:text-[#44AF69] transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="px-6 py-3 border border-gray-200 rounded-lg hover:border-[#44AF69] hover:text-[#44AF69] transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
