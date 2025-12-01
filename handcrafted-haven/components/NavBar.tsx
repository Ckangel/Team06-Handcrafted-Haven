"use client";
import { ShoppingCart, Search, User, Heart, Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* LEFT Logo */}
<Link href="/" className="flex items-center gap-2">
  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <span className="text-white">H</span>
              </div>
              <span className="font-semibold text-gray-900">Handcrafted Haven</span>
  
</Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex md:items-center md:gap-12">
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-sm font-semibold">
                <li>
                  <Link href="/shop" className="text-gray-600 hover:text-gray-500/75">
                    Shop
                  </Link>
                </li>

                <li>
                  <Link href="/artisans" className="text-gray-600 hover:text-gray-500/75">
                    Artisans
                  </Link>
                </li>

                <li>
                  <Link href="/categories" className="text-gray-600 hover:text-gray-500/75">
                    Categories
                  </Link>
                </li>

                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-500/75">
                    About
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Buttons*/}
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">

    {/* Login */}
    <Link
      href="#"
      className="rounded-md bg-[#f8333c] px-5 py-2.5 text-sm font-medium text-white shadow-sm"
    >
      Login
    </Link>

    {/* Register */}
    <div className="hidden sm:flex">
      <Link
        href="#"
        className="rounded-md bg-white border border-[#f8333c] px-5 py-2.5 text-sm font-medium text-[#f8333c]"
      >
        Register
      </Link>
      <div className="hidden md:flex items-center gap-3">
  <button className="p-2 rounded hover:bg-gray-100">
    <Heart className="h-5 w-5 text-[#2b9eb3]" />
  </button>

  <button className="relative p-2 rounded hover:bg-gray-100">
    <ShoppingCart className="h-5 w-5 text-[#2b9eb3]" />
    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 
    text-white text-xs rounded-full flex items-center justify-center">
      3
    </span>
  </button>

  <button className="p-2 rounded hover:bg-gray-100">
    <User className="h-5 w-5 text-[#2b9eb3]" />
  </button>
</div>
    </div>
              </div>
            </div>
          </div>

          {/* MOBILE BUTTON */}
          <div className="block md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-inner">
          <ul className="flex flex-col gap-4 text-gray-700 font-medium text-base py-4">
            <li>
              <Link href="/shop" onClick={() => setOpen(false)}>
                Shop
              </Link>
            </li>
            <li>
              <Link href="/artisans" onClick={() => setOpen(false)}>
                Artisans
              </Link>
            </li>
            <li>
              <Link href="/categories" onClick={() => setOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            
          </ul>
         {/* Actions */}
<div className="flex items-center gap-2">
<button className="hidden md:flex p-2 rounded hover:bg-white/10">
<Heart className="h-5 w-5" />
</button>


<button className="relative p-2 rounded hover:bg-white/10">
<ShoppingCart className="h-5 w-5" />
<span className="absolute -top-1 -right-1 h-5 w-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
3
</span>
</button>


<button className="hidden md:flex p-2 rounded hover:bg-white/10">
<User className="h-5 w-5" />
</button>


<button className="md:hidden p-2 rounded hover:bg-white/10">
<Menu className="h-5 w-5" />
</button>
</div>
        </div>
        
      )}
       
    </header>
  );
}
