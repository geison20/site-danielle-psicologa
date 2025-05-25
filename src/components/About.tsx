import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, BookOpen } from "lucide-react";
import Image from "next/image";

const About = () => {
  const isMobile = false;

  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="bg-gradient-to-br from-white to-cream-light/30 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div
        className="absolute bottom-0 right-0 w-80 h-80 bg-green/5 rounded-full -mr-20 -mb-20"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-0 left-0 w-64 h-64 bg-green/10 rounded-full -ml-20 -mt-20 hidden md:block"
        aria-hidden="true"
      ></div>

      <div className="section-container relative z-10">
        <div className="text-center mb-14 md:mb-16">
          <span className="inline-block px-4 py-1 bg-green/10 text-green-dark rounded-full text-sm font-medium mb-3">
            Psicóloga Especialista
          </span>
          <h2
            id="sobre-heading"
            className="heading-lg mb-4 text-balance mx-auto max-w-3xl"
          >
            Sobre Danielle Robertis
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça mais sobre minha formação, abordagem terapêutica e
            experiência profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1 animate-fade-in">
            {/* Image with decorative elements */}
            <div
              className="absolute -top-5 -left-5 w-full h-full bg-cream-light rounded-lg transform rotate-3"
              aria-hidden="true"
            ></div>
            <div
              className="absolute -bottom-5 -right-5 w-full h-full bg-green/20 rounded-lg transform -rotate-3"
              aria-hidden="true"
            ></div>

            <figure className="relative z-10 w-full">
              <Image
                src="/danielle-robertis-psicologa-sobre.jpeg"
                alt="Psicóloga Danielle Robertis em uma postura profissional e acolhedora, usando roupa social discreta em um ambiente tranquilo"
                width={800}
                height={1200}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg shadow-xl w-full object-cover aspect-[3/4] md:aspect-[4/5]"
                priority
              />
              <figcaption className="sr-only">
                Psicóloga Danielle Robertis em ambiente profissional
              </figcaption>
            </figure>

            {/* Professional badge */}
            <div className="absolute -bottom-4 md:-right-4 left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:translate-x-0 bg-white shadow-lg rounded-full py-2 px-4 flex items-center gap-2 z-20">
              <span className="bg-green/10 p-2 rounded-full">
                <Award className="w-4 h-4 text-green" />
              </span>
              <span className="text-sm font-medium">CRP XX/XXXXX</span>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6 animate-fade-in">
            <div
              className="bg-green/5 p-3 rounded-lg inline-block mb-2"
              aria-hidden="true"
            >
              <BookOpen className="w-6 h-6 text-green" />
            </div>

            <h3 className="heading-md mb-4">Olá, sou a Danielle!</h3>
            <p className="mb-5 text-gray-700">
              Sou psicóloga formada pela Universidade de São Paulo (USP), com
              mais de 10 anos de experiência em atendimento clínico.
              Especialista em Terapia Cognitivo-Comportamental (TCC) e
              pós-graduada em Neuropsicologia pela PUC.
            </p>
            <p className="mb-8 text-gray-700">
              Minha abordagem é centrada na pessoa, acreditando que cada
              indivíduo é único e merece um tratamento personalizado. Trabalho
              com adultos e adolescentes, oferecendo um espaço seguro e
              acolhedor para o autoconhecimento e desenvolvimento pessoal.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <Card className="bg-white/80 backdrop-blur border-green/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="bg-green/10 p-2 rounded-full"
                      aria-hidden="true"
                    >
                      <Star className="w-4 h-4 text-green" />
                    </span>
                    <h4 className="font-semibold text-green-dark">
                      Formação Acadêmica
                    </h4>
                  </div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Graduação em Psicologia - USP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Especialização em TCC - FMUSP</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Pós-graduação em Neuropsicologia - PUC</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur border-green/10 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="bg-green/10 p-2 rounded-full"
                      aria-hidden="true"
                    >
                      <Award className="w-4 h-4 text-green" />
                    </span>
                    <h4 className="font-semibold text-green-dark">
                      Áreas de Atuação
                    </h4>
                  </div>
                  <ul className="text-sm space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Ansiedade e Depressão</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Relacionamentos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Desenvolvimento pessoal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Estresse e Burnout</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
