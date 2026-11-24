import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

const MIME_TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const pathSegments = resolvedParams?.path;

    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Bảo mật: Chống Directory Traversal
    const safePath = pathSegments.join("/");
    if (safePath.includes("..") || safePath.includes("\\")) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const filePath = path.join(UPLOAD_DIR, safePath);

    // Kiểm tra file có nằm đúng trong UPLOAD_DIR không
    if (!filePath.startsWith(UPLOAD_DIR)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!existsSync(filePath)) {
      return new NextResponse("File Not Found", { status: 404 });
    }

    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const fileBuffer = await readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileStat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
