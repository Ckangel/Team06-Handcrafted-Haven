import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // ---------- INSERT SELLERS ----------
    const sellers = [
      {
        name: "Willow & Roots Studio",
        bio: "Handcrafted home goods inspired by nature and traditional crafting methods.",
        profile_image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
      },
      {
        name: "Oakstone Woodcraft",
        bio: "Sustainable wooden pieces crafted with precision and artistic detail.",
        profile_image: "https://images.unsplash.com/photo-1503602642458-232111445657"
      },
      {
        name: "Stitch & Bloom Crochet",
        bio: "Modern crochet designs made with vibrant colors and premium yarn.",
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

    // ---------- INSERT PRODUCTS ----------
    const products = [
      {
<<<<<<< HEAD
        name: "Woven Mat",
        artisan: "Sarah",
        price: 45.0,
        originalPrice: 95.0,
        rating: 4.8,
        reviews: 124,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      },
      {
        name: "Ceramic Vase",
        artisan: "Marcus",
        price: 32.0,
        originalPrice: 65.0,
        rating: 4.3,
        reviews: 111,
        image:
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
          "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
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
=======
        seller_id: sellerIds[0],
        name: "Natural Fiber Woven Basket",
        price: 89.90,
        original_price: 120.00,
        image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
        badge: "Bestseller"
      },
      {
        seller_id: sellerIds[0],
        name: "Handwoven Table Placemats Set",
        price: 129.90,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1598020467268-83d67f1e3d30",
        badge: "Handmade"
      },
      {
        seller_id: sellerIds[1],
        name: "Minimalist Wooden Sculpture",
        price: 199.90,
        original_price: 249.90,
        image_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e",
        badge: "New"
      },
      {
        seller_id: sellerIds[1],
        name: "Premium Hardwood Cutting Board",
        price: 149.00,
        original_price: null,
        image_url: "https://images.unsplash.com/photo-1601049436430-07a4b3c95df9",
        badge: "Top Rated"
      },
      {
        seller_id: sellerIds[2],
        name: "Crochet Coaster Set",
        price: 39.90,
        original_price: 49.90,
        image_url: "https://images.unsplash.com/photo-1616628182506-5cb364a7d1c1",
        badge: null
      },
      {
        seller_id: sellerIds[2],
        name: "Cozy Handcrafted Crochet Blanket",
        price: 189.90,
        original_price: 210.00,
        image_url: "https://images.unsplash.com/photo-1552346989-df19a4a47386",
        badge: "Featured"
>>>>>>> 4ecc15735d659aa380ee762cd5482ad5996c5c00
      }
    ];

    const productIds = [];

    for (const p of products) {
      const result = await sql`
        INSERT INTO products (seller_id, name, price, original_price, image_url, badge)
        VALUES (
          ${p.seller_id},
          ${p.name},
          ${p.price},
          ${p.original_price},
          ${p.image_url},
          ${p.badge}
        )
        RETURNING id;
      `;
      productIds.push(result[0].id);
    }

    // ---------- INSERT REVIEWS ----------
    const reviews = [
      {
        product_id: productIds[0],
        rating: 5,
        comment: "Amazing quality! Even better than expected.",
        user_name: "Emily"
      },
      {
        product_id: productIds[1],
        rating: 4,
        comment: "Beautiful craftsmanship. Worth every penny!",
        user_name: "Sarah"
      },
      {
        product_id: productIds[3],
        rating: 5,
        comment: "The cutting board is perfect. Excellent finish!",
        user_name: "Michael"
      },
      {
        product_id: productIds[4],
        rating: 3,
        comment: "Nice product, but shipping took longer than expected.",
        user_name: "Daniel"
      },
      {
        product_id: productIds[5],
        rating: 5,
        comment: "The blanket is incredibly soft and warm. Love it!",
        user_name: "Jessica"
      }
    ];

    for (const r of reviews) {
      await sql`
        INSERT INTO reviews (product_id, rating, comment, user_name)
        VALUES (${r.product_id}, ${r.rating}, ${r.comment}, ${r.user_name});
      `;
    }

    return NextResponse.json({ message: "Seed completed with handcrafted English data!" });

  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
