import "./globals.css";

import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import StructuredData from "@/components/StructuredData";
import Hotjar from "@/components/Hotjar";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Psicóloga Danielle Vincenzo - São Paulo | Acolhimento Especializado",
  description:
    "Psicóloga clínica especialista em acolhimento para adolescentes, mulheres e famílias em São Paulo. Consultas presenciais na Av. Paulista. CRP 06/134354.",
  keywords: [
    "Psicóloga São Paulo",
    "Psicologia clínica",
    "Terapia",
    "Psicóloga especialista",
    "Acolhimento psicológico",
    "Psicologia perinatal",
    "Saúde mental materna",
    "Psicologia da mulher",
    "Desenvolvimento infantil",
    "Terapia familiar",
    "Adolescência",
    "Vínculos familiares",
    "Bem-estar emocional",
    "São Paulo SP",
    "Avenida Paulista",
    "Consultório psicologia",
    "CRP 06/134354",
  ],
  other: {
    "geo.region": "BR-SP",
    "geo.placename": "São Paulo",
    "geo.position": "-23.5616;-46.6563",
    "ICBM": "-23.5616, -46.6563",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  authors: [{ name: "Danielle Robertis de Vincenzo", url: "https://www.daniellerobertis.com.br" }],
  generator: "Next.js",
  category: "healthcare",
  classification: "psychology",
  openGraph: {
    siteName: "Psicóloga Danielle Vincenzo",
    locale: "pt-BR",
    title: "Psicóloga Danielle Vincenzo - São Paulo | Acolhimento Especializado",
    description:
      "Psicóloga clínica especialista em acolhimento para adolescentes, mulheres e famílias em São Paulo. Consultas presenciais na Av. Paulista. CRP 06/134354.",
    type: "website",
    url: "https://www.daniellerobertis.com.br",
    countryName: "Brasil",
    phoneNumbers: ["+55 11 96455-6323"],
    emails: ["danielle.robertis.psicologa@gmail.com"],
    images: [
      {
        url: "https://www.daniellerobertis.com.br/danielle-robertis-psicologa.jpeg",
        alt: "Psicóloga Danielle Vincenzo",
        type: "image/jpeg",
        width: 1200,
        height: 1200,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://www.daniellerobertis.com.br",
    creator: "@daniellerobertis",
    title: "Psicóloga Danielle Vincenzo - São Paulo | Acolhimento Especializado",
    description:
      "Psicóloga clínica especialista em acolhimento para adolescentes, mulheres e famílias em São Paulo. Consultas presenciais na Av. Paulista. CRP 06/134354.",
    images: [
      "https://www.daniellerobertis.com.br/danielle-robertis-psicologa.jpeg",
    ],
  },
  alternates: {
    canonical: "https://www.daniellerobertis.com.br",
    languages: {
      "pt-BR": "https://www.daniellerobertis.com.br",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Resource hints para performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        <StructuredData />
      </head>
      <GoogleTagManager gtmId="GTM-T8TF7VC3" />

      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Hotjar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
