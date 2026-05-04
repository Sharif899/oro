"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const ORBIT_NODES = [
  { label: "Monitor", icon: "📡", angle: 0 },
  { label: "Adapt", icon: "⚡", angle: 90 },
  { label: "Optimize", icon: "🧠", angle: 180 },
  { label: "Execute", icon: "🎯", angle: 270 },
];

function OrbitVisual() {
  const [rotation, setRotation] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    let prev = 0;
    const step = (ts: number) => {
      if (!prev) prev = ts;
      setRotation((r) => (r + (ts - prev) * 0.018) % 360);
      prev = ts;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const R = 130;
  const SIZE = 320;
  const CX = SIZE / 2;

  return (
    <div style={{ position: "relative", width: SIZE, height: SIZE, flexShrink: 0 }}>
      {/* outer dashed ring */}
      <svg width={SIZE} height={SIZE} style={{ position: "absolute", inset: 0 }}>
        <circle cx={CX} cy={CX} r={R} fill="none" stroke="rgba(255,122,26,0.15)" strokeWidth="1" strokeDasharray="5 7" />
        <circle cx={CX} cy={CX} r={R * 0.62} fill="none" stroke="rgba(255,122,26,0.08)" strokeWidth="1" />
      </svg>

      {/* rotating container */}
      <div style={{
        position: "absolute", inset: 0,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "50% 50%",
      }}>
        {ORBIT_NODES.map((n) => {
          const rad = (n.angle * Math.PI) / 180;
          const nx = CX + R * Math.cos(rad) - 22;
          const ny = CX + R * Math.sin(rad) - 22;
          return (
            <div key={n.label} style={{
              position: "absolute", left: nx, top: ny,
              width: 44, height: 44, borderRadius: 13,
              background: "rgba(255,122,26,0.1)",
              border: "1px solid rgba(255,122,26,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18,
              transform: `rotate(-${rotation}deg)`,
            }}>
              {n.icon}
            </div>
          );
        })}
      </div>

      {/* labels (fixed, not rotating) */}
      {ORBIT_NODES.map((n) => {
        const rad = (n.angle * Math.PI) / 180;
        const nx = CX + (R + 36) * Math.cos(rad);
        const ny = CX + (R + 36) * Math.sin(rad);
        const alignX = Math.cos(rad) > 0.3 ? "left" : Math.cos(rad) < -0.3 ? "right" : "center";
        return (
          <div key={n.label + "-label"} style={{
            position: "absolute",
            left: nx,
            top: ny - 8,
            transform: alignX === "center" ? "translateX(-50%)" : alignX === "right" ? "translateX(-100%)" : "none",
            fontFamily: "Syne, sans-serif",
            fontWeight: 700, fontSize: 11,
            color: "#FF7A1A",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}>
            {n.label}
          </div>
        );
      })}

      {/* center ORO */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: 88, height: 88, borderRadius: 24,
        background: "rgba(10,10,10,0.95)",
        border: "1.5px solid rgba(255,122,26,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: 2,
        animation: "pulse-glow 3s ease-in-out infinite",
        boxShadow: "0 0 30px rgba(255,122,26,0.2)",
      }}>
        <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 20, color: "#FF7A1A", letterSpacing: -0.5 }}>ORO</span>
        <div style={{ width: 28, height: 2, borderRadius: 1, background: "rgba(255,122,26,0.4)" }} />
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "100px clamp(20px,5vw,80px) 80px",
      position: "relative", overflow: "hidden",
    }}>
      {/* grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(255,122,26,0.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,26,0.022) 1px, transparent 1px)",
        backgroundSize: "72px 72px",
      }} />
      {/* glow */}
      <div style={{
        position: "absolute", top: "50%", left: "30%", transform: "translate(-50%,-50%)",
        width: 700, height: 700, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(255,122,26,0.06) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60 }}>
        {/* LEFT */}
        <div style={{ flex: 1, maxWidth: 580 }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 16px", borderRadius: 100, border: "1px solid rgba(255,122,26,0.25)", background: "rgba(255,122,26,0.05)", marginBottom: 28 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF7A1A", animation: "pulse-glow 2s infinite" }} />
            <span style={{ fontFamily: "Syne, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase", color: "#FF7A1A" }}>
              AI-Powered Execution Layer for Capital
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
            style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: "clamp(50px, 6.5vw, 90px)", lineHeight: 0.93, letterSpacing: "-0.04em", marginBottom: 24 }}>
            <span style={{ color: "#fff", display: "block" }}>Less decisions.</span>
            <span className="gold" style={{ display: "block" }}>Better execution.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            style={{ fontFamily: "DM Sans, sans-serif", fontSize: "clamp(15px, 1.8vw, 18px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 40, maxWidth: 480 }}>
            ORO monitors, adapts, and executes so your capital follows a structured system over time — without constant manual input.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.38 }}
            style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 48 }}>
            <a href="https://app.getoro.xyz" target="_blank" rel="noreferrer" className="btn-primary">Launch App ↗</a>
            <a href="#scenarios" className="btn-ghost">See It In Action</a>
          </motion.div>

          {/* trust row */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", gap: 16 }}>
              {[
                { val: "$6M", sub: "Seed Raised" },
                { val: "10K+", sub: "Waitlist" },
                { val: "a16z", sub: "Backed" },
              ].map((s) => (
                <div key={s.val}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#FF7A1A" }}>{s.val}</div>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* RIGHT: orbit */}
        <motion.div initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }}
          className="hidden-mobile" style={{ flexShrink: 0 }}>
          <OrbitVisual />
        </motion.div>
      </div>

      {/* scroll hint */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.3 }}>
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.5))" }} />
        <span style={{ fontFamily: "Syne, sans-serif", fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "#fff" }}>scroll</span>
      </div>

      <style>{`@media(max-width:768px){.hidden-mobile{display:none!important}}`}</style>
    </section>
  );
}
