import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dùng webpack thay Turbopack để tránh bug trên Windows path có ký tự đặc biệt
  bundlePagesRouterDependencies: true,
  images: {
    unoptimized: true, // Tắt hoàn toàn Image Optimization
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
  },
  async redirects() {
    return [
      // Redirect trailing slash variants to canonical URLs
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
