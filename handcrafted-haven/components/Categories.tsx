"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

// Category icon mapping
const categoryIcons: Record<string, string> = {
  "Pottery": "🏺",
  "Silver Pendants": "💎",
  "Woven Mats": "🧶",
  "Carved Wood": "🪵",
  "Hand Woven Blankets": "🧣",
  "Sculpture": "🗿",
  "Wooden Nativity Sets": "⭐",
  "Benin Bronze Masks": "🎭",
  "Local Kente Ties": "👔",
  "Aso Oke / Jorge": "🎨",
  "Beaded Jewelry": "📿",
  "Leather Goods": "👜",
};

// Category color mapping
const categoryColors: Record<string, string> = {
  "Pottery": "from-amber-500 to-orange-500",
  "Silver Pendants": "from-purple-500 to-pink-500",
  "Woven Mats": "from-blue-500 to-cyan-500",
  "Carved Wood": "from-emerald-600 to-green-500",
  "Hand Woven Blankets": "from-rose-500 to-red-500",
  "Sculpture": "from-slate-600 to-gray-500",
  "Wooden Nativity Sets": "from-yellow-500 to-amber-500",
  "Benin Bronze Masks": "from-orange-600 to-amber-600",
  "Local Kente Ties": "from-indigo-500 to-purple-500",
  "Aso Oke / Jorge": "from-fuchsia-500 to-pink-500",
  "Beaded Jewelry": "from-teal-500 to-cyan-500",
  "Leather Goods": "from-amber-700 to-orange-700",
};

interface Category {
  id: number;
  name: string;
  description?: string;
  productCount: number;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories/with-counts");
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our curated collection of handcrafted items across various categories
            </p>
          </div>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
          </div>
        </div>
      </section>
    );
  }

  // Take up to 8 categories for homepage display
  const displayCategories = categories.slice(0, 8);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of handcrafted items across various categories
          </p>
        </div>

        {displayCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayCategories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                className="p-6 rounded-xl bg-white shadow-sm hover:shadow-lg border border-gray-100 hover:border-amber-200 transition-all cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={`h-14 w-14 rounded-full bg-gradient-to-br ${
                      categoryColors[category.name] || "from-gray-500 to-gray-600"
                    } flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}
                  >
                    <span className="text-2xl">
                      {categoryIcons[category.name] || category.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold group-hover:text-amber-600 transition-colors">
                      {category.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {category.productCount} {Number(category.productCount) === 1 ? "item" : "items"}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {categories.length > 8 && (
          <div className="text-center mt-8">
            <Link
              href="/categories"
              className="text-amber-600 hover:text-amber-700 font-medium inline-flex items-center gap-1"
            >
              View all categories →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}