import { getPublicSiteContent } from "@/lib/content-store";
import { instagramUrl, parseAddress, phoneDigits } from "@/lib/contact-links";
import type { ContactContent, ContentService } from "@/lib/content-types";
import { absoluteUrl, siteConfig } from "@/lib/site";

const personId = `${siteConfig.url}/#person`;
const practiceId = `${siteConfig.url}/#practice`;

function buildStructuredData(
  contact: ContactContent,
  services: ContentService[],
) {
  const digits = phoneDigits(contact.phone);
  const telephone = digits ? `+${digits}` : siteConfig.phone;
  const address = {
    "@type": "PostalAddress",
    ...parseAddress(contact),
    addressCountry: siteConfig.address.addressCountry,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        jobTitle: "Psicóloga clínica",
        description:
          "Psicóloga clínica especialista em saúde mental perinatal, saúde da mulher, adolescência e vínculos familiares.",
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.image),
        telephone,
        email: contact.email,
        sameAs: [instagramUrl(contact.instagram)],
        address,
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "Professional License",
          identifier: siteConfig.crp,
          recognizedBy: {
            "@type": "Organization",
            name: "Conselho Regional de Psicologia",
          },
        },
        knowsAbout: [
          "Psicologia clínica",
          "Psicologia perinatal",
          "Saúde mental da mulher",
          "Saúde mental materna",
          "Desenvolvimento infantil",
          "Orientação parental",
          "Adolescência",
          "Luto perinatal",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": practiceId,
        name: "Consultório Psicológico Danielle Robertis",
        description: siteConfig.description,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.image),
        telephone,
        email: contact.email,
        provider: { "@id": personId },
        address,
        areaServed: {
          "@type": "City",
          name: "São Paulo",
          containedInPlace: { "@type": "Country", name: "Brasil" },
        },
        availableLanguage: "pt-BR",
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.shortName,
        url: siteConfig.url,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        publisher: { "@id": personId },
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/#webpage`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        inLanguage: siteConfig.language,
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": personId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: absoluteUrl(siteConfig.image),
          width: 866,
          height: 1280,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.url}/#services`,
        name: "Áreas de atuação em psicologia",
        description:
          "Serviços de psicologia clínica oferecidos por Danielle Robertis de Vincenzo.",
        itemListElement: services.map(
          ({ title: name, description }, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              name,
              description,
              provider: { "@id": practiceId },
              areaServed: { "@type": "City", name: "São Paulo" },
            },
          }),
        ),
      },
    ],
  };
}

export default async function StructuredData() {
  const content = await getPublicSiteContent();
  const services = content.services.filter((service) => service.published);
  const structuredData = buildStructuredData(
    content.settings.contact,
    services,
  );

  return (
    <script
      id="structured-data"
      type="application/ld+json"
      // "<" escapado para o conteúdo do painel nunca fechar a tag <script>.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
