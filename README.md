# Neirah SaaS Ecosystem — React App

An AI-guided business software landing page built with **React 18 + Vite**.

Showcases POS, ERP, HR & Payroll, Inventory, CRM, Restaurant OS, Pharmacy OS, Textile SaaS and Jewellery POS modules — with an AI-style recommendation flow, industry selector, interactive demo dashboards, and four animated 3D centerpiece variants.

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server (auto-opens http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview the production build locally
npm run preview
```

> Requires **Node.js 18+** and npm (or pnpm/yarn).

## Project structure

```
neirah-react/
├── index.html               # Vite entry — loads /src/main.jsx
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx             # React root
    ├── App.jsx              # App composition + Tweaks state
    ├── styles.css           # Design tokens, base, utilities
    ├── data.jsx             # Modules + industries data + ModuleIcon + useReveal
    ├── NavHero.jsx          # Nav, Hero, Wordmark, NeirahMark
    ├── EcosystemVisual.jsx  # 4 animated 3D centerpiece variants
    ├── AIIndustries.jsx     # AI recommendation chat + Industry selector
    ├── ModulesDashboards.jsx# Module explorer + drawer + Dashboard preview
    ├── PricingAboutForms.jsx# Pricing, About, Demo + Contact forms, Footer
    └── Tweaks.jsx           # Live customization panel (theme, fonts, etc.)
```

## Features

- **Hero** with AI input + quick-pick chips, parallax 3D ecosystem visual.
- **AI Match** — frontend-only recommendation that maps free-text business descriptions to module stacks (8 verticals).
- **Industry selector** — Restaurant, Pharmacy, Textile, Retail, Enterprise, Jewellery, Salon, Logistics.
- **3D Ecosystem section** with 4 toggleable variants:
  - Parallax floating cards with SVG connection lines
  - Orbiting modules around a glossy core
  - Rotating 3D cube with module KPIs on each face
  - Animated node graph with bezier edges + flow pulses
- **Module explorer** — 10 modules with side-drawer modal for details.
- **Interactive dashboards** — Restaurant / Pharmacy / Textile / Retail dashboards with KPIs, area chart, donut chart, activity table.
- **Pricing** — 3 tiers (Starter / Business / Enterprise).
- **Demo request + Contact forms** — Client-side validation, success states.
- **Tweaks panel** (bottom-right gear button) — switch accent color, dark mode, 3D variant, headline/tagline, module set, typography pairing. Persists to localStorage.

## Tech stack

- **React 18** (functional components, hooks)
- **Vite 5** (dev server + production bundler)
- **Pure CSS** for design tokens — no Tailwind, no CSS-in-JS library; component-scoped styles via `<style>` tags.
- **SVG charts** — no chart library, all drawn by hand.
- **Google Fonts** — Instrument Serif, Geist, Spectral, Newsreader, Manrope, DM Sans, JetBrains Mono, Geist Mono, DM Mono.

## Deployment

```bash
npm run build
```

Outputs a static site to `dist/` — deploy to Vercel, Netlify, Cloudflare Pages, GitHub Pages, S3, or any static host.

**Vercel:** push to GitHub → import repo → defaults work.
**Netlify:** push to GitHub → "New site from Git" → build command `npm run build`, publish directory `dist`.

## Customization

- **Colors / theme** — edit CSS variables in `src/styles.css` (top of file).
- **Modules / industries** — edit data arrays in `src/data.jsx`.
- **AI recommendation logic** — edit `aiRecommend()` in `src/AIIndustries.jsx`.
- **Dashboards** — edit `DASHBOARDS` constant in `src/ModulesDashboards.jsx`.

## License

For evaluation / internal use.
