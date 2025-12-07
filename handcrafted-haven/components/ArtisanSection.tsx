"use client";

import { useEffect, useState } from "react";

export default function ArtisanSection() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    fetch("/api/artisans")
      .then((res) => res.json())
      .then((data) => setArtisans(data));
  }, []);

  return (
    <section className="px-6 py-16 max-w-6xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4 font-roboto text-accentBlue">
        Meet Our Artisans
      </h2>

      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">
        Get to know the talented creators behind the handcrafted treasures on our platform.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {artisans.map((artisan: any) => (
          <div key={artisan.id} className="flex flex-col items-start text-left">
            <img
              src={artisan.profile_image}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl">{artisan.name}</h3>
            <p className="text-gray-500">{artisan.bio}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
