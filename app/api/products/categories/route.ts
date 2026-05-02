import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export const dynamic = "force-dynamic";

/**
 * GET /api/products/categories
 * Lấy danh sách danh mục sản phẩm và số lượng sản phẩm trong mỗi danh mục
 */
export async function GET() {
  try {
    const categories = await query<{ category: string; count: number }>(
      `SELECT category, COUNT(*) as count 
       FROM products 
       WHERE in_stock = 1 
       GROUP BY category 
       ORDER BY count DESC, category ASC`
    );

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching product categories:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Lỗi khi lấy danh mục sản phẩm",
      },
      { status: 500 }
    );
  }
}
