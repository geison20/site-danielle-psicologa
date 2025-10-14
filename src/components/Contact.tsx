import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Instagram, MapPin, PhoneCall } from "lucide-react";

const phoneDisplay = "(11) 96455-6323";
const phoneLink = "+5511964556323";
const email = "danielle.robertis.psicologa@gmail.com";
const instagramHandle = "@danielle.psicologia";
const instagramUrl = "https://instagram.com/danielle.psicologia";

export default function Contact() {
  return (
    <section id="location" aria-labelledby="contact-heading" className="bg-cream/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto">
          <h2 id="contact-heading" className="heading-lg mb-3">
            Entre em Contato
          </h2>
          <p className="text-foreground">
            Estou disponível para acolher suas necessidades e iniciar um processo de cuidado emocional
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Telefone */}
          <Card className="border-green/15">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-foreground/80">Telefone/WhatsApp</p>
                <a href={`tel:${phoneLink}`} className="block font-heading text-xl text-heading mt-1">
                  {phoneDisplay}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="border-green/15">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-foreground/80">E-mail</p>
                <a href={`mailto:${email}`} className="block font-heading text-xl text-heading mt-1 break-all">
                  {email}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="border-green/15">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                <Instagram className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-foreground/80">Instagram</p>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-heading text-xl text-heading mt-1"
                >
                  {instagramHandle}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="border-green/15">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green/10 text-green ring-1 ring-green/20">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-foreground/80">Endereço</p>
                <div className="mt-1 text-foreground">
                  <p>R. Nove de Julho, 72 - Conjunto 141, Torre Norte</p>
                  <p>Alto da Boa Vista, São Paulo - SP</p>
                  <p>CEP: 05716-150</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA box */}
        <div className="mt-8 rounded-2xl border border-green/15 bg-green/5 p-8 md:p-10 text-center">
          <h3 className="font-heading text-2xl text-heading mb-3">Agende sua consulta</h3>
          <p className="text-foreground max-w-2xl mx-auto">
            Entre em contato pelo WhatsApp para agendar sua primeira consulta ou tirar dúvidas sobre o processo terapêutico.
          </p>

          <div className="mt-6 flex justify-center">
            <Button asChild size="lg" className="px-6">
              <a
                href={`https://wa.me/${phoneLink}?text=${encodeURIComponent("Olá, vim pelo site e gostaria de agendar uma consulta")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar pelo WhatsApp"
              >
                <PhoneCall className="mr-2 h-5 w-5" /> Falar pelo WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
