"use client";

/**
 * SmartImage — hiển thị ảnh từ bất kỳ nguồn nào:
 * - Cloudinary (https://res.cloudinary.com/...)
 * - Local uploads (/uploads/...)
 * - External URLs (https://...)
 *
 * Dùng <img> thông thường để tránh Next.js image optimization cache issues.
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
