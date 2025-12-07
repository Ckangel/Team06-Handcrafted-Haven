import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getProducts } from "@/app/lib/data";
import CategoryFilter from "@/components/CategoryFilter";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  
  const params = await searchParams;
  const category = (params?.category as string) || "";

  const products = await getProducts();

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-roboto text-accentBlue">
          Shop All Products
        </h1>

        {/* Filter */}
        <div className="mb-8">
  <CategoryFilter currentCategory={category} />
</div>


        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="flex flex-col cursor-pointer">
              <div className="w-full h-64 mb-4 rounded-lg overflow-hidden bg-gray-200">
                <img
                  src={product.image_url ?? "https://via.placeholder.com/400"}

                  alt={product.name}
                  className="h-full w-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.artisan}</p>
              <p className="font-semibold">${product.price}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
