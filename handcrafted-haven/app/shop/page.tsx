import { getProducts, getCategories } from "@/app/lib/data";
import CategoryFilter from "@/components/CategoryFilter";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  
  const params = await searchParams;
  const category = (params?.category as string) || "";

  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const filtered = category
    ? products.filter((p) => p.category === category)
    : products;

  return (
      <div className="px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 font-roboto text-accentBlue">
          Shop All Products
        </h1>

        {/* Filter */}
        <div className="mb-8">
          <CategoryFilter currentCategory={category} categories={categories} />
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <div key={product.id} className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <Link href={`/shop/${product.id}`}>
                <div className="w-full h-64 overflow-hidden bg-gray-200 relative">
                  <ProductImage
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="hover:scale-105 transition-transform"
                  />
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                <Link href={`/shop/${product.id}`} className="hover:text-[#44AF69]">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                </Link>
                <p className="text-gray-500 text-sm">{product.artisan}</p>
                <p className="text-sm text-gray-400">{product.category}</p>
                <div className="flex items-center justify-between mt-auto pt-3">
                  <p className="font-semibold text-lg">${product.price}</p>
                  <AddToCartButton 
                    product={{
                      id: String(product.id),
                      name: product.name,
                      price: Number(product.price),
                      image: product.image_url,
                      artisanName: product.artisan,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
            <Link href="/shop" className="text-[#44AF69] hover:underline mt-2 inline-block">
              View all products
            </Link>
          </div>
        )}
      </div>
  );
}
