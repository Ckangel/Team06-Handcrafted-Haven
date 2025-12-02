import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";
 
export async function GET() {
  try {
    const products = [
      {
        name: "Woven Mat",
        artisan: "Sarah",
        price: 45.0,
        originalPrice: 95.0,
        rating: 4.8,
        reviews: 124,
        image:
          https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral%22
      },
      {
        name: "Ceramic Vase",
        artisan: "Marcus",
        price: 32.0,
        originalPrice: 65.0,
        rating: 4.3,
        reviews: 111,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080%22,
        badge: "New",
      },
      {
        name: "Silver Pendant",
        artisan: "Micaella",
        price: 28.0,
        originalPrice: 77.0,
        rating: 4.5,
        reviews: 101,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080%22,
        badge: "New",
      },
      {
        name: "Carved Wooden Bowl",
        artisan: "Micael",
        price: 55.0,
        originalPrice: 87.0,
        rating: 4.2,
        reviews: 89,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080%22,
        badge: "New",
      },
      {
        name: "Handwoven Blanket",
        artisan: "Ulli",
        price: 80.0,
        originalPrice: 111.0,
        rating: 4.8,
        reviews: 89,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080%22,
        badge: "New",
      },
      {
        name: "Bronze Mask",
        artisan: "Carl",
        price: 120.0,
        originalPrice: 222.0,
        rating: 4.9,
        reviews: 200,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080%22,
        badge: "New",
      },
    ];
 
    const sellerCache = new Map();
 
    for (const p of products) {
      let sellerId = sellerCache.get(p.artisan);
 
      if (!sellerId) {
        const [seller] = await sql`
          INSERT INTO sellers (name)
          VALUES (${p.artisan})
          RETURNING id;
        `;
        sellerId = seller.id;
        sellerCache.set(p.artisan, sellerId);
      }
 
      const [product] = await sql`
        INSERT INTO products (
          seller_id,
          name,
          price,
          original_price,
          image_url,
          badge
        )
        VALUES (
          ${sellerId},
          ${p.name},
          ${p.price},
          ${p.originalPrice ?? null},
          ${p.image},
          ${p.badge ?? null}
        )
        RETURNING id;
      `;
 
      for (let i = 0; i < p.reviews; i++) {
        await sql`
          INSERT INTO reviews (product_id, rating, user_name)
          VALUES (${product.id}, ${Math.round(p.rating)}, 'User ${i + 1}');
        `;
      }
    }
 
    return NextResponse.json({ message: "Seed completed successfully!" });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}