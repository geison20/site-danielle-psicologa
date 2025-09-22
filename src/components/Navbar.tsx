"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageSquare } from "lucide-react";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleWhatsAppClick = (label: string) => {
    sendGAEvent("event", "WhatsAppClick", {
      event_category: "engagement",
      event_label: label
    });
    const message = encodeURIComponent("Olá, vim pelo site e gostaria de saber mais sobre seus serviços");
    window.open(`https://wa.me/5511964556323?text=${message}`, "_blank", "noopener,noreferrer");
  };

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
          <span className="text-xl md:text-2xl font-serif font-bold text-green-dark">
            Danielle Robertis de Vincenzo
          </span>
          <span className="ml-2 text-sm text-gray-600 hidden sm:inline-block">
            Psicóloga Clínica
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
              <Link
                href="#location"
                title="Ir para a seção de Localização"
                className="text-gray-800 hover:text-green"
              >
                Localização
              </Link>
            </li>
            <li>
              <Button 
                onClick={() => handleWhatsAppClick("navbar_desktop")}
                size="lg"
                className="flex items-center gap-2 px-6 py-3 text-base"
                style={{ backgroundColor: 'rgb(29, 215, 113)' }}
                aria-label="Agendar consulta pelo WhatsApp"
                title="Agende sua consulta pelo WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
                Agende sua consulta
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
                href="#location"
                title="Ir para a seção de Localização"
                className="text-gray-800 hover:text-green py-2 border-b border-gray-100 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Localização
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
                onClick={() => {
                  handleWhatsAppClick("navbar_mobile");
                  setIsMobileMenuOpen(false);
                }}
                size="lg"
                className="w-full justify-center flex items-center gap-2 px-6 py-4 text-base"
                style={{ backgroundColor: 'rgb(29, 215, 113)' }}
                aria-label="Agendar consulta pelo WhatsApp"
                title="Agende sua consulta pelo WhatsApp"
              >
                <MessageSquare className="w-5 h-5" />
                Agende sua consulta
              </Button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
