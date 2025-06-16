import React from "react";
import { MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const Location = () => {
  const isMobile = false;

  const address =
    "Torre Norte - R. Nove de Julho, 72 - Conjunto 141 - Alto da Boa Vista, São Paulo - SP, 05716-150";
  const encodedAddress = encodeURIComponent(address);
  const phone = "+5511964556323";

  // Dados estruturados para SEO local
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: "Psicóloga Danielle Vincenzo",
    image: "https://www.seusite.com.br/danielle-robertis-psicologa.jpeg",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Nove de Julho, 72 - Conjunto 141",
      addressLocality: "Alto da Boa Vista",
      addressRegion: "SP",
      postalCode: "05716-150",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.643813,
      longitude: -46.702601,
    },
    telephone: "+55 11 96455-6323",
    url: "https://www.seusite.com.br/",
    priceRange: "R$",
    openingHours: "Mo-Fr 09:00-19:00",
  };

  return (
    <section
      id="location"
      className="bg-gradient-to-br from-purple-light/30 to-white py-16 md:py-32 relative overflow-hidden"
    >
      {/* Dados estruturados para SEO local */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple/5 rounded-full hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/10 rounded-full hidden md:block"></div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple/10 text-purple-dark rounded-full text-sm font-medium mb-3">
            Onde Atendo
          </span>
          <h2 className="heading-lg mb-5">
            Consultório de Psicologia em São Paulo - Alto da Boa Vista
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Psicóloga Danielle Vincenzo atende em consultório localizado no
            bairro Alto da Boa Vista, São Paulo, com fácil acesso, ambiente
            tranquilo e acolhedor. Agende sua consulta presencial ou online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="order-2 md:order-1">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-purple/10 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple/10 transform rotate-45 translate-x-10 -translate-y-10"></div>
              </div>

              <h3 className="heading-sm mb-6 flex items-center gap-2 text-purple-dark">
                <div className="p-2 bg-purple/10 rounded-lg">
                  <MapPin className="text-purple" />
                </div>
                Endereço
              </h3>

              <address className="not-italic space-y-3 mb-8 text-gray-700">
                <p className="font-medium">Torre Norte</p>
                <p>R. Nove de Julho, 72 - Conjunto 141</p>
                <p>Alto da Boa Vista</p>
                <p>São Paulo - SP</p>
                <p>CEP: 05716-150</p>
              </address>

              <a
                href={`tel:${phone}`}
                className="inline-flex items-center gap-2 text-purple-dark font-medium mb-4 hover:underline"
                aria-label="Ligar para o consultório Danielle Vincenzo"
                title="Ligar para o consultório Danielle Vincenzo"
              >
                <Phone className="w-4 h-4" />
                (11) 96455-6323
              </a>

              <Button asChild className="group bg-purple hover:bg-purple-dark">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                  aria-label="Abrir rota para o consultório no Google Maps"
                  title="Como chegar ao consultório pelo Google Maps"
                >
                  <Navigation className="mr-1 group-hover:animate-pulse" />
                  Como chegar
                </a>
              </Button>
            </div>
          </div>

          <div
            className={`w-full ${
              isMobile ? "h-[300px]" : "h-[500px]"
            } order-1 md:order-2`}
          >
            <figure className="w-full h-full relative rounded-xl overflow-hidden shadow-xl">
              {/* Map overlay with subtle gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10 pointer-events-none"></div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5735.152440285048!2d-46.70260153348331!3d-23.643813032368598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50edcb389535%3A0xbf9314a8e9fcb118!2sPsic%C3%B3loga%20Danielle%20Robertis%20Vincenzo!5e0!3m2!1spt-BR!2sbr!4v1746743998621!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do consultório"
                className="z-0"
              ></iframe>
              <figcaption className="sr-only">
                Mapa de localização do consultório Danielle Vincenzo
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
