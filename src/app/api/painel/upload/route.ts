import { randomUUID } from "node:crypto";
import { put } from "@vercel/blob";
import { NextRequest } from "next/server";
import { getAdminSession } from "@/lib/admin-auth";
import {
  contentImageUrl,
  getContentImageBlobPrefix,
} from "@/lib/content-paths";
import { isContentStoreConfigured } from "@/lib/content-store";

const MAX_FILE_SIZE = 4_000_000;
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function isSameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originHost = new URL(origin).host;
    const requestHost =
      request.headers.get("x-forwarded-host") || request.headers.get("host");
    return Boolean(requestHost && originHost === requestHost);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!(await getAdminSession())) {
    return Response.json({ error: "Não autorizado." }, { status: 401 });
  }

  if (!isSameOrigin(request)) {
    return Response.json({ error: "Origem inválida." }, { status: 403 });
  }

  if (!isContentStoreConfigured()) {
    return Response.json(
      { error: "O armazenamento ainda não foi configurado." },
      { status: 503 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "Selecione uma imagem." }, { status: 400 });
  }

  const extension = ALLOWED_TYPES[file.type];
  if (!extension) {
    return Response.json(
      { error: "Envie uma imagem JPG, PNG ou WebP." },
      { status: 415 },
    );
  }

  if (file.size <= 0 || file.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: "A imagem deve ter no máximo 4 MB." },
      { status: 413 },
    );
  }

  try {
    const blob = await put(
      `${getContentImageBlobPrefix()}${randomUUID()}.${extension}`,
      file,
      {
        access: "private",
        addRandomSuffix: true,
        cacheControlMaxAge: 31_536_000,
        contentType: file.type,
      },
    );

    return Response.json({ url: contentImageUrl(blob.pathname) });
  } catch (error) {
    console.error("Falha no upload de imagem.", error);
    return Response.json(
      { error: "Não foi possível enviar a imagem." },
      { status: 500 },
    );
  }
}
