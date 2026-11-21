# Thiết kế: Chuyển đổi khối ảnh thông tin Header sang HTML/CSS văn bản (Responsive cả Desktop & Mobile)

**Ngày tạo:** 2026-11-21  
**Cập nhật:** 2026-11-21 (Bổ sung hiển thị linh hoạt trên Mobile theo yêu cầu người dùng)  
**Mục tiêu:** Thay thế hình ảnh bitmap `download.jpg` bên cạnh logo trên thanh Header bằng văn bản HTML/CSS chuẩn nhằm tối ưu tốc độ tải trang, tăng độ sắc nét trên mọi màn hình và đồng bộ hoàn toàn màu nền với Header (`#1a3a8f`) trên cả máy tính và điện thoại.

---

## 1. Hiện trạng & Vấn đề

- Vị trí: `components/Header.tsx`, trong khối logo (dòng 163–185).
- Hiện tại sử dụng thẻ `<img>` trỏ đến `/uploads/download.jpg` với thuộc tính `max-h-[70px]` và bị ẩn trên mobile (`hidden md:block`).
- Vấn đề:
  - Tệp ảnh raster có màu nền xanh không trùng khớp 100% với màu nền Header (`BLUE = #1a3a8f`), tạo thành một khối chữ nhật bị lệch màu và có viền khác biệt.
  - Ảnh bitmap có thể bị mờ trên màn hình Retina / độ phân giải cao.
  - Tốn thêm request tải hình ảnh và không tối ưu cho SEO văn bản thương hiệu.
  - Trên điện thoại trước đây bị ẩn hoàn toàn, làm mất thông tin tên thương hiệu dạng chữ.

---

## 2. Yêu cầu thiết kế chi tiết

### 2.1. Cấu trúc liên kết & Khối bao ngoài
- Gộp Logo tròn (`LOGO_URL = "/logo.png"`) và Cụm chữ thương hiệu vào chung một thẻ `<Link href="/" className="flex items-center gap-2 sm:gap-2.5 md:gap-3 select-none group">`.
- Điều chỉnh lề ngoài trên container: bỏ `ml-8` cố định trên mobile, thay bằng `ml-0 md:ml-8` để tối ưu không gian hiển thị trên màn hình nhỏ.
- Kích thước Logo tròn: `h-[50px] w-[50px] sm:h-[58px] sm:w-[58px] md:h-[68px] md:w-[68px] object-contain rounded-full flex-shrink-0`.
- Bỏ hoàn toàn thẻ `<img>` gọi `/uploads/download.jpg`.

### 2.2. Nội dung và Kiểu dáng khối chữ (Responsive Typography)
Khối chữ gồm 3 dòng và 1 đường kẻ phân cách, được bọc trong container `div` có lớp `flex flex-col justify-center leading-tight min-w-0`:

1. **Dòng 1 - Lĩnh vực hoạt động:**
   - Nội dung: `SƠN NƯỚC`
   - Kiểu dáng: Chữ in hoa (uppercase), font-sans (Roboto), màu trắng (`text-white`), cỡ chữ `text-[10px] sm:text-[11px] md:text-[13px]`, độ dày `font-bold`, khoảng cách chữ `tracking-wider`.
2. **Dòng 2 - Tên thương hiệu chính:**
   - Nội dung: `HOÀNG QUANG MINH`
   - Kiểu dáng: Chữ in hoa (uppercase), font-sans (Roboto), màu vàng thương hiệu `GOLD` (`#e8b800`), cỡ chữ `text-[14px] sm:text-[16px] md:text-[20px]`, độ dày cực đậm `font-black`, khoảng cách chữ `tracking-wide whitespace-nowrap`.
3. **Đường phân cách (Divider):**
   - Thẻ `div` ngang: `h-[1px] w-full bg-white/35 my-[1px] md:my-[2px]`.
4. **Dòng 3 - Slogan:**
   - Nội dung: `UY TÍN – CHẤT LƯỢNG – BỀN VỮNG`
   - Kiểu dáng: Chữ in hoa (uppercase), font-sans (Roboto), màu trắng/ánh sáng (`text-white/95`), cỡ chữ `text-[8px] sm:text-[9px] md:text-[10.5px]`, độ dày `font-bold`, khoảng cách chữ `tracking-wider whitespace-nowrap`.

### 2.3. Màu nền & Tối ưu hiển thị (Background & Optimization)
- Background của khối chữ: hoàn toàn trong suốt (`bg-transparent`), lấy trực tiếp màu nền của thanh Header (`#1a3a8f`).
- Loại bỏ hoàn toàn sự lệch màu của ảnh cũ trên cả desktop và mobile.
- Nhấp chuột/chạm vào bất kỳ vị trí nào của logo hoặc tên thương hiệu đều dẫn về trang chủ `/`.

### 2.4. Responsive Breakdown
- **Desktop (md trở lên, ≥ 768px):** Cỡ chữ chuẩn lớn, logo 68px, căn đối hoàn hảo trong Header 90px.
- **Mobile (< 768px):** Logo 50px-58px, chữ thu gọn tỷ lệ tương ứng (`text-[10px] / text-[14px] / text-[8px]`), không bị tràn dòng, khoảng cách lề được tối ưu để vừa vặn bên cạnh nút hamburger menu.

---

## 3. Kế hoạch kiểm thử & Tiêu chí nghiệm thu

1. **Giao diện Desktop (≥ 768px):**
   - Logo và chữ hiển thị thẳng hàng, cân đối theo chiều dọc với chiều cao Header 90px.
   - Màu chữ vàng `#e8b800` và trắng nổi bật, sắc nét, không có viền hộp hay sai lệch màu nền.
   - Click vào bất kỳ vị trí nào của logo hoặc chữ đều điều hướng về trang chủ `/`.
2. **Giao diện Mobile (< 768px):**
   - Trên các kích thước màn hình điện thoại (từ 360px đến 430px), logo và cụm chữ 3 dòng hiển thị đầy đủ, không bị vỡ bố cục, không đè lên nút hamburger menu.
3. **Hiệu năng & Build:**
   - Chạy lệnh `npm run build` hoặc TypeScript check để đảm bảo không có lỗi cú pháp hoặc runtime error.
