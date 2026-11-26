"use client";

import { LoaderCircle, Plus, Trash2 } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DrawerActions,
  Field,
  ImageUploader,
  Toggle,
  inputClassName,
  textareaClassName,
} from "@/components/admin/fields";
import {
  SERVICE_ICONS,
  type AboutContent,
  type ContactContent,
  type ContentService,
  type ContentTestimonial,
  type HeroContent,
  type ServiceIcon,
} from "@/lib/content-types";

export const SERVICE_ICON_LABELS: Record<ServiceIcon, string> = {
  venus: "Mulher",
  "user-round": "Adulto",
  heart: "Coração",
  baby: "Bebê",
  leaf: "Folha (acolhimento)",
  "book-open": "Livro (desenvolvimento)",
  users: "Família",
  user: "Pessoa",
  brain: "Mente",
};

function SectionPanel({
  title,
  description,
  busy,
  disabled,
  onSubmit,
  children,
}: {
  title: string;
  description: string;
  busy: boolean;
  disabled?: boolean;
  onSubmit: () => Promise<void>;
  children: ReactNode;
}) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-5 space-y-5 rounded-2xl border border-green/15 bg-white p-5 shadow-[0_12px_40px_-32px_rgba(34,82,68,0.5)] sm:p-7"
    >
      <div>
        <h3 className="font-heading text-xl font-bold text-heading">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-foreground/75">{description}</p>
      </div>
      {children}
      <div className="flex justify-end border-t border-green/10 pt-5">
        <Button
          type="submit"
          size="lg"
          disabled={busy || disabled}
          className="w-full sm:w-auto"
        >
          {busy && <LoaderCircle className="animate-spin" />}
          {busy ? "Publicando..." : "Salvar e publicar"}
        </Button>
      </div>
    </form>
  );
}

export function HeroForm({
  value,
  busy,
  onSave,
}: {
  value: HeroContent;
  busy: boolean;
  onSave: (value: HeroContent) => Promise<void>;
}) {
  const [item, setItem] = useState(value);

  function update<K extends keyof HeroContent>(key: K, next: HeroContent[K]) {
    setItem((current) => ({ ...current, [key]: next }));
  }

  return (
    <SectionPanel
      title="Início do site"
      description="É a primeira coisa que as pessoas veem ao abrir o site."
      busy={busy}
      disabled={!item.imageUrl}
      onSubmit={() => onSave(item)}
    >
      <Field label="Selo acima do título" hint="Frase curta, ex.: Psicologia clínica com escuta acolhedora.">
        <input
          value={item.badge}
          onChange={(event) => update("badge", event.target.value)}
          required
          maxLength={80}
          className={inputClassName}
        />
      </Field>
      <Field label="Título principal">
        <textarea
          value={item.title}
          onChange={(event) => update("title", event.target.value)}
          required
          maxLength={140}
          rows={2}
          className={textareaClassName}
        />
      </Field>
      <Field label="Texto de apresentação">
        <textarea
          value={item.subtitle}
          onChange={(event) => update("subtitle", event.target.value)}
          required
          maxLength={500}
          rows={4}
          className={textareaClassName}
        />
      </Field>
      <ImageUploader
        label="Foto de fundo"
        alt="Prévia da foto de fundo"
        value={item.imageUrl}
        onChange={(url) => update("imageUrl", url)}
      />
    </SectionPanel>
  );
}

export function AboutForm({
  value,
  busy,
  onSave,
}: {
  value: AboutContent;
  busy: boolean;
  onSave: (value: AboutContent) => Promise<void>;
}) {
  const [item, setItem] = useState(value);

  function update<K extends keyof AboutContent>(key: K, next: AboutContent[K]) {
    setItem((current) => ({ ...current, [key]: next }));
  }

  function updateEducation(index: number, key: "title" | "institution", next: string) {
    update(
      "education",
      item.education.map((entry, entryIndex) =>
        entryIndex === index ? { ...entry, [key]: next } : entry,
      ),
    );
  }

  return (
    <SectionPanel
      title="Sobre você"
      description="Sua foto, sua história e sua formação."
      busy={busy}
      disabled={!item.photoUrl}
      onSubmit={() => onSave(item)}
    >
      <Field label="Título da seção">
        <input
          value={item.title}
          onChange={(event) => update("title", event.target.value)}
          required
          maxLength={120}
          className={inputClassName}
        />
      </Field>
      <Field label="Frase de apoio">
        <input
          value={item.intro}
          onChange={(event) => update("intro", event.target.value)}
          required
          maxLength={240}
          className={inputClassName}
        />
      </Field>

      <ImageUploader
        label="Sua foto"
        alt={item.photoAlt}
        value={item.photoUrl}
        onChange={(url) => update("photoUrl", url)}
      />
      <Field label="Descrição da foto" hint="Ajuda pessoas que usam leitor de tela.">
        <input
          value={item.photoAlt}
          onChange={(event) => update("photoAlt", event.target.value)}
          required
          maxLength={180}
          className={inputClassName}
        />
      </Field>

      <Field
        label="Texto sobre você"
        hint="Separe os parágrafos com uma linha em branco. Para deixar algo em negrito, coloque entre **dois asteriscos**."
      >
        <textarea
          value={item.body}
          onChange={(event) => update("body", event.target.value)}
          required
          maxLength={6_000}
          rows={14}
          className={`${textareaClassName} min-h-72`}
        />
      </Field>

      <Field
        label="Nota pessoal (opcional)"
        hint="Aparece num cartão abaixo da foto. Deixe vazio para ocultar."
      >
        <textarea
          value={item.personalNote}
          onChange={(event) => update("personalNote", event.target.value)}
          maxLength={500}
          rows={3}
          className={textareaClassName}
        />
      </Field>

      <div className="space-y-3 border-t border-green/10 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-heading">Formação acadêmica</p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={item.education.length >= 8}
            onClick={() =>
              update("education", [...item.education, { title: "", institution: "" }])
            }
          >
            <Plus />
            Adicionar
          </Button>
        </div>

        {item.education.map((entry, index) => (
          <div
            key={index}
            className="space-y-3 rounded-xl border border-green/15 bg-cream-light/60 p-4"
          >
            <Field label="Curso ou formação">
              <input
                value={entry.title}
                onChange={(event) => updateEducation(index, "title", event.target.value)}
                required
                maxLength={140}
                className={inputClassName}
              />
            </Field>
            <Field label="Instituição">
              <input
                value={entry.institution}
                onChange={(event) =>
                  updateEducation(index, "institution", event.target.value)
                }
                required
                maxLength={200}
                className={inputClassName}
              />
            </Field>
            <button
              type="button"
              onClick={() =>
                update(
                  "education",
                  item.education.filter((_, entryIndex) => entryIndex !== index),
                )
              }
              className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-bold text-red-700 transition hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
              Remover esta formação
            </button>
          </div>
        ))}
      </div>
    </SectionPanel>
  );
}

export function ContactForm({
  value,
  busy,
  onSave,
}: {
  value: ContactContent;
  busy: boolean;
  onSave: (value: ContactContent) => Promise<void>;
}) {
  const [item, setItem] = useState(value);

  function update<K extends keyof ContactContent>(key: K, next: ContactContent[K]) {
    setItem((current) => ({ ...current, [key]: next }));
  }

  return (
    <SectionPanel
      title="Contato e endereço"
      description="Vale para o site inteiro: botões de WhatsApp, rodapé e seção de contato."
      busy={busy}
      onSubmit={() => onSave(item)}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Telefone / WhatsApp"
          hint="Com DDD. Ex.: (11) 96455-6323. O mesmo número é usado no botão do WhatsApp."
        >
          <input
            type="tel"
            value={item.phone}
            onChange={(event) => update("phone", event.target.value)}
            required
            maxLength={30}
            className={inputClassName}
          />
        </Field>
        <Field label="E-mail">
          <input
            type="email"
            value={item.email}
            onChange={(event) => update("email", event.target.value)}
            required
            maxLength={120}
            className={inputClassName}
          />
        </Field>
      </div>
      <Field label="Instagram" hint="Ex.: @danielle.psicologia">
        <input
          value={item.instagram}
          onChange={(event) => update("instagram", event.target.value)}
          required
          maxLength={120}
          className={inputClassName}
        />
      </Field>
      <Field label="Endereço do consultório" hint="Rua, número e complemento.">
        <input
          value={item.addressLine1}
          onChange={(event) => update("addressLine1", event.target.value)}
          required
          maxLength={160}
          className={inputClassName}
        />
      </Field>
      <Field label="Bairro, cidade e CEP">
        <input
          value={item.addressLine2}
          onChange={(event) => update("addressLine2", event.target.value)}
          required
          maxLength={160}
          className={inputClassName}
        />
      </Field>
    </SectionPanel>
  );
}

export function ServiceForm({
  initialItem,
  busy,
  onCancel,
  onSave,
}: {
  initialItem: ContentService;
  busy: boolean;
  onCancel: () => void;
  onSave: (item: ContentService) => Promise<void>;
}) {
  const [item, setItem] = useState(initialItem);

  function update<K extends keyof ContentService>(key: K, next: ContentService[K]) {
    setItem((current) => ({ ...current, [key]: next }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSave(item);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
      <Field label="Título">
        <input
          value={item.title}
          onChange={(event) => update("title", event.target.value)}
          required
          maxLength={120}
          className={inputClassName}
        />
      </Field>
      <Field label="Descrição" hint="Duas ou três frases curtas.">
        <textarea
          value={item.description}
          onChange={(event) => update("description", event.target.value)}
          required
          maxLength={400}
          rows={4}
          className={textareaClassName}
        />
      </Field>
      <Field label="Ícone">
        <select
          value={item.icon}
          onChange={(event) => update("icon", event.target.value as ServiceIcon)}
          className={inputClassName}
        >
          {SERVICE_ICONS.map((icon) => (
            <option key={icon} value={icon}>
              {SERVICE_ICON_LABELS[icon]}
            </option>
          ))}
        </select>
      </Field>

      <ImageUploader
        label="Foto"
        alt={item.imageAlt}
        value={item.imageUrl}
        onChange={(url) => update("imageUrl", url)}
      />
      <Field label="Descrição da foto" hint="Ajuda pessoas que usam leitor de tela.">
        <input
          value={item.imageAlt}
          onChange={(event) => update("imageAlt", event.target.value)}
          required
          maxLength={180}
          className={inputClassName}
        />
      </Field>

      <Toggle
        checked={item.published}
        onChange={(checked) => update("published", checked)}
        label="Publicado"
        description="Desmarque para esconder do site sem excluir."
      />

      <DrawerActions busy={busy} disabled={!item.imageUrl} onCancel={onCancel} />
    </form>
  );
}

export function TestimonialForm({
  initialItem,
  busy,
  onCancel,
  onSave,
}: {
  initialItem: ContentTestimonial;
  busy: boolean;
  onCancel: () => void;
  onSave: (item: ContentTestimonial) => Promise<void>;
}) {
  const [item, setItem] = useState(initialItem);

  function update<K extends keyof ContentTestimonial>(
    key: K,
    next: ContentTestimonial[K],
  ) {
    setItem((current) => ({ ...current, [key]: next }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSave(item);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
      <Field label="Nome" hint="Use só o nome ou as iniciais, conforme a autorização de quem escreveu.">
        <input
          value={item.name}
          onChange={(event) => update("name", event.target.value)}
          required
          maxLength={80}
          className={inputClassName}
        />
      </Field>
      <Field label="Data (opcional)" hint="Texto livre, ex.: 21 de abr. de 2024.">
        <input
          value={item.date}
          onChange={(event) => update("date", event.target.value)}
          maxLength={40}
          className={inputClassName}
        />
      </Field>
      <Field label="Depoimento">
        <textarea
          value={item.text}
          onChange={(event) => update("text", event.target.value)}
          required
          maxLength={800}
          rows={6}
          className={textareaClassName}
        />
      </Field>
      <Toggle
        checked={item.published}
        onChange={(checked) => update("published", checked)}
        label="Publicado"
        description="Desmarque para esconder do site sem excluir."
      />

      <DrawerActions busy={busy} onCancel={onCancel} />
    </form>
  );
}
