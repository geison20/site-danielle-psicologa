import Image from "next/image";
import { BookOpen, GraduationCap, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const MANOLE_URL =
  "https://www.manole.com.br/estimulacao-cognitiva-de-idosos-1-edicao/p";

export default function Publications() {
  return (
    <section
      id="publicacoes"
      aria-labelledby="publicacoes-heading"
      className="pt-24 md:pt-32 pb-24 md:pb-32"
    >
      <div className="section-container">
        <h2 id="publicacoes-heading" className="heading-lg text-center mb-10">
          Publicações e Docência
        </h2>

        {/* E-book card */}
        <Card className="mb-8 overflow-hidden border-green/15 bg-white/90 shadow-sm">
          <div className="grid gap-0 md:grid-cols-[320px_1fr] md:items-stretch">
            <div className="relative h-64 bg-white md:h-full">
              <div className="absolute inset-0 p-6 md:p-8">
                <div className="relative h-full w-full">
                  <Image
                    src="/capa_livro_danielle_robertis.png"
                    alt="Capa do livro Reconecta: Atendimento de Pacientes sem Comunicação Verbal"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 320px"
                    priority={false}
                  />
                </div>
              </div>
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
                    aria-label="Abrir página do e-book na Editora Manole"
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
      </div>
    </section>
  );
}
