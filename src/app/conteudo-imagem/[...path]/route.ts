import { get } from "@vercel/blob";
import { getContentImageBlobPrefix } from "@/lib/content-paths";
import { isContentStoreConfigured } from "@/lib/content-store";

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: RouteContext) {
  if (!isContentStoreConfigured()) {
    return new Response("Imagem indisponível.", { status: 503 });
  }

  const { path } = await params;
  const expectedSegments = getContentImageBlobPrefix()
    .split("/")
    .filter(Boolean);
  const filename = path.at(-1) || "";

  if (
    path.length !== expectedSegments.length + 1 ||
    !expectedSegments.every((segment, index) => path[index] === segment) ||
    !/^[a-zA-Z0-9._-]+\.(?:jpe?g|png|webp)$/i.test(filename)
  ) {
    return new Response("Imagem inválida.", { status: 400 });
  }

  const pathname = `${getContentImageBlobPrefix()}${filename}`;

  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200) {
      return new Response("Imagem não encontrada.", { status: 404 });
    }

    return new Response(result.stream, {
      headers: {
        "Cache-Control": "public, max-age=31536000, immutable",
        "Content-Type": result.blob.contentType,
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Não foi possível entregar a imagem do conteúdo.", error);
    return new Response("Imagem indisponível.", { status: 503 });
  }
}
