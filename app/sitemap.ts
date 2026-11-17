import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";
import { getProductsFromDB, getProjectsFromDB, getServicesFromDB, getNewsFromDB } from "@/lib/db-data";

export const dynamic = "force-dynamic";

const BASE_URL = SITE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/gioi-thieu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/san-pham`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/cong-trinh`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/dich-vu`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tin-tuc`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/lien-he`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/gio-hang`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Fetch dynamic data from database with fallback if DB is unreachable
  try {
    const [products, projects, services, news] = await Promise.all([
      getProductsFromDB({ limit: 1000 }),
      getProjectsFromDB({ limit: 1000 }),
      getServicesFromDB(),
      getNewsFromDB({ limit: 1000 }),
    ]);

    // Product pages
    const productPages: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${BASE_URL}/san-pham/${p.slug}`,
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));

    // Project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
      url: `${BASE_URL}/cong-trinh/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

    // Service pages
    const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
      url: `${BASE_URL}/dich-vu/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    // News pages
    const newsPages: MetadataRoute.Sitemap = news.map((a) => ({
      url: `${BASE_URL}/tin-tuc/${a.slug}`,
      lastModified: new Date(a.publishedAt).toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [
      ...staticPages,
      ...productPages,
      ...projectPages,
      ...servicePages,
      ...newsPages,
    ];
  } catch (error) {
    console.warn("Failed to fetch dynamic sitemap data from database:", error);
    return staticPages;
  }
}
