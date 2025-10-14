"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Instagram } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const instagramUrl = "https://instagram.com/danielle.psicologia";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      aria-label="Navegação principal"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm py-2" : "bg-white py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center"
          aria-label="Voltar para o topo"
        >
          <span className="text-xl md:text-2xl font-serif font-bold text-heading">
            Danielle Robertis
          </span>
        </a>

        <div className="flex items-center gap-4">
          <div role="navigation" className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <li>
                <Link
                  href="#sobre"
                  title="Ir para a seção Sobre"
                  className="text-[#677e77] hover:text-[#364943]"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  href="#servicos"
                  title="Ir para a seção Áreas de Atuação"
                  className="text-[#677e77] hover:text-[#364943]"
                >
                  Áreas de Atuação
                </Link>
              </li>
              <li>
                <Link
                  href="#instagram"
                  title="Ir para a seção Publicações"
                  className="text-[#677e77] hover:text-[#364943]"
                >
                  Publicações
                </Link>
              </li>
              <li>
                <Link href="#location" title="Ir para a seção de Contato">
                  <Button
                    size="lg"
                    className="px-6 py-3 text-base rounded-md"
                    aria-label="Ir para Contato"
                    title="Contato"
                  >
                    Contato
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="hidden md:inline-flex gap-2 rounded-md border-green text-green hover:bg-green/10 focus-visible:ring-green focus-visible:ring-offset-2"
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram em nova aba"
              title="Instagram"
            >
              <Instagram className="h-5 w-5" />
              Instagram
            </a>
          </Button>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="md:hidden text-green hover:bg-green/10 focus-visible:ring-green focus-visible:ring-offset-2"
          >
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram em nova aba"
              title="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
          </Button>

          <button
            className="md:hidden text-[#677e77]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          role="navigation"
          aria-label="Navegação móvel"
          className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md"
        >
          <ul className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <li>
              <Link
                href="#sobre"
                title="Ir para a seção Sobre"
                className="text-[#677e77] hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="#servicos"
                title="Ir para a seção Áreas de Atuação"
                className="text-[#677e77] hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Áreas de Atuação
              </Link>
            </li>
            <li>
              <Link
                href="#instagram"
                title="Ir para a seção Publicações"
                className="text-[#677e77] hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Publicações
              </Link>
            </li>
            <li>
              <Link
                href="#location"
                title="Ir para a seção de Contato"
                className="text-[#677e77] hover:text-green py-2 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button size="lg" className="w-full justify-center">
                  Contato
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
