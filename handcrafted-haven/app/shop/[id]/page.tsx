import { getProductById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import ProductImage from "@/components/ProductImage";
import { sql } from "@/app/lib/db";

async function getProductReviews(productId: number) {
  return await sql`
    SELECT 
      r.id,
      r.rating,
      r.content,
      r.created_at as "createdAt",
      u.name as "userName"
    FROM reviews r
    JOIN users u ON r.user_id = u.id
    WHERE r.product_id = ${productId}
    ORDER BY r.created_at DESC
    LIMIT 10
  `;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  const product = await getProductById(productId);

  if (!product) {
    notFound();
  }

  const reviews = await getProductReviews(productId);

  return (
    <div className="px-6 py-16 max-w-6xl mx-auto">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-gray-700">Home</Link></li>
          <li>/</li>
          <li><Link href="/shop" className="hover:text-gray-700">Shop</Link></li>
          <li>/</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="relative">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 relative">
            <ProductImage
              src={product.image_url}
              alt={product.name}
              fill
            />
          </div>
          {product.badge && (
            <span className="absolute top-4 left-4 bg-[#F8333C] text-white px-3 py-1 rounded-full text-sm font-medium">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500">by <span className="text-[#2B9EB3] font-medium">{product.artisan}</span></p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(Number(product.rating))
                      ? "text-[#FCAB10] fill-current"
                      : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600">
              {Number(product.rating).toFixed(1)} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">${product.price}</span>
            {product.original_price && Number(product.original_price) > Number(product.price) && (
              <span className="text-xl text-gray-400 line-through">${product.original_price}</span>
            )}
          </div>

          {/* Add to Cart */}
          <div className="pt-4">
            <AddToCartButton
              product={{
                id: String(product.id),
                name: product.name,
                price: Number(product.price),
                image: product.image_url,
                artisanName: product.artisan,
              }}
              className="w-full py-3 text-base justify-center"
            />
          </div>

          {/* Product Details */}
          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Product Details</h3>
            <ul className="text-gray-600 space-y-2">
              <li>• Handcrafted with care by {product.artisan}</li>
              <li>• Unique, one-of-a-kind piece</li>
              <li>• Supports local artisan communities</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 border-t pt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews</h2>

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review: any) => (
              <div key={review.id} className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-10 w-10 rounded-full bg-[#2B9EB3] flex items-center justify-center text-white font-bold">
                      {review.userName?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <span className="font-medium text-gray-900">{review.userName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? "text-[#FCAB10] fill-current"
                            : "text-gray-300"
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                {review.content && (
                  <p className="text-gray-600">{review.content}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
