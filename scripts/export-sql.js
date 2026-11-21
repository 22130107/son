const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  database: process.env.DB_NAME || "sonuocvungtau",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  charset: "utf8mb4",
};

function escapeSql(val) {
  if (val === null || val === undefined) return "NULL";
  if (typeof val === "number") return val;
  if (typeof val === "boolean") return val ? 1 : 0;
  return "'" + String(val).replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, (char) => {
    switch (char) {
      case "\0": return "\\0";
      case "\x08": return "\\b";
      case "\x09": return "\\t";
      case "\x1a": return "\\z";
      case "\n": return "\\n";
      case "\r": return "\\r";
      case "\"":
      case "'":
      case "\\":
      case "%":
        return "\\" + char;
      default:
        return char;
    }
  }) + "'";
}

(async () => {
  const pool = mysql.createPool(DB_CONFIG);

  try {
    const [products] = await pool.query("SELECT * FROM products ORDER BY id ASC");
    const [images] = await pool.query("SELECT * FROM product_images ORDER BY id ASC");
    const [specs] = await pool.query("SELECT * FROM product_specs ORDER BY id ASC");

    let sql = `-- ========================================================\n`;
    sql += `-- FILE IMPORT SẢN PHẨM SƠN NƯỚC (29 SẢN PHẨM)\n`;
    sql += `-- Cơ sở dữ liệu: sonuocvungtau\n`;
    sql += `-- Ngày xuất: ${new Date().toISOString()}\n`;
    sql += `-- ========================================================\n\n`;
    sql += `SET NAMES utf8mb4;\n`;
    sql += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

    // 1. PRODUCTS
    sql += `-- --------------------------------------------------------\n`;
    sql += `-- Xóa dữ liệu cũ của bảng sản phẩm trước khi chèn mới\n`;
    sql += `-- --------------------------------------------------------\n`;
    sql += `DELETE FROM \`product_specs\`;\n`;
    sql += `DELETE FROM \`product_images\`;\n`;
    sql += `DELETE FROM \`products\`;\n`;
    sql += `ALTER TABLE \`products\` AUTO_INCREMENT = 1;\n`;
    sql += `ALTER TABLE \`product_images\` AUTO_INCREMENT = 1;\n`;
    sql += `ALTER TABLE \`product_specs\` AUTO_INCREMENT = 1;\n\n`;

    sql += `-- --------------------------------------------------------\n`;
    sql += `-- Bảng \`products\` (${products.length} sản phẩm)\n`;
    sql += `-- --------------------------------------------------------\n`;
    sql += `INSERT INTO \`products\` (\`id\`, \`slug\`, \`name\`, \`category\`, \`price\`, \`description\`, \`full_description\`, \`thumbnail\`, \`in_stock\`, \`sort_order\`) VALUES\n`;

    const productValues = products.map((p) => {
      return `(${p.id}, ${escapeSql(p.slug)}, ${escapeSql(p.name)}, ${escapeSql(p.category)}, ${escapeSql(p.price)}, ${escapeSql(p.description)}, ${escapeSql(p.full_description)}, ${escapeSql(p.thumbnail)}, ${p.in_stock}, ${p.sort_order})`;
    });
    sql += productValues.join(",\n") + ";\n\n";

    // 2. PRODUCT IMAGES
    sql += `-- --------------------------------------------------------\n`;
    sql += `-- Bảng \`product_images\` (${images.length} ảnh)\n`;
    sql += `-- --------------------------------------------------------\n`;
    sql += `INSERT INTO \`product_images\` (\`id\`, \`product_id\`, \`url\`, \`alt_text\`, \`sort_order\`) VALUES\n`;
    const imageValues = images.map((img) => {
      return `(${img.id}, ${img.product_id}, ${escapeSql(img.url)}, ${escapeSql(img.alt_text)}, ${img.sort_order})`;
    });
    sql += imageValues.join(",\n") + ";\n\n";

    // 3. PRODUCT SPECS
    sql += `-- --------------------------------------------------------\n`;
    sql += `-- Bảng \`product_specs\` (${specs.length} thông số kỹ thuật)\n`;
    sql += `-- --------------------------------------------------------\n`;
    sql += `INSERT INTO \`product_specs\` (\`id\`, \`product_id\`, \`spec_key\`, \`spec_value\`, \`sort_order\`) VALUES\n`;
    const specValues = specs.map((sp) => {
      return `(${sp.id}, ${sp.product_id}, ${escapeSql(sp.spec_key)}, ${escapeSql(sp.spec_value)}, ${sp.sort_order})`;
    });
    sql += specValues.join(",\n") + ";\n\n";

    sql += `SET FOREIGN_KEY_CHECKS = 1;\n`;
    sql += `-- HOÀN TẤT IMPORT SẢN PHẨM!\n`;

    const outPath = path.join(__dirname, "../database/import_products.sql");
    fs.writeFileSync(outPath, sql, "utf-8");
    console.log(`✅ Đã xuất thành công: ${outPath} (${(fs.statSync(outPath).size / 1024).toFixed(2)} KB)`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Lỗi xuất SQL:", err);
    process.exit(1);
  }
})();
