import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/seller/stats - Get seller dashboard stats
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

    // Get seller ID
    const sellerResult = await sql`
      SELECT id FROM sellers WHERE user_id = ${userId}
    `;

    if (sellerResult.length === 0) {
      return NextResponse.json({
        stats: {
          totalProducts: 0,
          totalOrders: 0,
          totalRevenue: 0,
          avgRating: 0,
          pendingOrders: 0,
          reviewCount: 0,
        }
      });
    }

    const sellerId = sellerResult[0].id;

    // Get product count
    const productCount = await sql`
      SELECT COUNT(*) as count FROM products WHERE seller_id = ${sellerId}
    `;

    // Get order stats (orders containing this seller's products)
    const orderStats = await sql`
      SELECT 
        COUNT(DISTINCT oi.order_id) as total_orders,
        COALESCE(SUM(oi.product_price * oi.quantity), 0) as total_revenue
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE p.seller_id = ${sellerId}
    `;

    // Get pending orders count
    const pendingOrders = await sql`
      SELECT COUNT(DISTINCT o.id) as count
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE p.seller_id = ${sellerId} AND o.status = 'pending'
    `;

    // Get review stats
    const reviewStats = await sql`
      SELECT 
        COUNT(*) as review_count,
        COALESCE(AVG(r.rating), 0) as avg_rating
      FROM reviews r
      JOIN products p ON r.product_id = p.id
      WHERE p.seller_id = ${sellerId}
    `;

    return NextResponse.json({
      stats: {
        totalProducts: Number(productCount[0]?.count || 0),
        totalOrders: Number(orderStats[0]?.total_orders || 0),
        totalRevenue: Number(orderStats[0]?.total_revenue || 0),
        avgRating: Number(Number(reviewStats[0]?.avg_rating || 0).toFixed(1)),
        pendingOrders: Number(pendingOrders[0]?.count || 0),
        reviewCount: Number(reviewStats[0]?.review_count || 0),
      }
    });
  } catch (error) {
    console.error("Error fetching seller stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
