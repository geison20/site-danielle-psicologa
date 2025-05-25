import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Location from "@/components/Location";

export default function Home() {
  return (
    <>
      <header role="banner">
        <Navbar />
      </header>
      <main id="conteudo-principal" className="min-h-screen" role="main">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Testimonials />
        <Location />
        <CTASection />
      </main>
      <footer role="contentinfo">
        <Footer />
      </footer>
    </>
  );
}
