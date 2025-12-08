"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Save, User } from "lucide-react";

interface Profile {
  id: number;
  name: string;
  bio?: string;
  profileImage?: string;
  email?: string;
  createdAt?: string;
}

export default function SellerProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    profileImage: "",
  });

  const role = (session?.user as any)?.role;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=/dashboard/profile");
    } else if (status === "authenticated" && role !== "seller") {
      router.push("/account");
    }
  }, [status, role, router]);

  useEffect(() => {
    async function loadProfile() {
      if (status !== "authenticated" || role !== "seller") return;

      try {
        const res = await fetch("/api/seller/profile");
        const data = await res.json();

        if (data.needsSetup) {
          setIsNew(true);
          // Pre-fill with user name
          setFormData({
            name: data.user?.name || session?.user?.name || "",
            bio: "",
            profileImage: "",
          });
        } else if (data.profile) {
          setFormData({
            name: data.profile.name || "",
            bio: data.profile.bio || "",
            profileImage: data.profile.profileImage || "",
          });
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [status, role, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/seller/profile", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          bio: formData.bio || null,
          profileImage: formData.profileImage || null,
        }),
      });

      if (res.ok) {
        if (isNew) {
          router.push("/dashboard");
        } else {
          alert("Profile updated successfully!");
        }
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile");
    } finally {
      setSaving(false);
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
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/dashboard"
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {isNew ? "Set Up Your Shop" : "Shop Profile"}
            </h1>
            <p className="text-gray-600">
              {isNew
                ? "Complete your seller profile to start selling"
                : "Manage your shop information"}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
          <div className="space-y-6">
            {/* Profile Image Preview */}
            <div className="flex justify-center">
              <div className="relative">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Shop"
                    className="h-24 w-24 rounded-full object-cover border-4 border-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = "";
                      e.currentTarget.onerror = null;
                    }}
                  />
                ) : (
                  <div className="h-24 w-24 rounded-full bg-[#2B9EB3] flex items-center justify-center text-white text-3xl font-bold">
                    {formData.name.charAt(0).toUpperCase() || "S"}
                  </div>
                )}
              </div>
            </div>

            {/* Shop Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Shop Name *
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                placeholder="My Handcrafted Shop"
              />
            </div>

            {/* Profile Image URL */}
            <div>
              <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                id="profileImage"
                value={formData.profileImage}
                onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                placeholder="https://example.com/profile.jpg"
              />
            </div>

            {/* Bio */}
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                About Your Shop
              </label>
              <textarea
                id="bio"
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#44AF69] focus:border-transparent resize-none"
                placeholder="Tell customers about your shop, your craft, and what makes your products special..."
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t">
            {!isNew && (
              <Link
                href="/dashboard"
                className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </Link>
            )}
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
              {isNew ? "Create Shop" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
