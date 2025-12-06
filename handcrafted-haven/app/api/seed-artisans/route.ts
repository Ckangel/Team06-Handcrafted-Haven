import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const artisans = [
      {
        name: "Sarah Chen",
        bio: "Renowned ceramic artist.",
        email: "sarah@artisan.com",
        password: "123456",
        profile_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
      {
        name: "Kwame Osei",
        bio: "Master weaver from Ghana.",
        email: "kwame@artisan.com",
        password: "123456",
        profile_image: "https://images.unsplash.com/photo-1544725176-7c40e5a2c9f9",
      },
      {
        name: "Elena Rodriguez",
        bio: "Jewelry designer and silversmith.",
        email: "elena@artisan.com",
        password: "123456",
        profile_image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      },
      {
        name: "Tobias Müller",
        bio: "German wood sculptor.",
        email: "tobias@artisan.com",
        password: "123456",
        profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
      {
        name: "Layla Hassan",
        bio: "Middle Eastern leather artisan.",
        email: "layla@artisan.com",
        password: "123456",
        profile_image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      },
      {
        name: "Mariana Duarte",
        bio: "Brazilian textile designer.",
        email: "mariana@artisan.com",
        password: "123456",
        profile_image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      },
    ];

    for (const a of artisans) {
      // Create user
      const user = await sql`
        INSERT INTO users (email, password, role)
        VALUES (${a.email}, ${a.password}, 'seller')
        RETURNING id;
      `;

      const userId = user[0].id;

      // Create seller linked to user
      await sql`
        INSERT INTO sellers (name, bio, profile_image, user_id)
        VALUES (${a.name}, ${a.bio}, ${a.profile_image}, ${userId});
      `;
    }

    return NextResponse.json({
      message: "Artisans + users created successfully!",
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
