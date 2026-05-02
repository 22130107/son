/**
 * SmartImage — hiển thị ảnh từ Cloudinary
 * Chỉ hỗ trợ URL đầy đủ (https://...)
 */

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}

export default function SmartImage({ src, alt, className = "" }: SmartImageProps) {
  // Chỉ hiển thị nếu là URL đầy đủ
  if (!src || !src.startsWith("https://")) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}
