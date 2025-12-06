import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // INSERT CATEGORIES
    const categoryData = [
      { name: "Pottery" },
      { name: "Silver Pendants" },
      { name: "Woven Mats" },
      { name: "Carved Wood" }
    ];

    const categoryIds = [];
    for (const c of categoryData) {
      const result = await sql`
        INSERT INTO categories (name)
        VALUES (${c.name})
        RETURNING id;
      `;
      categoryIds.push(result[0].id);
    }

    // --------------------------
    // INSERT SELLERS (igual ao seu)
    // --------------------------

    const sellers = [
      {
        name: "Willow & Roots Studio",
        bio: "Handcrafted home goods inspired by nature.",
        profile_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      },
      {
        name: "Oakstone Woodcraft",
        bio: "Sustainable wooden pieces crafted with precision.",
        profile_image: "https://images.unsplash.com/photo-1503602642458-232111445657"
      },
      {
        name: "Stitch & Bloom Crochet",
        bio: "Modern crochet designs made with vibrant colors.",
        profile_image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f"
      }
    ];

    const sellerIds = [];
    for (const s of sellers) {
      const result = await sql`
        INSERT INTO sellers (name, bio, profile_image)
        VALUES (${s.name}, ${s.bio}, ${s.profile_image})
        RETURNING id;
      `;
      sellerIds.push(result[0].id);
    }

    // --------------------------
    // INSERT PRODUCTS WITH category_id
    // --------------------------

    const products = [
      {
        seller_id: sellerIds[0],
        category_id: categoryIds[0], // Pottery
        name: "Decorative Clay Pot",
        price: 45.00,
        original_price: 60.00,
        image_url: "https://images.unsplash.com/photo-1602526215346-2f3b909a87e4",
        badge: "Popular"
      },
      {
        seller_id: sellerIds[1],
        category_id: categoryIds[3], // Carved Wood
        name: "Carved Wooden Mask",
        price: 150.00,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1503602642458-232111445657",
        badge: "New"
      },
      {
        seller_id: sellerIds[2],
        category_id: categoryIds[2], // Woven Mats
        name: "Traditional Woven Mat",
        price: 80.00,
        original_price: 95.00,
        image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        badge: null
      }
    ];

    for (const p of products) {
      await sql`
        INSERT INTO products (seller_id, category_id, name, price, original_price, image_url, badge)
        VALUES (${p.seller_id}, ${p.category_id}, ${p.name}, ${p.price}, ${p.original_price}, ${p.image_url}, ${p.badge});
      `;
    }

    return NextResponse.json({ message: "Seed completed successfully!" });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
