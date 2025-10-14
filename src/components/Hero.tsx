import Image from "next/image";
import { Button } from "@/components/ui/button";
import heroImg from "../../public/images/hero/opcao_capa_1.jpg";

const Hero = () => {
  const whatsappHref = `https://wa.me/5511964556323?text=${encodeURIComponent(
    "Olá, vim pelo site e gostaria de saber mais sobre seus serviços"
  )}`;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative flex items-center justify-center text-center overflow-hidden min-h-screen pt-24"
    >
      {/* Imagem otimizada pelo Next */}
      <Image
        src={heroImg}
        alt="Psicóloga Danielle Robertis de Vincenzo"
        fill
        priority
        placeholder="blur"
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay de cor para o efeito visto na imagem */}
      <div
        className="absolute inset-0 bg-green-dark/80 z-10"
        aria-hidden="true"
      />

      <div className="section-container relative z-20">
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
            Psicóloga Clínica | Especialista em Psicopatologia, Saúde da Mulher
            e Psicologia Perinatal pela Faculdade de Medicina da USP (IPq-FMUSP)
          </p>

          <p className="text-white/80">CRP 06/134354</p>

          <div className="pt-2 w-full">
            <Button
              asChild
              size="lg"
              className="w-full px-6 py-5 text-base font-semibold rounded-xl bg-white text-heading hover:bg-white/90 shadow-lg hover:shadow-xl focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Agendar consulta pelo WhatsApp"
                title="Agende sua consulta pelo WhatsApp"
              >
                Agendar Consulta
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
