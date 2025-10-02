import Image from "next/image";
import {
  GraduationCap,
  Heart,
  Stethoscope,
  School,
  BookOpen,
  Users,
} from "lucide-react";

const About = () => {
  return (
    <section id="sobre" className="bg-white">
      <div className="section-container">
        <header className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="heading-lg">Sobre Mim</h2>
        </header>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div>
            <figure className="relative rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/danielle-robertis-psicologa-sobre.jpeg"
                alt="Psicóloga Danielle Robertis de Vincenzo"
                width={800}
                height={1000}
                sizes="(max-width: 768px) 100vw, 38vw"
                className="w-full object-cover aspect-square"
                priority
              />
              <figcaption className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/55 to-transparent text-white">
                <div className="text-sm font-semibold leading-tight">Danielle Robertis de Vincenzo</div>
                <div className="text-[11px] text-white/80 leading-tight">CRP 06/134354</div>
              </figcaption>
            </figure>

            <div className="mt-4 rounded-xl border border-[#E3ECE7] bg-[#F6FBF8] p-4">
              <div className="flex gap-3">
                <div className="mt-0.5 h-6 w-6 rounded-full bg-green/10 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-green" aria-hidden="true"/>
                </div>
                <div>
                  <div className="text-sm font-medium text-heading">Um pouco mais sobre mim</div>
                  <p className="mt-1 text-xs text-[#677e77] leading-relaxed">
                    Sou mãe do Davi e acredito que a experiência da maternidade
                    me trouxe uma compreensão ainda mais profunda sobre os
                    desafios e as transformações dessa jornada.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[#677e77] leading-relaxed">
              Sou <strong className="text-heading">Danielle Robertis de Vincenzo</strong> (CRP
              06/134354), psicóloga clínica com sólida formação e experiência
              acadêmica e profissional.
            </p>
            <p className="mt-4 text-[#677e77] leading-relaxed">
              Atuo como psicóloga no ambulatório de gestantes e puérperas do
              Instituto de Psiquiatria do Hospital das Clínicas da FMUSP
              (IPq‑FMUSP), onde desenvolvo experiência em saúde mental,
              psicopatologia e acompanhamento de demandas emocionais
              relacionadas à maternidade, parentalidade e adoção.
            </p>
            <p className="mt-4 text-[#677e77] leading-relaxed">
              Tenho trajetória de 4 anos como docente na Pós‑Graduação da
              Faculdade de Medicina da Universidade de São Paulo (FMUSP), nas
              áreas de vínculo materno, adoção e desenvolvimento
              infantojuvenil, contribuindo para a formação de profissionais e a
              produção de conhecimento científico nessas áreas.
            </p>
            <p className="mt-4 text-[#677e77] leading-relaxed">
              Minha experiência reúne a prática clínica, o ensino, a pesquisa e
              a produção científica, sempre com foco na promoção do bem‑estar
              emocional, na saúde mental perinatal, na saúde da mulher e no
              fortalecimento dos vínculos familiares.
            </p>

            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-green" />
                <h3 className="font-semibold text-heading">Formação Acadêmica</h3>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-[#E3ECE7] bg-white p-4">
                  <div className="text-sm font-medium">
                    Especialização em Psicopatologia e Saúde Mental
                  </div>
                  <div className="text-xs text-[#677e77]">
                    Instituto de Psiquiatria da Faculdade de Medicina da USP
                    (IPq‑FMUSP)
                  </div>
                </div>
                <div className="rounded-xl border border-[#E3ECE7] bg-white p-4">
                  <div className="text-sm font-medium">
                    Formação em Saúde da Mulher e Psicologia Perinatal
                  </div>
                  <div className="text-xs text-[#677e77]">
                    Faculdade de Medicina da USP (FMUSP)
                  </div>
                </div>
              </div>

              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#E3ECE7] bg-[#F6FBF8] p-3 text-sm text-[#677e77] flex items-start gap-2">
                  <Stethoscope className="w-4 h-4 text-green mt-0.5" />
                  <span>
                    Psicóloga no ambulatório de gestantes e puérperas do
                    IPq‑FMUSP
                  </span>
                </div>
                <div className="rounded-xl border border-[#E3ECE7] bg-[#F6FBF8] p-3 text-sm text-[#677e77] flex items-start gap-2">
                  <School className="w-4 h-4 text-green mt-0.5" />
                  <span>
                    4 anos como docente na Pós‑Graduação da FMUSP
                  </span>
                </div>
                <div className="rounded-xl border border-[#E3ECE7] bg-[#F6FBF8] p-3 text-sm text-[#677e77] flex items-start gap-2">
                  <BookOpen className="w-4 h-4 text-green mt-0.5" />
                  <span>
                    Autora do e‑book “Reconecta: Atendimento de Pacientes sem
                    Comunicação Verbal”
                  </span>
                </div>
                <div className="rounded-xl border border-[#E3ECE7] bg-[#F6FBF8] p-3 text-sm text-[#677e77] flex items-start gap-2">
                  <Users className="w-4 h-4 text-green mt-0.5" />
                  <span>
                    Especialista em vínculo materno, adoção e desenvolvimento
                    infantojuvenil
                  </span>
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
