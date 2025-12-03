import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getProducts } from "@/app/lib/data";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-roboto text-accentBlue">
          Shop All Products
        </h1>

        {/* Filter */}
        <div className="mb-8">
          <label htmlFor="filter" className="mr-4 font-semibold">
            Filter by Category:
          </label>
          <select
            id="filter"
            className="border border-gray-300 rounded px-4 py-2"
          >
            <option value="">All Categories</option>
            <option value="Woven Mats">Woven Mats</option>
            <option value="Pottery">Pottery</option>
            <option value="Silver Pendants">Silver Pendants</option>
            <option value="Carved Wood">Carved Wood</option>
            <option value="Hand Woven Blankets">Hand Woven Blankets</option>
            <option value="Benin Bronze Masks">Benin Bronze Masks</option>
            <option value="Sculpture">Sculpture</option>
            <option value="Local Kente Ties">Local Kente Ties</option>
            <option value="Wooden Nativity Sets">Wooden Nativity Sets</option>
            <option value="Aso Oke">Aso Oke</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start text-left group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-200">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-300" />
                )}
              </div>

              {/* NAME */}
              <h3 className="font-bold text-lg">{product.name}</h3>

              {/* CATEGORY */}
              <p className="text-gray-500 text-sm">{product.artisan}</p>

              {/* PRICE */}
              <p className="font-semibold text-primary mt-1">
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
