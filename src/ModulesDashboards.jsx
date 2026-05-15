import React from "react";
import { MODULES, ModuleIcon } from "./data.jsx";
import { EcosystemVisual } from "./EcosystemVisual.jsx";
import { NeirahMark } from "./NavHero.jsx";
// ───────────────────────────────────── Ecosystem section
function EcosystemSection({ ecosystem }) {
  return (
    <section id="ecosystem" className="section eco-section">
      <div className="ambient" aria-hidden="true"></div>
      <div className="container">
        <div className="section-head center reveal">
          <div className="eyebrow"><span className="dot"></span> 04 · Ecosystem</div>
          <h2 className="h-section">Every module talks to every other. <em>Live.</em></h2>
          <p className="lead">One operational graph — POS sells, inventory recounts, payroll resolves, GL closes. No batch jobs, no CSV exports, no Friday-night surprises.</p>
        </div>
        <div className="eco-canvas reveal">
          <EcosystemVisual variant={ecosystem} />
        </div>

        <div className="eco-strip reveal">
          {[
            ["1.2 GB/s", "event throughput on the graph"],
            ["120 ms", "median round-trip across modules"],
            ["99.99%", "monthly uptime SLO"],
            ["SOC 2 · ISO", "type II controls audited"],
          ].map(([k,v], i) => (
            <div key={i} className="eco-strip-item">
              <div className="eco-strip-k">{k}</div>
              <div className="eco-strip-v">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .eco-section{padding:120px 0}
        .eco-canvas{position:relative;height:520px;border:1px solid var(--line);border-radius:24px;background:linear-gradient(180deg, var(--surface), var(--bg));overflow:hidden;box-shadow:var(--shadow-lg)}
        .eco-canvas::before{content:"";position:absolute;inset:0;background-image:linear-gradient(to right, var(--line) 1px, transparent 1px),linear-gradient(to bottom, var(--line) 1px, transparent 1px);background-size:48px 48px;mask-image:radial-gradient(ellipse at center, black 0%, transparent 70%);-webkit-mask-image:radial-gradient(ellipse at center, black 0%, transparent 70%);opacity:.5}
        .eco-strip{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:40px;border:1px solid var(--line);border-radius:18px;overflow:hidden;background:var(--surface)}
        .eco-strip-item{padding:22px;border-right:1px solid var(--line)}
        .eco-strip-item:last-child{border-right:0}
        .eco-strip-k{font-family:var(--font-display);font-size:32px;line-height:1;letter-spacing:-.02em}
        .eco-strip-v{font-family:var(--font-mono);font-size:10.5px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em;margin-top:8px}
        @media (max-width: 720px){ .eco-strip{grid-template-columns:1fr 1fr} .eco-strip-item:nth-child(2){border-right:0} .eco-strip-item:nth-child(1),.eco-strip-item:nth-child(2){border-bottom:1px solid var(--line)} }
      `}</style>
    </section>
  );
}

// ───────────────────────────────────── Module Explorer
function Modules({ pool }) {
  const list = (pool && pool.length) ? MODULES.filter((m) => pool.includes(m.id)) : MODULES;
  const [open, setOpen] = React.useState(null);
  return (
    <section id="modules" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot"></span> 05 · Modules</div>
          <h2 className="h-section">A complete toolkit. <em>Switch on what you need.</em></h2>
          <p className="lead">Each module is independently useful and seamlessly composable with the rest.</p>
        </div>

        <div className="mod-grid reveal">
          {list.map((m, i) => (
            <article key={m.id} className={`mod-card ${i === 0 ? "wide" : ""}`} onClick={() => setOpen(m)}>
              <div className="mod-card-top">
                <span className="mod-ic"><ModuleIcon id={m.id} size={18}/></span>
                <span className="mod-num">M-{String(i+1).padStart(2,"0")}</span>
              </div>
              <div className="mod-name">{m.name}</div>
              <div className="mod-full">{m.full}</div>
              <div className="mod-blurb">{m.blurb}</div>
              <div className="mod-feats">
                {m.features.slice(0,3).map((f) => (
                  <div key={f} className="mod-feat">
                    <span className="mod-feat-dot">+</span>{f}
                  </div>
                ))}
              </div>
              <div className="mod-foot">
                <span className="mod-inds">
                  {(m.industries.includes("All") ? ["All industries"] : m.industries.slice(0,3)).map((ind) => (
                    <span key={ind} className="mod-ind">{ind}</span>
                  ))}
                  {m.industries.length > 3 && !m.industries.includes("All") && <span className="mod-ind">+{m.industries.length - 3}</span>}
                </span>
                <button className="mod-view">View module <span>→</span></button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && <ModuleDrawer m={open} onClose={() => setOpen(null)} />}

      <style>{`
        .mod-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .mod-card{position:relative;padding:22px;background:var(--surface);border:1px solid var(--line);border-radius:18px;cursor:default;transition:transform 180ms cubic-bezier(.2,.7,.2,1),box-shadow 180ms,border-color 180ms;text-align:left;color:var(--fg);display:flex;flex-direction:column;gap:10px;min-height:280px}
        .mod-card:hover{transform:translateY(-2px);border-color:color-mix(in oklch, var(--accent) 30%, var(--line));box-shadow:var(--shadow-lg)}
        .mod-card.wide{grid-column:span 2;background:var(--accent);color:var(--accent-fg);border-color:var(--accent);box-shadow:var(--shadow-glow)}
        .mod-card.wide .mod-blurb,.mod-card.wide .mod-feat,.mod-card.wide .mod-full,.mod-card.wide .mod-num{color:color-mix(in oklch, var(--accent-fg) 80%, transparent)}
        .mod-card.wide .mod-ic,.mod-card.wide .mod-feat-dot{background:rgba(255,255,255,.16);color:var(--accent-fg)}
        .mod-card.wide .mod-ind{background:rgba(255,255,255,.14);color:var(--accent-fg);border-color:rgba(255,255,255,.25)}
        .mod-card.wide .mod-view{color:var(--accent-fg)}

        .mod-card-top{display:flex;justify-content:space-between;align-items:center}
        .mod-ic{width:36px;height:36px;border-radius:10px;background:var(--accent-soft);color:var(--accent);display:inline-flex;align-items:center;justify-content:center}
        .mod-num{font-family:var(--font-mono);font-size:10.5px;color:var(--fg-4);letter-spacing:.06em}
        .mod-name{font-family:var(--font-display);font-style:italic;font-size:30px;line-height:1;letter-spacing:-.015em;margin-top:4px}
        .mod-full{font-family:var(--font-mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3)}
        .mod-blurb{font-size:13.5px;color:var(--fg-2);line-height:1.55}
        .mod-feats{display:flex;flex-direction:column;gap:6px;margin-top:auto}
        .mod-feat{font-size:12.5px;color:var(--fg-2);display:flex;align-items:center;gap:8px}
        .mod-feat-dot{width:14px;height:14px;border-radius:4px;background:var(--accent-soft);color:var(--accent);font-size:10px;display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:600}
        .mod-foot{display:flex;justify-content:space-between;align-items:center;padding-top:12px;margin-top:8px;border-top:1px dashed color-mix(in oklch, var(--line) 80%, transparent);gap:10px}
        .mod-card.wide .mod-foot{border-color:rgba(255,255,255,.25)}
        .mod-inds{display:flex;gap:4px;flex-wrap:wrap}
        .mod-ind{font-family:var(--font-mono);font-size:10px;text-transform:uppercase;letter-spacing:.06em;padding:3px 7px;background:var(--bg-2);border:1px solid var(--line);border-radius:99px;color:var(--fg-3)}
        .mod-view{background:transparent;border:0;color:var(--accent);font-size:12.5px;font-weight:500;padding:0;display:inline-flex;align-items:center;gap:4px}
        .mod-view span{transition:transform 160ms}
        .mod-card:hover .mod-view span{transform:translateX(3px)}

        @media (max-width: 980px){ .mod-grid{grid-template-columns:1fr 1fr} .mod-card.wide{grid-column:span 2} }
        @media (max-width: 640px){ .mod-grid{grid-template-columns:1fr} .mod-card.wide{grid-column:span 1} }
      `}</style>
    </section>
  );
}

function ModuleDrawer({ m, onClose }) {
  React.useEffect(() => {
    function onKey(e) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="drw-back" onClick={onClose}>
      <div className="drw" onClick={(e) => e.stopPropagation()} role="dialog">
        <button className="drw-x" onClick={onClose} aria-label="Close">×</button>
        <div className="drw-hd">
          <span className="mod-ic" style={{width:44,height:44,borderRadius:12}}><ModuleIcon id={m.id} size={22}/></span>
          <div>
            <div className="eyebrow"><span className="dot"></span> Module · {m.full}</div>
            <div style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:48,lineHeight:1,letterSpacing:"-.02em",marginTop:6}}>{m.name}</div>
          </div>
        </div>
        <p className="lead" style={{fontSize:16,maxWidth:"none",marginTop:8}}>{m.blurb}</p>

        <div className="drw-grid">
          <div>
            <div className="eyebrow" style={{marginBottom:12}}><span className="dot"></span> Capabilities</div>
            <ul className="drw-list">
              {m.features.map((f) => (
                <li key={f}><span className="drw-li-ic">+</span>{f}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow" style={{marginBottom:12}}><span className="dot"></span> Built for</div>
            <div className="drw-inds">
              {(m.industries.includes("All") ? ["All verticals"] : m.industries).map((ind) => (
                <span key={ind} className="drw-ind">{ind}</span>
              ))}
            </div>
            <div className="eyebrow" style={{marginTop:24,marginBottom:8}}><span className="dot"></span> Integrates with</div>
            <div className="drw-ints">
              {MODULES.filter((x) => x.id !== m.id).slice(0,4).map((x) => (
                <div key={x.id} className="drw-int"><ModuleIcon id={x.id} size={14}/>{x.name}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="drw-foot">
          <a className="btn btn-accent" href="#demo" onClick={onClose}>Add to my stack</a>
          <a className="btn btn-ghost" href="#demo" onClick={onClose}>Talk to product</a>
        </div>
      </div>
      <style>{`
        .drw-back{position:fixed;inset:0;background:color-mix(in oklch, var(--fg) 38%, transparent);backdrop-filter:blur(6px);z-index:100;display:flex;justify-content:flex-end;animation:drwBackIn 220ms ease}
        .drw{width:min(560px, 100%);height:100%;background:var(--bg);overflow-y:auto;padding:40px 36px;display:flex;flex-direction:column;gap:18px;animation:drwIn 280ms cubic-bezier(.2,.7,.2,1);border-left:1px solid var(--line);box-shadow:-20px 0 60px -20px rgba(0,0,0,.2)}
        .drw-x{align-self:flex-end;width:36px;height:36px;border-radius:999px;background:var(--surface-2);border:1px solid var(--line);color:var(--fg);font-size:22px;line-height:1;cursor:default;margin:-12px -12px 0 0}
        .drw-hd{display:flex;gap:16px;align-items:flex-start}
        .drw-grid{display:grid;grid-template-columns:1.2fr 1fr;gap:24px;margin-top:8px}
        .drw-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:10px}
        .drw-list li{display:flex;gap:10px;font-size:14px;color:var(--fg-2);padding:10px 12px;background:var(--surface);border:1px solid var(--line);border-radius:10px}
        .drw-li-ic{width:18px;height:18px;border-radius:6px;background:var(--accent-soft);color:var(--accent);font-family:var(--font-mono);font-size:11px;display:inline-flex;align-items:center;justify-content:center;flex:none}
        .drw-inds{display:flex;flex-wrap:wrap;gap:6px}
        .drw-ind{font-family:var(--font-mono);font-size:10.5px;text-transform:uppercase;letter-spacing:.06em;padding:5px 9px;background:var(--surface);border:1px solid var(--line);border-radius:99px;color:var(--fg-2)}
        .drw-ints{display:flex;flex-direction:column;gap:6px}
        .drw-int{display:flex;align-items:center;gap:8px;padding:8px 10px;background:var(--surface);border:1px solid var(--line);border-radius:10px;font-size:13px;color:var(--fg-2)}
        .drw-int svg{color:var(--accent)}
        .drw-foot{display:flex;gap:8px;margin-top:auto;padding-top:18px;border-top:1px solid var(--line)}
        @keyframes drwBackIn{from{opacity:0}}
        @keyframes drwIn{from{transform:translateX(40px);opacity:0}}
        @media (max-width: 720px){ .drw-grid{grid-template-columns:1fr} .drw{padding:28px 22px} }
      `}</style>
    </div>
  );
}

// ───────────────────────────────────── Demo Preview Dashboards
const DASHBOARDS = {
  restaurant: {
    name: "Restaurant",
    sub: "Sage Bistro · Downtown",
    kpis: [
      { k: "Today's orders", v: "284", d: "+12% vs avg", color: "good" },
      { k: "Table sales", v: "$8,420", d: "Lunch peak 1:12pm" },
      { k: "Kitchen pending", v: "11", d: "Avg fire: 4:02", color: "warn" },
      { k: "Daily revenue", v: "$12,486", d: "Goal $14k · 89%" },
    ],
    chart: [12,18,22,30,28,40,52,48,62,70,65,72,80,68,76,84,90],
    pieData: [["Dine-in", 0.52, "var(--accent)"], ["Takeaway", 0.28, "color-mix(in oklch, var(--accent) 55%, white)"], ["Delivery", 0.20, "color-mix(in oklch, var(--accent) 30%, var(--bg-2))"]],
    rows: [
      ["#1428", "Table 12 · Tasting menu", "$284.50", "Plating"],
      ["#1427", "Table 4 · Wine pairing",  "$156.00", "Served"],
      ["#1426", "Takeaway · Rishi",         "$48.20",  "Ready"],
      ["#1425", "Table 9 · Family of 6",    "$312.40", "Cooking"],
      ["#1424", "Delivery · Doordash",      "$72.10",  "Dispatched"],
    ],
    rowHd: ["Order", "Detail", "Total", "Stage"],
    side: ["Kitchen pending: 11", "Avg ticket time: 14m", "Top dish: Sea-bass · 38", "Refire rate: 1.2%"],
  },
  pharmacy: {
    name: "Pharmacy",
    sub: "Northside Pharmacy · 4 branches",
    kpis: [
      { k: "Expiry alerts", v: "37", d: "Next 30 days", color: "warn" },
      { k: "Batches active", v: "1,284", d: "Across 4 branches" },
      { k: "Low stock items", v: "22", d: "Auto-reordered" },
      { k: "Daily sales", v: "$4,860", d: "+8% vs avg", color: "good" },
    ],
    chart: [40,42,38,44,52,48,56,62,68,64,72,68,76,80,78,86,90],
    pieData: [["OTC", 0.46, "var(--accent)"], ["Rx", 0.34, "color-mix(in oklch, var(--accent) 55%, white)"], ["Wellness", 0.20, "color-mix(in oklch, var(--accent) 30%, var(--bg-2))"]],
    rows: [
      ["AMX-450", "Amoxicillin 500mg · Lot B14",    "Exp 12 days",  "Action"],
      ["IBU-220", "Ibuprofen 200mg · Lot A09",      "Exp 18 days",  "Discount"],
      ["MET-770", "Metformin 850 · Lot C22",        "Exp 27 days",  "Watch"],
      ["VIT-D03", "Vitamin D3 · Lot B40",           "Exp 9 days",   "Action"],
      ["AST-110", "Astemizole · Lot D07",           "Exp 33 days",  "OK"],
    ],
    rowHd: ["SKU", "Item · Batch", "Expiry", "Status"],
    side: ["Critical (≤14d): 12", "Watchlist (≤30d): 25", "Schedule-drug audit: 3", "Suppliers ledger: 8 open"],
  },
  textile: {
    name: "Textile",
    sub: "Khorma Mills · Wholesale + retail",
    kpis: [
      { k: "Fabric in stock", v: "84,210m", d: "Across 312 bolts" },
      { k: "Customer orders", v: "76", d: "12 due this week", color: "warn" },
      { k: "Supplier POs", v: "$28.4k", d: "11 inbound" },
      { k: "Sales (week)", v: "$94,820", d: "+14% vs LW", color: "good" },
    ],
    chart: [30,28,40,38,52,48,60,68,64,72,78,72,80,86,82,90,94],
    pieData: [["Cotton", 0.42, "var(--accent)"], ["Silk", 0.28, "color-mix(in oklch, var(--accent) 55%, white)"], ["Synthetic", 0.30, "color-mix(in oklch, var(--accent) 30%, var(--bg-2))"]],
    rows: [
      ["BOLT-422", "Cotton sateen · 124m",  "Order #884",  "Cutting"],
      ["BOLT-410", "Linen blend · 64m",     "Order #882",  "Ready"],
      ["BOLT-440", "Silk-charmeuse · 28m",  "Order #886",  "Reserved"],
      ["BOLT-318", "Denim 12oz · 240m",     "Order #879",  "Shipped"],
      ["BOLT-501", "Voile printed · 96m",   "Order #888",  "Cutting"],
    ],
    rowHd: ["Bolt", "Fabric · Roll", "Order", "Stage"],
    side: ["Cut-plan utilization: 91%", "Wastage rate: 3.4%", "Wholesale margin: 38%", "Retail margin: 62%"],
  },
  retail: {
    name: "Retail",
    sub: "Aurelia Stores · 6 branches",
    kpis: [
      { k: "POS sales today", v: "$24,180", d: "+18% basket vs LW", color: "good" },
      { k: "Inventory value", v: "$612k", d: "8.4 weeks of cover" },
      { k: "Customer count", v: "1,284", d: "Avg ticket $18.84" },
      { k: "Offers perf.", v: "27%", d: "Loyalty redemption" },
    ],
    chart: [24,30,32,42,48,56,52,60,72,68,78,82,76,88,92,96,100],
    pieData: [["Branch A", 0.34, "var(--accent)"], ["Branch B", 0.22, "color-mix(in oklch, var(--accent) 55%, white)"], ["Others", 0.44, "color-mix(in oklch, var(--accent) 30%, var(--bg-2))"]],
    rows: [
      ["TX-90421", "Branch · Aurelia Downtown", "$184.20", "Card"],
      ["TX-90420", "Branch · Aurelia North",    "$62.50",  "Loyalty"],
      ["TX-90419", "Online · Aurelia.com",       "$240.00", "PayPal"],
      ["TX-90418", "Branch · Aurelia West",     "$24.80",  "Cash"],
      ["TX-90417", "Branch · Aurelia East",     "$96.30",  "Card"],
    ],
    rowHd: ["Txn", "Channel", "Amount", "Method"],
    side: ["Loyalty members: 12.4k", "Repeat-rate (90d): 41%", "Stockouts: 4", "Active offers: 7"],
  },
};

function DashboardPreview() {
  const tabs = Object.keys(DASHBOARDS);
  const [tab, setTab] = React.useState("restaurant");
  const d = DASHBOARDS[tab];
  return (
    <section id="demo" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot"></span> 06 · Interactive demo</div>
          <h2 className="h-section">Hand-on the cockpit. <em>One window per vertical.</em></h2>
          <p className="lead">Tap a vertical to swap dashboards. These are interactive mockups of the real product — Neirah ships with vertical-specific widgets out of the box.</p>
        </div>

        <div className="dp-shell reveal">
          <div className="dp-tabs">
            {tabs.map((t) => (
              <button key={t} className={`dp-tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
                {DASHBOARDS[t].name}
              </button>
            ))}
            <div className="dp-tabs-right">
              <span className="pill">Mon · 14:08 IST</span>
            </div>
          </div>

          <div className="dp-chrome">
            <div className="dp-tlights"><span></span><span></span><span></span></div>
            <div className="dp-url">neirah.app / {d.name.toLowerCase()} / overview</div>
            <div className="dp-acct"><span className="dp-avt">RN</span> Rishi N.</div>
          </div>

          <div className="dp-body" key={tab}>
            <aside className="dp-side">
              <div className="dp-side-brand"><NeirahMark size={22}/><span>Neirah</span></div>
              <div className="dp-side-org"><div className="dp-side-org-n">{d.name} OS</div><div className="dp-side-org-s">{d.sub}</div></div>
              <nav className="dp-nav">
                {[["Overview", true], ["Operations"], ["Inventory"], ["People"], ["Finance"], ["Reports"], ["Settings"]].map(([l, on]) => (
                  <a key={l} className={`dp-nav-l ${on ? "on" : ""}`}>{l}</a>
                ))}
              </nav>
              <div className="dp-side-foot">
                <div className="eyebrow" style={{marginBottom:8}}><span className="dot"></span> Snapshot</div>
                {d.side.map((s, i) => <div key={i} className="dp-snap">{s}</div>)}
              </div>
            </aside>

            <main className="dp-main">
              <div className="dp-main-hd">
                <div>
                  <div className="eyebrow"><span className="dot"></span> Today, Mon</div>
                  <h3 style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:36,lineHeight:1,letterSpacing:"-.02em",marginTop:6}}>{d.name} cockpit</h3>
                </div>
                <div className="dp-main-actions">
                  <button className="dp-pill">Filter</button>
                  <button className="dp-pill">Export</button>
                  <button className="dp-pill primary">+ New action</button>
                </div>
              </div>

              <div className="dp-kpis">
                {d.kpis.map((k) => (
                  <div key={k.k} className="dp-kpi">
                    <div className="dp-kpi-k">{k.k}</div>
                    <div className="dp-kpi-v">{k.v}</div>
                    <div className={`dp-kpi-d ${k.color || ""}`}>{k.d}</div>
                  </div>
                ))}
              </div>

              <div className="dp-row">
                <div className="dp-panel dp-chart">
                  <div className="dp-panel-hd">
                    <div>
                      <div style={{fontSize:13,fontWeight:600}}>Revenue · last 17 days</div>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:10.5,color:"var(--fg-3)",marginTop:4,textTransform:"uppercase",letterSpacing:".08em"}}>Trend · live</div>
                    </div>
                    <div className="dp-legend"><span className="dot-1"></span>This period<span className="dot-2"></span>Last period</div>
                  </div>
                  <AreaChart data={d.chart}/>
                </div>

                <div className="dp-panel dp-mix">
                  <div className="dp-panel-hd">
                    <div>
                      <div style={{fontSize:13,fontWeight:600}}>Mix</div>
                      <div style={{fontFamily:"var(--font-mono)",fontSize:10.5,color:"var(--fg-3)",marginTop:4,textTransform:"uppercase",letterSpacing:".08em"}}>Share</div>
                    </div>
                  </div>
                  <DonutChart data={d.pieData}/>
                </div>
              </div>

              <div className="dp-panel">
                <div className="dp-panel-hd">
                  <div>
                    <div style={{fontSize:13,fontWeight:600}}>Activity</div>
                    <div style={{fontFamily:"var(--font-mono)",fontSize:10.5,color:"var(--fg-3)",marginTop:4,textTransform:"uppercase",letterSpacing:".08em"}}>Recent · {d.rows.length} rows</div>
                  </div>
                  <div className="dp-legend"><button className="dp-pill sm">View all</button></div>
                </div>
                <table className="dp-table">
                  <thead><tr>{d.rowHd.map((h) => <th key={h}>{h}</th>)}</tr></thead>
                  <tbody>
                    {d.rows.map((r, i) => (
                      <tr key={i}>{r.map((c, j) => <td key={j} className={j === r.length - 1 ? "last" : ""}>{j === r.length - 1 ? <span className="dp-status">{c}</span> : c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </div>

      <style>{`
        .dp-shell{border:1px solid var(--line);border-radius:24px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow-lg)}
        .dp-tabs{display:flex;align-items:center;gap:6px;padding:14px 18px;background:var(--bg-2);border-bottom:1px solid var(--line)}
        .dp-tab{height:32px;padding:0 14px;border-radius:999px;border:1px solid transparent;background:transparent;color:var(--fg-2);font-size:13px;font-weight:500;transition:all 120ms}
        .dp-tab:hover{color:var(--fg);background:var(--surface)}
        .dp-tab.on{background:var(--surface);border-color:var(--line);color:var(--fg);box-shadow:var(--shadow-sm)}
        .dp-tabs-right{margin-left:auto}

        .dp-chrome{display:flex;align-items:center;gap:14px;padding:10px 18px;background:var(--surface-2);border-bottom:1px solid var(--line);font-size:12px;color:var(--fg-3)}
        .dp-tlights{display:flex;gap:6px}
        .dp-tlights span{width:10px;height:10px;border-radius:50%;background:var(--line-2)}
        .dp-tlights span:nth-child(1){background:#ff5f57}
        .dp-tlights span:nth-child(2){background:#febc2e}
        .dp-tlights span:nth-child(3){background:#28c840}
        .dp-url{flex:1;text-align:center;font-family:var(--font-mono);font-size:11.5px;color:var(--fg-3);background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:5px 14px;max-width:420px;margin:0 auto}
        .dp-acct{display:flex;align-items:center;gap:8px;font-size:12px}
        .dp-avt{width:22px;height:22px;border-radius:50%;background:var(--accent);color:var(--accent-fg);font-size:10px;display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-weight:600}

        .dp-body{display:grid;grid-template-columns:240px 1fr;min-height:620px;animation:dpFade 360ms ease both}
        @keyframes dpFade{from{opacity:0;transform:translateY(4px)}}
        .dp-side{padding:20px 18px;background:var(--bg-2);border-right:1px solid var(--line);display:flex;flex-direction:column;gap:18px}
        .dp-side-brand{display:flex;align-items:center;gap:8px;font-family:var(--font-display);font-style:italic;font-size:20px}
        .dp-side-org{padding:12px;background:var(--surface);border:1px solid var(--line);border-radius:12px}
        .dp-side-org-n{font-size:13px;font-weight:600}
        .dp-side-org-s{font-size:11px;color:var(--fg-3);margin-top:2px}
        .dp-nav{display:flex;flex-direction:column;gap:2px}
        .dp-nav-l{padding:8px 10px;border-radius:8px;font-size:13px;color:var(--fg-3);transition:all 120ms}
        .dp-nav-l:hover{color:var(--fg);background:var(--surface)}
        .dp-nav-l.on{color:var(--fg);background:var(--surface);box-shadow:inset 2px 0 0 var(--accent)}
        .dp-side-foot{margin-top:auto;padding-top:18px;border-top:1px dashed var(--line);display:flex;flex-direction:column;gap:6px}
        .dp-snap{font-family:var(--font-mono);font-size:11px;color:var(--fg-2);background:var(--surface);border:1px solid var(--line);border-radius:8px;padding:6px 10px}

        .dp-main{padding:22px 24px;display:flex;flex-direction:column;gap:14px;background:linear-gradient(180deg, var(--surface), color-mix(in oklch, var(--surface) 90%, var(--accent-soft)))}
        .dp-main-hd{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap}
        .dp-main-hd > div:first-child{min-width:0;flex:1 1 auto}
        .dp-main-actions{display:flex;gap:6px;flex-wrap:wrap}
                .dp-pill{height:32px;padding:0 14px;border-radius:999px;background:var(--surface);border:1px solid var(--line);color:var(--fg-2);font-size:12.5px;white-space:nowrap}
        .dp-pill:hover{color:var(--fg);border-color:var(--fg-4)}
        .dp-pill.primary{background:var(--fg);color:var(--bg);border-color:var(--fg)}
        .dp-pill.sm{height:28px;padding:0 10px;font-size:11.5px}

        .dp-kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
        .dp-kpi{padding:14px;background:var(--surface);border:1px solid var(--line);border-radius:14px}
        .dp-kpi-k{font-family:var(--font-mono);font-size:10.5px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em}
        .dp-kpi-v{font-family:var(--font-display);font-size:30px;line-height:1.1;letter-spacing:-.02em;margin-top:6px}
        .dp-kpi-d{font-size:11.5px;color:var(--fg-3);margin-top:4px}
        .dp-kpi-d.good{color:oklch(0.55 0.15 150)}
        .dp-kpi-d.warn{color:oklch(0.62 0.16 60)}

        .dp-row{display:grid;grid-template-columns:1.6fr 1fr;gap:10px}
        .dp-panel{padding:18px;background:var(--surface);border:1px solid var(--line);border-radius:14px}
                .dp-panel-hd{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:14px;gap:10px;flex-wrap:wrap}
        .dp-panel-hd > div:first-child{min-width:0;flex:1 1 auto}
                .dp-legend{display:flex;align-items:center;gap:10px;font-family:var(--font-mono);font-size:10.5px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.06em;flex-wrap:wrap}
        .dp-legend .dot-1,.dp-legend .dot-2{display:inline-block;width:8px;height:8px;border-radius:50%;margin-right:4px;margin-left:8px;vertical-align:1px}
        .dp-legend .dot-1{background:var(--accent)}
        .dp-legend .dot-2{background:var(--fg-4)}

        .dp-table{width:100%;border-collapse:collapse;font-size:12.5px}
        .dp-table th{text-align:left;font-family:var(--font-mono);font-size:10.5px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em;font-weight:500;padding:8px 10px;border-bottom:1px solid var(--line)}
        .dp-table td{padding:10px;border-bottom:1px solid var(--line);color:var(--fg-2)}
        .dp-table td:first-child{font-family:var(--font-mono);color:var(--fg-3);font-size:11.5px}
        .dp-table tbody tr:last-child td{border-bottom:0}
        .dp-status{padding:3px 8px;border-radius:99px;background:var(--accent-soft);color:color-mix(in oklch, var(--accent) 60%, var(--fg));font-size:11px;font-family:var(--font-mono);text-transform:uppercase;letter-spacing:.06em}
        [data-theme="dark"] .dp-status{color:oklch(0.92 0.06 var(--accent-h))}

        @media (max-width: 980px){ .dp-body{grid-template-columns:1fr} .dp-side{flex-direction:row;flex-wrap:wrap;overflow-x:auto} .dp-side-foot{flex-basis:100%} .dp-kpis{grid-template-columns:1fr 1fr} .dp-row{grid-template-columns:1fr} }
      `}</style>
    </section>
  );
}

function AreaChart({ data }) {
  const W = 520, H = 160, P = 8;
  const max = Math.max(...data) * 1.1;
  const min = 0;
  const stepX = (W - P * 2) / (data.length - 1);
  const pts = data.map((v, i) => [P + i * stepX, H - P - ((v - min) / (max - min)) * (H - P * 2)]);
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const area = d + ` L${W - P},${H - P} L${P},${H - P} Z`;
  // shadow ghost (previous period)
  const ghost = data.map((v, i) => Math.max(2, v * (0.65 + Math.sin(i * 0.6) * 0.08)));
  const gpts = ghost.map((v, i) => [P + i * stepX, H - P - ((v - min) / (max - min)) * (H - P * 2)]);
  const gd = gpts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: 180, display:"block" }}>
      <defs>
        <linearGradient id="dp-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={P} x2={W - P} y1={P + (H - P*2) * f} y2={P + (H - P*2) * f} stroke="var(--line)" strokeDasharray="2 4"/>
      ))}
      <path d={gd} stroke="var(--fg-4)" strokeWidth="1.6" fill="none" strokeDasharray="3 3"/>
      <path d={area} fill="url(#dp-area)"/>
      <path d={d} stroke="var(--accent)" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p, i) => i === pts.length - 1 && (
        <g key={i}>
          <circle cx={p[0]} cy={p[1]} r="9" fill="var(--accent)" opacity="0.15"/>
          <circle cx={p[0]} cy={p[1]} r="4" fill="var(--accent)"/>
          <circle cx={p[0]} cy={p[1]} r="2" fill="white"/>
        </g>
      ))}
    </svg>
  );
}

function DonutChart({ data }) {
  // data: [[label, fraction, color], ...]
  const R = 64, r = 42, C = 80;
  let acc = 0;
  const total = data.reduce((s, [, f]) => s + f, 0);
  const segs = data.map(([label, f, color]) => {
    const start = acc / total * Math.PI * 2 - Math.PI / 2;
    acc += f;
    const end = acc / total * Math.PI * 2 - Math.PI / 2;
    const large = (end - start) > Math.PI ? 1 : 0;
    const x1 = C + R * Math.cos(start), y1 = C + R * Math.sin(start);
    const x2 = C + R * Math.cos(end),   y2 = C + R * Math.sin(end);
    const xr1 = C + r * Math.cos(end),  yr1 = C + r * Math.sin(end);
    const xr2 = C + r * Math.cos(start),yr2 = C + r * Math.sin(start);
    const d = `M ${x1},${y1} A ${R},${R} 0 ${large} 1 ${x2},${y2} L ${xr1},${yr1} A ${r},${r} 0 ${large} 0 ${xr2},${yr2} Z`;
    return { d, color, label, f };
  });

  return (
    <div style={{display:"flex",gap:14,alignItems:"center"}}>
      <svg width="160" height="160" viewBox="0 0 160 160">
        {segs.map((s, i) => <path key={i} d={s.d} fill={s.color}/>)}
        <text x="80" y="76" textAnchor="middle" style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:26,letterSpacing:"-.02em",fill:"var(--fg)"}}>{Math.round(segs[0].f * 100)}%</text>
        <text x="80" y="92" textAnchor="middle" style={{fontFamily:"var(--font-mono)",fontSize:9.5,letterSpacing:".08em",textTransform:"uppercase",fill:"var(--fg-3)"}}>{segs[0].label}</text>
      </svg>
      <div style={{display:"flex",flexDirection:"column",gap:6,flex:1}}>
        {segs.map((s, i) => (
          <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",fontSize:12}}>
            <span style={{display:"inline-flex",alignItems:"center",gap:8,color:"var(--fg-2)"}}>
              <span style={{width:10,height:10,borderRadius:3,background:s.color}}></span>{s.label}
            </span>
            <span style={{fontFamily:"var(--font-mono)",color:"var(--fg-3)"}}>{Math.round(s.f*100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export { EcosystemSection, Modules, DashboardPreview };
