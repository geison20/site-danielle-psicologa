import type { Metadata } from "next";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getPublicSiteContent } from "@/lib/content-store";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o site de Danielle Robertis de Vincenzo trata dados de navegação e cookies, e como exercer seus direitos pela LGPD.",
  alternates: { canonical: absoluteUrl("/privacidade") },
};

const UPDATED_AT = "26 de novembro de 2026";

export default async function PrivacyPage() {
  const { contact } = (await getPublicSiteContent()).settings;

  const sections = [
    {
      title: "Quem é responsável pelos dados",
      body: [
        `Este site é mantido por ${siteConfig.name} (${siteConfig.crp}). Para qualquer assunto sobre privacidade, escreva para ${contact.email}.`,
      ],
    },
    {
      title: "Quais dados são tratados",
      body: [
        "Dados de navegação, somente se você aceitar os cookies: usamos o Google Analytics para entender quais páginas são visitadas, por quanto tempo e em que tipo de aparelho. Ele grava cookies no seu navegador e pode registrar dados como endereço IP, localização aproximada e páginas acessadas.",
        "Estatísticas de acesso anônimas: usamos o Vercel Web Analytics para medir visitas de forma agregada. Ele não usa cookies e não identifica visitantes individualmente.",
        "Publicações do Instagram: a seção “Acompanhe no Instagram” exibe conteúdo incorporado do Instagram (Meta). Ele só é carregado se você aceitar os cookies, porque o Instagram pode registrar dados do seu acesso conforme a política de privacidade dele.",
        "Dados que você envia ao entrar em contato: ao chamar pelo WhatsApp, ligar ou escrever por e-mail, tratamos as informações que você decidir compartilhar apenas para responder e combinar o atendimento. Esses canais são serviços de terceiros, com políticas próprias. Este site não tem cadastro nem formulário para visitantes.",
      ],
    },
    {
      title: "Cookies e como mudar sua escolha",
      body: [
        "Na primeira visita, mostramos um aviso em que você pode aceitar ou recusar. Se recusar, o Google Analytics e os conteúdos do Instagram não são carregados. Você pode mudar de ideia a qualquer momento em “Preferências de cookies”, no rodapé de qualquer página, ou apagando os dados do site nas configurações do seu navegador.",
      ],
    },
    {
      title: "Seus direitos",
      body: [
        "Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir confirmação de que tratamos seus dados, acesso, correção, anonimização ou eliminação, informações sobre compartilhamento e a revogação do consentimento. Basta escrever para o e-mail acima.",
      ],
    },
    {
      title: "Alterações nesta política",
      body: [
        "Podemos atualizar este texto quando o site mudar. A data da última atualização aparece no topo da página.",
      ],
    },
  ];

  return (
    <>
      <header role="banner">
        <Navbar contact={contact} />
      </header>
      <main id="conteudo-principal" className="min-h-screen bg-cream-light">
        <div className="section-container pb-16 pt-28 sm:pt-32 lg:pt-36">
          <div className="mx-auto max-w-3xl">
            <h1 className="heading-lg">Política de Privacidade</h1>
            <p className="mt-3 text-sm text-foreground/75">
              Última atualização: {UPDATED_AT}
            </p>

            <div className="mt-8 space-y-8">
              {sections.map((section) => (
                <section key={section.title} className="surface-card p-6 sm:p-8">
                  <h2 className="font-heading text-xl font-bold text-heading">
                    {section.title}
                  </h2>
                  <div className="mt-3 space-y-4 text-base leading-7 text-foreground">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer role="contentinfo">
        <Footer contact={contact} />
      </footer>
      <FloatingWhatsAppButton contact={contact} />
    </>
  );
}
