import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ShopPage() {
  const products = [
    { id: 1, name: "Woven Mat", price: "$45.00", category: "Woven Mats" },
    { id: 2, name: "Ceramic Vase", price: "$32.00", category: "Pottery" },
    { id: 3, name: "Silver Pendant", price: "$28.00", category: "Silver Pendants" },
    { id: 4, name: "Carved Wooden Bowl", price: "$55.00", category: "Carved Wood" },
    { id: 5, name: "Handwoven Blanket", price: "$80.00", category: "Hand Woven Blankets" },
    { id: 6, name: "Bronze Mask", price: "$120.00", category: "Benin Bronze Masks" },
    { id: 7, name: "Wooden Sculpture", price: "$95.00", category: "Sculpture" },
    { id: 8, name: "Kente Tie", price: "$40.00", category: "Local Kente Ties" },
    { id: 9, name: "Nativity Set", price: "$150.00", category: "Wooden Nativity Sets" },
    { id: 10, name: "Aso Oke Cloth", price: "$110.00", category: "Aso Oke / Jorge" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-roboto text-accentBlue">
          Shop All Products
        </h1>

        <div className="mb-8">
          <label htmlFor="filter" className="mr-4 font-semibold">
            Filter by Category:
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="woven">Woven Mats</option>
            <option value="pottery">Pottery</option>
            <option value="silver">Silver Pendants</option>
            <option value="wood">Carved Wood</option>
            <option value="blankets">Hand Woven Blankets</option>
            <option value="bronze">Benin Bronze Masks</option>
            <option value="sculpture">Sculpture</option>
            <option value="ties">Local Kente Ties</option>
            <option value="nativity">Wooden Nativity Sets</option>
            <option value="aso">Aso Oke / Jorge</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start text-left group cursor-pointer"
            >
              <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 transition-transform group-hover:scale-105"></div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.category}</p>
              <p className="font-semibold text-primary mt-1">{product.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
