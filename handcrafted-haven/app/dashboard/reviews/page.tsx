"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Star, MessageCircle } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  productId: number;
  productName: string;
  productImage?: string;
  userName: string;
}

export default function SellerReviewsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard/reviews");
    } else if (status === "authenticated" && role !== "seller") {
      router.push("/account");
    }
  }, [status, role, router]);

  useEffect(() => {
    async function loadReviews() {
      if (status !== "authenticated" || role !== "seller") return;

      try {
        const res = await fetch("/api/seller/reviews");
        const data = await res.json();
        setReviews(data.reviews || []);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setLoading(false);
      }
    }

    loadReviews();
  }, [status, role]);

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#44AF69]" />
      </div>
    );
  }

  if (role !== "seller") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Customer Reviews</h1>
            <p className="text-gray-600">See what customers are saying about your products</p>
          </div>
        </div>

        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No Reviews Yet</h2>
            <p className="text-gray-600 mb-4">
              Once customers purchase and review your products, you&apos;ll see their feedback here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  {review.productImage && (
                    <Link href={`/shop/${review.productId}`}>
                      <img
                        src={review.productImage}
                        alt={review.productName}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    </Link>
                  )}

                  <div className="flex-1">
                    {/* Product & Rating */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                      <Link
                        href={`/shop/${review.productId}`}
                        className="font-medium text-gray-800 hover:text-[#44AF69]"
                      >
                        {review.productName}
                      </Link>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "fill-[#FCAB10] text-[#FCAB10]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Comment */}
                    {review.comment && (
                      <p className="text-gray-600 mb-2">&quot;{review.comment}&quot;</p>
                    )}

                    {/* Reviewer & Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>— {review.userName}</span>
                      <span>•</span>
                      <span>
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
