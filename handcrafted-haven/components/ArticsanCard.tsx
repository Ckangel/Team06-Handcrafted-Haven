// components/ArtisanCard.tsx
import React from "react";
import Link from "next/link";

type ArtisanCardProps = {
  id: string;
  name: string;
  craft: string;
  imageUrl: string;
  location?: string;
  bio?: string;
};

const ArtisanCard: React.FC<ArtisanCardProps> = ({
  id,
  name,
  craft,
  imageUrl,
  location,
  bio,
}) => {
  return (
    <div className="max-w-sm rounded-lg shadow-md overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={`${name}'s craft`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-indigo-600 font-medium">{craft}</p>
        {location && <p className="text-sm text-gray-500 mt-1">📍 {location}</p>}
        {bio && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{bio}</p>
        )}
        <Link
          href={`/artisans/${id}`}
          className="mt-4 block w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors text-center"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default ArtisanCard;
