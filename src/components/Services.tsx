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
} from "lucide-react";

const Services = () => {
  const isMobile = false;

  const services = [
    {
      title: "Terapia Individual",
      description:
        "Atendimento personalizado para adultos e adolescentes, focado em questões emocionais e comportamentais.",
      details:
        "Sessões de 50 minutos, formato presencial ou online, abordagem cognitivo-comportamental.",
      icon: "user",
    },
    {
      title: "Terapia para Casais",
      description:
        "Facilitação do diálogo e resolução de conflitos, fortalecendo a comunicação e reconexão emocional.",
      details:
        "Sessões de 1h30, formato presencial ou online, abordagem sistêmica e comportamental.",
      icon: "users",
    },
    {
      title: "Avaliação Psicológica",
      description:
        "Processo de investigação que analisa comportamentos, habilidades e características psicológicas.",
      details:
        "Aplicação de testes psicológicos, entrevistas e observações comportamentais.",
      icon: "list-check",
    },
    {
      title: "Orientação para Pais",
      description:
        "Apoio para o desenvolvimento de habilidades parentais e manejo de comportamentos dos filhos.",
      details:
        "Sessões individuais ou em grupo, abordagem prática com estratégias aplicáveis ao dia a dia.",
      icon: "shield-check",
    },
  ];

  return (
    <section
      id="servicos"
      className="bg-gradient-to-br from-cream-light/20 to-white py-20 md:py-32 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green/5 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green/10 rounded-full -ml-20 -mb-20 hidden md:block"></div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1 bg-green/10 text-green-dark rounded-full text-sm font-medium mb-3">
            Serviços Especializados
          </span>
          <h2 className="heading-lg mb-5">Meus Serviços</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Ofereço uma variedade de serviços terapêuticos adaptados às
            necessidades individuais de cada cliente, com foco em resultados e
            bem-estar emocional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div key={index} className="h-full">
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-green/10 bg-white/80 backdrop-blur">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                    {service.icon === "user" && (
                      <Shield className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "users" && (
                      <Users className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "list-check" && (
                      <ListCheck className="h-6 w-6 text-green" />
                    )}
                    {service.icon === "shield-check" && (
                      <ShieldCheck className="h-6 w-6 text-green" />
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
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-xl p-8 md:p-10 shadow-md border border-green/10 transform hover:shadow-lg transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 bg-green/10 px-3 py-1.5 rounded-full text-green-dark text-sm font-medium mb-4">
                <Laptop className="w-4 h-4" />
                <span>Flexível e Conveniente</span>
              </div>

              <h3 className="heading-md mb-5 text-green-dark">
                Atendimento Online
              </h3>
              <p className="text-gray-600 mb-6">
                Ofereço terapia online através de plataforma segura e
                confidencial. É uma opção conveniente e eficaz, especialmente
                para quem tem agenda corrida, viaja com frequência ou prefere o
                conforto de sua casa.
              </p>

              <ul className="space-y-3">
                {[
                  "Mesma qualidade do atendimento presencial",
                  "Flexibilidade de horários",
                  "Economia de tempo e deslocamento",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="bg-green/10 p-1.5 rounded-full mt-0.5">
                      <Check className="h-4 w-4 text-green" />
                    </span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative order-1 md:order-2">
              <div className="absolute -top-3 -left-3 w-full h-full bg-cream-light/50 rounded-lg transform -rotate-3"></div>
              <img
                src="https://source.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                alt="Atendimento online"
                className="rounded-lg h-full w-full object-cover shadow-md relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
