import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function ArtisansPage() {
  const artisans = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "The Potter",
      specialty: "Pottery",
      bio: "Creating beautiful ceramic pieces inspired by traditional techniques.",
      image:"https://unsplash.com/collections/8955871/face",
    },
    {
      id: 2,
      name: "Kwame Osei",
      title: "The Weaver",
      specialty: "Woven Textiles",
      bio: "Master weaver specializing in traditional Kente cloth and blankets.",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      title: "The Jeweler",
      specialty: "Silver Jewelry",
      bio: "Handcrafting unique silver pendants with modern and traditional designs.",
    },
    {
      id: 4,
      name: "Adebayo Ade",
      title: "The Wood Carver",
      specialty: "Carved Wood",
      bio: "Expert in creating intricate wooden sculptures and nativity sets.",
    },
    {
      id: 5,
      name: "Maria Santos",
      title: "The Sculptor",
      specialty: "Bronze & Clay",
      bio: "Specialized in Benin bronze masks and contemporary sculptures.",
    },
    {
      id: 6,
      name: "Ibrahim Yusuf",
      title: "The Textile Artist",
      specialty: "Aso Oke Fabrics",
      bio: "Traditional hand-weaving of Aso Oke and Jorge fabrics.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 font-roboto text-accentBlue">
          Meet Our Artisans
        </h1>
        <p className="text-gray-600 mb-12 max-w-3xl">
          Discover the talented creators behind our handcrafted treasures. Each
          artisan brings their unique story, skill, and passion to every piece
          they create.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="flex flex-col items-start text-left cursor-pointer hover:shadow-lg transition-shadow p-4 rounded-lg"
            >
              <div className="w-full h-80 bg-gray-300 rounded-lg mb-4"></div>
              <h3 className="font-bold text-xl">{artisan.name}</h3>
              <p className="text-gray-500 text-sm italic">{artisan.title}</p>
              <p className="text-primary font-semibold mt-1">
                {artisan.specialty}
              </p>
              <p className="text-gray-600 mt-3 text-sm">{artisan.bio}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
