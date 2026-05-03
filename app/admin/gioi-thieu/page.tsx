"use client";

import React, { useState, useEffect } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  
  const [form, setForm] = useState({
    about_title: "",
    about_content: "",
    about_image: "",
  });

  const showToast = (msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      const result = await res.json();
      if (result.success) {
        setForm({
          about_title: result.data.about_title || "",
          about_content: result.data.about_content || "",
          about_image: result.data.about_image || "",
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") || "" : "";

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await res.json();
      if (result.success) {
        showToast("✅ Cập nhật thành công!", "success");
      } else {
        showToast(result.message || "Lỗi cập nhật", "error");
      }
    } catch (err) {
      showToast("Lỗi kết nối server", "error");
    } finally {
      setSaving(false);
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

  return (
    <AdminGuard>
      <AdminLayout>
        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-bold text-gray-800">Quản lý Giới thiệu</h1>
            <p className="text-sm text-gray-500 mt-0.5">Cập nhật nội dung trang giới thiệu</p>
          </header>

          <div className="flex-1 overflow-auto p-6">
            <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
              {/* Title */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề trang
                </label>
                <input
                  type="text"
                  value={form.about_title}
                  onChange={(e) => setForm((p) => ({ ...p, about_title: e.target.value }))}
                  placeholder="VD: Về Chúng Tôi"
                  className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Image */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ảnh đại diện
                </label>
                <ImageUploader
                  value={form.about_image}
                  onChange={(url) => setForm((p) => ({ ...p, about_image: url }))}
                  aspectRatio="wide"
                />
              </div>

              {/* Content */}
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <RichTextEditor
                  label="Nội dung"
                  value={form.about_content}
                  onChange={(val) => setForm((p) => ({ ...p, about_content: val }))}
                  placeholder="Nhập nội dung giới thiệu..."
                  minHeight="400px"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity disabled:opacity-60"
                  style={{ backgroundColor: "#1a3a8f" }}
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Đang lưu...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Lưu thay đổi
                    </>
                  )}
                </button>
              </div>
            </form>
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
