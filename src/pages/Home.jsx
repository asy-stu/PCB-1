import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Gallery from "../components/Gallery";
import Skills from "../components/Skills";
import SoftwareTools from "../components/SoftwareTools";
import Process from "../components/Process";
import Profiles from "../components/Profiles";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import { recordVisit } from "../lib/statsStore";

export default function Home() {
  useEffect(() => {
    recordVisit();

    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#/")) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", window.location.pathname + window.location.search + "#/");
    };
    document.addEventListener("click", handleAnchorClick);

    const sections = document.querySelectorAll("main > section:not(#home), main > div");
    sections.forEach((section) => section.classList.add("scroll-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -60px" });
    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <About />
      <Services />
      <Gallery />
      <Skills />
      <SoftwareTools />
      <Process />
      <Profiles />
      <Testimonials />
      <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
