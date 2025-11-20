// app/artisans/[id]/page.tsx
import { notFound } from "next/navigation";
import { Artisan } from "../../../types/artisan";

const artisans: Artisan[] = [
  {
    id: "ama-boateng",
    name: "Ama Boateng",
    craft: "Handwoven Baskets",
    imageUrl: "/artisan-sample.jpg",
    location: "Accra, Ghana",
    bio: "Ama has been weaving baskets for over 20 years, blending traditional techniques with modern designs.",
  },
  {
    id: "kwame-owusu",
    name: "Kwame Owusu",
    craft: "Wood Carving",
    imageUrl: "/artisan-sample.jpg",
    location: "Kumasi, Ghana",
    bio: "Kwame specializes in traditional Ashanti wood carvings, passed down through generations.",
  },
];

export default function ArtisanProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const artisan = artisans.find((a) => a.id === params.id);

  if (!artisan) {
    notFound();
  }

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <img
        src={artisan!.imageUrl}
        alt={`${artisan!.name}'s craft`}
        className="w-full h-64 object-cover rounded-md"
      />
      <h1 className="text-3xl font-bold mt-4">{artisan!.name}</h1>
      <p className="text-indigo-600 font-medium">{artisan!.craft}</p>
      {artisan!.location && (
        <p className="text-gray-500 mt-1">📍 {artisan!.location}</p>
      )}
      {artisan!.bio && <p className="mt-4 text-gray-700">{artisan!.bio}</p>}
    </section>
  );
}
