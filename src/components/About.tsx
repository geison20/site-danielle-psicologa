import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award } from "lucide-react";
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
            Psicóloga Clínica | CRP 06/134354
          </span>
          <h2
            id="sobre-heading"
            className="heading-lg mb-4 text-balance mx-auto max-w-3xl"
          >
            Sobre Danielle Robertis de Vincenzo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acolhimento psicológico especializado para adolescentes, mulheres e famílias, 
            promovendo o bem-estar emocional e o fortalecimento de vínculos saudáveis em todas as fases da vida.
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
                alt="Psicóloga Danielle Robertis de Vincenzo, CRP 06/134354, especialista em psicologia perinatal e acolhimento de adolescentes, mulheres e famílias em São Paulo"
                width={800}
                height={1200}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-lg shadow-xl w-full object-cover aspect-[3/4] md:aspect-[4/5]"
                priority
              />
              <figcaption className="sr-only">
                Psicóloga Danielle Vincenzo em ambiente profissional
              </figcaption>
            </figure>

            {/* Professional badge */}
            <div className="absolute -bottom-4 md:-right-4 left-1/2 md:left-auto transform md:transform-none -translate-x-1/2 md:translate-x-0 bg-white shadow-lg rounded-full py-2 px-4 flex items-center gap-2 z-20">
              <span className="bg-green/10 p-2 rounded-full">
                <Award className="w-4 h-4 text-green" />
              </span>
              <span className="text-sm font-medium">CRP 06/134354</span>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-6 animate-fade-in">
            <h3 className="heading-md mb-4">Prazer, sou Danielle Vincenzo</h3>
            <p className="mb-5 text-gray-700">
              Psicóloga clínica especialista em Psicopatologia e Psiquiatria pela Faculdade de Medicina da USP (IPq-FMUSP).
              Com sólida formação e atuação no Instituto de Psiquiatria do Hospital das Clínicas da FMUSP, 
              desenvolvo atendimentos especializados com uma escuta acolhedora e humanizada.
            </p>
            <p className="mb-8 text-gray-700">
              Realizo atendimentos para adolescentes, mulheres em todas as fases
              da maternidade e famílias, com foco no desenvolvimento emocional infantil nos primeiros mil dias de vida.
              Minha abordagem integra conhecimentos de psicologia perinatal, saúde da mulher e psicopatologia, 
              visando promover o bem-estar emocional e o fortalecimento de vínculos familiares.
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
                      <span>Graduação em Psicologia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>
                        Especialização em Psicopatologia e Psiquiatria pela FMUSP
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>
                        Atuação no IPq-HC-FMUSP
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>
                        Especialista em Perinatalidade
                      </span>
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
                      <span>Saúde mental perinatal e maternidade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>
                        Desenvolvimento infantil e orientação familiar
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Adolescência</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green mt-1" aria-hidden="true">
                        •
                      </span>
                      <span>Acompanhamento em tratamento psiquiátrico</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Nova seção de Formação e Especialização */}
        <div className="mt-20 bg-white/60 backdrop-blur rounded-lg p-8 md:p-10 shadow-lg">
          <h3 className="heading-md mb-8 text-center">Formação e Especialização</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-green-dark mb-4 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Formação Acadêmica
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  <div>
                    <span className="font-medium">Psicologia</span>
                    <p className="text-sm text-gray-600">Graduação completa com formação clínica</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  <div>
                    <span className="font-medium">Especialização em Psicopatologia e Psiquiatria</span>
                    <p className="text-sm text-gray-600">Faculdade de Medicina da USP (IPq-FMUSP)</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  <div>
                    <span className="font-medium">Especialização em Perinatalidade</span>
                    <p className="text-sm text-gray-600">Foco no desenvolvimento infantil e vínculos familiares</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-green-dark mb-4 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Experiência e Atuação
              </h4>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  <div>
                    <span className="font-medium">Instituto de Psiquiatria do HC-FMUSP</span>
                    <p className="text-sm text-gray-600">Atuação clínica e desenvolvimento de abordagem humanizada</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  <div>
                    <span className="font-medium">Psicologia Perinatal</span>
                    <p className="text-sm text-gray-600">Especialista nos primeiros mil dias de vida</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green mt-1">•</span>
                  <div>
                    <span className="font-medium">Saúde da Mulher</span>
                    <p className="text-sm text-gray-600">Acompanhamento em todas as fases da maternidade</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-green/5 rounded-lg border border-green/20">
            <p className="text-center text-gray-700">
              <strong className="text-green-dark">Abordagem Integrativa:</strong> Meu trabalho integra conhecimentos 
              da psicologia perinatal, saúde da mulher e psicopatologia, visando promover o bem-estar emocional 
              e o fortalecimento de vínculos familiares saudáveis em todas as fases da vida.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
