const CONTENT_IMAGE_ROUTE_PREFIX = "/conteudo-imagem/";

export function getContentEnvironment(): "production" | "preview" | "development" {
  if (process.env.VERCEL_ENV === "production") return "production";
  if (process.env.VERCEL_ENV === "preview") return "preview";
  return "development";
}

export function getContentPathname(): string {
  return `site-content/${getContentEnvironment()}/content.json`;
}

export function getContentImageBlobPrefix(): string {
  return `site-content/${getContentEnvironment()}/images/`;
}

export function getContentHistoryPrefix(): string {
  return `site-content/${getContentEnvironment()}/history/`;
}

export function contentImageUrl(pathname: string): string {
  const encodedPath = pathname
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `${CONTENT_IMAGE_ROUTE_PREFIX}${encodedPath}`;
}

export function contentImagePathname(url: string): string | null {
  if (!url.startsWith(CONTENT_IMAGE_ROUTE_PREFIX)) return null;

  try {
    const pathname = url
      .slice(CONTENT_IMAGE_ROUTE_PREFIX.length)
      .split("/")
      .map((segment) => decodeURIComponent(segment))
      .join("/");

    return pathname.startsWith(getContentImageBlobPrefix()) ? pathname : null;
  } catch {
    return null;
  }
}
