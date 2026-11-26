import Link from "next/link";
import { Instagram, Mail, Phone } from "lucide-react";
import { instagramLabel, instagramUrl, telLink } from "@/lib/contact-links";
import { CookieSettingsButton } from "@/components/CookieConsent";
import type { ContactContent } from "@/lib/content-types";

const footerLinks = [
  { href: "#servicos", label: "Áreas de atuação" },
  { href: "#sobre", label: "Sobre" },
  { href: "#publicacoes", label: "Publicações" },
  { href: "#artigos", label: "Artigos" },
  { href: "#depoimentos", label: "Depoimentos" },
];

export default function Footer({ contact }: { contact: ContactContent }) {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-[#173c32] text-white">
      <div className="section-container">
        <div className="grid gap-10 py-12 sm:py-14 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a href="#hero" className="font-heading text-xl font-bold text-white">
              Danielle Robertis
            </a>
            <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
              Psicóloga clínica especialista em Saúde da Mulher, Psicopatologia
              e Psicologia Perinatal.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-[#b9eadb]">
              CRP 06/134354
            </p>
          </div>

          <nav aria-label="Links do rodapé">
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] !text-white/70">
              Navegação
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-white/75 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.12em] !text-white/70">
              Contato
            </h3>
            <div className="mt-4 space-y-4 text-sm text-white/75">
              <a
                href={telLink(contact.phone)}
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4 text-[#b9eadb]" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex min-w-0 items-start gap-3 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#b9eadb]" />
                <span className="break-all">{contact.email}</span>
              </a>
              <a
                href={instagramUrl(contact.instagram)}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-3 transition-colors hover:text-white"
              >
                <Instagram className="h-4 w-4 text-[#b9eadb]" />
                {instagramLabel(contact.instagram)}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 pb-24 text-center text-xs leading-5 text-white/70 sm:pb-6">
          © {currentYear} Danielle Robertis de Vincenzo. Todos os direitos
          reservados.
          <span className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link
              href="/privacidade"
              className="font-bold underline underline-offset-2 transition-colors hover:text-white"
            >
              Política de Privacidade
            </Link>
            <CookieSettingsButton className="font-bold underline underline-offset-2 transition-colors hover:text-white" />
          </span>
        </div>
      </div>
    </div>
  );
}
