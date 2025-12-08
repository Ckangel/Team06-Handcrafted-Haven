"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Loader2, User, ShoppingBag, Package, Star, LogOut, Settings, Store } from "lucide-react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user;
  const role = (user as any)?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/account");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#2b9eb3] flex items-center justify-center text-white text-2xl font-bold">
              {user.name?.charAt(0).toUpperCase() ?? "U"}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-500">{user.email}</p>
              <span className="inline-block mt-1 text-sm bg-[#44af69] text-white px-3 py-0.5 rounded-full capitalize">
                {role === "seller" ? "Artisan" : "Buyer"}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <Link
            href="/orders"
            className="bg-white rounded-lg shadow-sm border p-6 hover:border-[#44af69] transition group"
          >
            <Package className="h-8 w-8 text-[#2b9eb3] mb-3" />
            <h2 className="font-semibold text-gray-900 group-hover:text-[#44af69]">My Orders</h2>
            <p className="text-sm text-gray-500 mt-1">View order history and tracking</p>
          </Link>

          <Link
            href="/cart"
            className="bg-white rounded-lg shadow-sm border p-6 hover:border-[#44af69] transition group"
          >
            <ShoppingBag className="h-8 w-8 text-[#2b9eb3] mb-3" />
            <h2 className="font-semibold text-gray-900 group-hover:text-[#44af69]">Shopping Cart</h2>
            <p className="text-sm text-gray-500 mt-1">Continue shopping or checkout</p>
          </Link>

          <Link
            href="/wishlist"
            className="bg-white rounded-lg shadow-sm border p-6 hover:border-[#44af69] transition group"
          >
            <Star className="h-8 w-8 text-[#fcab10] mb-3" />
            <h2 className="font-semibold text-gray-900 group-hover:text-[#44af69]">Wishlist</h2>
            <p className="text-sm text-gray-500 mt-1">View saved items</p>
          </Link>

          {role === "seller" && (
            <Link
              href="/dashboard"
              className="bg-white rounded-lg shadow-sm border p-6 hover:border-[#44af69] transition group"
            >
              <Store className="h-8 w-8 text-[#44af69] mb-3" />
              <h2 className="font-semibold text-gray-900 group-hover:text-[#44af69]">Seller Dashboard</h2>
              <p className="text-sm text-gray-500 mt-1">Manage your products and orders</p>
            </Link>
          )}
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h2>

          <div className="space-y-3">
            <Link
              href="/account/profile"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Edit Profile</p>
                <p className="text-sm text-gray-500">Update your name and email</p>
              </div>
            </Link>

            <Link
              href="/account/settings"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              <Settings className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">Account Settings</p>
                <p className="text-sm text-gray-500">Password and preferences</p>
              </div>
            </Link>

            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition w-full text-left"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-red-600">Sign Out</p>
                <p className="text-sm text-gray-500">Log out of your account</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
