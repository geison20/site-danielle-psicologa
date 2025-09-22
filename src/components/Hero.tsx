"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { sendGAEvent } from "@next/third-parties/google";

const Hero = () => {
  const isMobile = false;

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

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-cream via-cream-light/50 to-cream-light pt-16 pb-10 overflow-hidden"
    >
      {/* Decorative elements */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-green/5 rounded-full -mr-20 -mt-20"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-64 h-64 bg-green/10 rounded-full -ml-20 -mb-20"
        aria-hidden="true"
      ></div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 animate-fade-in order-2 md:order-1">
            <h1
              id="hero-heading"
              className="heading-xl text-balance leading-tight"
            >
              Acompanhamento psicológico para{" "}
              <span className="text-green">
                sua jornada única da maternidade
              </span>
            </h1>

            <p className="text-lg text-gray-700 max-w-lg">
              Suporte emocional especializado desde o desejo de ser mãe até o
              pós-parto. Com a Terapia Cognitivo Comportamental, transformo
              desafios em crescimento pessoal e bem-estar.
            </p>

            <div className="pt-2">
              <Button
                onClick={handleWhatsAppClick}
                size="lg"
                className="w-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 px-16 py-6 text-xl font-semibold rounded-2xl"
                style={{ backgroundColor: "rgb(29, 215, 113)" }}
                aria-label="Agendar consulta pelo WhatsApp"
                title="Agende sua consulta pelo WhatsApp"
              >
                <MessageSquare className="w-7 h-7" />
                Agende sua consulta
              </Button>
            </div>

            {!isMobile && (
              <div className="relative flex justify-center mt-8">
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-green/10 rounded-full"
                  aria-hidden="true"
                ></div>
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[260px] md:h-[260px] lg:w-[340px] lg:h-[340px] bg-green/20 rounded-full"
                  aria-hidden="true"
                ></div>

                <figure className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/20 w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[380px] lg:h-[380px]">
                  <Image
                    src="/danielle-robertis-psicologa.jpeg"
                    alt="Psicóloga Danielle Robertis de Vincenzo em ambiente profissional acolhedor, especialista em psicologia clínica e acolhimento familiar em São Paulo"
                    fill
                    sizes="(max-width: 380px) 100vw, 380px"
                    className="object-cover"
                    priority
                  />
                  <figcaption className="sr-only">
                    Ambiente acolhedor do consultório de psicologia
                  </figcaption>
                </figure>
              </div>
            )}
          </div>

          <div className="order-1 md:order-2"></div>
        </div>
      </div>

      {!isMobile && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
          aria-hidden="true"
        >
          <a
            href="#servicos"
            aria-label="Rolar para a seção Sobre"
            title="Rolar para a seção Sobre"
            className="inline-flex items-center justify-center p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green group-hover:text-green-dark transition-colors"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
