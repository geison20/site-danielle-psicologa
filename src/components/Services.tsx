import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Check,
  Laptop,
  Shield,
  Users,
  ListCheck,
  ShieldCheck,
  Heart,
  Baby,
  UserCheck,
  Stethoscope,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      title: "Perinatalidade",
      description: "Planejamento familiar e maternidade",
      details:
        "Acompanhamento para mulheres e casais que enfrentam desafios relacionados à gestação, adoção ou parentalidade.",
      icon: "heart",
    },
    {
      title: "Gestação e Pós-Parto",
      description: "Apoio emocional durante a gravidez e o puerpério",
      details:
        "Gestão da ansiedade, identidade materna e estratégias de autocuidado.",
      icon: "baby",
    },
    {
      title: "Relação Mãe-Bebê",
      description: "Fortalecimento do vínculo afetivo",
      details:
        "Orientações para promover conexão saudável desde os primeiros momentos de vida.",
      icon: "users",
    },
    {
      title: "Luto Perinatal",
      description: "Acolhimento em perdas gestacionais ou neonatais",
      details:
        "Espaço para o luto, compreensão da dor e estratégias de ressignificação.",
      icon: "shield",
    },
    {
      title: "Desenvolvimento Infantil",
      description: "Orientação nos primeiros anos de vida",
      details:
        "Cuidados com sono, alimentação e estímulos afetivos, incluindo apoio à paternidade.",
      icon: "baby",
    },
    {
      title: "Orientação Parental",
      description: "Suporte para pais e cuidadores",
      details:
        "Desenvolvimento de habilidades para lidar com os desafios da criação dos filhos.",
      icon: "user-check",
    },
    {
      title: "Adolescência",
      description: "Apoio psicológico para adolescentes",
      details:
        "Questões de identidade, autoestima, relacionamentos e transições dessa fase da vida.",
      icon: "users",
    },
    {
      title: "Acompanhamento Psiquiátrico",
      description: "Suporte complementar ao tratamento médico",
      details:
        "Promoção do bem-estar emocional e da adesão ao tratamento psiquiátrico.",
      icon: "stethoscope",
    },
  ];

  // Schema.org para lista de serviços
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Serviços de Psicologia Clínica",
    description: "Especialidades oferecidas pela Psicóloga Danielle Vincenzo em São Paulo",
    provider: {
      "@type": "Person",
      name: "Danielle Robertis de Vincenzo",
      jobTitle: "Psicóloga Clínica",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        identifier: "CRP 06/134354"
      }
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
          name: "Danielle Robertis de Vincenzo"
        },
        location: {
          "@type": "Place",
          name: "Consultório Psicológico Danielle Vincenzo",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Av. Paulista, 1000, cj 101",
            addressLocality: "São Paulo",
            addressRegion: "SP",
            addressCountry: "BR"
          }
        }
      }
    }))
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
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-green/10 text-green-dark rounded-full text-sm font-medium mb-3">
            Áreas de Atuação
          </span>
          <h2 className="heading-lg mb-5">Como posso ajudar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conheça minhas especialidades e escolha o acompanhamento que melhor
            se adequa às suas necessidades.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <article key={index} className="h-full" aria-label={service.title}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-green/10 bg-white/80 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                    {service.icon === "heart" && (
                      <Heart className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "baby" && (
                      <Baby className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "users" && (
                      <Users className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "shield" && (
                      <Shield className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "user-check" && (
                      <UserCheck className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "stethoscope" && (
                      <Stethoscope className="h-6 w-6 text-green" />
                    )}
                  </div>
                  <CardTitle className="text-xl md:text-2xl text-green-dark">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 text-gray-700">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 pt-1">
                    {service.details}
                  </p>
                </CardContent>
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
            <a
              href="https://wa.me/5511964556323"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
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
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
