import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // USERS TABLE
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT,
        name TEXT,
        role TEXT DEFAULT 'buyer',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;

    // Add name column if it doesn't exist (for existing tables)
    await sql`
      ALTER TABLE users
      ADD COLUMN IF NOT EXISTS name TEXT;
    `;

    // Update password to allow NULL for OAuth users
    await sql`
      ALTER TABLE users
      ALTER COLUMN password DROP NOT NULL;
    `;

    // ADD user_id to sellers
    await sql`
      ALTER TABLE sellers
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
    `;

    return NextResponse.json({ message: "Auth tables created/updated!" });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
