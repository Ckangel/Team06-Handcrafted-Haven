import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { sql } from "@/app/lib/db";

// GET /api/seller/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;

    const product = await sql`
      SELECT 
        p.id,
        p.name,
        p.price,
        p.original_price as "originalPrice",
        p.image_url as "imageUrl",
        p.badge,
        p.description,
        p.category_id as "categoryId",
        p.created_at as "createdAt"
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      WHERE p.id = ${id} AND s.user_id = ${userId}
    `;

    if (product.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ product: product[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

// PUT /api/seller/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "seller") {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;
    const { name, price, originalPrice, categoryId, imageUrl, badge, description } = await request.json();

    // Verify ownership
    const existing = await sql`
      SELECT p.id FROM products p
      JOIN sellers s ON p.seller_id = s.id
      WHERE p.id = ${id} AND s.user_id = ${userId}
    `;

    if (existing.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Update product
    const result = await sql`
      UPDATE products SET
        name = COALESCE(${name}, name),
        price = COALESCE(${price}, price),
        original_price = ${originalPrice},
        category_id = ${categoryId},
        image_url = ${imageUrl},
        badge = ${badge},
        description = ${description}
      WHERE id = ${id}
      RETURNING id, name, price
    `;

    return NextResponse.json({ product: result[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

// DELETE /api/seller/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "seller") {
      return NextResponse.json({ error: "Not a seller" }, { status: 403 });
    }

    const { id } = await params;
    const userId = (session.user as any).id;

    // Verify ownership and delete
    const result = await sql`
      DELETE FROM products p
      USING sellers s
      WHERE p.seller_id = s.id AND p.id = ${id} AND s.user_id = ${userId}
      RETURNING p.id
    `;

    if (result.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
