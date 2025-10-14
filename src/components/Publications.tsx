import Image from "next/image";
import { BookOpen, GraduationCap, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MANOLE_URL =
  "https://manole.com.br/reconecta-atendimento-de-pacientes-sem-comunicacao-verbal";

export default function Publications() {
  return (
    <section
      id="publicacoes"
      aria-labelledby="publicacoes-heading"
    >
      <div className="section-container">
        <h2 id="publicacoes-heading" className="heading-lg text-center mb-10">
          Publicações e Docência
        </h2>

        {/* E-book card */}
        <Card className="mb-8 overflow-hidden border-green/15 bg-white/90 shadow-sm">
          <div className="grid gap-0 md:grid-cols-[320px_1fr]">
            <div className="relative h-56 md:h-full">
              <Image
                src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1200&auto=format&fit=crop"
                alt="Capa ilustrativa do e-book Reconecta"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 320px"
                priority={false}
              />
              <div className="absolute inset-0 bg-green/10 mix-blend-multiply" />
            </div>

            <CardContent className="p-6 md:p-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-heading text-2xl text-heading">
                    E-book Reconecta
                  </h3>
                  <p className="text-lg text-foreground">
                    Atendimento de Pacientes sem Comunicação Verbal
                  </p>
                  <p className="text-sm text-foreground/80">Editora Manole, 2021</p>
                </div>
              </div>

              <p className="mt-4 max-w-3xl text-foreground leading-relaxed">
                Obra que orienta profissionais da saúde no atendimento de
                pacientes com dificuldades de comunicação verbal, reunindo
                experiência clínica e conhecimento científico para apoiar a
                prática profissional.
              </p>

              <div className="mt-6">
                <Button asChild className="px-5">
                  <a
                    href={MANOLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Abrir página do e-book Reconecta na Editora Manole"
                    title="Ver na Editora Manole"
                  >
                    Ver na Editora Manole
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Academic experience */}
        <Card className="border-green/15 bg-white/90 shadow-sm">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-heading mb-2">
                  Experiência Acadêmica
                </h3>
                <p className="text-foreground leading-relaxed">
                  Com 4 anos de experiência como docente na Pós-Graduação da
                  Faculdade de Medicina da USP (FMUSP), contribuo para a
                  formação de profissionais nas áreas de <strong>vínculo
                  materno</strong>, <strong>adoção</strong> e <strong>
                  desenvolvimento infantojuvenil</strong>, aliando prática
                  clínica e produção de conhecimento científico.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
