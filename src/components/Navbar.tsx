"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, Instagram, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { instagramUrl, whatsappLink } from "@/lib/contact-links";
import type { ContactContent } from "@/lib/content-types";

const navItems = [
  { href: "/#servicos", label: "Atuação" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#publicacoes", label: "Publicações" },
  { href: "/#artigos", label: "Artigos" },
  { href: "/#location", label: "Contato" },
];

export default function Navbar({ contact }: { contact: ContactContent }) {
  const whatsappHref = whatsappLink(
    contact.phone,
    "Olá, vim pelo site e gostaria de agendar uma consulta",
  );
  const instagramHref = instagramUrl(contact.instagram);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? "border-green/10 bg-background/95 shadow-[0_8px_30px_-22px_rgba(31,73,61,0.6)] backdrop-blur-xl"
          : "border-transparent bg-background/90 backdrop-blur-md"
      }`}
    >
      <div className="section-container flex h-[72px] items-center justify-between gap-3">
        <Link
          href="/#hero"
          className="group min-w-0"
          aria-label="Danielle Robertis, voltar ao início"
          onClick={closeMenu}
        >
          <span className="block truncate font-heading text-[17px] font-bold leading-tight tracking-[-0.02em] text-heading transition-colors group-hover:text-green-dark sm:text-xl">
            Danielle Robertis
          </span>
          <span className="mt-0.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/75 sm:text-[11px]">
            Psicóloga · CRP 06/134354
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-bold text-foreground transition-colors hover:bg-green/5 hover:text-heading"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="hidden text-green-dark hover:bg-green/10 sm:inline-flex"
          >
            <a
              href={instagramHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram em nova aba"
            >
              <Instagram className="h-5 w-5" />
            </a>
          </Button>

          <Button asChild size="sm" className="hidden lg:inline-flex">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              <CalendarDays className="h-4 w-4" />
              Agendar conversa
            </a>
          </Button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-heading transition-colors hover:bg-green/10 focus-visible:ring-green lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Fechar menu"
            className="fixed inset-0 top-[72px] -z-10 bg-heading/20 backdrop-blur-[2px] lg:hidden"
            onClick={closeMenu}
          />
          <div
            id="mobile-menu"
            className="absolute inset-x-3 top-[78px] overflow-hidden rounded-2xl border border-green/15 bg-white p-3 shadow-2xl shadow-heading/15 lg:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex min-h-12 items-center rounded-xl px-4 text-base font-bold text-heading transition-colors hover:bg-green/10"
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2 border-t border-green/10 pt-3">
              <Button asChild size="lg" className="w-full">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                >
                  <CalendarDays className="h-5 w-5" />
                  Agendar conversa
                </a>
              </Button>
              <Button asChild variant="outline" size="icon" className="h-12 w-12">
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir Instagram"
                  onClick={closeMenu}
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
