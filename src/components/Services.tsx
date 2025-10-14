import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Baby, Heart, Users, Leaf, BookOpen, User, Brain } from "lucide-react";
import adolescenciaImg from "../../public/images/news/adolescencia.jpg";
import perinatalidadeImg from "../../public/images/news/pariental.jpg";
import lutoPerinatalImg from "../../public/images/news/luto.jpg";
import relacaoMaeBebeImg from "../../public/images/news/mae_bebe.jpg";
import acompanhamentoPsiquiatricoImg from "../../public/images/news/psiquiatria.jpg";
import orientacaoParentalImg from "../../public/images/news/parental.jpg";

import gestacaoPosPartoImg from "../../public/images/services/gestacao-pos-parto.jpg";
import desenvolvimentoInfantilImg from "../../public/images/services/desenvolvimento-infantil.jpg";

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: "Perinatalidade e Planejamento Familiar",
      description:
        "Acompanhamento de mulheres e casais em processos de gestação, adoção e parentalidade.",
      image: {
        src: perinatalidadeImg,
        alt: "Mulher grávida com mãos apoiadas na barriga",
      },
    },
    {
      icon: Baby,
      title: "Gestação e Pós-Parto (Puerpério)",
      description:
        "Experiências em demandas emocionais relacionadas à gravidez, identidade materna e adaptação à maternidade.",
      image: {
        src: gestacaoPosPartoImg,
        alt: "Família com recém-nascido no colo",
      },
    },
    {
      icon: Heart,
      title: "Relação Mãe-Bebê e Vínculo Afetivo",
      description:
        "Estudos e práticas voltadas à construção de vínculos seguros nos primeiros anos de vida.",
      image: {
        src: relacaoMaeBebeImg,
        alt: "Mãe e bebê em contato afetuoso",
      },
    },
    {
      icon: Leaf,
      title: "Luto Perinatal",
      description:
        "Experiência em acolhimento de perdas gestacionais e neonatais.",
      image: {
        src: lutoPerinatalImg,
        alt: "Flor branca representando delicadeza",
      },
    },
    {
      icon: BookOpen,
      title: "Desenvolvimento Infantil nos Primeiros Anos",
      description:
        "Atuação e docência voltadas ao sono, rotina saudável e neurodesenvolvimento infantil.",
      image: {
        src: desenvolvimentoInfantilImg,
        alt: "Bebê dormindo tranquilamente",
      },
    },
    {
      icon: Users,
      title: "Apoio à Paternidade",
      description:
        "Acompanhamento de pais em seus desafios emocionais e familiares.",
      image: {
        src: gestacaoPosPartoImg,
        alt: "Pai com bebê no colo",
      },
    },
    {
      icon: Users,
      title: "Orientação Parental",
      description:
        "Experiência em processos de organização e fortalecimento das relações familiares.",
      image: {
        src: orientacaoParentalImg,
        alt: "Pais com criança pequena em ambiente acolhedor",
      },
    },
    {
      icon: User,
      title: "Adolescência",
      description:
        "Vivência clínica no suporte a questões emocionais, de identidade e de relacionamentos.",
      image: {
        src: adolescenciaImg,
        alt: "Adolescente em retrato",
      },
    },
    {
      icon: Brain,
      title: "Pacientes em Tratamento Psiquiátrico",
      description:
        "Parceria de acompanhamento em interface com a psiquiatria, favorecendo adesão e bem‑estar.",
      image: {
        src: acompanhamentoPsiquiatricoImg,
        alt: "Sala de atendimento terapêutico acolhedora",
      },
    },
  ];

  // Schema.org para lista de serviços
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Áreas de Experiência",
    description:
      "Atuação especializada em saúde mental perinatal, vínculos familiares e desenvolvimento emocional",
    provider: {
      "@type": "Person",
      name: "Danielle Robertis de Vincenzo",
      jobTitle: "Psicóloga Clínica",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        identifier: "CRP 06/134354",
      },
    },
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MedicalProcedure",
        name: service.title,
        description: service.description,
        category: "Psychological Therapy",
        provider: {
          "@type": "Person",
          name: "Danielle Robertis de Vincenzo",
        },
        location: {
          "@type": "Place",
          name: "Consultório Psicológico Danielle Vincenzo",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Paulista, 1000, cj 101",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            addressCountry: "BR",
          },
        },
      },
    })),
  };

  return (
    <section id="servicos" className="bg-white">
      {/* Schema estruturado para serviços */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <div className="section-container">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="heading-lg">Áreas de Experiência</h2>
          <p className="mt-2 text-sm text-[#677e77]">
            Atuação especializada em saúde mental perinatal, vínculos familiares
            e desenvolvimento emocional
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon as React.ElementType;
            return (
              <article
                key={index}
                className="h-full"
                aria-label={service.title}
              >
                <Card className="overflow-hidden h-full border-green/15 hover:shadow-md transition-shadow rounded-xl">
                  <div className="relative w-full h-44 md:h-48">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>

                  <div className="p-4 md:p-5 border-t bg-white">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="text-[15px] md:text-base font-semibold text-heading">
                          {service.title}
                        </h3>
                        <p className="mt-1 text-xs md:text-sm text-[#677e77]">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
