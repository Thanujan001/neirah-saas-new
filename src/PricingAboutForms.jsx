import React from "react";
import { ModuleIcon } from "./data.jsx";
import { Wordmark } from "./NavHero.jsx";
// ───────────────────────────────────── Pricing
function Pricing() {
  const tiers = [
    {
      name: "Starter",
      tag: "Single store",
      price: "$49",
      sub: "/store · month",
      desc: "Everything to run one location, all on the same graph.",
      features: ["POS + Inventory + Reports", "1 till · unlimited products", "Email support · 24h", "Daily backups"],
      cta: "Start free trial",
      accent: false,
    },
    {
      name: "Business",
      tag: "Multi-branch",
      price: "$249",
      sub: "/branch · month",
      desc: "For growing operators wanting CRM, HR and supplier flows.",
      features: ["Everything in Starter", "CRM + HR & Payroll", "Branch consolidation", "Priority support · 4h"],
      cta: "Talk to sales",
      accent: true,
      badge: "Most chosen",
    },
    {
      name: "Enterprise",
      tag: "Group-wide",
      price: "Custom",
      sub: "Volume pricing",
      desc: "ERP, multi-entity, audits, SSO, dedicated success.",
      features: ["ERP · multi-entity", "SSO + audit log + DLP", "Dedicated CSM + SLAs", "Private cloud option"],
      cta: "Contact us",
      accent: false,
    },
  ];

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot"></span> 07 · Pricing</div>
          <h2 className="h-section">Three shapes, <em>one platform.</em></h2>
          <p className="lead">Pay for what you light up. Upgrade or expand at any time — modules carry their data forward.</p>
        </div>

        <div className="pr-grid reveal">
          {tiers.map((t, i) => (
            <div key={t.name} className={`pr-card ${t.accent ? "accent" : ""}`}>
              {t.badge && <div className="pr-badge">{t.badge}</div>}
              <div className="pr-hd">
                <div className="eyebrow"><span className="dot"></span> {t.tag}</div>
                <div className="pr-name">{t.name}</div>
              </div>
              <div className="pr-price-wrap">
                <span className="pr-price">{t.price}</span>
                <span className="pr-sub">{t.sub}</span>
              </div>
              <p className="pr-desc">{t.desc}</p>
              <div className="pr-feats">
                {t.features.map((f) => (
                  <div key={f} className="pr-feat">
                    <span className="pr-check">✓</span>{f}
                  </div>
                ))}
              </div>
              <a href="#demo" className={`btn ${t.accent ? "btn-accent" : "btn-ghost"}`}>{t.cta} →</a>
            </div>
          ))}
        </div>

        <div className="pr-foot reveal">
          <div className="pr-foot-l">
            <div style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:24,lineHeight:1}}>Need a single module?</div>
            <div style={{color:"var(--fg-3)",fontSize:13,marginTop:4}}>Pharmacy OS, Restaurant OS, Textile and Jewellery POS are also sold standalone.</div>
          </div>
          <a href="#demo" className="btn btn-primary btn-sm">Get a custom quote →</a>
        </div>
      </div>
      <style>{`
        .pr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;align-items:stretch}
        .pr-card{position:relative;padding:28px;background:var(--surface);border:1px solid var(--line);border-radius:20px;display:flex;flex-direction:column;gap:14px;transition:transform 200ms cubic-bezier(.2,.7,.2,1),box-shadow 200ms}
        .pr-card:hover{transform:translateY(-3px);box-shadow:var(--shadow-lg)}
        .pr-card.accent{background:linear-gradient(180deg, color-mix(in oklch, var(--accent-soft) 60%, var(--surface)), var(--surface));border-color:color-mix(in oklch, var(--accent) 32%, var(--line));box-shadow:var(--shadow-glow)}
        .pr-badge{position:absolute;top:-12px;left:24px;background:var(--accent);color:var(--accent-fg);padding:5px 11px;border-radius:99px;font-size:11px;font-family:var(--font-mono);letter-spacing:.08em;text-transform:uppercase}
        .pr-name{font-family:var(--font-display);font-style:italic;font-size:36px;line-height:1;letter-spacing:-.02em;margin-top:6px}
        .pr-price-wrap{display:flex;align-items:baseline;gap:6px;padding-bottom:14px;border-bottom:1px dashed var(--line)}
        .pr-price{font-family:var(--font-display);font-size:44px;line-height:1;letter-spacing:-.02em}
        .pr-sub{font-family:var(--font-mono);font-size:11px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.06em}
        .pr-desc{font-size:13.5px;color:var(--fg-2);line-height:1.55;margin:0}
        .pr-feats{display:flex;flex-direction:column;gap:8px;flex:1}
        .pr-feat{display:flex;align-items:center;gap:10px;font-size:13px;color:var(--fg-2)}
        .pr-check{width:18px;height:18px;border-radius:6px;background:var(--accent-soft);color:var(--accent);font-size:11px;display:inline-flex;align-items:center;justify-content:center;flex:none}

        .pr-foot{margin-top:20px;display:flex;justify-content:space-between;align-items:center;gap:18px;padding:20px 24px;background:var(--surface);border:1px solid var(--line);border-radius:18px;flex-wrap:wrap}
        @media (max-width: 980px){ .pr-grid{grid-template-columns:1fr} }
      `}</style>
    </section>
  );
}

// ───────────────────────────────────── About
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="ab-grid">
          <div className="ab-l reveal">
            <div className="eyebrow"><span className="dot"></span> 08 · About</div>
            <h2 className="h-section">We build the back-office <em>most teams shouldn't have to.</em></h2>
            <p className="lead">Neirah is one operational platform for the businesses that actually keep economies running — clinics, kitchens, mills, ateliers, salons, distributors and the multi-vertical groups behind them. We're AI-guided on the way in (so you pick the right stack), open and composable on the way through (so your data is yours).</p>
          </div>

          <div className="ab-r reveal">
            <div className="ab-r-grid">
              {[
                ["What we ship", "11 production-grade modules across POS, ERP, HR, CRM, Inventory and 5 industry OSes."],
                ["Who we serve", "From a single-store café to a 40-branch retail group; clinics to logistics networks."],
                ["How we help", "Less reconciliation. Less swivel-chair. Operating leverage where it matters: cash, cost and people."],
                ["Why AI-guided?", "Picking software is the hardest part. Our match engine compresses it into a conversation."],
              ].map(([k,v]) => (
                <div key={k} className="ab-cell">
                  <div className="eyebrow"><span className="dot"></span> {k}</div>
                  <div className="ab-v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .ab-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start}
        .ab-r-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .ab-cell{padding:22px;background:var(--surface);border:1px solid var(--line);border-radius:16px}
        .ab-v{font-size:14px;color:var(--fg-2);line-height:1.55;margin-top:8px}
        @media (max-width: 980px){ .ab-grid{grid-template-columns:1fr;gap:24px} }
      `}</style>
    </section>
  );
}

// ───────────────────────────────────── Forms
function Forms() {
  const [demoState, setDemoState] = React.useState({ name: "", email: "", phone: "", biz: "Restaurant", msg: "" });
  const [demoErr, setDemoErr] = React.useState({});
  const [demoOk, setDemoOk] = React.useState(false);

  const [contactState, setContactState] = React.useState({ name: "", email: "", msg: "" });
  const [contactErr, setContactErr] = React.useState({});
  const [contactOk, setContactOk] = React.useState(false);

  function validateDemo() {
    const errs = {};
    if (!demoState.name.trim()) errs.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(demoState.email)) errs.email = "Enter a valid email";
    if (!/^[\d\s+()-]{7,}$/.test(demoState.phone)) errs.phone = "Enter a valid phone";
    setDemoErr(errs);
    return Object.keys(errs).length === 0;
  }
  function submitDemo(e) {
    e.preventDefault();
    if (!validateDemo()) return;
    setDemoOk(true);
  }
  function submitContact(e) {
    e.preventDefault();
    const errs = {};
    if (!contactState.name.trim()) errs.name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(contactState.email)) errs.email = "Enter a valid email";
    if (!contactState.msg.trim()) errs.msg = "Required";
    setContactErr(errs);
    if (Object.keys(errs).length) return;
    setContactOk(true);
  }

  const bizOptions = ["Restaurant", "Pharmacy", "Textile", "Retail", "Enterprise", "Jewellery", "Salon & Spa", "Logistics", "Other"];

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot"></span> 09 · Get started</div>
          <h2 className="h-section">Two minutes. <em>One operator, one demo.</em></h2>
          <p className="lead">Tell us your shape and we'll spin up a workspace pre-loaded with your industry's modules. Or just say hi.</p>
        </div>

        <div className="fm-grid reveal">
          {/* Demo request */}
          <div className="fm-card fm-demo">
            <div className="fm-hd">
              <div className="eyebrow"><span className="dot"></span> Demo request</div>
              <div className="fm-title">Request a tailored demo</div>
              <div className="fm-sub">We'll set up a sandbox in 24 hours with the right modules for your business.</div>
            </div>

            {!demoOk ? (
              <form className="fm-form" onSubmit={submitDemo} noValidate>
                <Field label="Full name" err={demoErr.name}>
                  <input type="text" value={demoState.name} onChange={(e) => setDemoState({...demoState, name: e.target.value})} placeholder="Rishi Narayanan"/>
                </Field>
                <div className="fm-row">
                  <Field label="Email" err={demoErr.email}>
                    <input type="email" value={demoState.email} onChange={(e) => setDemoState({...demoState, email: e.target.value})} placeholder="rishi@khorma.co"/>
                  </Field>
                  <Field label="Phone" err={demoErr.phone}>
                    <input type="tel" value={demoState.phone} onChange={(e) => setDemoState({...demoState, phone: e.target.value})} placeholder="+1 555 010 2208"/>
                  </Field>
                </div>
                <Field label="Business type">
                  <div className="fm-select">
                    <select value={demoState.biz} onChange={(e) => setDemoState({...demoState, biz: e.target.value})}>
                      {bizOptions.map((b) => <option key={b}>{b}</option>)}
                    </select>
                    <span>▾</span>
                  </div>
                </Field>
                <Field label="What are you trying to solve?">
                  <textarea rows="3" value={demoState.msg} onChange={(e) => setDemoState({...demoState, msg: e.target.value})} placeholder="e.g. We run 4 pharmacies and lose ~$8k/mo to expiries."></textarea>
                </Field>
                <div className="fm-foot">
                  <button type="submit" className="btn btn-accent">Request demo →</button>
                  <span className="fm-tos">By submitting, you agree to our terms. No spam — promise.</span>
                </div>
              </form>
            ) : (
              <div className="fm-ok">
                <div className="fm-ok-ic">✓</div>
                <div className="fm-ok-h">Thank you, {demoState.name.split(" ")[0] || "there"}!</div>
                <div className="fm-ok-p">Your demo request has been submitted successfully. We'll be in touch within 24 hours with a tailored {demoState.biz} workspace.</div>
                <button className="btn btn-ghost btn-sm" onClick={() => { setDemoOk(false); setDemoState({ name: "", email: "", phone: "", biz: "Restaurant", msg: "" }); }}>Submit another</button>
              </div>
            )}
          </div>

          {/* Contact + info */}
          <div className="fm-side">
            <div className="fm-card">
              <div className="fm-hd">
                <div className="eyebrow"><span className="dot"></span> Contact</div>
                <div className="fm-title">Talk to a human</div>
              </div>
              {!contactOk ? (
                <form className="fm-form" onSubmit={submitContact} noValidate>
                  <Field label="Name" err={contactErr.name}>
                    <input type="text" value={contactState.name} onChange={(e) => setContactState({...contactState, name: e.target.value})} placeholder="Your name"/>
                  </Field>
                  <Field label="Email" err={contactErr.email}>
                    <input type="email" value={contactState.email} onChange={(e) => setContactState({...contactState, email: e.target.value})} placeholder="you@company.com"/>
                  </Field>
                  <Field label="Message" err={contactErr.msg}>
                    <textarea rows="3" value={contactState.msg} onChange={(e) => setContactState({...contactState, msg: e.target.value})} placeholder="How can we help?"></textarea>
                  </Field>
                  <button type="submit" className="btn btn-primary btn-sm">Send message →</button>
                </form>
              ) : (
                <div className="fm-ok">
                  <div className="fm-ok-ic">✓</div>
                  <div className="fm-ok-h">Message sent</div>
                  <div className="fm-ok-p">Thanks {contactState.name.split(" ")[0]} — we'll reply within one business day.</div>
                </div>
              )}
            </div>

            <div className="fm-card fm-info">
              <div className="fm-info-row">
                <div className="fm-info-ic">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                </div>
                <div>
                  <div className="fm-info-k">Email</div>
                  <div className="fm-info-v">hello@neirah.app</div>
                </div>
              </div>
              <div className="fm-info-row">
                <div className="fm-info-ic">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.86 19.86 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.86 19.86 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.96.35 1.9.66 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.23a2 2 0 012.11-.45c.91.31 1.85.53 2.81.66A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <div className="fm-info-k">Phone</div>
                  <div className="fm-info-v">+1 (415) 555-0102</div>
                </div>
              </div>
              <div className="fm-info-row">
                <div className="fm-info-ic">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <div className="fm-info-k">HQ</div>
                  <div className="fm-info-v">San Francisco · Bengaluru · Dubai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fm-grid{display:grid;grid-template-columns:1.4fr 1fr;gap:14px;align-items:start}
        .fm-card{padding:28px;background:var(--surface);border:1px solid var(--line);border-radius:20px}
        .fm-demo{padding:32px}
        .fm-hd{margin-bottom:18px}
        .fm-title{font-family:var(--font-display);font-style:italic;font-size:30px;line-height:1.05;letter-spacing:-.02em;margin-top:6px}
        .fm-sub{font-size:13.5px;color:var(--fg-3);margin-top:6px}
        .fm-form{display:flex;flex-direction:column;gap:14px}
        .fm-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        .fm-foot{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:6px}
        .fm-tos{font-size:11.5px;color:var(--fg-4)}

        .fm-side{display:flex;flex-direction:column;gap:14px}
        .fm-info{display:flex;flex-direction:column;gap:14px}
        .fm-info-row{display:flex;gap:12px;align-items:flex-start}
        .fm-info-ic{width:34px;height:34px;border-radius:10px;background:var(--accent-soft);color:var(--accent);display:inline-flex;align-items:center;justify-content:center;flex:none}
        .fm-info-k{font-family:var(--font-mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3)}
        .fm-info-v{font-size:14px;color:var(--fg);margin-top:2px}

        .fm-ok{padding:14px 4px 4px;display:flex;flex-direction:column;align-items:flex-start;gap:8px}
        .fm-ok-ic{width:40px;height:40px;border-radius:50%;background:var(--accent-soft);color:var(--accent);display:inline-flex;align-items:center;justify-content:center;font-size:18px}
        .fm-ok-h{font-family:var(--font-display);font-style:italic;font-size:22px;letter-spacing:-.01em}
        .fm-ok-p{font-size:13.5px;color:var(--fg-2)}

        @media (max-width: 980px){ .fm-grid{grid-template-columns:1fr} .fm-row{grid-template-columns:1fr} }
      `}</style>
    </section>
  );
}

function Field({ label, err, children }) {
  return (
    <label className="fm-field">
      <span className="fm-lbl">
        <span>{label}</span>
        {err && <span className="fm-err">{err}</span>}
      </span>
      {children}
      <style>{`
        .fm-field{display:flex;flex-direction:column;gap:6px}
        .fm-lbl{display:flex;justify-content:space-between;align-items:baseline;font-family:var(--font-mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3)}
        .fm-err{color:#dc2626;text-transform:none;letter-spacing:0;font-family:var(--font-sans);font-size:11px}
        .fm-field input, .fm-field textarea, .fm-field select{width:100%;background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:10px 12px;color:var(--fg);font-size:14px;outline:none;transition:border-color 120ms,box-shadow 120ms;font-family:inherit}
        .fm-field input:focus, .fm-field textarea:focus, .fm-field select:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--ring)}
        .fm-field textarea{resize:vertical;min-height:80px;font-family:inherit}
        .fm-select{position:relative}
        .fm-select select{appearance:none;-webkit-appearance:none;padding-right:32px}
        .fm-select > span{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:var(--fg-3);pointer-events:none}
      `}</style>
    </label>
  );
}

// ───────────────────────────────────── Footer
function Footer() {
  return (
    <footer className="ft">
      <div className="container ft-inner">
        <div className="ft-top">
          <div className="ft-brand">
            <Wordmark size={28}/>
            <p className="ft-tag">An AI-guided operating system for real businesses.</p>
            <div className="ft-news">
              <input placeholder="you@company.com" aria-label="Email"/>
              <button>Subscribe</button>
            </div>
          </div>
          <div className="ft-cols">
            {[
              ["Product", ["Modules", "Industries", "Pricing", "Changelog", "Security"]],
              ["Company", ["About", "Customers", "Careers", "Press", "Contact"]],
              ["Resources", ["Docs", "Implementation guides", "API reference", "Status", "Trust"]],
            ].map(([h, items]) => (
              <div key={h}>
                <div className="eyebrow"><span className="dot"></span> {h}</div>
                <ul>{items.map((l) => <li key={l}><a href="#">{l}</a></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="ft-bot">
          <div>© 2026 Neirah, Inc. · All rights reserved.</div>
          <div className="ft-bot-r">
            <a href="#">Privacy</a><a href="#">Terms</a><a href="#">DPA</a>
            <span className="ft-status"><span className="dot-g"></span> All systems normal</span>
          </div>
        </div>
      </div>
      <div className="ft-wordmark" aria-hidden="true">NEIRAH</div>
      <style>{`
        .ft{position:relative;padding:80px 0 0;background:var(--bg-2);border-top:1px solid var(--line);overflow:hidden}
        .ft-inner{position:relative;z-index:1}
        .ft-top{display:grid;grid-template-columns:1.2fr 2fr;gap:40px}
        .ft-tag{margin:18px 0 18px;font-size:14px;color:var(--fg-3);max-width:32ch}
        .ft-news{display:flex;gap:6px;max-width:360px;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:5px 5px 5px 16px}
        .ft-news input{flex:1;background:transparent;border:0;outline:0;font-size:13px;color:var(--fg)}
        .ft-news input::placeholder{color:var(--fg-4)}
        .ft-news button{height:34px;padding:0 14px;border-radius:999px;border:0;background:var(--fg);color:var(--bg);font-size:12.5px;font-weight:500}
        .ft-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .ft-cols ul{list-style:none;padding:0;margin:14px 0 0;display:flex;flex-direction:column;gap:8px}
        .ft-cols a{font-size:13.5px;color:var(--fg-2);transition:color 120ms}
        .ft-cols a:hover{color:var(--fg)}
        .ft-bot{display:flex;justify-content:space-between;align-items:center;padding:24px 0;margin-top:48px;border-top:1px solid var(--line);font-size:12px;color:var(--fg-3);flex-wrap:wrap;gap:12px}
        .ft-bot-r{display:flex;gap:14px;align-items:center}
        .ft-bot-r a{color:var(--fg-3)}
        .ft-bot-r a:hover{color:var(--fg)}
        .ft-status{display:inline-flex;align-items:center;gap:8px;color:var(--fg-2)}
        .dot-g{display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 4px color-mix(in oklch, #22c55e 18%, transparent)}
        .ft-wordmark{position:absolute;left:50%;bottom:-26px;transform:translateX(-50%);font-family:var(--font-display);font-style:italic;font-size:clamp(120px, 26vw, 360px);line-height:.8;letter-spacing:-.04em;color:transparent;-webkit-text-stroke:1px var(--line);pointer-events:none;user-select:none;white-space:nowrap;z-index:0}
        @media (max-width: 980px){ .ft-top{grid-template-columns:1fr;gap:32px} .ft-cols{grid-template-columns:1fr 1fr} }
      `}</style>
    </footer>
  );
}

export { Pricing, About, Forms, Footer };
