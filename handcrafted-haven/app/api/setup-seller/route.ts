import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

// Update tables for seller dashboard
export async function GET() {
  try {
    // Add user_id to sellers table if not exists
    await sql`
      ALTER TABLE sellers 
      ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id)
    `;

    // Add description to products table if not exists
    await sql`
      ALTER TABLE products 
      ADD COLUMN IF NOT EXISTS description TEXT
    `;

    // Create index for seller user lookup
    await sql`
      CREATE INDEX IF NOT EXISTS idx_sellers_user ON sellers(user_id)
    `;

    return NextResponse.json({
      success: true,
      message: "Seller tables updated successfully",
    });
  } catch (error) {
    console.error("Error updating seller tables:", error);
    return NextResponse.json(
      { error: "Failed to update tables", details: String(error) },
      { status: 500 }
    );
  }
}
