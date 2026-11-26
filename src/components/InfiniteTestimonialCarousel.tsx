import { MoveHorizontal, Quote, Star } from "lucide-react";
import type { ContentTestimonial } from "@/lib/content-types";

export default function InfiniteTestimonialCarousel({
  testimonials,
}: {
  testimonials: ContentTestimonial[];
}) {
  return (
    <div className="w-full overflow-hidden bg-white">
      <div className="section-container">
        <header className="mb-8 max-w-3xl md:mb-12">
          <span className="eyebrow">Experiências compartilhadas</span>
          <h2 id="testimonials-heading" className="heading-lg">
            O que meus pacientes dizem
          </h2>
          <p className="section-lead max-w-2xl">
            Relatos sobre acolhimento, confiança e os caminhos construídos ao
            longo do processo terapêutico.
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-green-dark md:hidden">
            <MoveHorizontal className="h-4 w-4" />
            Deslize para ler
          </p>
        </header>

        <div
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
          aria-label="Depoimentos de pacientes"
          role="region"
          tabIndex={0}
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="surface-card flex min-h-[300px] w-[84vw] max-w-[360px] shrink-0 snap-center flex-col p-6 sm:w-[360px] sm:p-7"
              aria-label={`Depoimento de ${testimonial.name}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl bg-green/10 text-green-dark"
                  aria-hidden="true"
                >
                  <Quote className="h-5 w-5" />
                </div>
                <div
                  className="flex gap-0.5"
                  aria-label="5 de 5 estrelas"
                  role="img"
                >
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-4 w-4 fill-[#dcae55] text-[#dcae55]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <blockquote className="mt-7 flex-1 text-base leading-7 text-foreground">
                “{testimonial.text}”
              </blockquote>

              <footer className="mt-6 border-t border-green/10 pt-5">
                <cite className="block font-heading text-base font-bold not-italic text-heading">
                  {testimonial.name}
                </cite>
                {testimonial.date && (
                  <span className="mt-1 block text-xs text-foreground/70">
                    {testimonial.date}
                  </span>
                )}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
