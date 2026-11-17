/**
 * GET /api/health — Kiểm tra kết nối database
 */
import pool from "@/lib/db";
import { ok, serverError } from "@/lib/api-response";

export async function GET() {
  try {
    const conn = await pool.getConnection();
    try {
      await conn.execute("SELECT 1");
    } finally {
      conn.release();
    }

    return ok({ status: "connected" }, "Kết nối database thành công");
  } catch (err) {
    console.error("[Health Check Failed]", err);
    return serverError("Không thể kết nối cơ sở dữ liệu");
  }
}
