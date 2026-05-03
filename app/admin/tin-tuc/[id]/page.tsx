"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import NewsForm from "@/components/admin/NewsForm";

interface NewsData {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  image: string;
  category: string;
  published_at: string;
  is_published: number;
}

export default function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState<NewsData | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadNews();
  }, [id]);

  const loadNews = async () => {
    try {
      const res = await fetch(`/api/news/${id}`);
      const result = await res.json();
      if (result.success) {
        setNews(result.data);
      } else {
        showToast("Không tìm thấy bài viết", "error");
        setTimeout(() => router.push("/admin/tin-tuc"), 1500);
      }
    } catch (err) {
      showToast("Lỗi tải dữ liệu", "error");
    } finally {
      setLoading(false);
    }
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
      const res = await fetch(`/api/news/${id}`, {
        method: "PUT",
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
        showToast("✅ Cập nhật bài viết thành công!", "success");
        setTimeout(() => router.push("/admin/tin-tuc"), 1000);
      } else {
        showToast(result.message || "Lỗi cập nhật bài viết", "error");
      }
    } catch (err) {
      showToast("Lỗi kết nối server", "error");
    }
  };

  if (loading) {
    return (
      <AdminGuard>
        <AdminLayout>
          <main className="flex-1 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full" />
          </main>
        </AdminLayout>
      </AdminGuard>
    );
  }

  if (!news) {
    return null;
  }

  return (
    <AdminGuard>
      <AdminLayout>
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-bold text-gray-800">Chỉnh sửa bài viết</h1>
            <p className="text-sm text-gray-500 mt-0.5">{news.title}</p>
          </header>

          <div className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl">
              <NewsForm
                initialData={{
                  slug: news.slug,
                  title: news.title,
                  excerpt: news.excerpt || "",
                  content: news.content,
                  image: news.image,
                  category: news.category,
                  published_at: news.published_at,
                  is_published: news.is_published === 1,
                }}
                onSubmit={handleSubmit}
                submitLabel="Cập nhật bài viết"
              />
            </div>
          </div>
        </main>

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
      </AdminLayout>
    </AdminGuard>
  );
}
