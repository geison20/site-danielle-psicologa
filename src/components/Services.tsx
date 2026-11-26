import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import {
  Baby,
  Heart,
  Users,
  Leaf,
  BookOpen,
  User,
  Brain,
  Venus,
  UserRound,
  ArrowRight,
  MoveHorizontal,
} from "lucide-react";
import type { ContentService, ServiceIcon } from "@/lib/content-types";

const serviceIcons: Record<ServiceIcon, React.ElementType> = {
  venus: Venus,
  "user-round": UserRound,
  heart: Heart,
  baby: Baby,
  leaf: Leaf,
  "book-open": BookOpen,
  users: Users,
  user: User,
  brain: Brain,
};

const Services = ({ services }: { services: ContentService[] }) => {
  if (services.length === 0) return null;

  return (
    <section
      id="servicos"
      aria-labelledby="services-heading"
      className="overflow-hidden bg-white"
    >
      <div className="section-container">
        <header className="mb-8 max-w-3xl md:mb-12">
          <span className="eyebrow">Como posso ajudar</span>
          <h2 id="services-heading" className="heading-lg">
            Áreas de atuação
          </h2>
          <p className="section-lead max-w-2xl">
            Cuidado psicológico especializado para diferentes momentos,
            relações e desafios emocionais.
          </p>
          <p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-green-dark md:hidden">
            <MoveHorizontal className="h-4 w-4" />
            Deslize para conhecer
          </p>
        </header>

        <div
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-6 sm:px-6 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3"
          aria-label="Áreas de atuação disponíveis"
          role="region"
          tabIndex={0}
        >
          {services.map((service, index) => {
            const Icon = serviceIcons[service.icon] ?? Heart;
            return (
              <article
                key={service.id}
                className="h-full w-[84vw] max-w-[340px] shrink-0 snap-center md:w-auto md:max-w-none"
                aria-label={service.title}
              >
                <Card className="group h-full overflow-hidden rounded-2xl border-green/15 bg-white shadow-[0_16px_45px_-32px_rgba(34,82,68,0.55)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_-30px_rgba(34,82,68,0.45)]">
                  <div className="relative h-52 w-full overflow-hidden md:h-48">
                    <Image
                      src={service.imageUrl}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-heading/25 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-green-dark shadow-sm backdrop-blur">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="border-t border-green/10 bg-white p-5 md:p-6">
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green-dark ring-1 ring-green/15">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-heading text-base font-bold leading-snug text-heading md:text-lg">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-foreground">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </article>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-green/15 bg-green/5 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div>
            <p className="font-heading text-lg font-bold text-heading">
              Não sabe qual atendimento faz sentido para você?
            </p>
            <p className="mt-1 text-sm leading-6 text-foreground">
              Uma primeira conversa pode ajudar a compreender sua necessidade.
            </p>
          </div>
          <a
            href="#location"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl font-bold text-green-dark transition-colors hover:text-heading sm:mt-0 sm:shrink-0"
          >
            Fale comigo
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
