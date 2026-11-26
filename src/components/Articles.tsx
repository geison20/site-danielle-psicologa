import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, BookOpen, CalendarDays } from "lucide-react";
import type { ContentArticle } from "@/lib/content-types";

function formattedDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

function ArticleLink({
  article,
  className,
  ariaLabel,
  children,
}: {
  article: ContentArticle;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  if (article.kind === "article") {
    return (
      <Link
        href={`/artigos/${article.slug}`}
        className={className}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <a
      href={article.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

function ArticleMeta({ article }: { article: ContentArticle }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-foreground/75">
      <span>
        Por <strong className="text-heading">{article.author}</strong>
      </span>
      <span aria-hidden="true">•</span>
      <span className="flex items-center gap-1.5">
        <CalendarDays className="h-4 w-4 text-green-dark" />
        <time dateTime={article.publishedAt}>
          {formattedDate(article.publishedAt)}
        </time>
      </span>
    </div>
  );
}

function ReadingType({ article }: { article: ContentArticle }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
      <span className="rounded-full bg-green/10 px-3 py-1.5 text-green-dark">
        {article.category}
      </span>
      <span className="rounded-full bg-cream-dark/70 px-3 py-1.5 text-foreground">
        {article.kind === "article" ? "Artigo autoral" : "Leitura externa"}
      </span>
    </div>
  );
}

function callToAction(article: ContentArticle): string {
  return article.kind === "article" ? "Ler artigo" : `Ler no ${article.source}`;
}

export default function Articles({ articles }: { articles: ContentArticle[] }) {
  if (articles.length === 0) return null;

  const featured = articles.find((article) => article.featured) || articles[0];
  const remaining = articles.filter((article) => article.id !== featured.id);

  return (
    <section
      id="artigos"
      aria-labelledby="articles-heading"
      className="overflow-hidden bg-cream-light"
    >
      <div className="section-container">
        <header className="mb-8 max-w-3xl md:mb-12">
          <span className="eyebrow">
            <BookOpen className="h-3.5 w-3.5" />
            Para ler com calma
          </span>
          <h2 id="articles-heading" className="heading-lg">
            Artigos e leituras
          </h2>
          <p className="section-lead max-w-2xl">
            Conteúdos autorais e leituras confiáveis sobre saúde mental,
            maternidade e relações familiares.
          </p>
        </header>

        <article className="group overflow-hidden rounded-[2rem] border border-green/15 bg-white shadow-[0_20px_60px_-38px_rgba(34,82,68,0.5)]">
          <div className="grid md:grid-cols-[minmax(300px,0.85fr)_1.15fr]">
            <ArticleLink
              article={featured}
              className="relative block min-h-[260px] overflow-hidden md:min-h-[400px]"
              ariaLabel={`Ler: ${featured.title}`}
            >
              <Image
                src={featured.imageUrl}
                alt={featured.imageAlt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 767px) 100vw, 45vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-heading/55 via-transparent to-transparent"
                aria-hidden="true"
              />
              <span className="absolute left-5 top-5 rounded-full border border-white/30 bg-heading/75 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                Conteúdo em destaque
              </span>
            </ArticleLink>

            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-12">
              <ReadingType article={featured} />
              <h3 className="mt-5 max-w-3xl font-heading text-2xl font-bold leading-tight tracking-[-0.025em] text-heading sm:text-3xl">
                <ArticleLink
                  article={featured}
                  className="transition-colors hover:text-green-dark"
                >
                  {featured.title}
                </ArticleLink>
              </h3>
              <p className="mt-4 max-w-3xl text-base leading-7 text-foreground">
                {featured.description}
              </p>
              <div className="mt-6 border-t border-green/10 pt-5">
                <ArticleMeta article={featured} />
              </div>
              <ArticleLink
                article={featured}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground shadow-[0_10px_24px_-12px_rgba(42,130,103,0.9)] transition-all hover:-translate-y-0.5 hover:bg-green-dark sm:w-fit"
              >
                {callToAction(featured)}
                <ArrowUpRight className="h-4 w-4" />
              </ArticleLink>
            </div>
          </div>
        </article>

        {remaining.length > 0 && (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {remaining.map((article) => (
              <article
                key={article.id}
                className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-green/15 bg-white shadow-[0_16px_45px_-34px_rgba(34,82,68,0.55)]"
              >
                <ArticleLink
                  article={article}
                  className="relative block h-56 overflow-hidden"
                  ariaLabel={`Ler: ${article.title}`}
                >
                  <Image
                    src={article.imageUrl}
                    alt={article.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                    sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  />
                </ArticleLink>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <ReadingType article={article} />
                  <h3 className="mt-4 font-heading text-xl font-bold leading-tight text-heading">
                    <ArticleLink
                      article={article}
                      className="transition-colors hover:text-green-dark"
                    >
                      {article.title}
                    </ArticleLink>
                  </h3>
                  <p className="mt-3 line-clamp-4 flex-1 leading-7 text-foreground">
                    {article.description}
                  </p>
                  <div className="mt-5 border-t border-green/10 pt-4">
                    <ArticleMeta article={article} />
                  </div>
                  <ArticleLink
                    article={article}
                    className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-green-dark transition hover:text-heading"
                  >
                    {callToAction(article)}
                    <ArrowUpRight className="h-4 w-4" />
                  </ArticleLink>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

