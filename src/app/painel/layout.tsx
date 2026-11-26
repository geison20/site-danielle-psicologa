import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Painel de conteúdo",
  description: "Área restrita para gerenciamento de conteúdo.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
  },
};

export default function PainelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
