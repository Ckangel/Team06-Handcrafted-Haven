export default function ArtisanSection() {
  return (
    <section className="px-6 py-20 mt-16 text-center rounded-lg bg-neutralLight">
      <h2 className="text-2xl font-bold mb-4">Featured Artisan</h2>

      <p className="text-gray-700 max-w-xl mx-auto mb-8">
        Discover the creative journey of one of our talented artisans and explore
        their finest handcrafted work.
      </p>

      <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center mb-6">
        artisan image
      </div>

      <button className="px-6 py-3 text-white rounded-full hover:scale-105 transition bg-primary">
        View Artisan
      </button>
    </section>
  );
}
