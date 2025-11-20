export default function FeaturedProducts() {
  const products = [
    { id: 1, name: "Woven Mat", price: "$45.00" },
    { id: 2, name: "Ceramic Vase", price: "$32.00" },
    { id: 3, name: "Silver Pendant", price: "$28.00" },
    { id: 4, name: "Carved Wooden Bowl", price: "$55.00" },
    { id: 5, name: "Handwoven Blanket", price: "$80.00" },
    { id: 6, name: "Bronze Mask", price: "$120.00" },
  ];

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-2 font-roboto text-accentBlue">
        Featured Products
      </h2>
      <p className="text-gray-600 mb-10">
        Discover our hand-picked selection of exceptional handcrafted items, from
        talented artisans.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-start text-left group"
          >
            <div className="w-full h-64 bg-gray-200 rounded-lg mb-4 transition-transform group-hover:scale-105"></div>
            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-500 text-sm">The Artisan's Touch</p>
            <p className="font-semibold text-primary mt-1">{product.price}</p>
          </div>
        ))}
      </div>

      <button className="mt-12 px-8 py-3 border-2 border-black rounded-full font-bold hover:bg-black hover:text-white transition">
        SEE MORE...
      </button>
    </section>
  );
}
