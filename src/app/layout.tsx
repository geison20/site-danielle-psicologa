import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Psicóloga Danielle Robertis",
  description:
    "Psicóloga em São Paulo, especialista em Terapia Cognitivo-Comportamental (TCC), atendimento presencial e online.",
  keywords: [
    "Psicóloga",
    "Terapia Cognitivo-Comportamental",
    "TCC",
    "Atendimento presencial",
    "Atendimento online",
  ],
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: "index, follow",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  // charset: "utf-8",
  openGraph: {
    siteName: "Psicóloga Danielle Robertis",
    locale: "pt-BR",
    title: "Psicóloga Danielle Robertis",
    description:
      "Psicóloga em São Paulo, especialista em Terapia Cognitivo-Comportamental (TCC), atendimento presencial e online.",
    type: "website",
    url: "https://www.daniellerobertis.com.br",
    countryName: "Brasil",
    phoneNumbers: ["+55 11 99999-9999"],
    emails: ["danielle@daniellerobertis.com.br"],
    images: [
      {
        url: "https://www.daniellerobertis.com.br/danielle-robertis-psicologa.jpeg",
        alt: "Psicóloga Danielle Robertis",
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
    title: "Psicóloga Danielle Robertis",
    description:
      "Psicóloga em São Paulo, especialista em Terapia Cognitivo-Comportamental (TCC), atendimento presencial e online.",
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
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
