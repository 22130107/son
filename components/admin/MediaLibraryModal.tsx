"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { compressImageBeforeUpload } from "@/lib/client-image-compression";

export interface MediaFile {
  fileName: string;
  url: string;
  size: number;
  createdAt: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
  title?: string;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelect,
  title = "Kho hình ảnh",
}: MediaLibraryModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUrl, setSelectedUrl] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = useCallback(async (searchQuery = "") => {
    setLoading(true);
    setErrorMessage("");
    try {
      const token = localStorage.getItem("admin_token") || "";
      const url = searchQuery
        ? `/api/upload?search=${encodeURIComponent(searchQuery)}`
        : "/api/upload";
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setFiles(data.data || []);
      } else {
        setErrorMessage(data.message || "Không thể tải danh sách ảnh");
      }
    } catch {
      setErrorMessage("Lỗi kết nối khi tải danh sách ảnh");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSelectedUrl("");
      setSearchTerm("");
      fetchFiles();
    }
  }, [isOpen, fetchFiles]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    fetchFiles(term);
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    setUploading(true);
    setErrorMessage("");
    const token = localStorage.getItem("admin_token") || "";

    try {
      for (let i = 0; i < fileList.length; i++) {
        const originalFile = fileList[i];
        const file = await compressImageBeforeUpload(originalFile);
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.data?.url) {
          // Tự động chọn ảnh cuối cùng vừa upload
          setSelectedUrl(data.data.url);
        } else {
          setErrorMessage(data.message || `Lỗi khi upload file ${file.name}`);
        }
      }
      await fetchFiles(searchTerm);
    } catch {
      setErrorMessage("Lỗi kết nối khi upload ảnh");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleConfirmSelect = () => {
    if (selectedUrl) {
      onSelect(selectedUrl);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded-full font-medium">
              {files.length} ảnh
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100">
          <div className="relative flex-1 min-w-[240px]">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm theo tên ảnh..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-9 pr-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg focus:outline-hidden focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={handleUploadFile}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-xs transition-colors"
            >
              {uploading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Đang nén & tải lên...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Tải ảnh mới (WebP)
                </>
              )}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="px-6 py-2 bg-red-50 text-red-600 text-xs border-b border-red-100 flex items-center justify-between">
            <span>{errorMessage}</span>
            <button onClick={() => setErrorMessage("")} className="font-semibold text-red-800">×</button>
          </div>
        )}

        {/* Image Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 min-h-[320px] max-h-[500px]">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="aspect-square bg-gray-100 animate-pulse rounded-lg" />
              ))}
            </div>
          ) : files.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-sm">Không tìm thấy hình ảnh nào</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 text-xs text-blue-600 hover:underline"
              >
                Nhấp vào đây để tải ảnh lên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {files.map((file) => {
                const isSelected = selectedUrl === file.url;
                return (
                  <div
                    key={file.fileName}
                    onClick={() => setSelectedUrl(file.url)}
                    className={`group relative rounded-lg border overflow-hidden cursor-pointer bg-gray-50 transition-all ${
                      isSelected
                        ? "border-blue-600 ring-2 ring-blue-500/30 bg-blue-50/20"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-xs"
                    }`}
                  >
                    <div className="aspect-square w-full relative flex items-center justify-center p-2 bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={file.url}
                        alt={file.fileName}
                        loading="lazy"
                        className="object-contain w-full h-full"
                      />

                      {/* Selected checkmark */}
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}

                      {/* Hover action bar */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewImage(file.url);
                          }}
                          title="Xem phóng to"
                          className="p-1.5 bg-white text-gray-700 hover:text-blue-600 rounded-md shadow-xs text-xs font-medium"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="p-2 bg-white border-t border-gray-100">
                      <p className="text-xs font-medium text-gray-800 truncate" title={file.fileName}>
                        {file.fileName}
                      </p>
                      <div className="flex items-center justify-between mt-1 text-[11px] text-gray-400">
                        <span>{formatBytes(file.size)}</span>
                        <span>{file.fileName.endsWith(".webp") ? "WEBP" : file.fileName.split(".").pop()?.toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-gray-50 border-t border-gray-100">
          <div className="text-xs text-gray-500 truncate max-w-sm">
            {selectedUrl ? (
              <span className="text-gray-700 font-medium">Đã chọn: <span className="text-blue-600">{selectedUrl}</span></span>
            ) : (
              <span>Chọn một ảnh trong danh sách để tiếp tục</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleConfirmSelect}
              disabled={!selectedUrl}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg shadow-xs transition-colors"
            >
              Chọn ảnh này
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox Preview Modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Preview"
              className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
