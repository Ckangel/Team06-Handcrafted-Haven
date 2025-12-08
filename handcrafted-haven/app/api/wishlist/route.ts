import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/wishlist - Get user's wishlist
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const items = await sql`
      SELECT 
        w.product_id as "productId",
        w.created_at as "addedAt",
        p.name,
        p.price,
        p.original_price as "originalPrice",
        p.image_url as "image",
        p.badge,
        s.name as "artisanName"
      FROM wishlist w
      JOIN products p ON w.product_id = p.id
      LEFT JOIN sellers s ON p.seller_id = s.id
      WHERE w.user_id = ${userId}
      ORDER BY w.created_at DESC
    `;

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

// POST /api/wishlist - Add item to wishlist
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    // Check if already in wishlist
    const existing = await sql`
      SELECT id FROM wishlist 
      WHERE user_id = ${userId} AND product_id = ${productId}
    `;

    if (existing.length > 0) {
      return NextResponse.json({ message: "Already in wishlist" }, { status: 200 });
    }

    // Add to wishlist
    await sql`
      INSERT INTO wishlist (user_id, product_id)
      VALUES (${userId}, ${productId})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 });
  }
}

// DELETE /api/wishlist - Remove item from wishlist
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    await sql`
      DELETE FROM wishlist 
      WHERE user_id = ${userId} AND product_id = ${productId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 });
  }
}
