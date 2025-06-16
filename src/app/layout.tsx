import "./globals.css";

import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Psicóloga Danielle Vincenzo",
  description:
    "Acolhimento psicológico especializado para adolescentes, mulheres e famílias, promovendo o bem-estar emocional e o fortalecimento de vínculos saudáveis em todas as fases da vida.",
  keywords: [
    "Psicóloga",
    "Psicologia perinatal",
    "Saúde da mulher",
    "Desenvolvimento infantil",
    "Adolescência",
    "Acompanhamento psiquiátrico",
  ],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  // viewport: {
  //   width: "device-width",
  //   initialScale: 1,
  // },
  // charset: "utf-8",
  openGraph: {
    siteName: "Psicóloga Danielle Vincenzo",
    locale: "pt-BR",
    title: "Psicóloga Danielle Vincenzo",
    description:
      "Acolhimento psicológico especializado para adolescentes, mulheres e famílias, promovendo o bem-estar emocional e o fortalecimento de vínculos saudáveis em todas as fases da vida.",
    type: "website",
    url: "https://www.daniellerobertis.com.br",
    countryName: "Brasil",
    phoneNumbers: ["+55 11 99999-9999"],
    emails: ["danielle@daniellerobertis.com.br"],
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
    title: "Psicóloga Danielle Vincenzo",
    description:
      "Acolhimento psicológico especializado para adolescentes, mulheres e famílias, promovendo o bem-estar emocional e o fortalecimento de vínculos saudáveis em todas as fases da vida.",
    images: [
      "https://www.daniellerobertis.com.br/danielle-robertis-psicologa.jpeg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <GoogleTagManager gtmId="GTM-525252525" />

      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
