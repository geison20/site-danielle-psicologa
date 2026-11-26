"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveConsent, useConsent } from "@/lib/cookie-consent";
import { GA_MEASUREMENT_ID } from "@/lib/site";

/** Só carrega o Google Analytics depois que a pessoa aceita. */
export function ConsentAnalytics() {
  const consent = useConsent();
  const pathname = usePathname();

  if (consent !== "accepted" || pathname.startsWith("/painel")) return null;

  return (
    <GoogleAnalytics
      gaId={GA_MEASUREMENT_ID}
      {...(process.env.NODE_ENV !== "production" ? { debug: true } : {})}
    />
  );
}

export default function CookieConsent() {
  const consent = useConsent();
  const pathname = usePathname();

  if (consent !== null || pathname.startsWith("/painel")) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-description"
      className="fixed inset-x-3 bottom-3 z-[60] rounded-2xl border border-green/15 bg-white p-5 shadow-2xl shadow-heading/20 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
    >
      <h2
        id="cookie-title"
        className="font-heading text-base font-bold text-heading"
      >
        Sua privacidade
      </h2>
      <p
        id="cookie-description"
        className="mt-2 text-sm leading-6 text-foreground"
      >
        Usamos cookies para entender como o site é usado (Google Analytics) e
        para mostrar as publicações do Instagram. Você pode aceitar ou recusar,
        e mudar de ideia quando quiser no rodapé. Saiba mais na{" "}
        <Link
          href="/privacidade"
          className="font-bold text-green-dark underline underline-offset-2"
        >
          Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => saveConsent("declined")}
        >
          Recusar
        </Button>
        <Button type="button" onClick={() => saveConsent("accepted")}>
          Aceitar
        </Button>
      </div>
    </div>
  );
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => saveConsent(null)}
      className={className}
    >
      Preferências de cookies
    </button>
  );
}
