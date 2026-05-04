"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCENARIOS = [
  {
    id: "decisions",
    label: "Too Many Decisions",
    manual: {
      title: "Overwhelmed by constant choices",
      prompts: [
        "Adjust position now or wait?",
        "Price dropped 3% — re-evaluate?",
        "New signal — act or ignore?",
        "Is this the right time to move?",
        "Should I lock in gains now?",
      ],
      note: "Every hour brings a new decision. No continuity. No system.",
    },
    oro: {
      title: "Strategy runs without your input",
      actions: [
        { label: "Strategy active", status: "green" },
        { label: "Monitoring price feeds", status: "green" },
        { label: "Threshold not triggered", status: "gray" },
        { label: "No action needed", status: "gray" },
      ],
      note: "ORO follows your strategy. You review — not react.",
    },
  },
  {
    id: "busy",
    label: "Busy Schedule",
    manual: {
      title: "Markets move while you're unavailable",
      prompts: [
        "You missed a 4-hour window",
        "Price moved — no action taken",
        "Opportunity passed at 2:30am",
        "Volatility spike — you were in a meeting",
        "Late response — slippage occurred",
      ],
      note: "Manual execution is limited by your availability.",
    },
    oro: {
      title: "Execution doesn't need you present",
      actions: [
        { label: "You: in a meeting", status: "gray" },
        { label: "ORO: monitoring live", status: "green" },
        { label: "Threshold reached — adjusting", status: "orange" },
        { label: "Position updated", status: "green" },
      ],
      note: "ORO acts when conditions are met — whether you're available or not.",
    },
  },
  {
    id: "flow",
    label: "Irregular Flow",
    manual: {
      title: "No consistent system or rhythm",
      prompts: [
        "Gut feeling — buy now?",
        "Not sure — check again later",
        "Different strategy this week",
        "Skipped review — got busy",
        "Re-evaluating everything again",
      ],
      note: "No structure means inconsistent results.",
    },
    oro: {
      title: "Consistent execution regardless of mood",
      actions: [
        { label: "Rules-based execution", status: "green" },
        { label: "No emotional override", status: "green" },
        { label: "Same logic every day", status: "green" },
        { label: "Strategy maintained", status: "green" },
      ],
      note: "ORO applies the same rules every time. No drift.",
    },
  },
];

const STATUS_DOT: Record<string, string> = {
  green: "#22c55e",
  orange: "#FF7A1A",
  gray: "rgba(255,255,255,0.2)",
};

function ManualVisual({ prompts }: { prompts: string[] }) {
  const [visible, setVisible] = useState<number[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    setVisible([]);
    let i = 0;
    timerRef.current = setInterval(() => {
      setVisible((prev) => {
        if (prev.length >= prompts.length) {
          clearInterval(timerRef.current);
          // reset after pause
          setTimeout(() => setVisible([]), 1400);
          return prev;
        }
        return [...prev, i++];
      });
    }, 600);
    return () => clearInterval(timerRef.current);
  }, [prompts]);

  return (
    <div style={{ position: "relative", height: 260, display: "flex", flexDirection: "column", justifyContent: "center", gap: 8 }}>
      {prompts.map((p, i) => (
        <AnimatePresence key={p}>
          {visible.includes(i) && (
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 14px", borderRadius: 10,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", flexShrink: 0 }} />
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{p}</span>
            </motion.div>
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}

function OroVisual({ actions }: { actions: { label: string; status: string }[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    const t = setInterval(() => {
      setActive((n) => (n + 1) % actions.length);
    }, 1000);
    return () => clearInterval(t);
  }, [actions]);

  return (
    <div style={{ position: "relative", height: 260, display: "flex", flexDirection: "column", justifyContent: "center", gap: 10 }}>
      {/* orbit center */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "rgba(255,122,26,0.1)", border: "1px solid rgba(255,122,26,0.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 14, color: "#FF7A1A",
          animation: "pulse-glow 2.5s ease-in-out infinite",
        }}>ORO</div>
      </div>
      {actions.map((a, i) => (
        <motion.div
          key={a.label}
          animate={{ opacity: active === i ? 1 : 0.35, scale: active === i ? 1 : 0.98 }}
          transition={{ duration: 0.35 }}
          style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 14px", borderRadius: 10,
            background: active === i ? "rgba(255,122,26,0.06)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${active === i ? "rgba(255,122,26,0.2)" : "rgba(255,255,255,0.05)"}`,
          }}
        >
          <div style={{
            width: 7, height: 7, borderRadius: "50%",
            background: STATUS_DOT[a.status],
            boxShadow: active === i && a.status !== "gray" ? `0 0 8px ${STATUS_DOT[a.status]}` : "none",
            flexShrink: 0,
          }} />
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: active === i ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.35)" }}>
            {a.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Scenarios() {
  const [scenario, setScenario] = useState(0);
  const [mode, setMode] = useState<"manual" | "oro">("manual");
  const current = SCENARIOS[scenario];

  // auto-cycle mode
  useEffect(() => {
    const t = setInterval(() => {
      setMode((m) => (m === "manual" ? "oro" : "manual"));
    }, 4000);
    return () => clearInterval(t);
  }, [scenario]);

  return (
    <section id="scenarios" style={{
      padding: "110px clamp(20px,5vw,80px)",
      background: "rgba(255,255,255,0.01)",
      borderTop: "1px solid rgba(255,255,255,0.05)",
      borderBottom: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* header */}
        <div className="reveal" style={{ marginBottom: 52 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Scenarios</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,4.5vw,58px)", letterSpacing: -2, color: "#fff", lineHeight: 0.95, marginBottom: 12,
          }}>
            See it in action.
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 16, color: "rgba(255,255,255,0.4)", maxWidth: 440 }}>
            From constant decisions to structured execution — see how ORO changes the experience.
          </p>
        </div>

        {/* scenario tabs */}
        <div className="reveal" style={{ display: "flex", gap: 10, marginBottom: 36, flexWrap: "wrap" }}>
          {SCENARIOS.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setScenario(i); setMode("manual"); }}
              style={{
                fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 13,
                padding: "9px 20px", borderRadius: 100, cursor: "pointer",
                border: `1px solid ${scenario === i ? "rgba(255,122,26,0.4)" : "rgba(255,255,255,0.08)"}`,
                background: scenario === i ? "rgba(255,122,26,0.08)" : "transparent",
                color: scenario === i ? "#FF7A1A" : "rgba(255,255,255,0.45)",
                transition: "all 0.25s",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* main comparison panel */}
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Manual panel */}
          <div
            onClick={() => setMode("manual")}
            style={{
              padding: "28px", borderRadius: 20, cursor: "pointer",
              background: mode === "manual" ? "#111" : "rgba(255,255,255,0.02)",
              border: `1px solid ${mode === "manual" ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)"}`,
              transition: "all 0.4s ease", opacity: mode === "oro" ? 0.5 : 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                padding: "5px 14px", borderRadius: 100,
                background: mode === "manual" ? "rgba(239,68,68,0.1)" : "transparent",
                border: `1px solid ${mode === "manual" ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12,
                color: mode === "manual" ? "#ef4444" : "rgba(255,255,255,0.3)",
                transition: "all 0.3s",
              }}>
                Manual
              </div>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                {current.manual.title}
              </span>
            </div>
            <ManualVisual key={scenario + "manual"} prompts={current.manual.prompts} />
            <p style={{
              fontFamily: "DM Sans, sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.3)", borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: 14, marginTop: 4,
            }}>
              {current.manual.note}
            </p>
          </div>

          {/* ORO panel */}
          <div
            onClick={() => setMode("oro")}
            style={{
              padding: "28px", borderRadius: 20, cursor: "pointer",
              background: mode === "oro" ? "rgba(255,122,26,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${mode === "oro" ? "rgba(255,122,26,0.25)" : "rgba(255,255,255,0.04)"}`,
              boxShadow: mode === "oro" ? "0 0 40px rgba(255,122,26,0.06)" : "none",
              transition: "all 0.4s ease", opacity: mode === "manual" ? 0.5 : 1,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                padding: "5px 14px", borderRadius: 100,
                background: mode === "oro" ? "rgba(255,122,26,0.12)" : "transparent",
                border: `1px solid ${mode === "oro" ? "rgba(255,122,26,0.4)" : "rgba(255,255,255,0.08)"}`,
                fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12,
                color: mode === "oro" ? "#FF7A1A" : "rgba(255,255,255,0.3)",
                transition: "all 0.3s",
              }}>
                With ORO
              </div>
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                {current.oro.title}
              </span>
            </div>
            <OroVisual key={scenario + "oro"} actions={current.oro.actions} />
            <p style={{
              fontFamily: "DM Sans, sans-serif", fontSize: 12,
              color: "rgba(255,255,255,0.45)", borderTop: "1px solid rgba(255,122,26,0.1)",
              paddingTop: 14, marginTop: 4,
            }}>
              {current.oro.note}
            </p>
          </div>
        </div>

        {/* toggle hint */}
        <div className="reveal" style={{ textAlign: "center", marginTop: 18 }}>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            Click a panel to focus · Auto-cycles every 4s
          </span>
        </div>
      </div>
    </section>
  );
}
