"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  createAdminSession,
  destroyAdminSession,
  getAdminEmail,
  getAdminSession,
  isAdminAuthConfigured,
  verifyAdminPassword,
} from "@/lib/admin-auth";
import {
  ContentConflictError,
  persistSiteContent,
  SITE_CONTENT_CACHE_TAG,
} from "@/lib/content-store";
import type { SiteContent, SiteContentSnapshot } from "@/lib/content-types";

const LOGIN_WINDOW_MS = 15 * 60 * 1_000;
const MAX_LOGIN_ATTEMPTS = 6;
type LoginAttempt = { count: number; resetAt: number };
const globalLoginState = globalThis as typeof globalThis & {
  danielleLoginAttempts?: Map<string, LoginAttempt>;
};
const loginAttempts =
  globalLoginState.danielleLoginAttempts ?? new Map<string, LoginAttempt>();
globalLoginState.danielleLoginAttempts = loginAttempts;

async function loginAttemptKey(): Promise<string> {
  const requestHeaders = await headers();
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip")?.trim() ||
    "local"
  ).slice(0, 128);
}

function reserveLoginAttempt(key: string): boolean {
  const now = Date.now();
  const current = loginAttempts.get(key);
  if (current && current.resetAt > now && current.count >= MAX_LOGIN_ATTEMPTS) {
    return false;
  }

  loginAttempts.set(key, {
    count: current && current.resetAt > now ? current.count + 1 : 1,
    resetAt: current && current.resetAt > now ? current.resetAt : now + LOGIN_WINDOW_MS,
  });

  if (loginAttempts.size > 1_000) {
    for (const [attemptKey, attempt] of loginAttempts) {
      if (attempt.resetAt <= now || loginAttempts.size > 1_000) {
        loginAttempts.delete(attemptKey);
      }
    }
  }

  return true;
}

export type LoginState = { error: string | null };

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isAdminAuthConfigured()) {
    return { error: "O acesso ao painel ainda não foi configurado." };
  }

  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const attemptKey = await loginAttemptKey();
  if (!reserveLoginAttempt(attemptKey)) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return {
      error: "Muitas tentativas. Aguarde 15 minutos antes de tentar novamente.",
    };
  }

  const validEmail = email === getAdminEmail();
  const validPassword = verifyAdminPassword(password);

  if (!validEmail || !validPassword) {
    await new Promise((resolve) => setTimeout(resolve, 650));
    return { error: "E-mail ou senha incorretos." };
  }

  loginAttempts.delete(attemptKey);
  await createAdminSession(email);
  redirect("/painel");
}

export async function logoutAction(): Promise<never> {
  await destroyAdminSession();
  redirect("/painel/login");
}

export type SaveContentResult =
  | { ok: true; snapshot: SiteContentSnapshot; message: string }
  | { ok: false; message: string };

export async function saveContentAction(input: {
  content: SiteContent;
  etag: string | null;
}): Promise<SaveContentResult> {
  if (!(await getAdminSession())) {
    return { ok: false, message: "Sua sessão expirou. Entre novamente." };
  }

  if (
    !input ||
    typeof input !== "object" ||
    (input.etag !== null &&
      (typeof input.etag !== "string" || input.etag.length > 512))
  ) {
    return { ok: false, message: "Dados inválidos." };
  }

  try {
    const snapshot = await persistSiteContent(input.content, input.etag);
    revalidateTag(SITE_CONTENT_CACHE_TAG);
    revalidatePath("/", "page");
    revalidatePath("/artigos/[slug]", "page");
    revalidatePath("/sitemap.xml");
    return { ok: true, snapshot, message: "Alterações publicadas." };
  } catch (error) {
    if (error instanceof ContentConflictError) {
      return { ok: false, message: error.message };
    }

    console.error("Não foi possível salvar o conteúdo.", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Não foi possível salvar.",
    };
  }
}
