import { sql } from "@/app/lib/db";
import Link from "next/link";

async function getCategoriesWithCounts() {
  return await sql`
    SELECT 
      c.id,
      c.name,
      c.description,
      COUNT(p.id) as "productCount"
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id, c.name, c.description
    ORDER BY c.name ASC
  `;
}

const categoryIcons: Record<string, string> = {
  Pottery: "🏺",
  "Silver Pendants": "💎",
  "Woven Mats": "🧶",
  "Carved Wood": "🪵",
  "Hand Woven Blankets": "🧣",
  Sculpture: "🗿",
  "Wooden Nativity Sets": "⭐",
  "Benin Bronze Masks": "🎭",
  "Local Kente Ties": "👔",
  "Aso Oke / Jorge": "🎨",
  "Beaded Jewelry": "📿",
  "Leather Goods": "👜",
};

const categoryColors: Record<string, string> = {
  Pottery: "from-amber-500 to-orange-500",
  "Silver Pendants": "from-purple-500 to-pink-500",
  "Woven Mats": "from-blue-500 to-cyan-500",
  "Carved Wood": "from-emerald-600 to-green-500",
  "Hand Woven Blankets": "from-rose-500 to-red-500",
  Sculpture: "from-slate-600 to-gray-500",
  "Wooden Nativity Sets": "from-yellow-500 to-amber-500",
  "Benin Bronze Masks": "from-orange-600 to-amber-600",
  "Local Kente Ties": "from-indigo-500 to-purple-500",
  "Aso Oke / Jorge": "from-fuchsia-500 to-pink-500",
  "Beaded Jewelry": "from-teal-500 to-cyan-500",
  "Leather Goods": "from-amber-700 to-orange-700",
};

export default async function CategoriesPage() {
  const categories = await getCategoriesWithCounts();

  return (
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-roboto text-accentBlue">
          Browse by Category
        </h1>
        <p className="text-gray-600 mb-12 max-w-3xl">
          Explore our diverse collection of handcrafted items organized by
          category. Each piece is made with care and tradition.
        </p>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No categories found.</p>
            <p className="text-gray-400 mt-2">Categories will appear once products are added.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category: any) => (
              <Link
                href={`/shop?category=${encodeURIComponent(category.name)}`}
                key={category.id}
                className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:border-[#44AF69] transition-all cursor-pointer group"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${categoryColors[category.name] || "from-gray-500 to-gray-600"} mb-4 flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform`}
                  aria-hidden="true"
                >
                  <span>
                    {categoryIcons[category.name] || category.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#44AF69] transition">{category.name}</h3>
                {category.description && (
                  <p className="text-gray-600 text-sm mb-2">
                    {category.description}
                  </p>
                )}
                <p className="text-[#2B9EB3] font-semibold">
                  {category.productCount} {Number(category.productCount) === 1 ? 'item' : 'items'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
  );
}
