import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/cart - Get user's cart
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;

    // Get cart items with product details
    const items = await sql`
      SELECT 
        ci.product_id as "productId",
        ci.quantity,
        ci.notes,
        p.name,
        p.price,
        p.image_url as "image",
        p.seller_id as "artisanId",
        s.name as "artisanName"
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN sellers s ON p.seller_id = s.id
      WHERE ci.user_id = ${userId}
      ORDER BY ci.created_at DESC
    `;

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

// PUT /api/cart - Update entire cart (sync from client)
export async function PUT(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { items } = await request.json();

    // Delete existing cart items
    await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;

    // Insert new items
    if (items && items.length > 0) {
      for (const item of items) {
        await sql`
          INSERT INTO cart_items (user_id, product_id, quantity, notes)
          VALUES (${userId}, ${item.productId}, ${Math.min(item.quantity, 10)}, ${item.notes || null})
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json({ error: "Failed to update cart" }, { status: 500 });
  }
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { productId, quantity = 1, notes } = await request.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    // Check if item already exists
    const existing = await sql`
      SELECT id, quantity FROM cart_items 
      WHERE user_id = ${userId} AND product_id = ${productId}
    `;

    if (existing.length > 0) {
      // Update quantity
      const newQty = Math.min(existing[0].quantity + quantity, 10);
      await sql`
        UPDATE cart_items 
        SET quantity = ${newQty}, notes = COALESCE(${notes}, notes)
        WHERE id = ${existing[0].id}
      `;
    } else {
      // Insert new item
      await sql`
        INSERT INTO cart_items (user_id, product_id, quantity, notes)
        VALUES (${userId}, ${productId}, ${Math.min(quantity, 10)}, ${notes || null})
      `;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}

// DELETE /api/cart - Clear entire cart
export async function DELETE() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    await sql`DELETE FROM cart_items WHERE user_id = ${userId}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing cart:", error);
    return NextResponse.json({ error: "Failed to clear cart" }, { status: 500 });
  }
}
