import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// POST /api/cart/merge - Merge guest cart with user cart on login
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const { items } = await request.json();

    if (!items || !Array.isArray(items)) {
      return NextResponse.json({ error: "Invalid items" }, { status: 400 });
    }

    for (const item of items) {
      if (!item.productId) continue;

      // Check if item already exists in user's cart
      const existing = await sql`
        SELECT id, quantity FROM cart_items 
        WHERE user_id = ${userId} AND product_id = ${item.productId}
      `;

      if (existing.length > 0) {
        // Update quantity (add guest quantity to existing)
        const newQty = Math.min(existing[0].quantity + (item.quantity || 1), 10);
        await sql`
          UPDATE cart_items 
          SET quantity = ${newQty}
          WHERE id = ${existing[0].id}
        `;
      } else {
        // Insert new item from guest cart
        await sql`
          INSERT INTO cart_items (user_id, product_id, quantity, notes)
          VALUES (${userId}, ${item.productId}, ${Math.min(item.quantity || 1, 10)}, ${item.notes || null})
        `;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error merging cart:", error);
    return NextResponse.json({ error: "Failed to merge cart" }, { status: 500 });
  }
}
