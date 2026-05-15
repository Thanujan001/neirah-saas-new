import React from "react";
import { EcosystemVisual } from "./EcosystemVisual.jsx";
// ───────────────────────────────────── Wordmark
function Wordmark({ size = 22 }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-display)", fontSize: size, letterSpacing: "-0.02em" }}>
      <NeirahMark size={size + 4} />
      <span style={{ fontStyle: "italic", color: "var(--fg)" }}>Neirah</span>
    </div>
  );
}

function NeirahMark({ size = 26 }) {
  // A small geometric mark — overlapping arcs forming an "N" stitched through a circle.
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="nmark-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--accent)"/>
          <stop offset="100%" stopColor="var(--fg)"/>
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="14" stroke="url(#nmark-g)" strokeWidth="1.6"/>
      <path d="M10 22 L10 10 L22 22 L22 10" stroke="url(#nmark-g)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  );
}

// ───────────────────────────────────── Nav
function Nav({ onCta, dark, setDark }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    ["AI Match", "#ai"],
    ["Industries", "#industries"],
    ["Ecosystem", "#ecosystem"],
    ["Modules", "#modules"],
    ["Demo", "#demo"],
    ["Pricing", "#pricing"],
  ];

  return (
    <header className="nav-wrap" data-scrolled={scrolled ? "1" : "0"}>
      <div className="container nav">
        <a href="#top" className="nav-brand"><Wordmark /></a>
        <nav className="nav-links">
          {links.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
        <div className="nav-cta">
          <button className="theme-btn" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 13.5A8.5 8.5 0 1110.5 3 7 7 0 0021 13.5z"/></svg>
            )}
          </button>
          <a href="#demo" className="btn btn-ghost btn-sm">Sign in</a>
          <button className="btn btn-primary btn-sm" onClick={onCta}>Request demo</button>
        </div>
      </div>
      <style>{`
        .nav-wrap{position:sticky;top:0;z-index:50;transition:background 200ms ease, border-color 200ms ease, backdrop-filter 200ms ease}
        .nav-wrap[data-scrolled="1"]{background:color-mix(in oklch, var(--bg) 78%, transparent);backdrop-filter:blur(18px) saturate(140%);-webkit-backdrop-filter:blur(18px) saturate(140%);border-bottom:1px solid var(--line)}
        .nav{display:flex;align-items:center;justify-content:space-between;height:64px;gap:24px}
        .nav-brand{display:inline-flex}
        .nav-links{display:flex;gap:4px}
        .nav-links a{padding:8px 12px;border-radius:8px;font-size:13.5px;color:var(--fg-2);transition:color 120ms,background 120ms}
        .nav-links a:hover{color:var(--fg);background:var(--surface-2)}
        .nav-cta{display:flex;align-items:center;gap:8px}
        .theme-btn{width:36px;height:36px;border-radius:999px;background:transparent;border:1px solid var(--line-2);color:var(--fg-2);display:inline-flex;align-items:center;justify-content:center;transition:color 120ms,background 120ms,border-color 120ms}
        .theme-btn:hover{color:var(--fg);background:var(--surface-2);border-color:var(--fg-4)}
        @media (max-width: 860px){ .nav-links{display:none} }
        @media (max-width: 520px){ .nav-cta .btn-ghost{display:none} }
      `}</style>
    </header>
  );
}

// ───────────────────────────────────── Hero
function Hero({ tagline, headline, onAsk, ecosystem }) {
  const [val, setVal] = React.useState("");
  const chips = ["Restaurant", "Pharmacy", "Textile", "Retail", "Enterprise"];

  function submit(v) {
    onAsk(v || val);
    setVal("");
  }

  return (
    <section id="top" className="hero">
      <div className="ambient" aria-hidden="true"></div>
      <div className="hero-grid" aria-hidden="true"></div>
      <div className="container hero-inner">
        <div className="hero-copy">
          <div className="pill accent fade-up"><span style={{width:6,height:6,borderRadius:99,background:"var(--accent)"}}></span> Neirah SaaS Ecosystem · v4</div>
          <h1 className="h-display fade-up d1">
            {headline?.includes("|") ? (
              <>
                {headline.split("|")[0]}<em>{headline.split("|")[1]}</em>{headline.split("|")[2] || ""}
              </>
            ) : (headline || <>The operating system for <em>real businesses.</em></>)}
          </h1>
          <p className="lead fade-up d2">{tagline}</p>

          <form className="hero-ai fade-up d3" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div className="hero-ai-pill">
              <span className="hero-ai-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l1.6 4.4L18 8l-4.4 1.6L12 14l-1.6-4.4L6 8l4.4-1.6L12 2z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/></svg>
              </span>
              <input
                aria-label="Describe your business"
                value={val}
                onChange={(e) => setVal(e.target.value)}
                placeholder="Tell us your business type — e.g. ‘chain of pharmacies in 3 cities’"
              />
              <button className="btn btn-accent btn-sm" type="submit">Get recommendation →</button>
            </div>
            <div className="hero-chips">
              <span className="hero-chips-label">Try:</span>
              {chips.map((c) => (
                <button type="button" key={c} className="chip" onClick={() => submit(c)}>{c}</button>
              ))}
            </div>
          </form>

          <div className="hero-actions fade-up d4">
            <a href="#demo" className="btn btn-primary btn-lg">Request demo</a>
            <a href="#ecosystem" className="btn btn-ghost btn-lg">See the ecosystem ↘</a>
          </div>

          <div className="hero-strip fade-up d4">
            <div><div className="hero-strip-num">11</div><div className="hero-strip-lbl">modules</div></div>
            <div className="hero-strip-div"></div>
            <div><div className="hero-strip-num">8</div><div className="hero-strip-lbl">industries</div></div>
            <div className="hero-strip-div"></div>
            <div><div className="hero-strip-num">1</div><div className="hero-strip-lbl">operational graph</div></div>
            <div className="hero-strip-div"></div>
            <div><div className="hero-strip-num">∞</div><div className="hero-strip-lbl">workflows</div></div>
          </div>
        </div>

        <div className="hero-visual">
          <EcosystemVisual variant={ecosystem} />
        </div>
      </div>

      <style>{`
        .hero{padding:48px 0 64px;position:relative;overflow:hidden}
        .hero-grid{position:absolute;inset:0;z-index:0;opacity:.5}
        .hero-grid{background-image:linear-gradient(to right, var(--line) 1px, transparent 1px),linear-gradient(to bottom, var(--line) 1px, transparent 1px);background-size:64px 64px;mask-image:radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%);-webkit-mask-image:radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)}
        .hero-inner{position:relative;z-index:1;display:grid;grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);gap:48px;align-items:center;min-height:640px}
        .hero-copy{display:flex;flex-direction:column;gap:22px;max-width:600px}
        .hero-ai-pill{display:flex;align-items:center;gap:10px;padding:8px 8px 8px 16px;background:var(--surface);border:1px solid var(--line);border-radius:999px;box-shadow:var(--shadow-md)}
        .hero-ai-icon{color:var(--accent);display:inline-flex}
        .hero-ai-pill input{flex:1;min-width:0;border:0;outline:0;background:transparent;font-size:15px;padding:8px 4px;color:var(--fg)}
        .hero-ai-pill input::placeholder{color:var(--fg-4)}
        .hero-chips{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:12px}
        .hero-chips-label{font-family:var(--font-mono);font-size:11.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--fg-4)}
        .chip{height:30px;padding:0 12px;border-radius:999px;border:1px solid var(--line-2);background:var(--surface);color:var(--fg-2);font-size:12.5px;transition:all 120ms}
        .chip:hover{border-color:var(--accent);color:var(--fg);background:var(--accent-soft)}
        .hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:8px}
        .hero-strip{display:flex;align-items:center;gap:18px;margin-top:24px;padding-top:24px;border-top:1px dashed var(--line-2)}
        .hero-strip-num{font-family:var(--font-display);font-size:28px;line-height:1;letter-spacing:-.02em}
        .hero-strip-lbl{font-family:var(--font-mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.1em;color:var(--fg-3);margin-top:4px}
        .hero-strip-div{width:1px;height:24px;background:var(--line)}
        .hero-visual{position:relative;height:560px}
        @media (max-width: 980px){ .hero-inner{grid-template-columns:1fr;gap:32px} .hero-visual{height:440px} }
      `}</style>
    </section>
  );
}



export { Nav, Hero, Wordmark, NeirahMark };
