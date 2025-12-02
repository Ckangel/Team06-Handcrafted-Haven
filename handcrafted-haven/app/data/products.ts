export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  artisan: string;
  image: string;
  rating: number;
  reviews: number;
  materials: string[];
}

export const products: Product[] = [
  { id: 1, name: "Rustic Terracotta Vase", price: 68, category: "Pottery", artisan: "Emma Stone", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370307249_1ed3b50d.webp", rating: 4.8, reviews: 24, materials: ["Clay", "Glaze"] },
  { id: 2, name: "Handmade Ceramic Bowl", price: 45, category: "Pottery", artisan: "Emma Stone", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370308968_5987f730.webp", rating: 4.9, reviews: 31, materials: ["Ceramic", "Natural Glaze"] },
  { id: 3, name: "Artisan Pottery Planter", price: 52, category: "Pottery", artisan: "Emma Stone", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370310761_4e77c8eb.webp", rating: 4.7, reviews: 18, materials: ["Stoneware"] },
  { id: 4, name: "Organic Clay Vessel", price: 78, category: "Pottery", artisan: "Emma Stone", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370312604_75664fec.webp", rating: 5.0, reviews: 12, materials: ["Clay", "Organic Glaze"] },
  { id: 5, name: "Silver Gemstone Necklace", price: 125, category: "Jewelry", artisan: "Sofia Martinez", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370313339_e78380d6.webp", rating: 4.9, reviews: 45, materials: ["Sterling Silver", "Gemstone"] },
  { id: 6, name: "Handcrafted Pendant", price: 95, category: "Jewelry", artisan: "Sofia Martinez", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370315328_5194d690.webp", rating: 4.8, reviews: 38, materials: ["Silver", "Natural Stone"] },
  { id: 7, name: "Artisan Ring Collection", price: 110, category: "Jewelry", artisan: "Sofia Martinez", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370317051_2e69c230.webp", rating: 5.0, reviews: 52, materials: ["Gold Plated", "Crystal"] },
  { id: 8, name: "Delicate Bracelet", price: 85, category: "Jewelry", artisan: "Sofia Martinez", image: "https://d64gsuwffb70l.cloudfront.net/690ba2cbb443ea32e1b0dc6b_1762370318810_188bd89b.webp", rating: 4.7, reviews: 29, materials: ["Silver", "Beads"] },
];
