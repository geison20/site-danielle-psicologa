import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const Hero = () => {
  const isMobile = false;

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
            <span className="inline-block px-4 py-1 bg-green/10 text-green-dark rounded-full text-sm font-medium">
              Psicóloga | CRP 06/111222
            </span>

            <h1
              id="hero-heading"
              className="heading-xl text-balance leading-tight"
            >
              Cuidando da sua saúde mental com empatia e profissionalismo
            </h1>

            <p className="text-lg text-gray-700 max-w-lg">
              Psicóloga Danielle Robertis, especialista em terapia
              cognitivo-comportamental, oferece atendimento humanizado para
              ajudar você a superar desafios e alcançar bem-estar emocional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-green hover:bg-green-dark shadow-lg hover:shadow-xl transition-all"
              >
                <a
                  href="https://wa.me/5511964556323"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Agendar consulta pelo WhatsApp"
                  className="flex items-center gap-2 px-8"
                >
                  <MessageSquare className="w-5 h-5" />
                  Agende sua consulta
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-green text-green hover:text-green-dark"
              >
                <a
                  href="#servicos"
                  aria-label="Ver serviços disponíveis"
                  className="flex items-center gap-2"
                >
                  Conheça meus serviços
                </a>
              </Button>
            </div>
          </div>

          <div className="relative flex justify-center md:justify-end order-1 md:order-2 mb-6 md:mb-0">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] bg-green/10 rounded-full"
              aria-hidden="true"
            ></div>
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[260px] md:h-[260px] lg:w-[340px] lg:h-[340px] bg-green/20 rounded-full"
              aria-hidden="true"
            ></div>

            <figure className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/20 w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[380px] lg:h-[380px]">
              <img
                src="https://source.unsplash.com/photo-1721322800607-8c38375eef04"
                alt="Ambiente acolhedor do consultório de psicologia com decoração em tons neutros, cadeiras confortáveis e iluminação suave"
                className="w-full h-full object-cover"
              />
              <figcaption className="sr-only">
                Ambiente acolhedor do consultório de psicologia
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {!isMobile && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block"
          aria-hidden="true"
        >
          <a
            href="#sobre"
            aria-label="Rolar para a seção Sobre"
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
