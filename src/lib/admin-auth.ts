import {
  createHmac,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import { cookies } from "next/headers";
import { siteConfig } from "@/lib/site";

const COOKIE_NAME = "danielle_content_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 14;
const PASSWORD_HASH_PATTERN = /^scrypt\$([a-f0-9]{32})\$([a-f0-9]{128})$/i;

type SessionPayload = {
  email: string;
  expiresAt: number;
};

export function getAdminEmail(): string {
  return (process.env.CONTENT_ADMIN_EMAIL || siteConfig.email)
    .trim()
    .toLowerCase();
}

export function isAdminAuthConfigured(): boolean {
  return Boolean(
    process.env.CONTENT_ADMIN_PASSWORD_HASH &&
      process.env.CONTENT_ADMIN_SESSION_SECRET,
  );
}

function sessionSecret(): string | null {
  const secret = process.env.CONTENT_ADMIN_SESSION_SECRET?.trim();
  return secret && secret.length >= 32 ? secret : null;
}

function sign(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return (
    leftBuffer.length === rightBuffer.length &&
    timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function verifyAdminPassword(password: string): boolean {
  const storedHash = process.env.CONTENT_ADMIN_PASSWORD_HASH?.trim() || "";
  const match = PASSWORD_HASH_PATTERN.exec(storedHash);
  if (!match || !password || password.length > 256) return false;

  const [, saltHex, expectedHex] = match;
  const actual = scryptSync(password.normalize("NFKC"), Buffer.from(saltHex, "hex"), 64);
  const expected = Buffer.from(expectedHex, "hex");

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export async function createAdminSession(email: string): Promise<void> {
  const secret = sessionSecret();
  if (!secret) throw new Error("Sessão administrativa não configurada.");

  const payload: SessionPayload = {
    email: email.trim().toLowerCase(),
    expiresAt: Date.now() + SESSION_DURATION_SECONDS * 1_000,
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const value = `${encoded}.${sign(encoded, secret)}`;
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS,
    path: "/",
  });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const secret = sessionSecret();
  if (!secret) return null;

  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) return null;

  const separator = value.lastIndexOf(".");
  if (separator < 1) return null;

  const encoded = value.slice(0, separator);
  const signature = value.slice(separator + 1);
  if (!safeEqual(signature, sign(encoded, secret))) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (
      payload.email !== getAdminEmail() ||
      !Number.isFinite(payload.expiresAt) ||
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(0),
    path: "/",
  });
}
