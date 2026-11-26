import { instagramHandle, phoneDigits } from "@/lib/contact-links";
import { defaultSiteContent } from "@/lib/default-content";
import {
  SERVICE_ICONS,
  type AboutContent,
  type ContactContent,
  type ContentArticle,
  type ContentPublication,
  type ContentService,
  type ContentTestimonial,
  type HeroContent,
  type ServiceIcon,
  type SiteContent,
  type SiteSettings,
} from "@/lib/content-types";

const ID_PATTERN = /^[a-zA-Z0-9_-]{3,80}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function requiredString(
  value: unknown,
  field: string,
  maxLength: number,
): string {
  if (typeof value !== "string") {
    throw new Error(`${field} inválido.`);
  }

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new Error(`${field} deve ter entre 1 e ${maxLength} caracteres.`);
  }

  return normalized;
}

function optionalString(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== "string") {
    throw new Error(`${field} inválido.`);
  }

  const normalized = value.trim();
  if (normalized.length > maxLength) {
    throw new Error(`${field} deve ter no máximo ${maxLength} caracteres.`);
  }

  return normalized;
}

function publicUrl(value: unknown, field: string, required = true): string {
  const normalized = required
    ? requiredString(value, field, 2_048)
    : optionalString(value, field, 2_048);

  if (!normalized) return "";

  try {
    const url = new URL(normalized);
    if (url.protocol !== "https:" && url.protocol !== "http:") {
      throw new Error();
    }
  } catch {
    throw new Error(`${field} deve ser um endereço válido.`);
  }

  return normalized;
}

function imageUrl(value: unknown): string {
  const normalized = requiredString(value, "Imagem", 2_048);

  if (normalized.startsWith("/") && !normalized.startsWith("//")) {
    return normalized;
  }

  throw new Error("Use uma imagem enviada pelo painel.");
}

function isoDate(value: unknown): string {
  const normalized = requiredString(value, "Data", 10);
  if (!ISO_DATE_PATTERN.test(normalized)) throw new Error("Data inválida.");

  const [year, month, day] = normalized.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error("Data inválida.");
  }

  return normalized;
}

function booleanValue(value: unknown): boolean {
  return value === true;
}

function validateArticle(value: unknown): ContentArticle {
  if (!value || typeof value !== "object") {
    throw new Error("Artigo inválido.");
  }

  const article = value as Record<string, unknown>;
  const id = requiredString(article.id, "Identificador", 80);
  if (article.kind !== "article" && article.kind !== "reading") {
    throw new Error("Tipo de conteúdo inválido.");
  }
  const kind = article.kind;
  const slug = requiredString(article.slug, "Endereço do artigo", 120);
  const publishedAt = isoDate(article.publishedAt);

  if (!ID_PATTERN.test(id)) throw new Error("Identificador inválido.");
  if (!SLUG_PATTERN.test(slug)) throw new Error("Endereço do artigo inválido.");

  const body = optionalString(article.body, "Texto", 30_000);
  const source = optionalString(article.source, "Fonte", 120);
  const href = publicUrl(article.href, "Link", false);

  if (kind === "article" && !body) {
    throw new Error("Escreva o texto do artigo autoral.");
  }

  if (kind === "reading" && (!source || !href)) {
    throw new Error("Informe a fonte e o link da leitura externa.");
  }

  return {
    id,
    kind,
    slug,
    title: requiredString(article.title, "Título", 180),
    description: requiredString(article.description, "Resumo", 600),
    body,
    source,
    author: requiredString(article.author, "Autoria", 120),
    publishedAt,
    category: requiredString(article.category, "Categoria", 80),
    href,
    imageUrl: imageUrl(article.imageUrl),
    imageAlt: requiredString(article.imageAlt, "Descrição da imagem", 180),
    featured: booleanValue(article.featured),
    published: booleanValue(article.published),
  };
}

function validatePublication(value: unknown): ContentPublication {
  if (!value || typeof value !== "object") {
    throw new Error("Publicação inválida.");
  }

  const publication = value as Record<string, unknown>;
  const id = requiredString(publication.id, "Identificador", 80);
  if (!ID_PATTERN.test(id)) throw new Error("Identificador inválido.");

  return {
    id,
    title: requiredString(publication.title, "Título", 180),
    subtitle: requiredString(publication.subtitle, "Subtítulo", 220),
    meta: optionalString(publication.meta, "Informação complementar", 180),
    description: requiredString(publication.description, "Descrição", 600),
    imageUrl: imageUrl(publication.imageUrl),
    imageAlt: requiredString(publication.imageAlt, "Descrição da imagem", 180),
    href: publicUrl(publication.href, "Link"),
    cta: requiredString(publication.cta, "Texto do botão", 60),
    featured: booleanValue(publication.featured),
    published: booleanValue(publication.published),
  };
}

function validateService(value: unknown): ContentService {
  if (!value || typeof value !== "object") {
    throw new Error("Área de atuação inválida.");
  }

  const service = value as Record<string, unknown>;
  const id = requiredString(service.id, "Identificador", 80);
  if (!ID_PATTERN.test(id)) throw new Error("Identificador inválido.");
  if (!SERVICE_ICONS.includes(service.icon as ServiceIcon)) {
    throw new Error("Ícone inválido.");
  }

  return {
    id,
    title: requiredString(service.title, "Título", 120),
    description: requiredString(service.description, "Descrição", 400),
    icon: service.icon as ServiceIcon,
    imageUrl: imageUrl(service.imageUrl),
    imageAlt: requiredString(service.imageAlt, "Descrição da imagem", 180),
    published: booleanValue(service.published),
  };
}

function validateTestimonial(value: unknown): ContentTestimonial {
  if (!value || typeof value !== "object") {
    throw new Error("Depoimento inválido.");
  }

  const testimonial = value as Record<string, unknown>;
  const id = requiredString(testimonial.id, "Identificador", 80);
  if (!ID_PATTERN.test(id)) throw new Error("Identificador inválido.");

  return {
    id,
    name: requiredString(testimonial.name, "Nome", 80),
    date: optionalString(testimonial.date, "Data", 40),
    text: requiredString(testimonial.text, "Depoimento", 800),
    published: booleanValue(testimonial.published),
  };
}

function objectValue(value: unknown, field: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${field} inválido.`);
  }

  return value as Record<string, unknown>;
}

function validateHero(value: unknown): HeroContent {
  const hero = objectValue(value, "Início");

  return {
    badge: requiredString(hero.badge, "Selo de apresentação", 80),
    title: requiredString(hero.title, "Título principal", 140),
    subtitle: requiredString(hero.subtitle, "Texto de apresentação", 500),
    imageUrl: imageUrl(hero.imageUrl),
  };
}

function validateAbout(value: unknown): AboutContent {
  const about = objectValue(value, "Sobre");

  if (!Array.isArray(about.education) || about.education.length > 8) {
    throw new Error("A formação aceita até 8 itens.");
  }

  return {
    title: requiredString(about.title, "Título da seção", 120),
    intro: requiredString(about.intro, "Frase de apoio", 240),
    photoUrl: imageUrl(about.photoUrl),
    photoAlt: requiredString(about.photoAlt, "Descrição da foto", 180),
    body: requiredString(about.body, "Texto sobre você", 6_000),
    personalNote: optionalString(about.personalNote, "Nota pessoal", 500),
    education: about.education.map((entry) => {
      const item = objectValue(entry, "Formação");
      return {
        title: requiredString(item.title, "Título da formação", 140),
        institution: requiredString(item.institution, "Instituição", 200),
      };
    }),
  };
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContact(value: unknown): ContactContent {
  const contact = objectValue(value, "Contato");
  const phone = requiredString(contact.phone, "Telefone", 30);
  const email = requiredString(contact.email, "E-mail", 120);
  const instagram = requiredString(contact.instagram, "Instagram", 120);
  const handle = instagramHandle(instagram);

  if (!phoneDigits(phone)) {
    throw new Error("Informe o telefone com DDD. Ex.: (11) 96455-6323.");
  }
  if (!EMAIL_PATTERN.test(email)) throw new Error("E-mail inválido.");
  if (!handle) throw new Error("Instagram inválido. Ex.: @danielle.psicologia.");

  return {
    phone,
    email,
    instagram: `@${handle}`,
    addressLine1: requiredString(contact.addressLine1, "Endereço", 160),
    addressLine2: requiredString(contact.addressLine2, "Bairro e cidade", 160),
  };
}

function validateSettings(value: unknown): SiteSettings {
  const settings = objectValue(value, "Configurações");

  return {
    hero: validateHero(settings.hero),
    about: validateAbout(settings.about),
    contact: validateContact(settings.contact),
  };
}

export function validateSiteContent(
  value: unknown,
  options: { preserveUpdatedAt?: boolean } = {},
): SiteContent {
  if (!value || typeof value !== "object") {
    throw new Error("Conteúdo inválido.");
  }

  const content = value as Record<string, unknown>;
  if (!Array.isArray(content.articles) || !Array.isArray(content.publications)) {
    throw new Error("Listas de conteúdo inválidas.");
  }

  // Conteúdos salvos antes destas seções existirem não têm esses campos:
  // nesse caso o site continua usando os textos e fotos originais.
  const rawServices = content.services ?? defaultSiteContent.services;
  const rawTestimonials = content.testimonials ?? defaultSiteContent.testimonials;
  if (!Array.isArray(rawServices) || !Array.isArray(rawTestimonials)) {
    throw new Error("Listas de conteúdo inválidas.");
  }

  if (
    content.articles.length > 30 ||
    content.publications.length > 30 ||
    rawServices.length > 30 ||
    rawTestimonials.length > 50
  ) {
    throw new Error("O painel aceita até 30 itens de cada tipo.");
  }

  const articles = content.articles.map(validateArticle);
  const publications = content.publications.map(validatePublication);
  const services = rawServices.map(validateService);
  const testimonials = rawTestimonials.map(validateTestimonial);
  const settings = validateSettings(content.settings ?? defaultSiteContent.settings);
  const ids = [
    ...articles,
    ...publications,
    ...services,
    ...testimonials,
  ].map((item) => item.id);
  const slugs = articles
    .filter((article) => article.kind === "article")
    .map((article) => article.slug);

  if (new Set(ids).size !== ids.length) {
    throw new Error("Existem itens duplicados.");
  }

  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Dois artigos não podem usar o mesmo endereço.");
  }

  const storedUpdatedAt =
    typeof content.updatedAt === "string" &&
    Number.isFinite(Date.parse(content.updatedAt))
      ? content.updatedAt
      : null;

  return {
    version: 1,
    updatedAt:
      options.preserveUpdatedAt && storedUpdatedAt
        ? storedUpdatedAt
        : new Date().toISOString(),
    articles,
    publications,
    services,
    testimonials,
    settings,
  };
}
