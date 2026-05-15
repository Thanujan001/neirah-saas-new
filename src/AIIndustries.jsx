import React from "react";
import { MODULES, INDUSTRIES, ModuleIcon } from "./data.jsx";
// ───────────────────────────────────── AI Recommendation
function aiRecommend(input) {
  const q = (input || "").toLowerCase();
  const map = [
    { test: /(restaur|cafe|qsr|food|dining|kitchen)/, ind: "Restaurant", modules: ["restaurant","pos","inventory","hr","reports"] },
    { test: /(pharm|drug|medic|clinic)/, ind: "Pharmacy", modules: ["pharmacy","pos","inventory","crm","reports"] },
    { test: /(textile|fabric|garment|mill|cloth)/, ind: "Textile", modules: ["textile","erp","inventory","crm","reports"] },
    { test: /(retail|shop|store|chain|brand)/, ind: "Retail", modules: ["pos","inventory","crm","hr","reports"] },
    { test: /(enterprise|holding|group|conglom|corp)/, ind: "Enterprise", modules: ["erp","hr","crm","reports"] },
    { test: /(jewel|gold|diamond|karat)/, ind: "Jewellery", modules: ["jewellery","pos","inventory","crm"] },
    { test: /(salon|spa|beauty|wellness)/, ind: "Salon & Spa", modules: ["pos","crm","hr","reports"] },
    { test: /(logistic|fleet|freight|3pl|delivery|warehouse)/, ind: "Logistics", modules: ["erp","inventory","hr","reports"] },
  ];
  const hit = map.find((m) => m.test.test(q));
  return hit || { ind: "Multi-vertical", modules: ["pos","erp","inventory","crm","hr","reports"], generic: true };
}

function AIRecommendation({ trigger }) {
  const [messages, setMessages] = React.useState([
    { role: "ai", kind: "intro", text: "Hi — I'm Neirah AI. Tell me about your business and I'll match the right modules." },
  ]);
  const [val, setVal] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const listRef = React.useRef(null);

  // Trigger from hero
  React.useEffect(() => {
    if (trigger && trigger.q && trigger.k > 0) {
      ask(trigger.q);
    }
    // eslint-disable-next-line
  }, [trigger?.k]);

  React.useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, thinking]);

  function ask(text) {
    if (!text || !text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setThinking(true);
    setTimeout(() => {
      const rec = aiRecommend(text);
      setMessages((m) => [...m, { role: "ai", kind: "rec", text:
        rec.generic
          ? `Got it. Here's a starter ecosystem that fits most businesses:`
          : `For a ${rec.ind.toLowerCase()} operation, I recommend this stack:`,
        modules: rec.modules, industry: rec.ind }]);
      setThinking(false);
    }, 700);
    setVal("");
  }

  const chips = ["Restaurant chain", "Single pharmacy", "Textile wholesaler", "3-branch retail", "Salon group"];

  return (
    <section id="ai" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot"></span> 02 · AI Match</div>
          <h2 className="h-section">A conversation, not a sales call. <em>Describe your business — get a stack.</em></h2>
          <p className="lead">Neirah AI maps what you do to the exact modules you need. Type freely, or pick a quick example.</p>
        </div>

        <div className="ai-shell reveal">
          <div className="ai-rail">
            <div className="ai-rail-row"><span className="ai-rail-k">model</span><span className="ai-rail-v">neirah-match-v3</span></div>
            <div className="ai-rail-row"><span className="ai-rail-k">latency</span><span className="ai-rail-v">~120ms</span></div>
            <div className="ai-rail-row"><span className="ai-rail-k">verticals</span><span className="ai-rail-v">8 covered</span></div>
            <div className="ai-rail-row"><span className="ai-rail-k">grounded on</span><span className="ai-rail-v">11 modules</span></div>
            <div className="ai-rail-foot">
              <div className="ai-orb"><div className="ai-orb-inner"></div></div>
              <div>
                <div style={{fontFamily:"var(--font-display)",fontStyle:"italic",fontSize:18,lineHeight:1}}>Neirah AI</div>
                <div style={{fontFamily:"var(--font-mono)",fontSize:10.5,color:"var(--fg-3)",letterSpacing:".08em",textTransform:"uppercase",marginTop:4}}>online</div>
              </div>
            </div>
          </div>

          <div className="ai-pane">
            <div className="ai-list" ref={listRef}>
              {messages.map((m, i) => (
                <Message key={i} m={m} />
              ))}
              {thinking && (
                <div className="msg ai">
                  <div className="msg-avatar"><div className="ai-orb sm"><div className="ai-orb-inner"></div></div></div>
                  <div className="msg-bubble"><div className="typing"><span></span><span></span><span></span></div></div>
                </div>
              )}
            </div>
            <form className="ai-input" onSubmit={(e) => { e.preventDefault(); ask(val); }}>
              <div className="ai-chips">
                {chips.map((c) => (
                  <button type="button" key={c} className="chip" onClick={() => ask(c)}>{c}</button>
                ))}
              </div>
              <div className="ai-pill">
                <input value={val} onChange={(e) => setVal(e.target.value)} placeholder="Describe your business…" aria-label="Describe your business"/>
                <button type="submit" className="btn btn-accent btn-sm">Send</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .ai-shell{display:grid;grid-template-columns:260px minmax(0,1fr);background:var(--surface);border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow-lg);overflow:hidden;min-height:520px}
        .ai-rail{padding:24px;border-right:1px solid var(--line);background:var(--surface-2);display:flex;flex-direction:column;gap:12px}
        .ai-rail-row{display:flex;justify-content:space-between;font-family:var(--font-mono);font-size:11px}
        .ai-rail-k{color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em}
        .ai-rail-v{color:var(--fg-2)}
        .ai-rail-foot{margin-top:auto;display:flex;align-items:center;gap:12px;padding-top:24px;border-top:1px dashed var(--line)}
        .ai-orb{width:36px;height:36px;border-radius:50%;background:radial-gradient(circle at 30% 30%, color-mix(in oklch, var(--accent) 80%, white), color-mix(in oklch, var(--accent) 40%, var(--bg)));box-shadow:0 8px 22px -6px color-mix(in oklch, var(--accent) 60%, transparent);position:relative;flex:none}
        .ai-orb.sm{width:24px;height:24px}
        .ai-orb-inner{position:absolute;inset:14%;border-radius:50%;background:radial-gradient(circle at 30% 30%, white, transparent 60%);opacity:.5;animation:orbPulse 2.4s ease-in-out infinite}
        @keyframes orbPulse{0%,100%{opacity:.45}50%{opacity:.85}}

        .ai-pane{display:flex;flex-direction:column;min-height:0}
        .ai-list{flex:1;overflow-y:auto;padding:24px 28px;display:flex;flex-direction:column;gap:18px}
        .msg{display:flex;gap:12px;max-width:88%}
        .msg.ai{align-self:flex-start}
        .msg.user{align-self:flex-end;flex-direction:row-reverse}
        .msg-avatar{flex:none}
        .msg-bubble{padding:12px 16px;border-radius:14px;font-size:14px;line-height:1.55;color:var(--fg);background:var(--surface-2);border:1px solid var(--line)}
        .msg.user .msg-bubble{background:var(--fg);color:var(--bg);border-color:var(--fg)}
        .msg.user .msg-avatar{width:24px;height:24px;border-radius:50%;background:var(--surface-2);border:1px solid var(--line);display:flex;align-items:center;justify-content:center;font-size:10px;color:var(--fg-3);font-family:var(--font-mono)}

        .typing{display:inline-flex;gap:4px;padding:6px 0}
        .typing span{width:6px;height:6px;border-radius:50%;background:var(--fg-4);animation:typing 1.2s infinite ease-in-out}
        .typing span:nth-child(2){animation-delay:.15s}
        .typing span:nth-child(3){animation-delay:.3s}
        @keyframes typing{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}

        .ai-input{border-top:1px solid var(--line);padding:16px 24px 20px;background:var(--bg)}
        .ai-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}
        .ai-pill{display:flex;align-items:center;gap:8px;padding:6px 6px 6px 16px;background:var(--surface);border:1px solid var(--line);border-radius:999px;box-shadow:var(--shadow-sm)}
        .ai-pill input{flex:1;min-width:0;border:0;outline:0;background:transparent;font-size:14px;padding:8px 4px;color:var(--fg)}
        .ai-pill input::placeholder{color:var(--fg-4)}

        .rec-grid{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
        .rec-card{display:flex;align-items:center;gap:8px;padding:8px 12px 8px 10px;background:var(--bg);border:1px solid var(--line);border-radius:10px;font-size:12.5px}
        .rec-card .ic{color:var(--accent);display:inline-flex}
        .rec-card.primary{background:var(--accent-soft);border-color:color-mix(in oklch, var(--accent) 30%, transparent);color:color-mix(in oklch, var(--accent) 60%, var(--fg))}
        [data-theme="dark"] .rec-card.primary{color:oklch(0.92 0.06 var(--accent-h))}

        .rec-cta{display:inline-flex;align-items:center;gap:6px;margin-top:14px;padding:8px 14px;background:var(--accent);color:var(--accent-fg);border-radius:999px;font-size:12.5px;font-weight:500}

        @media (max-width: 860px){ .ai-shell{grid-template-columns:1fr} .ai-rail{flex-direction:row;flex-wrap:wrap;border-right:0;border-bottom:1px solid var(--line)} .ai-rail-foot{flex-basis:100%} }
      `}</style>
    </section>
  );
}

function Message({ m }) {
  if (m.role === "user") {
    return (
      <div className="msg user">
        <div className="msg-avatar">YOU</div>
        <div className="msg-bubble">{m.text}</div>
      </div>
    );
  }
  return (
    <div className="msg ai">
      <div className="msg-avatar"><div className="ai-orb sm"><div className="ai-orb-inner"></div></div></div>
      <div className="msg-bubble">
        {m.text}
        {m.kind === "rec" && (
          <>
            <div className="rec-grid">
              {(m.modules || []).map((mid, i) => {
                const mod = MODULES.find((x) => x.id === mid);
                return (
                  <div key={mid} className={`rec-card ${i === 0 ? "primary" : ""}`}>
                    <span className="ic"><ModuleIcon id={mid} size={14}/></span>
                    {mod ? mod.name : mid}
                  </div>
                );
              })}
            </div>
            <a href="#demo" className="rec-cta">Spin up this stack →</a>
          </>
        )}
      </div>
    </div>
  );
}

// ───────────────────────────────────── Industry Selector
function Industries({ pool }) {
  const list = (pool && pool.length) ? INDUSTRIES.filter((i) => pool.includes(i.id)) : INDUSTRIES;
  const [active, setActive] = React.useState(list[0]?.id);
  const cur = list.find((i) => i.id === active) || list[0];

  return (
    <section id="industries" className="section">
      <div className="container">
        <div className="section-head reveal">
          <div className="eyebrow"><span className="dot"></span> 03 · Industries</div>
          <h2 className="h-section">Pick a vertical. <em>We've shipped the playbook.</em></h2>
          <p className="lead">Eight verticals, one platform. Choose an industry to see the modules we ship for it on day one.</p>
        </div>

        <div className="ind-grid reveal">
          <div className="ind-list">
            {list.map((i, idx) => (
              <button key={i.id} className={`ind-row ${active === i.id ? "on" : ""}`} onClick={() => setActive(i.id)}>
                <span className="ind-num">{String(idx+1).padStart(2,"0")}</span>
                <span className="ind-name-wrap">
                  <span className="ind-name">{i.name}</span>
                  <span className="ind-desc">{i.desc}</span>
                </span>
                <span className="ind-metric">{i.metric}</span>
                <span className="ind-arrow">→</span>
              </button>
            ))}
          </div>

          <div className="ind-panel">
            {cur && (
              <>
                <div className="ind-panel-head">
                  <div className="eyebrow"><span className="dot"></span> {cur.name}</div>
                  <div className="h-section" style={{fontSize:"clamp(28px,3vw,40px)"}}>
                    Ship a complete <em>{cur.name.toLowerCase()}</em> stack.
                  </div>
                  <p style={{color:"var(--fg-3)",marginTop:6,fontSize:14}}>{cur.desc}</p>
                </div>
                <div className="ind-mods">
                  {cur.modules.map((mid) => {
                    const m = MODULES.find((x) => x.id === mid);
                    if (!m) return null;
                    return (
                      <div key={mid} className="ind-mod">
                        <span className="ind-mod-ic"><ModuleIcon id={mid} size={16}/></span>
                        <span>
                          <div className="ind-mod-n">{m.name}</div>
                          <div className="ind-mod-b">{m.blurb}</div>
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="ind-foot">
                  <a className="btn btn-accent btn-sm" href="#demo">Get this stack →</a>
                  <a className="btn btn-ghost btn-sm" href="#modules">Browse all modules</a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .ind-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.4fr);gap:0;border:1px solid var(--line);border-radius:24px;overflow:hidden;background:var(--surface);box-shadow:var(--shadow-lg)}
        .ind-list{display:flex;flex-direction:column;background:var(--bg-2)}
        .ind-row{display:grid;grid-template-columns:32px 1fr auto auto;align-items:center;gap:12px;text-align:left;padding:18px 22px;background:transparent;border:0;border-bottom:1px solid var(--line);color:var(--fg);transition:background 120ms,color 120ms}
        .ind-row:last-child{border-bottom:0}
        .ind-row:hover{background:var(--surface)}
        .ind-row.on{background:var(--surface);box-shadow:inset 3px 0 0 var(--accent)}
        .ind-num{font-family:var(--font-mono);font-size:11px;color:var(--fg-4)}
        .ind-name{display:block;font-family:var(--font-display);font-size:22px;font-style:italic;letter-spacing:-.01em;line-height:1}
        .ind-desc{display:block;font-size:12px;color:var(--fg-3);margin-top:4px}
        .ind-metric{font-family:var(--font-mono);font-size:10.5px;color:var(--accent);text-transform:uppercase;letter-spacing:.06em}
        .ind-arrow{color:var(--fg-4);opacity:0;transition:opacity 160ms,transform 160ms}
        .ind-row:hover .ind-arrow, .ind-row.on .ind-arrow{opacity:1;transform:translateX(2px);color:var(--accent)}

        .ind-panel{padding:36px;display:flex;flex-direction:column;gap:22px;background:var(--surface);position:relative}
        .ind-panel::before{content:"";position:absolute;inset:24px;border-radius:18px;background:radial-gradient(circle at 80% 0%, var(--accent-soft), transparent 60%);pointer-events:none;opacity:.7;z-index:0}
        .ind-panel > *{position:relative;z-index:1}
        .ind-mods{display:grid;grid-template-columns:1fr 1fr;gap:10px}
        .ind-mod{display:flex;gap:10px;padding:12px;background:var(--bg);border:1px solid var(--line);border-radius:12px}
        .ind-mod-ic{flex:none;width:30px;height:30px;border-radius:8px;background:var(--accent-soft);color:var(--accent);display:inline-flex;align-items:center;justify-content:center}
        .ind-mod-n{font-size:13px;font-weight:600}
        .ind-mod-b{font-size:12px;color:var(--fg-3);margin-top:2px}
        .ind-foot{display:flex;gap:8px;margin-top:auto}

        @media (max-width: 980px){ .ind-grid{grid-template-columns:1fr} .ind-list{max-height:300px;overflow-y:auto} .ind-mods{grid-template-columns:1fr} }
      `}</style>
    </section>
  );
}

export { AIRecommendation, Industries };
