/**
 * Helper functions for image URL handling
 */

/**
 * Normalize image URL - chỉ giữ lại URL đầy đủ https://...
 * Các đường dẫn khác sẽ trả về chuỗi rỗng
 */
export function normalizeImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  
  // Chỉ giữ lại URL đầy đủ (https://)
  if (url.startsWith("https://")) {
    return url;
  }
  
  // Các trường hợp khác trả về rỗng
  return "";
}
