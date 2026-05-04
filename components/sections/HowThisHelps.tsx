"use client";
import { motion } from "framer-motion";

const HELPS = [
  {
    icon: "🕐",
    title: "You don't need to constantly check",
    body: "ORO monitors conditions in real time. You don't need to refresh price feeds or stay glued to charts. The system keeps track so you don't have to.",
    tag: "Always On",
  },
  {
    icon: "🧘",
    title: "Decisions don't rely on timing everything manually",
    body: "ORO applies rule-based logic. If a condition you defined is met, the system acts. You're not racing against a price movement at 3am.",
    tag: "Rules-Based",
  },
  {
    icon: "💤",
    title: "Execution continues even when you're inactive",
    body: "Positions don't stall because you're in a meeting, asleep, or traveling. ORO executes within your defined parameters whenever conditions are met.",
    tag: "Always Executing",
  },
  {
    icon: "🏗️",
    title: "Structure outlasts impulse",
    body: "A consistent system beats reactive decisions over time. ORO keeps your strategy stable — without the noise of daily market psychology affecting execution.",
    tag: "Consistent",
  },
];

export default function HowThisHelps() {
  return (
    <section style={{
      padding: "110px clamp(20px,5vw,80px)",
      background: "rgba(255,255,255,0.01)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 60 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>How This Helps</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,4.5vw,58px)", letterSpacing: -2, color: "#fff", lineHeight: 0.95,
          }}>
            Real situations.<br />
            <span className="gold">Practical answers.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
          {HELPS.map((h, i) => (
            <motion.div
              key={h.title}
              className="reveal card"
              style={{ padding: "28px 24px", transitionDelay: `${i * 0.1}s` }}
              whileHover={{ y: -3, borderColor: "rgba(255,122,26,0.2)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "rgba(255,122,26,0.08)", border: "1px solid rgba(255,122,26,0.18)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
                }}>
                  {h.icon}
                </div>
                <div style={{
                  padding: "4px 10px", borderRadius: 100,
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10,
                  color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase",
                }}>
                  {h.tag}
                </div>
              </div>
              <h3 style={{
                fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 17,
                color: "#fff", lineHeight: 1.3, marginBottom: 10, letterSpacing: -0.3,
              }}>
                {h.title}
              </h3>
              <p style={{
                fontFamily: "DM Sans, sans-serif", fontSize: 13,
                color: "rgba(255,255,255,0.4)", lineHeight: 1.75,
              }}>
                {h.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
