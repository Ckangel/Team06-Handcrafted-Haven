"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  ShoppingBag,
  DollarSign,
  Star,
  TrendingUp,
  Plus,
  Settings,
  Loader2,
  AlertCircle,
} from "lucide-react";

interface Stats {
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  avgRating: number;
  pendingOrders: number;
  reviewCount: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  avgRating: number;
  reviewCount: number;
  createdAt: string;
}

export default function SellerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [needsSetup, setNeedsSetup] = useState(false);

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard");
    } else if (status === "authenticated" && role !== "seller") {
      router.push("/account");
    }
  }, [status, role, router]);

  useEffect(() => {
    async function loadDashboard() {
      if (status !== "authenticated" || role !== "seller") return;

      try {
        // Check if seller profile exists
        const profileRes = await fetch("/api/seller/profile");
        const profileData = await profileRes.json();

        if (profileData.needsSetup) {
          setNeedsSetup(true);
          setLoading(false);
          return;
        }

        // Load stats and products in parallel
        const [statsRes, productsRes] = await Promise.all([
          fetch("/api/seller/stats"),
          fetch("/api/seller/products"),
        ]);

        const statsData = await statsRes.json();
        const productsData = await productsRes.json();

        setStats(statsData.stats);
        setProducts(productsData.products || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
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

  if (needsSetup) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-md text-center">
          <AlertCircle className="h-16 w-16 text-[#FCAB10] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Shop Setup</h1>
          <p className="text-gray-600 mb-6">
            You need to set up your seller profile before you can start selling.
          </p>
          <Link
            href="/dashboard/profile"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
          >
            <Settings className="h-5 w-5" />
            Set Up Profile
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Seller Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your products and orders</p>
          </div>
          <Link
            href="/dashboard/products/new"
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </Link>
        </div>

        {/* Stats Grid */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Products</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Orders</p>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <DollarSign className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Revenue</p>
                  <p className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Avg Rating</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stats.avgRating > 0 ? stats.avgRating : "—"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link
            href="/dashboard/products"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <Package className="h-8 w-8 text-[#2B9EB3] mb-3" />
            <h3 className="font-semibold text-gray-800 group-hover:text-[#44AF69]">
              Manage Products
            </h3>
            <p className="text-sm text-gray-500 mt-1">View, edit, or delete products</p>
          </Link>

          <Link
            href="/dashboard/orders"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <ShoppingBag className="h-8 w-8 text-[#2B9EB3] mb-3" />
            <h3 className="font-semibold text-gray-800 group-hover:text-[#44AF69]">
              View Orders
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {stats?.pendingOrders ? `${stats.pendingOrders} pending` : "Track customer orders"}
            </p>
          </Link>

          <Link
            href="/dashboard/reviews"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <Star className="h-8 w-8 text-[#FCAB10] mb-3" />
            <h3 className="font-semibold text-gray-800 group-hover:text-[#44AF69]">
              Reviews
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              {stats?.reviewCount ? `${stats.reviewCount} reviews` : "See customer feedback"}
            </p>
          </Link>

          <Link
            href="/dashboard/profile"
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition group"
          >
            <Settings className="h-8 w-8 text-gray-400 mb-3" />
            <h3 className="font-semibold text-gray-800 group-hover:text-[#44AF69]">
              Shop Settings
            </h3>
            <p className="text-sm text-gray-500 mt-1">Update your shop profile</p>
          </Link>
        </div>

        {/* Recent Products */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Recent Products</h2>
              <Link
                href="/dashboard/products"
                className="text-sm text-[#44AF69] hover:underline"
              >
                View all
              </Link>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-800 mb-2">No products yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first product</p>
              <Link
                href="/dashboard/products/new"
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-gray-50">
                  <div className="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-gray-400">
                        <Package className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-800 truncate">{product.name}</h3>
                    <p className="text-sm text-gray-500">${Number(product.price).toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-[#FCAB10]" />
                      {product.avgRating > 0 ? product.avgRating : "—"}
                    </div>
                    <p className="text-xs text-gray-400">{product.reviewCount} reviews</p>
                  </div>
                  <Link
                    href={`/dashboard/products/${product.id}`}
                    className="px-3 py-1 text-sm border border-gray-200 rounded-lg hover:border-[#44AF69] hover:text-[#44AF69] transition"
                  >
                    Edit
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
