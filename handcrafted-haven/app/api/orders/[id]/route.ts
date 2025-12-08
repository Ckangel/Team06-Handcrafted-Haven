import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/orders/[id] - Get a specific order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { id: orderId } = await params;

    // Get order
    const [order] = await sql`
      SELECT 
        id,
        status,
        total_amount as "totalAmount",
        shipping_name as "shippingName",
        shipping_address as "shippingAddress",
        shipping_city as "shippingCity",
        shipping_state as "shippingState",
        shipping_zip as "shippingZip",
        shipping_country as "shippingCountry",
        notes,
        created_at as "createdAt"
      FROM orders
      WHERE id = ${orderId} AND user_id = ${userId}
    `;

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Get order items
    const items = await sql`
      SELECT 
        oi.id,
        oi.product_id as "productId",
        oi.product_name as "productName",
        oi.product_price as "productPrice",
        oi.quantity,
        oi.notes,
        oi.artisan_id as "artisanId",
        u.name as "artisanName",
        p.image
      FROM order_items oi
      LEFT JOIN users u ON oi.artisan_id = u.id
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ${orderId}
    `;

    return NextResponse.json({ order: { ...order, items } });
  } catch (error) {
    console.error("Error fetching order:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
