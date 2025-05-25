import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Location from "@/components/Location";
import Head from "next/head";
import Script from "next/script";

export default function Home() {
  return (
    <>
      {/* <Head>
        {process.env.NODE_ENV === "production" && (
          <>
            <Script async strategy="afterInteractive" id="analytics">
              {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `}
            </Script>
          </>
        )}
      </Head> */}
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
