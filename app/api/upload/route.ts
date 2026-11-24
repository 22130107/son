/**
 * POST /api/upload — Upload ảnh, tự động nén WebP và lưu vào public/uploads/
 * GET /api/upload — Lấy danh sách ảnh trong kho public/uploads/
 * DELETE /api/upload — Xóa ảnh trên local hoặc Cloudinary (fallback)
 */
import { NextRequest } from "next/server";
import { writeFile, mkdir, readdir, stat, unlink } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import sharp from "sharp";
import { v2 as cloudinary } from "cloudinary";
import { requireAuth } from "@/lib/auth";
import { ok, badRequest, serverError } from "@/lib/api-response";

// Tối ưu sharp cho môi trường VPS cấu hình thấp: giới hạn 1 luồng và tắt cache RAM
sharp.concurrency(1);
sharp.cache(false);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];
const MAX_INPUT_SIZE = 15 * 1024 * 1024; // 15MB đầu vào cho phép nén

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

/**
 * GET /api/upload — Lấy danh sách ảnh trong kho
 */
export async function GET(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof Response) return auth;

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    const search = req.nextUrl.searchParams.get("search")?.toLowerCase().trim() || "";
    const entries = await readdir(UPLOAD_DIR, { withFileTypes: true });

    const validExtensions = [".webp", ".jpg", ".jpeg", ".png", ".gif", ".svg"];
    const files = [];

    for (const entry of entries) {
      if (!entry.isFile()) continue;
      const ext = path.extname(entry.name).toLowerCase();
      if (!validExtensions.includes(ext)) continue;

      if (search && !entry.name.toLowerCase().includes(search)) {
        continue;
      }

      const filePath = path.join(UPLOAD_DIR, entry.name);
      const fileStat = await stat(filePath);

      files.push({
        fileName: entry.name,
        url: `/uploads/${entry.name}`,
        size: fileStat.size,
        createdAt: fileStat.mtime.toISOString(),
      });
    }

    // Sắp xếp file mới nhất lên đầu
    files.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return ok(files, "Lấy danh sách ảnh thành công");
  } catch (err) {
    return serverError(err);
  }
}

/**
 * POST /api/upload — Upload ảnh, nén WebP và lưu vào public/uploads/
 */
export async function POST(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof Response) return auth;

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) return badRequest("Không có file được gửi lên");
    if (!ALLOWED_TYPES.includes(file.type)) {
      return badRequest("Chỉ chấp nhận ảnh JPG, PNG, WebP, GIF");
    }
    if (file.size > MAX_INPUT_SIZE) {
      return badRequest("Dung lượng ảnh gốc không được vượt quá 15MB");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!existsSync(UPLOAD_DIR)) {
      await mkdir(UPLOAD_DIR, { recursive: true });
    }

    // Tạo tên file an toàn (bỏ dấu tiếng Việt, loại bỏ ký tự lạ)
    const ext = path.extname(file.name).toLowerCase();
    const baseName = path.basename(file.name, ext);
    const safeName = baseName
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 50) || "image";

    const fileName = `${Date.now()}-${safeName}.webp`;
    const targetPath = path.join(UPLOAD_DIR, fileName);

    // Xử lý nén WebP với Sharp (resize max width 1920px, giữ tỷ lệ, quality 80)
    const webpBuffer = await sharp(buffer)
      .rotate() // Giữ đúng chiều ảnh theo EXIF
      .resize({ width: 1920, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    await writeFile(targetPath, webpBuffer);

    const url = `/uploads/${fileName}`;

    return ok(
      {
        url,
        fileName,
        size: webpBuffer.length,
      },
      "Upload và nén WebP thành công"
    );
  } catch (err) {
    return serverError(err);
  }
}

/**
 * DELETE /api/upload — Xóa ảnh
 */
export async function DELETE(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof Response) return auth;

    const body = await req.json().catch(() => ({}));
    const { url: fileUrl, fileName, publicId } = body;

    let targetFileName = fileName;
    if (!targetFileName && fileUrl && typeof fileUrl === "string") {
      if (fileUrl.startsWith("/uploads/")) {
        targetFileName = path.basename(fileUrl);
      }
    }

    // 1. Xóa file trên local nếu có targetFileName
    if (targetFileName && typeof targetFileName === "string") {
      if (
        targetFileName.includes("..") ||
        targetFileName.includes("/") ||
        targetFileName.includes("\\")
      ) {
        return badRequest("Tên file không hợp lệ");
      }

      const filePath = path.join(UPLOAD_DIR, targetFileName);
      if (existsSync(filePath)) {
        await unlink(filePath);
        return ok(null, "Đã xóa file trên server");
      }
    }

    // 2. Fallback: Xóa ảnh trên Cloudinary nếu là link cũ
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      return ok(null, "Đã xóa file trên Cloudinary");
    }

    if (fileUrl && typeof fileUrl === "string" && fileUrl.includes("cloudinary.com")) {
      const match = fileUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
      if (match) {
        await cloudinary.uploader.destroy(match[1]);
        return ok(null, "Đã xóa file trên Cloudinary");
      }
    }

    return badRequest("Không tìm thấy file để xóa hoặc đường dẫn không hợp lệ");
  } catch (err) {
    return serverError(err);
  }
}
