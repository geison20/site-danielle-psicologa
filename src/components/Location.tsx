import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

const Location = () => {
  const isMobile = false;
  const address =
    "Torre Norte - R. Nove de Julho, 72 - Conjunto 141 - Alto da Boa Vista, São Paulo - SP, 05716-150";
  const encodedAddress = encodeURIComponent(address);

  return (
    <section
      id="location"
      className="bg-gradient-to-br from-purple-light/30 to-white py-16 md:py-32 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple/5 rounded-full hidden md:block"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple/10 rounded-full hidden md:block"></div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-purple/10 text-purple-dark rounded-full text-sm font-medium mb-3">
            Onde Atendo
          </span>
          <h2 className="heading-lg mb-5">Localização</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Consultório localizado em uma região de fácil acesso em São Paulo,
            com ambiente tranquilo e acolhedor.
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

              <div className="space-y-3 mb-8">
                <p className="font-medium">Torre Norte</p>
                <p>R. Nove de Julho, 72 - Conjunto 141</p>
                <p>Alto da Boa Vista</p>
                <p>São Paulo - SP</p>
                <p>CEP: 05716-150</p>
              </div>

              <Button asChild className="group bg-purple hover:bg-purple-dark">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Navigation className="mr-1 group-hover:animate-pulse" />
                  Como chegar
                </a>
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
                <img
                  src="https://source.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800"
                  srcSet="
                    https://source.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=400 400w,
                    https://source.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=600 600w,
                    https://source.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=800 800w,
                    https://source.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&q=80&w=1200 1200w
                  "
                  sizes="(max-width: 640px) 50vw, 25vw"
                  width={800}
                  height={600}
                  alt="Psicóloga em sessão de terapia"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full">
                <img
                  src="https://source.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800"
                  srcSet="
                    https://source.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=400 400w,
                    https://source.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600 600w,
                    https://source.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800 800w,
                    https://source.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200 1200w
                  "
                  sizes="(max-width: 640px) 50vw, 25vw"
                  width={800}
                  height={600}
                  alt="Ambiente acolhedor do consultório"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div
            className={`w-full ${
              isMobile ? "h-[300px]" : "h-[500px]"
            } order-1 md:order-2`}
          >
            <div className="w-full h-full relative rounded-xl overflow-hidden shadow-xl">
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
            </div>
          </div>
        </div>

        {/* Additional information about the area */}
        <div className="mt-16 p-6 md:p-8 bg-purple/5 rounded-xl border border-purple/10">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="shrink-0 p-3 bg-purple/10 rounded-full">
              <MapPin className="h-6 w-6 text-purple" />
            </div>
            <div>
              <h4 className="text-lg font-medium mb-2">
                Localização privilegiada
              </h4>
              <p className="text-gray-600">
                O consultório está localizado em uma região de fácil acesso,
                próximo às principais vias da cidade e com diversas opções de
                transporte público. Estacionamento disponível no local.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
