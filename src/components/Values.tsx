import { Heart, Sparkles, Users } from "lucide-react";

const values = [
  {
    title: "Acolhimento",
    description: "Escuta cuidadosa, sem julgamentos e no seu próprio ritmo.",
    Icon: Heart,
  },
  {
    title: "Respeito",
    description: "Um olhar sensível para sua história, contexto e singularidade.",
    Icon: Users,
  },
  {
    title: "Transformação",
    description: "Mais consciência para construir escolhas e vínculos saudáveis.",
    Icon: Sparkles,
  },
];

export default function Values() {
  return (
    <section
      aria-labelledby="values-heading"
      className="relative overflow-hidden bg-cream-light"
    >
      <div
        className="absolute -right-24 top-10 h-64 w-64 rounded-full bg-green/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="section-container relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <span className="eyebrow">
              <Heart className="h-3.5 w-3.5" />
              Minha abordagem
            </span>
            <h2 id="values-heading" className="heading-lg max-w-[13ch]">
              Vínculos que acolhem e transformam
            </h2>
            <p className="section-lead max-w-xl">
              O bem-estar emocional começa em um espaço seguro. Cada encontro é
              conduzido com escuta atenta, respeito à diversidade e cuidado
              genuíno com a sua história.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:gap-4">
            {values.map(({ title, description, Icon }) => (
              <article
                key={title}
                className="surface-card flex items-start gap-4 p-5 sm:block sm:min-h-52 sm:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green/10 text-green-dark ring-1 ring-green/15 sm:mb-8">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-heading">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-foreground">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
