import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import Link from "next/link";
import { getServiceBySlugFromDB, getServicesFromDB } from "@/lib/db-data";
import { COMPANY_INFO } from "@/lib/data";
import { sanitizeHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlugFromDB(slug);
  if (!service) return {};

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `https://example.com/dich-vu/${slug}`,
    },
    openGraph: {
      title: `${service.title} | Sơn Mặt Trời Việt NaSun – Vũng Tàu`,
      description: service.description,
      url: `https://example.com/dich-vu/${slug}`,
      type: "website",
      images: [{ url: service.image, alt: service.title }],
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlugFromDB(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Dịch vụ", href: "/dich-vu" },
    { label: service.title },
  ];

  return (
    <div className="bg-[rgb(246,247,249)] min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <Header />
      <main id="main" className="py-4 pb-16">
        <div className="max-w-[1320px] mx-auto px-4">
          {/* Breadcrumb */}
          <div className="bg-white flex items-center min-h-[60px] px-4 mb-4 rounded">
            <Breadcrumb items={breadcrumbs} />
          </div>

          <div className="bg-white p-6 rounded">
            <h1 className="text-2xl font-bold text-[rgb(26,58,143)] mb-4 uppercase">
              {service.title}
            </h1>

            <div className="relative aspect-[16/9] mb-6 rounded overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={`${service.title} - Sơn nước Mặt Trời Việt NaSun Vũng Tàu`}
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="text-gray-700 text-lg leading-relaxed mb-4 prose prose-lg max-w-none
                [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-gray-800
                [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-gray-800
                [&_p]:mb-3 [&_p]:leading-relaxed
                [&_ul]:list-none [&_ul]:space-y-1 [&_ul]:mb-3
                [&_li]:pl-0 [&_li]:leading-relaxed
                [&_strong]:font-semibold [&_strong]:text-gray-900
                [&_em]:italic
                [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto"
              dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.description) }}
            />

            {service.details && (
              <div 
                className="text-gray-700 leading-relaxed mb-6 prose max-w-none
                  [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-gray-800
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-gray-800
                  [&_p]:mb-3 [&_p]:leading-relaxed
                  [&_ul]:list-none [&_ul]:space-y-1 [&_ul]:mb-3
                  [&_li]:pl-0 [&_li]:leading-relaxed
                  [&_strong]:font-semibold [&_strong]:text-gray-900
                  [&_em]:italic
                  [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(service.details) }}
              />
            )}

            {/* Contact buttons */}
            <div className="flex flex-wrap gap-3 mb-4">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="flex items-center gap-2 px-5 py-2.5 bg-[rgb(232,184,0)] text-white font-bold rounded text-sm hover:bg-yellow-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {COMPANY_INFO.phone}
              </a>
              <a
                href={COMPANY_INFO.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#0068ff] text-white font-bold rounded text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                </svg>
                Chat Zalo
              </a>
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#3b5998] text-white font-bold rounded text-sm hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Facebook
              </a>
            </div>

            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(26,58,143)] text-white font-bold rounded hover:opacity-90 transition-opacity"
            >
              Liên hệ tư vấn
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
