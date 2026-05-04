"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import HowItWorks from "@/components/sections/HowItWorks";
import Scenarios from "@/components/sections/Scenarios";
import Simulation from "@/components/sections/Simulation";
import HowThisHelps from "@/components/sections/HowThisHelps";
import Experience from "@/components/sections/Experience";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

export default function Home() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
      { threshold: 0.08 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Scenarios />
        <Simulation />
        <HowThisHelps />
        <Experience />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
