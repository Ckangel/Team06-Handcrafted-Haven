import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // USERS TABLE
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'seller',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // ADD user_id to sellers
    await sql`
      ALTER TABLE sellers
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
    `;

    return NextResponse.json({ message: "Auth tables created!" });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
