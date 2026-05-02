-- Thêm user admin123 / Huyhoang123
-- Chạy file này trên MySQL để thêm tài khoản mà không reset DB

INSERT INTO admin_users (username, password_hash, full_name, role) VALUES
('admin123', '$2b$12$VTcktsJjKtYvci5PvW0JFOqqZycYDXPQfifCDH7aRvDRmQwLVErOi', 'Huy Hoàng', 'admin');
