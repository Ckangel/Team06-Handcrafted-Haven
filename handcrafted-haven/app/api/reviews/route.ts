import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/reviews?productId=X - Get reviews for a product
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    const reviews = await sql`
      SELECT 
        r.id,
        r.rating,
        r.title,
        r.content,
        r.created_at as "createdAt",
        u.name as "userName",
        u.id as "userId"
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${productId}
      ORDER BY r.created_at DESC
    `;

    // Calculate average rating
    const avgResult = await sql`
      SELECT AVG(rating)::numeric(2,1) as "averageRating", COUNT(*) as "totalReviews"
      FROM reviews
      WHERE product_id = ${productId}
    `;

    return NextResponse.json({
      reviews,
      averageRating: avgResult[0]?.averageRating || 0,
      totalReviews: Number(avgResult[0]?.totalReviews) || 0,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

// POST /api/reviews - Create a review (purchasers only)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { productId, rating, title, content } = await request.json();

    if (!productId || !rating) {
      return NextResponse.json({ error: "Product ID and rating required" }, { status: 400 });
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
    }

    // Check if user has purchased this product
    const purchaseCheck = await sql`
      SELECT oi.id, o.id as order_id
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE o.user_id = ${userId} 
        AND oi.product_id = ${productId}
        AND o.status != 'cancelled'
      LIMIT 1
    `;

    if (purchaseCheck.length === 0) {
      return NextResponse.json(
        { error: "You must purchase this product before leaving a review" },
        { status: 403 }
      );
    }

    // Check if user already reviewed this product
    const existingReview = await sql`
      SELECT id FROM reviews
      WHERE user_id = ${userId} AND product_id = ${productId}
    `;

    if (existingReview.length > 0) {
      return NextResponse.json(
        { error: "You have already reviewed this product" },
        { status: 409 }
      );
    }

    // Create review
    const [review] = await sql`
      INSERT INTO reviews (user_id, product_id, order_id, rating, title, content)
      VALUES (${userId}, ${productId}, ${purchaseCheck[0].order_id}, ${rating}, ${title || null}, ${content || null})
      RETURNING id
    `;

    return NextResponse.json({
      success: true,
      reviewId: review.id,
      message: "Review submitted successfully",
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}
