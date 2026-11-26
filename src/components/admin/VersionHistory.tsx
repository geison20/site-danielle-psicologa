"use client";

import { AlertCircle, History, LoaderCircle, RotateCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { listVersionsAction } from "@/app/painel/actions";
import { Button } from "@/components/ui/button";
import type { ContentVersion } from "@/lib/content-types";

const dateFormat = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "long",
  timeStyle: "short",
  timeZone: "America/Sao_Paulo",
});

export function formatVersionDate(savedAt: string): string {
  const date = new Date(savedAt);
  return Number.isNaN(date.getTime()) ? savedAt : dateFormat.format(date);
}

export default function VersionHistory({
  busy,
  onClose,
  onRestore,
}: {
  busy: boolean;
  onClose: () => void;
  onRestore: (version: ContentVersion) => void;
}) {
  const [versions, setVersions] = useState<ContentVersion[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    listVersionsAction()
      .then((result) => {
        if (cancelled) return;
        if (result.ok) setVersions(result.versions);
        else setError(result.message);
      })
      .catch(() => {
        if (!cancelled) setError("Não foi possível carregar o histórico.");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[75] bg-heading/55 backdrop-blur-sm sm:p-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="history-title"
    >
      <div className="ml-auto flex h-full w-full max-w-2xl flex-col overflow-hidden bg-white shadow-2xl sm:rounded-[2rem]">
        <header className="flex items-start justify-between gap-4 border-b border-green/10 bg-cream-light px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-green-dark">
              Segurança
            </p>
            <h2
              id="history-title"
              className="mt-1 font-heading text-xl font-bold text-heading"
            >
              Histórico de versões
            </h2>
            <p className="mt-1 text-sm leading-6 text-foreground/75">
              Cada vez que você publica, uma cópia do site é guardada. Guardamos
              as últimas 30. Restaurar uma versão não apaga as outras.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar histórico"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green/15 bg-white text-heading"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7">
          {!versions && !error && (
            <p className="flex items-center gap-2 text-sm font-bold text-green-dark">
              <LoaderCircle className="h-4 w-4 animate-spin" />
              Carregando versões...
            </p>
          )}

          {error && (
            <div
              role="alert"
              className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm font-bold leading-6">{error}</p>
            </div>
          )}

          {versions && versions.length === 0 && (
            <div className="rounded-2xl border border-dashed border-green/30 bg-cream-light/60 px-5 py-10 text-center">
              <History className="mx-auto h-6 w-6 text-green-dark/70" />
              <p className="mt-3 font-bold text-heading">Ainda não há versões guardadas.</p>
              <p className="mt-1 text-sm leading-6 text-foreground/75">
                O histórico começa a partir da próxima vez que você publicar uma
                alteração.
              </p>
            </div>
          )}

          {versions && versions.length > 0 && (
            <ol className="space-y-3">
              {versions.map((version, index) => (
                <li
                  key={version.id}
                  className="rounded-2xl border border-green/15 bg-white p-4 sm:flex sm:items-center sm:gap-4"
                >
                  <div className="min-w-0 sm:flex-1">
                    <p className="font-heading text-base font-bold text-heading">
                      {formatVersionDate(version.savedAt)}
                      {index === 0 && (
                        <span className="ml-2 rounded-full bg-green/15 px-2.5 py-1 align-middle text-xs font-bold text-green-dark">
                          Versão atual
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-foreground/80">
                      {version.changes.length > 0
                        ? `Alterou: ${version.changes.join(", ")}`
                        : "Sem detalhes"}
                    </p>
                  </div>
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      disabled={busy}
                      onClick={() => onRestore(version)}
                      className="mt-3 w-full sm:mt-0 sm:w-auto"
                    >
                      <RotateCcw />
                      Restaurar
                    </Button>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </div>
  );
}
