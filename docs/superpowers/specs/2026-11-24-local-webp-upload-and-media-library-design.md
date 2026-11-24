# Thiết Kế: Upload Local, Nén WebP và Kho Quản Lý Hình Ảnh (Media Library)

- **Ngày tạo:** 2026-11-24
- **Trạng thái:** Đã phê duyệt (Approved)

---

## 1. Mục Tiêu (Goals) & Phạm Vi

### Mục tiêu chính:
1. **Chuyển đổi lưu trữ từ Cloudinary sang Local:** Toàn bộ ảnh tải lên sẽ được lưu trữ trực tiếp tại thư mục `public/uploads/` trên server.
2. **Nén và chuyển đổi sang WebP tự động:** 
   - Mọi ảnh tải lên (JPG, PNG, GIF, WebP) đều được xử lý qua thư viện `sharp`.
   - Giới hạn kích thước tối đa `width: 1920px` (giữ nguyên tỉ lệ, không phóng to ảnh nhỏ).
   - Nén sang định dạng `.webp` với chất lượng `quality: 80`.
3. **Xây dựng Kho Quản Lý Hình Ảnh (Media Library):**
   - Tạo trang `/admin/hinh-anh` và tích hợp vào sidebar của trang quản trị.
   - Quản lý danh sách ảnh: xem lưới (grid), tìm kiếm tên file, hiển thị dung lượng, ngày tạo.
   - Thao tác nhanh: tải ảnh hàng loạt, sao chép URL ảnh (1-click), xem ảnh phóng to, xóa ảnh.
4. **Tích hợp Kho ảnh vào Form nhập liệu:**
   - Cập nhật component `ImageUploader` để hỗ trợ chọn ảnh trực tiếp từ Kho ảnh bên cạnh việc upload file mới từ máy tính.

### Không thuộc phạm vi (Non-goals):
- Không xóa các ảnh Cloudinary cũ trong cơ sở dữ liệu (duy trì tương thích ngược để website hoạt động liên tục).

---

## 2. Kiến Trúc & Thiết Kế Chi Tiết

### 2.1 Backend API (`/api/upload`)

File: `app/api/upload/route.ts`

- **Yêu cầu xác thực:** `requireAuth(req)` cho tất cả các thao tác (chỉ admin có quyền).
- **Thư viện:** `sharp`

#### a. `POST /api/upload`:
- **Đầu vào:** `FormData` chứa `file` (hoặc nhiều files).
- **Quy trình xử lý:**
  1. Kiểm tra định dạng cho phép: `image/jpeg`, `image/jpg`, `image/png`, `image/webp`, `image/gif`.
  2. Giới hạn dung lượng upload ban đầu: tối đa 15MB.
  3. Đọc buffer từ `file.arrayBuffer()`.
  4. Tạo slug an toàn cho tên file (loại bỏ dấu tiếng Việt, ký tự đặc biệt) + timestamp:
     - Ví dụ: `1777602369-son-chong-tham.webp`
  5. Xử lý ảnh bằng `sharp`:
     ```typescript
     const webpBuffer = await sharp(buffer)
       .resize({ width: 1920, withoutEnlargement: true })
       .webp({ quality: 80 })
       .toBuffer();
     ```
  6. Ghi file vào `public/uploads/{fileName}`.
  7. Trả về thông tin: `{ url: `/uploads/${fileName}`, fileName, size: webpBuffer.length }`.

#### b. `GET /api/upload`:
- **Chức năng:** Lấy danh sách file trong `public/uploads/`.
- **Query params hỗ trợ:** `search` (lọc theo tên), `limit`, `page`.
- **Quy trình:**
  1. Đọc thư mục `public/uploads/` bằng `fs.readdir` (kèm thông tin `fs.stat`).
  2. Lọc các định dạng ảnh hợp lệ (`.webp`, `.jpg`, `.png`, `.gif`, `.svg`).
  3. Lấy `size`, `mtime` (thời gian sửa đổi/tạo).
  4. Sắp xếp file mới nhất lên đầu (`mtime` giảm dần).
  5. Trả về danh sách: `[{ url, fileName, size, createdAt }]`.

#### c. `DELETE /api/upload`:
- **Đầu vào:** `{ url, fileName }`
- **Xử lý an toàn:**
  - Chống Path Traversal: Trích xuất `path.basename(fileName || url)`. Nếu chứa `..` hoặc ký tự điều hướng thư mục -> báo lỗi `badRequest`.
  - Kiểm tra nếu là file trong `public/uploads/{fileName}`, thực hiện `fs.unlink`.
  - Fallback: Nếu URL là link `cloudinary.com` cũ, vẫn xóa trên Cloudinary nếu có cấu hình API key.

---

### 2.2 Giao Diện Quản Trị (Frontend)

#### a. Menu Quản trị (`components/admin/AdminSidebar.tsx`):
- Thêm mục "Kho hình ảnh" trỏ đến `/admin/hinh-anh` với icon thư viện ảnh.

#### b. Trang Kho Hình Ảnh (`app/admin/hinh-anh/page.tsx`):
- **Khu vực thống kê & công cụ:**
  - Ô tìm kiếm theo tên ảnh thời gian thực.
  - Tổng số lượng ảnh và tổng dung lượng kho ảnh.
  - Khu vực Upload / Dropzone cho phép kéo thả nhiều ảnh cùng lúc.
- **Lưới hiển thị (Gallery Grid):**
  - Hiển thị ảnh dạng thẻ vuông/chữ nhật với ảnh thumbnail.
  - Tên file, dung lượng (format KB/MB), ngày tải lên.
  - Nút "Copy URL" có phản hồi trực quan (tooltip "Đã copy!").
  - Nút xem ảnh kích thước lớn (Modal preview).
  - Nút "Xóa" kèm hộp thoại xác nhận tránh xóa nhầm.

#### c. Modal Chọn Ảnh (`components/admin/MediaLibraryModal.tsx`):
- Component Modal độc lập có thể tái sử dụng:
  - Hiển thị danh sách ảnh từ `/api/upload`.
  - Tích hợp tìm kiếm và upload ảnh mới ngay trong modal.
  - Click chọn ảnh và bấm "Xác nhận chọn" -> truyền URL về component gọi.

#### d. Nâng cấp `ImageUploader.tsx`:
- Bổ sung nút bấm "Chọn từ kho ảnh" (Icon thư viện ảnh).
- Khi bấm -> Mở `MediaLibraryModal`. Khi người dùng chọn ảnh -> Gọi `onChange(selectedUrl)`.

---

## 3. Kế Hoạch Kiểm Thử (Verification)

1. **Cài đặt thư viện:** Cài `sharp` thành công trên môi trường Windows Node.js.
2. **Kiểm thử Upload & Nén WebP:**
   - Upload 1 file ảnh PNG lớn (> 2MB, width > 2000px).
   - Xác nhận file kết quả lưu tại `public/uploads/*.webp`.
   - Xác nhận định dạng file thực tế là WebP và chiều rộng $\le 1920$px, dung lượng giảm đáng kể.
3. **Kiểm thử API GET danh sách:**
   - Gọi `GET /api/upload` nhận đầy đủ danh sách ảnh, dung lượng và thời gian.
4. **Kiểm thử Giao diện Admin Kho ảnh:**
   - Truy cập `/admin/hinh-anh`.
   - Upload ảnh từ giao diện.
   - Thử tìm kiếm theo tên.
   - Thử copy URL và dán kiểm tra đường dẫn.
   - Thử xóa 1 ảnh và kiểm tra file trên đĩa đã bị xóa.
5. **Kiểm thử Tích hợp Form:**
   - Mở form Sản phẩm hoặc Banner, bấm "Chọn từ kho ảnh", chọn 1 ảnh và lưu thành công.
