import { useSyncExternalStore } from "react";
import { GA_MEASUREMENT_ID } from "@/lib/site";

export type ConsentChoice = "accepted" | "declined";

const STORAGE_KEY = "cookie-consent-v1";
const CHANGE_EVENT = "cookie-consent-change";

export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === "accepted" || value === "declined" ? value : null;
  } catch {
    return null;
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Apaga os cookies do Google Analytics em todos os níveis de domínio possíveis. */
function clearAnalyticsCookies() {
  const names = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0].trim())
    .filter(
      (name) => name === "_ga" || name.startsWith("_ga_") || name === "_gid",
    );

  const hostParts = window.location.hostname.split(".");
  const domains = hostParts.map((_, index) => hostParts.slice(index).join("."));

  for (const name of names) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    for (const domain of domains) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${domain}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${domain}`;
    }
  }
}

/** `null` apaga a escolha e faz o aviso aparecer de novo. */
export function saveConsent(choice: ConsentChoice | null) {
  try {
    if (choice) window.localStorage.setItem(STORAGE_KEY, choice);
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Sem armazenamento disponível: a escolha vale só até recarregar a página.
  }

  // Interruptor oficial do Google Analytics: se o script já carregou, ele para de medir.
  (window as unknown as Record<string, boolean>)[
    `ga-disable-${GA_MEASUREMENT_ID}`
  ] = choice !== "accepted";
  if (choice !== "accepted") clearAnalyticsCookies();

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** "pending" no servidor e na hidratação, para não piscar o aviso. */
export function useConsent(): ConsentChoice | null | "pending" {
  return useSyncExternalStore<ConsentChoice | null | "pending">(
    subscribe,
    readConsent,
    () => "pending",
  );
}
