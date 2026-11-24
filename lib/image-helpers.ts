/**
 * Helper functions for image URL handling
 */

/**
 * Normalize image URL - hỗ trợ cả URL đầy đủ (https://, http://) và đường dẫn nội bộ (/uploads/...)
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // Đường dẫn nội bộ (/uploads/..., /images/...)
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // URL tuyệt đối (https:// hoặc http://)
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }

  // Protocol-relative (//example.com/...)
  if (trimmed.startsWith("//")) {
    return "https:" + trimmed;
  }

  // Nếu chỉ là tên file thì trỏ về /uploads/
  return `/uploads/${trimmed}`;
}
