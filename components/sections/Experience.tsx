"use client";
import { useEffect, useRef, useState } from "react";

function SparkLine({ color = "#FF7A1A", positive = true }: { color?: string; positive?: boolean }) {
  const pts = positive
    ? [10, 18, 14, 22, 19, 27, 24, 32, 28, 38, 34, 44]
    : [44, 38, 42, 36, 40, 34, 38, 30, 35, 28, 32, 26];
  const W = 80, H = 48;
  const min = Math.min(...pts), max = Math.max(...pts);
  const toX = (i: number) => (i / (pts.length - 1)) * W;
  const toY = (v: number) => H - ((v - min) / (max - min)) * H;
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"} ${toX(i)} ${toY(v)}`).join(" ");
  const area = `${d} L ${W} ${H} L 0 ${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="80" height="48">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${color.replace("#", "")})`} />
      <path d={d} stroke={color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function LiveDot() {
  return (
    <div style={{ position: "relative", width: 8, height: 8 }}>
      <div style={{ position: "absolute", inset: -3, borderRadius: "50%", border: "1px solid rgba(34,197,94,0.4)", animation: "pulse-glow 2s infinite" }} />
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
    </div>
  );
}

export default function Experience() {
  const [tick, setTick] = useState(0);
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!vis) return;
    const t = setInterval(() => setTick((n) => n + 1), 2000);
    return () => clearInterval(t);
  }, [vis]);

  const baseValue = 12480;
  const currentValue = baseValue + tick * 7 + Math.round(Math.sin(tick) * 3);
  const growth = (((currentValue - 10000) / 10000) * 100).toFixed(2);

  const positions = [
    { name: "ETH / USDC", alloc: 52, status: "Optimized", change: "+1.4%", positive: true },
    { name: "BTC Hedge", alloc: 28, status: "Monitoring", change: "-0.3%", positive: false },
    { name: "Stable Yield", alloc: 20, status: "Active", change: "+0.8%", positive: true },
  ];

  return (
    <section style={{ padding: "110px clamp(20px,5vw,80px)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="reveal" style={{ marginBottom: 52 }}>
          <div className="section-label" style={{ marginBottom: 16 }}>Product Experience</div>
          <h2 style={{
            fontFamily: "Syne, sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,4.5vw,58px)", letterSpacing: -2, color: "#fff", lineHeight: 0.95,
          }}>
            What it feels like<br />
            <span className="gold">inside ORO.</span>
          </h2>
        </div>

        <div ref={ref} className="reveal" style={{
          background: "#111",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 24, overflow: "hidden",
        }}>
          {/* dashboard topbar */}
          <div style={{
            padding: "16px 24px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#0D0D0D",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 26, height: 26, borderRadius: 7, background: "#FF7A1A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 8, color: "#fff",
              }}>ORO</div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13, color: "#fff" }}>Portfolio Dashboard</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <LiveDot />
              <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Live · Executing</span>
            </div>
          </div>

          {/* main dashboard grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {[
              {
                label: "Portfolio Value",
                value: `$${currentValue.toLocaleString()}`,
                sub: `+${growth}% since start`,
                color: "#22c55e",
                chart: <SparkLine color="#22c55e" positive />,
              },
              {
                label: "Active Strategy",
                value: "Structured",
                sub: "Rules-based execution",
                color: "#FF7A1A",
                chart: null,
              },
              {
                label: "Last Action",
                value: "Rebalanced",
                sub: `${tick % 3 === 0 ? "Just now" : tick % 3 === 1 ? "2 min ago" : "5 min ago"}`,
                color: "#fff",
                chart: null,
              },
            ].map((m, i) => (
              <div key={m.label} style={{
                padding: "22px 24px",
                borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>{m.label}</div>
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 24, color: m.color, letterSpacing: -1 }}>{m.value}</div>
                    <div style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 3 }}>{m.sub}</div>
                  </div>
                  {m.chart}
                </div>
              </div>
            ))}
          </div>

          {/* positions table */}
          <div style={{ padding: "20px 24px" }}>
            <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
              Active Positions
            </div>
            {positions.map((p, i) => (
              <div key={p.name} style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: i < positions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 600, fontSize: 14, color: "#fff", width: 120 }}>{p.name}</div>
                  {/* alloc bar */}
                  <div style={{ flex: 1, maxWidth: 200, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${p.alloc}%`, background: "#FF7A1A", borderRadius: 2, opacity: 0.7 }} />
                  </div>
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", width: 36 }}>{p.alloc}%</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <span style={{
                    padding: "3px 10px", borderRadius: 100, fontSize: 11,
                    fontFamily: "Syne, sans-serif", fontWeight: 600,
                    background: "rgba(255,122,26,0.08)", border: "1px solid rgba(255,122,26,0.15)",
                    color: "#FF7A1A",
                  }}>{p.status}</span>
                  <span style={{
                    fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 13,
                    color: p.positive ? "#22c55e" : "#ef4444",
                    width: 48, textAlign: "right",
                  }}>{p.change}</span>
                </div>
              </div>
            ))}
          </div>

          {/* bottom status bar */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "12px 24px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#0D0D0D",
          }}>
            <div style={{ display: "flex", gap: 20 }}>
              {["Monitoring", "Adapting", "Executing"].map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{
                    width: 6, height: 6, borderRadius: "50%",
                    background: tick % 3 === i ? "#FF7A1A" : "#22c55e",
                    boxShadow: tick % 3 === i ? "0 0 6px #FF7A1A" : "0 0 4px #22c55e",
                    transition: "all 0.5s",
                  }} />
                  <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{s}</span>
                </div>
              ))}
            </div>
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
              Demo interface · Not real portfolio data
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
