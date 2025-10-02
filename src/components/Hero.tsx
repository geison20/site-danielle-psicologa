"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { sendGAEvent } from "@next/third-parties/google";

const Hero = () => {
  const handleWhatsAppClick = () => {
    sendGAEvent("event", "WhatsAppClick", {
      event_category: "engagement",
      event_label: "hero_section",
    });
    const message = encodeURIComponent(
      "Olá, vim pelo site e gostaria de saber mais sobre seus serviços"
    );
    window.open(
      `https://wa.me/5511964556323?text=${message}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const update = () => {
      const nav = document.querySelector(
        'nav[aria-label="Navegação principal"]'
      ) as HTMLElement | null;
      setHeaderHeight(nav?.offsetHeight ?? 0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex items-center justify-center text-center overflow-hidden"
      style={{
        backgroundImage: "url(/danielle-robertis-psicologa.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: `calc(100vh - ${headerHeight}px)`,
        marginTop: headerHeight,
      }}
    >
      {/* Overlay de cor para o efeito visto na imagem */}
      <div className="absolute inset-0 bg-green/70" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="mx-auto max-w-5xl space-y-6 md:space-y-8">
          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white text-balance"
          >
            Bem-estar emocional e vínculos saudáveis em todas as fases da vida
          </h1>

          <p className="text-xl md:text-2xl text-white/90">
            Danielle Robertis de Vincenzo
          </p>

          <p className="mx-auto max-w-3xl text-base md:text-lg text-white/85 leading-relaxed">
            Psicóloga Clínica | Especialista em Psicopatologia, Saúde da Mulher e Psicologia Perinatal pela Faculdade de Medicina da USP (IPq-FMUSP)
          </p>

          <p className="text-white/80">CRP 06/134354</p>

          <div className="flex items-center justify-center gap-4 pt-2">
            <Button
              onClick={handleWhatsAppClick}
              size="lg"
              className="px-6 py-5 text-base font-semibold rounded-xl"
              aria-label="Agendar consulta pelo WhatsApp"
              title="Agende sua consulta pelo WhatsApp"
            >
              Agendar Consulta
            </Button>
            <a
              href="#instagram"
              aria-label="Abrir publicações no Instagram"
              title="Instagram"
            >
              <Button
                variant="outline"
                size="lg"
                className="px-6 py-5 text-base rounded-xl border-white text-white bg-transparent hover:bg-white/10"
              >
                Instagram
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
