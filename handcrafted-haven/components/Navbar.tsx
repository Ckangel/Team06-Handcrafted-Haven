// components/Navbar.tsx
"use client"; // enables client-side interactivity

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/artisans", label: "Artisans" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          Handicraft Haven
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-indigo-200 ${
                pathname === item.href ? "underline font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
