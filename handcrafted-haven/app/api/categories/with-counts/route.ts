import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

// GET /api/categories/with-counts - Get all categories with product counts
export async function GET() {
  try {
    const categories = await sql`
      SELECT 
        c.id,
        c.name,
        c.description,
        COUNT(p.id) as "productCount"
      FROM categories c
      LEFT JOIN products p ON p.category_id = c.id
      GROUP BY c.id, c.name, c.description
      HAVING COUNT(p.id) > 0
      ORDER BY COUNT(p.id) DESC, c.name ASC
    `;

    return NextResponse.json({ categories });
  } catch (error) {
    console.error("Error fetching categories with counts:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
