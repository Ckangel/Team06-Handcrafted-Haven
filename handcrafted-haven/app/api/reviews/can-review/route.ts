import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/reviews/can-review?productId=X - Check if user can review a product
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ canReview: false, reason: "Not logged in" });
    }

    const userId = (session.user as any).id;
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    // Check if user has purchased this product
    const purchaseCheck = await sql`
      SELECT oi.id
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = ${userId} 
        AND oi.product_id = ${productId}
        AND o.status != 'cancelled'
      LIMIT 1
    `;

    if (purchaseCheck.length === 0) {
      return NextResponse.json({
        canReview: false,
        reason: "You must purchase this product before leaving a review",
      });
    }

    // Check if user already reviewed this product
    const existingReview = await sql`
      SELECT id FROM reviews
      WHERE user_id = ${userId} AND product_id = ${productId}
    `;

    if (existingReview.length > 0) {
      return NextResponse.json({
        canReview: false,
        alreadyReviewed: true,
        reason: "You have already reviewed this product",
      });
    }

    return NextResponse.json({ canReview: true });
  } catch (error) {
    console.error("Error checking review eligibility:", error);
    return NextResponse.json({ error: "Failed to check eligibility" }, { status: 500 });
  }
}
