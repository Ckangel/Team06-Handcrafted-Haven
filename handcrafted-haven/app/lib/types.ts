export type Product = {
  id: number;
  name: string;
  artisan: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  badge: string | null;
  category: string;   
  rating: number;
  reviews: number;
};
