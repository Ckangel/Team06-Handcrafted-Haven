"use client";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between shadow relative bg-accentYellow">
      <div className="font-bold text-xl">Logo</div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex gap-6 font-semibold">
        <li>Shop</li>
        <li>Artisans</li>
        <li>Categories</li>
        <li>About</li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-16 left-0 w-full p-4 flex flex-col gap-4 md:hidden bg-accentYellow">
          <button>Shop</button>
          <button>Artisans</button>
          <button>Categories</button>
          <button>About</button>
        </div>
      )}
    </nav>
  );
}
