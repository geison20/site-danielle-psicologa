import Footer from "@/components/Footer";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
// import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Instagram from "@/components/InstagramFeed";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import Values from "@/components/Values";
import Publications from "@/components/Publications";
import Articles from "@/components/Articles";
import { getPublicSiteContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Psicóloga em São Paulo para saúde mental e vínculos saudáveis",
  description:
    "Conheça o trabalho de Danielle Robertis de Vincenzo, psicóloga clínica em São Paulo com atuação em saúde mental perinatal, saúde da mulher, adultos, adolescentes e famílias.",
};

export const revalidate = 60;

export default async function Home() {
  const content = await getPublicSiteContent();
  const articles = content.articles.filter((article) => article.published);
  const publications = content.publications.filter(
    (publication) => publication.published,
  );
  const services = content.services.filter((service) => service.published);
  const testimonials = content.testimonials.filter(
    (testimonial) => testimonial.published,
  );
  const { hero, about, contact } = content.settings;

  return (
    <>
      <a
        href="#conteudo-principal"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-xl bg-heading px-4 py-3 text-sm font-bold text-white shadow-lg transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <header role="banner">
        <Navbar contact={contact} />
      </header>
      <main id="conteudo-principal" className="min-h-screen" role="main">
        <Hero hero={hero} contact={contact} />
        <Values />
        <Services services={services} />
        <About about={about} contact={contact} />
        <Publications publications={publications} />
        <Articles articles={articles} />
        <Instagram />
        <Testimonials testimonials={testimonials} />
        <Contact contact={contact} />
      </main>
      <footer role="contentinfo">
        <Footer contact={contact} />
      </footer>

      <FloatingWhatsAppButton contact={contact} />
    </>
  );
}
