import { sql } from "@/app/lib/db";
import { NextResponse } from "next/server";

// Default fallback image when product images fail to load
const FALLBACK_IMAGE = "https://placehold.co/500x500/e2e8f0/64748b?text=No+Image";

export async function GET() {
  try {
    // ========================
    // CLEAR EXISTING DATA (in order due to foreign keys)
    // Use try-catch for each in case table doesn't exist
    // ========================
    try { await sql`DELETE FROM reviews`; } catch {}
    try { await sql`DELETE FROM order_items`; } catch {}
    try { await sql`DELETE FROM orders`; } catch {}
    try { await sql`DELETE FROM cart_items`; } catch {}
    try { await sql`DELETE FROM wishlist_items`; } catch {}
    try { await sql`DELETE FROM products`; } catch {}
    try { await sql`DELETE FROM sellers`; } catch {}
    try { await sql`DELETE FROM categories`; } catch {}

    // ========================
    // CATEGORIES with descriptions
    // ========================
    await sql`ALTER TABLE categories ADD COLUMN IF NOT EXISTS description TEXT`;
    
    const categoryData = [
      { name: "Pottery", description: "Handcrafted ceramic vases, bowls, and decorative pieces." },
      { name: "Silver Pendants", description: "Elegant handmade silver jewelry with unique designs." },
      { name: "Woven Mats", description: "Traditional hand-woven mats crafted with natural fibers." },
      { name: "Carved Wood", description: "Intricate wooden carvings and sculptures." },
      { name: "Hand Woven Blankets", description: "Cozy blankets woven with traditional techniques." },
      { name: "Sculpture", description: "Contemporary and traditional sculptural art pieces." },
      { name: "Wooden Nativity Sets", description: "Beautifully carved nativity sets for the holiday season." },
      { name: "Benin Bronze Masks", description: "Traditional bronze masks inspired by Benin art." },
      { name: "Local Kente Ties", description: "Stylish ties made from authentic Kente cloth." },
      { name: "Aso Oke / Jorge", description: "Hand-woven traditional fabrics from West Africa." },
      { name: "Beaded Jewelry", description: "Colorful handmade beaded necklaces and bracelets." },
      { name: "Leather Goods", description: "Handcrafted leather bags, wallets, and accessories." },
    ];

    const categoryIds: Record<string, number> = {};
    for (const c of categoryData) {
      const result = await sql`
        INSERT INTO categories (name, description) VALUES (${c.name}, ${c.description}) RETURNING id
      `;
      categoryIds[c.name] = result[0].id;
    }

    // ========================
    // SELLERS (Artisans)
    // ========================
    await sql`ALTER TABLE sellers ADD COLUMN IF NOT EXISTS title TEXT`;
    await sql`ALTER TABLE sellers ADD COLUMN IF NOT EXISTS specialty TEXT`;

    const sellersData = [
      {
        name: "Willow & Roots Studio",
        bio: "Handcrafted home goods inspired by nature. We specialize in pottery and ceramic art that brings warmth to any space.",
        profile_image: "https://images.unsplash.com/photo-1556760544-74068565f05c?w=400",
        title: "Ceramic Artist",
        specialty: "Pottery & Ceramics"
      },
      {
        name: "Oakstone Woodcraft",
        bio: "Sustainable wooden pieces crafted with precision and care. Every item tells a story of the forest.",
        profile_image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400",
        title: "Master Woodworker",
        specialty: "Wood Carving"
      },
      {
        name: "Stitch & Bloom Crochet",
        bio: "Modern crochet designs made with vibrant colors. Bringing traditional techniques to contemporary life.",
        profile_image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400",
        title: "Fiber Artist",
        specialty: "Woven Textiles"
      },
      {
        name: "Silver Moon Jewelry",
        bio: "Handcrafted silver jewelry inspired by celestial beauty. Each piece is unique and made with love.",
        profile_image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
        title: "Jewelry Artisan",
        specialty: "Silver Jewelry"
      },
      {
        name: "Heritage Crafts Ghana",
        bio: "Preserving African heritage through traditional crafts. Our Kente and bronze works celebrate our ancestors.",
        profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
        title: "Cultural Artisan",
        specialty: "African Heritage Crafts"
      },
      {
        name: "Mountain Leather Works",
        bio: "Premium leather goods handcrafted in the traditional way. Built to last a lifetime.",
        profile_image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
        title: "Leather Craftsman",
        specialty: "Leather Goods"
      },
      {
        name: "Christopher Edeson",
        bio: "Passionate artisan blending modern design with traditional craftsmanship. Creating unique pieces that tell stories and inspire creativity.",
        profile_image: "https://edesonchristopher.netlify.app/assets/christopher-fresh-BOQ1-Dev.jpeg",
        title: "Master Craftsman",
        specialty: "Mixed Media & Custom Designs"
      }
    ];

    const sellerIds: number[] = [];
    for (const s of sellersData) {
      const result = await sql`
        INSERT INTO sellers (name, bio, profile_image, title, specialty)
        VALUES (${s.name}, ${s.bio}, ${s.profile_image}, ${s.title}, ${s.specialty})
        RETURNING id
      `;
      sellerIds.push(result[0].id);
    }

    // ========================
    // PRODUCTS (with reliable image URLs)
    // ========================
    const productsData = [
      // Pottery (seller 0)
      { seller_idx: 0, category: "Pottery", name: "Decorative Clay Pot", price: 45.00, original_price: 60.00, image_url: "https://m.media-amazon.com/images/I/71vAWzQi3xL.jpg", badge: "Popular" },
      { seller_idx: 0, category: "Pottery", name: "Hand Painted Ceramic Vase", price: 75.00, original_price: 95.00, image_url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500", badge: "Limited" },
      { seller_idx: 0, category: "Pottery", name: "Rustic Terracotta Bowl", price: 35.00, original_price: null, image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500", badge: null },
      { seller_idx: 0, category: "Pottery", name: "Glazed Stoneware Mug Set", price: 55.00, original_price: 70.00, image_url: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500", badge: "Bestseller" },

      // Carved Wood (seller 1)
      { seller_idx: 1, category: "Carved Wood", name: "Carved Wooden Mask", price: 150.00, original_price: null, image_url: "https://images.unsplash.com/photo-1503602642458-232111445657?w=500", badge: "New" },
      { seller_idx: 1, category: "Carved Wood", name: "Hand-Carved Tribal Statue", price: 180.00, original_price: null, image_url: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500", badge: "Premium" },
      { seller_idx: 1, category: "Carved Wood", name: "Wooden Elephant Sculpture", price: 95.00, original_price: 120.00, image_url: "https://images.unsplash.com/photo-1569091791842-7cfb64e04797?w=500", badge: null },
      { seller_idx: 1, category: "Wooden Nativity Sets", name: "Hand-Carved Nativity Scene", price: 220.00, original_price: 280.00, image_url: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=500", badge: "Holiday Special" },

      // Woven items (seller 2)
      { seller_idx: 2, category: "Woven Mats", name: "Traditional Woven Mat", price: 80.00, original_price: 95.00, image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500", badge: null },
      { seller_idx: 2, category: "Woven Mats", name: "African Heritage Woven Mat", price: 95.00, original_price: 110.00, image_url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500", badge: null },
      { seller_idx: 2, category: "Hand Woven Blankets", name: "Cozy Alpaca Blanket", price: 145.00, original_price: 180.00, image_url: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=500", badge: "Trending" },
      { seller_idx: 2, category: "Hand Woven Blankets", name: "Patterned Throw Blanket", price: 85.00, original_price: null, image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500", badge: null },

      // Silver Jewelry (seller 3)
      { seller_idx: 3, category: "Silver Pendants", name: "Elegant Silver Necklace", price: 120.00, original_price: 150.00, image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500", badge: "Trending" },
      { seller_idx: 3, category: "Silver Pendants", name: "Moon Phase Pendant", price: 85.00, original_price: null, image_url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500", badge: "New" },
      { seller_idx: 3, category: "Beaded Jewelry", name: "Colorful Beaded Necklace", price: 45.00, original_price: 55.00, image_url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500", badge: null },
      { seller_idx: 3, category: "Beaded Jewelry", name: "Tribal Beaded Bracelet Set", price: 35.00, original_price: null, image_url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=500", badge: "Popular" },

      // African Heritage (seller 4)
      { seller_idx: 4, category: "Benin Bronze Masks", name: "Traditional Benin Bronze Mask", price: 450.00, original_price: 550.00, image_url: "https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=500", badge: "Collector's Item" },
      { seller_idx: 4, category: "Benin Bronze Masks", name: "Bronze Wall Sculpture", price: 320.00, original_price: null, image_url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=500", badge: null },
      { seller_idx: 4, category: "Local Kente Ties", name: "Authentic Kente Bow Tie", price: 65.00, original_price: 80.00, image_url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500", badge: "Popular" },
      { seller_idx: 4, category: "Local Kente Ties", name: "Kente Necktie Set", price: 95.00, original_price: 120.00, image_url: "https://images.unsplash.com/photo-1589756823695-278bc923f962?w=500", badge: null },
      { seller_idx: 4, category: "Aso Oke / Jorge", name: "Hand-Woven Aso Oke Fabric", price: 180.00, original_price: 220.00, image_url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=500", badge: "Premium" },

      // Leather (seller 5)
      { seller_idx: 5, category: "Leather Goods", name: "Handcrafted Leather Messenger Bag", price: 195.00, original_price: 250.00, image_url: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500", badge: "Bestseller" },
      { seller_idx: 5, category: "Leather Goods", name: "Vintage Leather Wallet", price: 75.00, original_price: 95.00, image_url: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500", badge: null },
      { seller_idx: 5, category: "Leather Goods", name: "Leather Belt with Brass Buckle", price: 55.00, original_price: null, image_url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500", badge: "New" },

      // Sculpture (shared sellers)
      { seller_idx: 1, category: "Sculpture", name: "Abstract Stone Sculpture", price: 280.00, original_price: 350.00, image_url: "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=500", badge: "Gallery Piece" },
      { seller_idx: 4, category: "Sculpture", name: "Bronze Figure Sculpture", price: 195.00, original_price: null, image_url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500", badge: null },

      // Christopher Edeson (seller 6) - Mixed Media & Custom Designs
      { seller_idx: 6, category: "Sculpture", name: "Modern Abstract Art Piece", price: 350.00, original_price: 450.00, image_url: "https://ik.imagekit.io/theartling/prod/products/Product/065d0e64a3514880bf2398126d0bcdca_sw-3815_sh-2501.jpg", badge: "Featured" },
      { seller_idx: 6, category: "Carved Wood", name: "Contemporary Wooden Wall Art", price: 185.00, original_price: 230.00, image_url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=500", badge: "Exclusive" },
      { seller_idx: 6, category: "Pottery", name: "Artistic Ceramic Sculpture", price: 125.00, original_price: null, image_url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500", badge: "New" },
      { seller_idx: 6, category: "Beaded Jewelry", name: "Designer Beaded Art Necklace", price: 95.00, original_price: 120.00, image_url: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500", badge: "Trending" },
      { seller_idx: 6, category: "Leather Goods", name: "Custom Leather Journal", price: 65.00, original_price: 85.00, image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=500", badge: "Bestseller" },
    ];

    let insertedCount = 0;
    for (const p of productsData) {
      const sellerId = sellerIds[p.seller_idx];
      const categoryId = categoryIds[p.category];
      
      if (!sellerId || !categoryId) continue;

      await sql`
        INSERT INTO products (seller_id, category_id, name, price, original_price, image_url, badge)
        VALUES (${sellerId}, ${categoryId}, ${p.name}, ${p.price}, ${p.original_price}, ${p.image_url}, ${p.badge})
      `;
      insertedCount++;
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully!",
      fallbackImage: FALLBACK_IMAGE,
      stats: {
        categories: Object.keys(categoryIds).length,
        sellers: sellerIds.length,
        products: insertedCount
      }
    });

  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Seed failed", details: String(error) },
      { status: 500 }
    );
  }
}
