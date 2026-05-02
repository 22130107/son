# Hướng Dẫn Cập Nhật Danh Mục Sản Phẩm

## Tổng Quan
Thay đổi danh mục sản phẩm từ các loại sơn thành các thương hiệu:

### Danh mục CŨ:
- Sơn nước
- Sơn cao cấp
- Sơn ngoại thất
- Sơn nội thất
- Sơn chống thấm
- Sơn nước cao cấp

### Danh mục MỚI:
- **Dulux** - Thương hiệu sơn cao cấp từ Anh Quốc
- **Nasun** - Thương hiệu sơn Việt Nam
- **Jotun** - Thương hiệu sơn từ Na Uy
- **Kova** - Thương hiệu sơn Việt Nam
- **Nippon** - Thương hiệu sơn từ Nhật Bản
- **Việt Mỹ** - Thương hiệu sơn Việt Nam

## Các File Đã Cập Nhật

### 1. Database Schema
- ✅ `database/schema.sql` - Cập nhật default category và dữ liệu mẫu
- ✅ `database/schema_reset.sql` - Cập nhật default category
- ✅ `database/update_categories.sql` - Script migration cho database hiện tại

### 2. Backend Code
- ✅ `lib/queries/products.ts` - Cập nhật default category khi tạo sản phẩm mới

### 3. Frontend Components
- ✅ `components/Sidebar.tsx` - Lấy danh mục động từ database (không cần sửa)
- ✅ `app/san-pham/page.tsx` - Hiển thị danh mục động (không cần sửa)
- ✅ `components/Header.tsx` - Dropdown sản phẩm động (không cần sửa)

## Cách Thực Hiện Migration

### Bước 1: Backup Database
```bash
# Backup database trước khi thực hiện migration
mysqldump -u your_username -p your_database > backup_before_migration.sql
```

### Bước 2: Chạy Script Migration
```bash
# Kết nối vào MySQL
mysql -u your_username -p your_database

# Chạy script migration
source database/update_categories.sql
```

### Bước 3: Kiểm Tra Kết Quả
Sau khi chạy script, kiểm tra:
```sql
-- Xem danh mục mới
SELECT DISTINCT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY category;

-- Xem tất cả sản phẩm
SELECT id, name, category, price 
FROM products 
ORDER BY category, name;
```

### Bước 4: Cập Nhật Sản Phẩm Thủ Công (Nếu Cần)
Nếu bạn muốn phân loại sản phẩm theo cách khác, có thể cập nhật thủ công:

```sql
-- Ví dụ: Chuyển sản phẩm có id=1 sang danh mục Dulux
UPDATE products SET category = 'Dulux' WHERE id = 1;

-- Hoặc cập nhật theo tên sản phẩm
UPDATE products SET category = 'Jotun' WHERE name LIKE '%Jotun%';
UPDATE products SET category = 'Kova' WHERE name LIKE '%Kova%';
UPDATE products SET category = 'Nippon' WHERE name LIKE '%Nippon%';
UPDATE products SET category = 'Dulux' WHERE name LIKE '%Dulux%';
UPDATE products SET category = 'Nasun' WHERE name LIKE '%Nasun%';
UPDATE products SET category = 'Việt Mỹ' WHERE name LIKE '%Việt Mỹ%';
```

## Mapping Mặc Định Trong Script

Script `update_categories.sql` sử dụng mapping sau:

| Danh mục CŨ          | Danh mục MỚI |
|----------------------|--------------|
| Sơn nước             | Dulux        |
| Sơn cao cấp          | Nasun        |
| Sơn ngoại thất       | Jotun        |
| Sơn nội thất         | Kova         |
| Sơn chống thấm       | Nippon       |
| Sơn nước cao cấp     | Việt Mỹ      |

**Lưu ý:** Bạn có thể điều chỉnh mapping này trong file `database/update_categories.sql` trước khi chạy.

## Kiểm Tra Trên Website

Sau khi migration, kiểm tra các trang sau:

1. **Trang Sản Phẩm** (`/san-pham`)
   - Sidebar hiển thị danh mục mới
   - Filter theo danh mục hoạt động đúng

2. **Trang Chi Tiết Sản Phẩm** (`/san-pham/[slug]`)
   - Hiển thị đúng danh mục mới

3. **Trang Admin** (`/admin/san-pham`)
   - Form thêm/sửa sản phẩm có danh mục mới
   - Danh sách sản phẩm hiển thị đúng danh mục

## Rollback (Nếu Cần)

Nếu cần quay lại danh mục cũ:

```bash
# Restore từ backup
mysql -u your_username -p your_database < backup_before_migration.sql
```

Hoặc chạy script rollback:

```sql
-- Rollback về danh mục cũ
UPDATE products SET category = 'Sơn nước' WHERE category = 'Dulux';
UPDATE products SET category = 'Sơn cao cấp' WHERE category = 'Nasun';
UPDATE products SET category = 'Sơn ngoại thất' WHERE category = 'Jotun';
UPDATE products SET category = 'Sơn nội thất' WHERE category = 'Kova';
UPDATE products SET category = 'Sơn chống thấm' WHERE category = 'Nippon';
UPDATE products SET category = 'Sơn nước cao cấp' WHERE category = 'Việt Mỹ';
```

## Lưu Ý Quan Trọng

1. **Backup trước khi thực hiện** - Luôn backup database trước khi migration
2. **Kiểm tra môi trường** - Test trên môi trường development trước
3. **Cache** - Sau khi migration, có thể cần clear cache Next.js:
   ```bash
   npm run build
   # Hoặc restart server
   ```
4. **SEO** - Các URL sản phẩm không thay đổi, chỉ có danh mục thay đổi
5. **Đơn hàng cũ** - Các đơn hàng cũ vẫn giữ nguyên thông tin sản phẩm

## Hỗ Trợ

Nếu gặp vấn đề trong quá trình migration, vui lòng:
1. Kiểm tra log MySQL
2. Kiểm tra kết nối database trong `.env.local`
3. Restore từ backup và thử lại
