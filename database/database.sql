-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: sontuong
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL COMMENT 'Sản phẩm liên kết',
  `distributor_id` int unsigned DEFAULT NULL COMMENT 'NPP cung cấp (nếu có)',
  `login_username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tài khoản đăng nhập game',
  `login_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Mật khẩu đăng nhập game',
  `cost_price` decimal(15,0) NOT NULL DEFAULT '0' COMMENT 'Giá vốn nhập hàng',
  `status` enum('available','sold','hidden') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Ghi chú thêm',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_accounts_product` (`product_id`) USING BTREE,
  KEY `idx_accounts_status` (`status`) USING BTREE,
  KEY `fk_accounts_distributor` (`distributor_id`) USING BTREE,
  CONSTRAINT `fk_accounts_distributor` FOREIGN KEY (`distributor_id`) REFERENCES `distributors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_accounts_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `full_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('superadmin','admin','editor') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'admin',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `last_login` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE,
  KEY `idx_username` (`username`) USING BTREE,
  KEY `idx_role` (`role`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
INSERT INTO `admin_users` VALUES (1,'admin','$2b$12$rTW4RvCCptKSCgCMK4D.VePiTbc2jLlU7jEOdm4ZSutMeGTPCM9mC','Quản trị viên',NULL,'superadmin',1,NULL,'2026-05-02 23:54:37'),(2,'admin123','$2b$12$VTcktsJjKtYvci5PvW0JFOqqZycYDXPQfifCDH7aRvDRmQwLVErOi','Huy Hoàng',NULL,'admin',1,'2026-05-23 18:52:06','2026-05-02 23:54:37');
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0',
  `fake_remaining_count` int NOT NULL DEFAULT '0',
  `fake_sold_count` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `slug` (`slug`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact_messages`
--

DROP TABLE IF EXISTS `contact_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact_messages` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `replied_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_is_read` (`is_read`) USING BTREE,
  KEY `idx_created` (`created_at`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact_messages`
--

LOCK TABLES `contact_messages` WRITE;
/*!40000 ALTER TABLE `contact_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `contact_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `distributors`
--

DROP TABLE IF EXISTS `distributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `distributors` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT 'Liên kết tới user có role=npp',
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `domain` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên miền riêng của NPP',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `contact_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Thông tin liên hệ bổ sung',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `user_id` (`user_id`) USING BTREE,
  UNIQUE KEY `domain` (`domain`) USING BTREE,
  KEY `idx_distributors_domain` (`domain`) USING BTREE,
  CONSTRAINT `fk_distributors_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `distributors`
--

LOCK TABLES `distributors` WRITE;
/*!40000 ALTER TABLE `distributors` DISABLE KEYS */;
/*!40000 ALTER TABLE `distributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `news` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Tin tức',
  `published_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_published` tinyint(1) NOT NULL DEFAULT '1',
  `views` int unsigned NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `slug` (`slug`) USING BTREE,
  KEY `idx_slug` (`slug`) USING BTREE,
  KEY `idx_category` (`category`) USING BTREE,
  KEY `idx_published` (`is_published`,`published_at`) USING BTREE,
  FULLTEXT KEY `idx_search` (`title`,`excerpt`,`content`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (2,'son-nuoc-la-gi-thanh-phan-uu-diem-cach-chon-son-nuoc-vung-tau','Sơn Nước Là Gì? Thành Phần, Ưu Điểm & Cách Chọn Sơn Nước Tại Vũng Tàu','<h3>Bạn đang tìm hiểu sơn nước Vũng Tàu để sơn nhà, chống thấm hay làm mới công trình? Hiểu rõ sơn nước là gì, thành phần và cách chọn sơn phù hợp sẽ giúp bạn tiết kiệm chi phí và tăng độ bền cho ngôi nhà.</h3><p></p>','<p><strong>Sơn Nước Là Gì? Thành Phần, Ưu Điểm &amp; Cách Chọn Sơn Nước Tại Vũng Tàu</strong></p><p>📅 05/01/2026 | 🏠 Mẹo sơn nhà</p><p>Bạn đang tìm hiểu <strong>sơn nước Vũng Tàu</strong> để sơn nhà, chống thấm hay làm mới công trình?<br>Hiểu rõ <strong>sơn nước là gì, thành phần và cách chọn sơn phù hợp</strong> sẽ giúp bạn tiết kiệm chi phí và tăng độ bền cho ngôi nhà.</p><hr><h2>🧱 <strong>1. Sơn nước là gì?</strong></h2><p>Sơn nước (hay còn gọi là sơn gốc nước) là loại sơn sử dụng <strong>nước làm dung môi chính</strong>, giúp tạo lớp màng bám dính chắc chắn trên bề mặt tường.</p><p>👉 Đây là dòng <strong>sơn nhà phổ biến tại Vũng Tàu</strong>, phù hợp khí hậu nóng ẩm, gió biển.</p><p>📌 <strong>Ứng dụng:</strong></p><ul><li><p>🏠 Sơn tường nội thất, ngoại thất</p></li><li><p>🌤️ Trần nhà, ban công</p></li><li><p>🏢 Nhà phố, biệt thự, công trình</p></li></ul><hr><h2>🧪 <strong>2. Thành phần cấu tạo của sơn nước</strong></h2><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777799898/nasun-paint/qye2m09wkilgq2ngkpuz.png\"><h3>🔗 <strong>2.1 Chất tạo màng (Acrylic/Vinyl)</strong></h3><p>✔️ Quyết định độ bền, độ bám dính<br>✔️ Tăng khả năng chống thấm, chống bong tróc</p><h3>🪨 <strong>2.2 Bột độn</strong></h3><p>✔️ Tăng độ mịn, độ cứng<br>✔️ Giúp bề mặt đẹp hơn</p><h3>🎨 <strong>2.3 Chất tạo màu</strong></h3><p>✔️ Màu sắc đa dạng<br>✔️ Chống tia UV, bền màu</p><h3>💧 <strong>2.4 Dung môi (nước)</strong></h3><p>✔️ Dễ thi công<br>✔️ Phân tán đều</p><h3>⚗️ <strong>2.5 Phụ gia</strong></h3><p>✔️ Chống rêu mốc<br>✔️ Tăng độ bền trong khí hậu Vũng Tàu</p><hr><h2>⭐ <strong>3. Ưu điểm của sơn nước</strong></h2><h3>🛡️ <strong>3.1 An toàn sức khỏe</strong></h3><p>✔️ VOC thấp, ít mùi<br>✔️ Phù hợp nhà có trẻ nhỏ</p><h3>💦 <strong>3.2 Chống thấm – chống ẩm</strong></h3><p>✔️ Bảo vệ tường khỏi nước<br>✔️ Phù hợp nhà gần biển</p><h3>🧽 <strong>3.3 Dễ lau chùi</strong></h3><p>✔️ Bề mặt mịn<br>✔️ Vệ sinh nhanh</p><h3>🌈 <strong>3.4 Bền màu – đẹp lâu</strong></h3><p>✔️ Không phai màu<br>✔️ Chịu nắng tốt</p><h3>💰 <strong>3.5 Tiết kiệm chi phí</strong></h3><p>✔️ Độ che phủ cao<br>✔️ Thi công nhanh</p><hr><h2>🧩 <strong>4. Phân loại sơn nước</strong></h2><h3>🔧 <strong>4.1 Theo chức năng</strong></h3><h4>🧱 Sơn lót</h4><p>✔️ Tăng bám dính<br>✔️ Chống kiềm, chống ẩm</p><h4>🎨 Sơn phủ</h4><p>✔️ Tạo màu hoàn thiện<br>✔️ Chống bám bẩn</p><hr><h3>🏠 <strong>4.2 Theo vị trí</strong></h3><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777799963/nasun-paint/ypczynufkqdahqz378p1.png\"><h4>🛋️ Sơn nội thất</h4><p>✔️ An toàn, dễ lau<br>✔️ Dùng trong nhà</p><h4>🌦️ Sơn ngoại thất</h4><p>✔️ Chống nắng mưa<br>✔️ Bền với thời tiết</p><h4>💧 Sơn chống thấm</h4><p>✔️ Ngăn nước thấm<br>✔️ Dùng cho mái, WC, ban công</p><p>👉 Đây là các dòng <strong>sơn chống thấm Vũng Tàu</strong> rất được ưa chuộng.</p><hr><h2>🎯 <strong>5. Cách chọn sơn nước phù hợp</strong></h2><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777800001/nasun-paint/hlorhuavh9sngfefyc9z.png\"><h3>📌 <strong>5.1 Xác định nhu cầu</strong></h3><ul><li><p>🏠 Nội thất → mịn đẹp</p></li><li><p>🌤️ Ngoại thất → bền, chống thấm</p></li></ul><h3>🧱 <strong>5.2 Xem bề mặt</strong></h3><ul><li><p>Tường mới / cũ</p></li><li><p>Xi măng / bê tông</p></li></ul><h3>🌊 <strong>5.3 Xét môi trường</strong></h3><ul><li><p>Ven biển → chống rêu mốc</p></li><li><p>Nắng nhiều → chống UV</p></li></ul><h3>🎨 <strong>5.4 Chọn màu</strong></h3><ul><li><p>Theo phong cách</p></li><li><p>Theo phong thủy</p></li></ul><h3>💵 <strong>5.5 Ngân sách</strong></h3><ul><li><p>Chọn đúng nhu cầu</p></li><li><p>Không cần quá đắt</p></li></ul><hr><h2>📍 <strong>6. Mua sơn nước uy tín tại Vũng Tàu</strong></h2><p>Nếu bạn cần <strong>đại lý sơn nước Vũng Tàu uy tín</strong>, hãy chọn nơi:</p><p>✔️ Hàng chính hãng<br>✔️ Tư vấn chuẩn<br>✔️ Có thi công<br>✔️ Giao nhanh</p><p>👉 <strong>Sơn Nước Hoàng Quang Minh</strong><br>📍 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 0963.910.248 - 0973.507.903<br>🚚 Giao nhanh trong ngày</p><hr><h2>❓ <strong>7. Giải đáp nhanh</strong></h2><h3>⏳ Sơn nước để được bao lâu?</h3><p>✔️ Chưa mở: 3–5 năm<br>✔️ Đã mở: 6–12 tháng</p><h3>🧽 Sơn nước có dễ lau không?</h3><p>✔️ Có, đặc biệt dòng sơn bóng</p><h3>🧱 Sơn nước có dùng cho mọi bề mặt không?</h3><p>✔️ Có, nhưng cần xử lý bề mặt đúng cách</p><hr><h2>🔍 <strong>Từ khóa SEO</strong></h2><p>#sonnuocvungtau #sonnhavungtau #sonchongtham #sonnoithat #sonngoaithat</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777791983/nasun-paint/rmeiqpk9uym6wgegdoni.png','Kinh nghiệm','2024-04-27 21:04:00',1,115,'2026-05-03 14:08:19','2026-05-24 13:34:34'),(3,'-bat-nap-son-sang-muon-van-qua-khung-tai-vung-tau-','🎉 BẬT NẮP SƠN SANG – MUÔN VÀN QUÀ KHỦNG TẠI VŨNG TÀU 🎉','<p>Ưu đãi độc quyền khi mua sơn NASUN tại Sơn Nước Hoàng Quang Minh</p>','<p>Bạn đang tìm <strong>sơn nước chất lượng tại Vũng Tàu</strong> để sơn nhà, chống thấm hay hoàn thiện công trình? Đừng vội quyết định, vì tháng 5 này chương trình khuyến mãi cực lớn từ <strong>sơn NASUN chính hãng</strong> sẽ giúp bạn vừa có nhà đẹp, vừa nhận quà hấp dẫn!</p><hr><h3>🔥 Mua sơn NASUN – Nhận quà liền tay</h3><p>Khi mua sơn NASUN tại <strong>Sơn Nước Hoàng Quang Minh</strong>, khách hàng không chỉ sở hữu dòng sơn cao cấp mà còn có cơ hội nhận quà ngay khi bật nắp thùng sơn.</p><p>✔️ Sơn cao cấp – <strong>siêu bóng – bền màu lâu dài</strong><br>✔️ <strong>Chống rong rêu, chống thấm hiệu quả</strong>, phù hợp khí hậu biển Vũng Tàu<br>✔️ <strong>An toàn sức khỏe</strong>, thân thiện với môi trường<br>✔️ Ứng dụng đa dạng: sơn nội thất, ngoại thất, nhà phố, căn hộ, biệt thự</p><p>🎁 <strong>Đặc biệt:</strong> “Bật nắp là có quà” – cơ hội nhận nhiều phần thưởng giá trị ngay khi sử dụng sản phẩm.</p><hr><h3>📌 Thông tin chương trình khuyến mãi</h3><ul><li><p><strong>Tên chương trình:</strong> Bật nắp sơn sang – Muôn vàn quà khủng</p></li><li><p><strong>Thời gian:</strong> 01/05/2026 – 30/05/2026</p></li><li><p><strong>Áp dụng:</strong> Sản phẩm sơn NASUN chính hãng mua tại Sơn Nước Hoàng Quang Minh</p></li></ul><hr><h3>💥 Vì sao nên mua sơn tại Hoàng Quang Minh?</h3><ul><li><p>Đại lý phân phối <strong>sơn NASUN chính hãng tại Vũng Tàu</strong></p></li><li><p>Tư vấn đúng nhu cầu – tối ưu chi phí cho từng công trình</p></li><li><p>Nhận <strong>thi công sơn nhà trọn gói – chống thấm chuyên nghiệp</strong></p></li><li><p>Đội thợ tay nghề cao – thi công nhanh, sạch, đẹp</p></li><li><p>Giao hàng nhanh trong ngày – hỗ trợ tận nơi</p></li></ul><hr><h3>📍 Thông tin liên hệ</h3><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý sơn NASUN Vũng Tàu</strong><br>🏠 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 Hotline: 0963.910.248 – 0973.507.903<br>🌐 Website: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"text-blue-600 underline\" href=\"https://sonnuocvungtau.com.vn/\">https://sonnuocvungtau.com.vn/</a><br>📍 Google Maps: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"text-blue-600 underline\" href=\"https://maps.app.goo.gl/Z74BggCGXTz3msxn6\">https://maps.app.goo.gl/Z74BggCGXTz3msxn6</a></p><p>🚚 Giao nhanh trong ngày – hỗ trợ tận công trình</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777823232/nasun-paint/uxqy9ohtnhbu733uoi40.png','Khuyến mãi','2026-05-03 08:46:00',1,100,'2026-05-03 22:47:29','2026-05-21 13:32:29'),(4,'15-ngay-quoc-te-lao-dong-tran-quy-tung-cong-trinh-ton-vinh-nguoi-lao-dong','1/5 – Ngày Quốc Tế Lao Động: Trân quý từng công trình, tôn vinh người lao động','<p><strong>1/5 – Ngày Quốc tế Lao động</strong> không chỉ là dịp nghỉ ngơi, mà còn là thời điểm để nhìn lại những giá trị bền vững được tạo nên từ sự nỗ lực mỗi ngày. Đằng sau mỗi <strong>ngôi nhà đẹp, mỗi lớp sơn hoàn thiện</strong> là hàng giờ lao động tỉ mỉ, là mồ hôi và tâm huyết của những người thợ.</p>','<p>Tại <strong>Sơn Nước Hoàng Quang Minh</strong>, chúng tôi hiểu rằng:<br>✨ Một lớp sơn mịn đẹp không chỉ đến từ sản phẩm chất lượng, mà còn từ <strong>tay nghề và sự tận tâm của người thi công</strong><br>✨ Một công trình bền đẹp là sự kết hợp giữa <strong>vật tư chuẩn – kỹ thuật đúng – con người có tâm</strong></p><hr><h3>❤️ Trân trọng giá trị lao động – Nâng tầm chất lượng công trình</h3><p>Chúng tôi không chỉ cung cấp sơn, mà còn đồng hành cùng:</p><ul><li><p>Chủ nhà đang hoàn thiện tổ ấm</p></li><li><p>Nhà thầu, thợ sơn đang tạo nên từng công trình</p></li><li><p>Đối tác thi công cần giải pháp sơn tối ưu, bền vững</p></li></ul><p>👉 Mỗi sản phẩm trao đi là một phần trách nhiệm<br>👉 Mỗi công trình hoàn thiện là một niềm tự hào</p><hr><h3>🎉 Lời chúc từ Hoàng Quang Minh</h3><p>Nhân dịp <strong>Ngày Quốc tế Lao động 1/5</strong>, Sơn Nước Hoàng Quang Minh xin gửi lời chúc:<br>💪 Một kỳ nghỉ <strong>trọn vẹn – ý nghĩa – nạp đầy năng lượng</strong><br>💪 Luôn giữ vững tinh thần lao động bền bỉ – sáng tạo – phát triển</p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777823375/nasun-paint/pyl74iuo0oxihcajkqnx.jpg\"><hr><h3>📍 Sơn Nước Hoàng Quang Minh – Đại lý sơn &amp; thi công trọn gói Vũng Tàu</h3><ul><li><p>Phân phối sơn nước &amp; chống thấm chính hãng: Dulux, Nasun, Jotun, Kova</p></li><li><p>Nhận thi công sơn nhà trọn gói – nội thất &amp; ngoại thất</p></li><li><p>Tư vấn đúng nhu cầu – tối ưu chi phí</p></li></ul><p>🏠 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 Hotline: 0963.910.248<br>🚚 Giao hàng tận nơi – hỗ trợ nhanh trong ngày</p><hr><h3>🔑 Từ khóa SEO</h3><ul><li><p>sơn nước Vũng Tàu</p></li><li><p>thi công sơn nhà Vũng Tàu</p></li><li><p>đại lý sơn Vũng Tàu</p></li><li><p>sơn nhà đẹp Vũng Tàu</p></li><li><p>dịch vụ chống thấm Vũng Tàu</p></li></ul><hr><p>👉 <strong>Tự hào lao động – Trân quý giá trị thật</strong><br>Hoàng Quang Minh luôn đồng hành cùng bạn trong từng công trình – từ lớp sơn đầu tiên đến vẻ đẹp hoàn thiện.</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777823352/nasun-paint/ulsz9flyavdzq1ctoowj.jpg','Tin tức','2026-04-29 15:00:00',1,86,'2026-05-03 22:50:02','2026-05-22 19:55:49'),(5,'304-tu-hao-dan-toc-kien-tao-nhung-cong-trinh-ben-dep','30/4 – Tự hào dân tộc, kiến tạo những công trình bền đẹp','<p><strong>Ngày 30/4 – Giải phóng miền Nam, thống nhất đất nước</strong> không chỉ là một dấu mốc lịch sử, mà còn là khoảnh khắc thiêng liêng khi hàng triệu trái tim Việt Nam cùng chung một nhịp đập.</p>','<p>Đó là ngày đất nước liền một dải…<br>Là ngày của niềm vui vỡ òa…<br>Và cũng là ngày nhắc nhớ về những hy sinh thầm lặng để hôm nay chúng ta được sống trong hòa bình, được <strong>xây dựng – phát triển – và mơ ước</strong>.</p><hr><h3>✨ 51 năm – Hành trình vươn mình mạnh mẽ</h3><p>Trải qua hơn nửa thế kỷ, Việt Nam không chỉ hồi sinh mà còn không ngừng chuyển mình mạnh mẽ.<br>Từng ngôi nhà, từng công trình mọc lên chính là minh chứng cho một đất nước đang phát triển từng ngày.</p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777823518/nasun-paint/hikrkbz8uvviusbs3uek.jpg\"><hr><h3>🎨 Hoàng Quang Minh – Đồng hành kiến tạo diện mạo mới</h3><p>Tại <strong>Sơn Nước Hoàng Quang Minh</strong>, chúng tôi chọn cách tri ân bằng những hành động thiết thực:</p><p>✔️ Cung cấp <strong>sơn nước chính hãng, chất lượng cao</strong><br>✔️ Thi công sơn nhà – chống thấm <strong>bền đẹp theo thời gian</strong><br>✔️ Đồng hành cùng chủ nhà, thầu thợ trong từng công trình</p><p>👉 Mỗi lớp sơn không chỉ làm đẹp ngôi nhà<br>👉 Mà còn góp phần nhỏ vào diện mạo đô thị ngày càng khang trang, hiện đại</p><hr><h3>❤️ Tự hào là người Việt Nam</h3><p>Chúng tôi tin rằng, dù ở bất kỳ ngành nghề nào, mỗi người đều đang góp phần xây dựng đất nước theo cách riêng của mình.</p><p>🎉 Nhân dịp <strong>30/4</strong>, Sơn Nước Hoàng Quang Minh kính chúc Quý khách hàng:</p><ul><li><p>Một kỳ nghỉ <strong>ý nghĩa – bình an – trọn vẹn cảm xúc</strong></p></li><li><p>Luôn thành công trong cuộc sống và công việc</p></li></ul><hr><h3>📍 Thông tin liên hệ</h3><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý sơn &amp; thi công trọn gói Vũng Tàu</strong></p><ul><li><p>Phân phối: Dulux – Nasun – Jotun – Kova</p></li><li><p>Dịch vụ: Sơn nội/ngoại thất – chống thấm – thi công trọn gói</p></li></ul><p>🏠 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 Hotline: 0963.910.248<br>🚚 Giao hàng tận nơi – hỗ trợ nhanh trong ngày</p><hr><h3>🔑 Từ khóa SEO</h3><ul><li><p>sơn nước Vũng Tàu</p></li><li><p>thi công sơn nhà Vũng Tàu</p></li><li><p>đại lý sơn Nasun Vũng Tàu</p></li><li><p>sơn chống thấm Vũng Tàu</p></li><li><p>sơn nhà đẹp Vũng Tàu</p></li></ul><hr><p>👉 <strong>Tự hào Việt Nam – Kiến tạo công trình bền vững</strong><br>Hoàng Quang Minh luôn sẵn sàng đồng hành cùng bạn trên hành trình xây dựng tổ ấm và phát triển tương lai.</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777823476/nasun-paint/z77lrhhnxktupc63ovic.jpg','Tin tức','2026-04-29 08:50:00',1,78,'2026-05-03 22:52:05','2026-05-24 13:34:34'),(6,'bang-gia-son-dulux-moi-nhat-tai-vung-tau-cap-nhat-2026','Bảng Giá Sơn Dulux Mới Nhất Tại Vũng Tàu – Cập Nhật 2026','<p>Bạn đang tìm <strong>bảng giá sơn Dulux tại Vũng Tàu</strong> để chuẩn bị sơn nhà, chống thấm hay hoàn thiện công trình? Dưới đây là thông tin chi tiết giúp bạn dễ dàng lựa chọn dòng sơn phù hợp với nhu cầu và ngân sách.</p><p></p>','<h2>🏠 Tổng quan về sơn Dulux</h2><p><strong>Sơn Dulux</strong> là thương hiệu sơn cao cấp được nhiều chủ nhà và nhà thầu tin dùng nhờ các ưu điểm:</p><p>✔️ Độ bền màu cao – giữ màu lâu năm<br>✔️ Chống nấm mốc, chống kiềm hiệu quả<br>✔️ Bề mặt mịn đẹp – dễ lau chùi<br>✔️ An toàn sức khỏe – thân thiện môi trường</p><p>👉 Phù hợp cho cả <strong>nội thất – ngoại thất – công trình dân dụng &amp; cao cấp</strong></p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824144/nasun-paint/a9kj3bvl19y1xxiwlcsx.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824157/nasun-paint/eeiqcxkqsnhxxuhpra23.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824168/nasun-paint/cwu8gjjfraqp5rtsq2pw.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824180/nasun-paint/rt5x65qplotwvnkgwj6v.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824190/nasun-paint/gquu78rrymskvwx3a7q2.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824229/nasun-paint/shqfznyvdlxa2m7muyuh.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824244/nasun-paint/o8sdptxutjkibjaycsgm.jpg\"><hr><h2>💰 Bảng giá sơn Dulux tham khảo (2026)</h2><h3>🔹 Sơn nội thất Dulux</h3><ul><li><p>Dulux EasyClean (Lau chùi hiệu quả): từ <strong>1.300.000 – 1.800.000 VNĐ/thùng 18L</strong></p></li><li><p>Dulux Inspire (Kinh tế): từ <strong>900.000 – 1.200.000 VNĐ/thùng 18L</strong></p></li><li><p>Dulux Ambiance (Cao cấp): từ <strong>2.000.000 – 3.500.000 VNĐ/thùng 18L</strong></p></li></ul><hr><h3>🔹 Sơn ngoại thất Dulux</h3><ul><li><p>Dulux Weathershield Powerflexx: từ <strong>2.200.000 – 3.800.000 VNĐ/thùng 18L</strong></p></li><li><p>Dulux Weathershield chống thấm: từ <strong>1.800.000 – 2.800.000 VNĐ/thùng 18L</strong></p></li></ul><hr><h3>🔹 Sơn lót &amp; chống thấm</h3><ul><li><p>Sơn lót nội/ngoại thất Dulux: từ <strong>900.000 – 1.500.000 VNĐ/thùng 18L</strong></p></li><li><p>Chống thấm Dulux Aquatech: từ <strong>1.500.000 – 2.500.000 VNĐ/thùng 18L</strong></p></li></ul><hr><p>📌 <strong>Lưu ý:</strong></p><ul><li><p>Giá trên mang tính tham khảo, có thể thay đổi theo thời điểm và chương trình khuyến mãi</p></li><li><p>Giá thực tế phụ thuộc vào số lượng, dòng sản phẩm và chiết khấu cho thầu</p></li></ul><hr><h2>📊 Cách chọn sơn Dulux phù hợp</h2><ul><li><p><strong>Nhà ở phổ thông:</strong> Chọn Dulux Inspire để tiết kiệm chi phí</p></li><li><p><strong>Nhà phố, căn hộ:</strong> Chọn Dulux EasyClean – đẹp, dễ vệ sinh</p></li><li><p><strong>Biệt thự, cao cấp:</strong> Chọn Dulux Ambiance – thẩm mỹ &amp; đẳng cấp</p></li><li><p><strong>Ngoại thất ven biển:</strong> Ưu tiên Weathershield chống bám bẩn, chống rong rêu</p></li></ul><hr><h2>💥 Vì sao nên mua sơn Dulux tại Hoàng Quang Minh?</h2><ul><li><p>Đại lý phân phối <strong>sơn Dulux chính hãng tại Vũng Tàu</strong></p></li><li><p>Giá tốt cho <strong>chủ nhà &amp; thầu công trình</strong></p></li><li><p>Tư vấn đúng nhu cầu – không bán sai sản phẩm</p></li><li><p>Hỗ trợ <strong>thi công sơn nhà trọn gói – chống thấm</strong></p></li><li><p>Giao hàng nhanh trong ngày</p></li></ul><hr><h2>📍 Thông tin liên hệ</h2><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý sơn Dulux Vũng Tàu</strong><br>🏠 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 Hotline: 0963.910.248<br>🌐 Website: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"text-blue-600 underline\" href=\"https://sonnuocvungtau.com.vn/\">https://sonnuocvungtau.com.vn/</a></p><p>🚚 Giao nhanh – hỗ trợ tận công trình</p><hr><h2>🔑 Từ khóa SEO</h2><ul><li><p>bảng giá sơn Dulux Vũng Tàu</p></li><li><p>sơn Dulux chính hãng</p></li><li><p>giá sơn Dulux 18L mới nhất</p></li><li><p>đại lý sơn Dulux Vũng Tàu</p></li><li><p>thi công sơn Dulux trọn gói</p></li></ul><hr><p>👉 <strong>Liên hệ ngay để nhận báo giá sơn Dulux chính xác + chiết khấu tốt nhất!</strong><br>Hoàng Quang Minh luôn sẵn sàng đồng hành cùng bạn từ lựa chọn sơn đến hoàn thiện công trình.</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824248/nasun-paint/zh7ux6iq26lbnwkyefov.jpg','Khuyến mãi','2025-08-15 08:57:00',1,89,'2026-05-03 23:04:27','2026-05-24 13:34:34'),(7,'bang-gia-son-nasun-moi-nhat-2026-tai-vung-tau-cap-nhat-chi-tiet','Bảng Giá Sơn Nasun Mới Nhất 2026 Tại Vũng Tàu – Cập Nhật Chi Tiết','<p>Bạn đang tìm <strong>bảng giá sơn Nasun mới nhất</strong> để dự toán chi phí sơn nhà? Dưới đây là thông tin chi tiết về giá các dòng sơn Nasun phổ biến, giúp bạn dễ dàng lựa chọn sản phẩm phù hợp với nhu cầu và ngân sách.</p><p></p>','<h2>🎨 1. Tổng Quan Về Sơn Nasun</h2><p>Sơn Nasun là dòng sơn nước được ưa chuộng nhờ:</p><ul><li><p>Độ bền màu cao, chống phai trong điều kiện thời tiết khắc nghiệt</p></li><li><p>Khả năng chống thấm, chống rong rêu tốt (đặc biệt phù hợp khu vực ven biển như Vũng Tàu)</p></li><li><p>An toàn cho sức khỏe, thân thiện môi trường</p></li><li><p>Giá thành hợp lý so với chất lượng</p></li></ul><hr><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824491/nasun-paint/rtkga1aghm5u4rlm7nbr.jpg\"><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824508/nasun-paint/djwd4fjah4zvwslw1inf.jpg\"><h2>💰 2. Bảng Giá Sơn Nasun Tham Khảo</h2><h3>🔹 Sơn Nội Thất Nasun</h3><ul><li><p>Sơn lót nội thất: <strong>~ 900.000 – 1.200.000đ / thùng 18L</strong></p></li><li><p>Sơn phủ nội thất mịn: <strong>~ 1.200.000 – 1.600.000đ / thùng 18L</strong></p></li><li><p>Sơn lau chùi cao cấp: <strong>~ 1.600.000 – 2.200.000đ / thùng 18L</strong></p></li></ul><h3>🔹 Sơn Ngoại Thất Nasun</h3><ul><li><p>Sơn lót ngoại thất chống kiềm: <strong>~ 1.200.000 – 1.500.000đ / thùng 18L</strong></p></li><li><p>Sơn phủ ngoại thất: <strong>~ 1.500.000 – 2.300.000đ / thùng 18L</strong></p></li><li><p>Sơn siêu bóng – cao cấp: <strong>~ 2.300.000 – 3.200.000đ / thùng 18L</strong></p></li></ul><h3>🔹 Sơn Chống Thấm Nasun</h3><ul><li><p>Chống thấm pha xi măng: <strong>~ 650.000 – 1.100.000đ / thùng 18L</strong></p></li><li><p>Chống thấm màu cao cấp: <strong>~ 1.200.000 – 2.000.000đ / thùng 18L</strong></p></li></ul><p>📌 <em>Lưu ý: Giá có thể thay đổi tùy thời điểm, chương trình khuyến mãi và số lượng mua.</em></p><hr><h2>🎁 3. Ưu Đãi Khi Mua Sơn Nasun</h2><p>Khi mua sơn Nasun tại đại lý chính hãng, khách hàng có thể nhận:</p><ul><li><p>Chiết khấu tốt cho thầu &amp; công trình</p></li><li><p>Hỗ trợ phối màu miễn phí</p></li><li><p>Tư vấn chọn sơn theo ngân sách</p></li><li><p>Cơ hội nhận quà từ chương trình khuyến mãi<br></p></li></ul><hr><h2>🏠 4. Kinh Nghiệm Chọn Sơn Nasun Phù Hợp</h2><ul><li><p>Nhà mới xây: dùng đủ hệ thống <strong>bả – lót – phủ</strong> để đảm bảo độ bền</p></li><li><p>Nhà cũ cải tạo: ưu tiên sơn chống thấm &amp; chống nấm mốc</p></li><li><p>Khu vực ven biển: chọn dòng ngoại thất cao cấp để chống muối và ẩm</p></li><li><p>Không nên chọn sơn quá rẻ vì dễ bong tróc, nhanh xuống màu</p></li></ul><hr><h2>📍 5. Mua Sơn Nasun Chính Hãng Ở Đâu Tại Vũng Tàu?</h2><p>Bạn nên chọn đại lý uy tín để đảm bảo:</p><ul><li><p>Hàng chính hãng 100%</p></li><li><p>Giá tốt, không bị đội giá</p></li><li><p>Có hỗ trợ kỹ thuật &amp; thi công</p></li></ul><p><strong>Sơn Nước Hoàng Quang Minh</strong> – Đại lý phân phối và thi công sơn trọn gói tại Vũng Tàu:</p><ul><li><p>Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa</p></li><li><p>Hotline: 0963 910 248</p></li><li><p>Giao hàng nhanh – hỗ trợ tận nơi<br></p></li></ul><hr><h2>✅ Kết Luận</h2><p>Bảng giá sơn Nasun khá đa dạng, phù hợp từ phân khúc phổ thông đến cao cấp. Việc lựa chọn đúng dòng sơn không chỉ giúp tiết kiệm chi phí mà còn đảm bảo độ bền và thẩm mỹ cho công trình.</p><p>👉 Nếu bạn cần <strong>báo giá chi tiết theo diện tích hoặc công trình thực tế</strong>, hãy liên hệ để được tư vấn nhanh và chính xác nhất.</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824686/nasun-paint/hhiv47zkixxnttxxicik.png','Khuyến mãi','2026-05-02 05:06:00',1,93,'2026-05-03 23:08:42','2026-05-21 13:32:29'),(8,'cham-sac-xanh-danh-thuc-khong-gian-mua-he-cung-son-nasun','CHẠM SẮC XANH – ĐÁNH THỨC KHÔNG GIAN MÙA HÈ CÙNG SƠN NASUN','<p>Mùa hè là thời điểm lý tưởng để làm mới không gian sống bằng những gam màu xanh mát mắt, hiện đại và gần gũi thiên nhiên. Bộ sưu tập màu xanh từ sơn NASUN mang đến cảm giác thư thái, cân bằng và giúp ngôi nhà luôn tươi mới giữa thời tiết nắng nóng.</p>','<p>Không chỉ nổi bật về tính thẩm mỹ, sơn NASUN còn được nhiều khách hàng tại Vũng Tàu tin chọn nhờ độ bền màu cao, khả năng chống rong rêu và thích nghi tốt với khí hậu biển.</p><h2>Bộ Sưu Tập Màu Xanh NASUN Được Yêu Thích Mùa Hè</h2><h3>Herbal Garden 2528P – Xanh thiên nhiên thư thái</h3><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778214589/nasun-paint/ggsuayulvk6iointvrxx.jpg\"><p>Herbal Garden 2528P là gam xanh nhẹ nhàng, hài hòa, mang đến cảm giác an yên như một khu vườn xanh mát ngay trong ngôi nhà của bạn. Màu sơn phù hợp cho phòng khách, phòng ngủ hoặc các không gian nghỉ dưỡng cần sự thư giãn.</p><h3>Green Genie 2546C – Tươi sáng và hiện đại</h3><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778214580/nasun-paint/jkapqz5qfiokul93qksg.jpg\"><p>Green Genie 2546C sở hữu sắc xanh trẻ trung, nổi bật, tạo điểm nhấn hiện đại cho không gian sống. Đây là lựa chọn phù hợp với những gia chủ yêu thích phong cách năng động, sáng tạo và đầy năng lượng.</p><h3>Emerald Forest 2524D – Sang trọng và chiều sâu</h3><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778214498/nasun-paint/e1g8qbk0qgp09r3c50zg.jpg\"><p>Emerald Forest 2524D mang sắc xanh đậm đầy chiều sâu, tạo cảm giác mát mẻ và vững chãi. Gam màu này đặc biệt phù hợp với không gian cần sự sang trọng như phòng khách lớn, quán café hoặc khu nghỉ dưỡng cao cấp.</p><h3>Deep Jungle 2552D – Cá tính và mạnh mẽ</h3><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778214515/nasun-paint/an9rvuxmis09flzeammb.jpg\"><p>Deep Jungle 2552D là gam xanh rừng già đầy ấn tượng, giúp không gian trở nên khác biệt và cá tính hơn. Màu sắc này phù hợp với phong cách nội thất hiện đại hoặc công trình muốn tạo điểm nhấn độc đáo.</p><h2>Vì Sao Nên Chọn Sơn NASUN?</h2><ul><li><p>Màu sắc chuẩn xu hướng, bền đẹp lâu dài</p></li><li><p>Chống bong tróc, chống rong rêu hiệu quả</p></li><li><p>Phù hợp với khí hậu nóng ẩm và khu vực ven biển</p></li><li><p>An toàn cho sức khỏe, thân thiện môi trường</p></li><li><p>Đa dạng bảng màu cho nhà ở, quán café, showroom và công trình dân dụng</p></li></ul><p>Nếu bạn đang tìm kiếm sơn nước Vũng Tàu chất lượng cao với bảng màu đẹp hiện đại và dịch vụ thi công chuyên nghiệp, NASUN là lựa chọn đáng cân nhắc cho mùa hè này.</p><h2>Sơn Nước Hoàng Quang Minh – Đại Lý Sơn &amp; Thi Công Trọn Gói Vũng Tàu</h2><p>📍 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 0963.910.248<br>🚚 Giao nhanh – hỗ trợ tận nơi</p><p>🌐 Website: <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"text-blue-600 underline\" href=\"http://sonnuocvungtau.com.vn\">sonnuocvungtau.com.vn</a></p><h3>Từ khóa SEO:</h3><p>sơn NASUN, bảng màu NASUN, sơn nước Vũng Tàu, sơn nội thất đẹp, sơn nhà màu xanh, đại lý sơn NASUN Vũng Tàu, thi công sơn trọn gói, sơn chống rong rêu, màu sơn mùa hè đẹp</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778214422/nasun-paint/qi9n8v5utpjsgclaqsna.jpg','Tin tức','2026-05-07 21:25:00',1,36,'2026-05-08 11:29:21','2026-05-24 13:34:34'),(9,'hanh-trinh-diem-truong-yeu-thuong-nasun-paint-mang-gam-mau-hy-vong-den-diem-truong-ngai-tro','Hành Trình “Điểm Trường Yêu Thương” – NASUN PAINT Mang Gam Màu Hy Vọng Đến Điểm Trường Ngài Trò','<p>🌈 NASUN PAINT tiếp tục hành trình xây dựng ước mơ Việt</p>','<p>Nhân dịp kỷ niệm 51 năm ngày Giải phóng Miền Nam, thống nhất đất nước, NASUN PAINT tiếp tục hành trình thiện nguyện đầy ý nghĩa với chương trình <strong>“Điểm Trường Yêu Thương – Xây Ước Mơ Việt”</strong> tại Điểm trường Ngài Trò – xã Yên Minh, tỉnh Tuyên Quang.</p><p>Đây là một trong những điểm trường vùng cao còn nhiều khó khăn, nơi hơn 60 em nhỏ là con em đồng bào dân tộc thiểu số đang ngày ngày vượt dốc đá, sương mù để đến lớp.</p><hr><h2>🏫 Khoác áo mới cho điểm trường vùng cao</h2><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778501897/nasun-paint/tjxnz4ikeycugt5zejue.jpg\"><p>Điểm trường Ngài Trò đã xuống cấp nghiêm trọng do điều kiện thời tiết khắc nghiệt quanh năm. Với mong muốn mang đến môi trường học tập tốt hơn cho các em nhỏ, NASUN PAINT đã góp phần cải tạo và làm đẹp điểm trường bằng những gam màu tươi sáng, bền đẹp và an toàn.</p><p>Không chỉ là lớp sơn bảo vệ công trình, đó còn là sự sẻ chia, động viên tinh thần để các em thêm yêu trường lớp và tiếp tục nuôi dưỡng ước mơ tương lai.</p><hr><h2>💙 Hơn 100 công trình – Một hành trình vì cộng đồng</h2><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778501886/nasun-paint/ebsrrvokh70wgzv0vzqt.jpg\"><p>Chương trình <strong>“Điểm Trường Yêu Thương – Xây Ước Mơ Việt”</strong> là minh chứng cho cam kết <em>“Phục vụ cộng đồng”</em> của NASUN PAINT.</p><p>Đến nay, thương hiệu đã cùng nhóm “Xây ước mơ – Cùng em tới trường” xây dựng, cải tạo và làm đẹp hơn 100 điểm trường, thư viện trên khắp cả nước, mang đến không gian học tập an toàn, khang trang và đầy hy vọng cho trẻ em vùng cao.</p><hr><h2>🎨 Sơn lót chất lượng – Nền tảng cho công trình bền đẹp</h2><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778501908/nasun-paint/yaucqbx1digxv6keweqy.jpg\"><p>Trong các công trình trường học, việc sử dụng <strong>sơn lót chất lượng cao</strong> đóng vai trò quan trọng giúp:</p><p>✔️ Tăng độ bám dính cho lớp sơn phủ<br>✔️ Chống kiềm hóa, chống bong tróc<br>✔️ Giữ màu bền đẹp lâu dài<br>✔️ Bảo vệ tường trước thời tiết khắc nghiệt</p><p>Đây cũng là lý do nhiều công trình dân dụng và trường học ưu tiên lựa chọn các dòng sơn lót chất lượng từ NASUN.</p><hr><h2>📍 Đại lý sơn NASUN chính hãng tại Vũng Tàu</h2><p>Nếu bạn đang tìm kiếm các dòng <strong>sơn lót – sơn phủ – chống thấm chính hãng</strong>, hãy liên hệ ngay:</p><h3>Sơn Nước Hoàng Quang Minh</h3><p>👉 Liên hệ ngay: <strong>Sơn Nước Hoàng Quang Minh – Đại lý &amp; thi công trọn gói</strong><br>📍 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 0963.910.248<br>🚚 Giao nhanh – hỗ trợ tận nơi</p><hr><h2>🔍 Từ khóa SEO gợi ý</h2><ul><li><p>Sơn lót NASUN chính hãng</p></li><li><p>Sơn nước Vũng Tàu</p></li><li><p>Đại lý sơn NASUN Vũng Tàu</p></li><li><p>Sơn lót chống kiềm</p></li><li><p>Thi công sơn trọn gói Vũng Tàu</p></li><li><p>Sơn trường học vùng cao</p></li><li><p>Sơn nước Hoàng Quang Minh</p></li></ul><p></p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778501864/nasun-paint/txmydknckjfsuu6v1t44.jpg','Tin tức','2026-05-11 05:17:00',1,28,'2026-05-11 19:17:33','2026-05-22 21:31:54'),(10,'thi-cong-son-lai-khach-san-grand-hotel-vung-tau','Thi Công Sơn Lại Khách Sạn Grand Hotel Vũng Tàu','<h3>Giải Pháp Làm Mới Không Gian Sang Trọng, Bền Đẹp</h3><p>Trong quá trình hoạt động lâu dài, các khách sạn tại khu vực biển thường gặp tình trạng bong tróc sơn, phai màu, tường ẩm mốc do ảnh hưởng của khí hậu nóng ẩm và hơi muối biển. Chính vì vậy, việc <strong>thi công sơn lại khách sạn Grand Hotel Vũng Tàu</strong> không chỉ giúp nâng cao tính thẩm mỹ mà còn góp phần bảo vệ công trình bền vững theo thời gian.</p>','<img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778773590/nasun-paint/hpowblzeitmh9llygv8d.png\"><h2>Vì Sao Cần Thi Công Sơn Lại Khách Sạn Tại Vũng Tàu?</h2><p>Với đặc trưng khí hậu biển, các công trình khách sạn tại Vũng Tàu thường xuyên chịu tác động của:</p><ul><li><p>Nắng nóng kéo dài</p></li><li><p>Độ ẩm cao</p></li><li><p>Hơi muối biển gây ăn mòn bề mặt</p></li><li><p>Rong rêu và nấm mốc phát triển</p></li></ul><p>Do đó, việc <strong>sơn lại khách sạn Vũng Tàu</strong> định kỳ sẽ giúp:</p><ul><li><p>Tăng tính thẩm mỹ và sự chuyên nghiệp</p></li><li><p>Bảo vệ tường nội thất và ngoại thất</p></li><li><p>Chống thấm, chống bong tróc hiệu quả</p></li><li><p>Nâng cao trải nghiệm khách hàng lưu trú</p></li><li><p>Gia tăng tuổi thọ công trình</p></li></ul><h2>Quy Trình Thi Công Sơn Lại Khách Sạn Grand Hotel Vũng Tàu</h2><p>Để đảm bảo chất lượng công trình, quá trình <strong>thi công sơn khách sạn</strong> cần được thực hiện bài bản theo các bước:</p><h3>1. Khảo Sát Hiện Trạng Công Trình</h3><p>Đội ngũ kỹ thuật kiểm tra:</p><ul><li><p>Mức độ bong tróc</p></li><li><p>Tình trạng thấm tường</p></li><li><p>Độ bám dính lớp sơn cũ</p></li><li><p>Khu vực cần xử lý chống thấm</p></li></ul><h3>2. Xử Lý Bề Mặt</h3><ul><li><p>Cạo bỏ lớp sơn cũ hư hỏng</p></li><li><p>Trám vá vết nứt</p></li><li><p>Vệ sinh bề mặt sạch bụi bẩn</p></li><li><p>Thi công chống thấm tại các khu vực cần thiết</p></li></ul><h3>3. Thi Công Sơn Lót Và Sơn Phủ</h3><p>Sử dụng các dòng:</p><ul><li><p>Sơn nội thất cao cấp</p></li><li><p>Sơn ngoại thất chống muối biển</p></li><li><p>Sơn chống thấm</p></li><li><p>Sơn chống rong rêu, chống bám bụi</p></li></ul><h3>4. Kiểm Tra Và Bàn Giao</h3><p>Sau thi công sẽ tiến hành:</p><ul><li><p>Kiểm tra độ đều màu</p></li><li><p>Kiểm tra độ phủ</p></li><li><p>Vệ sinh hoàn thiện công trình</p></li><li><p>Bàn giao đúng tiến độ</p></li></ul><h2>Lợi Ích Khi Chọn Đơn Vị Thi Công Sơn Chuyên Nghiệp</h2><p>Một đơn vị thi công uy tín sẽ giúp khách sạn:</p><ul><li><p>Tiết kiệm chi phí bảo trì</p></li><li><p>Đảm bảo tiến độ nhanh chóng</p></li><li><p>Thi công an toàn, sạch sẽ</p></li><li><p>Tư vấn màu sắc phù hợp phong cách khách sạn</p></li><li><p>Sử dụng sơn chính hãng, độ bền cao</p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1778773621/nasun-paint/svhgwh7xdurnmomkbrid.png\"></li></ul><h2>Sơn Nước Hoàng Quang Minh – Đơn Vị Cung Cấp Sơn &amp; Thi Công Sơn Tại Vũng Tàu</h2><p>Nếu bạn đang cần tìm đơn vị <strong>thi công sơn khách sạn tại Vũng Tàu</strong>, <strong>sơn lại khách sạn</strong>, <strong>thi công chống thấm khách sạn</strong>, hãy liên hệ:</p><h3>Sơn Nước Hoàng Quang Minh</h3><ul><li><p>Đại lý sơn chính hãng: Nasun – Dulux – Jotun – Kova</p></li><li><p>Nhận thi công sơn nhà, khách sạn, biệt thự, công trình</p></li><li><p>Hỗ trợ khảo sát và tư vấn tận nơi</p></li><li><p>Giao hàng nhanh tại khu vực Vũng Tàu</p></li></ul><p>📍 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 Hotline: 0963.910.248</p><h2>Từ Khóa SEO Được Tối Ưu Trong Bài</h2><ul><li><p>thi công sơn lại khách sạn Grand Hotel Vũng Tàu</p></li><li><p>sơn lại khách sạn Vũng Tàu</p></li><li><p>thi công sơn khách sạn</p></li><li><p>sơn nước Vũng Tàu</p></li><li><p>thi công chống thấm khách sạn</p></li><li><p>đơn vị thi công sơn tại Vũng Tàu</p></li><li><p>sơn khách sạn cao cấp</p></li><li><p>sơn ngoại thất khách sạn ven biển</p></li></ul><p></p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778773607/nasun-paint/geluwfsmzowwvfhcgodl.jpg','Tin tức','2026-05-14 08:43:00',1,18,'2026-05-14 22:45:50','2026-05-22 23:25:21');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Đường dẫn ảnh thông báo',
  `type` enum('news','promotion','system') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'news',
  `is_pinned` tinyint(1) NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_notifications_type` (`type`) USING BTREE,
  KEY `idx_notifications_pinned` (`is_pinned`,`created_at`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned NOT NULL,
  `product_id` int unsigned DEFAULT NULL,
  `product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` smallint NOT NULL DEFAULT '1',
  `price_note` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Liên hệ',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_order` (`order_id`) USING BTREE,
  KEY `idx_product` (`product_id`) USING BTREE,
  CONSTRAINT `fk_oi_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_oi_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,NULL,'SƠN CHỐNG NÓNG KOVA CN-05 (Mái tôn)','son-chong-nong-kova-cn-05-mai-ton',1,'Liên hệ');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL COMMENT 'Người mua',
  `product_id` int unsigned NOT NULL COMMENT 'Sản phẩm đã mua',
  `account_id` int unsigned DEFAULT NULL COMMENT 'Tài khoản game tương ứng',
  `distributor_id` int unsigned DEFAULT NULL,
  `amount` decimal(15,0) NOT NULL COMMENT 'Số tiền thanh toán (VND)',
  `status` enum('pending','completed','cancelled','refunded') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `domain_purchased` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_orders_user` (`user_id`) USING BTREE,
  KEY `idx_orders_product` (`product_id`) USING BTREE,
  KEY `idx_orders_status` (`status`) USING BTREE,
  KEY `fk_orders_account` (`account_id`) USING BTREE,
  KEY `fk_orders_distributor` (`distributor_id`) USING BTREE,
  CONSTRAINT `fk_orders_account` FOREIGN KEY (`account_id`) REFERENCES `accounts` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_distributor` FOREIGN KEY (`distributor_id`) REFERENCES `distributors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sort_order` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_product` (`product_id`) USING BTREE,
  CONSTRAINT `fk_pi_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,25,'https://res.cloudinary.com/dzrfes6lm/image/upload/v1777977791/nasun-paint/gdbilu41jit9ogwwzibc.webp','Sơn Lót Chống Kiềm NASUN AKALI',0);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_specs`
--

DROP TABLE IF EXISTS `product_specs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_specs` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int unsigned NOT NULL,
  `spec_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `spec_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` smallint NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_product` (`product_id`) USING BTREE,
  CONSTRAINT `fk_ps_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_specs`
--

LOCK TABLES `product_specs` WRITE;
/*!40000 ALTER TABLE `product_specs` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_specs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int unsigned NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(15,0) NOT NULL COMMENT 'Giá bán (VND)',
  `original_price` decimal(15,0) NOT NULL COMMENT 'Giá gốc chưa giảm (VND)',
  `discount_percent` tinyint unsigned NOT NULL DEFAULT '0' COMMENT 'Phần trăm giảm giá (0-100)',
  `fake_remaining_count` int unsigned NOT NULL DEFAULT '0' COMMENT 'Số lượng ảo còn lại',
  `fake_sold_count` int unsigned NOT NULL DEFAULT '0' COMMENT 'Số lượng ảo đã bán',
  `pet_tim` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số pet tím / thông tin pet',
  `san_tim` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số sàn tím / thông tin sàn',
  `chuong` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Số chưởng / thông tin chưởng',
  `extra_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Thông tin bổ sung',
  `status` enum('available','hidden') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'available',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_products_category` (`category_id`) USING BTREE,
  KEY `idx_products_status` (`status`) USING BTREE,
  KEY `idx_products_price` (`price`) USING BTREE,
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projects` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` enum('chung-cu','biet-thu','nha-pho','phong-bep','phong-ngu','phong-tre-em') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'chung-cu',
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `sort_order` smallint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `slug` (`slug`) USING BTREE,
  KEY `idx_slug` (`slug`) USING BTREE,
  KEY `idx_category` (`category`) USING BTREE,
  KEY `idx_sort` (`sort_order`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (2,'cong-trinh-son-nha-ven-bien-vung-tau-lot-xac-ngoan-muc-sau-khi-son-nasun','Công Trình Sơn Nhà Ven Biển Vũng Tàu – Lột Xác Ngoạn Mục Sau Khi Sơn Nasun','biet-thu','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777800124/nasun-paint/ssjgi9u7nnrhtd7etj72.png','<p>📍 Địa điểm: Vũng Tàu<br>🏠 Hạng mục: Sơn ngoại thất – chống thấm toàn bộ<br>🎯 Dòng sơn sử dụng: NASUN EXTRA PROTECT</p><hr><h2>🏚️ <strong>Hiện trạng trước khi thi công</strong></h2><p>Ngôi nhà trước khi thi công có dấu hiệu xuống cấp rõ rệt:</p><ul><li><p>❌ Tường ố vàng, bong tróc nhiều mảng</p></li><li><p>❌ Rêu mốc phát triển do khí hậu ẩm biển</p></li><li><p>❌ Bề mặt thấm nước, loang màu</p></li><li><p>❌ Mất thẩm mỹ, giảm giá trị công trình</p></li></ul><p>👉 Đây là tình trạng rất phổ biến với <strong>nhà ven biển tại Vũng Tàu</strong>.</p><hr><h2>🛠️ <strong>Giải pháp thi công sơn Nasun</strong></h2><p>Đội thi công đã áp dụng quy trình chuẩn để đảm bảo độ bền:</p><h3>✔️ Xử lý bề mặt</h3><ul><li><p>Vệ sinh sạch rêu mốc</p></li><li><p>Cạo bỏ lớp sơn cũ</p></li><li><p>Xử lý chống thấm, chống kiềm</p></li></ul><h3>✔️ Thi công hệ sơn</h3><ul><li><p>1 lớp <strong>sơn lót chống kiềm ngoại thất</strong></p></li><li><p>2 lớp <strong>sơn phủ NASUN EXTRA PROTECT</strong></p></li></ul><p>👉 Giúp tăng độ bám dính và bảo vệ tường lâu dài.</p><hr><h2>✨ <strong>Kết quả sau khi thi công</strong></h2><p>Sau khi hoàn thiện, công trình “lột xác” hoàn toàn:</p><ul><li><p>✅ Tường trắng sáng, mịn đẹp như mới</p></li><li><p>✅ Bề mặt <strong>bóng mờ sang trọng</strong></p></li><li><p>✅ Chống thấm hiệu quả, không còn loang ố</p></li><li><p>✅ Kháng rêu mốc – phù hợp khí hậu biển</p></li><li><p>✅ <strong>Độ bền màu 5–7 năm</strong></p></li></ul><p>📸 <em>Hình ảnh thực tế cho thấy sự khác biệt rõ rệt trước và sau khi sơn.</em></p><hr><h2>🌊 <strong>Vì sao nên chọn sơn Nasun tại Vũng Tàu?</strong></h2><p>Khí hậu Vũng Tàu có độ ẩm cao, gió biển và muối mặn → cần sơn chuyên dụng:</p><ul><li><p>🛡️ Chống tia UV, chống bay màu</p></li><li><p>💧 Chống thấm vượt trội</p></li><li><p>🌿 Kháng rêu mốc lâu dài</p></li><li><p>🎨 Màu sắc bền đẹp theo thời gian</p></li></ul><p>👉 Nasun là lựa chọn tối ưu cho <strong>sơn nhà Vũng Tàu, sơn ngoại thất ven biển</strong>.</p><hr><h2>📍 <strong>Đơn vị thi công sơn uy tín tại Vũng Tàu</strong></h2><p>Nếu bạn đang tìm <strong>đại lý sơn nước Vũng Tàu + thi công trọn gói</strong>, liên hệ ngay:</p><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý &amp; thi công chuyên nghiệp</strong><br>📍 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 0963.910.248<br>🚚 Giao nhanh – hỗ trợ tận nơi</p>',0,'2026-05-03 16:24:02','2026-05-03 16:24:02'),(3,'son-sua-chung-cu-seaview-vung-tau-giai-phap-son-ngoai-that-ben-dep-chong-tham-hieu-qua','Sơn sửa Chung cư Seaview Vũng Tàu – Giải pháp sơn ngoại thất bền đẹp, chống thấm hiệu quả','chung-cu','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777800858/nasun-paint/kphmqykoddo2zqitwvfy.png','<p>Dự án sơn sửa tại <strong>Chung cư Seaview Vũng Tàu</strong> đang được triển khai nhằm nâng cấp toàn diện diện mạo và tăng độ bền cho công trình. Với vị trí ven biển đặc trưng của Vũng Tàu, tòa nhà thường xuyên chịu tác động của nắng gắt, độ ẩm cao và hơi muối, khiến bề mặt tường dễ xuống cấp, bong tróc và thấm nước.</p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777800865/nasun-paint/t2rzm1pjaikgniiwcxeh.png\"><h3>Giải pháp sơn ngoại thất chuyên nghiệp</h3><p>Đội ngũ thi công sử dụng phương pháp đu dây hiện đại, đảm bảo xử lý toàn bộ bề mặt ngoài tòa nhà một cách an toàn và hiệu quả. Quy trình gồm:</p><ul><li><p>Xử lý bề mặt, loại bỏ lớp sơn cũ bong tróc</p></li><li><p>Trám vá vết nứt, chống thấm tường ngoài</p></li><li><p>Thi công sơn lót kháng kiềm</p></li><li><p>Phủ sơn hoàn thiện cao cấp chống rong rêu, bền màu</p></li></ul><h3>Ưu điểm sau khi sơn sửa</h3><ul><li><p>Tăng độ bền công trình trước khí hậu biển khắc nghiệt</p></li><li><p>Chống thấm hiệu quả, hạn chế nứt tường</p></li><li><p>Màu sắc tươi mới, nâng cao thẩm mỹ chung cư</p></li><li><p>Giảm chi phí bảo trì lâu dài</p></li></ul><h3>Tại sao nên chọn đơn vị thi công uy tín?</h3><p>Việc lựa chọn đúng vật liệu sơn và đội ngũ thi công chuyên nghiệp giúp đảm bảo chất lượng công trình. Một hệ sơn đạt chuẩn không chỉ đẹp mà còn phải bền, chống thấm tốt và phù hợp điều kiện môi trường tại Vũng Tàu.</p><hr><h3>Dịch vụ sơn sửa nhà – chung cư tại Vũng Tàu</h3><p>Nếu bạn đang cần tìm đơn vị <strong>sơn nhà Vũng Tàu</strong>, <strong>sơn chung cư</strong>, <strong>chống thấm tường ngoài</strong>, hãy liên hệ:</p><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý &amp; thi công sơn uy tín</strong><br>📍 09 Phan Thanh Giản, P. Rạch Dừa<br>📲 0963.910.248 - 0973.507.903</p>',0,'2026-05-03 16:34:32','2026-05-03 16:34:32'),(4,'son-sua-can-ho-chung-cu-melody-vung-tau-giai-phap-cai-tao-khong-gian-song-dep-ben-tiet-kiem','Sơn sửa căn hộ Chung cư Melody Vũng Tàu – Giải pháp cải tạo không gian sống đẹp, bền, tiết kiệm','chung-cu','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777801241/nasun-paint/ft096myfjpsnm4x0uttf.png','<p>Căn hộ tại <strong>Chung cư Melody Vũng Tàu</strong> đang được sơn sửa và cải tạo lại toàn diện, mang đến sự thay đổi rõ rệt từ cũ kỹ xuống cấp thành không gian sống hiện đại, sáng và thoáng hơn. Đây là giải pháp tối ưu dành cho các căn hộ lâu năm tại khu vực có độ ẩm cao như Vũng Tàu.</p><hr><h2>Hiện trạng căn hộ trước khi sơn sửa</h2><p>Trước khi thi công, căn hộ gặp các vấn đề phổ biến:</p><ul><li><p>Tường ẩm mốc, bong tróc do thấm nước</p></li><li><p>Màu sơn cũ xuống cấp, không đồng đều</p></li><li><p>Không gian thiếu sáng, bí bách</p></li><li><p>Sàn và tổng thể nội thất kém thẩm mỹ</p></li></ul><p>Những yếu tố này không chỉ ảnh hưởng đến trải nghiệm sống mà còn làm giảm giá trị căn hộ.</p><hr><h2>Quy trình sơn sửa căn hộ chuyên nghiệp</h2><p>Để đảm bảo chất lượng lâu dài, quá trình thi công được thực hiện theo các bước chuẩn:</p><p><strong>1. Xử lý bề mặt &amp; chống thấm</strong></p><ul><li><p>Vệ sinh, loại bỏ lớp sơn cũ</p></li><li><p>Trám vá vết nứt, xử lý khu vực thấm nước</p></li></ul><p><strong>2. Thi công sơn lót</strong></p><ul><li><p>Sử dụng sơn lót kháng kiềm giúp tăng độ bám dính</p></li><li><p>Ngăn ngừa ẩm mốc quay trở lại</p></li></ul><p><strong>3. Sơn phủ hoàn thiện</strong></p><ul><li><p>Phủ 2 lớp sơn nội thất cao cấp</p></li><li><p>Màu sắc sáng (trắng – xám – kem) giúp mở rộng không gian</p></li></ul><hr><h2>Kết quả sau khi cải tạo</h2><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777801253/nasun-paint/yleq2cpaowkbtyxdzbex.png\"><p>Sau khi hoàn thiện, căn hộ tại Melody đã “lột xác” hoàn toàn:</p><ul><li><p>Không gian sáng, sạch, hiện đại</p></li><li><p>Tường mịn đẹp, đều màu, chống ẩm tốt</p></li><li><p>Loại bỏ mùi ẩm mốc khó chịu</p></li><li><p>Tăng giá trị sử dụng và dễ cho thuê/bán</p></li></ul><hr><h2>Vì sao nên sơn sửa căn hộ định kỳ?</h2><ul><li><p>Bảo vệ tường khỏi ẩm mốc, nứt nẻ</p></li><li><p>Duy trì thẩm mỹ và giá trị bất động sản</p></li><li><p>Tiết kiệm chi phí sửa chữa lớn về sau</p></li></ul><hr><h2>Đơn vị sơn sửa căn hộ uy tín tại Vũng Tàu</h2><p>Nếu bạn đang tìm dịch vụ <strong>sơn căn hộ Vũng Tàu</strong>, <strong>cải tạo chung cư Melody</strong>, hãy liên hệ:</p><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý &amp; thi công sơn trọn gói</strong><br>📍 09 Phan Thanh Giản, P. Rạch Dừa<br>📲 0963.910.248</p>',0,'2026-05-03 16:40:56','2026-05-03 16:40:56'),(5,'thi-cong-son-noi-that-can-ho-vung-tau-hoan-thien-khong-gian-sang-trong-tinh-te','Thi công sơn nội thất căn hộ Vũng Tàu – Hoàn thiện không gian sang trọng, tinh tế','chung-cu','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777823148/nasun-paint/kld7dhbdnjr3h9ficvdq.png','<p>Bạn đang tìm đơn vị <strong>thi công sơn nhà tại Vũng Tàu</strong> uy tín, chuyên nghiệp? Công trình thực tế dưới đây là minh chứng rõ ràng cho chất lượng thi công của <strong>Sơn Nước Hoàng Quang Minh</strong> – mang đến không gian sống hiện đại, bền đẹp theo thời gian.</p><hr><h3>🎨 Thông tin công trình</h3><ul><li><p><strong>Hạng mục</strong>: Sơn nội thất căn hộ</p></li><li><p><strong>Địa điểm</strong>: TP. Vũng Tàu</p></li><li><p><strong>Đơn vị thi công</strong>: Sơn Nước Hoàng Quang Minh</p></li><li><p><strong>Phong cách</strong>: Hiện đại – tối giản – điểm nhấn phào chỉ tường</p></li></ul><hr><h3>🏠 Giải pháp thi công sơn nội thất</h3><p>Tại công trình, đội ngũ thi công đã lựa chọn phương án:<br>✔️ Xử lý bề mặt kỹ lưỡng, đảm bảo độ bám dính tối đa<br>✔️ Thi công lớp sơn lót chống ẩm, chống kiềm hiệu quả<br>✔️ Sơn phủ màu trung tính cao cấp, giúp không gian sáng – rộng – sang<br>✔️ Tạo điểm nhấn bằng các mảng tường phào chỉ, tăng tính thẩm mỹ</p><p>Đặc biệt, kỹ thuật lăn sơn đều tay giúp bề mặt <strong>mịn – không vệt – chuẩn màu</strong>.</p><hr><h3>💪 Ưu điểm nổi bật sau thi công</h3><ul><li><p>Bề mặt sơn <strong>mịn đẹp – đồng đều – không bong tróc</strong></p></li><li><p>Khả năng <strong>chống ẩm, chống nấm mốc</strong> tốt (phù hợp khí hậu biển Vũng Tàu)</p></li><li><p>Màu sắc <strong>bền lâu – dễ lau chùi</strong></p></li><li><p>Không gian trở nên <strong>sang trọng, đẳng cấp hơn rõ rệt</strong></p></li></ul><hr><h3>🚀 Vì sao nên chọn Sơn Nước Hoàng Quang Minh?</h3><p>✔️ Đại lý sơn chính hãng (Nasun, Dulux, Jotun, Kova) <br>✔️ Tư vấn đúng nhu cầu – tối ưu chi phí<br>✔️ Đội thợ thi công tay nghề cao, làm việc gọn gàng<br>✔️ Nhận thi công trọn gói: sơn nội thất – ngoại thất – chống thấm<br>✔️ Giao hàng nhanh, hỗ trợ tận nơi tại Vũng Tàu</p><hr><h3>📍 Liên hệ tư vấn &amp; báo giá</h3><p><strong>Sơn Nước Hoàng Quang Minh – Đại lý &amp; thi công sơn tại Vũng Tàu</strong><br>🏠 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu <br>📲 Hotline: 0963.910.248<br>🚚 Giao sơn nhanh trong ngày – hỗ trợ tận công trình</p>',0,'2026-05-03 22:45:50','2026-05-03 22:45:50'),(6,'phong-khach-villa-long-cung','Phòng khách Villa Long Cung','biet-thu','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778065087/nasun-paint/uvuzqhwmnxhngzh82tuc.jpg',NULL,0,'2026-05-06 17:58:52','2026-05-06 17:58:52'),(7,'chung-cu-melody-vung-tau','Chung cư Melody Vũng Tàu','biet-thu','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778065167/nasun-paint/erjhjsg9pelbskhijq0p.jpg',NULL,0,'2026-05-06 17:59:21','2026-05-06 17:59:21'),(8,'phong-bep-1','Phòng bếp 1','phong-bep','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778065237/nasun-paint/blt13cqnlfj7j2v6csnd.jpg',NULL,0,'2026-05-06 18:00:32','2026-05-06 18:00:32'),(9,'phong-bep-co-san-sau','Phòng bếp có sân sau','phong-bep','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778065295/nasun-paint/v4hpj8cgozx73axv67xt.webp',NULL,0,'2026-05-06 18:01:21','2026-05-06 18:01:21'),(10,'phong-bep-2','Phòng bếp 2','phong-bep','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778065313/nasun-paint/cqwtbkhizqitmgstbwgs.png',NULL,0,'2026-05-06 18:01:40','2026-05-06 18:01:51'),(11,'thi-cong-son-lai-khach-san-grand-hotel-vung-tau','Thi Công Sơn Lại Khách Sạn Grand Hotel Vũng Tàu','nha-pho','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778773334/nasun-paint/tnkjy4oqmyugoslrxjic.jpg','<p>Thi Công Sơn Lại Khách Sạn Grand Hotel Vũng Tàu – Giải Pháp Làm Mới Không Gian Sang Trọng, Bền Đẹp</p><p>Trong quá trình hoạt động lâu dài, các khách sạn tại khu vực biển thường gặp tình trạng bong tróc sơn, phai màu, tường ẩm mốc do ảnh hưởng của khí hậu nóng ẩm và hơi muối biển. Chính vì vậy, việc <strong>thi công sơn lại khách sạn Grand Hotel Vũng Tàu</strong> không chỉ giúp nâng cao tính thẩm mỹ mà còn góp phần bảo vệ công trình bền vững theo thời gian.</p><p></p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://images.openai.com/static-rsc-4/zeVuT_VS77ccbpIa9d0G9T2NDNIipmZJ4SYKjdObTR-ZVtoV3p6x2KgTPeaxdqdhFAMv2RtJlOS-tbhGnYiTGISVQjqNBV75W9hCEYrncSpHyhfMU54B6mJoOTzjlp0eHUrz2MmHcH9OvtrD6BFvXvav-3w_S5PUGDSXQEx-d_7vkUKdPlMYjMfY9PFrNMZB?purpose=fullsize\" alt=\"Image\"><p></p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://images.openai.com/static-rsc-4/-fSYSpYwsDUfCw-nHR86Sbz0wOgl3jcL1EbdcpNqICfnNvO21fQKfxOVxmoaAhp4LN77k3R4QrH64X5gLOd1EQPsPK_rHE9eES2jMEpe6Jr3wruRx5VJYxmZ7SavCMstEcXVpRsVPlxUPgKQTv6cIYEC0QjaOEJOtwOaCxMHaSoUbT-SPJ0BV3_3zvJbQEDP?purpose=fullsize\" alt=\"Image\"><p></p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://images.openai.com/static-rsc-4/bFktQPMRqkH7aj539XzzrZOrhXeW2g2qWBSmtmmnq4WnLsQsVDH0hi38CPhjWrNWtdbl2ED5ZvDmFhdK0N9pEiYWL-TEEgkx_nTZI8VDwCUURzfxEcsGbd0vfjOGUj6DwNywY5lUAKz0nZqKFIbblvnTKkwZoxJT5SwHSi2dZIG5dkht11eSE_vhNL51P8r2?purpose=fullsize\" alt=\"Image\"><p></p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://images.openai.com/static-rsc-4/dDEyW-IgA7YC8fyujqb-FUAoMvHIeDBX3WoXcCMSot5mJLobcXSM5k3QOZcWp7suYCCPwDtWtyac6ghVOl8aTrTjCpJgaBFqpjx2ocE6ZrgK1TrOtYL5_IcrpKeaTpJM8QVU1PAxOvG_QrJfLJ8Rw41jMK4LXbsPx3yE787wAq95Caaj7TNbS9bS5B39_b0U?purpose=fullsize\" alt=\"Image\"><p></p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://images.openai.com/static-rsc-4/XDcy1CRRrfqcFMQHyMFIqRV6zQFJvEPFVXr_Ox4kMdnP7yc25Q_pfa_k5E9ZE4sYx9-syVvt3D3jE2agBA2OUcJj1DgQBMImsDrGbSncz8bIuaraOtnDYt6-o_9tcr9Ti9u_je13dbxqqgu9GlM06ASRcMoTP3Py36XgxzPMLF70FSt4imI0LXxx80rDxDqj?purpose=fullsize\" alt=\"Image\"><h2>Vì Sao Cần Thi Công Sơn Lại Khách Sạn Tại Vũng Tàu?</h2><p>Với đặc trưng khí hậu biển, các công trình khách sạn tại Vũng Tàu thường xuyên chịu tác động của:</p><ul><li><p>Nắng nóng kéo dài</p></li><li><p>Độ ẩm cao</p></li><li><p>Hơi muối biển gây ăn mòn bề mặt</p></li><li><p>Rong rêu và nấm mốc phát triển</p></li></ul><p>Do đó, việc <strong>sơn lại khách sạn Vũng Tàu</strong> định kỳ sẽ giúp:</p><ul><li><p>Tăng tính thẩm mỹ và sự chuyên nghiệp</p></li><li><p>Bảo vệ tường nội thất và ngoại thất</p></li><li><p>Chống thấm, chống bong tróc hiệu quả</p></li><li><p>Nâng cao trải nghiệm khách hàng lưu trú</p></li><li><p>Gia tăng tuổi thọ công trình</p></li></ul><h2>Quy Trình Thi Công Sơn Lại Khách Sạn Grand Hotel Vũng Tàu</h2><p>Để đảm bảo chất lượng công trình, quá trình <strong>thi công sơn khách sạn</strong> cần được thực hiện bài bản theo các bước:</p><h3>1. Khảo Sát Hiện Trạng Công Trình</h3><p>Đội ngũ kỹ thuật kiểm tra:</p><ul><li><p>Mức độ bong tróc</p></li><li><p>Tình trạng thấm tường</p></li><li><p>Độ bám dính lớp sơn cũ</p></li><li><p>Khu vực cần xử lý chống thấm</p></li></ul><h3>2. Xử Lý Bề Mặt</h3><ul><li><p>Cạo bỏ lớp sơn cũ hư hỏng</p></li><li><p>Trám vá vết nứt</p></li><li><p>Vệ sinh bề mặt sạch bụi bẩn</p></li><li><p>Thi công chống thấm tại các khu vực cần thiết</p></li></ul><h3>3. Thi Công Sơn Lót Và Sơn Phủ</h3><p>Sử dụng các dòng:</p><ul><li><p>Sơn nội thất cao cấp</p></li><li><p>Sơn ngoại thất chống muối biển</p></li><li><p>Sơn chống thấm</p></li><li><p>Sơn chống rong rêu, chống bám bụi</p></li></ul><h3>4. Kiểm Tra Và Bàn Giao</h3><p>Sau thi công sẽ tiến hành:</p><ul><li><p>Kiểm tra độ đều màu</p></li><li><p>Kiểm tra độ phủ</p></li><li><p>Vệ sinh hoàn thiện công trình</p></li><li><p>Bàn giao đúng tiến độ</p></li></ul><h2>Lợi Ích Khi Chọn Đơn Vị Thi Công Sơn Chuyên Nghiệp</h2><p>Một đơn vị thi công uy tín sẽ giúp khách sạn:</p><ul><li><p>Tiết kiệm chi phí bảo trì</p></li><li><p>Đảm bảo tiến độ nhanh chóng</p></li><li><p>Thi công an toàn, sạch sẽ</p></li><li><p>Tư vấn màu sắc phù hợp phong cách khách sạn</p></li><li><p>Sử dụng sơn chính hãng, độ bền cao</p></li></ul><h2>Sơn Nước Hoàng Quang Minh – Đơn Vị Cung Cấp Sơn &amp; Thi Công Sơn Tại Vũng Tàu</h2><p>Nếu bạn đang cần tìm đơn vị <strong>thi công sơn khách sạn tại Vũng Tàu</strong>, <strong>sơn lại khách sạn</strong>, <strong>thi công chống thấm khách sạn</strong>, hãy liên hệ:</p><h3>Sơn Nước Hoàng Quang Minh</h3><ul><li><p>Đại lý sơn chính hãng: Nasun – Dulux – Jotun – Kova</p></li><li><p>Nhận thi công sơn nhà, khách sạn, biệt thự, công trình</p></li><li><p>Hỗ trợ khảo sát và tư vấn tận nơi</p></li><li><p>Giao hàng nhanh tại khu vực Vũng Tàu</p></li></ul><p>📍 Địa chỉ: 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 Hotline: 0963.910.248</p><h2>Từ Khóa SEO Được Tối Ưu Trong Bài</h2><ul><li><p>thi công sơn lại khách sạn Grand Hotel Vũng Tàu</p></li><li><p>sơn lại khách sạn Vũng Tàu</p></li><li><p>thi công sơn khách sạn</p></li><li><p>sơn nước Vũng Tàu</p></li><li><p>thi công chống thấm khách sạn</p></li><li><p>đơn vị thi công sơn tại Vũng Tàu</p></li><li><p>sơn khách sạn cao cấp</p></li><li><p>sơn ngoại thất khách sạn ven biển</p></li></ul><p></p>',0,'2026-05-14 22:42:14','2026-05-14 22:42:14');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `slug` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `details` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort_order` smallint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `slug` (`slug`) USING BTREE,
  KEY `idx_slug` (`slug`) USING BTREE,
  KEY `idx_sort` (`sort_order`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (1,'dich-vu-thi-cong-son-nuoc-uy-tin-tai-vung-tau-ben-dep-theo-thoi-gian','Dịch Vụ Thi Công Sơn Nước Uy Tín Tại Vũng Tàu – Bền Đẹp Theo Thời Gian','<p>Bạn đang tìm kiếm <strong>dịch vụ thi công sơn nước chuyên nghiệp tại Vũng Tàu</strong> với chất lượng cao, giá hợp lý và bảo hành rõ ràng? Sơn Nước Hoàng Quang Minh chính là lựa chọn đáng tin cậy dành cho bạn.</p>','<h3>🎨 Dịch vụ thi công sơn nước là gì?</h3><p>Thi công sơn nước là quá trình xử lý bề mặt tường (nội thất &amp; ngoại thất) và phủ lớp sơn hoàn thiện nhằm:</p><ul><li><p>Bảo vệ công trình khỏi ẩm mốc, rong rêu</p></li><li><p>Tăng tính thẩm mỹ cho ngôi nhà</p></li><li><p>Kéo dài tuổi thọ tường và kết cấu</p></li></ul><p>Đặc biệt tại khu vực ven biển như Vũng Tàu, việc lựa chọn đúng loại sơn và đơn vị thi công là yếu tố cực kỳ quan trọng.</p><hr><h3>🔧 Quy trình thi công sơn nước chuyên nghiệp</h3><p>Tại Hoàng Quang Minh, quy trình thi công được thực hiện bài bản:</p><ol><li><p>Khảo sát công trình thực tế</p></li><li><p>Tư vấn loại sơn phù hợp (nội thất – ngoại thất – chống thấm)</p></li><li><p>Xử lý bề mặt (trám trét, chống nứt, chống thấm)</p></li><li><p>Sơn lót kháng kiềm</p></li><li><p>Sơn phủ hoàn thiện (2 lớp trở lên)</p></li><li><p>Kiểm tra &amp; bàn giao công trình</p></li></ol><p>👉 Cam kết thi công đúng kỹ thuật – không cắt giảm quy trình.</p><hr><h3>🌊 Vì sao nên chọn dịch vụ sơn tại Vũng Tàu chuyên nghiệp?</h3><p>Khí hậu biển có độ ẩm cao, hơi muối nhiều khiến tường dễ:</p><ul><li><p>Bong tróc sơn</p></li><li><p>Mốc xanh, rong rêu</p></li><li><p>Phai màu nhanh</p></li></ul><p>Do đó, sử dụng dịch vụ thi công chuyên nghiệp giúp:<br>✔️ Chọn đúng loại sơn chống muối, chống thấm<br>✔️ Thi công đúng kỹ thuật để tăng độ bền<br>✔️ Tiết kiệm chi phí sửa chữa lâu dài</p><hr><h3>🏆 Ưu điểm khi chọn Hoàng Quang Minh</h3><ul><li><p>Đại lý phân phối chính hãng: Nasun, Dulux, Jotun, Kova</p></li><li><p>Đội thợ tay nghề cao, thi công nhanh gọn</p></li><li><p>Tư vấn đúng nhu cầu – không bán sai sản phẩm</p></li><li><p>Nhận thi công trọn gói từ nhà dân đến công trình lớn</p></li><li><p>Giá cạnh tranh – hỗ trợ thầu &amp; chủ nhà</p></li></ul><hr><h3>💰 Báo giá thi công sơn nước (tham khảo)</h3><p>Giá thi công phụ thuộc vào:</p><ul><li><p>Diện tích công trình</p></li><li><p>Loại sơn sử dụng</p></li><li><p>Tình trạng tường (mới / cũ / cần xử lý)</p></li></ul><p>👉 Liên hệ trực tiếp để nhận báo giá chi tiết &amp; khảo sát miễn phí.</p><hr><h3>📍 Thông tin liên hệ</h3><p><strong>Sơn Nước Hoàng Quang Minh</strong><br>🏠 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu <br>📲 0963.910.248<br>🚚 Giao hàng &amp; hỗ trợ thi công nhanh trong ngày</p><hr><h3>🔍 Từ khóa SEO gợi ý:</h3><ul><li><p>thi công sơn nước Vũng Tàu</p></li><li><p>dịch vụ sơn nhà trọn gói</p></li><li><p>sơn chống thấm Vũng Tàu</p></li><li><p>thợ sơn nhà uy tín Vũng Tàu</p></li></ul><hr><p>👉 Nếu bạn cần <strong>sơn nhà đẹp – bền – tiết kiệm chi phí</strong>, hãy để Hoàng Quang Minh đồng hành từ tư vấn đến hoàn thiện công trình!</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824906/nasun-paint/trdlnttsm4iti414ioyw.png',0,'2026-05-03 23:15:06','2026-05-03 23:15:06'),(2,'dich-vu-thi-cong-chong-tham-vung-tau-uy-tin-giai-phap-ben-vung-cho-moi-cong-trinh','Dịch Vụ Thi Công Chống Thấm Vũng Tàu Uy Tín – Giải Pháp Bền Vững Cho Mọi Công Trình','<p>Bạn đang gặp tình trạng tường ẩm mốc, thấm nước, bong tróc sơn? Đừng để vấn đề nhỏ trở thành hư hỏng lớn! Sơn Nước Hoàng Quang Minh cung cấp <strong>dịch vụ thi công chống thấm chuyên nghiệp tại Vũng Tàu</strong>, cam kết xử lý triệt để – bảo hành dài hạn.</p>','<h3>💧 Chống thấm là gì? Vì sao cần thi công sớm?</h3><p>Chống thấm là quá trình sử dụng vật liệu chuyên dụng để ngăn nước thấm vào kết cấu công trình. Nếu không xử lý kịp thời, thấm nước có thể gây:</p><ul><li><p>Nứt tường, bong tróc sơn</p></li><li><p>Ẩm mốc, ảnh hưởng sức khỏe</p></li><li><p>Giảm tuổi thọ công trình</p></li></ul><p>Đặc biệt tại khu vực ven biển như Vũng Tàu, độ ẩm cao và hơi muối khiến tình trạng thấm diễn ra nhanh và nghiêm trọng hơn.</p><hr><h3>🔧 Các hạng mục chống thấm phổ biến</h3><p>Chúng tôi nhận thi công đa dạng hạng mục:</p><ul><li><p>Chống thấm tường nhà (nội &amp; ngoại thất)</p></li><li><p>Chống thấm sân thượng, mái bê tông</p></li><li><p>Chống thấm nhà vệ sinh, ban công</p></li><li><p>Chống thấm tầng hầm, bể nước</p></li><li><p>Xử lý nứt, chống thấm cổ ống, khe co giãn</p></li></ul><p>👉 Khảo sát tận nơi – tư vấn đúng giải pháp, không làm dư thừa.</p><hr><h3>⚙️ Quy trình thi công chống thấm chuyên nghiệp</h3><ol><li><p>Khảo sát thực tế – xác định nguyên nhân thấm</p></li><li><p>Tư vấn vật liệu phù hợp (gốc xi măng, Polyurethane, chống thấm ngược…)</p></li><li><p>Vệ sinh &amp; xử lý bề mặt</p></li><li><p>Thi công lớp chống thấm theo tiêu chuẩn kỹ thuật</p></li><li><p>Kiểm tra ngâm nước (test chống thấm)</p></li><li><p>Bàn giao &amp; bảo hành</p></li></ol><hr><h3>🏆 Vì sao nên chọn Hoàng Quang Minh?</h3><ul><li><p>Kinh nghiệm thi công thực tế nhiều công trình tại Vũng Tàu</p></li><li><p>Sử dụng vật liệu chính hãng: Nasun, Dulux, Jotun, Kova</p></li><li><p>Đội ngũ thợ tay nghề cao – xử lý triệt để, không làm lại nhiều lần</p></li><li><p>Báo giá rõ ràng – không phát sinh chi phí ẩn</p></li><li><p>Bảo hành dài hạn – hỗ trợ nhanh khi cần</p></li></ul><hr><h3>🌊 Giải pháp chống thấm phù hợp khí hậu Vũng Tàu</h3><p>Với đặc thù:</p><ul><li><p>Mưa nhiều, độ ẩm cao</p></li><li><p>Gió biển mang theo muối</p></li></ul><p>👉 Chúng tôi ưu tiên:<br>✔️ Vật liệu chống thấm đàn hồi cao<br>✔️ Khả năng kháng kiềm – chống muối<br>✔️ Kết hợp sơn phủ bảo vệ bên ngoài</p><hr><h3>💰 Báo giá thi công chống thấm (tham khảo)</h3><p>Chi phí phụ thuộc:</p><ul><li><p>Diện tích cần xử lý</p></li><li><p>Mức độ thấm (nhẹ – nặng – thấm lâu năm)</p></li><li><p>Loại vật liệu sử dụng</p></li></ul><p>📞 Liên hệ ngay để được khảo sát miễn phí &amp; báo giá chính xác.</p><hr><h3>📍 Thông tin liên hệ</h3><p><strong>Sơn Nước Hoàng Quang Minh</strong><br>🏠 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu <br>📲 0963.910.248<br>🚚 Hỗ trợ nhanh – có mặt tận nơi</p><hr><h3>🔍 Từ khóa SEO gợi ý</h3><ul><li><p>chống thấm Vũng Tàu</p></li><li><p>dịch vụ chống thấm nhà</p></li><li><p>chống thấm sân thượng hiệu quả</p></li><li><p>chống thấm tường nhà triệt để</p></li></ul><hr><p>👉 Đừng để thấm dột làm giảm giá trị ngôi nhà của bạn. Chọn dịch vụ <strong>chống thấm chuyên nghiệp – bền lâu – tiết kiệm</strong> cùng Hoàng Quang Minh ngay hôm nay!</p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777824962/nasun-paint/anyv0xc91ol7qgqmvsbz.png',0,'2026-05-03 23:16:00','2026-05-03 23:16:00'),(3,'trai-nghiem-son-nha-tai-vung-tau-khong-gian-moi-cam-giac-moi','Trải Nghiệm Sơn Nhà Tại Vũng Tàu – Không Gian Mới, Cảm Giác Mới','<p>Trải nghiệm thực tế khi sơn nhà tại Vũng Tàu với giải pháp sơn nước chuyên nghiệp, bền màu và chống thấm hiệu quả. Chia sẻ quá trình lựa chọn sơn Jotun, đội thợ thi công uy tín cùng bí quyết giúp không gian luôn đẹp và sạch như mới trong điều kiện khí hậu biển.</p>','<p>Sống ở Vũng Tàu nhiều năm, tôi nhận ra thời tiết biển ảnh hưởng khá nhiều đến chất lượng tường nhà. Nắng nóng kéo dài, độ ẩm cao cùng hơi muối trong không khí khiến lớp sơn bên ngoài dần xuống màu, vài chỗ bắt đầu bong tróc và xuất hiện vết thấm nhẹ.</p><p>Sau một thời gian tìm hiểu các đơn vị thi công sơn nước tại Vũng Tàu, tôi quyết định chọn Sơn Nước Hoàng Quang Minh để cải tạo lại ngôi nhà của mình. Điều khiến tôi yên tâm ngay từ đầu là cách làm việc khá chuyên nghiệp và rõ ràng. Đội kỹ thuật đến khảo sát trực tiếp, kiểm tra từng khu vực rồi mới tư vấn loại sơn phù hợp với tình trạng thực tế của tường nhà.</p><p>Từ khâu chọn màu đến báo giá đều được tư vấn rất kỹ nên tôi cảm thấy khá thoải mái, không bị kiểu báo giá mập mờ như nhiều nơi khác.</p><p>Trong quá trình thi công, đội thợ làm việc đúng giờ và khá gọn gàng. Bề mặt tường được xử lý kỹ trước khi sơn nên màu lên đều, nhìn mịn và sạch hơn hẳn. Những khu vực từng bị thấm cũng được xử lý chống thấm cẩn thận trước khi hoàn thiện.</p><p>Vì nhà ở khu vực gần biển nên tôi được tư vấn sử dụng sơn Jotun cho phần ngoại thất để tăng độ bền màu và hạn chế bám bẩn. Sau khi hoàn thiện, màu sơn nhìn sang và hiện đại hơn rất nhiều. Điều tôi thích nhất là ngôi nhà trông sáng hơn nhưng vẫn tạo cảm giác mát mắt, dễ chịu.</p><p>Ngoài thi công sơn nhà, Hoàng Quang Minh còn cung cấp sơn chính hãng và hỗ trợ thi công cho nhà phố, quán cà phê, văn phòng hay công trình dân dụng tại Vũng Tàu. Nếu cần tìm thợ sơn nước tại Vũng Tàu hoặc đại lý sơn Jotun chính hãng, đây cũng là địa chỉ khá đáng tham khảo.</p><p>Sau khi sơn xong, cảm giác như ngôi nhà được “thay áo mới”. Không chỉ đẹp hơn mà còn tạo cảm giác sạch sẽ, thoáng và có sức sống hơn rất nhiều. Với tôi, chọn đúng đơn vị thi công uy tín thật sự quan trọng không kém việc chọn màu sơn đẹp.</p><p>📍 Sơn Nước Hoàng Quang Minh<br>🏠 09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu<br>📲 0963.910.248 – 0973.507.903<br>🌐 <a target=\"_blank\" rel=\"noopener noreferrer nofollow\" class=\"text-blue-600 underline\" href=\"http://sonnuocvungtau.com.vn\">sonnuocvungtau.com.vn</a></p>','https://res.cloudinary.com/dzrfes6lm/image/upload/v1778506995/nasun-paint/hpzz0ofximvk7jqklwxt.png',0,'2026-05-11 20:43:56','2026-05-11 20:43:56');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `setting_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `setting_value` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`setting_key`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES ('about_content','<p>Trong lĩnh vực hoàn thiện công trình, việc lựa chọn đúng đơn vị cung cấp sơn và thi công đóng vai trò quyết định đến <strong>độ bền – thẩm mỹ – chi phí lâu dài</strong>. <strong>Công Ty TNHH XL Hoàng Quang Minh</strong> ra đời với sứ mệnh mang đến giải pháp sơn tối ưu, phù hợp thực tế sử dụng tại khu vực <strong>Vũng Tàu</strong> – nơi có khí hậu biển đặc thù, độ ẩm cao và dễ phát sinh ẩm mốc, bong tróc.</p><p>Với kinh nghiệm thực tế thi công nhiều công trình từ nhà dân đến chung cư, công ty không chỉ bán sơn mà còn <strong>đưa ra giải pháp tổng thể</strong> giúp khách hàng tiết kiệm chi phí nhưng vẫn đảm bảo chất lượng bền lâu.</p><hr><p></p><h3><strong>🎯 Lĩnh vực hoạt động chuyên sâu</strong></h3><ul><li><p>🎨 <strong>Phân phối sơn nước chính hãng</strong><br>Cung cấp đầy đủ các dòng sơn nội thất, ngoại thất, chống thấm, sơn chuyên dụng cho từng bề mặt.</p></li><li><p>🏠 <strong>Thi công sơn nhà trọn gói</strong><br>Nhà phố – căn hộ – biệt thự – khách sạn – chung cư, đảm bảo quy trình chuẩn và thẩm mỹ cao.</p></li><li><p>🔧 <strong>Sơn sửa &amp; cải tạo công trình cũ</strong><br>Xử lý triệt để tình trạng tường xuống cấp: bong tróc, nứt chân chim, ẩm mốc.</p></li><li><p>💧 <strong>Chống thấm chuyên sâu</strong><br>Giải quyết các điểm yếu như tường ngoài, sân thượng, nhà vệ sinh – khu vực thường xuyên chịu tác động nước.</p></li></ul><hr><h3><strong>💪 Thế mạnh tạo nên sự khác biệt</strong></h3><ul><li><p>✅ <strong>Tư vấn thực tế – đúng nhu cầu</strong><br>Không bán theo giá cao, mà tư vấn đúng loại sơn phù hợp từng công trình.</p></li><li><p>🎨 <strong>Sản phẩm chính hãng – đa thương hiệu</strong><br>Phân phối các dòng sơn uy tín như Nasun, Dulux, Jotun, Kova.</p></li><li><p>👷 <strong>Đội ngũ thi công tay nghề cao</strong><br>Kinh nghiệm thực tế nhiều công trình lớn nhỏ, thi công gọn gàng – đúng kỹ thuật.</p></li><li><p>🌊 <strong>Hiểu rõ khí hậu Vũng Tàu</strong><br>Giải pháp sơn tập trung vào <strong>chống ẩm – chống muối biển – chống rong rêu</strong>, giúp tăng tuổi thọ công trình.</p></li><li><p>💰 <strong>Chi phí hợp lý – tối ưu ngân sách</strong><br>Có chính sách tốt cho chủ nhà, nhà thầu và khách hàng thi công số lượng lớn.</p></li></ul><hr><p></p><h3><strong>🛠️ Quy trình thi công sơn chuyên nghiệp</strong></h3><p>Để đảm bảo chất lượng, Hoàng Quang Minh áp dụng quy trình thi công chuẩn:</p><ol><li><p>🔍 Khảo sát &amp; tư vấn trực tiếp công trình</p></li><li><p>🧱 Xử lý bề mặt: vệ sinh – trám vá – chống thấm</p></li><li><p>🎨 Thi công sơn lót kháng kiềm</p></li><li><p>🖌️ Phủ sơn hoàn thiện 2 lớp</p></li><li><p>✅ Nghiệm thu &amp; bàn giao</p></li></ol><p>👉 Quy trình này giúp lớp sơn <strong>bám chắc – đều màu – bền lâu theo thời gian</strong>.</p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777802161/nasun-paint/ukgwkff0sj6ediou3rwr.png\"><hr><p></p><h3><strong>🤝 Cam kết với khách hàng</strong></h3><ul><li><p>📌 100% <strong>sơn chính hãng – rõ nguồn gốc</strong></p></li><li><p>📌 Thi công đúng kỹ thuật – không làm ẩu</p></li><li><p>📌 Báo giá minh bạch – không phát sinh</p></li><li><p>📌 Bảo hành rõ ràng – hỗ trợ nhanh chóng</p></li></ul><hr><p></p><h3><strong>🚀 Tầm nhìn &amp; sứ mệnh</strong></h3><ul><li><p>🌟 <strong>Tầm nhìn:</strong> Trở thành đơn vị thi công sơn &amp; cung cấp vật liệu hoàn thiện uy tín hàng đầu tại Vũng Tàu</p></li><li><p>❤️ <strong>Sứ mệnh:</strong> Mang đến giải pháp sơn <strong>bền – đẹp – tiết kiệm – phù hợp thực tế sử dụng</strong></p></li></ul><hr><p></p><h3><strong>📞 Thông tin liên hệ</strong></h3><p><strong>Công Ty TNHH XL Hoàng Quang Minh</strong><br>📍 09 Phan Thanh Giản, P. Rạch Dừa, TP Hồ Chí Minh ( TP. Vũng Tàu cũ )<br>📲 0963.910.248 - 0973.507.903</p><img class=\"max-w-full h-auto rounded-lg\" src=\"https://res.cloudinary.com/dzrfes6lm/image/upload/v1777802020/nasun-paint/iakjwkozf0omjwrlrtah.png\"><p></p>',NULL,'2026-05-03 16:56:14'),('about_image','https://res.cloudinary.com/dzrfes6lm/image/upload/v1777802202/nasun-paint/opbpqit8bruajsiqaj2z.png',NULL,'2026-05-03 16:56:47'),('about_title','Công Ty TNHH XL Hoàng Quang Minh – Đại lý Sơn & Thi công uy tín tại Vũng Tàu',NULL,'2026-05-03 16:51:19'),('company_address','09 Phan Thanh Giản, P. Rạch Dừa, TP. Vũng Tàu','Địa chỉ','2026-05-02 23:54:37'),('company_email','info@example.com','Email liên hệ','2026-05-02 23:54:37'),('company_name','Công ty TNHH Sơn Mặt Trời Việt NaSun','Tên công ty đầy đủ','2026-05-02 23:54:37'),('company_phone','0963910248','Số điện thoại chính','2026-05-02 23:54:37'),('company_phone2','0973507903','Số hỗ trợ kỹ thuật','2026-05-02 23:54:37'),('facebook_url','https://facebook.com/','Facebook','2026-05-02 23:54:37'),('google_maps_embed','','Iframe Google Maps','2026-05-02 23:54:37'),('meta_description','Chuyên thi công sơn nước tại Vũng Tàu','Meta description mặc định','2026-05-02 23:54:37'),('site_name','Sơn Mặt Trời Việt NaSun','Tên website','2026-05-02 23:54:37'),('site_url','https://sonnuocvungtau.com.vn','URL website','2026-05-02 23:54:37'),('zalo_url','https://zalo.me/','Zalo','2026-05-02 23:54:37');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sliders`
--

DROP TABLE IF EXISTS `sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sliders` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `link_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` smallint NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_active` (`is_active`,`sort_order`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sliders`
--

LOCK TABLES `sliders` WRITE;
/*!40000 ALTER TABLE `sliders` DISABLE KEYS */;
INSERT INTO `sliders` VALUES (4,'https://res.cloudinary.com/dzrfes6lm/image/upload/v1777780810/nasun-paint/s4pkjegt6gedk4zny7fm.png','s4pkjegt6gedk4zny7fm',NULL,1,1,'2026-05-03 11:00:10'),(6,'https://res.cloudinary.com/dzrfes6lm/image/upload/v1777780858/nasun-paint/gsh0tjcqhhhex1vhogrp.png','gsh0tjcqhhhex1vhogrp',NULL,1,1,'2026-05-03 11:00:52'),(7,'https://res.cloudinary.com/dzrfes6lm/image/upload/v1777780872/nasun-paint/ztqz48vo38xlj3ubxg8u.png','ztqz48vo38xlj3ubxg8u',NULL,1,0,'2026-05-03 11:01:09');
/*!40000 ALTER TABLE `sliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `type` enum('deposit','purchase','refund') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` decimal(15,0) NOT NULL COMMENT 'Số tiền (VND)',
  `method` enum('bank_transfer','momo','card') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Phương thức nạp tiền',
  `status` enum('pending','completed','failed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Mã giao dịch bên ngoài',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_transactions_user` (`user_id`) USING BTREE,
  KEY `idx_transactions_type` (`type`) USING BTREE,
  KEY `idx_transactions_status` (`status`) USING BTREE,
  CONSTRAINT `fk_transactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','npp','user') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `balance` decimal(15,0) NOT NULL DEFAULT '0' COMMENT 'Số dư tài khoản (VND)',
  `avatar_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `google_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Google OAuth ID',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `username` (`username`) USING BTREE,
  KEY `idx_users_role` (`role`) USING BTREE,
  KEY `idx_users_google_id` (`google_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sontuong'
--

--
-- Dumping routines for database 'sontuong'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-27  1:30:05
