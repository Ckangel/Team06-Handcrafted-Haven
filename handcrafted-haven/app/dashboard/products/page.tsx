"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Loader2,
  ArrowLeft,
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  badge?: string;
  categoryName?: string;
  avgRating: number;
  reviewCount: number;
  createdAt: string;
}

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleting, setDeleting] = useState<number | null>(null);

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard/products");
    } else if (status === "authenticated" && role !== "seller") {
      router.push("/account");
    }
  }, [status, role, router]);

  useEffect(() => {
    async function loadProducts() {
      if (status !== "authenticated" || role !== "seller") return;

      try {
        const res = await fetch("/api/seller/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [status, role]);

  const handleDelete = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(productId);
    try {
      const res = await fetch(`/api/seller/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setProducts(products.filter((p) => p.id !== productId));
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    } finally {
      setDeleting(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
            <p className="text-gray-600">{products.length} products</p>
          </div>
          <Link
            href="/dashboard/products/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
            />
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            {products.length === 0 ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No products yet</h2>
                <p className="text-gray-600 mb-6">Start selling by adding your first product</p>
                <Link
                  href="/dashboard/products/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition"
                >
                  <Plus className="h-5 w-5" />
                  Add Your First Product
                </Link>
              </>
            ) : (
              <>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h2>
                <p className="text-gray-600">Try a different search term</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden group"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-100">
                  {product.imageUrl ? (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Package className="h-12 w-12" />
                    </div>
                  )}
                  {product.badge && (
                    <span className="absolute top-2 left-2 bg-[#F8333C] text-white text-xs px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  )}

                  {/* Action overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <Link
                      href={`/dashboard/products/${product.id}`}
                      className="p-2 bg-white rounded-full hover:bg-gray-100 transition"
                      title="Edit"
                    >
                      <Edit className="h-5 w-5 text-gray-700" />
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="p-2 bg-white rounded-full hover:bg-red-50 transition"
                      title="Delete"
                    >
                      {deleting === product.id ? (
                        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5 text-[#F8333C]" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{product.name}</h3>
                  {product.categoryName && (
                    <p className="text-sm text-gray-500">{product.categoryName}</p>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-[#44AF69]">
                        ${Number(product.price).toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          ${Number(product.originalPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Star className="h-4 w-4 text-[#FCAB10]" />
                      {product.avgRating > 0 ? product.avgRating : "—"}
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
