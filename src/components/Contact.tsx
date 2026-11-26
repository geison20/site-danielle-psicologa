import {
  ArrowUpRight,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  instagramLabel,
  instagramUrl,
  mapsLink,
  telLink,
  whatsappLink,
} from "@/lib/contact-links";
import type { ContactContent } from "@/lib/content-types";

export default function Contact({ contact }: { contact: ContactContent }) {
  const whatsappHref = whatsappLink(
    contact.phone,
    "Olá, vim pelo site e gostaria de agendar uma consulta",
  );
  const contactItems = [
    {
      label: "Telefone e WhatsApp",
      value: contact.phone,
      href: telLink(contact.phone),
      Icon: Phone,
      external: false,
    },
    {
      label: "E-mail",
      value: contact.email,
      href: `mailto:${contact.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: "Instagram",
      value: instagramLabel(contact.instagram),
      href: instagramUrl(contact.instagram),
      Icon: Instagram,
      external: true,
    },
  ];

  return (
    <section
      id="location"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-heading text-white"
    >
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-green/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="section-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <span className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white/90">
              Vamos conversar
            </span>
            <h2
              id="contact-heading"
              className="heading-lg max-w-[13ch] !text-white"
            >
              Seu cuidado pode começar por aqui
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Entre em contato para agendar uma primeira conversa ou esclarecer
              dúvidas sobre o processo terapêutico.
            </p>

            <Button
              asChild
              size="lg"
              className="mt-8 h-14 w-full bg-white px-6 text-base text-heading hover:bg-cream-light sm:w-auto"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar com Danielle pelo WhatsApp"
              >
                <MessageCircle className="h-5 w-5" />
                Falar pelo WhatsApp
              </a>
            </Button>

            <p className="mt-4 text-xs leading-5 text-white/75">
              Você será direcionado para uma conversa privada no WhatsApp.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {contactItems.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex min-h-[112px] items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/15 sm:p-6"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#b9eadb]">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                    {label}
                  </span>
                  <span className="mt-2 block break-words text-sm font-bold leading-6 text-white sm:text-base">
                    {value}
                  </span>
                </span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            ))}

            <a
              href={mapsLink(contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[140px] items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 text-white backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/15 sm:col-span-2 sm:p-6"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#b9eadb]">
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-white/75">
                  Consultório
                </span>
                <span className="mt-2 block text-sm font-bold leading-6 text-white sm:text-base">
                  {contact.addressLine1}
                </span>
                <span className="mt-1 block text-sm leading-6 text-white/65">
                  {contact.addressLine2}
                </span>
              </span>
              <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-white/40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
