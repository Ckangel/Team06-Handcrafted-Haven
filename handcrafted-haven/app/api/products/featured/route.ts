import { NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

// GET /api/products/featured - Get featured products (with badges or highest rated)
export async function GET() {
  try {
    // Get products with badges first (Bestseller, Featured, Popular, Trending, etc.)
    const badgedProducts = await sql`
      SELECT 
        p.id,
        p.name,
        s.name AS artisan,
        COALESCE(c.name, 'Uncategorized') AS category,
        p.price,
        p.original_price,
        p.image_url,
        p.badge,
        COALESCE(AVG(r.rating), 0) AS rating,
        COUNT(r.id) AS reviews
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON r.product_id = p.id
      WHERE p.badge IS NOT NULL
      GROUP BY p.id, p.name, s.name, c.name, p.price, p.original_price, p.image_url, p.badge
      ORDER BY 
        CASE 
          WHEN p.badge = 'Bestseller' THEN 1
          WHEN p.badge = 'Featured' THEN 2
          WHEN p.badge = 'Popular' THEN 3
          WHEN p.badge = 'Trending' THEN 4
          ELSE 5
        END,
        p.created_at DESC
      LIMIT 8
    `;

    // If we have enough badged products, return them
    if (badgedProducts.length >= 4) {
      return NextResponse.json({ products: badgedProducts.slice(0, 8) });
    }

    // Otherwise get all products and combine
    const allProducts = await sql`
      SELECT 
        p.id,
        p.name,
        s.name AS artisan,
        COALESCE(c.name, 'Uncategorized') AS category,
        p.price,
        p.original_price,
        p.image_url,
        p.badge,
        COALESCE(AVG(r.rating), 0) AS rating,
        COUNT(r.id) AS reviews
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN reviews r ON r.product_id = p.id
      GROUP BY p.id, p.name, s.name, c.name, p.price, p.original_price, p.image_url, p.badge
      ORDER BY 
        CASE WHEN p.badge IS NOT NULL THEN 0 ELSE 1 END,
        p.created_at DESC
      LIMIT 8
    `;

    return NextResponse.json({ products: allProducts });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return NextResponse.json({ error: "Failed to fetch featured products" }, { status: 500 });
  }
}
