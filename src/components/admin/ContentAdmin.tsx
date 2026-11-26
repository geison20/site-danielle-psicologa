"use client";

import Image from "next/image";
import Link from "next/link";
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  FileText,
  HeartHandshake,
  History,
  House,
  LoaderCircle,
  LogOut,
  MapPin,
  Plus,
  Quote,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  logoutAction,
  restoreVersionAction,
  saveContentAction,
} from "@/app/painel/actions";
import {
  DrawerActions,
  Field,
  ImageUploader,
  ItemActions,
  StatusBadge,
  Toggle,
  hasUnsavedChanges,
  inputClassName,
  useDraftState,
} from "@/components/admin/fields";
import {
  AboutForm,
  ContactForm,
  HeroForm,
  SERVICE_ICON_LABELS,
  ServiceForm,
  TestimonialForm,
} from "@/components/admin/SectionForms";
import VersionHistory, {
  formatVersionDate,
} from "@/components/admin/VersionHistory";
import { Button } from "@/components/ui/button";
import type {
  ContentArticle,
  ContentPublication,
  ContentService,
  ContentTestimonial,
  ContentVersion,
  SiteContent,
  SiteContentSnapshot,
  SiteSettings,
} from "@/lib/content-types";

type ListTab = "articles" | "publications" | "services" | "testimonials";
type Tab = "hero" | "about" | "contact" | ListTab;
type EditorState =
  | { type: "article"; item: ContentArticle; isNew: boolean }
  | { type: "publication"; item: ContentPublication; isNew: boolean }
  | { type: "service"; item: ContentService; isNew: boolean }
  | { type: "testimonial"; item: ContentTestimonial; isNew: boolean }
  | null;

type Notice = { type: "success" | "error"; message: string } | null;

const TABS: {
  id: Tab;
  label: string;
  title: string;
  description: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "hero",
    label: "Início",
    title: "Início do site",
    description: "Título, texto de apresentação e foto de fundo da primeira tela.",
    Icon: House,
  },
  {
    id: "about",
    label: "Sobre",
    title: "Sobre você",
    description: "Sua foto, sua história e sua formação.",
    Icon: UserRound,
  },
  {
    id: "services",
    label: "Áreas de atuação",
    title: "Áreas de atuação",
    description: "Cada área tem foto, título e descrição. Use as setas para mudar a ordem.",
    Icon: HeartHandshake,
  },
  {
    id: "testimonials",
    label: "Depoimentos",
    title: "Depoimentos",
    description: "Relatos de pacientes exibidos no carrossel do site.",
    Icon: Quote,
  },
  {
    id: "articles",
    label: "Artigos",
    title: "Artigos e leituras",
    description: "Crie artigos autorais e indique leituras externas.",
    Icon: FileText,
  },
  {
    id: "publications",
    label: "Publicações",
    title: "Publicações",
    description: "Mantenha livros e publicações atualizados.",
    Icon: BookOpen,
  },
  {
    id: "contact",
    label: "Contato",
    title: "Contato e endereço",
    description: "Telefone, e-mail, Instagram e endereço do consultório.",
    Icon: MapPin,
  },
];

const NEW_BUTTON_LABEL: Record<ListTab, string> = {
  articles: "Novo artigo ou leitura",
  publications: "Nova publicação",
  services: "Nova área de atuação",
  testimonials: "Novo depoimento",
};

const EDITOR_TITLE: Record<NonNullable<EditorState>["type"], string> = {
  article: "Artigo ou leitura",
  publication: "Publicação",
  service: "Área de atuação",
  testimonial: "Depoimento",
};

function isListTab(tab: Tab): tab is ListTab {
  return (
    tab === "articles" ||
    tab === "publications" ||
    tab === "services" ||
    tab === "testimonials"
  );
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
}

function createId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID()}`;
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function newArticle(): ContentArticle {
  return {
    id: createId("article"),
    kind: "article",
    slug: "",
    title: "",
    description: "",
    body: "",
    source: "",
    author: "Danielle Robertis de Vincenzo",
    publishedAt: today(),
    category: "Psicologia",
    href: "",
    imageUrl: "",
    imageAlt: "",
    featured: false,
    published: false,
  };
}

function newPublication(): ContentPublication {
  return {
    id: createId("publication"),
    title: "",
    subtitle: "",
    meta: "",
    description: "",
    imageUrl: "",
    imageAlt: "",
    href: "",
    cta: "Conhecer publicação",
    featured: false,
    published: false,
  };
}

function newService(): ContentService {
  return {
    id: createId("service"),
    title: "",
    description: "",
    icon: "heart",
    imageUrl: "",
    imageAlt: "",
    published: true,
  };
}

function newTestimonial(): ContentTestimonial {
  return {
    id: createId("testimonial"),
    name: "",
    date: "",
    text: "",
    published: true,
  };
}

function ArticleForm({
  initialItem,
  busy,
  onCancel,
  onSave,
}: {
  initialItem: ContentArticle;
  busy: boolean;
  onCancel: () => void;
  onSave: (item: ContentArticle) => Promise<void>;
}) {
  const [item, setItem] = useDraftState(initialItem);
  const [slugEdited, setSlugEdited] = useState(Boolean(initialItem.slug));

  function update<K extends keyof ContentArticle>(
    key: K,
    value: ContentArticle[K],
  ) {
    setItem((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSave({ ...item, slug: item.slug || slugify(item.title) });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
      <Field label="Tipo de conteúdo">
        <select
          value={item.kind}
          onChange={(event) =>
            update("kind", event.target.value as ContentArticle["kind"])
          }
          className={inputClassName}
        >
          <option value="article">Artigo autoral</option>
          <option value="reading">Leitura externa</option>
        </select>
      </Field>

      <Field label="Título">
        <input
          value={item.title}
          onChange={(event) => {
            update("title", event.target.value);
            if (!slugEdited) update("slug", slugify(event.target.value));
          }}
          required
          maxLength={180}
          className={inputClassName}
        />
      </Field>

      <Field
        label="Endereço do artigo"
        hint={
          item.kind === "article"
            ? `Será publicado em /artigos/${item.slug || "endereco-do-artigo"}`
            : "Usado apenas para organizar esta leitura no painel."
        }
      >
        <input
          value={item.slug}
          onChange={(event) => {
            setSlugEdited(true);
            update("slug", slugify(event.target.value));
          }}
          required
          pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          className={inputClassName}
        />
      </Field>

      <Field label="Resumo" hint="Aparece no cartão da página inicial.">
        <textarea
          value={item.description}
          onChange={(event) => update("description", event.target.value)}
          required
          maxLength={600}
          rows={4}
          className={`${inputClassName} py-3`}
        />
      </Field>

      {item.kind === "article" ? (
        <Field
          label="Texto do artigo"
          hint="Separe os parágrafos com uma linha em branco. O texto é exibido com formatação simples e segura."
        >
          <textarea
            value={item.body}
            onChange={(event) => update("body", event.target.value)}
            required
            maxLength={30_000}
            rows={14}
            className={`${inputClassName} min-h-72 py-3 leading-7`}
          />
        </Field>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Fonte">
            <input
              value={item.source}
              onChange={(event) => update("source", event.target.value)}
              required
              maxLength={120}
              placeholder="Ex.: Portal Drauzio Varella"
              className={inputClassName}
            />
          </Field>
          <Field label="Link externo">
            <input
              type="url"
              value={item.href}
              onChange={(event) => update("href", event.target.value)}
              required
              maxLength={2_048}
              placeholder="https://..."
              className={inputClassName}
            />
          </Field>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Autoria">
          <input
            value={item.author}
            onChange={(event) => update("author", event.target.value)}
            required
            maxLength={120}
            className={inputClassName}
          />
        </Field>
        <Field label="Data de publicação">
          <input
            type="date"
            value={item.publishedAt}
            onChange={(event) => update("publishedAt", event.target.value)}
            required
            className={inputClassName}
          />
        </Field>
      </div>

      <Field label="Categoria">
        <input
          value={item.category}
          onChange={(event) => update("category", event.target.value)}
          required
          maxLength={80}
          placeholder="Ex.: Saúde mental perinatal"
          className={inputClassName}
        />
      </Field>

      <ImageUploader
        value={item.imageUrl}
        alt={item.imageAlt}
        onChange={(url) => update("imageUrl", url)}
      />

      <Field label="Descrição da imagem" hint="Ajuda pessoas que usam leitor de tela.">
        <input
          value={item.imageAlt}
          onChange={(event) => update("imageAlt", event.target.value)}
          required
          maxLength={180}
          className={inputClassName}
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle
          checked={item.published}
          onChange={(checked) => update("published", checked)}
          label="Publicado"
          description="Visível para quem acessa o site."
        />
        <Toggle
          checked={item.featured}
          onChange={(checked) => update("featured", checked)}
          label="Destacar"
          description="Aparece em formato maior na página inicial."
        />
      </div>

      <DrawerActions busy={busy} disabled={!item.imageUrl} onCancel={onCancel} />
    </form>
  );
}

function PublicationForm({
  initialItem,
  busy,
  onCancel,
  onSave,
}: {
  initialItem: ContentPublication;
  busy: boolean;
  onCancel: () => void;
  onSave: (item: ContentPublication) => Promise<void>;
}) {
  const [item, setItem] = useDraftState(initialItem);

  function update<K extends keyof ContentPublication>(
    key: K,
    value: ContentPublication[K],
  ) {
    setItem((current) => ({ ...current, [key]: value }));
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
          maxLength={180}
          className={inputClassName}
        />
      </Field>
      <Field label="Subtítulo">
        <input
          value={item.subtitle}
          onChange={(event) => update("subtitle", event.target.value)}
          required
          maxLength={220}
          className={inputClassName}
        />
      </Field>
      <Field label="Informação complementar" hint="Ex.: editora, ano ou participação na obra.">
        <input
          value={item.meta}
          onChange={(event) => update("meta", event.target.value)}
          maxLength={180}
          className={inputClassName}
        />
      </Field>
      <Field label="Descrição">
        <textarea
          value={item.description}
          onChange={(event) => update("description", event.target.value)}
          required
          maxLength={600}
          rows={5}
          className={`${inputClassName} py-3`}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Link da publicação">
          <input
            type="url"
            value={item.href}
            onChange={(event) => update("href", event.target.value)}
            required
            maxLength={2_048}
            placeholder="https://..."
            className={inputClassName}
          />
        </Field>
        <Field label="Texto do botão">
          <input
            value={item.cta}
            onChange={(event) => update("cta", event.target.value)}
            required
            maxLength={60}
            className={inputClassName}
          />
        </Field>
      </div>

      <ImageUploader
        value={item.imageUrl}
        alt={item.imageAlt}
        onChange={(url) => update("imageUrl", url)}
      />

      <Field label="Descrição da imagem" hint="Ex.: Capa do livro...">
        <input
          value={item.imageAlt}
          onChange={(event) => update("imageAlt", event.target.value)}
          required
          maxLength={180}
          className={inputClassName}
        />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Toggle
          checked={item.published}
          onChange={(checked) => update("published", checked)}
          label="Publicado"
          description="Visível para quem acessa o site."
        />
        <Toggle
          checked={item.featured}
          onChange={(checked) => update("featured", checked)}
          label="Destacar"
          description="Recebe o selo de novidade."
        />
      </div>

      <DrawerActions busy={busy} disabled={!item.imageUrl} onCancel={onCancel} />
    </form>
  );
}

function ListRow({
  image,
  fit = "cover",
  fallbackIcon: FallbackIcon,
  title,
  subtitle,
  published,
  tags,
  actions,
}: {
  image?: string;
  fit?: "cover" | "contain";
  fallbackIcon?: LucideIcon;
  title: string;
  subtitle: string;
  published: boolean;
  tags?: ReactNode;
  actions: ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-green/15 bg-white p-4 shadow-[0_12px_40px_-32px_rgba(34,82,68,0.5)] sm:flex sm:items-center sm:gap-4">
      <div className="flex min-w-0 gap-3 sm:flex-1">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-cream-dark">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              className={fit === "contain" ? "object-contain p-1" : "object-cover"}
              sizes="80px"
            />
          ) : (
            FallbackIcon && <FallbackIcon className="h-7 w-7 text-green-dark/60" />
          )}
        </div>
        <div className="min-w-0 py-0.5">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge published={published} />
            {tags}
          </div>
          <h3 className="mt-2 line-clamp-2 font-heading text-base font-bold leading-5 text-heading">
            {title}
          </h3>
          <p className="mt-1 line-clamp-1 text-xs text-foreground/70">{subtitle}</p>
        </div>
      </div>
      {actions}
    </article>
  );
}

export default function ContentAdmin({
  initialSnapshot,
  storageConfigured,
  email,
}: {
  initialSnapshot: SiteContentSnapshot;
  storageConfigured: boolean;
  email: string;
}) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [tab, setTab] = useState<Tab>("hero");
  const [editor, setEditor] = useState<EditorState>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<Notice>(null);
  const [historyOpen, setHistoryOpen] = useState(false);

  useEffect(() => {
    function warnBeforeLeaving(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges()) return;
      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, []);

  const content = snapshot.content;
  const activeTab = TABS.find((entry) => entry.id === tab) ?? TABS[0];

  function showNotice(nextNotice: Notice) {
    setNotice(nextNotice);
    if (nextNotice) window.setTimeout(() => setNotice(null), 4_500);
  }

  async function persist(nextContent: SiteContent): Promise<boolean> {
    setBusy(true);
    setNotice(null);
    try {
      const result = await saveContentAction({
        content: nextContent,
        etag: snapshot.etag,
      });
      if (!result.ok) {
        showNotice({ type: "error", message: result.message });
        return false;
      }

      setSnapshot(result.snapshot);
      showNotice({ type: "success", message: result.message });
      return true;
    } catch {
      showNotice({
        type: "error",
        message: "Sua sessão pode ter expirado. Atualize a página e tente novamente.",
      });
      return false;
    } finally {
      setBusy(false);
    }
  }

  function closeEditor() {
    if (
      hasUnsavedChanges("drawer:") &&
      !window.confirm("Descartar as alterações deste item sem publicar?")
    ) {
      return;
    }
    setEditor(null);
  }

  async function restoreVersion(version: ContentVersion) {
    const savedAt = formatVersionDate(version.savedAt);
    const warning = hasUnsavedChanges()
      ? "\n\nAtenção: alterações ainda não publicadas nos formulários podem ser perdidas."
      : "";
    if (
      !window.confirm(
        `Restaurar a versão de ${savedAt}?${warning}\n\nA versão atual continua guardada no histórico.`,
      )
    ) {
      return;
    }

    setBusy(true);
    setNotice(null);
    try {
      const result = await restoreVersionAction({
        id: version.id,
        etag: snapshot.etag,
      });
      if (!result.ok) {
        showNotice({ type: "error", message: result.message });
        return;
      }

      setSnapshot(result.snapshot);
      setHistoryOpen(false);
      showNotice({ type: "success", message: result.message });
    } catch {
      showNotice({
        type: "error",
        message: "Sua sessão pode ter expirado. Atualize a página e tente novamente.",
      });
    } finally {
      setBusy(false);
    }
  }

  async function saveSettings(patch: Partial<SiteSettings>) {
    await persist({ ...content, settings: { ...content.settings, ...patch } });
  }

  async function saveArticle(item: ContentArticle) {
    const previous = content.articles;
    const normalized = item.featured
      ? previous.map((article) => ({ ...article, featured: false }))
      : previous;
    const exists = normalized.some((article) => article.id === item.id);
    const articles = exists
      ? normalized.map((article) => (article.id === item.id ? item : article))
      : [item, ...normalized];

    if (await persist({ ...content, articles })) setEditor(null);
  }

  async function savePublication(item: ContentPublication) {
    const previous = content.publications;
    const normalized = item.featured
      ? previous.map((publication) => ({ ...publication, featured: false }))
      : previous;
    const exists = normalized.some((publication) => publication.id === item.id);
    const publications = exists
      ? normalized.map((publication) =>
          publication.id === item.id ? item : publication,
        )
      : [item, ...normalized];

    if (await persist({ ...content, publications })) setEditor(null);
  }

  async function saveService(item: ContentService) {
    const exists = content.services.some((service) => service.id === item.id);
    const services = exists
      ? content.services.map((service) => (service.id === item.id ? item : service))
      : [...content.services, item];

    if (await persist({ ...content, services })) setEditor(null);
  }

  async function saveTestimonial(item: ContentTestimonial) {
    const exists = content.testimonials.some(
      (testimonial) => testimonial.id === item.id,
    );
    const testimonials = exists
      ? content.testimonials.map((testimonial) =>
          testimonial.id === item.id ? item : testimonial,
        )
      : [item, ...content.testimonials];

    if (await persist({ ...content, testimonials })) setEditor(null);
  }

  async function remove(type: ListTab, id: string, title: string) {
    if (!window.confirm(`Excluir “${title}”? Essa ação não pode ser desfeita.`)) {
      return;
    }

    const list = content[type] as { id: string }[];
    await persist({ ...content, [type]: list.filter((item) => item.id !== id) });
  }

  async function move(type: ListTab, index: number, direction: -1 | 1) {
    const target = index + direction;
    const list = [...(content[type] as { id: string }[])];
    if (target < 0 || target >= list.length) return;
    [list[index], list[target]] = [list[target], list[index]];

    await persist({ ...content, [type]: list });
  }

  function openNew() {
    if (tab === "articles") {
      setEditor({ type: "article", item: newArticle(), isNew: true });
    } else if (tab === "publications") {
      setEditor({ type: "publication", item: newPublication(), isNew: true });
    } else if (tab === "services") {
      setEditor({ type: "service", item: newService(), isNew: true });
    } else if (tab === "testimonials") {
      setEditor({ type: "testimonial", item: newTestimonial(), isNew: true });
    }
  }

  function rowActions(
    type: ListTab,
    index: number,
    id: string,
    title: string,
    edit: () => void,
  ) {
    return (
      <ItemActions
        index={index}
        total={(content[type] as unknown[]).length}
        busy={busy}
        onUp={() => move(type, index, -1)}
        onDown={() => move(type, index, 1)}
        onEdit={edit}
        onDelete={() => remove(type, id, title)}
      />
    );
  }

  const itemsCount = isListTab(tab) ? content[tab].length : 0;

  return (
    <main className="min-h-screen bg-cream-light pb-16">
      <header className="border-b border-green/15 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-green-dark">
              Danielle Robertis
            </p>
            <h1 className="mt-1 font-heading text-2xl font-bold text-heading">
              Painel de conteúdo
            </h1>
            <p className="mt-1 break-all text-xs text-foreground/70">{email}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:flex">
            <Button asChild variant="outline">
              <Link href="/" target="_blank">
                Ver site
                <ExternalLink />
              </Link>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setHistoryOpen(true)}
            >
              <History />
              Histórico
            </Button>
            <form
              action={logoutAction}
              onSubmit={(event) => {
                if (
                  hasUnsavedChanges() &&
                  !window.confirm("Há alterações não publicadas. Sair mesmo assim?")
                ) {
                  event.preventDefault();
                }
              }}
            >
              <Button type="submit" variant="ghost" className="w-full">
                <LogOut />
                Sair
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-5 py-7 sm:px-6 lg:px-8 lg:py-10">
        {!storageConfigured && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div>
              <p className="font-bold">Armazenamento ainda não configurado</p>
              <p className="mt-1 text-sm leading-6">
                Você pode visualizar o painel, mas será preciso configurar o
                armazenamento antes de publicar alterações.
              </p>
            </div>
          </div>
        )}

        {storageConfigured && !snapshot.persisted && (
          <div className="mb-6 flex gap-3 rounded-2xl border border-green/20 bg-green/10 p-4 text-heading">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-dark" />
            <p className="text-sm leading-6">
              Tudo pronto. O primeiro salvamento criará o arquivo de conteúdo
              com os itens atuais do site.
            </p>
          </div>
        )}

        <h2 className="font-heading text-3xl font-bold tracking-[-0.03em] text-heading">
          Conteúdo do site
        </h2>
        <p className="mt-2 max-w-2xl leading-7 text-foreground">
          Escolha a seção que quer editar. As alterações aparecem no site em
          poucos instantes depois de salvar.
        </p>

        <div
          role="tablist"
          aria-label="Seções do site"
          className="no-scrollbar -mx-5 mt-6 flex gap-1.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
        >
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-bold transition ${
                tab === id
                  ? "border-heading bg-heading text-white shadow-sm"
                  : "border-green/15 bg-white text-heading hover:bg-green/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-heading text-2xl font-bold text-heading">
              {activeTab.title}
            </h3>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-foreground/80">
              {activeTab.description}
            </p>
          </div>
          {isListTab(tab) && (
            <Button
              type="button"
              size="lg"
              onClick={openNew}
              className="w-full sm:w-auto"
            >
              <Plus />
              {NEW_BUTTON_LABEL[tab]}
            </Button>
          )}
        </div>

        {/* Seções com um único formulário ficam montadas para não perder o que foi digitado ao trocar de aba. */}
        <div hidden={tab !== "hero"}>
          <HeroForm
            value={content.settings.hero}
            busy={busy}
            onSave={(hero) => saveSettings({ hero })}
          />
        </div>
        <div hidden={tab !== "about"}>
          <AboutForm
            value={content.settings.about}
            busy={busy}
            onSave={(about) => saveSettings({ about })}
          />
        </div>
        <div hidden={tab !== "contact"}>
          <ContactForm
            value={content.settings.contact}
            busy={busy}
            onSave={(contact) => saveSettings({ contact })}
          />
        </div>

        {isListTab(tab) && (
          <>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm font-bold text-heading">
                {itemsCount} {itemsCount === 1 ? "item" : "itens"}
              </p>
              {busy && (
                <span className="flex items-center gap-2 text-sm font-bold text-green-dark">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Publicando...
                </span>
              )}
            </div>

            <div className="mt-3 space-y-3">
              {tab === "articles" &&
                content.articles.map((item, index) => (
                  <ListRow
                    key={item.id}
                    image={item.imageUrl}
                    title={item.title}
                    subtitle={item.category}
                    published={item.published}
                    tags={
                      <>
                        <span className="text-xs font-bold text-foreground/75">
                          {item.kind === "article" ? "Artigo autoral" : "Leitura externa"}
                        </span>
                        {item.featured && (
                          <span className="text-xs font-bold text-green-dark">Destaque</span>
                        )}
                      </>
                    }
                    actions={rowActions("articles", index, item.id, item.title, () =>
                      setEditor({ type: "article", item, isNew: false }),
                    )}
                  />
                ))}

              {tab === "publications" &&
                content.publications.map((item, index) => (
                  <ListRow
                    key={item.id}
                    image={item.imageUrl}
                    fit="contain"
                    title={item.title}
                    subtitle={item.subtitle}
                    published={item.published}
                    tags={
                      item.featured ? (
                        <span className="text-xs font-bold text-green-dark">Destaque</span>
                      ) : null
                    }
                    actions={rowActions("publications", index, item.id, item.title, () =>
                      setEditor({ type: "publication", item, isNew: false }),
                    )}
                  />
                ))}

              {tab === "services" &&
                content.services.map((item, index) => (
                  <ListRow
                    key={item.id}
                    image={item.imageUrl}
                    title={item.title}
                    subtitle={item.description}
                    published={item.published}
                    tags={
                      <span className="text-xs font-bold text-foreground/75">
                        Ícone: {SERVICE_ICON_LABELS[item.icon]}
                      </span>
                    }
                    actions={rowActions("services", index, item.id, item.title, () =>
                      setEditor({ type: "service", item, isNew: false }),
                    )}
                  />
                ))}

              {tab === "testimonials" &&
                content.testimonials.map((item, index) => (
                  <ListRow
                    key={item.id}
                    fallbackIcon={Quote}
                    title={item.name}
                    subtitle={item.text}
                    published={item.published}
                    tags={
                      item.date ? (
                        <span className="text-xs text-foreground/70">{item.date}</span>
                      ) : null
                    }
                    actions={rowActions("testimonials", index, item.id, item.name, () =>
                      setEditor({ type: "testimonial", item, isNew: false }),
                    )}
                  />
                ))}
            </div>

            {itemsCount === 0 && (
              <div className="mt-3 rounded-2xl border border-dashed border-green/30 bg-white/55 px-5 py-12 text-center">
                <p className="font-bold text-heading">Nenhum item cadastrado.</p>
                <p className="mt-2 text-sm text-foreground/75">
                  Use o botão acima para criar o primeiro.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {notice && (
        <div
          role="status"
          className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 right-4 z-[80] mx-auto flex max-w-lg items-start gap-3 rounded-2xl border p-4 shadow-xl ${
            notice.type === "success"
              ? "border-green/25 bg-heading text-white"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          {notice.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          ) : (
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          )}
          <p className="flex-1 text-sm font-bold leading-6">{notice.message}</p>
          <button
            type="button"
            onClick={() => setNotice(null)}
            aria-label="Fechar aviso"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {historyOpen && (
        <VersionHistory
          busy={busy}
          onClose={() => setHistoryOpen(false)}
          onRestore={restoreVersion}
        />
      )}

      {editor && (
        <div
          className="fixed inset-0 z-[70] bg-heading/55 backdrop-blur-sm sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="editor-title"
        >
          <div className="ml-auto flex h-full w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl sm:rounded-[2rem]">
            <header className="flex items-start justify-between gap-4 border-b border-green/10 bg-cream-light px-5 py-4 sm:px-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-green-dark">
                  {editor.isNew ? "Novo conteúdo" : "Editar conteúdo"}
                </p>
                <h2 id="editor-title" className="mt-1 font-heading text-xl font-bold text-heading">
                  {EDITOR_TITLE[editor.type]}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeEditor}
                disabled={busy}
                aria-label="Fechar editor"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-green/15 bg-white text-heading"
              >
                <X className="h-5 w-5" />
              </button>
            </header>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {editor.type === "article" && (
                <ArticleForm
                  key={editor.item.id}
                  initialItem={editor.item}
                  busy={busy}
                  onCancel={closeEditor}
                  onSave={saveArticle}
                />
              )}
              {editor.type === "publication" && (
                <PublicationForm
                  key={editor.item.id}
                  initialItem={editor.item}
                  busy={busy}
                  onCancel={closeEditor}
                  onSave={savePublication}
                />
              )}
              {editor.type === "service" && (
                <ServiceForm
                  key={editor.item.id}
                  initialItem={editor.item}
                  busy={busy}
                  onCancel={closeEditor}
                  onSave={saveService}
                />
              )}
              {editor.type === "testimonial" && (
                <TestimonialForm
                  key={editor.item.id}
                  initialItem={editor.item}
                  busy={busy}
                  onCancel={closeEditor}
                  onSave={saveTestimonial}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
