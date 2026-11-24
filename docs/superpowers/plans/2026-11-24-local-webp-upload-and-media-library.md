# Kế Hoạch Triển Khai: Upload Local, Nén WebP và Kho Quản Lý Hình Ảnh

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển đổi toàn bộ việc upload ảnh từ Cloudinary về local (`public/uploads`), tự động nén WebP (max-width 1920px, quality 80%), và xây dựng trang Kho quản lý hình ảnh trong Admin kèm tính năng chọn ảnh từ kho trong các form.

**Architecture:** Sử dụng thư viện `sharp` trên Next.js Route Handler (`/api/upload`) để xử lý nén WebP và lưu trữ vào `public/uploads/`. Xây dựng trang `/admin/hinh-anh` và component `MediaLibraryModal` bằng React/TailwindCSS để duyệt, tìm kiếm, upload và quản lý ảnh.

**Tech Stack:** Next.js (App Router), React 19, TailwindCSS, sharp, TypeScript.

## Global Constraints
- Nén ảnh: WebP, max width 1920px (không enlarge ảnh nhỏ), quality 80%.
- Thư mục lưu trữ: `public/uploads/`.
- Định dạng đường dẫn URL: `/uploads/{filename}.webp`.
- Bảo mật: Yêu cầu xác thực admin (`requireAuth`), kiểm tra Path Traversal cho `DELETE`.
- Tương thích ngược: Giữ logic xóa fallback Cloudinary nếu URL là ảnh cũ.

---

### Task 1: Cài đặt Sharp và hoàn thiện API `/api/upload`

**Files:**
- Modify: `package.json`
- Modify: `app/api/upload/route.ts`

**Interfaces:**
- `POST /api/upload`: Nhận `multipart/form-data` chứa `file`, trả về `{ success: true, data: { url: string, fileName: string, size: number } }`.
- `GET /api/upload`: Query `search`, trả về `{ success: true, data: Array<{ url: string, fileName: string, size: number, createdAt: string }> }`.
- `DELETE /api/upload`: Body `{ url?: string, fileName?: string }`, xóa file an toàn, trả về `{ success: true, message: string }`.

- [ ] **Step 1: Cài đặt `sharp` và `@types/sharp`**
  Chạy lệnh: `npm install sharp && npm install -D @types/sharp`

- [ ] **Step 2: Viết logic `POST /api/upload` với Sharp**
  - Đọc `formData` lấy `file`.
  - Validate định dạng: `["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"]`.
  - Tạo slug an toàn cho tên file kèm timestamp: `${Date.now()}-${slug}.webp`.
  - Dùng `sharp(buffer).resize({ width: 1920, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer()`.
  - Lưu vào `public/uploads/{fileName}`.

- [ ] **Step 3: Viết logic `GET /api/upload`**
  - Đọc thư mục `public/uploads/` bằng `fs/promises`.
  - Đọc thông tin file (`size`, `mtime`).
  - Lọc ảnh hợp lệ, sort giảm dần theo `mtime`.
  - Hỗ trợ query lọc theo `search`.

- [ ] **Step 4: Hoàn thiện `DELETE /api/upload`**
  - Kiểm tra `fileName` chống `..` và `/`.
  - Xóa file trên `public/uploads/` nếu tồn tại.
  - Fallback xóa Cloudinary nếu URL chứa `cloudinary.com`.

- [ ] **Step 5: Kiểm thử nhanh endpoint bằng node test script hoặc curl**

---

### Task 2: Xây dựng Component `MediaLibraryModal`

**Files:**
- Create: `components/admin/MediaLibraryModal.tsx`

**Interfaces:**
- Props: `isOpen: boolean`, `onClose: () => void`, `onSelect: (url: string) => void`.

- [ ] **Step 1: Tạo component `MediaLibraryModal`**
  - Modal overlay với backdrop blur.
  - Header: Tiêu đề "Kho hình ảnh", nút đóng (X).
  - Thanh công cụ: Ô tìm kiếm tên ảnh, nút "Tải ảnh mới" (hỗ trợ chọn file upload trực tiếp vào kho và reload danh sách).
  - Thân modal: Lưới ảnh (Grid) thumbnail, click để chọn hoặc preview.
  - Footer: Nút "Hủy" và "Chọn ảnh này".

---

### Task 3: Xây dựng Trang Quản Lý Kho Ảnh (`/admin/hinh-anh`) & Sidebar

**Files:**
- Create: `app/admin/hinh-anh/page.tsx`
- Modify: `components/admin/AdminSidebar.tsx`

**Interfaces:**
- URL: `/admin/hinh-anh` (Chỉ admin đã đăng nhập).

- [ ] **Step 1: Thêm mục "Kho hình ảnh" vào `AdminSidebar.tsx`**
  - Thêm icon hình ảnh và link `/admin/hinh-anh`.

- [ ] **Step 2: Xây dựng trang `/admin/hinh-anh/page.tsx`**
  - Sử dụng layout admin với `AdminSidebar`.
  - Header: Thống kê tổng số ảnh và dung lượng tổng cộng.
  - Khu vực Upload / Dropzone kéo thả tải nhiều ảnh lên cùng lúc.
  - Lưới hiển thị ảnh (Gallery Grid):
    - Thumbnail ảnh WebP.
    - Tên ảnh, dung lượng (KB/MB), thời gian tạo.
    - Nút 1-click "Sao chép liên kết" (Copy URL) kèm thông báo sao chép thành công.
    - Nút "Xem ảnh phóng to" (Modal preview).
    - Nút "Xóa ảnh" với hộp thoại xác nhận.

---

### Task 4: Nâng cấp `ImageUploader.tsx` tích hợp chọn từ kho

**Files:**
- Modify: `components/admin/ImageUploader.tsx`

- [ ] **Step 1: Thêm nút "Chọn từ kho ảnh" vào `ImageUploader.tsx`**
  - Nút bấm phụ bên dưới khung upload hoặc trong trạng thái chưa có ảnh.
  - Khi click -> mở `MediaLibraryModal`.
  - Khi người dùng chọn 1 ảnh -> gọi `onChange(url)` và đóng modal.

---

### Task 5: Kiểm Thử Xác Minh Toàn Diện

- [ ] **Step 1: Kiểm thử upload ảnh JPG/PNG mẫu qua API**
  - Xác nhận file chuyển thành `.webp`, dung lượng giảm, kích thước $\le 1920$px.
- [ ] **Step 2: Kiểm thử trang `/admin/hinh-anh`**
  - Kiểm tra hiển thị danh sách ảnh, chức năng tìm kiếm, copy URL, xóa file.
- [ ] **Step 3: Kiểm thử tích hợp `ImageUploader`**
  - Thử mở form Sản phẩm/Banner, chọn ảnh từ kho ảnh và lưu.
- [ ] **Step 4: Kiểm tra build TypeScript (`next build` / `npm run build`)**
