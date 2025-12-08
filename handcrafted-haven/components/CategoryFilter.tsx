"use client";

interface Category {
  id: number;
  name: string;
}

export default function CategoryFilter({
  currentCategory,
  categories,
}: {
  currentCategory: string;
  categories: Category[];
}) {
  return (
    <select
      value={currentCategory || ""}
      onChange={(e) => {
        const value = e.target.value;
        window.location.href = value ? `/shop?category=${value}` : "/shop";
      }}
      className="border border-gray-300 rounded px-4 py-2"
    >
      <option value="">All Categories</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.name}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
