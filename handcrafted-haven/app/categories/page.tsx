import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Woven Mats",
      description: "Traditional hand-woven mats crafted with natural fibers.",
      productCount: 12,
    },
    {
      id: 2,
      name: "Pottery",
      description: "Handcrafted ceramic vases, bowls, and decorative pieces.",
      productCount: 18,
    },
    {
      id: 3,
      name: "Silver Pendants",
      description: "Elegant handmade silver jewelry with unique designs.",
      productCount: 24,
    },
    {
      id: 4,
      name: "Carved Wood",
      description: "Intricate wooden carvings and sculptures.",
      productCount: 15,
    },
    {
      id: 5,
      name: "Hand Woven Blankets",
      description: "Cozy blankets woven with traditional techniques.",
      productCount: 8,
    },
    {
      id: 6,
      name: "Sculpture",
      description: "Contemporary and traditional sculptural art pieces.",
      productCount: 10,
    },
    {
      id: 7,
      name: "Wooden Nativity Sets",
      description: "Beautifully carved nativity sets for the holiday season.",
      productCount: 6,
    },
    {
      id: 8,
      name: "Benin Bronze Masks",
      description: "Traditional bronze masks inspired by Benin art.",
      productCount: 9,
    },
    {
      id: 9,
      name: "Local Kente Ties",
      description: "Stylish ties made from authentic Kente cloth.",
      productCount: 14,
    },
    {
      id: 10,
      name: "Aso Oke / Jorge",
      description: "Hand-woven traditional fabrics from West Africa.",
      productCount: 11,
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-roboto text-accentBlue">
          Browse by Category
        </h1>
        <p className="text-gray-600 mb-12 max-w-3xl">
          Explore our diverse collection of handcrafted items organized by
          category. Each piece is made with care and tradition.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center text-center p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-accentYellow mb-4"></div>
              <h3 className="font-bold text-lg mb-2">{category.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                {category.description}
              </p>
              <p className="text-primary font-semibold">
                {category.productCount} items
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
