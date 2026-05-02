/**
 * Fix tất cả URL Cloudinary từ http:// sang https:// trong DB
 * Chạy: node scripts/fix-cloudinary-urls.mjs
 */
import mysql from "mysql2/promise";
import { readFileSync } from "fs";

// Đọc .env.local
const env = Object.fromEntries(
  readFileSync(".env.local", "utf-8")
    .split("\n")
    .filter((l) => l.includes("=") && !l.startsWith("#"))
    .map((l) => l.split("=").map((s) => s.trim()))
);

const pool = mysql.createPool({
  host: env.DB_HOST ?? "localhost",
  port: Number(env.DB_PORT ?? 3306),
  database: env.DB_NAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
});

async function fix() {
  const conn = await pool.getConnection();
  try {
    const tables = [
      { table: "services",  col: "image" },
      { table: "projects",  col: "image" },
      { table: "products",  col: "thumbnail" },
    ];

    for (const { table, col } of tables) {
      const [result] = await conn.execute(
        `UPDATE ${table} SET ${col} = REPLACE(${col}, 'http://res.cloudinary.com', 'https://res.cloudinary.com') WHERE ${col} LIKE 'http://res.cloudinary.com%'`
      );
      console.log(`✅ ${table}.${col}: ${result.affectedRows} rows updated`);
    }

    // Kiểm tra còn sót không
    for (const { table, col } of tables) {
      const [rows] = await conn.execute(
        `SELECT COUNT(*) as cnt FROM ${table} WHERE ${col} LIKE 'http://res.cloudinary.com%'`
      );
      const cnt = rows[0].cnt;
      if (cnt > 0) {
        console.warn(`⚠️  ${table}.${col}: còn ${cnt} URL http chưa fix`);
      } else {
        console.log(`✔  ${table}.${col}: sạch`);
      }
    }
  } finally {
    conn.release();
    await pool.end();
  }
}

fix().catch(console.error);
