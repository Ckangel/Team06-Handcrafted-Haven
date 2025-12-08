import { getArtisanById, getProductsByArtisan } from "@/app/lib/data";

export default async function ArtisanProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artisanId = Number(id);

  const artisan = await getArtisanById(artisanId);
  const products = await getProductsByArtisan(artisanId);

  if (!artisan) {
    return (
      <div className="text-center p-10">
        <h1 className="text-2xl font-bold">Artisan Not Found</h1>
      </div>
    );
  }

  return (
      <div className="px-6 py-16 max-w-6xl mx-auto">

        {/* Artisan Header */}
        <section className="flex flex-col md:flex-row gap-8 items-start mb-12">
          <div className="w-64 h-64 bg-gray-300 rounded-lg overflow-hidden">
            <img
              src={artisan.profile_image || "/no-image-placeholder.jpg"}
              alt={artisan.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-accentBlue">{artisan.name}</h1>
            <p className="text-gray-500 text-xl italic">{artisan.title}</p>
            <p className="text-primary font-semibold mt-2">{artisan.specialty}</p>

            <p className="text-gray-700 mt-6 max-w-xl leading-relaxed">
              {artisan.bio}
            </p>
          </div>
        </section>

        {/* Artisan Products */}
        <h2 className="text-3xl font-bold mb-6">Crafted Items</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="cursor-pointer">
              <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={product.image_url ?? "/no-image-placeholder.jpg"}
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="font-bold mt-3">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>

      </div>
  );
}
