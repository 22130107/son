import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { BreadcrumbSchema, ArticleSchema } from "@/components/SchemaMarkup";
import { getNewsBySlug, getAllNews } from "@/lib/queries/news";
import Link from "next/link";

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
    description: article.excerpt || article.title,
    alternates: {
      canonical: `https://example.com/tin-tuc/${slug}`,
    },
    openGraph: {
      title: `${article.title} | Sơn Mặt Trời Việt NaSun – Vũng Tàu`,
      description: article.excerpt || article.title,
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
              {article.excerpt && <p className="text-lg mb-4 font-medium">{article.excerpt}</p>}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
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
