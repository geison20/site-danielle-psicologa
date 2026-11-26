export const siteConfig = {
  name: "Danielle Robertis de Vincenzo",
  shortName: "Danielle Robertis",
  title: "Psicóloga em São Paulo | Danielle Robertis de Vincenzo",
  description:
    "Psicóloga clínica em São Paulo, especialista em saúde mental perinatal, saúde da mulher, adolescência e vínculos familiares. Atendimento acolhedor para mulheres, adultos, adolescentes e famílias.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.daniellerobertis.com.br"
  ).replace(/\/$/, ""),
  locale: "pt_BR",
  language: "pt-BR",
  email: "danielle.robertis.psicologa@gmail.com",
  phone: "+5511964556323",
  phoneDisplay: "(11) 96455-6323",
  instagram: "https://www.instagram.com/danielle.psicologia",
  image: "/danielle-robertis-psicologa.jpeg",
  crp: "CRP 06/134354",
  address: {
    streetAddress: "R. Nove de Julho, 72 - Conjunto 141, Torre Norte",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "05716-150",
    addressCountry: "BR",
    neighborhood: "Alto da Boa Vista",
  },
} as const;

export const absoluteUrl = (path: string) =>
  /^https?:\/\//i.test(path)
    ? path
    : `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
