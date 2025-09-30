"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";
import { Laptop } from "lucide-react";
import { sendGAEvent } from "@next/third-parties/google";

const Services = () => {
  const services = [
    {
      title: "Perinatalidade",
      description: "Planejamento familiar e maternidade",
      details:
        "Acompanhamento para mulheres e casais que enfrentam desafios relacionados à gestação, adoção ou parentalidade.",
      image: {
        src: "/images/services/perinatalidade.jpg",
        alt: "Mãos acariciando a barriga de uma gestante",
      },
    },
    {
      title: "Gestação e Pós-Parto",
      description: "Apoio emocional durante a gravidez e o puerpério",
      details:
        "Gestão da ansiedade, identidade materna e estratégias de autocuidado.",
      image: {
        src: "/images/services/gestacao-pos-parto.jpg",
        alt: "Mãe segurando o recém-nascido nos braços",
      },
    },
    {
      title: "Relação Mãe-Bebê",
      description: "Fortalecimento do vínculo afetivo",
      details:
        "Orientações para promover conexão saudável desde os primeiros momentos de vida.",
      image: {
        src: "/images/services/relacao-mae-bebe.jpg",
        alt: "Mãe beijando o bebê recém-nascido",
      },
    },
    {
      title: "Luto Perinatal",
      description: "Acolhimento em perdas gestacionais ou neonatais",
      details:
        "Espaço para o luto, compreensão da dor e estratégias de ressignificação.",
      image: {
        src: "/images/services/luto-perinatal.jpg",
        alt: "Casal abraçado em gesto de acolhimento",
      },
    },
    {
      title: "Desenvolvimento Infantil",
      description: "Orientação nos primeiros anos de vida",
      details:
        "Cuidados com sono, alimentação e estímulos afetivos, incluindo apoio à paternidade.",
      image: {
        src: "/images/services/desenvolvimento-infantil.jpg",
        alt: "Crianças pequenas brincando juntas no tapete",
      },
    },
    {
      title: "Orientação Parental",
      description: "Suporte para pais e cuidadores",
      details:
        "Desenvolvimento de habilidades para lidar com os desafios da criação dos filhos.",
      image: {
        src: "/images/services/orientacao-parental.png",
        alt: "Pais lendo uma história com a filha em clima acolhedor",
      },
    },
    {
      title: "Adolescência",
      description: "Apoio psicológico para adolescentes",
      details:
        "Questões de identidade, autoestima, relacionamentos e transições dessa fase da vida.",
      image: {
        src: "/images/services/adolescencia.jpg",
        alt: "Adolescente sorrindo ao ar livre",
      },
    },
    {
      title: "Acompanhamento Psiquiátrico",
      description: "Suporte complementar ao tratamento médico",
      details:
        "Promoção do bem-estar emocional e da adesão ao tratamento psiquiátrico.",
      image: {
        src: "/images/services/acompanhamento-psiquiatrico.jpg",
        alt: "Profissional de saúde anotando durante sessão terapêutica",
      },
    },
  ];

  // Schema.org para lista de serviços
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Serviços de Psicologia Clínica",
    description:
      "Especialidades oferecidas pela Psicóloga Danielle Vincenzo em São Paulo",
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
        description: `${service.description}. ${service.details}`,
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
    <section
      id="servicos"
      className="bg-gradient-to-br from-cream-light/20 to-white py-20 md:py-32 relative overflow-hidden"
    >
      {/* Schema estruturado para serviços */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green/10 rounded-full -ml-20 -mb-20 hidden md:block"></div>

      <div className="section-container relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <article key={index} className="h-full" aria-label={service.title}>
              <Card className="h-full flex flex-col overflow-hidden border-green/10 bg-white/80 backdrop-blur transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 280px, (min-width: 768px) 50vw, 100vw"
                    priority={index < 2}
                  />
                </div>
                <CardHeader className="space-y-3 pb-0">
                  <CardTitle className="text-xl md:text-2xl text-green-dark">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                {service.details && (
                  <CardContent className="pt-4">
                    <p className="text-sm text-gray-600">{service.details}</p>
                  </CardContent>
                )}
              </Card>
            </article>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-xl p-8 md:p-12 shadow-md border border-green/10 transform hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green/10 px-3 py-1.5 rounded-full text-green-dark text-sm font-medium mb-4">
              <Laptop className="w-4 h-4" />
              <span>Flexível e Conveniente</span>
            </div>

            <h3 className="heading-md mb-4 text-green-dark">
              Atendimento Online
            </h3>
            <p className="text-gray-600 mb-8">
              Ofereço terapia online através de plataforma segura e
              confidencial. É uma opção conveniente e eficaz, especialmente para
              quem tem agenda corrida, viaja com frequência ou prefere o
              conforto de sua casa.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => {
                sendGAEvent("event", "WhatsAppClick", {
                  event_category: "engagement",
                  event_label: "services_section",
                });
                const message = encodeURIComponent(
                  "Olá, vim pelo site e gostaria de saber mais sobre seus serviços"
                );
                window.open(
                  `https://wa.me/5511964556323?text=${message}`,
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              style={{ backgroundColor: "rgb(29, 215, 113)" }}
            >
              <span>Agendar Consulta Online</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
