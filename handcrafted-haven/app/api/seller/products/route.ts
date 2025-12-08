import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/seller/products - Get seller's products
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "seller") {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    const userId = (session.user as any).id;

    // Get seller's products
    const products = await sql`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price as "originalPrice",
        p.image_url as "imageUrl",
        p.badge,
        p.created_at as "createdAt",
        c.name as "categoryName",
        c.id as "categoryId",
        COALESCE(
          (SELECT AVG(r.rating)::NUMERIC(2,1) FROM reviews r WHERE r.product_id = p.id),
          0
        ) as "avgRating",
        COALESCE(
          (SELECT COUNT(*) FROM reviews r WHERE r.product_id = p.id),
          0
        ) as "reviewCount"
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN sellers s ON p.seller_id = s.id
      WHERE s.user_id = ${userId}
      ORDER BY p.created_at DESC
    `;

    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST /api/seller/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "seller") {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    const userId = (session.user as any).id;
    const { name, price, originalPrice, categoryId, imageUrl, badge, description } = await request.json();

    if (!name || !price) {
      return NextResponse.json({ error: "Name and price are required" }, { status: 400 });
    }

    // Get seller ID from user
    const sellerResult = await sql`
      SELECT id FROM sellers WHERE user_id = ${userId}
    `;

    if (sellerResult.length === 0) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    const sellerId = sellerResult[0].id;

    // Create product
    const result = await sql`
      INSERT INTO products (seller_id, name, price, original_price, category_id, image_url, badge, description)
      VALUES (${sellerId}, ${name}, ${price}, ${originalPrice || null}, ${categoryId || null}, ${imageUrl || null}, ${badge || null}, ${description || null})
      RETURNING id, name, price, image_url as "imageUrl", created_at as "createdAt"
    `;

    return NextResponse.json({ product: result[0] }, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
