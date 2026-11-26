"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  LoaderCircle,
  Pencil,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { type ChangeEvent, type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";

export const inputClassName =
  "mt-2 min-h-12 w-full rounded-xl border border-green/25 bg-white px-4 text-base text-heading outline-none transition placeholder:text-foreground/45 focus:border-green focus:ring-2 focus:ring-green/20 disabled:bg-cream-dark/45 disabled:text-foreground/60";

export const textareaClassName = `${inputClassName} py-3 leading-7`;

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm font-bold text-heading">
      {label}
      {children}
      {hint && (
        <span className="mt-1.5 block text-xs font-normal leading-5 text-foreground/70">
          {hint}
        </span>
      )}
    </label>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <label className="flex min-h-14 cursor-pointer items-start gap-3 rounded-xl border border-green/15 bg-cream-light/60 p-3.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-5 w-5 rounded border-green/30 accent-green-dark"
      />
      <span>
        <span className="block text-sm font-bold text-heading">{label}</span>
        <span className="mt-0.5 block text-xs leading-5 text-foreground/75">
          {description}
        </span>
      </span>
    </label>
  );
}

const MAX_UPLOAD_BYTES = 4_000_000;
const SKIP_RESIZE_BELOW_BYTES = 1_500_000;
const MAX_IMAGE_SIDE = 2_400;

/**
 * Fotos de celular costumam passar de 4 MB. Antes de enviar, reduz as
 * dimensões e recomprime no próprio navegador. Se algo falhar, envia o
 * arquivo original e o servidor decide.
 */
async function prepareImage(file: File): Promise<File> {
  if (file.size <= SKIP_RESIZE_BELOW_BYTES) return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    const outputType = file.type === "image/jpeg" ? "image/jpeg" : "image/webp";
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, outputType, 0.88),
    );

    if (
      !blob ||
      blob.size >= file.size ||
      blob.size > MAX_UPLOAD_BYTES ||
      !["image/jpeg", "image/png", "image/webp"].includes(blob.type)
    ) {
      return file;
    }

    const extension = blob.type === "image/jpeg" ? "jpg" : blob.type.split("/")[1];
    return new File([blob], `${file.name.replace(/\.[^.]+$/, "")}.${extension}`, {
      type: blob.type,
    });
  } catch {
    return file;
  }
}

export function ImageUploader({
  value,
  alt,
  onChange,
  label = "Imagem de capa",
  fit = "cover",
}: {
  value: string;
  alt: string;
  onChange: (url: string) => void;
  label?: string;
  fit?: "cover" | "contain";
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.set("file", await prepareImage(file));

      const response = await fetch("/api/painel/upload", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as { url?: string; error?: string };
      if (!response.ok || !payload.url) {
        throw new Error(payload.error || "Não foi possível enviar a imagem.");
      }
      onChange(payload.url);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Não foi possível enviar a imagem.",
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <span className="block text-sm font-bold text-heading">{label}</span>
      <div className="mt-2 grid gap-3 sm:grid-cols-[150px_1fr]">
        <div className="relative h-36 overflow-hidden rounded-xl border border-green/15 bg-cream-dark/55">
          {value ? (
            <Image
              src={value}
              alt={alt || "Prévia da imagem"}
              fill
              className={fit === "contain" ? "object-contain p-1" : "object-cover"}
              sizes="150px"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-4 text-center text-xs text-foreground/60">
              Nenhuma imagem selecionada
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-green/25 bg-white px-4 text-sm font-bold text-heading transition hover:bg-green/5">
            {uploading ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <UploadCloud className="h-4 w-4" />
            )}
            {uploading ? "Enviando..." : value ? "Trocar imagem" : "Enviar imagem"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              disabled={uploading}
              className="sr-only"
            />
          </label>
          <p className="mt-2 text-xs leading-5 text-foreground/70">
            JPG, PNG ou WebP. Fotos grandes são reduzidas automaticamente.
          </p>
          {error && (
            <p role="alert" className="mt-2 text-xs font-bold text-red-700">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function StatusBadge({ published }: { published: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
        published
          ? "bg-green/15 text-green-dark"
          : "bg-amber-100 text-amber-800"
      }`}
    >
      {published ? "Publicado" : "Rascunho"}
    </span>
  );
}

export function ItemActions({
  index,
  total,
  busy,
  onUp,
  onDown,
  onEdit,
  onDelete,
}: {
  index: number;
  total: number;
  busy: boolean;
  onUp: () => void;
  onDown: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 border-t border-green/10 pt-3 sm:mt-0 sm:border-0 sm:pt-0">
      <button
        type="button"
        onClick={onUp}
        disabled={busy || index === 0}
        aria-label="Mover para cima"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-green/20 text-heading transition hover:bg-green/5 disabled:opacity-35"
      >
        <ArrowUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDown}
        disabled={busy || index === total - 1}
        aria-label="Mover para baixo"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-green/20 text-heading transition hover:bg-green/5 disabled:opacity-35"
      >
        <ArrowDown className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onEdit}
        disabled={busy}
        aria-label="Editar"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-green/20 text-heading transition hover:bg-green/5 disabled:opacity-35"
      >
        <Pencil className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onDelete}
        disabled={busy}
        aria-label="Excluir"
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-red-200 text-red-700 transition hover:bg-red-50 disabled:opacity-35"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

export function DrawerActions({
  busy,
  disabled,
  onCancel,
}: {
  busy: boolean;
  disabled?: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="sticky bottom-0 -mx-5 flex flex-col-reverse gap-3 border-t border-green/10 bg-white/95 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4 backdrop-blur sm:-mx-7 sm:flex-row sm:justify-end sm:px-7">
      <Button type="button" variant="outline" onClick={onCancel} disabled={busy}>
        Cancelar
      </Button>
      <Button type="submit" disabled={busy || disabled}>
        {busy && <LoaderCircle className="animate-spin" />}
        {busy ? "Publicando..." : "Salvar e publicar"}
      </Button>
    </div>
  );
}
