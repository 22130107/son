/**
 * GET /api/admin/fix-urls?secret=xxx
 * Fix tất cả URL Cloudinary http:// → https:// trong DB
 * XÓA file này sau khi chạy xong!
 */
import { NextRequest } from "next/server";
import { execute, query } from "@/lib/db";

export async function GET(req: NextRequest) {
  // Bảo vệ bằng secret key
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.JWT_SECRET?.slice(0, 16)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results: Record<string, number> = {};

  // Fix services.image
  const r1 = await execute(
    `UPDATE services SET image = REPLACE(image, 'http://res.cloudinary.com', 'https://res.cloudinary.com') WHERE image LIKE 'http://res.cloudinary.com%'`
  );
  results["services.image"] = r1.affectedRows;

  // Fix projects.image
  const r2 = await execute(
    `UPDATE projects SET image = REPLACE(image, 'http://res.cloudinary.com', 'https://res.cloudinary.com') WHERE image LIKE 'http://res.cloudinary.com%'`
  );
  results["projects.image"] = r2.affectedRows;

  // Fix products.thumbnail
  const r3 = await execute(
    `UPDATE products SET thumbnail = REPLACE(thumbnail, 'http://res.cloudinary.com', 'https://res.cloudinary.com') WHERE thumbnail LIKE 'http://res.cloudinary.com%'`
  );
  results["products.thumbnail"] = r3.affectedRows;

  // Fix sliders.image
  const r4 = await execute(
    `UPDATE sliders SET image = REPLACE(image, 'http://res.cloudinary.com', 'https://res.cloudinary.com') WHERE image LIKE 'http://res.cloudinary.com%'`
  );
  results["sliders.image"] = r4.affectedRows;

  // Kiểm tra còn sót không
  const remaining = await query<{ tbl: string; cnt: number }>(
    `SELECT 'services' as tbl, COUNT(*) as cnt FROM services WHERE image LIKE 'http://res.cloudinary.com%'
     UNION ALL SELECT 'projects', COUNT(*) FROM projects WHERE image LIKE 'http://res.cloudinary.com%'
     UNION ALL SELECT 'products', COUNT(*) FROM products WHERE thumbnail LIKE 'http://res.cloudinary.com%'
     UNION ALL SELECT 'sliders', COUNT(*) FROM sliders WHERE image LIKE 'http://res.cloudinary.com%'`
  );

  return Response.json({
    success: true,
    updated: results,
    remaining,
    message: "Xong! Hãy xóa file app/api/admin/fix-urls/route.ts sau khi kiểm tra.",
  });
}
