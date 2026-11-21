# Thiết kế: Chuyển đổi khối ảnh thông tin Header sang HTML/CSS văn bản

**Ngày tạo:** 2026-11-21  
**Mục tiêu:** Thay thế hình ảnh bitmap `download.jpg` bên cạnh logo trên thanh Header bằng văn bản HTML/CSS chuẩn nhằm tối ưu tốc độ tải trang, tăng độ sắc nét trên mọi màn hình và đồng bộ hoàn toàn màu nền với Header (`#1a3a8f`).

---

## 1. Hiện trạng & Vấn đề

- Vị trí: `components/Header.tsx`, trong khối logo (dòng 163–185).
- Hiện tại sử dụng thẻ `<img>` trỏ đến `/uploads/download.jpg` với thuộc tính `max-h-[70px]`.
- Vấn đề:
  - Tệp ảnh raster có màu nền xanh không trùng khớp 100% với màu nền Header (`BLUE = #1a3a8f`), tạo thành một khối chữ nhật bị lệch màu và có viền khác biệt.
  - Ảnh bitmap có thể bị mờ trên màn hình Retina / độ phân giải cao.
  - Tốn thêm request tải hình ảnh và không tối ưu cho SEO văn bản thương hiệu.

---

## 2. Yêu cầu thiết kế chi tiết

### 2.1. Cấu trúc liên kết & Khối bao ngoài
- Gộp Logo tròn (`LOGO_URL = "/logo.png"`) và Cụm chữ thương hiệu vào chung một thẻ `<Link href="/" className="flex items-center gap-3 select-none group">`.
- Toàn bộ cụm đóng vai trò là nhận diện thương hiệu dẫn về trang chủ (`/`).
- Bỏ thẻ `<img>` gọi `/uploads/download.jpg`.

### 2.2. Nội dung và Kiểu dáng khối chữ (Typography & Styling)
Khối chữ gồm 3 dòng và 1 đường kẻ phân cách, được bọc trong một container `div` có lớp `hidden md:flex flex-col justify-center leading-tight`:

1. **Dòng 1 - Lĩnh vực hoạt động:**
   - Nội dung: `SƠN NƯỚC`
   - Kiểu dáng: Chữ in hoa (uppercase), font-sans (Roboto), màu trắng (`text-white`), cỡ chữ `text-[13px]`, độ dày `font-bold`, khoảng cách chữ `tracking-wider`.
2. **Dòng 2 - Tên thương hiệu chính:**
   - Nội dung: `HOÀNG QUANG MINH`
   - Kiểu dáng: Chữ in hoa (uppercase), font-sans (Roboto), màu vàng thương hiệu `GOLD` (`#e8b800`), cỡ chữ `text-[20px]`, độ dày cực đậm `font-black`, khoảng cách chữ `tracking-wide`.
3. **Đường phân cách (Divider):**
   - Thẻ `div` ngang: `h-[1px] w-full bg-white/35 my-[2px]`.
4. **Dòng 3 - Slogan:**
   - Nội dung: `UY TÍN – CHẤT LƯỢNG – BỀN VỮNG`
   - Kiểu dáng: Chữ in hoa (uppercase), font-sans (Roboto), màu trắng/ánh sáng (`text-white/95`), cỡ chữ `text-[10.5px]`, độ dày `font-bold`, khoảng cách chữ `tracking-widest`.

### 2.3. Màu nền & Tối ưu hiển thị (Background & Optimization)
- Background của khối chữ: hoàn toàn trong suốt (`bg-transparent`), lấy trực tiếp màu nền của thanh Header (`#1a3a8f`).
- Loại bỏ hoàn toàn sự lệch màu của ảnh cũ.

### 2.4. Responsive
- **Desktop (md trở lên, ≥ 768px):** Hiển thị đầy đủ Logo tròn (70px) + Cụm chữ thương hiệu 3 dòng bên phải.
- **Mobile (< 768px):** Áp dụng `hidden md:flex` cho cụm chữ. Chỉ hiển thị Logo tròn trên thanh header để tiết kiệm diện tích cho nút menu và giữ giao diện tinh gọn, đúng theo yêu cầu đã thống nhất.

---

## 3. Kế hoạch kiểm thử & Tiêu chí nghiệm thu

1. **Giao diện Desktop:**
   - Logo và chữ hiển thị thẳng hàng, cân đối theo chiều dọc với chiều cao Header 90px.
   - Màu chữ vàng `#e8b800` và trắng nổi bật, sắc nét, không có viền hộp hay sai lệch màu nền.
   - Click vào bất kỳ vị trí nào của logo hoặc chữ đều điều hướng về trang chủ `/`.
2. **Giao diện Mobile:**
   - Khi co màn hình dưới 768px, cụm chữ ẩn đi mượt mà, chỉ còn logo tròn và nút hamburger menu.
3. **Hiệu năng & Build:**
   - Chạy lệnh `npm run build` hoặc TypeScript check để đảm bảo không có lỗi cú pháp hoặc runtime error.
