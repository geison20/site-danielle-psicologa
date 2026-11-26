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
  getContentHistoryPrefix,
  getContentImageBlobPrefix,
  getContentPathname,
} from "@/lib/content-paths";
import type {
  ContentVersion,
  SiteContent,
  SiteContentSnapshot,
} from "@/lib/content-types";
import { validateSiteContent } from "@/lib/content-validation";

const CONTENT_ENVIRONMENT = getContentEnvironment();
const CONTENT_PATHNAME = getContentPathname();
export const SITE_CONTENT_CACHE_TAG = `site-content-${CONTENT_ENVIRONMENT}`;
const ORPHAN_IMAGE_AGE_MS = 24 * 60 * 60 * 1_000;
const HISTORY_LIMIT = 30;
const VERSION_ID_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}Z$/;

type HistoryEntry = {
  savedAt: string;
  changes: string[];
  content: SiteContent;
};

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

function imagePathnames(content: SiteContent): Set<string> {
  return new Set(
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
}

const SECTIONS: [label: string, pick: (content: SiteContent) => unknown][] = [
  ["Início", (content) => content.settings.hero],
  ["Sobre", (content) => content.settings.about],
  ["Áreas de atuação", (content) => content.services],
  ["Depoimentos", (content) => content.testimonials],
  ["Artigos", (content) => content.articles],
  ["Publicações", (content) => content.publications],
  ["Contato", (content) => content.settings.contact],
];

function describeChanges(previous: SiteContent, next: SiteContent): string[] {
  const changed = SECTIONS.filter(
    ([, pick]) => JSON.stringify(pick(previous)) !== JSON.stringify(pick(next)),
  ).map(([label]) => label);

  return changed.length > 0 ? changed : ["Nenhuma mudança de conteúdo"];
}

function historyPathname(id: string): string {
  return `${getContentHistoryPrefix()}${id}.json`;
}

function versionIdFromPathname(pathname: string): string {
  return pathname.slice(getContentHistoryPrefix().length).replace(/\.json$/, "");
}

async function readHistoryEntry(pathname: string): Promise<HistoryEntry | null> {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200) return null;

  const raw: unknown = await new Response(result.stream).json();
  if (!raw || typeof raw !== "object") return null;
  const entry = raw as Record<string, unknown>;

  try {
    const content = validateSiteContent(entry.content, { preserveUpdatedAt: true });
    return {
      savedAt: typeof entry.savedAt === "string" ? entry.savedAt : content.updatedAt,
      changes: Array.isArray(entry.changes)
        ? entry.changes
            .filter((change): change is string => typeof change === "string")
            .slice(0, 10)
        : [],
      content,
    };
  } catch {
    return null;
  }
}

/** Blobs do histórico, da versão mais nova para a mais antiga. */
async function listHistoryBlobs(): Promise<{ pathname: string; url: string }[]> {
  const blobs: { pathname: string; url: string }[] = [];
  let cursor: string | undefined;

  do {
    const page = await list({
      prefix: getContentHistoryPrefix(),
      limit: 1_000,
      ...(cursor ? { cursor } : {}),
    });
    blobs.push(...page.blobs.map(({ pathname, url }) => ({ pathname, url })));
    cursor = page.hasMore ? page.cursor : undefined;
  } while (cursor);

  // O nome do arquivo é a data em formato ISO, então a ordem alfabética é a cronológica.
  return blobs.sort((a, b) => b.pathname.localeCompare(a.pathname));
}

async function recordVersion(
  content: SiteContent,
  changes: string[],
): Promise<{ id: string; kept: string[] }> {
  const now = new Date();
  const id = now.toISOString().replace(/[:.]/g, "-");
  const entry: HistoryEntry = { savedAt: now.toISOString(), changes, content };

  await put(historyPathname(id), JSON.stringify(entry), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json; charset=utf-8",
    cacheControlMaxAge: 60,
  });

  const blobs = await listHistoryBlobs();
  const stale = blobs.slice(HISTORY_LIMIT);
  if (stale.length > 0) await del(stale.map((blob) => blob.url));

  return { id, kept: blobs.slice(0, HISTORY_LIMIT).map((blob) => blob.pathname) };
}

/**
 * Fotos usadas por versões antigas não podem ser apagadas, senão "restaurar"
 * traria páginas com imagens quebradas. Erro de leitura interrompe a limpeza.
 */
async function historyImagePathnames(
  keptPathnames: string[],
  skipId: string,
): Promise<Set<string>> {
  const pathnames = new Set<string>();

  await Promise.all(
    keptPathnames
      .filter((pathname) => versionIdFromPathname(pathname) !== skipId)
      .map(async (pathname) => {
        const entry = await readHistoryEntry(pathname);
        if (!entry) return;
        for (const image of imagePathnames(entry.content)) pathnames.add(image);
      }),
  );

  return pathnames;
}

export async function listContentVersions(): Promise<ContentVersion[]> {
  if (!isContentStoreConfigured()) return [];

  const blobs = (await listHistoryBlobs()).slice(0, HISTORY_LIMIT);
  const versions = await Promise.all(
    blobs.map(async ({ pathname }) => {
      const entry = await readHistoryEntry(pathname).catch(() => null);
      return entry
        ? {
            id: versionIdFromPathname(pathname),
            savedAt: entry.savedAt,
            changes: entry.changes,
          }
        : null;
    }),
  );

  return versions.filter((version): version is ContentVersion => version !== null);
}

export async function getContentVersion(
  id: string,
): Promise<{ version: ContentVersion; content: SiteContent } | null> {
  if (!VERSION_ID_PATTERN.test(id) || !isContentStoreConfigured()) return null;

  const entry = await readHistoryEntry(historyPathname(id));
  if (!entry) return null;

  return {
    version: { id, savedAt: entry.savedAt, changes: entry.changes },
    content: entry.content,
  };
}

async function removeOldOrphanImages(referenced: Set<string>): Promise<void> {
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
  options: { changes?: string[] } = {},
): Promise<SiteContentSnapshot> {
  if (!isContentStoreConfigured()) {
    throw new Error("O armazenamento do painel ainda não foi configurado.");
  }

  const content = validateSiteContent(value);
  const changes =
    options.changes ??
    describeChanges(
      previousEtag
        ? (await readSiteContentUncached()).content
        : defaultSiteContent,
      content,
    );

  try {
    const blob = await put(CONTENT_PATHNAME, JSON.stringify(content), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: previousEtag !== null,
      contentType: "application/json; charset=utf-8",
      cacheControlMaxAge: 60,
      ...(previousEtag ? { ifMatch: previousEtag } : {}),
    });

    try {
      const history = await recordVersion(content, changes);
      const referenced = imagePathnames(content);
      for (const image of await historyImagePathnames(history.kept, history.id)) {
        referenced.add(image);
      }
      await removeOldOrphanImages(referenced);
    } catch (error) {
      // O conteúdo já foi salvo. Sem o histórico, não limpamos imagens por segurança.
      console.error("Não foi possível registrar o histórico ou limpar imagens.", error);
    }

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
