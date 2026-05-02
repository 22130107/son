-- ============================================================
-- Cập nhật danh mục sản phẩm thành thương hiệu
-- Thay đổi từ: Sơn nước, Sơn cao cấp, Sơn ngoại thất, Sơn nội thất
-- Thành: Dulux, Nasun, Jotun, Kova, Nippon, Việt Mỹ, Esse
-- ============================================================

-- ============================================================
-- PHẦN 1: INSERT SẢN PHẨM MẪU THEO DANH MỤC
-- ============================================================

-- Danh mục: Dulux
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-dulux-inspire-noi-that', 'Sơn Dulux Inspire Nội Thất', 'Dulux', 'Liên hệ', 'Sơn nội thất cao cấp Dulux Inspire với công nghệ chống bám bẩn vượt trội', 'https://via.placeholder.com/300x300?text=Dulux+Inspire', 1, 1),
('son-dulux-weathershield-ngoai-that', 'Sơn Dulux WeatherShield Ngoại Thất', 'Dulux', 'Liên hệ', 'Sơn ngoại thất Dulux WeatherShield bảo vệ tối ưu trước thời tiết khắc nghiệt', 'https://via.placeholder.com/300x300?text=Dulux+WeatherShield', 1, 2),
('son-dulux-easy-clean', 'Sơn Dulux Easy Clean', 'Dulux', 'Liên hệ', 'Sơn nội thất Dulux dễ lau chùi, thích hợp cho gia đình có trẻ nhỏ', 'https://via.placeholder.com/300x300?text=Dulux+Easy+Clean', 1, 3);

-- Danh mục: Jotun
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-jotun-essence', 'Sơn Jotun Essence', 'Jotun', 'Liên hệ', 'Sơn nội thất cao cấp Jotun Essence với khả năng che phủ tuyệt vời', 'https://via.placeholder.com/300x300?text=Jotun+Essence', 1, 4),
('son-jotun-majestic', 'Sơn Jotun Majestic', 'Jotun', 'Liên hệ', 'Sơn nội thất Jotun Majestic bền màu, chống bám bẩn', 'https://via.placeholder.com/300x300?text=Jotun+Majestic', 1, 5),
('son-jotun-fenomastic', 'Sơn Jotun Fenomastic', 'Jotun', 'Liên hệ', 'Sơn ngoại thất Jotun Fenomastic chống thấm, chống rêu mốc', 'https://via.placeholder.com/300x300?text=Jotun+Fenomastic', 1, 6);

-- Danh mục: Kova
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-kova-premium', 'Sơn Kova Premium', 'Kova', 'Liên hệ', 'Sơn nội thất Kova Premium chất lượng cao, giá cả hợp lý', 'https://via.placeholder.com/300x300?text=Kova+Premium', 1, 7),
('son-kova-super-white', 'Sơn Kova Super White', 'Kova', 'Liên hệ', 'Sơn trắng Kova độ trắng cao, che phủ tốt', 'https://via.placeholder.com/300x300?text=Kova+Super+White', 1, 8),
('son-kova-ngoai-that', 'Sơn Kova Ngoại Thất', 'Kova', 'Liên hệ', 'Sơn ngoại thất Kova bền màu, chống thấm hiệu quả', 'https://via.placeholder.com/300x300?text=Kova+Ngoai+That', 1, 9);

-- Danh mục: Nippon
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-nippon-odour-less', 'Sơn Nippon Odour-less', 'Nippon', 'Liên hệ', 'Sơn nội thất Nippon không mùi, thân thiện môi trường', 'https://via.placeholder.com/300x300?text=Nippon+Odourless', 1, 10),
('son-nippon-weatherbond', 'Sơn Nippon WeatherBond', 'Nippon', 'Liên hệ', 'Sơn ngoại thất Nippon chống thấm, chống nứt vỡ', 'https://via.placeholder.com/300x300?text=Nippon+WeatherBond', 1, 11),
('son-nippon-matex', 'Sơn Nippon Matex', 'Nippon', 'Liên hệ', 'Sơn nội thất Nippon bề mặt mịn, màu sắc đa dạng', 'https://via.placeholder.com/300x300?text=Nippon+Matex', 1, 12);

-- Danh mục: Nasun
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-nasun-noi-that-cao-cap', 'Sơn NaSun Nội Thất Cao Cấp', 'Nasun', 'Liên hệ', 'Sơn nội thất NaSun chất lượng cao, giá tốt nhất thị trường', 'https://via.placeholder.com/300x300?text=Nasun+Noi+That', 1, 13),
('son-nasun-ngoai-that', 'Sơn NaSun Ngoại Thất', 'Nasun', 'Liên hệ', 'Sơn ngoại thất NaSun bền màu, chống thấm tốt', 'https://via.placeholder.com/300x300?text=Nasun+Ngoai+That', 1, 14),
('son-nasun-chong-tham', 'Sơn NaSun Chống Thấm', 'Nasun', 'Liên hệ', 'Sơn chống thấm NaSun hiệu quả cao, bảo vệ công trình lâu dài', 'https://via.placeholder.com/300x300?text=Nasun+Chong+Tham', 1, 15);

-- Danh mục: Việt Mỹ
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-viet-my-noi-that', 'Sơn Việt Mỹ Nội Thất', 'Việt Mỹ', 'Liên hệ', 'Sơn nội thất Việt Mỹ chất lượng tốt, giá cả phải chăng', 'https://via.placeholder.com/300x300?text=Viet+My+Noi+That', 1, 16),
('son-viet-my-ngoai-that', 'Sơn Việt Mỹ Ngoại Thất', 'Việt Mỹ', 'Liên hệ', 'Sơn ngoại thất Việt Mỹ bền màu, chống thấm', 'https://via.placeholder.com/300x300?text=Viet+My+Ngoai+That', 1, 17);

-- Danh mục: Esse
INSERT INTO products (slug, name, category, price, description, thumbnail, in_stock, sort_order) VALUES
('son-esse-premium', 'Sơn Esse Premium', 'Esse', 'Liên hệ', 'Sơn nội thất Esse cao cấp, màu sắc đẹp', 'https://via.placeholder.com/300x300?text=Esse+Premium', 1, 18),
('son-esse-ngoai-that', 'Sơn Esse Ngoại Thất', 'Esse', 'Liên hệ', 'Sơn ngoại thất Esse chống thấm, chống bám bẩn', 'https://via.placeholder.com/300x300?text=Esse+Ngoai+That', 1, 19);

-- ============================================================
-- PHẦN 2: XEM DANH MỤC HIỆN TẠI
-- ============================================================
SELECT DISTINCT category, COUNT(*) as count 
FROM products 
GROUP BY category;

-- ============================================================
-- PHẦN 3: CẬP NHẬT DANH MỤC SẢN PHẨM CŨ (NẾU CÓ)
-- ============================================================
-- Chỉ chạy phần này nếu bạn muốn chuyển đổi danh mục cũ sang mới

-- Cập nhật danh mục sản phẩm
-- Bạn có thể điều chỉnh mapping theo ý muốn

-- Cập nhật tất cả sản phẩm "Sơn nước" thành "Dulux"
UPDATE products 
SET category = 'Dulux' 
WHERE category = 'Sơn nước';

-- Cập nhật tất cả sản phẩm "Sơn cao cấp" thành "Nasun"
UPDATE products 
SET category = 'Nasun' 
WHERE category = 'Sơn cao cấp';

-- Cập nhật tất cả sản phẩm "Sơn ngoại thất" thành "Jotun"
UPDATE products 
SET category = 'Jotun' 
WHERE category = 'Sơn ngoại thất';

-- Cập nhật tất cả sản phẩm "Sơn nội thất" thành "Kova"
UPDATE products 
SET category = 'Kova' 
WHERE category = 'Sơn nội thất';

-- Cập nhật tất cả sản phẩm "Sơn chống thấm" thành "Nippon"
UPDATE products 
SET category = 'Nippon' 
WHERE category = 'Sơn chống thấm';

-- Cập nhật tất cả sản phẩm "Sơn nước cao cấp" thành "Việt Mỹ"
UPDATE products 
SET category = 'Việt Mỹ' 
WHERE category = 'Sơn nước cao cấp';

-- Kiểm tra kết quả sau khi cập nhật
SELECT DISTINCT category, COUNT(*) as count 
FROM products 
GROUP BY category 
ORDER BY category;

-- Hiển thị tất cả sản phẩm với danh mục mới
SELECT id, name, category, price 
FROM products 
ORDER BY category, name;
