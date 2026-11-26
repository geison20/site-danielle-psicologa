import Image from "next/image";
import { BookOpen, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { ContentPublication } from "@/lib/content-types";

export default function Publications({
  publications,
}: {
  publications: ContentPublication[];
}) {
  if (publications.length === 0) return null;

  return (
    <section
      id="publicacoes"
      aria-labelledby="publicacoes-heading"
      className="bg-white"
    >
      <div className="section-container">
        <header className="mb-8 max-w-3xl md:mb-12">
          <span className="eyebrow">Conhecimento compartilhado</span>
          <h2 id="publicacoes-heading" className="heading-lg">
            Publicações e docência
          </h2>
          <p className="section-lead max-w-2xl">
            A prática clínica também se fortalece com ensino, pesquisa e
            produção de conhecimento.
          </p>
        </header>

        <div className="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
          {publications.map((publication) => (
            <Card
              key={publication.id}
              className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-green/15 bg-cream-light shadow-[0_20px_60px_-38px_rgba(34,82,68,0.5)]"
            >
              <div className="relative h-[340px] overflow-hidden border-b border-green/10 bg-green/5 sm:h-[390px]">
                <div className="absolute inset-0 p-6 sm:p-8">
                  <div className="relative h-full w-full">
                    <Image
                      src={publication.imageUrl}
                      alt={publication.imageAlt}
                      fill
                      className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
                      sizes="(max-width: 1023px) 100vw, 50vw"
                    />
                  </div>
                </div>

                {publication.featured && (
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-heading/85 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-white shadow-sm backdrop-blur">
                    <Sparkles className="h-3.5 w-3.5" />
                    Em destaque
                  </span>
                )}
              </div>

              <CardContent className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green-dark ring-1 ring-green/20">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-2xl font-bold leading-tight text-heading">
                      {publication.title}
                    </h3>
                    <p className="mt-2 text-base font-bold leading-6 text-foreground">
                      {publication.subtitle}
                    </p>
                    {publication.meta && (
                      <p className="mt-1 text-sm leading-6 text-foreground/75">
                        {publication.meta}
                      </p>
                    )}
                  </div>
                </div>

                <p className="mt-5 flex-1 leading-7 text-foreground">
                  {publication.description}
                </p>

                <div className="mt-6">
                  <Button asChild size="lg" className="w-full px-5 sm:w-auto">
                    <a
                      href={publication.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${publication.cta}: ${publication.title}`}
                    >
                      {publication.cta}
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
