"use client";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    setIsLoading(false);
    setIsSubscribed(true);
  };

  return (
    <footer className="w-full bg-gradient-to-br from-[#2b9eb3] to-[#1e7a8a]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-12 border-b border-white/20">
          {/* Logo & Tagline */}
          <div>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <div className="text-white font-bold text-2xl tracking-wide">
                  Handcrafted Haven
                </div>
                <div className="text-white/70 text-sm">
                  Where artistry meets authenticity
                </div>
              </div>
            </Link>
            <p className="mt-6 text-white/80 max-w-md leading-relaxed">
              Connecting creators with those who value handmade art. Every purchase supports independent artisans and preserves traditional craftsmanship.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-6" role="list" aria-label="Social media links">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Follow us on Instagram"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Follow us on Facebook"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://pinterest.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Follow us on Pinterest"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:pl-12">
            <h3 className="text-white font-semibold text-lg mb-2">Stay Connected</h3>
            <p className="text-white/70 mb-4">
              Subscribe to get updates on new artisans, exclusive collections, and special offers.
            </p>
            
            {isSubscribed ? (
              /* Success State */
              <div className="bg-white/10 border border-[#44AF69]/50 rounded-lg p-6 text-center">
                <div className="w-16 h-16 bg-[#44AF69] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-white font-semibold text-lg mb-2">You&apos;re Subscribed! 🎉</h4>
                <p className="text-white/70 text-sm">
                  Thanks for joining our community! Check your inbox for a welcome surprise.
                </p>
              </div>
            ) : (
              /* Subscribe Form */
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className={`flex-1 px-4 py-3 rounded-lg bg-white/10 border ${error ? 'border-[#f8333c]' : 'border-white/20'} text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30`}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="px-6 py-3 bg-[#fcab10] text-gray-900 font-semibold rounded-lg hover:bg-[#e09a0e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                    aria-label="Subscribe to newsletter"
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </div>
                {error && (
                  <p className="text-[#f8333c] text-sm flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {error}
                  </p>
                )}
                <p className="text-white/50 text-xs mt-3">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-2 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 - Shop */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Shop
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="/shop" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#fcab10] rounded-full"></span>
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#fcab10] rounded-full"></span>
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#fcab10] rounded-full"></span>
                  Your Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#fcab10] rounded-full"></span>
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - Artisans */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Artisans
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="/artisans" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#44AF69] rounded-full"></span>
                  Meet the Makers
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#44AF69] rounded-full"></span>
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Account */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="/account" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#f8333c] rounded-full"></span>
                  My Account
                </Link>
              </li>
              <li>
                <Link href="/orders" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#f8333c] rounded-full"></span>
                  Order History
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#f8333c] rounded-full"></span>
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-[#f8333c] rounded-full"></span>
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Company */}
          <div>
            <h4 className="font-semibold text-white text-lg mb-4 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Company
            </h4>
            <ul className="space-y-3 text-white/80">
              <li>
                <Link href="/about" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white hover:pl-1 transition-all flex items-center gap-2">
                  <span className="w-1 h-1 bg-white/60 rounded-full"></span>
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/70">
              © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <span>Made with</span>
              <svg className="w-4 h-4 text-[#f8333c]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
              <span>for artisans everywhere</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
