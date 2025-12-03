export interface Product {
  id: number;
  name: string;
  artisan: string;
  price: number;
  original_price?: number;
  image_url: string;
  badge?: string;
  rating: number;
  reviews: number;
}
