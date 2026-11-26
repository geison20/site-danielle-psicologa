import { absoluteUrl, siteConfig } from "@/lib/site";

const serviceItems = [
  [
    "Atendimento especializado em saúde mental da mulher",
    "Atenção psicológica voltada à saúde mental da mulher, com foco em autoconhecimento e equilíbrio emocional.",
  ],
  [
    "Psicoterapia para adultos",
    "Atendimento individual para adultos que buscam compreender suas emoções e construir mais equilíbrio e bem-estar.",
  ],
  [
    "Perinatalidade e planejamento familiar",
    "Acompanhamento de mulheres e casais em processos de gestação, adoção e parentalidade.",
  ],
  [
    "Gestação e pós-parto",
    "Acompanhamento de demandas emocionais relacionadas à gravidez, identidade materna e adaptação à maternidade.",
  ],
  [
    "Relação mãe-bebê e vínculo afetivo",
    "Práticas voltadas à construção de vínculos seguros nos primeiros anos de vida.",
  ],
  ["Luto perinatal", "Acolhimento de perdas gestacionais e neonatais."],
  [
    "Desenvolvimento infantil nos primeiros anos",
    "Atuação voltada ao sono, rotina saudável e neurodesenvolvimento infantil.",
  ],
  ["Apoio à paternidade", "Acompanhamento de pais em seus desafios emocionais e familiares."],
  [
    "Orientação parental",
    "Organização e fortalecimento das relações familiares.",
  ],
  [
    "Psicoterapia para adolescentes",
    "Suporte a questões emocionais, de identidade e de relacionamentos.",
  ],
  [
    "Acompanhamento em tratamento psiquiátrico",
    "Acompanhamento psicológico em interface com a psiquiatria.",
  ],
] as const;

const personId = `${siteConfig.url}/#person`;
const practiceId = `${siteConfig.url}/#practice`;

const structuredData = {
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
      telephone: siteConfig.phone,
      email: siteConfig.email,
      sameAs: [siteConfig.instagram],
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
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
      telephone: siteConfig.phone,
      email: siteConfig.email,
      provider: { "@id": personId },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.streetAddress,
        addressLocality: siteConfig.address.addressLocality,
        addressRegion: siteConfig.address.addressRegion,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.addressCountry,
      },
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
      itemListElement: serviceItems.map(([name, description], index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name,
          description,
          provider: { "@id": practiceId },
          areaServed: { "@type": "City", name: "São Paulo" },
        },
      })),
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
