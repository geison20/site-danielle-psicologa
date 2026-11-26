import Link from "next/link";
import { ArrowLeft, FilePenLine } from "lucide-react";
import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { getAdminEmail, getAdminSession } from "@/lib/admin-auth";

export default async function PainelLoginPage() {
  if (await getAdminSession()) redirect("/painel");

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cream-light px-5 py-10">
      <div
        aria-hidden="true"
        className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-cream-dark blur-3xl"
      />

      <div className="relative w-full max-w-md rounded-[2rem] border border-green/15 bg-white p-6 shadow-[0_24px_80px_-42px_rgba(23,60,50,0.55)] sm:p-9">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-bold text-green-dark transition hover:text-heading"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao site
        </Link>

        <div className="mt-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-green/10 text-green-dark ring-1 ring-green/20">
          <FilePenLine className="h-6 w-6" />
        </div>
        <h1 className="mt-5 font-heading text-3xl font-bold tracking-[-0.03em] text-heading">
          Painel de conteúdo
        </h1>
        <p className="mt-3 leading-7 text-foreground">
          Entre para criar e editar artigos, leituras e publicações do site.
        </p>

        <LoginForm email={getAdminEmail()} />
      </div>
    </main>
  );
}

