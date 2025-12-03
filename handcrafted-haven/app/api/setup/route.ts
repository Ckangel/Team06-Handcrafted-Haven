import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // REMOVE OLD TABLES
    await sql`DROP TABLE IF EXISTS reviews CASCADE;`;
    await sql`DROP TABLE IF EXISTS products CASCADE;`;
    await sql`DROP TABLE IF EXISTS sellers CASCADE;`;

    // RECREATE sellers
    await sql`
      CREATE TABLE sellers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        bio TEXT,
        profile_image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // RECREATE products
    await sql`
      CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        seller_id INTEGER REFERENCES sellers(id),
        name TEXT NOT NULL,
        price NUMERIC NOT NULL,
        original_price NUMERIC,
        image_url TEXT,
        badge TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // RECREATE reviews
    await sql`
      CREATE TABLE reviews (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
        comment TEXT,
        user_name TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    return NextResponse.json({ message: "Tables RESET and CREATED successfully!" });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
