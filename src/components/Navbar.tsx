"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageSquare } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center"
          aria-label="Voltar para o topo"
        >
          <span className="text-2xl font-serif font-bold text-green-dark">
            Danielle Robertis
          </span>
          <span className="ml-2 text-sm text-gray-600 hidden sm:inline-block">
            Psicóloga | CRP XX/XXXXX
          </span>
        </a>

        {/* Desktop Navigation */}
        <div role="navigation" className="hidden md:block">
          <ul className="flex items-center space-x-8">
            <li>
              <Link
                href="#servicos"
                title="Ir para a seção de Serviços"
                className="text-gray-800 hover:text-green"
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                href="#depoimentos"
                title="Ir para a seção de Depoimentos"
                className="text-gray-800 hover:text-green"
              >
                Depoimentos
              </Link>
            </li>
            <li>
              <Link
                href="#sobre"
                title="Ir para a seção Sobre"
                className="text-gray-800 hover:text-green"
              >
                Sobre
              </Link>
            </li>
            <li>
              <Button asChild className="bg-green hover:bg-green-dark">
                <a
                  href="https://wa.me/5511964556323"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Agendar consulta pelo WhatsApp"
                  title="Agende sua consulta pelo WhatsApp"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Agende sua consulta
                </a>
              </Button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
                className="text-gray-800 hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre
              </Link>
            </li>
            <li>
              <Link
                href="#servicos"
                title="Ir para a seção de Serviços"
                className="text-gray-800 hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Serviços
              </Link>
            </li>
            <li>
              <Link
                href="#depoimentos"
                title="Ir para a seção de Depoimentos"
                className="text-gray-800 hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Depoimentos
              </Link>
            </li>
            <li>
              <Button
                asChild
                className="bg-green hover:bg-green-dark w-full justify-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <a
                  href="https://wa.me/5511964556323"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label="Agendar consulta pelo WhatsApp"
                  title="Agende sua consulta pelo WhatsApp"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Agende sua consulta
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
