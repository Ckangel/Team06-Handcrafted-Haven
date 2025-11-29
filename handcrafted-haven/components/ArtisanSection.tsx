"use client";
import { Heart, Star } from "lucide-react";

export default function ArtisanSection() {
  const artisans = [
    { id: 1, name: "Sarah Chen", title: "The Potter" },
    { id: 2, name: "Kwame Osei", title: "The Weaver" },
    { id: 3, name: "Elena Rodriguez", title: "The Jeweler" },
  ];

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 font-roboto text-accentBlue">
        Meet Our Artisans
      </h2>
      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Get to know the talented creators behind the handcrafted treasures on our
        platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {artisans.map((artisan) => (
          <div key={artisan.id} className="flex flex-col items-start text-left">
            <div className="w-full h-64 bg-gray-300 rounded-lg mb-4"></div>
            <h3 className="font-bold text-xl">{artisan.name}</h3>
            <p className="text-gray-500">{artisan.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
