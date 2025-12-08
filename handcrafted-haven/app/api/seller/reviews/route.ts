import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/seller/reviews - Get reviews for seller's products
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "seller") {
      return NextResponse.json({ error: "Seller access required" }, { status: 403 });
    }

    const userId = (session.user as any).id;

    // Get seller ID
    const seller = await sql`
      SELECT id FROM sellers WHERE user_id = ${userId}
    `;

    if (seller.length === 0) {
      return NextResponse.json({ reviews: [] });
    }

    const sellerId = seller[0].id;

    // Get all reviews for this seller's products
    const reviews = await sql`
      SELECT 
        r.id,
        r.rating,
        r.content,
        r.created_at as "createdAt",
        p.id as "productId",
        p.name as "productName",
        p.image_url as "productImage",
        u.name as "userName"
      FROM reviews r
      JOIN products p ON r.product_id = p.id
      JOIN users u ON r.user_id = u.id
      WHERE p.seller_id = ${sellerId}
      ORDER BY r.created_at DESC
    `;

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error("Error fetching seller reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
