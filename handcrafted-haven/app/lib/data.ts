import { sql } from "./db";

import type { Product } from "./types";

export async function getProducts(): Promise<Product[]> {
  return await sql<Product[]>/*sql*/`
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
    GROUP BY p.id, s.name
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
