import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dùng webpack thay Turbopack để tránh bug trên Windows path có ký tự đặc biệt
  bundlePagesRouterDependencies: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: "https",
        hostname: "sonnuocvungtau.com",
      },
      {
        protocol: "https",
        hostname: "*.googleapis.com",
      },
      // Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    // Cho phép tất cả ảnh local
    localPatterns: [
      {
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    // Không cache ảnh - luôn serve ảnh mới nhất
    minimumCacheTTL: 0,
  },
  async redirects() {
    return [
      // Redirect trailing slash variants to canonical URLs
    ];
  },
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
