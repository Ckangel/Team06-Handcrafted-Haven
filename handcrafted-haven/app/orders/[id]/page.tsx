"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Package, Star } from "lucide-react";

interface OrderItem {
  id: number;
  productId: string;
  productName: string;
  productPrice: number;
  quantity: number;
  notes?: string;
  artisanId?: string;
  artisanName?: string;
  image?: string;
}

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  shippingName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState?: string;
  shippingZip: string;
  shippingCountry: string;
  notes?: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/orders");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order);
        } else if (res.status === 404) {
          setError("Order not found");
        } else {
          setError("Failed to load order");
        }
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated" && orderId) {
      fetchOrder();
    }
  }, [status, orderId]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error || "Order not found"}
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/orders"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-[#2b9eb3]" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Order #{order.id}</h1>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
              </div>
            </div>
            <span className={`px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Order Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Items ({order.items.length})
              </h2>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {/* Placeholder for image */}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{item.productName}</h3>
                      {item.artisanName && (
                        <p className="text-sm text-gray-500">by {item.artisanName}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">
                        ${Number(item.productPrice).toFixed(2)} × {item.quantity}
                      </p>
                      {item.notes && (
                        <p className="text-sm text-gray-400 mt-1 italic">
                          Note: {item.notes}
                        </p>
                      )}
                      <Link
                        href={`/products/${item.productId}/review`}
                        className="inline-flex items-center gap-1 text-sm text-[#fcab10] hover:underline mt-2"
                      >
                        <Star className="h-4 w-4" />
                        Write a Review
                      </Link>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        ${(Number(item.productPrice) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total */}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Subtotal</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-gray-900 pt-2 border-t">
                  <span>Total</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
              <div className="text-gray-600 space-y-1">
                <p className="font-medium text-gray-900">{order.shippingName}</p>
                <p>{order.shippingAddress}</p>
                <p>
                  {order.shippingCity}
                  {order.shippingState && `, ${order.shippingState}`} {order.shippingZip}
                </p>
                <p>{order.shippingCountry}</p>
              </div>

              {order.notes && (
                <>
                  <h3 className="text-sm font-medium text-gray-900 mt-6 mb-2">Order Notes</h3>
                  <p className="text-sm text-gray-600">{order.notes}</p>
                </>
              )}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-amber-800">
                <strong>Demo Mode:</strong> This is a simulated order. In a real application, you would receive shipping updates via email.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
