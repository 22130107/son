"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { useState } from "react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  label?: string;
  required?: boolean;
  error?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Nhập nội dung...",
  minHeight = "300px",
  label,
  required = false,
  error,
}: RichTextEditorProps) {
  const [isUploading, setIsUploading] = useState(false);

  // Function to upload image
  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    // Get token from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch("/api/upload", {
      method: "POST",
      headers,
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.message || `Upload failed: ${response.status}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log("Upload response:", data); // Debug log
    // API returns { success: true, data: { url, publicId }, message }
    return data.data?.url || data.url;
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4],
        },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "max-w-full h-auto rounded-lg",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: `prose prose-sm max-w-none focus:outline-none px-4 py-3 ${error ? "border-red-400" : ""}`,
        style: `min-height: ${minHeight}`,
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;

        // Check if there's an image in clipboard
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.indexOf("image") !== -1) {
            event.preventDefault();
            const file = items[i].getAsFile();
            if (file && editor) {
              setIsUploading(true);
              uploadImage(file)
                .then((url) => {
                  editor.chain().focus().setImage({ src: url }).run();
                })
                .catch((err) => {
                  console.error("Upload failed:", err);
                  const errorMessage = err instanceof Error ? err.message : "Không thể tải ảnh lên";
                  alert(errorMessage + "\n\nVui lòng kiểm tra:\n- Đã đăng nhập admin chưa?\n- Kết nối mạng\n- Cấu hình Cloudinary");
                })
                .finally(() => {
                  setIsUploading(false);
                });
            }
            return true;
          }
        }
        return false;
      },
      handleDrop: (view, event) => {
        const files = event.dataTransfer?.files;
        if (!files || files.length === 0) return false;

        // Check if there's an image file
        const imageFile = Array.from(files).find((file) =>
          file.type.startsWith("image/")
        );

        if (imageFile && editor) {
          event.preventDefault();
          setIsUploading(true);
          uploadImage(imageFile)
            .then((url) => {
              const { schema } = view.state;
              const coordinates = view.posAtCoords({
                left: event.clientX,
                top: event.clientY,
              });

              if (coordinates) {
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              }
            })
            .catch((err) => {
              console.error("Upload failed:", err);
              const errorMessage = err instanceof Error ? err.message : "Không thể tải ảnh lên";
              alert(errorMessage + "\n\nVui lòng kiểm tra:\n- Đã đăng nhập admin chưa?\n- Kết nối mạng\n- Cấu hình Cloudinary");
            })
            .finally(() => {
              setIsUploading(false);
            });
          return true;
        }
        return false;
      },
    },
  });

  const addLink = () => {
    const url = window.prompt("Nhập URL:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  // Handle file input for image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;

    setIsUploading(true);
    try {
      const url = await uploadImage(file);
      console.log("Inserting image with URL:", url); // Debug log
      editor.chain().focus().setImage({ src: url }).run();
      console.log("Image inserted, editor content:", editor.getHTML()); // Debug log
    } catch (err) {
      console.error("Upload failed:", err);
      const errorMessage = err instanceof Error ? err.message : "Không thể tải ảnh lên";
      alert(errorMessage + "\n\nVui lòng kiểm tra:\n- Đã đăng nhập admin chưa?\n- Kết nối mạng\n- Cấu hình Cloudinary");
    } finally {
      setIsUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  const addImageFromUrl = () => {
    const url = window.prompt("Nhập URL ảnh (hoặc để trống để hủy):");
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className={`border rounded-lg overflow-hidden bg-white ${error ? "border-red-400" : "border-gray-300"}`}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 bg-gray-50">
          {/* Text formatting */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("bold") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Đậm (Ctrl+B)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 4v12h4.5c1.7 0 3-1.3 3-3 0-1.1-.6-2-1.5-2.5.6-.5 1-1.3 1-2.2 0-1.5-1.2-2.8-2.7-2.8H6zm2 2h2c.6 0 1 .4 1 1s-.4 1-1 1H8V6zm0 4h2.5c.8 0 1.5.7 1.5 1.5S11.3 13 10.5 13H8v-3z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("italic") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Nghiêng (Ctrl+I)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 4v2h1.5l-3 8H7v2h6v-2h-1.5l3-8H16V4h-6z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("underline") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Gạch chân (Ctrl+U)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6 3v7c0 2.2 1.8 4 4 4s4-1.8 4-4V3h-2v7c0 1.1-.9 2-2 2s-2-.9-2-2V3H6zm-2 14h12v2H4v-2z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("strike") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Gạch ngang"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 10h12v2H4v-2zm6-6c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 .5-.2.9-.5 1.3l-.5.5c-1 1-1.5 2-1.5 3.2v.5h2v-.5c0-.7.3-1.3.8-1.8l.5-.5C13.6 9.9 14 9 14 8c0-2.2-1.8-4-4-4z" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Headings */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`px-2 py-1 rounded text-sm font-bold hover:bg-gray-200 transition-colors ${
              editor.isActive("heading", { level: 2 }) ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Tiêu đề 2"
          >
            H2
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`px-2 py-1 rounded text-sm font-bold hover:bg-gray-200 transition-colors ${
              editor.isActive("heading", { level: 3 }) ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Tiêu đề 3"
          >
            H3
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={`px-2 py-1 rounded text-sm hover:bg-gray-200 transition-colors ${
              editor.isActive("paragraph") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Đoạn văn"
          >
            P
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Lists */}
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("bulletList") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Danh sách dấu đầu dòng"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4h2v2H4V4zm4 0h8v2H8V4zM4 8h2v2H4V8zm4 0h8v2H8V8zm-4 4h2v2H4v-2zm4 0h8v2H8v-2z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("orderedList") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Danh sách đánh số"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 4h1v4H5V4zm0 6h1v1H4v1h3V9H5v1zm0 4h2v1H4v1h3v-3H5v1zm3-10h8v2H8V4zm0 4h8v2H8V8zm0 4h8v2H8v-2z" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Alignment */}
          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: "left" }) ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Căn trái"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4h14v2H3V4zm0 4h10v2H3V8zm0 4h14v2H3v-2zm0 4h10v2H3v-2z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: "center" }) ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Căn giữa"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4h14v2H3V4zm2 4h10v2H5V8zm-2 4h14v2H3v-2zm2 4h10v2H5v-2z" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive({ textAlign: "right" }) ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Căn phải"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4h14v2H3V4zm4 4h10v2H7V8zm-4 4h14v2H3v-2zm4 4h10v2H7v-2z" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Link */}
          <button
            type="button"
            onClick={addLink}
            className={`p-2 rounded hover:bg-gray-200 transition-colors ${
              editor.isActive("link") ? "bg-gray-300 text-blue-600" : "text-gray-700"
            }`}
            title="Thêm liên kết"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.26 13.03a4.5 4.5 0 006.36-6.36l-2.12-2.12a4.5 4.5 0 00-6.36 0l-.71.71 1.42 1.42.7-.71a2.5 2.5 0 013.54 0l2.12 2.12a2.5 2.5 0 010 3.54 2.5 2.5 0 01-3.54 0l-.71-.71-1.42 1.42.71.71zm1.48-6.06a4.5 4.5 0 00-6.36 6.36l2.12 2.12a4.5 4.5 0 006.36 0l.71-.71-1.42-1.42-.7.71a2.5 2.5 0 01-3.54 0l-2.12-2.12a2.5 2.5 0 010-3.54 2.5 2.5 0 013.54 0l.71.71 1.42-1.42-.71-.71z" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Image Upload */}
          <label
            className={`p-2 rounded hover:bg-gray-200 transition-colors cursor-pointer ${
              isUploading ? "opacity-50 cursor-not-allowed" : "text-gray-700"
            }`}
            title="Tải ảnh lên từ máy tính"
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </label>

          <button
            type="button"
            onClick={addImageFromUrl}
            className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700"
            title="Thêm ảnh từ URL"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          {/* Undo/Redo */}
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Hoàn tác (Ctrl+Z)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            className="p-2 rounded hover:bg-gray-200 transition-colors text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Làm lại (Ctrl+Y)"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M12.293 3.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 9H9a5 5 0 00-5 5v2a1 1 0 11-2 0v-2a7 7 0 017-7h5.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Editor content */}
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      {isUploading && (
        <div className="flex items-center gap-2 text-blue-600 text-sm">
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Đang tải ảnh lên...</span>
        </div>
      )}

      <p className="text-xs text-gray-400">
        💡 Sử dụng các nút trên để định dạng văn bản. Bạn có thể paste (Ctrl+V) hoặc kéo thả ảnh trực tiếp vào editor.
      </p>
    </div>
  );
}
