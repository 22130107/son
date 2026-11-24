/**
 * Nén ảnh phía trình duyệt (Client-side) trước khi gửi lên server.
 * Giúp giảm dung lượng từ 5-15MB xuống còn 100-300KB trong ~0.1s,
 * tăng tốc độ upload lên VPS gấp 10-20 lần và không làm quá tải CPU/RAM của server.
 */
export async function compressImageBeforeUpload(
  file: File,
  maxWidth = 1920,
  quality = 0.82
): Promise<File> {
  // Bỏ qua nếu là file GIF (để giữ animation) hoặc SVG
  if (file.type === "image/gif" || file.type === "image/svg+xml") {
    return file;
  }

  // Nếu file đã là WebP và dưới 400KB thì không cần nén lại
  if (file.type === "image/webp" && file.size <= 400 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    // Dùng Image element để nén qua HTML5 Canvas
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;

      // Giữ tỷ lệ, giới hạn chiều rộng tối đa
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file); // Fallback gửi file gốc nếu không lấy được 2d context
        return;
      }

      // Vẽ ảnh lên canvas
      ctx.drawImage(img, 0, 0, width, height);

      // Chuyển sang định dạng WebP với quality chỉ định
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }

          // Đổi tên đuôi file thành .webp
          const baseName = file.name.replace(/\.[^.]+$/, "");
          const compressedFile = new File([blob], `${baseName}.webp`, {
            type: "image/webp",
            lastModified: Date.now(),
          });

          // Nếu nén xong mà dung lượng lớn hơn file gốc (hiếm khi xảy ra), dùng file gốc
          if (compressedFile.size >= file.size) {
            resolve(file);
          } else {
            resolve(compressedFile);
          }
        },
        "image/webp",
        quality
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(file); // Fallback gửi file gốc nếu lỗi đọc ảnh
    };

    img.src = objectUrl;
  });
}
