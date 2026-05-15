import React, { useState, useEffect, useRef } from "react";

// Standalone Tweaks panel for the React app.
// Persists state to localStorage. Toggled by a floating "Customize" button.

const STORAGE_KEY = "__neirah_tweaks";

export function useTweaks(defaults) {
  const [state, setState] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return { ...defaults, ...(stored || {}) };
    } catch {
      return defaults;
    }
  });

  const setTweak = (key, value) => {
    setState((s) => {
      const next = typeof key === "object" && key !== null
        ? { ...s, ...key }
        : { ...s, [key]: value };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  return [state, setTweak];
}

export function TweaksPanel({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <>
      <button
        type="button"
        className="twk-fab"
        onClick={() => setOpen((o) => !o)}
        aria-label="Customize"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      {open && (
        <div className="twk-panel" role="dialog">
          <div className="twk-hd">
            <b>Tweaks</b>
            <button className="twk-x" onClick={() => setOpen(false)} aria-label="Close">×</button>
          </div>
          <div className="twk-body">{children}</div>
        </div>
      )}

      <style>{`
        .twk-fab{position:fixed;right:20px;bottom:20px;width:48px;height:48px;border-radius:999px;background:var(--fg);color:var(--bg);border:0;display:inline-flex;align-items:center;justify-content:center;box-shadow:0 10px 30px -10px rgba(0,0,0,.4);z-index:9998;cursor:pointer;transition:transform 160ms ease, background 160ms}
        .twk-fab:hover{transform:scale(1.05) rotate(45deg);background:var(--accent)}
        .twk-panel{position:fixed;right:20px;bottom:80px;z-index:9999;width:300px;max-height:calc(100vh - 120px);display:flex;flex-direction:column;background:var(--surface);color:var(--fg);border:1px solid var(--line);border-radius:16px;box-shadow:0 24px 60px -20px rgba(0,0,0,.3);overflow:hidden;animation:twkIn 220ms cubic-bezier(.2,.7,.2,1)}
        @keyframes twkIn{from{opacity:0;transform:translateY(10px)}}
        .twk-hd{display:flex;align-items:center;justify-content:space-between;padding:14px 14px 10px 16px;border-bottom:1px solid var(--line)}
        .twk-hd b{font-size:13px;font-weight:600;letter-spacing:.01em}
        .twk-x{appearance:none;border:0;background:transparent;color:var(--fg-3);width:24px;height:24px;border-radius:6px;cursor:pointer;font-size:18px;line-height:1}
        .twk-x:hover{background:var(--surface-2);color:var(--fg)}
        .twk-body{padding:6px 14px 16px;display:flex;flex-direction:column;gap:10px;overflow-y:auto}

        .twk-sect{font-family:var(--font-mono);font-size:10px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--fg-3);margin:10px 0 0 2px}
        .twk-row{display:flex;flex-direction:column;gap:6px}
        .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
        .twk-lbl{font-size:12px;color:var(--fg-2);font-weight:500}

        .twk-field{width:100%;background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:7px 10px;color:var(--fg);font-size:12.5px;outline:none;font-family:inherit}
        .twk-field:focus{border-color:var(--accent);box-shadow:0 0 0 2px var(--ring)}

        .twk-toggle{position:relative;width:36px;height:20px;border-radius:999px;background:var(--line-2);border:0;cursor:pointer;transition:background 160ms}
        .twk-toggle[data-on="1"]{background:var(--accent)}
        .twk-toggle::after{content:"";position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:white;transition:transform 160ms;box-shadow:0 1px 2px rgba(0,0,0,.2)}
        .twk-toggle[data-on="1"]::after{transform:translateX(16px)}

        .twk-swatches{display:flex;gap:6px;flex-wrap:wrap}
        .twk-sw{width:26px;height:26px;border-radius:8px;border:2px solid transparent;cursor:pointer;transition:transform 120ms, border-color 160ms}
        .twk-sw:hover{transform:scale(1.05)}
        .twk-sw[data-on="1"]{border-color:var(--fg)}
      `}</style>
    </>
  );
}

export function TweakSection({ label }) {
  return <div className="twk-sect">{label}</div>;
}

export function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <span className="twk-lbl">{label}</span>
      <button
        type="button"
        className="twk-toggle"
        data-on={value ? "1" : "0"}
        onClick={() => onChange(!value)}
        aria-pressed={value}
      />
    </div>
  );
}

export function TweakSelect({ label, value, options, onChange }) {
  return (
    <div className="twk-row">
      <span className="twk-lbl">{label}</span>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === "object" ? o.value : o;
          const l = typeof o === "object" ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </div>
  );
}

export function TweakText({ label, value, placeholder, onChange, multiline = false }) {
  return (
    <div className="twk-row">
      <span className="twk-lbl">{label}</span>
      {multiline ? (
        <textarea className="twk-field" rows="3" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} style={{ resize: "vertical", fontFamily: "inherit" }}/>
      ) : (
        <input className="twk-field" type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function TweakColor({ label, value, options, onChange }) {
  return (
    <div className="twk-row">
      <span className="twk-lbl">{label}</span>
      <div className="twk-swatches">
        {options.map((hex) => (
          <button
            key={hex}
            type="button"
            className="twk-sw"
            data-on={value === hex ? "1" : "0"}
            style={{ background: hex }}
            onClick={() => onChange(hex)}
            aria-label={hex}
          />
        ))}
      </div>
    </div>
  );
}
