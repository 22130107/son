"use client";

import React, { useState } from "react";
import ImageUploader from "./ImageUploader";
import RichTextEditor from "./RichTextEditor";
import { stripHtml } from "@/lib/sanitize";

interface NewsFormData {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  published_at: string;
  is_published: boolean;
}

interface NewsFormProps {
  initialData?: Partial<NewsFormData>;
  onSubmit: (data: NewsFormData) => Promise<void>;
  submitLabel?: string;
}

const CATEGORIES = [
  "Tin tức",
  "Kinh nghiệm",
  "Hướng dẫn",
  "Khuyến mãi",
  "Dự án",
];

export default function NewsForm({ initialData, onSubmit, submitLabel = "Lưu bài viết" }: NewsFormProps) {
  const [form, setForm] = useState<NewsFormData>({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    excerpt: stripHtml(initialData?.excerpt) || "",
    content: initialData?.content || "",
    image: initialData?.image || "",
    category: initialData?.category || "Tin tức",
    published_at: initialData?.published_at
      ? new Date(initialData.published_at).toISOString().slice(0, 16)
      : new Date().toISOString().slice(0, 16),
    is_published: initialData?.is_published ?? true,
  });

  const [submitting, setSubmitting] = useState(false);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(form);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu đề <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="VD: Hướng dẫn chọn sơn nước chất lượng"
          className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Slug */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Đường dẫn (Slug) <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          value={form.slug}
          onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
          placeholder="huong-dan-chon-son-nuoc"
          className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500 font-mono"
        />
        <p className="text-xs text-gray-400 mt-1">
          URL: /tin-tuc/{form.slug || "slug"}
        </p>
      </div>

      {/* Category & Published Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Danh mục
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ngày đăng
          </label>
          <input
            type="datetime-local"
            value={form.published_at}
            onChange={(e) => setForm((p) => ({ ...p, published_at: e.target.value }))}
            className="w-full h-10 border border-gray-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Image */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh đại diện <span className="text-red-500">*</span>
        </label>
        <ImageUploader
          value={form.image}
          onChange={(url) => setForm((p) => ({ ...p, image: url }))}
          aspectRatio="wide"
        />
      </div>

      {/* Excerpt */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mô tả ngắn
        </label>
        <textarea
          rows={3}
          value={form.excerpt}
          onChange={(e) => setForm((p) => ({ ...p, excerpt: e.target.value }))}
          placeholder="Mô tả ngắn gọn về bài viết (hiển thị trong danh sách và thẻ meta)"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500 resize-y"
        />
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <RichTextEditor
          label="Nội dung"
          value={form.content}
          onChange={(val) => setForm((p) => ({ ...p, content: val }))}
          placeholder="Nhập nội dung bài viết..."
          minHeight="400px"
          required
        />
      </div>

      {/* Published Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.is_published}
            onChange={(e) => setForm((p) => ({ ...p, is_published: e.target.checked }))}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-700">Xuất bản bài viết</span>
            <p className="text-xs text-gray-400">
              Bài viết sẽ hiển thị công khai trên website
            </p>
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="submit"
          disabled={submitting || !form.title || !form.slug || !form.image || !form.content}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white transition-opacity disabled:opacity-60"
          style={{ backgroundColor: "#1a3a8f" }}
        >
          {submitting ? (
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
              {submitLabel}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
