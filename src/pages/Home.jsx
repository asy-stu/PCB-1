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
import { recordVisit } from "../lib/statsStore";

export default function Home() {
  useEffect(() => {
    recordVisit();
  }, []);

  return (
    <div>
      <Navbar />
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
      <Footer />
    </div>
  );
}
