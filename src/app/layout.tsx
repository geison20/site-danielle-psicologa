import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Lato, Montserrat } from "next/font/google";
import CookieConsent, { ConsentAnalytics } from "@/components/CookieConsent";
import StructuredData from "@/components/StructuredData";
import { absoluteUrl, siteConfig } from "@/lib/site";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "healthcare",
  keywords: [
    "psicóloga em São Paulo",
    "psicologia perinatal",
    "saúde mental da mulher",
    "psicóloga perinatal",
    "terapia para adultos",
    "psicoterapia para adolescentes",
    "orientação parental",
    "luto perinatal",
    "desenvolvimento infantil",
    "saúde mental materna",
    "psicóloga CRP 06/134354",
  ],
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "pt-BR": siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.shortName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.image),
        width: 866,
        height: 1280,
        alt: `Retrato profissional de ${siteConfig.name}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@daniellerobertis",
    images: [absoluteUrl(siteConfig.image)],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#173c32",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.language}>
      <body className={`${montserrat.variable} ${lato.variable}`}>
        <StructuredData />
        {children}
        <ConsentAnalytics />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
