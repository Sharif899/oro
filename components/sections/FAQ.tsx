"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "What does ORO actually do?",
    a: "ORO is an execution layer for capital. You define a strategy — your goals, risk tolerance, position rules — and ORO applies it continuously. It monitors market conditions, adjusts positions when defined thresholds are met, and executes trades. You're not removed from decision-making; you make the strategic decisions once, and ORO handles the operational execution.",
  },
  {
    q: "Do I still make decisions?",
    a: "Yes — the important ones. You decide your strategy, your risk parameters, and when to change course. What ORO removes is the reactive decision-making: the constant checking, the timing pressure, the 'should I act now?' loop. You set the framework. ORO operates within it.",
  },
  {
    q: "Is this automated or structured execution?",
    a: "Structured execution. The distinction matters: automated can mean blind. ORO executes within the rules you've defined — it doesn't deviate from your parameters. Every action is rule-based and auditable. You always know what ORO is doing and why.",
  },
  {
    q: "Who is this useful for?",
    a: "Anyone who wants their capital to follow a consistent system rather than reactive decisions. That includes people with busy schedules who can't monitor markets constantly, people who find themselves making emotional or inconsistent decisions, and anyone who wants to apply structure to a long-term strategy without needing to manage it daily.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{
      padding: "110px clamp(20px,5vw,80px)",
      background: "rgba(255,255,255,0.01)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>FAQ</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,4.5vw,58px)", letterSpacing: -2, color: "#fff", lineHeight: 0.95,
          }}>
            Real questions.<br />
            <span className="gold">Clear answers.</span>
          </h2>
        </div>

        <div className="reveal" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              borderRadius: 16,
              border: `1px solid ${open === i ? "rgba(255,122,26,0.22)" : "rgba(255,255,255,0.06)"}`,
              background: open === i ? "rgba(255,122,26,0.03)" : "#111",
              overflow: "hidden",
              transition: "all 0.3s ease",
            }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "20px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
                }}
              >
                <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: open === i ? "#fff" : "rgba(255,255,255,0.7)", lineHeight: 1.4 }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ color: open === i ? "#FF7A1A" : "rgba(255,255,255,0.25)", fontSize: 22, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div style={{ padding: "0 24px 22px" }}>
                      <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="reveal"
          style={{ marginTop: 52, textAlign: "center", padding: "48px 40px", borderRadius: 24, background: "#111", border: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%, rgba(255,122,26,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />
          <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 32, color: "#fff", marginBottom: 12, letterSpacing: -1 }}>
            Ready to run a system?
          </h3>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.4)", marginBottom: 28, maxWidth: 360, margin: "0 auto 28px" }}>
            Join the waitlist. Early access is limited.
          </p>
          <a href="https://app.getoro.xyz" target="_blank" rel="noreferrer" className="btn-primary">
            Get Early Access ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
