import React from "react";
import { ModuleIcon } from "./data.jsx";
// Enhanced 3D / parallax visualizations for the Neirah ecosystem.

function EcosystemVisual({ variant = "parallax" }) {
  const ref = React.useRef(null);
  const [pt, setPt] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5);
      const y = ((e.clientY - r.top) / r.height - 0.5);
      setPt({ x, y });
    }
    function onLeave() { setPt({ x: 0, y: 0 }); }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    function tick(now) { setT((now - start) / 1000); raf = requestAnimationFrame(tick); }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={ref} className="eco-vis" data-variant={variant}>
      <Starfield />
      {variant === "parallax" && <ParallaxCards pt={pt} t={t} />}
      {variant === "orbit" && <OrbitCards pt={pt} t={t} />}
      {variant === "cube" && <CubeViz pt={pt} t={t} />}
      {variant === "graph" && <NodeGraph pt={pt} t={t} />}
      <style>{`
        .eco-vis{position:relative;width:100%;height:100%;perspective:1600px;perspective-origin:50% 50%;transform-style:preserve-3d;overflow:hidden}
      `}</style>
    </div>
  );
}

/* Glossy 3D core orb used by multiple variants */
function CoreOrb({ size = 180, label = true, t = 0 }) {
  const s = size;
  return (
    <div className="cor" style={{ width: s, height: s }}>
      <div className="cor-halo"></div>
      <div className="cor-ring r1"></div>
      <div className="cor-ring r2"></div>
      <div className="cor-ring r3"></div>
      <div className="cor-sphere">
        <div className="cor-shine"></div>
        <div className="cor-iris" style={{ transform: `rotate(${t*16}deg)` }}></div>
      </div>
      {label && (
        <div className="cor-label">
          <div className="cor-label-k">neirah://core</div>
          <div className="cor-label-v">Operational Graph</div>
        </div>
      )}
      <style>{`
        .cor{position:relative;display:flex;align-items:center;justify-content:center}
        .cor-halo{position:absolute;inset:-40%;border-radius:50%;background:radial-gradient(circle, color-mix(in oklch, var(--accent) 28%, transparent), transparent 60%);filter:blur(8px);animation:corPulse 4s ease-in-out infinite}
        @keyframes corPulse{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.08);opacity:1}}
        .cor-ring{position:absolute;inset:0;border-radius:50%}
        .cor-ring.r1{inset:-6%;border:1px solid color-mix(in oklch, var(--accent) 28%, transparent);animation:corSpin 24s linear infinite}
        .cor-ring.r2{inset:-18%;border:1px dashed color-mix(in oklch, var(--accent) 18%, transparent);animation:corSpin 60s linear infinite reverse}
        .cor-ring.r3{inset:-32%;border:1px dotted color-mix(in oklch, var(--accent) 14%, transparent);animation:corSpin 90s linear infinite}
        @keyframes corSpin{to{transform:rotate(360deg)}}
        .cor-sphere{position:absolute;inset:14%;border-radius:50%;overflow:hidden;background:radial-gradient(circle at 32% 28%, oklch(0.95 0.08 var(--accent-h)) 0%, color-mix(in oklch, var(--accent) 80%, white) 16%, var(--accent) 48%, color-mix(in oklch, var(--accent) 35%, oklch(0.15 0.03 var(--accent-h))) 100%);box-shadow: inset 0 -22px 36px -8px color-mix(in oklch, var(--accent) 30%, black), inset 0 18px 30px -10px rgba(255,255,255,.55), 0 30px 80px -10px color-mix(in oklch, var(--accent) 55%, transparent)}
        .cor-shine{position:absolute;top:8%;left:14%;width:38%;height:24%;border-radius:50%;background:radial-gradient(ellipse at center, rgba(255,255,255,.85), transparent 70%);filter:blur(2px);transform:rotate(-22deg)}
        .cor-iris{position:absolute;inset:18%;border-radius:50%;background:conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,.18) 20deg, transparent 60deg, rgba(255,255,255,.10) 180deg, transparent 220deg, rgba(255,255,255,.16) 300deg, transparent 360deg);mix-blend-mode:overlay}
        .cor-label{position:absolute;left:50%;top:calc(50% + ${s * 0.62}px);transform:translateX(-50%);text-align:center;white-space:nowrap}
        .cor-label-k{font-family:var(--font-mono);font-size:10px;color:var(--fg-3);letter-spacing:.1em;text-transform:uppercase}
        .cor-label-v{font-family:var(--font-display);font-style:italic;font-size:18px;color:var(--fg);letter-spacing:-.01em;margin-top:4px}
      `}</style>
    </div>
  );
}

/* Faint starfield in background */
function Starfield() {
  const stars = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 36; i++) {
      arr.push({
        x: Math.random()*100, y: Math.random()*100,
        s: Math.random()*1.6 + 0.5, d: Math.random()*4 + 2, delay: Math.random()*4
      });
    }
    return arr;
  }, []);
  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((s, i) => (
        <span key={i} style={{
          left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s,
          animationDuration: `${s.d}s`, animationDelay: `-${s.delay}s`
        }}/>
      ))}
      <style>{`
        .starfield{position:absolute;inset:0;pointer-events:none;z-index:0}
        .starfield span{position:absolute;background:color-mix(in oklch, var(--accent) 60%, var(--fg-3));border-radius:50%;opacity:.5;animation:twinkle ease-in-out infinite}
        @keyframes twinkle{0%,100%{opacity:.15}50%{opacity:.8;transform:scale(1.4)}}
      `}</style>
    </div>
  );
}

/* ───────────────────────────────────── PARALLAX CARDS ───────────────────────────────────── */

function ParallaxCards({ pt, t }) {
  const cards = [
    { id: "pos", label: "POS", sub: "Checkout · Live", x: -32, y: -22, z: 80, w: 220, accent: true, value: "$12,480", delta: "+8.4% today", spark: [12,18,16,22,20,26,32,28,38,42,38,46,52], status: "good" },
    { id: "inventory", label: "Inventory", sub: "412 SKUs synced", x: 26, y: -28, z: 140, w: 200, value: "+38", delta: "Inbound batches", status: "good" },
    { id: "crm", label: "CRM · Profiles", sub: "24.3k tracked", x: -36, y: 18, z: 40, w: 220, value: "12", delta: "Hot leads · today" },
    { id: "hr", label: "HR · Shifts", sub: "Mon · 14 staff", x: 22, y: 22, z: 100, w: 230, value: "92%", delta: "Coverage", status: "ok" },
    { id: "reports", label: "Reports", sub: "Live KPIs", x: 34, y: -4, z: 60, w: 180, value: "8", delta: "Dashboards" },
    { id: "erp", label: "ERP · Ledger", sub: "Aug close", x: -8, y: 32, z: 0, w: 230, value: "Reconciled", delta: "11,284 entries" },
  ];

  // Container tilt
  const tiltX = pt.y * -10;
  const tiltY = pt.x * 12;

  return (
    <div className="px-stage" style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}>
      {/* connection lines */}
      <svg className="px-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {cards.map((c, i) => {
          const x1 = 50, y1 = 50;
          const x2 = 50 + c.x, y2 = 50 + c.y;
          const dash = 1.2, len = 50;
          return (
            <g key={c.id}>
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.12"/>
              <line x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="currentColor" strokeWidth="0.18" strokeOpacity="0.85"
                strokeDasharray={`${dash} ${len}`} strokeLinecap="round"
                style={{ animation: `pxFlow 3.5s linear ${i * 0.4}s infinite` }}/>
            </g>
          );
        })}
      </svg>

      <div className="px-core" style={{ transform: `translate(-50%,-50%) translate3d(${pt.x*-12}px, ${pt.y*-12}px, 60px)` }}>
        <CoreOrb size={150} t={t}/>
      </div>

      {cards.map((c, i) => {
        const drift = Math.sin(t * 0.7 + i) * 7;
        const driftX = Math.cos(t * 0.5 + i * 1.3) * 5;
        const depth = (c.z - 60) / 200;
        const tx = pt.x * 36 * (1 - depth*0.5);
        const ty = pt.y * 36 * (1 - depth*0.5);
        return (
          <div key={c.id} className={`px-card ${c.accent ? "accent" : ""}`} style={{
            top: `calc(50% + ${c.y}%)`,
            left: `calc(50% + ${c.x}%)`,
            transform: `translate(-50%, -50%) translate3d(${tx + driftX}px, ${ty + drift}px, ${c.z}px)`,
            width: c.w,
            zIndex: Math.round(c.z) + 50,
            animationDelay: `${i*90}ms`
          }}>
            <div className="px-card-head">
              <span className="px-card-icon"><ModuleIcon id={c.id} size={14}/></span>
              <span className="px-card-title">{c.label}</span>
              <span className={`px-card-status ${c.status || ""}`}>
                <span className="px-card-pulse"></span>
                {c.accent ? "LIVE" : (c.status === "warn" ? "WATCH" : "OK")}
              </span>
            </div>
            <div className="px-card-sub">{c.sub}</div>
            <div className="px-card-row">
              <div className="px-card-value">{c.value}</div>
              <div className="px-card-delta">{c.delta}</div>
            </div>
            {c.spark && <Spark data={c.spark} accent={c.accent}/>}
            <div className="px-card-glints" aria-hidden="true"></div>
          </div>
        );
      })}

      <style>{`
        .px-stage{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 240ms cubic-bezier(.2,.7,.2,1)}
        .px-lines{position:absolute;inset:-20%;width:140%;height:140%;color:color-mix(in oklch, var(--accent) 70%, var(--fg-3));z-index:0;pointer-events:none}
        @keyframes pxFlow{from{stroke-dashoffset:0}to{stroke-dashoffset:-${(1.2+50)*4}}}

        .px-core{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);transform-style:preserve-3d;z-index:40}

        .px-card{position:absolute;background:color-mix(in oklch, var(--surface) 80%, transparent);backdrop-filter:blur(16px) saturate(160%);-webkit-backdrop-filter:blur(16px) saturate(160%);border:1px solid color-mix(in oklch, var(--line) 80%, transparent);border-radius:14px;padding:14px 16px;box-shadow:var(--shadow-lg);transition:transform 260ms cubic-bezier(.2,.7,.2,1),box-shadow 200ms;animation:pxCardIn 800ms cubic-bezier(.2,.7,.2,1) both;overflow:hidden}
        .px-card::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg, rgba(255,255,255,.55), transparent 40%, transparent 60%, rgba(255,255,255,.18));mix-blend-mode:overlay;pointer-events:none;opacity:.7}
        [data-theme="dark"] .px-card::before{background:linear-gradient(135deg, rgba(255,255,255,.18), transparent 40%, transparent 60%, rgba(255,255,255,.06))}
        .px-card.accent{background:linear-gradient(150deg, var(--accent), color-mix(in oklch, var(--accent) 80%, black));color:var(--accent-fg);border-color:color-mix(in oklch, var(--accent) 50%, white);box-shadow:var(--shadow-glow)}
        .px-card.accent::before{background:linear-gradient(135deg, rgba(255,255,255,.4), transparent 50%, transparent 70%, rgba(255,255,255,.2))}
        .px-card.accent .px-card-sub, .px-card.accent .px-card-delta{color:color-mix(in oklch, var(--accent-fg) 78%, transparent)}
        .px-card.accent .px-card-icon{color:var(--accent-fg)}

        .px-card-head{display:flex;align-items:center;gap:8px;position:relative;z-index:1}
        .px-card-icon{display:inline-flex;color:var(--accent)}
        .px-card-title{font-size:12px;font-weight:600;letter-spacing:-.005em;flex:1}
        .px-card-status{font-family:var(--font-mono);font-size:9px;letter-spacing:.08em;color:#22c55e;display:inline-flex;align-items:center;gap:5px;padding:3px 6px;background:color-mix(in oklch, #22c55e 14%, transparent);border-radius:99px}
        .px-card.accent .px-card-status{color:white;background:rgba(255,255,255,.18)}
        .px-card-pulse{width:5px;height:5px;border-radius:50%;background:currentColor;box-shadow:0 0 0 0 currentColor;animation:pxPulse 1.6s ease-out infinite}
        @keyframes pxPulse{0%{box-shadow:0 0 0 0 currentColor}70%{box-shadow:0 0 0 5px transparent}100%{box-shadow:0 0 0 0 transparent}}

        .px-card-sub{font-size:11.5px;color:var(--fg-3);margin-top:4px;position:relative;z-index:1}
        .px-card-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-top:8px;position:relative;z-index:1}
        .px-card-value{font-family:var(--font-display);font-size:22px;line-height:1;letter-spacing:-.015em}
        .px-card-delta{font-family:var(--font-mono);font-size:10px;color:var(--fg-2);letter-spacing:.02em;text-align:right}

        .px-card-glints{position:absolute;inset:0;background:radial-gradient(circle at 80% 20%, rgba(255,255,255,.18), transparent 40%);pointer-events:none}

        @keyframes pxCardIn{from{opacity:0;transform:translate(-50%,-50%) translateZ(-100px) scale(.9)}}
      `}</style>
    </div>
  );
}

function Spark({ data, accent }) {
  const W = 180, H = 32;
  const max = Math.max(...data), min = Math.min(...data);
  const step = W / (data.length - 1);
  const pts = data.map((v, i) => [i*step, H - 2 - ((v - min) / (max - min || 1)) * (H - 4)]);
  const d = pts.map((p, i) => i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`).join(" ");
  const area = d + ` L${W},${H} L0,${H} Z`;
  const color = accent ? "white" : "var(--accent)";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: 32, marginTop: 8, display: "block", position: "relative", zIndex: 1 }}>
      <path d={area} fill={color} opacity={accent ? "0.22" : "0.14"}/>
      <path d={d} stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ───────────────────────────────────── ORBIT CARDS ───────────────────────────────────── */

function OrbitCards({ pt, t }) {
  // Three rings, each holding modules. Tilted ellipse for solar-system feel.
  const rings = [
    { r: 130, speed: 0.18, items: [{ id: "pos", label: "POS" }, { id: "inventory", label: "Inv" }, { id: "crm", label: "CRM" }] },
    { r: 200, speed: -0.12, items: [{ id: "hr", label: "HR" }, { id: "reports", label: "Reports" }, { id: "erp", label: "ERP" }, { id: "restaurant", label: "Rest OS" }] },
    { r: 270, speed: 0.08, items: [{ id: "pharmacy", label: "Pharm" }, { id: "textile", label: "Textile" }, { id: "jewellery", label: "Jewel" }] },
  ];
  const tiltX = -28 + pt.y * 8;
  const tiltY = pt.x * 10;

  return (
    <div className="orb-stage" style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}>
      {/* orbit ellipses */}
      <svg className="orb-paths" viewBox="-320 -320 640 640" aria-hidden="true">
        {rings.map((ring, i) => (
          <ellipse key={i} cx="0" cy="0" rx={ring.r} ry={ring.r}
            fill="none" stroke="currentColor"
            strokeWidth={i === 0 ? "1" : "0.7"}
            strokeOpacity={0.22 - i*0.05}
            strokeDasharray={i === 0 ? "4 4" : i === 1 ? "1 5" : "0.5 7"}/>
        ))}
      </svg>

      {/* pulse dots traveling on each ring */}
      {rings.map((ring, ri) => (
        <div key={`pulse-${ri}`} className="orb-pulse" style={{
          transform: `translate(-50%,-50%) rotate(${t*ring.speed*60}rad)`,
        }}>
          <span style={{ transform: `translateX(${ring.r}px)` }}></span>
        </div>
      ))}

      {/* core */}
      <div className="orb-core" style={{ transform: `translate(-50%,-50%) translateZ(40px)` }}>
        <CoreOrb size={140} t={t}/>
      </div>

      {/* satellites */}
      {rings.map((ring, ri) => ring.items.map((m, i) => {
        const baseAngle = (Math.PI*2 / ring.items.length) * i;
        const angle = baseAngle + t * ring.speed;
        const x = Math.cos(angle) * ring.r;
        const y = Math.sin(angle) * ring.r;
        return (
          <div key={`${ri}-${m.id}`} className="orb-chip" style={{
            transform: `translate(-50%,-50%) translate3d(${x}px, ${y}px, 0)`,
          }}>
            <span className="orb-chip-ic"><ModuleIcon id={m.id} size={12}/></span>
            <span>{m.label}</span>
            <span className="orb-chip-dot"></span>
          </div>
        );
      }))}

      <style>{`
        .orb-stage{position:absolute;inset:0;transform-style:preserve-3d;transition:transform 240ms cubic-bezier(.2,.7,.2,1);display:flex;align-items:center;justify-content:center}
        .orb-paths{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:680px;height:680px;color:color-mix(in oklch, var(--accent) 70%, var(--fg-3))}
        .orb-core{position:absolute;left:50%;top:50%}

        .orb-pulse{position:absolute;left:50%;top:50%;width:0;height:0}
        .orb-pulse span{position:absolute;width:10px;height:10px;border-radius:50%;background:var(--accent);box-shadow:0 0 16px 4px color-mix(in oklch, var(--accent) 50%, transparent);transform-origin:center}

        .orb-chip{position:absolute;left:50%;top:50%;display:inline-flex;align-items:center;gap:8px;padding:7px 12px 7px 9px;background:color-mix(in oklch, var(--surface) 88%, transparent);backdrop-filter:blur(10px);border:1px solid color-mix(in oklch, var(--line) 80%, transparent);border-radius:999px;font-size:11.5px;font-weight:600;white-space:nowrap;color:var(--fg);box-shadow:var(--shadow-md);transition:transform 240ms linear}
        .orb-chip-ic{display:inline-flex;width:18px;height:18px;background:var(--accent-soft);color:var(--accent);border-radius:6px;align-items:center;justify-content:center}
        .orb-chip-dot{width:5px;height:5px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px color-mix(in oklch, #22c55e 18%, transparent)}
      `}</style>
    </div>
  );
}

/* ───────────────────────────────────── CUBE ───────────────────────────────────── */

function CubeViz({ pt, t }) {
  const size = 200;
  const half = size / 2;
  const faces = [
    { face: "front", id: "pos", label: "POS", kpi: "$12.4k", sub: "Today" },
    { face: "back", id: "erp", label: "ERP", kpi: "$4.2M", sub: "AR balance" },
    { face: "right", id: "hr", label: "HR", kpi: "284", sub: "Active staff" },
    { face: "left", id: "crm", label: "CRM", kpi: "24.3k", sub: "Profiles" },
    { face: "top", id: "reports", label: "Reports", kpi: "8 live", sub: "Dashboards" },
    { face: "bottom", id: "inventory", label: "Inventory", kpi: "412", sub: "SKUs" },
  ];

  // Auto-rotate + mouse nudge
  const ry = (t * 12) % 360 + pt.x * 20;
  const rx = -22 + Math.sin(t * 0.3) * 4 + pt.y * -14;

  // Floating chips around
  const chips = [
    { label: "Live sync", x: -52, y: -34, d: 0 },
    { label: "1 graph", x: 48, y: -38, d: 0.5 },
    { label: "SOC 2", x: -56, y: 34, d: 1.0 },
    { label: "120ms", x: 50, y: 38, d: 1.5 },
  ];

  return (
    <div className="cb-stage">
      <div className="cb-floor" style={{ transform: `rotateX(70deg) translateZ(-160px)` }}></div>
      <div className="cb-wrap" style={{ transform: `rotateX(${rx}deg) rotateY(${ry}deg)` }}>
        <div className="cb-glow"></div>
        {faces.map((f) => (
          <div key={f.face} className={`cb-face cf-${f.face}`} style={{
            width: size, height: size,
            transform: cubeFaceTransform(f.face, half),
          }}>
            <div className="cb-face-inner">
              <div className="cb-face-head">
                <span className="cb-face-ic"><ModuleIcon id={f.id} size={16}/></span>
                <span className="cb-face-num">M-{f.face[0].toUpperCase()}</span>
              </div>
              <div className="cb-face-name">{f.label}</div>
              <div className="cb-face-kpi">{f.kpi}</div>
              <div className="cb-face-sub">{f.sub}</div>
              <div className="cb-face-bars">
                {[0.4,0.6,0.85,0.7,0.92,0.55,0.78].map((v, i) => (
                  <span key={i} style={{ height: `${v*100}%` }}></span>
                ))}
              </div>
            </div>
            <div className="cb-face-edge"></div>
          </div>
        ))}
      </div>

      {/* floating chips */}
      {chips.map((c, i) => (
        <div key={i} className="cb-chip" style={{
          left: `calc(50% + ${c.x}%)`, top: `calc(50% + ${c.y}%)`,
          transform: `translate(-50%,-50%) translateY(${Math.sin(t * 0.8 + c.d * 3)*6}px)`,
        }}>
          <span className="cb-chip-d"></span>
          {c.label}
        </div>
      ))}

      <style>{`
        .cb-stage{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;perspective:1400px;perspective-origin:50% 60%}
        .cb-floor{position:absolute;left:50%;top:50%;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle, color-mix(in oklch, var(--accent) 22%, transparent), transparent 60%);transform:translate(-50%,-50%);filter:blur(20px);opacity:.6;transform-origin:center}
        .cb-wrap{position:relative;width:${size}px;height:${size}px;transform-style:preserve-3d;transition:transform 120ms linear}
        .cb-glow{position:absolute;inset:-30%;border-radius:50%;background:radial-gradient(circle, color-mix(in oklch, var(--accent) 28%, transparent), transparent 60%);filter:blur(16px);transform:translateZ(-1px);pointer-events:none;animation:cbHalo 4s ease-in-out infinite}
        @keyframes cbHalo{0%,100%{transform:translateZ(-1px) scale(1);opacity:.7}50%{transform:translateZ(-1px) scale(1.08);opacity:1}}

        .cb-face{position:absolute;left:0;top:0;background:color-mix(in oklch, var(--surface) 70%, transparent);backdrop-filter:blur(14px) saturate(160%);-webkit-backdrop-filter:blur(14px) saturate(160%);border:1px solid color-mix(in oklch, var(--accent) 35%, transparent);box-shadow:inset 0 0 30px -10px color-mix(in oklch, var(--accent) 25%, transparent), 0 30px 60px -20px color-mix(in oklch, var(--accent) 40%, transparent);overflow:hidden}
        .cb-face::before{content:"";position:absolute;inset:0;background:linear-gradient(135deg, rgba(255,255,255,.35), transparent 50%);pointer-events:none}
        [data-theme="dark"] .cb-face::before{background:linear-gradient(135deg, rgba(255,255,255,.12), transparent 50%)}

        .cb-face-inner{position:absolute;inset:0;padding:18px 20px;display:flex;flex-direction:column;color:var(--fg)}
        .cb-face-head{display:flex;justify-content:space-between;align-items:center}
        .cb-face-ic{display:inline-flex;width:28px;height:28px;border-radius:8px;background:var(--accent-soft);color:var(--accent);align-items:center;justify-content:center}
        .cb-face-num{font-family:var(--font-mono);font-size:10px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em}
        .cb-face-name{font-family:var(--font-display);font-style:italic;font-size:32px;line-height:1;letter-spacing:-.02em;margin-top:10px}
        .cb-face-kpi{font-family:var(--font-display);font-size:24px;line-height:1;letter-spacing:-.02em;color:var(--accent);margin-top:14px}
        .cb-face-sub{font-family:var(--font-mono);font-size:10px;color:var(--fg-3);text-transform:uppercase;letter-spacing:.08em;margin-top:4px}
        .cb-face-bars{display:flex;align-items:flex-end;gap:3px;height:24px;margin-top:auto}
        .cb-face-bars span{flex:1;background:linear-gradient(180deg, var(--accent), color-mix(in oklch, var(--accent) 50%, transparent));border-radius:1px}

        .cb-chip{position:absolute;display:inline-flex;align-items:center;gap:6px;padding:5px 10px 5px 8px;background:var(--surface);border:1px solid var(--line);border-radius:99px;font-family:var(--font-mono);font-size:10px;letter-spacing:.06em;color:var(--fg-2);box-shadow:var(--shadow-sm);text-transform:uppercase;z-index:5}
        .cb-chip-d{width:5px;height:5px;border-radius:50%;background:var(--accent);box-shadow:0 0 0 3px color-mix(in oklch, var(--accent) 18%, transparent)}
      `}</style>
    </div>
  );
}

function cubeFaceTransform(face, half) {
  switch (face) {
    case "front":  return `translateZ(${half}px)`;
    case "back":   return `rotateY(180deg) translateZ(${half}px)`;
    case "right":  return `rotateY(90deg) translateZ(${half}px)`;
    case "left":   return `rotateY(-90deg) translateZ(${half}px)`;
    case "top":    return `rotateX(90deg) translateZ(${half}px)`;
    case "bottom": return `rotateX(-90deg) translateZ(${half}px)`;
    default: return "";
  }
}

/* ───────────────────────────────────── NODE GRAPH ───────────────────────────────────── */

function NodeGraph({ pt, t }) {
  const nodes = [
    { id: "pos", x: 22, y: 30, label: "POS" },
    { id: "erp", x: 76, y: 22, label: "ERP" },
    { id: "inventory", x: 84, y: 64, label: "Inventory" },
    { id: "crm", x: 18, y: 72, label: "CRM" },
    { id: "hr", x: 50, y: 88, label: "HR" },
    { id: "reports", x: 50, y: 50, label: "Reports", core: true },
  ];
  const edges = [
    ["pos","reports"], ["erp","reports"], ["inventory","reports"], ["crm","reports"], ["hr","reports"],
    ["pos","inventory"], ["erp","inventory"], ["crm","hr"],
  ];
  const byId = Object.fromEntries(nodes.map(n => [n.id, n]));

  // Container tilt
  const tiltX = pt.y * -6;
  const tiltY = pt.x * 8;

  return (
    <div className="ng-stage" style={{ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)` }}>
      {/* edges + flow */}
      <svg className="ng-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <radialGradient id="ng-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
          </radialGradient>
        </defs>
        {edges.map((e, i) => {
          const a = byId[e[0]], b = byId[e[1]];
          // curved bezier
          const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
          const dx = b.x - a.x, dy = b.y - a.y;
          const nx = -dy, ny = dx;
          const len = Math.sqrt(nx*nx + ny*ny) || 1;
          const cx = mx + (nx/len) * 10, cy = my + (ny/len) * 10;
          const d = `M ${a.x},${a.y} Q ${cx},${cy} ${b.x},${b.y}`;
          return (
            <g key={i}>
              <path d={d} stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.18" fill="none"/>
              <path d={d} stroke="currentColor" strokeOpacity="0.85" strokeWidth="0.22" fill="none"
                strokeDasharray="0.8 60" strokeLinecap="round"
                style={{ animation: `ngFlow 4s linear ${i * 0.35}s infinite` }}/>
            </g>
          );
        })}
      </svg>

      {nodes.map((n, i) => (
        <div key={n.id} className={`ng-node ${n.core ? "core" : ""}`} style={{
          left: `${n.x}%`, top: `${n.y}%`,
          transform: `translate(-50%,-50%) translate3d(${pt.x*18}px, ${pt.y*18}px, ${n.core ? 30 : 10}px) translateY(${Math.sin(t*0.8 + i)*4}px)`
        }}>
          {n.core ? (
            <>
              <div className="ng-core-orb"><CoreOrb size={84} label={false} t={t}/></div>
              <div className="ng-core-label">
                <div className="ng-core-l-k">{n.label}</div>
                <div className="ng-core-l-v">Operational Graph</div>
              </div>
            </>
          ) : (
            <>
              <div className="ng-node-ic"><ModuleIcon id={n.id} size={16}/></div>
              <div className="ng-node-label">
                <div className="ng-node-l-n">{n.label}</div>
                <div className="ng-node-l-s">
                  <span className="ng-node-l-dot"></span>
                  live
                </div>
              </div>
            </>
          )}
        </div>
      ))}

      <style>{`
        .ng-stage{position:absolute;inset:0;transform-style:preserve-3d;color:color-mix(in oklch, var(--accent) 60%, var(--fg-3))}
        .ng-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}
        @keyframes ngFlow{from{stroke-dashoffset:0}to{stroke-dashoffset:-60.8}}

        .ng-node{position:absolute;display:flex;align-items:center;gap:10px;transition:transform 180ms ease-out}
        .ng-node-ic{width:38px;height:38px;border-radius:12px;background:var(--surface);border:1px solid color-mix(in oklch, var(--accent) 35%, var(--line));color:var(--accent);display:inline-flex;align-items:center;justify-content:center;box-shadow:0 8px 24px -6px color-mix(in oklch, var(--accent) 45%, transparent), inset 0 -4px 8px -2px color-mix(in oklch, var(--accent) 16%, transparent)}
        .ng-node-label{background:var(--surface);border:1px solid var(--line);border-radius:10px;padding:6px 10px;box-shadow:var(--shadow-sm)}
        .ng-node-l-n{font-size:12px;font-weight:600;letter-spacing:-.005em}
        .ng-node-l-s{font-family:var(--font-mono);font-size:9.5px;letter-spacing:.08em;color:var(--fg-3);text-transform:uppercase;margin-top:1px;display:flex;align-items:center;gap:4px}
        .ng-node-l-dot{width:5px;height:5px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 3px color-mix(in oklch, #22c55e 18%, transparent)}

        .ng-node.core{flex-direction:column;align-items:center;gap:6px}
        .ng-core-label{text-align:center;background:var(--surface);border:1px solid var(--line);border-radius:99px;padding:5px 14px;font-family:var(--font-display);font-style:italic;font-size:14px;line-height:1.1;letter-spacing:-.01em;box-shadow:var(--shadow-md)}
        .ng-core-l-k{font-family:var(--font-display);font-style:italic;font-size:16px}
        .ng-core-l-v{font-family:var(--font-mono);font-size:9px;text-transform:uppercase;letter-spacing:.08em;color:var(--fg-3);font-style:normal;margin-top:1px}
      `}</style>
    </div>
  );
}

export { EcosystemVisual };
