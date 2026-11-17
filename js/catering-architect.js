const OCCASIONS = [
  { id: "nikah", label: "Nikah / Wedding Dawat" },
  { id: "family", label: "Family Gathering" },
  { id: "corporate", label: "Corporate / Cafe Launch" },
  { id: "iftar", label: "Masjid / Community Iftar" },
];

const PROTEINS = [
  { id: "chicken-goat", label: "Chicken & Goat Classic" },
  { id: "all-chicken", label: "All-Chicken Crowd Pleaser" },
  { id: "beef-goat", label: "Beef Nihari & Goat Royal" },
  { id: "veg-forward", label: "Vegetarian-Forward" },
];

const GUEST_PRESETS = [
  { guests: 20, label: "20 Family" },
  { guests: 40, label: "40 Dawat" },
  { guests: 100, label: "100 Banquet" },
  { guests: 150, label: "150 Gala" },
];

function rangePercent(val) {
  const clamped = Math.min(250, Math.max(15, Number(val) || 40));
  return ((clamped - 15) / (250 - 15)) * 100;
}

const SAFE_GRAZING_PHOTOS = {
  "pipette-chaat": "./assets/originals/pipette-chaat-tiers.jpg",
  "croissant-sliders": "./assets/originals/hero-grazing-sliders.jpg",
  "samosa-flight": "./assets/originals/dawat-samosa-kebab-buffet.jpg",
  "samosa-spring-flight": "./assets/originals/dawat-samosa-kebab-buffet.jpg",
  "halal-charcuterie": "./assets/originals/charcuterie-orchard-table.jpg",
  "kheer-parfait": "./assets/originals/parfait-mimosa-grazing.jpg",
  "kheer-parfait-cups": "./assets/originals/parfait-mimosa-grazing.jpg",
  "weekly-tiffin-addon": "./assets/originals/dawat-samosa-kebab-buffet.jpg",
  "floral-styling": "./assets/originals/hero-grazing-sliders.jpg",
};

const TIER_PREVIEW_PHOTOS = {
  "petite-table": {
    src: "./assets/originals/parfait-mimosa-grazing.jpg",
    alt: "RubzzKitchen petite grazing installation with dessert parfaits and mocktail flutes",
  },
  "signature-grazing": {
    src: "./assets/originals/hero-grazing-sliders.jpg",
    alt: "RubzzKitchen signature grazing installation with brioche sliders and croissants",
  },
  "grand-gala-installation": {
    src: "./assets/originals/charcuterie-orchard-table.jpg",
    alt: "RubzzKitchen grand gala halal charcuterie and orchard grazing spread",
  },
};

function resolveSafeGrazingSrc(rawSrc, idHint) {
  if (typeof rawSrc === "string" && rawSrc.includes("./assets/originals/")) {
    return rawSrc;
  }
  return SAFE_GRAZING_PHOTOS[idHint] || "./assets/originals/hero-grazing-sliders.jpg";
}

function resolveEl(target) {
  if (!target) return null;
  if (typeof target === "string") return document.querySelector(target);
  return target;
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatMoney(num) {
  const val = Number(num);
  if (!Number.isFinite(val)) return "Custom Quote";
  return "$" + val.toLocaleString("en-US", {
    minimumFractionDigits: val % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

function injectArchitectStyles() {
  if (document.getElementById("rk-architect-styles")) return;
  const style = document.createElement("style");
  style.id = "rk-architect-styles";
  style.textContent = `
    .rk-arch-panel {
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-1-surface, #161310);
      font-family: var(--font-sans, sans-serif);
      font-variant-numeric: tabular-nums lining-nums;
      box-shadow: var(--specular-top, inset 0 1px 0 rgba(212, 168, 106, 0.2));
    }
    .rk-arch-head {
      padding: 28px 28px 20px;
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
    }
    .rk-arch-eyebrow {
      display: block;
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent-brass, #d4a86a);
      margin-bottom: 8px;
    }
    .rk-arch-title {
      margin: 0;
      font-family: var(--font-display, Georgia, serif);
      font-size: clamp(1.75rem, 3vw, 2.35rem);
      font-weight: 400;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-arch-sub {
      margin: 0;
      max-width: 46ch;
      color: var(--ink-secondary, #c6bcb0);
      font-size: 0.9rem;
      line-height: 1.5;
    }
    .rk-arch-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
    .rk-arch-col-left {
      grid-column: span 6;
      padding: 26px 28px;
      border-right: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .rk-arch-col-right {
      grid-column: span 6;
      padding: 26px 28px;
      background: var(--plane-2-card, #1d1916);
      display: flex;
      flex-direction: column;
      gap: 18px;
    }
    .rk-guest-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }
    .rk-guest-readout {
      font-family: var(--font-display, Georgia, serif);
      font-size: 2rem;
      color: var(--accent-brass, #d4a86a);
      line-height: 1;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-range {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
      height: 6px;
      margin: 8px 0 0;
      border-radius: 0px;
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: linear-gradient(
        to right,
        var(--accent-brass, #d4a86a) 0%,
        var(--accent-brass, #d4a86a) var(--range-pct, 10.64%),
        var(--plane-3-elevated, #25201c) var(--range-pct, 10.64%),
        var(--plane-3-elevated, #25201c) 100%
      );
      accent-color: var(--accent-brass, #d4a86a);
      cursor: pointer;
    }
    .rk-range::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 18px;
      height: 18px;
      background: var(--accent-brass, #d4a86a);
      border: 2px solid var(--plane-0-void, #0a0807);
      border-radius: 0px;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-range::-webkit-slider-thumb:hover {
      background: var(--accent-brass-hover, #e2b87d);
      transform: scale(1.08);
    }
    .rk-range::-moz-range-thumb {
      width: 18px;
      height: 18px;
      background: var(--accent-brass, #d4a86a);
      border: 2px solid var(--plane-0-void, #0a0807);
      border-radius: 0px;
      cursor: pointer;
    }
    .rk-range-ticks {
      position: relative;
      height: 20px;
      margin-top: 8px;
      font-size: 0.72rem;
      color: var(--ink-muted, #9a9086);
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-range-ticks span {
      position: absolute;
      top: 0;
      transform: translateX(-50%);
      white-space: nowrap;
    }
    .rk-range-ticks span:first-child {
      left: 0%;
      transform: none;
    }
    .rk-range-ticks span:last-child {
      left: auto;
      right: 0;
      transform: none;
    }
    .rk-preset-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 8px;
      margin-top: 10px;
    }
    .rk-preset-btn {
      min-height: 40px;
      padding: 8px 6px;
      text-align: center;
      background: var(--plane-2-card, #1d1916);
      color: var(--ink-secondary, #c6bcb0);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 500;
      font-variant-numeric: tabular-nums lining-nums;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-preset-btn:hover {
      border-color: var(--accent-brass, #d4a86a);
      color: var(--ink-primary, #f5efe6);
    }
    .rk-preset-btn:active { transform: scale(0.97); }
    .rk-preset-btn[aria-pressed="true"] {
      border-color: var(--accent-brass, #d4a86a);
      background: var(--surface-tint, rgba(212, 168, 106, 0.08));
      color: var(--accent-brass, #d4a86a);
      font-weight: 600;
    }
    .rk-control-label {
      display: block;
      font-size: 0.72rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink-secondary, #c6bcb0);
      margin-bottom: 10px;
    }
    .rk-opt-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .rk-opt-btn {
      min-height: 46px;
      padding: 10px 12px;
      text-align: left;
      background: var(--plane-2-card, #1d1916);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.83rem;
      font-weight: 500;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-opt-btn:hover { border-color: var(--accent-brass, #d4a86a); }
    .rk-opt-btn:active { transform: scale(0.97); }
    .rk-opt-btn[aria-pressed="true"] {
      border-color: var(--accent-brass, #d4a86a);
      background: var(--surface-tint, rgba(212, 168, 106, 0.08));
      color: var(--accent-brass, #d4a86a);
    }
    .rk-arbitrage-box {
      border: 1px solid var(--border-strong, rgba(212, 168, 106, 0.45));
      background: var(--plane-3-elevated, #25201c);
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .rk-arbitrage-toggle {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .rk-bp-list {
      list-style: none;
      margin: 0;
      padding: 0;
      border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-bp-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      padding: 11px 0;
      border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-bp-name {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1rem;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-bp-detail {
      display: block;
      font-size: 0.78rem;
      color: var(--ink-secondary, #c6bcb0);
      margin-top: 2px;
    }
    .rk-bp-price {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1rem;
      color: var(--accent-brass, #d4a86a);
      white-space: nowrap;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-bp-total-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
      gap: 12px;
    }
    .rk-bp-total-bar .rk-btn-primary,
    [data-arch-load] {
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* Grazing Scenography Studio */
    .rk-grz-grid {
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      align-items: stretch;
    }
    .rk-grz-col-left {
      grid-column: span 6;
      padding: 26px 28px;
      border-right: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
    }
    .rk-grz-tier-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .rk-grz-station-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .rk-grz-station-btn {
      padding: 10px 12px;
      min-height: 64px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 3px;
    }
    .rk-grz-tier-note {
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
      padding: 14px 16px;
    }
    .rk-grz-preview {
      grid-column: span 6;
      padding: 26px 28px;
      background: var(--plane-2-card, #1d1916);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 16px;
    }
    .rk-grz-preview-top {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .rk-grz-preview-foot {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .rk-grz-frame {
      position: relative;
      aspect-ratio: 16 / 11;
      overflow: hidden;
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
    }
    .rk-grz-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
    .rk-grz-specs {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 12px;
      border-top: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      padding: 12px 0;
    }
    .rk-grz-spec-label {
      display: block;
      font-size: 0.6875rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink-muted, #9a9086);
      margin-bottom: 3px;
    }
    .rk-grz-spec-val {
      font-family: var(--font-display, Georgia, serif);
      font-size: 0.96rem;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-grz-selected-wrap {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .rk-grz-selected-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .rk-grz-chip {
      font-size: 0.76rem;
      padding: 4px 9px;
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-1-surface, #161310);
      color: var(--ink-secondary, #c6bcb0);
    }
    .rk-grz-cta {
      width: 100%;
    }

    /* Frozen Dozen Stash Box */
    .rk-frz-wrap {
      margin-top: 32px;
    }
    .rk-frz-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .rk-frz-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
      border-right: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-frz-row:nth-child(even) {
      border-right: none;
    }
    .rk-frz-name {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1rem;
      color: var(--ink-primary, #f5efe6);
      margin: 0 0 2px;
    }
    .rk-frz-price {
      font-size: 0.8rem;
      color: var(--accent-brass, #d4a86a);
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-frz-foot {
      padding: 20px 28px;
      background: var(--plane-2-card, #1d1916);
      border-top: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
    }

    @media (max-width: 959px) {
      .rk-arch-col-left,
      .rk-arch-col-right,
      .rk-grz-col-left,
      .rk-grz-preview {
        grid-column: span 12;
        border-right: none;
      }
      .rk-arch-col-left,
      .rk-grz-col-left {
        border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      }
      .rk-frz-grid {
        grid-template-columns: 1fr;
      }
      .rk-frz-row {
        border-right: none;
      }
    }
    @media (max-width: 640px) {
      .rk-arch-head,
      .rk-arch-col-left,
      .rk-arch-col-right,
      .rk-grz-col-left,
      .rk-grz-preview,
      .rk-frz-foot {
        padding: 18px 16px;
      }
      .rk-opt-grid,
      .rk-arbitrage-toggle,
      .rk-grz-tier-grid,
      .rk-grz-station-grid,
      .rk-grz-specs {
        grid-template-columns: 1fr;
      }
      .rk-preset-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
      .rk-frz-row {
        padding: 14px 16px;
      }
    }
    @media (max-width: 560px) {
      .rk-bp-total-bar {
        flex-direction: column;
        align-items: stretch;
      }
      .rk-bp-total-bar .rk-btn-primary,
      [data-arch-load] {
        white-space: normal;
        width: 100%;
      }
    }
  `;
  document.head.appendChild(style);
}

function findMenuItem(menuItems, keywords) {
  for (const kw of keywords) {
    const lower = kw.toLowerCase();
    const hit = menuItems.find(
      (item) =>
        (item.id && item.id.toLowerCase().includes(lower)) ||
        (item.name && item.name.toLowerCase().includes(lower))
    );
    if (hit) return hit;
  }
  return null;
}

function allocateTraysForGuests(item, guestCount, scaleFactor = 1.0) {
  const effectiveGuests = Math.max(10, Math.round(guestCount * scaleFactor));
  const opts = Array.isArray(item.options) ? item.options : [];
  const small = opts[0] || { optionId: "small", label: "Small Tray", price: 80 };
  const large = opts[1] || small;

  const largeCap = 28;
  const smallCap = 14;

  let largeQty = Math.floor(effectiveGuests / largeCap);
  const rem = effectiveGuests - largeQty * largeCap;
  let smallQty = 0;
  if (rem > 0) {
    if (rem <= smallCap && small !== large) {
      smallQty = 1;
    } else {
      largeQty += 1;
    }
  }
  if (largeQty === 0 && smallQty === 0) smallQty = 1;

  const lines = [];
  if (largeQty > 0) {
    lines.push({
      lineId: `${item.id}-${large.optionId || "large"}`,
      title: item.name,
      subtitle: `${large.label}${large.servesText ? ` · ${large.servesText}` : " · Serves 25-30"}`,
      unitPrice: Number(large.price),
      qty: largeQty,
      category: item.categoryId || "entrees",
    });
  }
  if (smallQty > 0) {
    lines.push({
      lineId: `${item.id}-${small.optionId || "small"}`,
      title: item.name,
      subtitle: `${small.label}${small.servesText ? ` · ${small.servesText}` : " · Serves 12-15"}`,
      unitPrice: Number(small.price),
      qty: smallQty,
      category: item.categoryId || "entrees",
    });
  }
  return lines;
}

export function initCateringArchitect({
  mountPortionArchitect,
  mountGrazingStudio,
  mountFrozenBuilder,
  kitchenData,
  bookingController,
}) {
  injectArchitectStyles();

  const archEl = resolveEl(mountPortionArchitect);
  const grazingEl = resolveEl(mountGrazingStudio);
  const frozenEl = resolveEl(mountFrozenBuilder);

  const menuItems = (kitchenData && Array.isArray(kitchenData.MENU_ITEMS)) ? kitchenData.MENU_ITEMS : [];
  const banquetPackages = (kitchenData && Array.isArray(kitchenData.BANQUET_PACKAGES)) ? kitchenData.BANQUET_PACKAGES : [];

  const grazingTiers = (kitchenData && Array.isArray(kitchenData.GRAZING_TIERS) && kitchenData.GRAZING_TIERS.length)
    ? kitchenData.GRAZING_TIERS
    : [
        { id: "petite-table", name: "Petite Grazing Table", guestRange: "15-30 Guests", footprint: "6 ft", setupWindow: "75 min", priceLabel: "Custom Venue Quote" },
        { id: "signature-grazing", name: "Signature Grazing Installation", guestRange: "35-70 Guests", footprint: "8-10 ft", setupWindow: "2 hrs", priceLabel: "Custom Venue Quote" },
        { id: "grand-gala-installation", name: "Grand Gala Architectural Spread", guestRange: "75-150+ Guests", footprint: "12-16 ft", setupWindow: "3 hrs", priceLabel: "Custom Venue Quote" },
      ];

  const grazingStations = (kitchenData && Array.isArray(kitchenData.GRAZING_STATIONS) && kitchenData.GRAZING_STATIONS.length)
    ? kitchenData.GRAZING_STATIONS
    : [
        { id: "pipette-chaat", name: "Pipette Chana Chaat Shooters", detail: "Individual glass cups with tamarind pipettes", previewImage: "./assets/originals/pipette-chaat-tiers.jpg" },
        { id: "croissant-sliders", name: "Flaky Croissant & Brioche Sliders", detail: "Tiered savory cafe sliders & tea sandwiches", previewImage: "./assets/originals/hero-grazing-sliders.jpg" },
        { id: "samosa-flight", name: "Hand-Folded Samosa & Spring Roll Flight", detail: "Crisp zabiha halal pastries & mint chutney", previewImage: "./assets/originals/dawat-samosa-kebab-buffet.jpg" },
        { id: "halal-charcuterie", name: "Halal Charcuterie & Orchard Fruit", detail: "Artisan cheeses, figs, grapes & nuts", previewImage: "./assets/originals/charcuterie-orchard-table.jpg" },
        { id: "kheer-parfait", name: "Individual Kheer & Parfait Cups", detail: "Cardamom rice pudding with pistachio & rose", previewImage: "./assets/originals/parfait-mimosa-grazing.jpg" },
        { id: "floral-styling", name: "Floral, Acrylic Riser & Platter Styling", detail: "Multi-plane white plinth & fresh floral styling", previewImage: "./assets/originals/hero-grazing-sliders.jpg" },
      ];

  const frozenItems = menuItems.filter((item) => item.categoryId === "frozen-dozens");

  /* ---------- A) Portion Architect ---------- */
  const archState = {
    guestCount: 40,
    occasionId: OCCASIONS[0].id,
    proteinId: PROTEINS[0].id,
    preferPackage: true,
  };

  function computeBlueprint() {
    const g = archState.guestCount;
    const isNikah = archState.occasionId === "nikah";
    const isVeg = archState.proteinId === "veg-forward";
    const isAllChicken = archState.proteinId === "all-chicken";
    const isBeefGoat = archState.proteinId === "beef-goat";

    const starter = findMenuItem(menuItems, isNikah || archState.occasionId === "corporate" ? ["Mixed Fried Platter", "Chana Chaat"] : ["Chana Chaat", "Pakora"]);
    const rice = findMenuItem(menuItems, isVeg ? ["Lahori Cholay", "Chicken Biryani"] : isAllChicken ? ["Chicken Biryani"] : ["Goat Biryani", "Chicken Biryani"]);
    const curry = findMenuItem(menuItems, isVeg ? ["Palak Paneer"] : isBeefGoat ? ["Beef Nihari", "Goat Korma"] : isAllChicken ? ["Chicken Korma", "Palak Chicken"] : ["Goat Korma", "Chicken Korma"]);
    const secondary = findMenuItem(menuItems, isVeg ? ["Dahi Bhalla", "Lahori Cholay"] : ["Mix Baked Boneless", "Baked Chicken"]);
    const dessert = findMenuItem(menuItems, isNikah ? ["Matanjan", "Kheer"] : ["Kheer", "Matanjan"]);

    const selectedDishes = [];
    if (starter) selectedDishes.push({ item: starter, scale: 0.75 });
    if (rice) selectedDishes.push({ item: rice, scale: 1.0 });
    if (curry) selectedDishes.push({ item: curry, scale: 0.9 });
    if (secondary) selectedDishes.push({ item: secondary, scale: 0.85 });
    if (dessert) selectedDishes.push({ item: dessert, scale: 0.75 });

    const alaCarteLines = [];
    for (const entry of selectedDishes) {
      const trays = allocateTraysForGuests(entry.item, g, entry.scale);
      alaCarteLines.push(...trays);
    }

    const alaCarteSubtotal = alaCarteLines.reduce((sum, l) => sum + (Number(l.unitPrice) || 0) * l.qty, 0);

    let matchedPackage = null;
    if (g >= 32 && g <= 55) {
      const wantRoyal = isBeefGoat || archState.proteinId === "chicken-goat";
      matchedPackage =
        banquetPackages.find((p) => p.guestCount === 40 && (wantRoyal ? Number(p.price) >= 800 : Number(p.price) < 800)) ||
        banquetPackages.find((p) => p.guestCount === 40) ||
        null;
    } else if (g >= 80 && g <= 120) {
      const wantImperial = isBeefGoat || archState.proteinId === "chicken-goat";
      matchedPackage =
        banquetPackages.find((p) => p.guestCount === 100 && (wantImperial ? Number(p.price) >= 1800 : Number(p.price) < 1800)) ||
        banquetPackages.find((p) => p.guestCount === 100) ||
        null;
    }

    const usingPackage = Boolean(matchedPackage && archState.preferPackage);
    const packageLines = matchedPackage
      ? [
          {
            lineId: `pkg-${matchedPackage.id}`,
            title: matchedPackage.name,
            subtitle: `${matchedPackage.guestCount} Guests · ${matchedPackage.naanIncluded || "Includes Naan, Salad & Chutney"}`,
            unitPrice: Number(matchedPackage.price),
            qty: 1,
            category: "banquet-packages",
          },
        ]
      : [];

    return {
      alaCarteLines,
      alaCarteSubtotal,
      matchedPackage,
      usingPackage,
      activeLines: usingPackage ? packageLines : alaCarteLines,
      activeTotal: usingPackage ? Number(matchedPackage.price) : alaCarteSubtotal,
    };
  }

  function buildBlueprintBodyHtml(bp) {
    let arbitrageHtml = "";
    if (bp.matchedPackage) {
      const pkg = bp.matchedPackage;
      const pkgPrice = Number(pkg.price);
      const originalRef = Number(pkg.originalPrice) || bp.alaCarteSubtotal;
      const savings = Math.max(0, Math.round((bp.alaCarteSubtotal > pkgPrice ? bp.alaCarteSubtotal : originalRef) - pkgPrice));
      arbitrageHtml = `
        <div class="rk-arbitrage-box">
          <div>
            <span class="rk-arch-eyebrow" style="margin-bottom:4px;">Smart Package Comparison · ${pkg.guestCount}-Guest Tier</span>
            <strong style="font-family:var(--font-display); font-size:1.08rem; font-weight:400;">${escapeHtml(pkg.name)} (${escapeHtml(formatMoney(pkgPrice))})</strong>
            <p style="margin:4px 0 0; font-size:0.82rem; color:var(--ink-secondary); line-height:1.45;">
              Includes ${escapeHtml(pkg.naanIncluded || "Naan, Salad & Green Chutney")}${savings > 0 ? ` · Saves ${escapeHtml(formatMoney(savings))} vs. individual tray pricing` : ""}.
            </p>
          </div>
          <div class="rk-arbitrage-toggle" role="group" aria-label="Blueprint Mode">
            <button type="button" class="rk-opt-btn" data-bp-mode="package" aria-pressed="${bp.usingPackage ? "true" : "false"}">Recommended Curated Package</button>
            <button type="button" class="rk-opt-btn" data-bp-mode="alacarte" aria-pressed="${!bp.usingPackage ? "true" : "false"}">Custom À-La-Carte Tray Build</button>
          </div>
        </div>
      `;
    }

    const linesHtml = bp.usingPackage && bp.matchedPackage
      ? `
        <li class="rk-bp-row">
          <div>
            <span class="rk-bp-name">${escapeHtml(bp.matchedPackage.name)}</span>
            <span class="rk-bp-detail">${escapeHtml((bp.matchedPackage.includes || []).join(" · "))}</span>
            ${bp.matchedPackage.naanIncluded ? `<span class="rk-bp-detail" style="color:var(--accent-brass);">Included: ${escapeHtml(bp.matchedPackage.naanIncluded)}</span>` : ""}
          </div>
          <span class="rk-bp-price">${escapeHtml(formatMoney(bp.matchedPackage.price))}</span>
        </li>
      `
      : bp.alaCarteLines
          .map(
            (l) => `
            <li class="rk-bp-row">
              <div>
                <span class="rk-bp-name">${l.qty}x ${escapeHtml(l.title)}</span>
                <span class="rk-bp-detail">${escapeHtml(l.subtitle)}</span>
              </div>
              <span class="rk-bp-price">${escapeHtml(formatMoney(l.unitPrice * l.qty))}</span>
            </li>
          `
          )
          .join("");

    return `${arbitrageHtml}<ul class="rk-bp-list">${linesHtml}</ul>`;
  }

  function updateArchitectOutputs() {
    if (!archEl) return;
    const bp = computeBlueprint();
    const pct = rangePercent(archState.guestCount).toFixed(2) + "%";
    const slider = archEl.querySelector("#rkGuestSlider");
    if (slider) {
      slider.value = String(archState.guestCount);
      slider.style.setProperty("--range-pct", pct);
    }
    const readout = archEl.querySelector("#rkArchGuestReadout");
    if (readout) readout.textContent = String(archState.guestCount);
    const totalEl = archEl.querySelector("#rkArchTotalDisplay");
    if (totalEl) totalEl.textContent = formatMoney(bp.activeTotal);
    const presetBtns = archEl.querySelectorAll("[data-arch-preset]");
    for (const btn of presetBtns) {
      const target = Number(btn.getAttribute("data-arch-preset"));
      btn.setAttribute("aria-pressed", target === archState.guestCount ? "true" : "false");
    }
    const bodyEl = archEl.querySelector("[data-arch-blueprint-body]");
    if (bodyEl) bodyEl.innerHTML = buildBlueprintBodyHtml(bp);
  }

  function renderPortionArchitect() {
    if (!archEl) return;
    const bp = computeBlueprint();
    const activeOccasion = OCCASIONS.find((o) => o.id === archState.occasionId) || OCCASIONS[0];
    const activeProtein = PROTEINS.find((p) => p.id === archState.proteinId) || PROTEINS[0];
    const pct = rangePercent(archState.guestCount).toFixed(2) + "%";

    archEl.innerHTML = `
      <div class="rk-arch-panel">
        <div class="rk-arch-head">
          <div>
            <span class="rk-arch-eyebrow">Precision Tray Engineering · 15 to 250 Guests</span>
            <h2 class="rk-arch-title">Dawat &amp; Portion Architect</h2>
          </div>
          <p class="rk-arch-sub">Calibrate guest count, occasion style, and protein balance against RubzzKitchen's real tray yields (Small 12-15, Large 25-30) and curated 40/100-guest dawat packages.</p>
        </div>
        <div class="rk-arch-grid">
          <div class="rk-arch-col-left">
            <div>
              <div class="rk-guest-row">
                <label for="rkGuestSlider" class="rk-control-label" style="margin:0;">Estimated Guest Count</label>
                <div style="display:flex; align-items:center; gap:10px;">
                  <div class="rk-stepper">
                    <button type="button" class="rk-step-btn" data-arch-guest-dec aria-label="Decrease guest count">-</button>
                    <span class="rk-step-qty" style="min-width:52px;" id="rkArchGuestReadout">${archState.guestCount}</span>
                    <button type="button" class="rk-step-btn" data-arch-guest-inc aria-label="Increase guest count">+</button>
                  </div>
                </div>
              </div>
              <input id="rkGuestSlider" class="rk-range" type="range" min="15" max="250" step="5" value="${archState.guestCount}" style="--range-pct:${pct};" aria-label="Guest Count Slider">
              <div class="rk-range-ticks" aria-hidden="true">
                <span>15</span>
                <span style="left:25.53%;">75</span>
                <span style="left:51.06%;">135</span>
                <span style="left:76.60%;">195</span>
                <span>250 Guests</span>
              </div>
              <div class="rk-preset-row" role="group" aria-label="Quick-Scale Guest Presets">
                ${GUEST_PRESETS.map(
                  (preset) => `
                    <button type="button" class="rk-preset-btn" data-arch-preset="${preset.guests}" aria-pressed="${archState.guestCount === preset.guests ? "true" : "false"}">${escapeHtml(preset.label)}</button>
                  `
                ).join("")}
              </div>
            </div>

            <div>
              <span class="rk-control-label">Occasion Profile</span>
              <div class="rk-opt-grid" role="group" aria-label="Occasion Profile">
                ${OCCASIONS.map(
                  (o) => `
                    <button type="button" class="rk-opt-btn" data-arch-occasion="${o.id}" aria-pressed="${archState.occasionId === o.id ? "true" : "false"}">${escapeHtml(o.label)}</button>
                  `
                ).join("")}
              </div>
            </div>

            <div>
              <span class="rk-control-label">Protein &amp; Menu Centerpiece</span>
              <div class="rk-opt-grid" role="group" aria-label="Protein Preference">
                ${PROTEINS.map(
                  (p) => `
                    <button type="button" class="rk-opt-btn" data-arch-protein="${p.id}" aria-pressed="${archState.proteinId === p.id ? "true" : "false"}">${escapeHtml(p.label)}</button>
                  `
                ).join("")}
              </div>
            </div>
          </div>

          <div class="rk-arch-col-right">
            <div style="display:flex; justify-content:space-between; align-items:baseline; gap:10px;">
              <div>
                <span class="rk-arch-eyebrow" style="margin-bottom:4px;">Live Culinary Blueprint</span>
                <strong style="font-family:var(--font-display); font-size:1.2rem; font-weight:400;">${escapeHtml(activeOccasion.label)} · ${escapeHtml(activeProtein.label)}</strong>
              </div>
              <span class="rk-guest-readout" id="rkArchTotalDisplay">${escapeHtml(formatMoney(bp.activeTotal))}</span>
            </div>

            <div data-arch-blueprint-body style="display:flex; flex-direction:column; gap:16px;">
              ${buildBlueprintBodyHtml(bp)}
            </div>

            <div class="rk-bp-total-bar">
              <span style="font-size:0.8rem; color:var(--ink-secondary);">Ready to reserve or customize in the desk below.</span>
              <button type="button" class="rk-btn-primary" data-arch-load>Load Blueprint into Reservation Desk</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (archEl) {
    renderPortionArchitect();

    archEl.addEventListener("input", (ev) => {
      if (ev.target && ev.target.id === "rkGuestSlider") {
        archState.guestCount = Math.min(250, Math.max(15, Number(ev.target.value) || 40));
        updateArchitectOutputs();
      }
    });

    archEl.addEventListener("click", (ev) => {
      if (ev.target.closest("[data-arch-guest-dec]")) {
        archState.guestCount = Math.max(15, archState.guestCount - 5);
        updateArchitectOutputs();
        return;
      }
      if (ev.target.closest("[data-arch-guest-inc]")) {
        archState.guestCount = Math.min(250, archState.guestCount + 5);
        updateArchitectOutputs();
        return;
      }
      const presetBtn = ev.target.closest("[data-arch-preset]");
      if (presetBtn) {
        const nextGuests = Number(presetBtn.getAttribute("data-arch-preset"));
        if (Number.isFinite(nextGuests)) {
          archState.guestCount = Math.min(250, Math.max(15, nextGuests));
          updateArchitectOutputs();
        }
        return;
      }
      const occBtn = ev.target.closest("[data-arch-occasion]");
      if (occBtn) {
        archState.occasionId = occBtn.getAttribute("data-arch-occasion");
        renderPortionArchitect();
        return;
      }
      const protBtn = ev.target.closest("[data-arch-protein]");
      if (protBtn) {
        archState.proteinId = protBtn.getAttribute("data-arch-protein");
        renderPortionArchitect();
        return;
      }
      const modeBtn = ev.target.closest("[data-bp-mode]");
      if (modeBtn) {
        archState.preferPackage = modeBtn.getAttribute("data-bp-mode") === "package";
        updateArchitectOutputs();
        return;
      }
      if (ev.target.closest("[data-arch-load]")) {
        const bp = computeBlueprint();
        const occ = OCCASIONS.find((o) => o.id === archState.occasionId);
        const prot = PROTEINS.find((p) => p.id === archState.proteinId);
        if (bookingController && typeof bookingController.applyPresetBuild === "function") {
          bookingController.applyPresetBuild(bp.activeLines, {
            guestCount: archState.guestCount,
            orderMode: bp.usingPackage ? "packages" : "trays",
            notes: `Portion Architect Build: ${archState.guestCount} guests, ${occ ? occ.label : ""}, ${prot ? prot.label : ""}.`,
          });
        }
      }
    });
  }

  /* ---------- B) Grazing Scenography Studio ---------- */
  const grazingState = {
    tierId: grazingTiers[1] ? grazingTiers[1].id : grazingTiers[0].id,
    selectedStations: grazingStations.slice(0, 3).map((s) => s.id),
    minNoticeMsg: "",
    previewPhoto: null,
  };

  function getGrazingPreviewImage() {
    if (grazingState.selectedStations.includes("pipette-chaat") || grazingState.selectedStations.some((id) => id.includes("pipette") || id.includes("chaat"))) {
      return {
        src: "./assets/originals/pipette-chaat-tiers.jpg",
        alt: "RubzzKitchen pipette chana chaat shooters and tea sandwiches",
      };
    }
    if (grazingState.selectedStations.some((id) => id.includes("croissant") || id.includes("slider"))) {
      return {
        src: "./assets/originals/hero-grazing-sliders.jpg",
        alt: "RubzzKitchen tiered croissant sandwiches and brioche sliders",
      };
    }
    if (grazingState.selectedStations.some((id) => id.includes("samosa") || id.includes("kebab"))) {
      return {
        src: "./assets/originals/dawat-samosa-kebab-buffet.jpg",
        alt: "RubzzKitchen dawat samosa, patty, and kebab buffet",
      };
    }
    if (grazingState.selectedStations.some((id) => id.includes("charcuterie") || id.includes("orchard"))) {
      return {
        src: "./assets/originals/charcuterie-orchard-table.jpg",
        alt: "RubzzKitchen halal charcuterie and orchard fruit grazing table",
      };
    }
    if (grazingState.selectedStations.some((id) => id.includes("parfait") || id.includes("kheer"))) {
      return {
        src: "./assets/originals/parfait-mimosa-grazing.jpg",
        alt: "RubzzKitchen layered parfait cups and mocktail grazing display",
      };
    }
    return TIER_PREVIEW_PHOTOS[grazingState.tierId] || {
      src: "./assets/originals/hero-grazing-sliders.jpg",
      alt: "RubzzKitchen architectural halal grazing installation",
    };
  }

  function renderGrazingStudio() {
    if (!grazingEl) return;
    const activeTier = grazingTiers.find((t) => t.id === grazingState.tierId) || grazingTiers[0];
    const selectedStationObjs = grazingStations.filter((s) => grazingState.selectedStations.includes(s.id));
    const lastSelectedId = grazingState.selectedStations[grazingState.selectedStations.length - 1];
    const lastStation = grazingStations.find((s) => s.id === lastSelectedId);
    const fallbackPreview = getGrazingPreviewImage();
    const previewSrc = (grazingState.previewPhoto && grazingState.previewPhoto.src)
      || (lastStation && resolveSafeGrazingSrc(lastStation.previewImage || lastStation.imageSrc, lastStation.id))
      || fallbackPreview.src;
    const previewAlt = (grazingState.previewPhoto && grazingState.previewPhoto.alt)
      || (lastStation && lastStation.name)
      || fallbackPreview.alt;

    const footprint = activeTier.footprint || (activeTier.id.includes("petite") ? "6 ft" : activeTier.id.includes("grand") ? "12-16 ft" : "8-10 ft");
    const setupWin = activeTier.setupWindow || (activeTier.id.includes("petite") ? "75 min" : activeTier.id.includes("grand") ? "3 hrs" : "2 hrs");
    const tierDesc = (activeTier.description || "Styled on site with white acrylic plinths, checkered porcelain and silver platters, and fresh seasonal florals.")
      .replace(/brass and stone risers/gi, "white acrylic plinths and porcelain platters");

    grazingEl.innerHTML = `
      <div class="rk-arch-panel">
        <div class="rk-arch-head">
          <div>
            <span class="rk-arch-eyebrow">Bespoke Grazing &amp; Appetizer Installations</span>
            <h2 class="rk-arch-title">Grazing Table Scenography Studio</h2>
          </div>
          <p class="rk-arch-sub">Compose an on-site grazing installation modeled on RubzzKitchen's Moka &amp; Co. Cafe launch, CILRU Gala, and bridal shower spreads.</p>
        </div>
        <div class="rk-grz-grid">
          <div class="rk-grz-col-left">
            <div>
              <span class="rk-control-label">01 · Table Scale &amp; Guest Footprint</span>
              <div class="rk-grz-tier-grid" role="group" aria-label="Grazing Table Scale">
                ${grazingTiers
                  .map(
                    (t) => `
                    <button type="button" class="rk-opt-btn" data-grz-tier="${escapeHtml(t.id)}" aria-pressed="${grazingState.tierId === t.id ? "true" : "false"}">
                      ${escapeHtml(t.name)}
                      <span class="rk-bp-detail">${escapeHtml(t.guestRange || "")}</span>
                    </button>
                  `
                  )
                  .join("")}
              </div>
            </div>

            <div>
              <span class="rk-control-label">02 · Grazing Stations (Select Minimum 2)</span>
              <div class="rk-grz-station-grid" role="group" aria-label="Grazing Stations">
                ${grazingStations
                  .map((st) => {
                    const active = grazingState.selectedStations.includes(st.id);
                    const stationDesc = st.detail || st.subtitle || "";
                    return `
                      <button type="button" class="rk-opt-btn rk-grz-station-btn" data-grz-station="${escapeHtml(st.id)}" aria-pressed="${active ? "true" : "false"}">
                        <span>${escapeHtml(st.name)}</span>
                        <span class="rk-bp-detail">${escapeHtml(stationDesc)}</span>
                      </button>
                    `;
                  })
                  .join("")}
              </div>
              ${
                grazingState.minNoticeMsg
                  ? `<p style="margin:10px 0 0; font-size:0.8rem; color:var(--accent-brass);">${escapeHtml(grazingState.minNoticeMsg)}</p>`
                  : ""
              }
            </div>

            <div class="rk-grz-tier-note">
              <span class="rk-grz-spec-label" style="margin-bottom:4px;">Installation Scope &amp; Prop Architecture</span>
              <p style="margin:0; font-size:0.84rem; color:var(--ink-secondary); line-height:1.5;">${escapeHtml(tierDesc)}</p>
            </div>
          </div>

          <div class="rk-grz-preview">
            <div class="rk-grz-preview-top">
              <div class="rk-grz-frame">
                <img src="${escapeHtml(previewSrc)}" alt="${escapeHtml(previewAlt)}" loading="lazy">
              </div>
              <div class="rk-grz-specs">
                <div>
                  <span class="rk-grz-spec-label">Table Footprint</span>
                  <span class="rk-grz-spec-val">${escapeHtml(footprint)}</span>
                </div>
                <div>
                  <span class="rk-grz-spec-label">On-Site Setup Window</span>
                  <span class="rk-grz-spec-val">${escapeHtml(setupWin)}</span>
                </div>
                <div>
                  <span class="rk-grz-spec-label">Culinary Standard</span>
                  <span class="rk-grz-spec-val">100% Zabiha Halal Scratch Prep</span>
                </div>
              </div>
              <div class="rk-grz-selected-wrap">
                <span class="rk-grz-spec-label" style="margin-bottom:0;">Selected Stations List (${selectedStationObjs.length})</span>
                <div class="rk-grz-selected-chips">
                  ${selectedStationObjs
                    .map((st) => `<span class="rk-grz-chip">${escapeHtml(st.name)}</span>`)
                    .join("")}
                </div>
              </div>
            </div>
            <div class="rk-grz-preview-foot">
              <p style="margin:0; font-size:0.86rem; color:var(--ink-secondary); line-height:1.45;">
                Active tier: <strong>${escapeHtml(activeTier.name)}</strong> (${escapeHtml(activeTier.guestRange || "")}) · ${escapeHtml(activeTier.priceLabel || "Custom Venue Quote")}.
              </p>
              <button type="button" class="rk-btn-primary rk-grz-cta" data-grz-add>Add Grazing Commission to Inquiry</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  if (grazingEl) {
    renderGrazingStudio();

    grazingEl.addEventListener("click", (ev) => {
      const tierBtn = ev.target.closest("[data-grz-tier]");
      if (tierBtn) {
        const nextTierId = tierBtn.getAttribute("data-grz-tier");
        grazingState.tierId = nextTierId;
        grazingState.minNoticeMsg = "";
        grazingState.previewPhoto = TIER_PREVIEW_PHOTOS[nextTierId] || getGrazingPreviewImage();
        renderGrazingStudio();
        return;
      }
      const stBtn = ev.target.closest("[data-grz-station]");
      if (stBtn) {
        const id = stBtn.getAttribute("data-grz-station");
        const exists = grazingState.selectedStations.includes(id);
        if (exists) {
          if (grazingState.selectedStations.length <= 2) {
            grazingState.minNoticeMsg = "Select at least 2 stations for balanced grazing table architecture.";
            renderGrazingStudio();
            return;
          }
          grazingState.selectedStations = grazingState.selectedStations.filter((s) => s !== id);
          const fallbackId = grazingState.selectedStations[grazingState.selectedStations.length - 1];
          const fallbackSt = grazingStations.find((s) => s.id === fallbackId);
          grazingState.previewPhoto = fallbackSt
            ? { src: resolveSafeGrazingSrc(fallbackSt.previewImage || fallbackSt.imageSrc, fallbackSt.id), alt: fallbackSt.name }
            : getGrazingPreviewImage();
        } else {
          grazingState.selectedStations = [...grazingState.selectedStations, id];
          const stObj = grazingStations.find((s) => s.id === id);
          grazingState.previewPhoto = stObj
            ? { src: resolveSafeGrazingSrc(stObj.previewImage || stObj.imageSrc, stObj.id), alt: stObj.name }
            : getGrazingPreviewImage();
        }
        grazingState.minNoticeMsg = "";
        renderGrazingStudio();
        return;
      }
      if (ev.target.closest("[data-grz-add]")) {
        const activeTier = grazingTiers.find((t) => t.id === grazingState.tierId) || grazingTiers[0];
        const stationNames = grazingStations
          .filter((s) => grazingState.selectedStations.includes(s.id))
          .map((s) => s.name);
        if (bookingController && typeof bookingController.addItem === "function") {
          bookingController.addItem({
            lineId: `grazing-${activeTier.id}-${grazingState.selectedStations.length}`,
            title: `${activeTier.name} Commission`,
            subtitle: `${activeTier.guestRange || ""} · Stations: ${stationNames.join(", ")}`,
            unitPrice: null,
            qty: 1,
            isCustomQuote: true,
            category: "grazing",
          });
          if (typeof bookingController.scrollToBooking === "function") {
            bookingController.scrollToBooking();
          }
        }
      }
    });
  }

  /* ---------- C) Frozen Stash Dozen Box ---------- */
  const frozenQuantities = {};
  for (const item of frozenItems) {
    frozenQuantities[item.id] = 0;
  }

  function applyStashTrio() {
    for (const key of Object.keys(frozenQuantities)) frozenQuantities[key] = 0;
    const trioHints = ["Mini Chicken Keema Samosa", "Chicken Spring Roll", "Chicken Shami Kebab"];
    for (const hint of trioHints) {
      const hit = frozenItems.find((i) => i.name && i.name.toLowerCase().includes(hint.toLowerCase()));
      if (hit) frozenQuantities[hit.id] = 1;
    }
  }

  function renderFrozenBuilder() {
    if (!frozenEl) return;
    let totalDozens = 0;
    let totalAmount = 0;
    for (const item of frozenItems) {
      const q = frozenQuantities[item.id] || 0;
      const opt = (item.options && item.options[0]) || { price: 0, label: "1 Dozen" };
      totalDozens += q;
      totalAmount += q * (Number(opt.price) || 0);
    }

    frozenEl.innerHTML = `
      <div class="rk-arch-panel rk-frz-wrap">
        <div class="rk-arch-head">
          <div>
            <span class="rk-arch-eyebrow">Ready-to-Cook Carteret Kitchen Stash</span>
            <h2 class="rk-arch-title">Build-Your-Freezer-Stash Dozen Box</h2>
          </div>
          <button type="button" class="rk-btn-ghost" data-frz-trio>Ramadan / Hostess Stash Trio (3 Dozens · $62)</button>
        </div>
        <div class="rk-frz-grid">
          ${frozenItems
            .map((item) => {
              const opt = (item.options && item.options[0]) || { price: 0, label: "1 Dozen" };
              const q = frozenQuantities[item.id] || 0;
              return `
                <div class="rk-frz-row">
                  <div>
                    <p class="rk-frz-name">${escapeHtml(item.name)}</p>
                    <span class="rk-frz-price">${escapeHtml(formatMoney(opt.price))} · ${escapeHtml(opt.label || "1 Dozen")}</span>
                  </div>
                  <div class="rk-stepper" aria-label="Quantity for ${escapeHtml(item.name)}">
                    <button type="button" class="rk-step-btn" data-frz-dec="${escapeHtml(item.id)}" aria-label="Decrease ${escapeHtml(item.name)}">-</button>
                    <span class="rk-step-qty">${q}</span>
                    <button type="button" class="rk-step-btn" data-frz-inc="${escapeHtml(item.id)}" aria-label="Increase ${escapeHtml(item.name)}">+</button>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
        <div class="rk-frz-foot">
          <div>
            <span class="rk-grz-spec-label">Selected Stash Box</span>
            <strong style="font-family:var(--font-display); font-size:1.35rem; font-weight:400;">${totalDozens} ${totalDozens === 1 ? "Pack" : "Packs"} · ${escapeHtml(formatMoney(totalAmount))}</strong>
          </div>
          <button type="button" class="rk-btn-primary" data-frz-add>Add Stash Box to Order Ledger</button>
        </div>
      </div>
    `;
  }

  if (frozenEl) {
    renderFrozenBuilder();

    frozenEl.addEventListener("click", (ev) => {
      const inc = ev.target.closest("[data-frz-inc]");
      if (inc) {
        const id = inc.getAttribute("data-frz-inc");
        frozenQuantities[id] = Math.min(24, (frozenQuantities[id] || 0) + 1);
        renderFrozenBuilder();
        return;
      }
      const dec = ev.target.closest("[data-frz-dec]");
      if (dec) {
        const id = dec.getAttribute("data-frz-dec");
        frozenQuantities[id] = Math.max(0, (frozenQuantities[id] || 0) - 1);
        renderFrozenBuilder();
        return;
      }
      if (ev.target.closest("[data-frz-trio]")) {
        applyStashTrio();
        renderFrozenBuilder();
        return;
      }
      if (ev.target.closest("[data-frz-add]")) {
        const hasAny = frozenItems.some((item) => (frozenQuantities[item.id] || 0) > 0);
        if (!hasAny) {
          applyStashTrio();
          renderFrozenBuilder();
        }
        for (const item of frozenItems) {
          const q = frozenQuantities[item.id] || 0;
          if (q > 0 && bookingController && typeof bookingController.addItem === "function") {
            const opt = (item.options && item.options[0]) || { optionId: "dozen", label: "1 Dozen", price: 0 };
            bookingController.addItem({
              lineId: `${item.id}-${opt.optionId || "dozen"}`,
              title: item.name,
              subtitle: opt.label || "1 Dozen",
              unitPrice: Number(opt.price),
              qty: q,
              category: "frozen-dozens",
            });
          }
        }
      }
    });
  }
}
