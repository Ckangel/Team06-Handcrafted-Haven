import { ProductCard } from "./ProductCard";
import Link from "next/link";
export default function FeaturedProducts() {
  const products = [
    {
    id: "1",
    name: "Woven Mat",
    artisan: "Sarah",
    price: 45.00,
    originalPrice: 95.00,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Bestseller"
  },{
    id: "2",
    name: "Ceramic Vase",
    artisan: "Marcus",
    price: 32.00,
    originalPrice: 65.00,
    rating: 4.3,
    reviews: 111,
    image: "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "New"
  },{
    id: "3",
    name: "Silver Pendant",
    artisan: "Micaella",
    price: 28.00,
    originalPrice: 77.00,
    rating: 4.5,
    reviews: 101,
    image: "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "New"
  },{
    id: "4",
    name: "Carved Wooden Bowl",
    artisan: "Micael",
    price: 55.00,
    originalPrice: 87.00,
    rating: 4.2,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "New"
  },{
    id: "5",
    name: "Handwoven Blanket",
    artisan: "Ulli",
    price: 80.00,
    originalPrice: 111.00,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "New"
  },{
    id: "6",
    name: "Bronze Mask",
    artisan: "Carl",
    price: 120.00,
    originalPrice: 222.00,
    rating: 4.9,
    reviews: 200,
    image: "https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMHBvdHRlcnklMjBjcmFmdHN8ZW58MXx8fHwxNzYyMzQ0MzQ2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "New"
  },
  ];

  return (
   <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Featured Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of exceptional handcrafted items from talented artisans
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
  <button className="px-8 py-3 border-2 border-gray-900 rounded-lg">
    View All Products
  </button>
</Link>
        </div>
      </div>

      
    </section>
  );
}
