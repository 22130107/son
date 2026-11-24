"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLayout from "@/components/admin/AdminLayout";
import { formatBytes, MediaFile } from "@/components/admin/MediaLibraryModal";
import { compressImageBeforeUpload } from "@/lib/client-image-compression";

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ current: number; total: number } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [previewImage, setPreviewImage] = useState<MediaFile | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaFile | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const token = () =>
    typeof window !== "undefined" ? localStorage.getItem("admin_token") || "" : "";

  const fetchFiles = useCallback(async (search = "") => {
    setLoading(true);
    try {
      const t = token();
      const url = search
        ? `/api/upload?search=${encodeURIComponent(search)}`
        : "/api/upload";
      const res = await fetch(url, {
        headers: t ? { Authorization: `Bearer ${t}` } : {},
      });
      const result = await res.json();
      if (result.success) {
        setFiles(result.data || []);
      } else {
        showToast(result.message || "Không thể tải danh sách ảnh", "error");
      }
    } catch {
      showToast("Lỗi kết nối khi tải danh sách ảnh", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
    fetchFiles(val);
  };

  const uploadFiles = async (selectedFiles: FileList | File[]) => {
    if (!selectedFiles || selectedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress({ current: 0, total: selectedFiles.length });
    const t = token();
    let successCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const originalFile = selectedFiles[i];
      setUploadProgress({ current: i + 1, total: selectedFiles.length });

      try {
        // Nén ảnh trực tiếp trên trình duyệt trước khi upload (giảm 90-95% dung lượng)
        const file = await compressImageBeforeUpload(originalFile);
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: t ? { Authorization: `Bearer ${t}` } : {},
          body: formData,
        });
        const result = await res.json();
        if (result.success) {
          successCount++;
        } else {
          showToast(`Lỗi upload ${originalFile.name}: ${result.message}`, "error");
        }
      } catch {
        showToast(`Lỗi kết nối khi tải ${originalFile.name}`, "error");
      }
    }

    setUploading(false);
    setUploadProgress(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (successCount > 0) {
      showToast(`Đã tải lên và nén WebP thành công ${successCount} ảnh`, "success");
      await fetchFiles(searchTerm);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) uploadFiles(e.target.files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files) uploadFiles(e.dataTransfer.files);
  };

  const handleCopyUrl = async (url: string) => {
    try {
      const fullUrl = window.location.origin + url;
      await navigator.clipboard.writeText(fullUrl);
      showToast("Đã sao chép liên kết ảnh vào bộ nhớ tạm", "success");
    } catch {
      showToast("Không thể sao chép liên kết", "error");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    const t = token();

    try {
      const res = await fetch("/api/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(t ? { Authorization: `Bearer ${t}` } : {}),
        },
        body: JSON.stringify({ fileName: deleteTarget.fileName, url: deleteTarget.url }),
      });
      const result = await res.json();
      if (result.success) {
        showToast("Đã xóa ảnh thành công", "success");
        setDeleteTarget(null);
        await fetchFiles(searchTerm);
      } else {
        showToast(result.message || "Xóa ảnh thất bại", "error");
      }
    } catch {
      showToast("Lỗi kết nối khi xóa ảnh", "error");
    } finally {
      setDeleting(false);
    }
  };

  // Tính toán số liệu thống kê
  const totalSize = files.reduce((acc, f) => acc + (f.size || 0), 0);
  const webpCount = files.filter((f) => f.fileName.endsWith(".webp")).length;

  return (
    <AdminGuard>
      <AdminLayout>
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Kho Quản Lý Hình Ảnh
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Lưu trữ tại máy chủ cục bộ (<code className="text-blue-600 font-mono">public/uploads</code>), tự động tối ưu hóa và nén định dạng WebP.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="hidden"
                onChange={handleFileSelect}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg shadow-xs transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Tải ảnh lên (Nén WebP)
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Tổng số lượng</p>
                <p className="text-xl font-bold text-gray-900">{files.length} ảnh</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Định dạng chuẩn WebP</p>
                <p className="text-xl font-bold text-gray-900">{webpCount} ảnh</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7c0-2-1-3-3-3H7C5 4 4 5 4 7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Tổng dung lượng kho</p>
                <p className="text-xl font-bold text-gray-900">{formatBytes(totalSize)}</p>
              </div>
            </div>
          </div>

          {/* Upload Dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all mb-6 ${
              dragOver
                ? "border-blue-500 bg-blue-50/50"
                : "border-gray-300 hover:border-blue-400 bg-white"
            }`}
          >
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="text-sm font-medium text-gray-700">
                  Đang nén WebP và tải lên... ({uploadProgress?.current}/{uploadProgress?.total})
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-gray-700">
                  Kéo thả nhiều ảnh vào đây hoặc <span className="text-blue-600">click để chọn file</span>
                </p>
                <p className="text-xs text-gray-400">
                  Hỗ trợ JPG, PNG, WebP, GIF. Tự động chuyển đổi sang WebP chuẩn và nén tối ưu.
                </p>
              </div>
            )}
          </div>

          {/* Search bar */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="relative flex-1 max-w-md">
              <svg className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Tìm kiếm hình ảnh theo tên..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-hidden focus:border-blue-500 shadow-2xs"
              />
              {searchTerm && (
                <button
                  onClick={() => { setSearchTerm(""); fetchFiles(""); }}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 text-sm font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            <button
              onClick={() => fetchFiles(searchTerm)}
              title="Làm mới danh sách"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200 bg-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Image Grid */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-400">
              <svg className="w-16 h-16 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-base font-medium text-gray-600">Chưa có ảnh nào trong kho</p>
              <p className="text-sm text-gray-400 mt-1">Hãy tải ảnh lên để bắt đầu quản lý</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {files.map((file) => (
                <div
                  key={file.fileName}
                  className="group relative bg-white border border-gray-200 hover:border-blue-400 hover:shadow-md rounded-xl overflow-hidden transition-all flex flex-col"
                >
                  {/* Thumbnail area */}
                  <div className="aspect-square w-full relative bg-gray-50 flex items-center justify-center p-2 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={file.url}
                      alt={file.fileName}
                      loading="lazy"
                      className="object-contain w-full h-full"
                    />

                    {/* Format badge */}
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-black/60 text-white backdrop-blur-xs uppercase">
                      {file.fileName.split(".").pop()}
                    </span>

                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPreviewImage(file)}
                        title="Xem phóng to"
                        className="p-2 bg-white text-gray-700 hover:text-blue-600 rounded-lg shadow-sm transition-transform hover:scale-110"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>

                      <button
                        onClick={() => handleCopyUrl(file.url)}
                        title="Sao chép liên kết"
                        className="p-2 bg-white text-gray-700 hover:text-blue-600 rounded-lg shadow-sm transition-transform hover:scale-110"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                      </button>

                      <button
                        onClick={() => setDeleteTarget(file)}
                        title="Xóa ảnh"
                        className="p-2 bg-white text-red-600 hover:bg-red-50 rounded-lg shadow-sm transition-transform hover:scale-110"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-2.5 flex-1 flex flex-col justify-between">
                    <p className="text-xs font-medium text-gray-800 truncate" title={file.fileName}>
                      {file.fileName}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                      <span>{formatBytes(file.size)}</span>
                      <span>{new Date(file.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.fileName}
                className="max-h-[80vh] max-w-full rounded-lg object-contain shadow-2xl"
              />
              <div className="mt-3 px-4 py-1.5 bg-black/60 rounded-full text-white text-xs backdrop-blur-xs flex items-center gap-3">
                <span>{previewImage.fileName}</span>
                <span>•</span>
                <span>{formatBytes(previewImage.size)}</span>
                <span>•</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyUrl(previewImage.url);
                  }}
                  className="text-blue-300 hover:text-white underline font-medium"
                >
                  Sao chép URL
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteTarget && (
          <div className="fixed inset-0 z-60 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 text-center mb-1">
                Xác nhận xóa hình ảnh?
              </h3>
              <p className="text-sm text-gray-500 text-center mb-4">
                File <code className="text-red-600 font-mono text-xs">{deleteTarget.fileName}</code> sẽ bị xóa vĩnh viễn khỏi server. Nếu ảnh này đang được sử dụng trong bài viết hoặc sản phẩm, liên kết sẽ bị hỏng.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center gap-1.5"
                >
                  {deleting ? "Đang xóa..." : "Xác nhận xóa"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Alert */}
        {toast && (
          <div
            className={`fixed bottom-6 right-6 z-70 px-4 py-3 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 transition-all ${
              toast.type === "success"
                ? "bg-gray-900 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            <span>{toast.msg}</span>
          </div>
        )}
      </AdminLayout>
    </AdminGuard>
  );
}
