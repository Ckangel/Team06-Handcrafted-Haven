import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { getArtisans } from "@/app/lib/data";
import Link from "next/link";

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  return (
    <>
      <Navbar />

      <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-roboto text-accentBlue">
          Meet Our Artisans
        </h1>

        <p className="text-gray-600 mb-12 max-w-3xl">
          Discover the talented creators behind our handcrafted treasures.
          Each artisan brings their unique story, skill, and passion
          to every piece they create.
        </p>

        {/* ARTISANS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <Link
              href={`/artisans/${artisan.id}`}
              key={artisan.id}
              className="flex flex-col items-start text-left 
                         cursor-pointer hover:shadow-lg transition-shadow 
                         p-4 rounded-lg"
            >
              {/* IMAGE */}
              <div className="w-full h-80 bg-gray-300 rounded-lg mb-4 overflow-hidden">
                {artisan.profile_image ? (
                  <img
                    src={artisan.profile_image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>

              {/* NAME */}
              <h3 className="font-bold text-xl">{artisan.name}</h3>

              {/* TITLE */}
              <p className="text-gray-500 text-sm italic">{artisan.title}</p>

              {/* SPECIALTY */}
              <p className="text-primary font-semibold mt-1">
                {artisan.specialty}
              </p>

              {/* BIO */}
              <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                {artisan.bio}
              </p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
