import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/seller/orders - Get orders containing seller's products
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
      return NextResponse.json({ orders: [] });
    }

    const sellerId = sellerResult[0].id;

    // Get orders containing this seller's products
    const orders = await sql`
      SELECT DISTINCT
        o.id,
        o.status,
        o.shipping_name as "shippingName",
        o.shipping_city as "shippingCity",
        o.shipping_state as "shippingState",
        o.created_at as "createdAt",
        (
          SELECT json_agg(json_build_object(
            'productId', oi2.product_id,
            'productName', oi2.product_name,
            'quantity', oi2.quantity,
            'price', oi2.product_price
          ))
          FROM order_items oi2
          JOIN products p2 ON oi2.product_id = p2.id
          WHERE oi2.order_id = o.id AND p2.seller_id = ${sellerId}
        ) as items,
        (
          SELECT SUM(oi3.product_price * oi3.quantity)
          FROM order_items oi3
          JOIN products p3 ON oi3.product_id = p3.id
          WHERE oi3.order_id = o.id AND p3.seller_id = ${sellerId}
        ) as "sellerTotal"
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN products p ON oi.product_id = p.id
      WHERE p.seller_id = ${sellerId}
      ORDER BY o.created_at DESC
    `;

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}
