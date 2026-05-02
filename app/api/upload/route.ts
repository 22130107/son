/**
 * POST /api/upload — Upload ảnh lên Cloudinary
 * DELETE /api/upload — Xóa ảnh trên Cloudinary
 */
import { NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { requireAuth } from "@/lib/auth";
import { ok, badRequest, serverError } from "@/lib/api-response";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

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
    if (file.size > MAX_SIZE) {
      return badRequest("Ảnh không được vượt quá 5MB");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload lên Cloudinary
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: "nasun-paint",
              resource_type: "image",
            },
            (error, result) => {
              if (error || !result) return reject(error);
              resolve(result as { secure_url: string; public_id: string });
            }
          )
          .end(buffer);
      }
    );

    return ok(
      { url: result.secure_url, publicId: result.public_id },
      "Upload thành công"
    );
  } catch (err) {
    return serverError(err);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const auth = requireAuth(req);
    if (auth instanceof Response) return auth;

    const { url: fileUrl, publicId } = await req.json();

    // Ưu tiên xóa bằng publicId nếu có
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
      return ok(null, "Đã xóa file");
    }

    // Fallback: parse publicId từ URL Cloudinary
    if (fileUrl && typeof fileUrl === "string" && fileUrl.includes("cloudinary.com")) {
      // URL dạng: https://res.cloudinary.com/{cloud}/image/upload/v123/{folder}/{id}.ext
      const match = fileUrl.match(/\/upload\/(?:v\d+\/)?(.+)\.[^.]+$/);
      if (match) {
        await cloudinary.uploader.destroy(match[1]);
      }
      return ok(null, "Đã xóa file");
    }

    return badRequest("Thiếu publicId hoặc URL Cloudinary hợp lệ");
  } catch (err) {
    return serverError(err);
  }
}
