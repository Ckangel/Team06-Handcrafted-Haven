import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/orders - Get user's orders
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get orders with item count
    const orders = await sql`
      SELECT 
        o.id,
        o.status,
        o.total_amount as "totalAmount",
        o.shipping_name as "shippingName",
        o.shipping_city as "shippingCity",
        o.shipping_country as "shippingCountry",
        o.created_at as "createdAt",
        (SELECT COUNT(*) FROM order_items oi WHERE oi.order_id = o.id) as "itemCount"
      FROM orders o
      WHERE o.user_id = ${userId}
      ORDER BY o.created_at DESC
    `;

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const {
      items,
      totalAmount,
      shippingName,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingZip,
      shippingCountry,
      notes,
    } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in order" }, { status: 400 });
    }

    if (!shippingName || !shippingAddress || !shippingCity || !shippingZip) {
      return NextResponse.json({ error: "Missing shipping information" }, { status: 400 });
    }

    // Create order
    const [order] = await sql`
      INSERT INTO orders (
        user_id, status, total_amount, 
        shipping_name, shipping_address, shipping_city, 
        shipping_state, shipping_zip, shipping_country, notes
      )
      VALUES (
        ${userId}, 'confirmed', ${totalAmount},
        ${shippingName}, ${shippingAddress}, ${shippingCity},
        ${shippingState || null}, ${shippingZip}, ${shippingCountry || 'United States'}, ${notes || null}
      )
      RETURNING id
    `;

    // Create order items
    for (const item of items) {
      await sql`
        INSERT INTO order_items (
          order_id, product_id, artisan_id, 
          product_name, product_price, quantity, notes
        )
        VALUES (
          ${order.id}, ${item.productId}, ${item.artisanId || null},
          ${item.name}, ${item.price}, ${item.quantity}, ${item.notes || null}
        )
      `;
    }

    // Clear user's cart
    await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;

    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      message: "Order placed successfully" 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
