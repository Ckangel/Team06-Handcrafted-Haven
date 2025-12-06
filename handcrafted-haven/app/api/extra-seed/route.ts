import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // PEGAR categorias existentes
    const categories = await sql`
      SELECT id, name FROM categories ORDER BY id;
    `;

    const sellers = await sql`
      SELECT id, name FROM sellers ORDER BY id;
    `;

    if (categories.length === 0 || sellers.length === 0) {
      return NextResponse.json(
        { error: "Categories or sellers not found. Run /api/seed first." },
        { status: 400 }
      );
    }

    // NOVOS PRODUTOS
    const extraProducts = [
      {
        name: "Hand Painted Ceramic Vase",
        category: "Pottery",
        price: 75.0,
        original_price: 95.0,
        image_url:
          "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
        seller_id: sellers[0].id,
        badge: "Limited"
      },
      {
        name: "Elegant Silver Necklace",
        category: "Silver Pendants",
        price: 120.0,
        original_price: 150.0,
        image_url:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
        seller_id: sellers[0].id,
        badge: "Trending"
      },
      {
        name: "African Heritage Woven Mat",
        category: "Woven Mats",
        price: 95.0,
        original_price: 110.0,
        image_url:
          "https://images.unsplash.com/photo-1556912167-1a754e21a1c8",
        seller_id: sellers[2].id,
        badge: null
      },
      {
        name: "Hand-Carved Tribal Statue",
        category: "Carved Wood",
        price: 180.0,
        original_price: null,
        image_url:
          "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
        seller_id: sellers[1].id,
        badge: "Premium"
      }
    ];

    // INSERIR PRODUTOS
   for (const product of extraProducts) {
  const category = categories.find(c => c.name === product.category);

  if (!category) continue;

  await sql`
    INSERT INTO products (seller_id, category_id, name, price, original_price, image_url, badge)
    VALUES (
      ${product.seller_id},
      ${category.id},
      ${product.name},
      ${product.price},
      ${product.original_price},
      ${product.image_url},
      ${product.badge}
    );
  `;
}

    return NextResponse.json({
      message: "Extra products added successfully!"
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
