"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import NewsForm from "@/components/admin/NewsForm";

export default function AddNewsPage() {
  const router = useRouter();
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmit = async (data: {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    published_at: string;
    is_published: boolean;
  }) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") || "" : "";

    try {
      const res = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          published_at: new Date(data.published_at).toISOString().slice(0, 19).replace("T", " "),
        }),
      });

      const result = await res.json();
      if (result.success) {
        showToast("✅ Thêm bài viết thành công!", "success");
        setTimeout(() => router.push("/admin/tin-tuc"), 1000);
      } else {
        showToast(result.message || "Lỗi thêm bài viết", "error");
      }
    } catch (err) {
      showToast("Lỗi kết nối server", "error");
    }
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-bold text-gray-800">Thêm bài viết mới</h1>
            <p className="text-sm text-gray-500 mt-0.5">Tạo bài viết tin tức mới</p>
          </header>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl">
              <NewsForm onSubmit={handleSubmit} submitLabel="Thêm bài viết" />
            </div>
          </div>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg text-white text-sm font-medium ${
            toast.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </AdminGuard>
  );
}
