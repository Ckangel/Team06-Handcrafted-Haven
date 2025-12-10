"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Star, CheckCircle, AlertCircle } from "lucide-react";

export default function ReviewPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [canReview, setCanReview] = useState<boolean | null>(null);
  const [productName, setProductName] = useState("");

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/products/${productId}/review`);
    }
  }, [status, router, productId]);

  // Check if user can review this product
  useEffect(() => {
    async function checkReviewEligibility() {
      try {
        // Get product name
        const productRes = await fetch(`/api/products/${productId}`);
        if (productRes.ok) {
          const productData = await productRes.json();
          setProductName(productData.product?.name || "this product");
        }

        // Check if user has purchased
        const res = await fetch(`/api/reviews/can-review?productId=${productId}`);
        const data = await res.json();
        setCanReview(data.canReview);
        if (data.alreadyReviewed) {
          setError("You have already reviewed this product");
        }
      } catch (err) {
        setError("Failed to check review eligibility");
      }
    }

    if (status === "authenticated") {
      checkReviewEligibility();
    }
  }, [status, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating,
          title,
          content,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading" || canReview === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <CheckCircle className="h-20 w-20 mx-auto text-[#44af69] mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h1>
          <p className="text-gray-600 mb-8">
            Your review has been submitted successfully.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/products/${productId}`}
              className="inline-flex items-center justify-center gap-2 bg-[#44af69] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              View Product
            </Link>
            <Link
              href="/orders"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!canReview) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <AlertCircle className="h-20 w-20 mx-auto text-amber-500 mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Cannot Review This Product</h1>
          <p className="text-gray-600 mb-8">
            {error || "You must purchase this product before you can leave a review."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/products/${productId}`}
              className="inline-flex items-center justify-center gap-2 bg-[#44af69] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              View Product
            </Link>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link
          href={`/products/${productId}`}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Product
        </Link>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Write a Review</h1>
          <p className="text-gray-600 mb-6">Share your experience with {productName}</p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`h-8 w-8 transition ${
                        star <= (hoverRating || rating)
                          ? "fill-[#fcab10] text-[#fcab10]"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {rating === 0
                  ? "Click to rate"
                  : rating === 1
                  ? "Poor"
                  : rating === 2
                  ? "Fair"
                  : rating === 3
                  ? "Good"
                  : rating === 4
                  ? "Very Good"
                  : "Excellent"}
              </p>
            </div>

            {/* Review Title */}
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Review Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sum up your experience in a few words"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#44af69] focus:border-transparent"
                maxLength={100}
              />
            </div>

            {/* Review Content */}
            <div className="mb-6">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell others what you think about this product..."
                rows={5}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#44af69] focus:border-transparent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="w-full bg-[#44af69] text-white py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
