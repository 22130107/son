import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbSchema } from "@/components/SchemaMarkup";
import Link from "next/link";
import { getServiceBySlugFromDB, getServicesFromDB } from "@/lib/db-data";

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
              dangerouslySetInnerHTML={{ __html: service.description }}
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
                dangerouslySetInnerHTML={{ __html: service.details }}
              />
            )}

            <Link
              href="/lien-he"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(232,184,0)] text-white font-bold rounded hover:bg-yellow-600 transition-colors"
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
