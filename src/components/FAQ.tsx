"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqData: FAQItem[] = [
    {
      question: "Como funciona a primeira consulta com psicóloga?",
      answer: "A primeira consulta é um momento de acolhimento e conhecimento mútuo. Conversaremos sobre suas necessidades, histórico e objetivos terapêuticos. É um espaço seguro para você se expressar livremente e entendermos juntas o melhor caminho para seu bem-estar emocional."
    },
    {
      question: "Qual a duração de uma sessão de terapia?",
      answer: "Cada sessão tem duração de 50 minutos. Este tempo é estruturado para permitir um trabalho terapêutico efetivo, respeitando tanto suas necessidades quanto o processo terapêutico adequado."
    },
    {
      question: "Com que frequência devo fazer terapia?",
      answer: "Geralmente recomendo sessões semanais, especialmente no início do processo terapêutico. A frequência pode ser ajustada conforme seu progresso e necessidades específicas, sempre em comum acordo."
    },
    {
      question: "Atende adolescentes a partir de que idade?",
      answer: "Atendo adolescentes a partir dos 12 anos. Para menores de 18 anos, é necessária a presença e autorização dos responsáveis. O trabalho com adolescentes inclui questões de identidade, autoestima e relacionamentos típicos desta fase."
    },
    {
      question: "Oferece acompanhamento durante a gravidez?",
      answer: "Sim, sou especialista em psicologia perinatal. Ofereço acompanhamento durante toda a gestação, parto e pós-parto, trabalhando questões como ansiedade, mudanças corporais, preparação para a maternidade e fortalecimento do vínculo mãe-bebê."
    },
    {
      question: "Como é o trabalho de orientação parental?",
      answer: "A orientação parental envolve estratégias práticas para lidar com desafios da criação dos filhos, desenvolvimento de habilidades parentais, estabelecimento de limites saudáveis e fortalecimento dos vínculos familiares."
    },
    {
      question: "Qual a diferença entre acompanhamento psicológico e psiquiátrico?",
      answer: "O acompanhamento psicológico foca na terapia através da conversa e técnicas psicoterapêuticas. Quando há acompanhamento psiquiátrico simultâneo, trabalho de forma complementar ao tratamento médico, promovendo bem-estar emocional e adesão ao tratamento."
    },
    {
      question: "Onde fica localizado o consultório?",
      answer: "O consultório está localizado na Av. Paulista, 1000, conjunto 101, no coração de São Paulo. É um ambiente acolhedor e reservado, com fácil acesso por transporte público e particular."
    }
  ];

  // Schema.org para FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "Perguntas Frequentes - Psicóloga Danielle Vincenzo",
    description: "Principais dúvidas sobre atendimento psicológico, terapia e especialidades da Psicóloga Danielle Vincenzo em São Paulo",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section
      id="faq"
      className="bg-gradient-to-br from-white to-cream-light/30 py-20 md:py-32 relative overflow-hidden"
    >
      {/* Schema estruturado para FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-80 h-80 bg-green/5 rounded-full -ml-20 -mt-20"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-64 h-64 bg-green/10 rounded-full -mr-20 -mb-20"
        aria-hidden="true"
      ></div>

      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1 bg-green/10 text-green-dark rounded-full text-sm font-medium mb-3">
            <HelpCircle className="w-4 h-4" />
            Perguntas Frequentes
          </span>
          <h2 className="heading-lg mb-5">Tire suas dúvidas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Confira as respostas para as principais perguntas sobre
            atendimento psicológico e meus serviços especializados.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index);
              
              return (
                <Card 
                  key={index}
                  className="bg-white/80 backdrop-blur border-green/10 hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(index)}
                      className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-green/50 rounded-lg"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-green-dark pr-4">
                          {item.question}
                        </h3>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-green flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-green flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div 
                        id={`faq-answer-${index}`}
                        className="px-6 pb-6 animate-fade-in"
                      >
                        <div className="border-t border-green/10 pt-4">
                          <p className="text-gray-700 leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-green/5 border-green/20 p-8">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-green-dark mb-3">
                  Não encontrou sua dúvida?
                </h3>
                <p className="text-gray-700 mb-6">
                  Entre em contato comigo pelo WhatsApp. Ficarei feliz em
                  esclarecer suas questões e ajudar você a dar o primeiro passo
                  rumo ao seu bem-estar emocional.
                </p>
                <a
                  href="https://wa.me/5511964556323"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green hover:bg-green-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Conversar no WhatsApp
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;