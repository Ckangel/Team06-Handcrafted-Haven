// app/artisans/page.tsx
import ArtisanCard from "../../components/ArtisanCard";
import { Artisan } from "../../types/artisan";

export default function ArtisansPage() {
  const artisans: Artisan[] = [
    {
      id: "ama-boateng",
      name: "Ama Boateng",
      craft: "Handwoven Baskets",
      imageUrl: "/artisan-sample.jpg",
      location: "Accra, Ghana",
      bio: "Ama has been weaving baskets for over 20 years...",
    },
    {
      id: "kwame-owusu",
      name: "Kwame Owusu",
      craft: "Wood Carving",
      imageUrl: "/artisan-sample.jpg",
      location: "Kumasi, Ghana",
      bio: "Kwame specializes in traditional Ashanti wood carvings.",
    },
  ];

  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Our Artisans</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {artisans.map((artisan) => (
          <ArtisanCard key={artisan.id} {...artisan} />
        ))}
      </div>
    </section>
  );
}
