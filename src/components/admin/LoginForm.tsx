"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle, LockKeyhole } from "lucide-react";
import {
  loginAction,
  type LoginState,
} from "@/app/painel/actions";

const initialState: LoginState = { error: null };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold text-white shadow-[0_12px_28px_-14px_rgba(42,130,103,0.9)] transition hover:bg-green-dark disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />
          Entrando...
        </>
      ) : (
        <>
          <LockKeyhole className="h-4 w-4" />
          Entrar no painel
        </>
      )}
    </button>
  );
}

export default function LoginForm({ email }: { email: string }) {
  const [state, formAction] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="text-sm font-bold text-heading">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue={email}
          autoComplete="username"
          required
          className="mt-2 min-h-12 w-full rounded-xl border border-green/25 bg-white px-4 text-base text-heading outline-none transition placeholder:text-foreground/45 focus:border-green focus:ring-2 focus:ring-green/20"
        />
      </div>

      <div>
        <label htmlFor="password" className="text-sm font-bold text-heading">
          Senha
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 min-h-12 w-full rounded-xl border border-green/25 bg-white px-4 text-base text-heading outline-none transition placeholder:text-foreground/45 focus:border-green focus:ring-2 focus:ring-green/20"
        />
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
        >
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}

