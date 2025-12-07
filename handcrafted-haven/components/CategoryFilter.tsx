"use client";

export default function CategoryFilter({
  currentCategory,
}: {
  currentCategory: string;
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
      <option value="Pottery">Pottery</option>
      <option value="Silver Pendants">Silver Pendants</option>
      <option value="Woven Mats">Woven Mats</option>
      <option value="Carved Wood">Carved Wood</option>
    </select>
  );
}
