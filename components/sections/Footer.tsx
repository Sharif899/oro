export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.05)",
      padding: "48px clamp(20px,5vw,80px) 32px",
      background: "#0a0a0a",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32, marginBottom: 40 }}>
          {/* brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, background: "#FF7A1A",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "Syne, sans-serif", fontWeight: 900, fontSize: 9, color: "#fff",
              }}>ORO</div>
              <span style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 17, color: "#fff" }}>oro</span>
            </div>
            <p style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.3)", maxWidth: 260, lineHeight: 1.7 }}>
              AI-powered execution layer for capital. Less decisions. Better execution.
            </p>
          </div>

          {/* links */}
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { heading: "Product", items: [["How It Works", "#how-it-works"], ["Scenarios", "#scenarios"], ["Simulation", "#simulation"], ["FAQ", "#faq"]] },
              { heading: "Company", items: [["About", "https://www.getoro.xyz"], ["Blog", "https://www.getoro.xyz/blog"], ["Privacy", "https://www.getoro.xyz/privacy-policy"], ["Terms", "https://www.getoro.xyz/terms-of-service"]] },
            ].map(({ heading, items }) => (
              <div key={heading}>
                <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: 14 }}>
                  {heading}
                </div>
                {items.map(([label, href]) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      style={{ fontFamily: "DM Sans, sans-serif", fontSize: 13, color: "rgba(255,255,255,0.35)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#fff")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.35)")}
                    >{label}</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
            © 2026 Midcentury Labs Inc. All rights reserved.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e" }} />
            <span style={{ fontFamily: "DM Sans, sans-serif", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
