"use client";
import { ShoppingCart, User, Heart, Menu, LogOut, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "@/app/context/WishlistContext";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);

  const { data: session, status } = useSession();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const role = (user as any)?.role;

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold">H</span>
            </div>
            <span className="font-semibold text-gray-900">Handcrafted Haven</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex md:items-center md:gap-8">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm font-semibold">
                <li>
                  <Link href="/shop" className="text-gray-600 hover:text-gray-900">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="/artisans" className="text-gray-600 hover:text-gray-900">
                    Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-3">
              {/* Wishlist */}
              <Link href="/wishlist" className="relative p-2 rounded hover:bg-gray-100">
                <Heart className="h-5 w-5 text-[#F8333C]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#F8333C] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount > 9 ? "9+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 rounded hover:bg-gray-100">
                <ShoppingCart className="h-5 w-5 text-[#2b9eb3]" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </Link>

              {/* Auth buttons or account dropdown */}
              {!isLoggedIn ? (
                <div className="flex items-center gap-2 ml-2">
                  <Link
                    href="/login"
                    className="rounded-md bg-[#f8333c] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md border border-[#f8333c] px-4 py-2 text-sm font-medium text-[#f8333c] hover:bg-red-50 transition"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div ref={accountRef} className="relative ml-2">
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
                  >
                    <div className="h-8 w-8 rounded-full bg-[#2b9eb3] flex items-center justify-center text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </button>

                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">
                      <div className="px-4 py-2 border-b">
                        <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        <span className="inline-block mt-1 text-xs bg-[#44af69] text-white px-2 py-0.5 rounded-full capitalize">
                          {role === "seller" ? "Artisan" : "Buyer"}
                        </span>
                      </div>
                      <Link
                        href="/account"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="h-4 w-4" />
                        My Account
                      </Link>
                      <Link
                        href="/orders"
                        onClick={() => setAccountOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ShoppingCart className="h-4 w-4" />
                        My Orders
                      </Link>
                      {role === "seller" && (
                        <Link
                          href="/dashboard"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Menu className="h-4 w-4" />
                          Seller Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link href="/wishlist" className="relative p-2 rounded hover:bg-gray-100">
              <Heart className="h-5 w-5 text-[#F8333C]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-[#F8333C] text-white text-xs rounded-full flex items-center justify-center">
                  {wishlistCount > 9 ? "9+" : wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative p-2 rounded hover:bg-gray-100">
              <ShoppingCart className="h-5 w-5 text-[#2b9eb3]" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded bg-gray-100 p-2 text-gray-600"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-inner">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium text-base py-4">
            <li>
              <Link href="/shop" onClick={() => setMobileOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/artisans" onClick={() => setMobileOpen(false)}>
                Artisans
              </Link>
            </li>
            <li>
              <Link href="/categories" onClick={() => setMobileOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setMobileOpen(false)}>
                About
              </Link>
            </li>
          </ul>

          <div className="border-t pt-4">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-md bg-[#f8333c] px-4 py-2 text-sm font-medium text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="block text-center rounded-md border border-[#f8333c] px-4 py-2 text-sm font-medium text-[#f8333c]"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center gap-3 pb-2">
                  <div className="h-10 w-10 rounded-full bg-[#2b9eb3] flex items-center justify-center text-white font-medium">
                    {user?.name?.charAt(0).toUpperCase() ?? "U"}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                </div>
                <Link
                  href="/account"
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2 text-sm text-gray-700"
                >
                  My Account
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="block px-2 py-2 text-sm text-gray-700"
                >
                  My Orders
                </Link>
                {role === "seller" && (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block px-2 py-2 text-sm text-gray-700"
                  >
                    Seller Dashboard
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left px-2 py-2 text-sm text-red-600"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
