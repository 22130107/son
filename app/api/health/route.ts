/**
 * GET /api/health — Kiểm tra kết nối database
 */
import pool from "@/lib/db";
import { ok, serverError } from "@/lib/api-response";

export async function GET() {
  try {
    const conn = await pool.getConnection();
    await conn.execute("SELECT 1");
    conn.release();

    return ok({ status: "ok" }, "Hệ thống hoạt động bình thường");
  } catch (err) {
    console.error("[Health Check Failed]", err);
    return serverError("Không thể kết nối cơ sở dữ liệu");
  }
}
