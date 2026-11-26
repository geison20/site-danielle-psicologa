export type ArticleKind = "article" | "reading";

export type ContentArticle = {
  id: string;
  kind: ArticleKind;
  slug: string;
  title: string;
  description: string;
  body: string;
  source: string;
  author: string;
  publishedAt: string;
  category: string;
  href: string;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  published: boolean;
};

export type ContentPublication = {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  href: string;
  cta: string;
  featured: boolean;
  published: boolean;
};

export const SERVICE_ICONS = [
  "venus",
  "user-round",
  "heart",
  "baby",
  "leaf",
  "book-open",
  "users",
  "user",
  "brain",
] as const;

export type ServiceIcon = (typeof SERVICE_ICONS)[number];

export type ContentService = {
  id: string;
  title: string;
  description: string;
  icon: ServiceIcon;
  imageUrl: string;
  imageAlt: string;
  published: boolean;
};

export type ContentTestimonial = {
  id: string;
  name: string;
  date: string;
  text: string;
  published: boolean;
};

export type HeroContent = {
  badge: string;
  title: string;
  subtitle: string;
  imageUrl: string;
};

export type EducationItem = {
  title: string;
  institution: string;
};

export type AboutContent = {
  title: string;
  intro: string;
  photoUrl: string;
  photoAlt: string;
  body: string;
  personalNote: string;
  education: EducationItem[];
};

export type ContactContent = {
  phone: string;
  email: string;
  instagram: string;
  addressLine1: string;
  addressLine2: string;
};

export type SiteSettings = {
  hero: HeroContent;
  about: AboutContent;
  contact: ContactContent;
};

export type SiteContent = {
  version: 1;
  updatedAt: string;
  articles: ContentArticle[];
  publications: ContentPublication[];
  services: ContentService[];
  testimonials: ContentTestimonial[];
  settings: SiteSettings;
};

export type SiteContentSnapshot = {
  content: SiteContent;
  etag: string | null;
  persisted: boolean;
};
