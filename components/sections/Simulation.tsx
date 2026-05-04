"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Simple compounding simulation: ORO adds 0.8%/week structured efficiency */
function simulate(principal: number) {
  const weeks = 12;
  const baseWeeklyRate = 0.004; // 0.4% base market movement
  const oroBoost = 0.008;       // 0.8% from structured execution efficiency
  let manualVal = principal;
  let oroVal = principal;
  const data: { week: number; manual: number; oro: number }[] = [{ week: 0, manual: principal, oro: principal }];
  for (let w = 1; w <= weeks; w++) {
    manualVal *= 1 + baseWeeklyRate * (0.7 + Math.random() * 0.6);
    oroVal *= 1 + baseWeeklyRate + oroBoost * (0.85 + Math.random() * 0.3);
    data.push({ week: w, manual: Math.round(manualVal), oro: Math.round(oroVal) });
  }
  return data;
}

function MiniChart({ data, principal }: { data: ReturnType<typeof simulate>; principal: number }) {
  const maxVal = Math.max(...data.map((d) => d.oro));
  const minVal = principal * 0.98;
  const range = maxVal - minVal;
  const W = 100, H = 60;

  const toX = (i: number) => (i / (data.length - 1)) * W;
  const toY = (v: number) => H - ((v - minVal) / range) * H;

  const oroPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(d.oro)}`).join(" ");
  const manPath = data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(d.manual)}`).join(" ");
  const oroArea = `${oroPath} L ${toX(data.length - 1)} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="oroFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF7A1A" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={oroArea} fill="url(#oroFill)" />
      <path d={manPath} stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" fill="none" strokeDasharray="2 2" />
      <path d={oroPath} stroke="#FF7A1A" strokeWidth="1.5" fill="none" />
      <circle cx={toX(data.length - 1)} cy={toY(data[data.length - 1].oro)} r="2" fill="#FF7A1A" />
    </svg>
  );
}

function AnimatedNumber({ value, prefix = "$" }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef(value);
  useEffect(() => {
    const from = ref.current;
    const to = value;
    const dur = 700;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(from + (to - from) * e));
      if (p < 1) requestAnimationFrame(step);
      else ref.current = to;
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{prefix}{display.toLocaleString()}</span>;
}

export default function Simulation() {
  const [amount, setAmount] = useState(1000);
  const [inputVal, setInputVal] = useState("1000");
  const [data, setData] = useState(() => simulate(1000));

  useEffect(() => {
    setData(simulate(amount));
  }, [amount]);

  const final = data[data.length - 1];
  const oroGrowth = (((final.oro - amount) / amount) * 100).toFixed(1);
  const manGrowth = (((final.manual - amount) / amount) * 100).toFixed(1);
  const difference = final.oro - final.manual;

  const handleAmount = (v: string) => {
    setInputVal(v);
    const n = parseFloat(v.replace(/[^0-9.]/g, ""));
    if (!isNaN(n) && n >= 100) setAmount(n);
  };

  return (
    <section id="simulation" style={{ padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Simulation</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,4.5vw,58px)", letterSpacing: -2, color: "#fff", lineHeight: 0.95, marginBottom: 12,
          }}>
            Watch your capital<br />
            <span className="gold">work with structure.</span>
          </h2>
          <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 15, color: "rgba(255,255,255,0.4)", maxWidth: 460 }}>
            Enter an amount. See a simulated 12-week outcome comparing manual execution vs ORO's structured approach.{" "}
            <span style={{ color: "rgba(255,255,255,0.25)" }}>Illustrative only — not financial advice.</span>
          </p>
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "340px 1fr", gap: 20, alignItems: "start" }}>
          {/* Input panel */}
          <div className="card" style={{ padding: "28px" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
              Starting Capital
            </div>

            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 16, marginBottom: 20,
            }}>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 32, color: "#FF7A1A" }}>$</span>
              <input
                type="text"
                value={inputVal}
                onChange={(e) => handleAmount(e.target.value)}
                style={{
                  background: "transparent", border: "none", outline: "none",
                  fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 40,
                  color: "#fff", width: "100%", letterSpacing: -2,
                }}
              />
            </div>

            {/* quick select */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {[500, 1000, 5000, 10000].map((v) => (
                <button key={v} onClick={() => { setAmount(v); setInputVal(v.toString()); }} style={{
                  padding: "7px 14px", borderRadius: 100, cursor: "pointer",
                  background: amount === v ? "rgba(255,122,26,0.12)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${amount === v ? "rgba(255,122,26,0.35)" : "rgba(255,255,255,0.06)"}`,
                  fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12,
                  color: amount === v ? "#FF7A1A" : "rgba(255,255,255,0.35)",
                  transition: "all 0.2s",
                }}>
                  ${v >= 1000 ? `${v / 1000}k` : v}
                </button>
              ))}
            </div>

            {/* range */}
            <input type="range" min="100" max="50000" step="100" value={amount}
              onChange={(e) => { const v = parseInt(e.target.value); setAmount(v); setInputVal(v.toString()); }}
              style={{ width: "100%", accentColor: "#FF7A1A", cursor: "pointer", marginBottom: 20 }}
            />

            {/* ORO assumptions */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 18 }}>
              <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
                Simulation Parameters
              </div>
              {[
                ["Base return", "0.4% / week"],
                ["ORO efficiency", "+0.8% / week"],
                ["Timeframe", "12 weeks"],
                ["Rebalances", "Automatic"],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>{k}</span>
                  <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Output panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* result cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              {[
                { label: "With ORO", val: final.oro, growth: oroGrowth, highlight: true },
                { label: "Manual", val: final.manual, growth: manGrowth, highlight: false },
                { label: "ORO Advantage", val: difference, growth: null, highlight: false, prefix: "+$" },
              ].map((c) => (
                <div key={c.label} className="card" style={{
                  padding: "22px 20px",
                  border: c.highlight ? "1px solid rgba(255,122,26,0.25)" : "1px solid rgba(255,255,255,0.07)",
                  background: c.highlight ? "rgba(255,122,26,0.05)" : "#111",
                  boxShadow: c.highlight ? "0 0 30px rgba(255,122,26,0.06)" : "none",
                }}>
                  <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 8 }}>{c.label}</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 28, color: c.highlight ? "#FF7A1A" : "#fff", letterSpacing: -1, marginBottom: 4 }}>
                    <AnimatedNumber value={c.val} prefix={c.prefix ?? "$"} />
                  </div>
                  {c.growth !== null && (
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#22c55e" }}>
                      +{c.growth}%
                    </div>
                  )}
                  {c.growth === null && (
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                      over 12 weeks
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* chart */}
            <div className="card" style={{ padding: "24px", height: 200, position: "relative" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 12, color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  12-Week Projection
                </div>
                <div style={{ display: "flex", gap: 16 }}>
                  {[{ color: "#FF7A1A", label: "With ORO" }, { color: "rgba(255,255,255,0.2)", label: "Manual", dashed: true }].map((l) => (
                    <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                      <div style={{ width: 16, height: 2, background: l.color, borderRadius: 1 }} />
                      <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 120 }}>
                <MiniChart data={data} principal={amount} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                {["W1", "W3", "W6", "W9", "W12"].map((w) => (
                  <span key={w} style={{ fontFamily: "DM Sans, sans-serif", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>{w}</span>
                ))}
              </div>
            </div>

            {/* disclaimer */}
            <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
              Simulated structured execution outcome · Not financial advice · Results vary based on market conditions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
