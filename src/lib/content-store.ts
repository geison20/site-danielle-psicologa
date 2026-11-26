import {
  BlobPreconditionFailedError,
  del,
  get,
  list,
  put,
} from "@vercel/blob";
import { unstable_cache } from "next/cache";
import { defaultSiteContent } from "@/lib/default-content";
import {
  contentImagePathname,
  getContentEnvironment,
  getContentImageBlobPrefix,
  getContentPathname,
} from "@/lib/content-paths";
import type { SiteContent, SiteContentSnapshot } from "@/lib/content-types";
import { validateSiteContent } from "@/lib/content-validation";

const CONTENT_ENVIRONMENT = getContentEnvironment();
const CONTENT_PATHNAME = getContentPathname();
export const SITE_CONTENT_CACHE_TAG = `site-content-${CONTENT_ENVIRONMENT}`;
const ORPHAN_IMAGE_AGE_MS = 24 * 60 * 60 * 1_000;

export class ContentConflictError extends Error {
  constructor() {
    super("O conteúdo foi alterado em outra sessão. Atualize a página e tente novamente.");
    this.name = "ContentConflictError";
  }
}

export function isContentStoreConfigured(): boolean {
  return Boolean(
    process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN,
  );
}

function fallbackSnapshot(): SiteContentSnapshot {
  return {
    content: structuredClone(defaultSiteContent),
    etag: null,
    persisted: false,
  };
}

function writableEtag(etag: string): string {
  return etag.startsWith("W/") ? etag.slice(2) : etag;
}

async function readSiteContentUncached(): Promise<SiteContentSnapshot> {
  if (!isContentStoreConfigured()) return fallbackSnapshot();

  try {
    const result = await get(CONTENT_PATHNAME, {
      access: "private",
      useCache: false,
    });

    if (!result || result.statusCode !== 200) return fallbackSnapshot();

    const raw = await new Response(result.stream).json();
    return {
      content: validateSiteContent(raw, { preserveUpdatedAt: true }),
      etag: writableEtag(result.blob.etag),
      persisted: true,
    };
  } catch (error) {
    console.error("Não foi possível ler o conteúdo persistido.", error);
    return fallbackSnapshot();
  }
}

const readCachedSiteContent = unstable_cache(
  readSiteContentUncached,
  [`site-content-v1-${CONTENT_ENVIRONMENT}`],
  { revalidate: 60, tags: [SITE_CONTENT_CACHE_TAG] },
);

export async function getPublicSiteContent(): Promise<SiteContent> {
  const snapshot = await readCachedSiteContent();
  return snapshot.content;
}

export async function getAdminSiteContent(): Promise<SiteContentSnapshot> {
  return readSiteContentUncached();
}

async function removeOldOrphanImages(content: SiteContent): Promise<void> {
  const referenced = new Set(
    [
      ...content.articles.map((item) => item.imageUrl),
      ...content.publications.map((item) => item.imageUrl),
      ...content.services.map((item) => item.imageUrl),
      content.settings.hero.imageUrl,
      content.settings.about.photoUrl,
    ]
      .map((url) => contentImagePathname(url))
      .filter((pathname): pathname is string => Boolean(pathname)),
  );
  const expiredBefore = Date.now() - ORPHAN_IMAGE_AGE_MS;
  let cursor: string | undefined;

  try {
    do {
      const page = await list({
        prefix: getContentImageBlobPrefix(),
        limit: 1_000,
        ...(cursor ? { cursor } : {}),
      });
      const orphanUrls = page.blobs
        .filter(
          (blob) =>
            !referenced.has(blob.pathname) &&
            blob.uploadedAt.getTime() < expiredBefore,
        )
        .map((blob) => blob.url);

      if (orphanUrls.length > 0) await del(orphanUrls);
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
  } catch (error) {
    console.error("Não foi possível limpar imagens antigas do painel.", error);
  }
}

export async function persistSiteContent(
  value: unknown,
  previousEtag: string | null,
): Promise<SiteContentSnapshot> {
  if (!isContentStoreConfigured()) {
    throw new Error("O armazenamento do painel ainda não foi configurado.");
  }

  const content = validateSiteContent(value);

  try {
    const blob = await put(CONTENT_PATHNAME, JSON.stringify(content), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: previousEtag !== null,
      contentType: "application/json; charset=utf-8",
      cacheControlMaxAge: 60,
      ...(previousEtag ? { ifMatch: previousEtag } : {}),
    });

    await removeOldOrphanImages(content);

    return {
      content,
      etag: writableEtag(blob.etag),
      persisted: true,
    };
  } catch (error) {
    if (error instanceof BlobPreconditionFailedError) {
      throw new ContentConflictError();
    }
    throw error;
  }
}
