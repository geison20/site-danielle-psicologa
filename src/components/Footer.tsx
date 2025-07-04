import React from "react";
import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const SocialLink = ({
    href,
    icon: Icon,
    label,
  }: {
    href: string;
    icon: React.ElementType;
    label: string;
  }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="bg-cream-light/20 p-3 rounded-full hover:bg-cream-light/40 hover:scale-110 transition-all duration-300"
      aria-label={label}
      title={label}
    >
      <Icon className="h-5 w-5 text-green" />
    </a>
  );

  const FooterLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <li className="text-gray-300 hover:text-green transition-colors flex items-center gap-2 group">
      <span
        className="w-0 h-[1px] bg-green group-hover:w-3 transition-all duration-300"
        aria-hidden="true"
      ></span>
      <a href={href}>{children}</a>
    </li>
  );

  const ContactItem = ({
    icon: Icon,
    title,
    children,
  }: {
    icon: React.ElementType;
    title: string;
    children: React.ReactNode;
  }) => (
    <li className="flex items-start gap-3">
      <div className="mt-1 bg-green/10 p-2 rounded-full" aria-hidden="true">
        <Icon className="h-4 w-4 text-green-light" />
      </div>
      <div>
        <p className="mb-1 font-medium text-white/90">{title}</p>
        {children}
      </div>
    </li>
  );

  return (
    <section className="relative bg-gray-900 text-white pt-16 pb-8 overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute top-0 left-0 w-40 h-40 bg-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 right-0 w-60 h-60 bg-green/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
          <div>
            <h3 className="text-xl font-serif font-bold mb-5 text-white relative inline-block">
              Danielle Robertis de Vincenzo
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-green"
                aria-hidden="true"
              ></span>
            </h3>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6">
              <p className="text-gray-300 mb-5 leading-relaxed">
                Psicóloga clínica especialista em Psicopatologia e Psiquiatria.
                Oferece acolhimento psicológico para adolescentes,
                mulheres e famílias, promovendo vínculos saudáveis em todas as
                fases da vida.
              </p>
              <p className="text-green-light font-medium">CRP 06/134354</p>

              <div
                className="flex flex-wrap gap-4 mt-6"
                aria-label="Redes sociais"
              >
                <SocialLink
                  href="https://www.facebook.com/psico.daniellerobertis"
                  icon={Facebook}
                  label="Siga-me no Facebook"
                />
                <SocialLink
                  href="https://www.instagram.com/danielle.psicologia"
                  icon={Instagram}
                  label="Siga-me no Instagram"
                />
              </div>
            </Card>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold mb-5 text-white relative inline-block">
              Links Rápidos
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-green"
                aria-hidden="true"
              ></span>
            </h3>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full p-6">
              <nav aria-label="Links do rodapé">
                <ul className="space-y-3">
                  <FooterLink href="#sobre">Sobre</FooterLink>
                  <FooterLink href="#servicos">Serviços</FooterLink>
                  <FooterLink href="#depoimentos">Depoimentos</FooterLink>
                  <FooterLink href="#location">Localização</FooterLink>
                </ul>
              </nav>
            </Card>
          </div>

          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-xl font-serif font-bold mb-5 text-white relative inline-block">
              Contato
              <span
                className="absolute -bottom-1 left-0 w-12 h-0.5 bg-green"
                aria-hidden="true"
              ></span>
            </h3>
            <Card className="bg-white/5 backdrop-blur-sm border-white/10 h-full p-6">
              <address className="not-italic">
                <ul className="space-y-5 text-gray-300">
                  <ContactItem icon={Mail} title="E-mail">
                    <p className="text-white/80 hover:text-green transition-colors">
                      <a href="mailto:danielle.robertis.psicologa@gmail.com">
                        danielle.robertis.psicologa@gmail.com
                      </a>
                    </p>
                  </ContactItem>
                  <ContactItem icon={Phone} title="Telefone">
                    <p className="text-white/80 hover:text-green transition-colors">
                      <a href="tel:+5511964556323">(11) 96455-6323</a>
                    </p>
                  </ContactItem>
                  <ContactItem icon={MapPin} title="Endereço">
                    <p className="text-white/80">Av. Paulista, 1000, cj 101</p>
                    <p className="text-white/80">São Paulo - SP</p>
                  </ContactItem>
                </ul>
              </address>
            </Card>
          </div>
        </div>

        <Separator className="bg-white/10 my-6" />

        <div className="text-center text-gray-400 text-sm">
          <p>
            &copy; {currentYear} Danielle Robertis de Vincenzo | Acolhimento
            psicológico especializado para adolescentes, mulheres e famílias.
            Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
