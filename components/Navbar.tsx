"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Scenarios", href: "#scenarios" },
  { label: "Simulation", href: "#simulation" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 68,
        background: scrolled ? "rgba(10,10,10,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid transparent",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center",
        padding: "0 clamp(20px, 4vw, 48px)",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <div style={{
          width: 34, height: 34, borderRadius: 9, background: "#FF7A1A",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 10, color: "#fff", letterSpacing: 1,
        }}>ORO</div>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: -0.5 }}>oro</span>
      </a>

      {/* Desktop nav */}
      <nav style={{ display: "flex", gap: 28 }} className="hidden-mobile">
        {LINKS.map((l) => (
          <a key={l.label} href={l.href} style={{
            fontFamily: "DM Sans, sans-serif", fontSize: 13,
            color: "rgba(255,255,255,0.45)", textDecoration: "none", letterSpacing: 0.2,
            transition: "color 0.2s",
          }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
          >{l.label}</a>
        ))}
      </nav>

      {/* CTA */}
      <a href="https://app.getoro.xyz" target="_blank" rel="noreferrer" className="btn-primary"
        style={{ fontSize: 13, padding: "9px 20px" }}>
        Launch App ↗
      </a>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </motion.header>
  );
}
