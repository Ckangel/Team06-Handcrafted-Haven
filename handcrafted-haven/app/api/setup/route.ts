import { sql } from "@/app/lib/db";

import { NextResponse } from "next/server";
 
export async function GET() {

  try {

    // SELLERS (artisans)

    await sql`

      CREATE TABLE IF NOT EXISTS sellers (

        id SERIAL PRIMARY KEY,

        name TEXT NOT NULL,

        bio TEXT,

        profile_image TEXT,

        created_at TIMESTAMP DEFAULT NOW()

      );

    `;
 
    // PRODUCTS

    await sql`

      CREATE TABLE IF NOT EXISTS products (

        id SERIAL PRIMARY KEY,

        seller_id INTEGER REFERENCES sellers(id),

        name TEXT NOT NULL,               -- corresponds to name

        price NUMERIC NOT NULL,           -- corresponds to price

        original_price NUMERIC,           -- corresponds to originalPrice?

        image_url TEXT,                   -- corresponds to image

        badge TEXT,                       -- corresponds to badge

        created_at TIMESTAMP DEFAULT NOW()

      );

    `;
 
    // REVIEWS

    await sql`

      CREATE TABLE IF NOT EXISTS reviews (

        id SERIAL PRIMARY KEY,

        product_id INTEGER REFERENCES products(id),

        rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),

        comment TEXT,

        user_name TEXT,

        created_at TIMESTAMP DEFAULT NOW()

      );

    `;
 
    return NextResponse.json({ message: "Tables created successfully!" });

  } catch (error) {

    return NextResponse.json({ error: error instanceof Error ? error.message : 'An error occurred' }, { status: 500 });

  }

}

 