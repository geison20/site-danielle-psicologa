import Image from "next/image";
import { ArrowDown, CalendarDays, Check, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact-links";
import type { ContactContent, HeroContent } from "@/lib/content-types";

export default function Hero({
  hero,
  contact,
}: {
  hero: HeroContent;
  contact: ContactContent;
}) {
  const whatsappHref = whatsappLink(
    contact.phone,
    "Olá, vim pelo site e gostaria de saber mais sobre seus serviços",
  );

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[700px] items-center overflow-hidden bg-heading pb-16 pt-28 sm:min-h-[740px] lg:min-h-[780px] lg:pb-24 lg:pt-32"
    >
      <Image
        src={hero.imageUrl}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[58%_center] lg:object-center"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(20,65,54,0.94)_0%,rgba(27,91,73,0.84)_48%,rgba(24,74,61,0.42)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(16,55,45,0.55)_0%,transparent_45%)] lg:hidden"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.13em] text-white backdrop-blur-md sm:text-sm">
            <span className="h-2 w-2 rounded-full bg-[#b9eadb]" />
            {hero.badge}
          </div>

          <h1
            id="hero-heading"
            className="max-w-[18ch] text-balance font-heading text-[clamp(2.45rem,10.5vw,4.8rem)] font-bold leading-[0.99] tracking-[-0.045em] text-white"
          >
            {hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/85 sm:text-xl sm:leading-8">
            {hero.subtitle}
          </p>

          <ul className="mt-6 flex flex-col gap-3 text-sm font-bold text-white/90 sm:flex-row sm:flex-wrap sm:gap-x-6">
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <Check className="h-3.5 w-3.5" />
              </span>
              Atendimento especializado
            </li>
            <li className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                <MapPin className="h-3.5 w-3.5" />
              </span>
              Consultório em São Paulo
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 w-full bg-white px-6 text-base text-heading shadow-xl hover:bg-cream-light sm:w-auto"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar consulta pelo WhatsApp"
              >
                <CalendarDays className="h-5 w-5" />
                Agendar uma conversa
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 w-full border-white/30 bg-white/10 px-6 text-base text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/15 hover:text-white sm:w-auto"
            >
              <a href="#servicos">
                Conhecer áreas de atuação
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pt-5 text-xs text-white/70 sm:text-sm">
            <span className="font-bold text-white">Danielle Robertis de Vincenzo</span>
            <span aria-hidden="true">•</span>
            <span>CRP 06/134354</span>
            <span aria-hidden="true">•</span>
            <span>Especialista pela FMUSP</span>
          </div>
        </div>
      </div>
    </section>
  );
}
