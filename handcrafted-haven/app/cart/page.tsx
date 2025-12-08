"use client";

import { useCart } from "@/app/context/CartContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function CartPage() {
  const { items, itemCount, totalPrice, updateQuantity, updateNotes, removeItem, clearCart, isLoading } = useCart();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";
  const isGuest = status === "unauthenticated";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading cart...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">
            Discover unique handcrafted items from talented artisans.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#44af69] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Start Shopping
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Shopping Cart ({itemCount} {itemCount === 1 ? "item" : "items"})
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Clear Cart
          </button>
        </div>

        {/* Guest warning */}
        {isGuest && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-800 font-medium">You&apos;re browsing as a guest</p>
              <p className="text-amber-700 text-sm mt-1">
                <Link href="/login" className="underline font-medium">Sign in</Link> or{" "}
                <Link href="/signup" className="underline font-medium">create an account</Link> to save your cart and checkout.
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemCard
                key={item.productId}
                item={item}
                onUpdateQuantity={(qty) => updateQuantity(item.productId, qty)}
                onUpdateNotes={(notes) => updateNotes(item.productId, notes)}
                onRemove={() => removeItem(item.productId)}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({itemCount} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {isLoggedIn ? (
                <Link
                  href="/checkout"
                  className="mt-6 w-full block text-center bg-[#44af69] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </Link>
              ) : (
                <div className="mt-6 space-y-3">
                  <Link
                    href="/login?callbackUrl=/checkout"
                    className="w-full block text-center bg-[#44af69] text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    Sign in to Checkout
                  </Link>
                  <Link
                    href="/signup?callbackUrl=/checkout"
                    className="w-full block text-center border border-[#44af69] text-[#44af69] py-3 rounded-lg font-medium hover:bg-green-50 transition"
                  >
                    Create Account
                  </Link>
                </div>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Secure checkout powered by Handcrafted Haven
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onUpdateNotes,
  onRemove,
}: {
  item: {
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    notes?: string;
    artisanName?: string;
  };
  onUpdateQuantity: (qty: number) => void;
  onUpdateNotes: (notes: string) => void;
  onRemove: () => void;
}) {
  const [showNotes, setShowNotes] = useState(!!item.notes);
  const [notes, setNotes] = useState(item.notes || "");

  const handleNotesBlur = () => {
    onUpdateNotes(notes);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <ShoppingBag className="h-8 w-8" />
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-2">
            <div>
              <h3 className="font-medium text-gray-900 truncate">{item.name}</h3>
              {item.artisanName && (
                <p className="text-sm text-gray-500">by {item.artisanName}</p>
              )}
            </div>
            <p className="font-semibold text-gray-900 flex-shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>

          <p className="text-sm text-gray-500 mt-1">${item.price.toFixed(2)} each</p>

          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(item.quantity - 1)}
                className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.quantity + 1)}
                className="p-1 rounded border hover:bg-gray-50 disabled:opacity-50"
                disabled={item.quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </button>
              {item.quantity >= 10 && (
                <span className="text-xs text-gray-500 ml-2">Max qty</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="text-sm text-[#2b9eb3] hover:underline"
              >
                {showNotes ? "Hide notes" : "Add note"}
              </button>
              <button
                onClick={onRemove}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      {showNotes && (
        <div className="mt-3 pt-3 border-t">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Note for artisan (optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value.slice(0, 140))}
            onBlur={handleNotesBlur}
            placeholder="Add customization requests or special instructions..."
            className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:ring-2 focus:ring-[#2b9eb3] focus:border-transparent"
            rows={2}
            maxLength={140}
          />
          <p className="text-xs text-gray-400 text-right mt-1">
            {notes.length}/140 characters
          </p>
        </div>
      )}
    </div>
  );
}
