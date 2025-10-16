import Image from "next/image";
import { GraduationCap, Heart, Stethoscope, School } from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="bg-white">
      <div className="section-container">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="heading-lg">Sobre Mim</h2>
        </header>

        <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-6 lg:gap-10 items-start">
          <div className="flex flex-col items-center md:items-start gap-5 md:gap-6">
            <figure className="relative w-full max-w-[320px] md:max-w-[340px] rounded-3xl overflow-hidden shadow-xl shadow-green/10 bg-white">
              <Image
                src="/danielle-robertis-psicologa-sobre.jpeg"
                alt="Psicóloga Danielle Robertis de Vincenzo"
                width={800}
                height={1000}
                sizes="(max-width: 768px) 80vw, 340px"
                className="w-full h-full object-cover aspect-[4/5]"
                priority
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1B6C54]/90 via-[#1B6C54]/40 to-transparent text-white">
                <div className="text-sm font-semibold leading-tight">
                  Danielle Robertis de Vincenzo
                </div>
                <div className="text-[11px] text-white/85 leading-tight">
                  CRP 06/134354
                </div>
              </figcaption>
            </figure>

            <div className="w-full max-w-[320px] md:max-w-[340px] rounded-2xl border border-green/15 bg-white/80 p-5 shadow-sm backdrop-blur">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-green/20 bg-green/10 text-green">
                  <Heart className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="text-start">
                  <div className="text-sm font-semibold text-heading">
                    Um pouco mais sobre mim
                  </div>
                  <p className="mt-1 text-sm text-[#4E655B] leading-relaxed">
                    Sou mãe do Davi e acredito que a experiência da maternidade
                    me trouxe uma compreensão ainda mais profunda sobre os
                    desafios e as transformações dessa jornada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4 text-base leading-relaxed text-[#4E655B]">
              <p>
                Sou <strong className="text-heading">Danielle Robertis de Vincenzo</strong> (CRP
                06/134354), psicóloga clínica com sólida formação e experiência
                acadêmica e profissional.
              </p>
              <p>
                Atuo como psicóloga no ambulatório de gestantes e puérperas do
                Instituto de Psiquiatria do Hospital das Clínicas da FMUSP
                (IPq‑FMUSP), onde desenvolvo experiência em saúde mental,
                psicopatologia e acompanhamento de demandas emocionais
                relacionadas à maternidade, parentalidade e adoção.
              </p>
              <p>
                Tenho trajetória de 4 anos como docente na Pós‑Graduação da
                Faculdade de Medicina da Universidade de São Paulo (FMUSP), nas
                áreas de vínculo materno, adoção e desenvolvimento
                infantojuvenil, contribuindo para a formação de profissionais e a
                produção de conhecimento científico nessas áreas.
              </p>
              <p>
                Minha experiência reúne a prática clínica, o ensino, a pesquisa e
                a produção científica, sempre com foco na promoção do bem‑estar
                emocional, na saúde mental perinatal, na saúde da mulher e no
                fortalecimento dos vínculos familiares.
              </p>
            </div>

            <div className="pt-2">
              <div className="mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-green" />
                <h3 className="font-semibold text-heading text-lg">
                  Formação Acadêmica
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-green/15 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-green">
                    <Stethoscope className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-heading">
                      Especialização em Psicopatologia e Saúde Mental
                    </div>
                    <div className="text-xs text-[#4E655B] opacity-80">
                      Instituto de Psiquiatria da Faculdade de Medicina da USP
                      (IPq‑FMUSP)
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-green/15 bg-white p-5 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green/10 text-green">
                    <School className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-heading">
                      Formação em Saúde da Mulher e Psicologia Perinatal
                    </div>
                    <div className="text-xs text-[#4E655B] opacity-80">
                      Faculdade de Medicina da USP (FMUSP)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
