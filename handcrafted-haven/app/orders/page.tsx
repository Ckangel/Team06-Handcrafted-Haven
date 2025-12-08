"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Package, ArrowLeft, Loader2, ShoppingBag } from "lucide-react";

interface Order {
  id: number;
  status: string;
  totalAmount: number;
  shippingName: string;
  shippingCity: string;
  shippingCountry: string;
  createdAt: string;
  itemCount: number;
}

export default function OrdersPage() {
  const { status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/orders");
    }
  }, [status, router]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        } else {
          setError("Failed to load orders");
        }
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setIsLoading(false);
      }
    }

    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
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
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Account
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
            <ShoppingBag className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">
              When you place an order, it will appear here.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#44af69] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-white rounded-lg shadow-sm border p-6 hover:border-[#44af69] transition"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Package className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">Order #{order.id}</span>
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {formatDate(order.createdAt)} • {order.itemCount} {order.itemCount === 1 ? "item" : "items"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Ships to: {order.shippingCity}, {order.shippingCountry}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${Number(order.totalAmount).toFixed(2)}
                    </p>
                    <p className="text-sm text-[#2b9eb3] hover:underline">View Details →</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
