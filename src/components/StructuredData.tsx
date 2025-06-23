import React from "react";

const StructuredData = () => {
  // Schema para a psicóloga como pessoa
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Danielle Robertis de Vincenzo",
    jobTitle: "Psicóloga Clínica",
    description: "Psicóloga clínica especialista em acolhimento para adolescentes, mulheres e famílias em São Paulo",
    url: "https://www.daniellerobertis.com.br",
    image: "https://www.daniellerobertis.com.br/danielle-robertis-psicologa.jpeg",
    telephone: "+55 11 96455-6323",
    email: "danielle.robertis.psicologa@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000, cj 101",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR"
    },
    worksFor: {
      "@type": "Organization",
      name: "Consultório Psicológico Danielle Vincenzo"
    },
    knowsAbout: [
      "Psicologia Clínica",
      "Psicologia Perinatal",
      "Saúde Mental Materna",
      "Desenvolvimento Infantil",
      "Terapia Familiar",
      "Adolescência",
      "Acompanhamento Psiquiátrico"
    ],
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Professional License",
      recognizedBy: {
        "@type": "Organization",
        name: "Conselho Regional de Psicologia"
      },
      identifier: "CRP 06/134354"
    }
  };

  // Schema para o site
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Psicóloga Danielle Vincenzo",
    url: "https://www.daniellerobertis.com.br",
    description: "Psicóloga clínica especialista em acolhimento para adolescentes, mulheres e famílias em São Paulo",
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: "Danielle Robertis de Vincenzo"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.daniellerobertis.com.br/?s={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  // Schema para o serviço profissional
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Consultório Psicológico Danielle Vincenzo",
    image: "https://www.daniellerobertis.com.br/danielle-robertis-psicologa.jpeg",
    description: "Acolhimento psicológico especializado para adolescentes, mulheres e famílias",
    url: "https://www.daniellerobertis.com.br",
    telephone: "+55 11 96455-6323",
    email: "danielle.robertis.psicologa@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Paulista, 1000, cj 101",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "01310-100",
      addressCountry: "BR"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -23.5616,
      longitude: -46.6563
    },
    serviceType: "Psychology Services",
    provider: {
      "@type": "Person",
      name: "Danielle Robertis de Vincenzo",
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        identifier: "CRP 06/134354"
      }
    },
    areaServed: {
      "@type": "City",
      name: "São Paulo",
      addressRegion: "SP",
      addressCountry: "BR"
    },
    serviceOutput: "Mental Health Support",
    category: [
      "Psicologia Perinatal",
      "Saúde Mental Materna", 
      "Desenvolvimento Infantil",
      "Terapia Familiar",
      "Adolescência",
      "Acompanhamento Psiquiátrico"
    ]
  };

  return (
    <>
      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      
      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      
      {/* Professional Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
    </>
  );
};

export default StructuredData;