import React from "react";
import { Instagram, Mail, Phone } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const ContactRow = ({
    icon: Icon,
    children,
  }: {
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <div className="flex items-center gap-3 text-foreground">
      <Icon className="h-4 w-4 text-green" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-12">
          {/* Coluna: Sobre */}
          <div>
            <h3 className="heading-sm mb-3">Danielle Robertis de Vincenzo</h3>
            <p className="text-foreground/80 leading-relaxed">
              Psicóloga Clínica especialista em Saúde da Mulher e Psicologia
              Perinatal
            </p>
            <p className="mt-4 text-foreground/70">CRP 06/134354</p>
          </div>

          {/* Coluna: Contato */}
          <div>
            <h3 className="heading-sm mb-3">Contato</h3>
            <div className="space-y-3">
              <ContactRow icon={Phone}>
                <a
                  href="tel:+5511964556323"
                  className="hover:text-green transition-colors"
                >
                  (11) 96455-6323
                </a>
              </ContactRow>
              <ContactRow icon={Mail}>
                <a
                  href="mailto:danielle.robertis.psicologa@gmail.com"
                  className="break-all hover:text-green transition-colors"
                >
                  danielle.robertis.psicologa@gmail.com
                </a>
              </ContactRow>
            </div>
          </div>

          {/* Coluna: Redes Sociais */}
          <div>
            <h3 className="heading-sm mb-3">Redes Sociais</h3>
            <ContactRow icon={Instagram}>
              <a
                href="https://www.instagram.com/danielle.psicologia"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:text-green transition-colors"
              >
                @danielle.psicologia
              </a>
            </ContactRow>
          </div>
        </div>

        <Separator className="bg-border" />

        <div className="py-6 text-center text-foreground/70 text-sm">
          <p>
            © {currentYear} Danielle Robertis de Vincenzo. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
