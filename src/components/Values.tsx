import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Users, Sparkles } from "lucide-react";

const values = [
  {
    title: "Acolhimento",
    description: "Um espaço seguro e sem julgamentos para suas emoções",
    Icon: Heart,
  },
  {
    title: "Inclusão",
    description:
      "Respeito e valorização da diversidade em todas as suas formas",
    Icon: Users,
  },
  {
    title: "Transformação",
    description:
      "Crescimento emocional através do autoconhecimento",
    Icon: Sparkles,
  },
];

export default function Values() {
  return (
    <section
      aria-labelledby="values-heading"
      className="bg-gradient-to-b from-cream-light/40 to-transparent"
    >
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-green/10 text-green ring-1 ring-green/20">
            <Heart className="h-6 w-6" />
          </div>
          <h2 id="values-heading" className="heading-xl">
            Construindo Vínculos que Transformam
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground">
            Acredito que o bem-estar emocional se constrói através de vínculos
            saudáveis e do acolhimento genuíno em cada fase da vida. Meu
            trabalho é fundamentado na escuta atenta, no respeito à diversidade
            e na construção de um espaço seguro para que você possa se
            expressar e crescer emocionalmente.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map(({ title, description, Icon }, idx) => (
            <Card
              key={idx}
              className="border-green/15 bg-white/90 p-6 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardHeader className="items-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green/10 text-green ring-1 ring-green/20">
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-xl text-heading">
                  {title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base text-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

