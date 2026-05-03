import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api"],
      },
      {
        userAgent: "*",
        allow: ["/api/products", "/api/services", "/api/projects", "/api/news"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
