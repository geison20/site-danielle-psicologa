import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight, Clock, Phone, Send } from "lucide-react";
import Image from "next/image";

const CTASection = () => {
  const isMobile = false;

  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-green/10 via-white to-cream-light/20 py-20 md:py-28 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-green/5 rounded-full -ml-20 -mt-20"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-green/5 rounded-full -mr-20 -mb-20"></div>

      <div className="section-container relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border border-green/10 overflow-hidden">
          <div className="grid md:grid-cols-5 items-stretch">
            {/* Left Column - Image */}
            <div className="relative h-64 md:h-full md:col-span-2">
              <div className="absolute inset-0">
                <Image
                  src="https://source.unsplash.com/photo-1601934025804-0976749c550f"
                  alt="Psicóloga atendendo paciente"
                  fill
                  className="w-full h-full object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-green-dark/30"></div>
              </div>

              {!isMobile && (
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg max-w-xs">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-green/10 rounded-full">
                        <Clock className="text-green w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">
                          Resposta rápida
                        </h4>
                        <p className="text-sm text-gray-600">
                          Retorno em até 24h úteis após o seu contato para
                          agendarmos sua consulta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Content */}
            <div className="p-6 sm:p-10 md:p-12 md:col-span-3 flex flex-col justify-center">
              <div>
                <span className="inline-block px-4 py-1 bg-green/10 text-green-dark rounded-full text-sm font-medium mb-4">
                  Agende Agora
                </span>

                <h2 className="heading-lg mb-4 text-gray-900">
                  Dê o primeiro passo para o seu bem-estar emocional
                </h2>

                <p className="text-gray-600 mb-8 max-w-lg">
                  Estou disponível para ajudar você em sua jornada de
                  autoconhecimento e transformação. Entre em contato para
                  agendar sua consulta ou tirar dúvidas sobre o processo
                  terapêutico.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-green" />
                    </div>
                    <div>
                      <p className="font-medium">WhatsApp</p>
                      <p className="text-sm text-gray-600">
                        Resposta rápida via mensagem
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-cream-light flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-green" />
                    </div>
                    <div>
                      <p className="font-medium">Ligação</p>
                      <p className="text-sm text-gray-600">
                        Contato direto para dúvidas
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green hover:bg-green-dark text-white shadow-lg hover:shadow-xl transition-all"
                  >
                    <a
                      href="https://wa.me/5511964556323"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      Agendar pelo WhatsApp
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
