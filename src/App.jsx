import React, { useState, useEffect } from "react";

import { useReveal, MODULES } from "./data.jsx";
import { Nav, Hero } from "./NavHero.jsx";
import { AIRecommendation, Industries } from "./AIIndustries.jsx";
import { EcosystemSection, Modules, DashboardPreview } from "./ModulesDashboards.jsx";
import { Pricing, About, Forms, Footer } from "./PricingAboutForms.jsx";
import {
  TweaksPanel, useTweaks,
  TweakSection, TweakColor, TweakToggle, TweakSelect, TweakText,
} from "./Tweaks.jsx";

const TWEAK_DEFAULTS = {
  accentSwatch: "#6366f1",
  dark: false,
  ecosystem: "parallax",
  headline: "The operating system for |real businesses.|",
  tagline:
    "AI-guided business software for POS, ERP, HR, and industry operations — composable for restaurants, pharmacies, retail and the multi-entity groups behind them.",
  typography: "instrument-geist",
  moduleSet: "all",
};

const ACCENT_HEX_TO_HUE = {
  "#6366f1": 270, // Indigo
  "#0ea5a4": 195, // Teal
  "#10b981": 155, // Emerald
  "#f59e0b": 55,  // Amber
  "#f43f5e": 15,  // Rose
};

const TYPOGRAPHY = {
  "instrument-geist": {
    label: "Instrument · Geist",
    display: '"Instrument Serif", "Iowan Old Style", Georgia, serif',
    sans: '"Geist", ui-sans-serif, system-ui, -apple-system, sans-serif',
    mono: '"Geist Mono", ui-monospace, "SF Mono", Menlo, monospace',
  },
  "spectral-manrope": {
    label: "Spectral · Manrope",
    display: '"Spectral", "Iowan Old Style", Georgia, serif',
    sans: '"Manrope", ui-sans-serif, system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
  },
  "newsreader-mono": {
    label: "Newsreader · DM Sans",
    display: '"Newsreader", "Iowan Old Style", Georgia, serif',
    sans: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
    mono: '"DM Mono", ui-monospace, monospace',
  },
};

const MODULE_SETS = {
  all: { label: "All 10 modules", ids: null },
  retail: { label: "Retail essentials", ids: ["pos","inventory","crm","hr","reports","restaurant","jewellery"] },
  enterprise: { label: "Enterprise focus", ids: ["erp","hr","crm","reports","inventory","pos"] },
  vertical: { label: "Vertical OSes only", ids: ["restaurant","pharmacy","textile","jewellery"] },
};

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [trigger, setTrigger] = useState({ q: "", k: 0 });
  useReveal();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.dark ? "dark" : "light");
    const hue = ACCENT_HEX_TO_HUE[t.accentSwatch] ?? 270;
    root.style.setProperty("--accent-h", String(hue));
    const typo = TYPOGRAPHY[t.typography] || TYPOGRAPHY["instrument-geist"];
    root.style.setProperty("--font-display", typo.display);
    root.style.setProperty("--font-sans", typo.sans);
    root.style.setProperty("--font-mono", typo.mono);
  }, [t.dark, t.accentSwatch, t.typography]);

  function onAsk(q) {
    setTrigger({ q, k: trigger.k + 1 });
    setTimeout(() => {
      const el = document.getElementById("ai");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
    }, 80);
  }

  function jumpToDemo() {
    const el = document.getElementById("contact");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 60, behavior: "smooth" });
  }

  const modulePool = MODULE_SETS[t.moduleSet]?.ids || null;

  return (
    <>
      <Nav onCta={jumpToDemo} dark={t.dark} setDark={(v) => setTweak("dark", v)} />
      <Hero
        headline={t.headline}
        tagline={t.tagline}
        ecosystem={t.ecosystem}
        onAsk={onAsk}
      />
      <AIRecommendation trigger={trigger} />
      <Industries />
      <EcosystemSection ecosystem={t.ecosystem} />
      <Modules pool={modulePool} />
      <DashboardPreview />
      <Pricing />
      <About />
      <Forms />
      <Footer />

      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={t.accentSwatch}
          options={Object.keys(ACCENT_HEX_TO_HUE)}
          onChange={(v) => setTweak("accentSwatch", v)}
        />
        <TweakToggle
          label="Dark mode"
          value={t.dark}
          onChange={(v) => setTweak("dark", v)}
        />

        <TweakSection label="Hero" />
        <TweakText
          label="Headline"
          placeholder="before|italic|after"
          value={t.headline}
          onChange={(v) => setTweak("headline", v)}
        />
        <TweakText
          label="Tagline"
          multiline
          value={t.tagline}
          onChange={(v) => setTweak("tagline", v)}
        />

        <TweakSection label="Ecosystem visual" />
        <TweakSelect
          label="3D centerpiece"
          value={t.ecosystem}
          options={[
            { value: "parallax", label: "Parallax cards" },
            { value: "orbit", label: "Orbiting modules" },
            { value: "cube", label: "3D cube" },
            { value: "graph", label: "Node graph" },
          ]}
          onChange={(v) => setTweak("ecosystem", v)}
        />

        <TweakSection label="Content" />
        <TweakSelect
          label="Module set"
          value={t.moduleSet}
          options={Object.entries(MODULE_SETS).map(([k, v]) => ({ value: k, label: v.label }))}
          onChange={(v) => setTweak("moduleSet", v)}
        />

        <TweakSection label="Typography" />
        <TweakSelect
          label="Type pairing"
          value={t.typography}
          options={Object.entries(TYPOGRAPHY).map(([k, v]) => ({ value: k, label: v.label }))}
          onChange={(v) => setTweak("typography", v)}
        />
      </TweaksPanel>
    </>
  );
}
