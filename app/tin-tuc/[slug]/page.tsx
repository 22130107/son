import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbSchema, ArticleSchema } from "@/components/SchemaMarkup";
import { getNewsBySlug, getAllNews } from "@/lib/queries/news";
import Link from "next/link";
import { COMPANY_INFO } from "@/lib/data";
import { sanitizeHtml, stripHtml } from "@/lib/sanitize";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: stripHtml(article.excerpt) || article.title,
    alternates: {
      canonical: `https://example.com/tin-tuc/${slug}`,
    },
    openGraph: {
      title: `${article.title} | Sơn Mặt Trời Việt NaSun – Vũng Tàu`,
      description: stripHtml(article.excerpt) || article.title,
      url: `https://example.com/tin-tuc/${slug}`,
      type: "article",
      images: [{ url: article.image, alt: article.title }],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) notFound();

  const { rows: allNews } = await getAllNews({ published: true, limit: 100 });
  const related = allNews
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  const breadcrumbs = [
    { label: "Trang chủ", href: "/" },
    { label: "Tin tức", href: "/tin-tuc" },
    { label: article.title },
  ];

  return (
    <div className="bg-[rgb(246,247,249)] min-h-screen">
      <BreadcrumbSchema items={breadcrumbs} />
      <ArticleSchema
        title={article.title}
        image={article.image}
        publishedAt={article.published_at}
        url={`/tin-tuc/${slug}`}
      />
      <Header />
      <main id="main" className="py-4 pb-16">
        <div className="max-w-[1320px] mx-auto px-4">
          {/* Breadcrumb */}
          <div className="bg-white flex items-center min-h-[60px] px-4 mb-4 rounded">
            <Breadcrumb items={breadcrumbs} />
          </div>

          <div className="bg-white p-6 rounded mb-4">
            <span className="text-xs text-[rgb(232,184,0)] font-medium uppercase">
              {article.category}
            </span>
            <h1 className="text-2xl font-bold text-[rgb(26,58,143)] mt-1 mb-2">
              {article.title}
            </h1>
            <p className="text-sm text-gray-400 mb-4">
              Ngày đăng:{" "}
              {new Date(article.published_at).toLocaleDateString("vi-VN")} • {article.views.toLocaleString()} lượt xem
            </p>

            <div className="relative aspect-[16/9] mb-6 rounded overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={article.image}
                alt={`${article.title} - Sơn nước Mặt Trời Việt NaSun`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {article.excerpt && <p className="text-lg mb-4 font-medium">{stripHtml(article.excerpt)}</p>}
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(article.content) }} />
            </div>

            {/* Contact buttons */}
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
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
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div className="bg-white p-6 rounded">
              <h2 className="font-bold text-xl text-[rgb(26,58,143)] mb-4 uppercase">
                Bài viết liên quan
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((a) => (
                  <Link
                    key={a.id}
                    href={`/tin-tuc/${a.slug}`}
                    className="group block rounded overflow-hidden border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={a.image}
                        alt={a.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-[rgb(26,58,143)] text-sm line-clamp-2 group-hover:text-[rgb(232,184,0)] transition-colors">
                        {a.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
