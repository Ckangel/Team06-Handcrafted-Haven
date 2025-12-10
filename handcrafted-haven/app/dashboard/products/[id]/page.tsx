"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, Trash2 } from "lucide-react";
import { useToast } from "@/app/context/ToastContext";

interface Category {
  id: number;
  name: string;
}

export default function EditProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    categoryId: "",
    imageUrl: "",
    badge: "",
    description: "",
  });

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/login?callbackUrl=/dashboard/products/${productId}`);
    } else if (status === "authenticated" && role !== "seller") {
      router.push("/account");
    }
  }, [status, role, router, productId]);

  useEffect(() => {
    async function loadData() {
      if (status !== "authenticated" || role !== "seller") return;

      try {
        const [productRes, categoriesRes] = await Promise.all([
          fetch(`/api/seller/products/${productId}`),
          fetch("/api/categories"),
        ]);

        if (productRes.ok) {
          const productData = await productRes.json();
          const p = productData.product;
          setFormData({
            name: p.name || "",
            price: p.price?.toString() || "",
            originalPrice: p.originalPrice?.toString() || "",
            categoryId: p.categoryId?.toString() || "",
            imageUrl: p.imageUrl || "",
            badge: p.badge || "",
            description: p.description || "",
          });
        } else {
          router.push("/dashboard/products");
        }

        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData.categories || categoriesData || []);
        }
      } catch (error) {
        console.error("Error loading product:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [status, role, productId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/seller/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          price: parseFloat(formData.price),
          originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
          categoryId: formData.categoryId ? parseInt(formData.categoryId) : null,
          imageUrl: formData.imageUrl || null,
          badge: formData.badge || null,
          description: formData.description || null,
        }),
      });

      if (res.ok) {
        showToast({
          tone: "success",
          title: "Product updated",
          description: "Your changes have been saved.",
        });
        router.push("/dashboard/products");
      } else {
        const data = await res.json();
        showToast({
          tone: "error",
          title: "Update failed",
          description: data.error || "Please try again in a moment.",
        });
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showToast({
        tone: "error",
        title: "Update failed",
        description: "Something went wrong while saving.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/seller/products/${productId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        showToast({
          tone: "success",
          title: "Product deleted",
          description: "The product was removed from your shop.",
        });
        router.push("/dashboard/products");
      } else {
        showToast({
          tone: "error",
          title: "Delete failed",
          description: "We couldn't delete that product. Please retry.",
        });
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      showToast({
        tone: "error",
        title: "Delete failed",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setDeleting(false);
    }
  };

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
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/products"
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Edit Product</h1>
              <p className="text-gray-600">Update product details</p>
            </div>
          </div>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-2 px-4 py-2 text-[#F8333C] border border-[#F8333C] rounded-lg hover:bg-red-50 transition disabled:opacity-50"
          >
            {deleting ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
            Delete
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
              />
            </div>

            {/* Price Row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="price"
                    required
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="originalPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Original Price (optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    id="originalPrice"
                    step="0.01"
                    min="0"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                    className="w-full pl-8 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
              />
              {formData.imageUrl && (
                <div className="mt-2">
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}
            </div>

            {/* Badge */}
            <div>
              <label htmlFor="badge" className="block text-sm font-medium text-gray-700 mb-1">
                Badge
              </label>
              <select
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
              >
                <option value="">No badge</option>
                <option value="New">New</option>
                <option value="Sale">Sale</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Limited">Limited Edition</option>
                <option value="Handmade">Handmade</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            <Link
              href="/dashboard/products"
              className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition disabled:opacity-50"
            >
              {saving ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Save className="h-5 w-5" />
              )}
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
