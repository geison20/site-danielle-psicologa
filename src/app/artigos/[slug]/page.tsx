import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, CalendarDays, UserRound } from "lucide-react";
import { notFound } from "next/navigation";
import { cache } from "react";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublicSiteContent } from "@/lib/content-store";
import { absoluteUrl, siteConfig } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

const getArticle = cache(async (slug: string) => {
  const content = await getPublicSiteContent();
  return content.articles.find(
    (article) =>
      article.published && article.kind === "article" && article.slug === slug,
  );
});

function formattedDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const url = absoluteUrl(`/artigos/${article.slug}`);
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url,
      title: article.title,
      description: article.description,
      publishedTime: `${article.publishedAt}T12:00:00.000Z`,
      authors: [article.author],
      images: [{ url: absoluteUrl(article.imageUrl), alt: article.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [absoluteUrl(article.imageUrl)],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const { contact } = (await getPublicSiteContent()).settings;
  const articleUrl = absoluteUrl(`/artigos/${article.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: absoluteUrl(article.imageUrl),
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    mainEntityOfPage: articleUrl,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Person", name: siteConfig.name },
  };

  const paragraphs = article.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <header role="banner">
        <Navbar contact={contact} />
      </header>
      <main id="conteudo-principal" className="min-h-screen bg-cream-light">
        <article>
          <div className="section-container pb-10 pt-28 sm:pt-32 lg:pt-36">
            <Link
              href="/#artigos"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-green-dark transition hover:text-heading"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para artigos e leituras
            </Link>

            <div className="mx-auto mt-7 max-w-4xl text-center">
              <span className="eyebrow">{article.category}</span>
              <h1 className="heading-xl text-balance text-heading">
                {article.title}
              </h1>
              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-foreground sm:text-xl">
                {article.description}
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-foreground/75">
                <span className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-green-dark" />
                  {article.author}
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-green-dark" />
                  <time dateTime={article.publishedAt}>
                    {formattedDate(article.publishedAt)}
                  </time>
                </span>
              </div>
            </div>

            <div className="relative mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-[2rem] border border-green/15 bg-green/5 shadow-[0_24px_70px_-42px_rgba(23,60,50,0.6)]">
              <Image
                src={article.imageUrl}
                alt={article.imageAlt}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>

          <div className="bg-white">
            <div className="mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
              <div className="space-y-6 text-[1.0625rem] leading-8 text-foreground sm:text-lg sm:leading-9">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 24)}`}
                    className="whitespace-pre-line"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-12 border-t border-green/15 pt-8">
                <Link
                  href="/#artigos"
                  className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-green/25 bg-white px-5 text-sm font-bold text-heading transition hover:bg-green/5"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Ver outros artigos e leituras
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>
      <footer role="contentinfo">
        <Footer contact={contact} />
      </footer>
      <FloatingWhatsAppButton contact={contact} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
