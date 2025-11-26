"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between shadow relative bg-accentYellow">
      <Link href="/" className="font-bold text-xl hover:opacity-80 transition">
        Handcrafted Haven
      </Link>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-semibold">
        <li>
          <Link href="/shop" className="hover:text-accentBlue transition">
            Shop
          </Link>
        </li>
        <li>
          <Link href="/artisans" className="hover:text-accentBlue transition">
            Artisans
          </Link>
        </li>
        <li>
          <Link href="/categories" className="hover:text-accentBlue transition">
            Categories
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-accentBlue transition">
            About
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full p-4 flex flex-col gap-4 md:hidden bg-accentYellow z-50">
          <Link
            href="/shop"
            className="hover:text-accentBlue transition"
            onClick={() => setOpen(false)}
          >
            Shop
          </Link>
          <Link
            href="/artisans"
            className="hover:text-accentBlue transition"
            onClick={() => setOpen(false)}
          >
            Artisans
          </Link>
          <Link
            href="/categories"
            className="hover:text-accentBlue transition"
            onClick={() => setOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/about"
            className="hover:text-accentBlue transition"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
        </div>
      )}
    </nav>
  );
}
