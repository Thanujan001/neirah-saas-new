import React from "react";
// Neirah SaaS — shared data + small helpers
// Exposes everything on window for cross-script availability.

const MODULES = [
  {
    id: "pos",
    name: "POS",
    full: "Point of Sale",
    icon: "pos",
    blurb: "Lightning-fast checkout with offline-first sync, split tenders, and unified receipts.",
    industries: ["Retail", "Restaurant", "Pharmacy", "Jewellery", "Salon"],
    features: ["Offline-first sync", "Split payments + tipping", "Hardware-agnostic", "Touch + barcode UI"],
  },
  {
    id: "erp",
    name: "ERP",
    full: "Enterprise Resource Planning",
    icon: "erp",
    blurb: "Finance, procurement, manufacturing and supply chain on one operational graph.",
    industries: ["Enterprise", "Textile", "Logistics", "Retail"],
    features: ["General ledger + AP/AR", "Procure-to-pay", "Multi-entity consolidation", "Approvals workflow"],
  },
  {
    id: "hr",
    name: "HR & Payroll",
    full: "Workforce + Payroll",
    icon: "hr",
    blurb: "Hire, schedule, run payroll and stay compliant — across countries and currencies.",
    industries: ["Enterprise", "Retail", "Restaurant", "Salon", "Logistics"],
    features: ["Shift scheduling", "Multi-country payroll", "Self-service portal", "Tax + compliance"],
  },
  {
    id: "inventory",
    name: "Inventory",
    full: "Inventory Management",
    icon: "inventory",
    blurb: "Real-time stock across warehouses, branches and channels with batch + expiry control.",
    industries: ["Retail", "Pharmacy", "Textile", "Jewellery", "Logistics"],
    features: ["Batch + serial tracking", "Multi-warehouse", "Auto-reorder rules", "Cycle counting"],
  },
  {
    id: "crm",
    name: "CRM",
    full: "Customer Relationships",
    icon: "crm",
    blurb: "Unified customer profiles, segmentation, loyalty and outbound — built on first-party data.",
    industries: ["Retail", "Salon", "Restaurant", "Jewellery", "Enterprise"],
    features: ["360° profiles", "Segments + loyalty", "Campaigns (SMS/Email)", "Activity timeline"],
  },
  {
    id: "reports",
    name: "Reports",
    full: "Analytics & Reports",
    icon: "reports",
    blurb: "From operating dashboards to board-ready exports — every metric, one query language.",
    industries: ["All"],
    features: ["Live dashboards", "Scheduled exports", "Custom KPIs", "Drill-down explorer"],
  },
  {
    id: "restaurant",
    name: "Restaurant OS",
    full: "Restaurant Operations",
    icon: "restaurant",
    blurb: "Table-side ordering, kitchen routing, recipe costing and delivery, all stitched together.",
    industries: ["Restaurant"],
    features: ["KDS + routing", "Table management", "Recipe + plate cost", "Aggregator sync"],
  },
  {
    id: "pharmacy",
    name: "Pharmacy OS",
    full: "Pharmacy Operations",
    icon: "pharmacy",
    blurb: "Batch-aware dispensing, expiry alerts, prescription workflows and supplier ledgers.",
    industries: ["Pharmacy"],
    features: ["Batch + expiry control", "Prescription workflow", "Insurance claims", "Schedule-drug audit"],
  },
  {
    id: "textile",
    name: "Textile SaaS",
    full: "Textile Operations",
    icon: "textile",
    blurb: "Bolt, meter and roll-aware inventory with cut-plan, production and customer orders.",
    industries: ["Textile"],
    features: ["Bolt/meter inventory", "Cut planning", "Production tracking", "Wholesale + retail"],
  },
  {
    id: "jewellery",
    name: "Jewellery POS",
    full: "Jewellery Operations",
    icon: "jewellery",
    blurb: "Karat-aware pricing, gold-rate sync, certification, repair orders and exchange management.",
    industries: ["Jewellery"],
    features: ["Live gold-rate pricing", "Karat + purity", "Repair + exchange", "Certificate vault"],
  },
];

const INDUSTRIES = [
  { id: "restaurant", name: "Restaurant", desc: "Cafés, QSR, fine dining, cloud kitchens",
    modules: ["restaurant", "pos", "inventory", "hr", "reports"],
    metric: "—12% food cost" },
  { id: "pharmacy", name: "Pharmacy", desc: "Retail, hospital, chain pharmacies",
    modules: ["pharmacy", "pos", "inventory", "crm", "reports"],
    metric: "Zero expiry loss" },
  { id: "textile", name: "Textile", desc: "Wholesalers, mills, garment houses",
    modules: ["textile", "erp", "inventory", "crm", "reports"],
    metric: "3.4× faster cut-plan" },
  { id: "retail", name: "Retail", desc: "Single-store and multi-branch chains",
    modules: ["pos", "inventory", "crm", "hr", "reports"],
    metric: "+18% basket size" },
  { id: "enterprise", name: "Enterprise", desc: "Multi-entity groups and holdings",
    modules: ["erp", "hr", "crm", "reports"],
    metric: "1 ledger of truth" },
  { id: "jewellery", name: "Jewellery", desc: "Karat-aware retail and ateliers",
    modules: ["jewellery", "pos", "inventory", "crm"],
    metric: "Live gold-rate" },
  { id: "salon", name: "Salon & Spa", desc: "Bookings, packages, retail",
    modules: ["pos", "crm", "hr", "reports"],
    metric: "92% rebook rate" },
  { id: "logistics", name: "Logistics", desc: "3PL, fleet, distribution",
    modules: ["erp", "inventory", "hr", "reports"],
    metric: "—22% empty miles" },
];

// Reveal-on-scroll helper
function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Inline icon set — kept simple/geometric to match aesthetic.
function ModuleIcon({ id, size = 22 }) {
  const s = size;
  const stroke = "currentColor";
  const sw = 1.5;
  const common = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (id) {
    case "pos": return (
      <svg {...common}><rect x="3" y="5" width="18" height="11" rx="2"/><path d="M7 20h10"/><path d="M12 16v4"/><path d="M7 9h6"/></svg>
    );
    case "erp": return (
      <svg {...common}><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
    );
    case "hr": return (
      <svg {...common}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20c.6-3 3-4.6 5.5-4.6S14 17 14.6 20"/><circle cx="17" cy="10" r="2.4"/><path d="M14.5 20c.3-1.8 1.5-2.9 2.8-2.9 1 0 1.9.6 2.4 1.6"/></svg>
    );
    case "inventory": return (
      <svg {...common}><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>
    );
    case "crm": return (
      <svg {...common}><circle cx="12" cy="9" r="3.4"/><path d="M5 20c1-3.5 3.7-5.4 7-5.4S18 16.5 19 20"/><path d="M18 5l1.4 1.4M5 5L3.6 6.4"/></svg>
    );
    case "reports": return (
      <svg {...common}><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>
    );
    case "restaurant": return (
      <svg {...common}><path d="M6 3v8c0 1.1.9 2 2 2h0v8"/><path d="M10 3v8M6 7h4"/><path d="M16 14c0-5 2-9 4-9v16"/></svg>
    );
    case "pharmacy": return (
      <svg {...common}><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 12v6M9 15h6"/><path d="M7 9V6a2 2 0 012-2h6a2 2 0 012 2v3"/></svg>
    );
    case "textile": return (
      <svg {...common}><path d="M4 4l16 16"/><path d="M9 4l11 11"/><path d="M14 4l6 6"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>
    );
    case "jewellery": return (
      <svg {...common}><path d="M6 9l3-5h6l3 5-6 11z"/><path d="M6 9h12M10 9l2 11M14 9l-2 11"/></svg>
    );
    default: return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>;
  }
}

export { MODULES, INDUSTRIES, useReveal, ModuleIcon };
