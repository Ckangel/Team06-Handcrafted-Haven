import { sql } from "./db";

import type { Product } from "./types";


export async function getProducts(): Promise<Product[]> {
  return await sql<Product[]>`
    SELECT 
      p.id,
      p.name,
      s.name AS artisan,
      COALESCE(c.name, 'Uncategorized') AS category,
      p.price,
      p.original_price,
      p.image_url,
      p.badge,
      COALESCE(AVG(r.rating), 0) AS rating,
      COUNT(r.id) AS reviews
    FROM products p
    JOIN sellers s ON p.seller_id = s.id
    LEFT JOIN categories c ON p.category_id = c.id
    LEFT JOIN reviews r ON r.product_id = p.id
    GROUP BY p.id, s.name, c.name
    ORDER BY p.created_at DESC;
  `;
}


export async function getProductById(id:number) {
  const [product] = await sql/*sql*/`
    SELECT 
      p.id,
      p.name,
      s.name AS artisan,
      p.price,
      p.original_price,
      p.image_url,
      p.badge,
      COALESCE(AVG(r.rating), 0) AS rating,
      COUNT(r.id) AS reviews
    FROM products p
    JOIN sellers s ON p.seller_id = s.id
    LEFT JOIN reviews r ON r.product_id = p.id
    WHERE p.id = ${id}
    GROUP BY p.id, s.name;
  `;
  return product;
}

export async function getArtisans() {
  return await sql`
    SELECT 
      id,
      name,
      bio,
      profile_image
    FROM sellers
    ORDER BY id ASC;
  `;
}

export async function getArtisanById(id: number) {
  const [artisan] = await sql`
    SELECT 
      id, 
      name, 
      bio, 
      profile_image
    FROM sellers
    WHERE id = ${id};
  `;
  return artisan;
}
export async function getProductsByArtisan(artisanId: number) {
  return await sql`
    SELECT 
      p.id,
      p.name,
      p.price,
      p.original_price,
      p.image_url,
      p.badge,
      c.name AS category
    FROM products p
    JOIN categories c ON p.category_id = c.id
    WHERE p.seller_id = ${artisanId}
    ORDER BY p.created_at DESC;
  `;
}

export async function getCategories() {
  return await sql`
    SELECT id, name FROM categories ORDER BY name ASC;
  `;
}
