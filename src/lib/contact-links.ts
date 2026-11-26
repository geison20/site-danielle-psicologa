import type { ContactContent } from "@/lib/content-types";
import { siteConfig } from "@/lib/site";

/** Devolve o telefone com DDI (ex.: 5511964556323) ou null se for inválido. */
export function phoneDigits(value: string): string | null {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 10 || digits.length === 11) return `55${digits}`;
  if ((digits.length === 12 || digits.length === 13) && digits.startsWith("55")) {
    return digits;
  }
  return null;
}

/** Aceita "@usuario", "usuario" ou o link do perfil. Devolve só o usuário. */
export function instagramHandle(value: string): string | null {
  const handle = value
    .trim()
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, "")
    .replace(/[/?#].*$/, "")
    .replace(/^@/, "");

  return /^[A-Za-z0-9._]{1,30}$/.test(handle) ? handle : null;
}

export function whatsappLink(phone: string, message: string): string {
  const number = phoneDigits(phone) ?? "";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function telLink(phone: string): string {
  const number = phoneDigits(phone);
  return number ? `tel:+${number}` : "#";
}

export function instagramUrl(instagram: string): string {
  const handle = instagramHandle(instagram);
  return handle ? `https://www.instagram.com/${handle}` : "https://www.instagram.com/";
}

export function instagramLabel(instagram: string): string {
  const handle = instagramHandle(instagram);
  return handle ? `@${handle}` : instagram;
}

export function mapsLink(
  contact: Pick<ContactContent, "addressLine1" | "addressLine2">,
): string {
  const query = `${contact.addressLine1} ${contact.addressLine2}`.trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/**
 * Extrai bairro/cidade/UF/CEP da segunda linha do endereço, no formato
 * "Bairro, Cidade — UF · CEP 00000-000". O que não for reconhecido usa os
 * valores padrão do site.
 */
export function parseAddress(
  contact: Pick<ContactContent, "addressLine1" | "addressLine2">,
): {
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
} {
  const fallback = siteConfig.address;
  const line = contact.addressLine2;

  const cep = line.match(/\b(\d{5})-?(\d{3})\b/);
  const cityAndState = line.match(/^(.*?)\s*[—–-]\s*([A-Za-z]{2})\b/);
  const locality = cityAndState?.[1].split(",").pop()?.trim();

  return {
    streetAddress: contact.addressLine1,
    addressLocality: locality || fallback.addressLocality,
    addressRegion: cityAndState?.[2].toUpperCase() ?? fallback.addressRegion,
    postalCode: cep ? `${cep[1]}-${cep[2]}` : fallback.postalCode,
  };
}
