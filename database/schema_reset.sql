-- ============================================================
--  NaSun Paint – MySQL Database Reset Script
--  Chạy file này để xóa sạch và tạo lại toàn bộ database
--  Charset: utf8mb4 (hỗ trợ tiếng Việt + emoji)
-- ============================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS product_specs;
DROP TABLE IF EXISTS product_images;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS news;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS sliders;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- 1. PRODUCTS (Sản phẩm)
-- ============================================================
CREATE TABLE products (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  slug        VARCHAR(255)    NOT NULL UNIQUE,
  name        VARCHAR(255)    NOT NULL,
  category    VARCHAR(100)    NOT NULL DEFAULT 'Dulux',
  price       VARCHAR(100)    NOT NULL DEFAULT 'Liên hệ',
  description TEXT,
  thumbnail   VARCHAR(500)    NOT NULL,
  in_stock    TINYINT(1)      NOT NULL DEFAULT 1,
  sort_order  SMALLINT        NOT NULL DEFAULT 0,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_slug      (slug),
  INDEX idx_category  (category),
  INDEX idx_in_stock  (in_stock),
  INDEX idx_sort      (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_images (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  product_id  INT UNSIGNED    NOT NULL,
  url         VARCHAR(500)    NOT NULL,
  alt_text    VARCHAR(255),
  sort_order  SMALLINT        NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX idx_product (product_id),
  CONSTRAINT fk_pi_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product_specs (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  product_id  INT UNSIGNED    NOT NULL,
  spec_key    VARCHAR(100)    NOT NULL,
  spec_value  VARCHAR(255)    NOT NULL,
  sort_order  SMALLINT        NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  INDEX idx_product (product_id),
  CONSTRAINT fk_ps_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 2. PROJECTS (Công trình)
-- ============================================================
CREATE TABLE projects (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  slug        VARCHAR(255)    NOT NULL UNIQUE,
  title       VARCHAR(255)    NOT NULL,
  category    ENUM(
                'chung-cu',
                'biet-thu',
                'nha-pho',
                'phong-bep',
                'phong-ngu',
                'phong-tre-em'
              )               NOT NULL DEFAULT 'chung-cu',
  image       VARCHAR(500)    NOT NULL,
  description TEXT,
  sort_order  SMALLINT        NOT NULL DEFAULT 0,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_slug     (slug),
  INDEX idx_category (category),
  INDEX idx_sort     (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 3. SERVICES (Dịch vụ)
-- ============================================================
CREATE TABLE services (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  slug        VARCHAR(255)    NOT NULL UNIQUE,
  title       VARCHAR(255)    NOT NULL,
  description TEXT            NOT NULL,
  details     LONGTEXT,
  image       VARCHAR(500)    NOT NULL,
  sort_order  SMALLINT        NOT NULL DEFAULT 0,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_slug (slug),
  INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 4. NEWS (Tin tức / Bài viết)
-- ============================================================
CREATE TABLE news (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  slug         VARCHAR(255)   NOT NULL UNIQUE,
  title        VARCHAR(500)   NOT NULL,
  excerpt      TEXT,
  content      LONGTEXT       NOT NULL,
  image        VARCHAR(500)   NOT NULL,
  category     VARCHAR(100)   NOT NULL DEFAULT 'Tin tức',
  published_at DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  is_published TINYINT(1)     NOT NULL DEFAULT 1,
  views        INT UNSIGNED   NOT NULL DEFAULT 0,
  created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_slug        (slug),
  INDEX idx_category    (category),
  INDEX idx_published   (is_published, published_at),
  FULLTEXT idx_search   (title, excerpt, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 5. ORDERS (Đơn đặt hàng / Yêu cầu báo giá)
-- ============================================================
CREATE TABLE orders (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  order_code   VARCHAR(20)    NOT NULL UNIQUE,
  gender       ENUM('anh','chi') NOT NULL DEFAULT 'anh',
  customer_name VARCHAR(255)  NOT NULL,
  phone        VARCHAR(20)    NOT NULL,
  email        VARCHAR(255),
  address      VARCHAR(500),
  note         TEXT,
  total_items  SMALLINT       NOT NULL DEFAULT 0,
  status       ENUM(
                 'pending',
                 'confirmed',
                 'processing',
                 'completed',
                 'cancelled'
               )              NOT NULL DEFAULT 'pending',
  source       ENUM('website','phone','zalo','facebook') NOT NULL DEFAULT 'website',
  created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_order_code (order_code),
  INDEX idx_phone      (phone),
  INDEX idx_status     (status),
  INDEX idx_created    (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_items (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  order_id    INT UNSIGNED    NOT NULL,
  product_id  INT UNSIGNED,
  product_name VARCHAR(255)   NOT NULL,
  product_slug VARCHAR(255),
  quantity    SMALLINT        NOT NULL DEFAULT 1,
  price_note  VARCHAR(100)    NOT NULL DEFAULT 'Liên hệ',
  PRIMARY KEY (id),
  INDEX idx_order   (order_id),
  INDEX idx_product (product_id),
  CONSTRAINT fk_oi_order
    FOREIGN KEY (order_id) REFERENCES orders(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_oi_product
    FOREIGN KEY (product_id) REFERENCES products(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 6. CONTACT MESSAGES (Liên hệ)
-- ============================================================
CREATE TABLE contact_messages (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  name         VARCHAR(255)   NOT NULL,
  phone        VARCHAR(20)    NOT NULL,
  email        VARCHAR(255),
  message      TEXT           NOT NULL,
  is_read      TINYINT(1)     NOT NULL DEFAULT 0,
  replied_at   DATETIME,
  created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_is_read  (is_read),
  INDEX idx_created  (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 7. ADMIN USERS (Tài khoản quản trị)
-- ============================================================
CREATE TABLE admin_users (
  id           INT UNSIGNED   NOT NULL AUTO_INCREMENT,
  username     VARCHAR(100)   NOT NULL UNIQUE,
  password_hash VARCHAR(255)  NOT NULL,
  full_name    VARCHAR(255),
  email        VARCHAR(255)   UNIQUE,
  role         ENUM('superadmin','admin','editor') NOT NULL DEFAULT 'admin',
  is_active    TINYINT(1)     NOT NULL DEFAULT 1,
  last_login   DATETIME,
  created_at   DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_username (username),
  INDEX idx_role     (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 8. SETTINGS (Cấu hình website)
-- ============================================================
CREATE TABLE settings (
  setting_key   VARCHAR(100)  NOT NULL,
  setting_value TEXT,
  description   VARCHAR(255),
  updated_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- 9. SLIDERS (Banner trang chủ)
-- ============================================================
CREATE TABLE sliders (
  id          INT UNSIGNED    NOT NULL AUTO_INCREMENT,
  image       VARCHAR(500)    NOT NULL,
  alt_text    VARCHAR(255)    NOT NULL,
  link_url    VARCHAR(500),
  is_active   TINYINT(1)      NOT NULL DEFAULT 1,
  sort_order  SMALLINT        NOT NULL DEFAULT 0,
  created_at  DATETIME        NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  INDEX idx_active (is_active, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Admin mặc định (password: nasun2024 – đổi ngay sau khi deploy!)

-- Cấu hình website
INSERT INTO settings (setting_key, setting_value, description) VALUES
('site_name',        'Sơn Mặt Trời Việt NaSun',                    'Tên website'),
('site_url',         'https://sonnuocvungtau.com.vn',                'URL website'),
('company_name',     'CÔNG TY TNHH XL HOÀNG QUANG MINH',            'Tên công ty đầy đủ'),
('company_address',  '09 Phan Thanh Giản, P. Rạch Dừa, Hồ Chí Minh (TP. Vũng Tàu cũ)', 'Địa chỉ'),
('company_phone',    '0963 910 248',                                'Số điện thoại chính'),
('company_phone2',   '0973 507 903',                                'Số hỗ trợ kỹ thuật'),
('company_email',    'info@example.com',                            'Email liên hệ'),
('facebook_url',     'https://facebook.com/',                       'Facebook'),
('zalo_url',         'https://zalo.me/',                            'Zalo'),
('google_maps_embed','',                                            'Iframe Google Maps'),
('meta_description', 'Chuyên thi công sơn nước tại Vũng Tàu',      'Meta description mặc định');

-- Slider: để trống, thêm qua trang admin

-- ============================================================
-- LƯU Ý: Database được tạo trống, chỉ có admin và settings
-- Thêm sản phẩm, dịch vụ, công trình qua trang admin
-- ============================================================



