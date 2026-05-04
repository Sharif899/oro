"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01", icon: "🎯",
    title: "Set Strategy",
    body: "You define your goals, risk tolerance, and preferred approach once. ORO takes it from there — no constant reconfiguration needed.",
    detail: "One-time setup · Your rules · Your parameters",
  },
  {
    num: "02", icon: "📡",
    title: "ORO Monitors",
    body: "The system watches market conditions, liquidity signals, and relevant data streams continuously — 24 hours a day, every day.",
    detail: "Real-time signals · Price shifts · On-chain data",
  },
  {
    num: "03", icon: "⚡",
    title: "ORO Adapts",
    body: "When conditions shift, ORO adjusts positions within your defined parameters — automatically, without waiting for your input.",
    detail: "Dynamic rebalancing · Risk controls · Auto-adjustment",
  },
  {
    num: "04", icon: "✅",
    title: "ORO Executes",
    body: "Trades and positions are executed with precision — optimized routing, minimal slippage, and a clean log of every action taken.",
    detail: "Best-path routing · Slippage minimized · Full audit log",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="how-it-works" style={{ padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>How It Works</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,4.5vw,58px)", letterSpacing: -2, color: "#fff", lineHeight: 0.95,
          }}>
            Four steps.<br />
            <span className="gold">Zero noise.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 16 }}>
          {STEPS.map((s, i) => (
            <motion.div
              key={s.num}
              className="reveal card"
              style={{
                padding: "28px 24px",
                cursor: "pointer",
                border: active === i ? "1px solid rgba(255,122,26,0.35)" : "1px solid rgba(255,255,255,0.07)",
                background: active === i ? "rgba(255,122,26,0.05)" : "#111",
                transition: "all 0.3s ease",
                transitionDelay: `${i * 0.08}s`,
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              whileHover={{ y: -4 }}
            >
              {active === i && (
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: "linear-gradient(90deg, transparent, #FF7A1A, transparent)",
                }} />
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 48, color: "rgba(255,122,26,0.15)", lineHeight: 1 }}>{s.num}</span>
                <span style={{ fontSize: 24 }}>{s.icon}</span>
              </div>

              <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 10, letterSpacing: -0.5 }}>
                {s.title}
              </h3>
              <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 16 }}>
                {s.body}
              </p>
              <div style={{
                fontFamily: "DM Sans, sans-serif", fontSize: 11,
                color: active === i ? "#FF7A1A" : "rgba(255,255,255,0.2)",
                transition: "color 0.3s",
              }}>
                {s.detail}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
