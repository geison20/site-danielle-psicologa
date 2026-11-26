import Image from "next/image";
import {
  GraduationCap,
  Heart,
  MessageCircle,
  School,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/contact-links";
import type { AboutContent, ContactContent } from "@/lib/content-types";

const educationIcons = [Stethoscope, School, GraduationCap];

// Permite destacar trechos em negrito com **texto**, sem usar HTML.
function renderInline(text: string) {
  return text.split(/\*\*(.+?)\*\*/g).map((part, index) =>
    index % 2 === 1 ? (
      <strong key={index} className="font-bold text-heading">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

const About = ({
  about,
  contact,
}: {
  about: AboutContent;
  contact: ContactContent;
}) => {
  const whatsappHref = whatsappLink(
    contact.phone,
    "Olá, vim pelo site e gostaria de saber mais sobre seu trabalho",
  );
  const paragraphs = about.body
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <section
      id="sobre"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-cream-light"
    >
      <div
        className="absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-green/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="section-container">
        <header className="relative mb-8 max-w-2xl md:mb-12">
          <span className="eyebrow">Quem vai caminhar com você</span>
          <h2 id="about-heading" className="heading-lg">
            {about.title}
          </h2>
          <p className="section-lead">{about.intro}</p>
        </header>

        <div className="relative grid items-start gap-8 md:grid-cols-[minmax(0,360px)_1fr] lg:gap-14">
          <div className="flex flex-col items-center gap-5 md:sticky md:top-24 md:items-start md:gap-6">
            <figure className="relative w-full max-w-[360px] overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_-32px_rgba(34,82,68,0.5)]">
              <Image
                src={about.photoUrl}
                alt={about.photoAlt}
                width={800}
                height={1000}
                sizes="(max-width: 768px) 90vw, 360px"
                className="aspect-[4/5] h-full w-full object-cover object-[center_62%]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-heading/95 via-heading/60 to-transparent p-5 pt-16 text-white">
                <div className="font-heading text-base font-bold leading-tight">
                  Danielle Robertis de Vincenzo
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                  Psicóloga · CRP 06/134354
                </div>
              </figcaption>
            </figure>

            {about.personalNote && (
              <div className="surface-card w-full max-w-[360px] p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-green/20 bg-green/10 text-green-dark">
                    <Heart className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <div className="text-start">
                    <div className="font-heading text-sm font-bold text-heading">
                      Para além da formação
                    </div>
                    <p className="mt-1 text-sm leading-6 text-foreground">
                      {about.personalNote}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="surface-card space-y-8 p-5 sm:p-8 lg:p-10">
            <div className="space-y-5 text-base leading-7 text-foreground sm:text-[17px] sm:leading-8">
              {paragraphs.map((paragraph, index) => (
                <p key={index}>{renderInline(paragraph)}</p>
              ))}
            </div>

            {about.education.length > 0 && (
              <div className="border-t border-green/10 pt-7">
                <div className="mb-4 flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-green-dark" />
                  <h3 className="font-heading text-lg font-bold text-heading">
                    Formação Acadêmica
                  </h3>
                </div>

                <div className="grid gap-3">
                  {about.education.map((item, index) => {
                    const Icon = educationIcons[index % educationIcons.length];
                    return (
                      <div
                        key={`${item.title}-${index}`}
                        className="flex items-start gap-3 rounded-2xl border border-green/15 bg-green/5 p-4 sm:p-5"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-green-dark shadow-sm">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-bold leading-6 text-heading">
                            {item.title}
                          </div>
                          <div className="mt-0.5 text-xs leading-5 text-foreground/80">
                            {item.institution}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <Button asChild size="lg" className="w-full sm:w-auto">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Conversar com a Danielle
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
