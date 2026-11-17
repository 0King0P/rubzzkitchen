const BAG_STORAGE_KEY = "rubzzkitchen_bag_v1";
const ORDERS_STORAGE_KEY = "rubzzkitchen_orders_v1";

const SERVICE_FORMATS = [
  {
    id: "trays",
    label: "Event Catering Trays",
    leadText: "72h notice recommended for full hot trays",
  },
  {
    id: "packages",
    label: "40 / 100-Guest Dawat Package",
    leadText: "72h notice recommended · includes Naan, Salad & Chutney",
  },
  {
    id: "grazing",
    label: "Bespoke Grazing Installation",
    leadText: "7 days notice recommended for custom floral & brass styling",
  },
  {
    id: "frozen",
    label: "Frozen Dozens & Weekly Prep",
    leadText: "Flexible Carteret pickup or scheduled drop-off",
  },
];

const TIME_SLOTS = [
  "11:30 AM Lunch",
  "2:00 PM Afternoon Event",
  "5:30 PM Maghrib / Iftar",
  "7:30 PM Evening Reception",
  "Flexible Carteret Pickup",
];

const SPICE_LEVELS = [
  "Mild Family-Friendly",
  "Authentic Lahori Medium",
  "Traditional Spicy",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

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

function toIsoDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(date, days) {
  const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  copy.setDate(copy.getDate() + days);
  return copy;
}

function formatHumanDate(iso) {
  if (!iso) return "Date pending";
  const parts = iso.split("-").map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return iso;
  const d = new Date(parts[0], parts[1] - 1, parts[2]);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function generateDeterministicRef(seedStr) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let h1 = 0x811c9dc5;
  let h2 = 0x9e3779b9;
  for (let i = 0; i < seedStr.length; i++) {
    const ch = seedStr.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= ch + i;
    h2 = Math.imul(h2, 0x85ebca6b);
  }
  let code = "";
  let combined = (Math.abs(h1) >>> 0) ^ (Math.abs(h2) >>> 0);
  for (let i = 0; i < 6; i++) {
    code += alphabet[combined % alphabet.length];
    combined = Math.floor(combined / alphabet.length) + ((h1 >>> (i * 4)) & 0xff) + i * 7;
  }
  return `RK-${code}`;
}

function parseSlotTime(slotLabel) {
  if (!slotLabel) return { hour: 17, minute: 30 };
  const match = slotLabel.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return { hour: 12, minute: 0 };
  let hour = Number(match[1]);
  const minute = Number(match[2]);
  const meridiem = match[3].toUpperCase();
  if (meridiem === "PM" && hour < 12) hour += 12;
  if (meridiem === "AM" && hour === 12) hour = 0;
  return { hour, minute };
}

function buildIcsContent(dossier) {
  const { hour, minute } = parseSlotTime(dossier.timeSlot);
  const parts = (dossier.eventDate || toIsoDate(new Date())).split("-").map(Number);
  const start = new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1, hour, minute, 0);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const pad = (n) => String(n).padStart(2, "0");
  const fmt = (dt) =>
    `${dt.getFullYear()}${pad(dt.getMonth() + 1)}${pad(dt.getDate())}T${pad(dt.getHours())}${pad(dt.getMinutes())}00`;
  const stamp = fmt(new Date());
  const itemSummary = dossier.lines.length
    ? dossier.lines.map((l) => `${l.qty}x ${l.title}`).join(", ")
    : dossier.serviceFormatLabel;
  const description = [
    `Reference: ${dossier.refId}`,
    `Host: ${dossier.hostName} (${dossier.hostPhone})`,
    `Guests: ${dossier.guestCount}`,
    `Spice: ${dossier.spiceLevel}`,
    `Fulfillment: ${dossier.zoneLabel}${dossier.venueAddress ? " - " + dossier.venueAddress : ""}`,
    `Selections: ${itemSummary}`,
    `Subtotal: ${formatMoney(dossier.subtotal)}${dossier.hasCustomQuote ? " + Custom Quoted Items" : ""}`,
  ]
    .join("\\n")
    .replace(/,/g, "\\,");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//RubzzKitchen//Catering Concierge//EN",
    "BEGIN:VEVENT",
    `UID:${dossier.refId}@rubzzkitchen.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:RubzzKitchen Catering Hold (${dossier.refId})`,
    `LOCATION:${(dossier.venueAddress || dossier.zoneLabel || "Carteret, NJ").replace(/,/g, "\\,")}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function buildOrderBriefText(dossier) {
  const linesText = dossier.lines.length
    ? dossier.lines
        .map((l) => {
          const priceStr = l.isCustomQuote || l.unitPrice === null ? "Custom Quote" : formatMoney(l.unitPrice * l.qty);
          return `- ${l.qty}x ${l.title}${l.subtitle ? ` (${l.subtitle})` : ""}: ${priceStr}`;
        })
        .join("\n")
    : `- General Inquiry (${dossier.serviceFormatLabel})`;

  const totalLine = dossier.hasCustomQuote
    ? `Priced Subtotal: ${formatMoney(dossier.subtotal)} + Custom Quote Items`
    : `Priced Subtotal: ${formatMoney(dossier.subtotal)}`;

  return [
    `RUBZZKITCHEN CATERING DOSSIER (${dossier.refId})`,
    `Format: ${dossier.serviceFormatLabel}`,
    `Event Date: ${formatHumanDate(dossier.eventDate)} · ${dossier.timeSlot}`,
    `Fulfillment: ${dossier.zoneLabel}${dossier.venueAddress ? ` (${dossier.venueAddress})` : ""}`,
    `Host: ${dossier.hostName} · ${dossier.hostPhone} · ${dossier.hostEmail}`,
    `Estimated Guests: ${dossier.guestCount} · Spice: ${dossier.spiceLevel}`,
    "",
    "Selections:",
    linesText,
    "",
    totalLine,
    dossier.subtotal > 0 ? `50% Date Retainer Estimate: ${formatMoney(Math.round(dossier.subtotal * 0.5))}` : "",
    dossier.notes ? `Kitchen & Setup Notes: ${dossier.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function loadBagStorage() {
  try {
    const raw = window.localStorage.getItem(BAG_STORAGE_KEY);
    if (!raw) return { lines: [], meta: {} };
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return { lines: parsed, meta: {} };
    return {
      lines: Array.isArray(parsed.lines) ? parsed.lines : [],
      meta: parsed.meta && typeof parsed.meta === "object" ? parsed.meta : {},
    };
  } catch {
    return { lines: [], meta: {} };
  }
}

function saveBagStorage(lines, meta) {
  try {
    window.localStorage.setItem(BAG_STORAGE_KEY, JSON.stringify({ lines, meta }));
  } catch {
    /* ignore storage errors */
  }
}

function saveOrderDossier(dossier) {
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    const prev = raw ? JSON.parse(raw) : [];
    const list = Array.isArray(prev) ? prev : [];
    const next = [dossier, ...list.filter((o) => o.refId !== dossier.refId)].slice(0, 12);
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore storage errors */
  }
}

function injectBookingStyles() {
  if (document.getElementById("rk-booking-styles")) return;
  const style = document.createElement("style");
  style.id = "rk-booking-styles";
  style.textContent = `
    .rk-toast-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      margin-right: 8px;
      vertical-align: middle;
      background: var(--accent-brass, #d4a86a);
      flex-shrink: 0;
    }

    /* Slide-Over Ledger Drawer */
    .rk-drawer-backdrop {
      position: fixed;
      inset: 0;
      z-index: 900;
      background: rgba(10, 8, 7, 0.72);
      backdrop-filter: blur(4px);
      display: flex;
      justify-content: flex-end;
      opacity: 0;
      pointer-events: none;
      transition: opacity 280ms cubic-bezier(0.32, 0.72, 0, 1);
    }
    .rk-drawer-backdrop[data-open="true"] {
      opacity: 1;
      pointer-events: auto;
    }
    .rk-drawer-panel {
      width: min(460px, 100vw);
      height: 100%;
      background: var(--plane-1-surface, #161310);
      color: var(--ink-primary, #f5efe6);
      border-left: 1px solid var(--border-strong, rgba(212, 168, 106, 0.45));
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 340ms cubic-bezier(0.32, 0.72, 0, 1);
      font-family: var(--font-sans, sans-serif);
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-drawer-backdrop[data-open="true"] .rk-drawer-panel {
      transform: translateX(0);
    }
    .rk-drawer-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 20px 22px;
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
    }
    .rk-drawer-eyebrow {
      display: block;
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent-brass, #d4a86a);
      margin-bottom: 4px;
    }
    .rk-drawer-title {
      margin: 0;
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.35rem;
      font-weight: 400;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-drawer-close {
      min-width: 44px;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-drawer-close:hover { border-color: var(--accent-brass, #d4a86a); }
    .rk-drawer-close:active { transform: scale(0.97); }
    .rk-drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px 22px;
    }
    .rk-drawer-empty {
      padding: 40px 16px;
      text-align: left;
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
    }
    .rk-drawer-empty h3 {
      font-family: var(--font-display, Georgia, serif);
      font-weight: 400;
      margin: 0 0 8px;
      font-size: 1.2rem;
    }
    .rk-drawer-empty p {
      margin: 0 0 18px;
      color: var(--ink-secondary, #c6bcb0);
      font-size: 0.9rem;
      line-height: 1.55;
    }
    .rk-bag-ledger-row {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      padding: 16px 0;
      border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-ledger-item-title {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.05rem;
      color: var(--ink-primary, #f5efe6);
      margin: 0 0 4px;
    }
    .rk-ledger-item-sub {
      font-size: 0.82rem;
      color: var(--ink-secondary, #c6bcb0);
      margin: 0 0 10px;
    }
    .rk-ledger-controls {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
    .rk-stepper {
      display: inline-flex;
      align-items: center;
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
    }
    .rk-step-btn {
      min-width: 44px;
      min-height: 44px;
      background: transparent;
      color: var(--ink-primary, #f5efe6);
      border: none;
      font-family: inherit;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-step-btn:hover { background: var(--plane-3-elevated, #25201c); }
    .rk-step-btn:active { transform: scale(0.97); }
    .rk-step-qty {
      min-width: 32px;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-btn-destructive {
      min-height: 44px;
      padding: 0 12px;
      background: transparent;
      color: var(--color-destructive, #d96b52);
      border: 1px solid color-mix(in oklch, var(--color-destructive, #d96b52) 40%, transparent);
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-btn-destructive:hover {
      border-color: var(--color-destructive, #d96b52);
    }
    .rk-btn-destructive:active { transform: scale(0.97); }
    .rk-ledger-price {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.05rem;
      color: var(--accent-brass, #d4a86a);
      text-align: right;
      white-space: nowrap;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-drawer-foot {
      padding: 18px 22px 22px;
      border-top: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .rk-subtotal-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
    }
    .rk-subtotal-label {
      font-size: 0.75rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink-secondary, #c6bcb0);
    }
    .rk-subtotal-val {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.45rem;
      color: var(--ink-primary, #f5efe6);
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-quote-note {
      font-size: 0.78rem;
      color: var(--accent-brass, #d4a86a);
      margin: 0;
    }
    .rk-drawer-cta-row {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 10px;
    }

    /* Shared Architectural Buttons & Surfaces */
    .rk-btn-primary {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 46px;
      padding: 12px 20px;
      background: var(--accent-brass, #d4a86a);
      color: var(--accent-ink, #0b0907);
      border: 1px solid var(--accent-brass, #d4a86a);
      border-radius: var(--radius-sm, 0px);
      font-family: var(--font-sans, sans-serif);
      font-size: 0.85rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-decoration: none;
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-btn-primary:hover { background: var(--accent-brass-hover, #e2b87d); }
    .rk-btn-primary:active { transform: scale(0.97); }
    .rk-btn-ghost {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      min-height: 46px;
      padding: 12px 18px;
      background: transparent;
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: var(--font-sans, sans-serif);
      font-size: 0.84rem;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-btn-ghost:hover {
      border-color: var(--accent-brass, #d4a86a);
      background: var(--plane-2-card, #1d1916);
    }
    .rk-btn-ghost:active { transform: scale(0.97); }
    .rk-btn-ghost[aria-pressed="true"] {
      border-color: var(--accent-brass, #d4a86a);
      background: var(--surface-tint, rgba(212, 168, 106, 0.08));
      color: var(--accent-brass, #d4a86a);
    }

    /* 4-Step Booking Concierge */
    .rk-bk-shell {
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-1-surface, #161310);
      font-family: var(--font-sans, sans-serif);
      font-variant-numeric: tabular-nums lining-nums;
      box-shadow: var(--specular-top, inset 0 1px 0 rgba(212, 168, 106, 0.2));
    }
    .rk-bk-head {
      padding: 28px 28px 20px;
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-end;
      gap: 16px;
    }
    .rk-bk-eyebrow {
      display: block;
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent-brass, #d4a86a);
      margin-bottom: 8px;
    }
    .rk-bk-heading {
      margin: 0;
      font-family: var(--font-display, Georgia, serif);
      font-size: clamp(1.75rem, 3vw, 2.4rem);
      font-weight: 400;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-bk-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
    }
    .rk-bk-step-tab {
      min-height: 54px;
      padding: 12px 14px;
      text-align: left;
      background: transparent;
      color: var(--ink-secondary, #c6bcb0);
      border: none;
      border-right: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
      border-bottom: 2px solid transparent;
      font-family: inherit;
      font-size: 0.82rem;
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), color 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-bk-step-tab:last-child { border-right: none; }
    .rk-bk-step-tab[aria-current="step"] {
      color: var(--ink-primary, #f5efe6);
      background: var(--plane-3-elevated, #25201c);
      border-bottom-color: var(--accent-brass, #d4a86a);
    }
    .rk-bk-step-num {
      display: block;
      font-size: 0.6875rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--accent-brass, #d4a86a);
      margin-bottom: 2px;
    }
    .rk-bk-body {
      padding: 28px;
    }
    .rk-bk-format-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 24px;
    }
    .rk-bk-format-btn {
      min-height: 64px;
      padding: 12px 14px;
      text-align: left;
      background: var(--plane-2-card, #1d1916);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 500;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-bk-format-btn:hover { border-color: var(--accent-brass, #d4a86a); }
    .rk-bk-format-btn:active { transform: scale(0.97); }
    .rk-bk-format-btn[aria-pressed="true"] {
      border-color: var(--accent-brass, #d4a86a);
      background: var(--surface-tint, rgba(212, 168, 106, 0.08));
    }
    .rk-bk-format-sub {
      display: block;
      margin-top: 4px;
      font-size: 0.74rem;
      color: var(--ink-secondary, #c6bcb0);
      font-weight: 400;
    }
    .rk-bk-split {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 24px;
      align-items: start;
    }
    .rk-bk-panel {
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
      padding: 18px;
    }
    .rk-bk-panel-title {
      margin: 0 0 12px;
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-quick-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .rk-quick-add {
      min-height: 52px;
      padding: 10px 12px;
      text-align: left;
      background: var(--plane-1-surface, #161310);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-quick-add:hover { border-color: var(--accent-brass, #d4a86a); }
    .rk-quick-add:active { transform: scale(0.97); }
    .rk-quick-price {
      color: var(--accent-brass, #d4a86a);
      font-weight: 600;
      white-space: nowrap;
      font-variant-numeric: tabular-nums lining-nums;
    }

    /* Calendar Widget */
    .rk-cal-wrap {
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-2-card, #1d1916);
      padding: 16px;
    }
    .rk-cal-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
      gap: 8px;
    }
    .rk-cal-month {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.1rem;
      margin: 0;
    }
    .rk-cal-nav {
      display: flex;
      gap: 6px;
    }
    .rk-cal-nav-btn {
      min-width: 44px;
      min-height: 44px;
      background: var(--plane-1-surface, #161310);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      cursor: pointer;
      font-family: inherit;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-cal-nav-btn:hover { border-color: var(--accent-brass, #d4a86a); }
    .rk-cal-nav-btn:active { transform: scale(0.97); }
    .rk-cal-grid {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 4px;
    }
    .rk-cal-dow {
      text-align: center;
      font-size: 0.6875rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--ink-muted, #9a9086);
      padding: 6px 0;
    }
    .rk-cal-day {
      min-height: 44px;
      background: var(--plane-1-surface, #161310);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.08));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.85rem;
      font-variant-numeric: tabular-nums lining-nums;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-cal-day:hover:not(:disabled) { border-color: var(--accent-brass, #d4a86a); }
    .rk-cal-day:active:not(:disabled) { transform: scale(0.97); }
    .rk-cal-day:disabled {
      opacity: 0.32;
      cursor: not-allowed;
      background: transparent;
    }
    .rk-cal-day[aria-pressed="true"] {
      background: var(--accent-brass, #d4a86a);
      color: var(--accent-ink, #0b0907);
      border-color: var(--accent-brass, #d4a86a);
      font-weight: 600;
    }
    .rk-cal-blank {
      min-height: 44px;
    }
    .rk-lead-banner {
      margin-top: 12px;
      padding: 10px 12px;
      border-left: 2px solid var(--accent-brass, #d4a86a);
      background: var(--plane-1-surface, #161310);
      font-size: 0.8rem;
      color: var(--ink-secondary, #c6bcb0);
      line-height: 1.45;
    }

    /* Form Controls */
    .rk-form-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }
    .rk-field {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .rk-field-full {
      grid-column: 1 / -1;
    }
    .rk-label {
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink-secondary, #c6bcb0);
      font-weight: 500;
    }
    .rk-input,
    .rk-select,
    .rk-textarea {
      width: 100%;
      min-width: 0;
      min-height: 46px;
      box-sizing: border-box;
      padding: 10px 14px;
      background: var(--plane-2-card, #1d1916);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.92rem;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-textarea {
      min-height: 88px;
      resize: vertical;
    }
    .rk-input:focus,
    .rk-select:focus,
    .rk-textarea:focus {
      outline: 1px solid var(--accent-brass, #d4a86a);
      border-color: var(--accent-brass, #d4a86a);
    }
    .rk-field-err {
      font-size: 0.78rem;
      color: var(--color-destructive, #d96b52);
      min-height: 18px;
    }
    .rk-chip-group {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .rk-chip-btn {
      min-height: 44px;
      padding: 8px 14px;
      background: var(--plane-1-surface, #161310);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.82rem;
      text-align: left;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-chip-btn:hover { border-color: var(--accent-brass, #d4a86a); }
    .rk-chip-btn:active { transform: scale(0.97); }
    .rk-chip-btn[aria-pressed="true"] {
      border-color: var(--accent-brass, #d4a86a);
      background: var(--surface-tint, rgba(212, 168, 106, 0.08));
      color: var(--accent-brass, #d4a86a);
    }
    .rk-bk-actions {
      margin-top: 24px;
      padding-top: 20px;
      border-top: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    /* Step 4 Dossier */
    .rk-dossier-card {
      border: 1px solid var(--border-strong, rgba(212, 168, 106, 0.45));
      background: var(--plane-2-card, #1d1916);
      padding: 24px;
    }
    .rk-dossier-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
    }
    .rk-dossier-ref {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1.65rem;
      color: var(--accent-brass, #d4a86a);
      margin: 0;
      font-variant-numeric: tabular-nums lining-nums;
    }
    .rk-dossier-meta-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 16px;
      padding: 18px 0;
      border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-dossier-kv-label {
      display: block;
      font-size: 0.6875rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--ink-muted, #9a9086);
      margin-bottom: 4px;
    }
    .rk-dossier-kv-val {
      font-size: 0.9rem;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-dossier-items {
      list-style: none;
      margin: 0;
      padding: 14px 0;
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
    }
    .rk-dossier-items li {
      display: flex;
      justify-content: space-between;
      gap: 12px;
      padding: 6px 0;
      font-size: 0.9rem;
    }
    .rk-handoff-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 20px;
    }

    @media (max-width: 900px) {
      .rk-bk-format-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .rk-bk-split { grid-template-columns: 1fr; }
      .rk-dossier-meta-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .rk-handoff-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
    @media (max-width: 640px) {
      .rk-bk-head, .rk-bk-body { padding: 18px 16px; }
      .rk-bk-steps { grid-template-columns: repeat(2, 1fr); }
      .rk-bk-format-grid,
      .rk-quick-grid,
      .rk-form-grid,
      .rk-dossier-meta-grid,
      .rk-handoff-grid { grid-template-columns: 1fr; }
      .rk-drawer-cta-row { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
}

const SVG_CLOSE = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13"/></svg>`;
const SVG_PREV = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 2L4 7l5 5"/></svg>`;
const SVG_NEXT = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 2l5 5-5 5"/></svg>`;

export function initBookingEngine({ mountBooking, mountDrawer, kitchenData }) {
  injectBookingStyles();

  const bookingEl = resolveEl(mountBooking);
  const drawerEl = resolveEl(mountDrawer);

  const brand = (kitchenData && kitchenData.BRAND_PROFILE) || {};
  const zones = (kitchenData && Array.isArray(kitchenData.DELIVERY_ZONES) && kitchenData.DELIVERY_ZONES.length)
    ? kitchenData.DELIVERY_ZONES
    : [
        { id: "carteret-pickup", label: "Carteret, NJ Kitchen Pickup", description: "Direct pickup at RubzzKitchen", fee: 0, feeLabel: "Complimentary Pickup" },
        { id: "middlesex-union", label: "Middlesex & Union Counties", description: "Edison, Iselin, Woodbridge, Rahway", fee: null, feeLabel: "Quoted by Mileage" },
        { id: "central-north-nj", label: "Central & North NJ", description: "Jersey City, Princeton, Somerset, Newark", fee: null, feeLabel: "Quoted by Mileage" },
        { id: "tri-state-onsite", label: "NYC / Tri-State Venue Setup", description: "Full grazing & gala venue staging", fee: null, feeLabel: "Quoted by Venue Scope" },
      ];
  const banquetPackages = (kitchenData && Array.isArray(kitchenData.BANQUET_PACKAGES))
    ? kitchenData.BANQUET_PACKAGES.filter((p) => Number.isFinite(Number(p.price)) && p.price > 0)
    : [];
  const menuItems = (kitchenData && Array.isArray(kitchenData.MENU_ITEMS)) ? kitchenData.MENU_ITEMS : [];

  const whatsappNum = brand.whatsappNumber || "17324865390";
  const primaryTel = brand.primaryPhoneTel || "+17324865390";
  const igDmUrl = brand.igDmUrl || "https://ig.me/m/rubzzkitchen";
  const emailAddr = brand.email || "rubzzkitchen@gmail.com";

  const persisted = loadBagStorage();
  const today = new Date();
  const defaultDate = addDays(today, 4);

  const state = {
    lines: persisted.lines,
    meta: persisted.meta,
    drawerOpen: false,
    step: 1,
    serviceFormat: persisted.meta.orderMode || "trays",
    calendarYear: defaultDate.getFullYear(),
    calendarMonth: defaultDate.getMonth(),
    eventDate: toIsoDate(defaultDate),
    timeSlot: TIME_SLOTS[2],
    zoneId: zones[0].id,
    venueAddress: "",
    hostName: "",
    hostPhone: "",
    hostEmail: "",
    guestCount: Number(persisted.meta.guestCount) || 40,
    spiceLevel: persisted.meta.spiceLevel || SPICE_LEVELS[1],
    notes: persisted.meta.notes || "",
    errors: {},
    confirmedDossier: null,
  };

  const listeners = new Set();
  let lastFocusedBeforeDrawer = null;

  let toastEl = document.getElementById("rkStatusToast");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "rkStatusToast";
    toastEl.className = "rk-toast";
    toastEl.setAttribute("role", "status");
    toastEl.setAttribute("aria-live", "polite");
    toastEl.hidden = true;
    document.body.appendChild(toastEl);
  }
  let toastTimer = null;

  function showToast(message) {
    if (!toastEl) return;
    toastEl.innerHTML = `<span class="rk-toast-dot" aria-hidden="true"></span><span>${escapeHtml(message)}</span>`;
    toastEl.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 3000);
  }

  function computeTotals() {
    let subtotal = 0;
    let hasCustomQuote = false;
    let totalItems = 0;
    for (const line of state.lines) {
      const qty = Math.max(1, Number(line.qty) || 1);
      totalItems += qty;
      if (line.isCustomQuote || line.unitPrice === null || !Number.isFinite(Number(line.unitPrice))) {
        hasCustomQuote = true;
      } else {
        subtotal += Number(line.unitPrice) * qty;
      }
    }
    return { subtotal, hasCustomQuote, totalItems };
  }

  function getState() {
    const totals = computeTotals();
    return {
      lines: state.lines.map((l) => ({ ...l })),
      meta: { ...state.meta },
      subtotal: totals.subtotal,
      hasCustomQuote: totals.hasCustomQuote,
      totalItems: totals.totalItems,
      step: state.step,
      drawerOpen: state.drawerOpen,
    };
  }

  function updateHeaderCount() {
    const { totalItems } = computeTotals();
    const countEl = document.getElementById("rkBagCount");
    if (countEl) countEl.textContent = String(totalItems);
  }

  function notify() {
    saveBagStorage(state.lines, state.meta);
    updateHeaderCount();
    const snapshot = getState();
    for (const fn of listeners) {
      try {
        fn(snapshot);
      } catch {
        /* isolate subscriber errors */
      }
    }
  }

  function addItem({ lineId, title, subtitle = "", unitPrice = null, qty = 1, isCustomQuote = false, category = "catering" }) {
    if (!lineId || !title) return;
    const cleanQty = Math.max(1, Math.round(Number(qty) || 1));
    const numericPrice =
      unitPrice === null || unitPrice === undefined || unitPrice === "" || Number.isNaN(Number(unitPrice))
        ? null
        : Number(unitPrice);
    const customFlag = Boolean(isCustomQuote || numericPrice === null);
    const existing = state.lines.find((l) => l.lineId === lineId);
    if (existing) {
      existing.qty += cleanQty;
    } else {
      state.lines.push({
        lineId,
        title,
        subtitle,
        unitPrice: numericPrice,
        qty: cleanQty,
        isCustomQuote: customFlag,
        category,
      });
    }
    if (state.step === 4) {
      state.step = 1;
      state.confirmedDossier = null;
    }
    notify();
    renderDrawer();
    renderBooking();
    showToast(`Added ${title} to Order Ledger`);
  }

  function removeItem(lineId) {
    state.lines = state.lines.filter((l) => l.lineId !== lineId);
    notify();
    renderDrawer();
    renderBooking();
  }

  function updateQty(lineId, nextQty) {
    const qty = Math.round(Number(nextQty));
    if (!Number.isFinite(qty) || qty <= 0) {
      removeItem(lineId);
      return;
    }
    const found = state.lines.find((l) => l.lineId === lineId);
    if (!found) return;
    found.qty = Math.min(99, qty);
    notify();
    renderDrawer();
    renderBooking();
  }

  function clearBag() {
    state.lines = [];
    notify();
    renderDrawer();
    renderBooking();
    showToast("Order Ledger cleared");
  }

  function scrollToBooking() {
    const target = document.getElementById("book") || bookingEl;
    if (!target) return;
    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  }

  function applyPresetBuild(linesArray, meta = {}) {
    const merged = [];
    if (Array.isArray(linesArray)) {
      for (const raw of linesArray) {
        if (!raw || !raw.lineId || !raw.title) continue;
        const qty = Math.max(1, Math.round(Number(raw.qty) || 1));
        const price =
          raw.unitPrice === null || raw.unitPrice === undefined || Number.isNaN(Number(raw.unitPrice))
            ? null
            : Number(raw.unitPrice);
        const existing = merged.find((m) => m.lineId === raw.lineId);
        if (existing) {
          existing.qty += qty;
        } else {
          merged.push({
            lineId: raw.lineId,
            title: raw.title,
            subtitle: raw.subtitle || "",
            unitPrice: price,
            qty,
            isCustomQuote: Boolean(raw.isCustomQuote || price === null),
            category: raw.category || "catering",
          });
        }
      }
    }
    state.lines = merged;
    state.meta = { ...state.meta, ...meta };
    if (meta.guestCount) state.guestCount = Number(meta.guestCount) || state.guestCount;
    if (meta.orderMode && SERVICE_FORMATS.some((f) => f.id === meta.orderMode)) {
      state.serviceFormat = meta.orderMode;
    }
    if (meta.notes) state.notes = meta.notes;
    if (meta.spiceLevel) state.spiceLevel = meta.spiceLevel;
    state.step = 1;
    state.confirmedDossier = null;
    notify();
    renderDrawer();
    renderBooking();
    showToast("Culinary blueprint loaded into Reservation Desk");
    scrollToBooking();
  }

  function subscribe(fn) {
    if (typeof fn !== "function") return () => {};
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  function openDrawer() {
    lastFocusedBeforeDrawer = document.activeElement;
    state.drawerOpen = true;
    renderDrawer();
    const closeBtn = drawerEl && drawerEl.querySelector("[data-drawer-close]");
    if (closeBtn) closeBtn.focus();
  }

  function closeDrawer() {
    state.drawerOpen = false;
    renderDrawer();
    if (lastFocusedBeforeDrawer && typeof lastFocusedBeforeDrawer.focus === "function") {
      lastFocusedBeforeDrawer.focus();
    }
  }

  function renderDrawer() {
    if (!drawerEl) return;
    const { subtotal, hasCustomQuote, totalItems } = computeTotals();
    drawerEl.innerHTML = `
      <div class="rk-drawer-backdrop" data-open="${state.drawerOpen ? "true" : "false"}" data-drawer-backdrop>
        <div class="rk-drawer-panel" role="dialog" aria-modal="true" aria-label="Catering Order Ledger">
          <div class="rk-drawer-head">
            <div>
              <span class="rk-drawer-eyebrow">Active Selection · ${totalItems} ${totalItems === 1 ? "Item" : "Items"}</span>
              <h2 class="rk-drawer-title">Catering Order Ledger</h2>
            </div>
            <button type="button" class="rk-drawer-close" data-drawer-close aria-label="Close Order Ledger">
              ${SVG_CLOSE}
            </button>
          </div>
          <div class="rk-drawer-body">
            ${
              state.lines.length === 0
                ? `
                  <div class="rk-drawer-empty">
                    <h3>Your ledger is currently open</h3>
                    <p>Select trays from the Tasting Menu, design an exact guest build in the Portion Architect, or assemble a custom grazing setup.</p>
                    <button type="button" class="rk-btn-primary" data-drawer-browse>Browse Tasting Menu</button>
                  </div>
                `
                : state.lines
                    .map((line) => {
                      const lineTotal =
                        line.isCustomQuote || line.unitPrice === null
                          ? "Custom Quote"
                          : formatMoney(line.unitPrice * line.qty);
                      return `
                        <div class="rk-bag-ledger-row">
                          <div>
                            <p class="rk-ledger-item-title">${escapeHtml(line.title)}</p>
                            ${line.subtitle ? `<p class="rk-ledger-item-sub">${escapeHtml(line.subtitle)}</p>` : ""}
                            <div class="rk-ledger-controls">
                              <div class="rk-stepper" aria-label="Quantity for ${escapeHtml(line.title)}">
                                <button type="button" class="rk-step-btn" data-qty-dec="${escapeHtml(line.lineId)}" aria-label="Decrease quantity">-</button>
                                <span class="rk-step-qty">${line.qty}</span>
                                <button type="button" class="rk-step-btn" data-qty-inc="${escapeHtml(line.lineId)}" aria-label="Increase quantity">+</button>
                              </div>
                              <button type="button" class="rk-btn-destructive" data-remove-line="${escapeHtml(line.lineId)}">Remove</button>
                            </div>
                          </div>
                          <div class="rk-ledger-price">${escapeHtml(lineTotal)}</div>
                        </div>
                      `;
                    })
                    .join("")
            }
          </div>
          <div class="rk-drawer-foot">
            <div class="rk-subtotal-row">
              <span class="rk-subtotal-label">Priced Subtotal</span>
              <span class="rk-subtotal-val">${escapeHtml(formatMoney(subtotal))}</span>
            </div>
            ${
              hasCustomQuote
                ? `<p class="rk-quote-note">+ Custom-Quoted Grazing or Seasonal Selection included</p>`
                : ""
            }
            <div class="rk-drawer-cta-row">
              ${
                state.lines.length > 0
                  ? `<button type="button" class="rk-btn-destructive" data-clear-ledger>Clear Ledger</button>`
                  : `<span></span>`
              }
              <button type="button" class="rk-btn-primary" data-proceed-booking>Proceed to Reservation Desk</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  function getQuickAddChoices() {
    const choices = [];
    for (const pkg of banquetPackages.slice(0, 4)) {
      choices.push({
        lineId: `pkg-${pkg.id}`,
        title: pkg.name,
        subtitle: `${pkg.guestCount} Guests · Includes Naan, Salad & Chutney`,
        unitPrice: pkg.price,
        category: "banquet-packages",
      });
    }
    const signatureNames = ["Goat Biryani", "Beef Nihari", "Mix Baked Boneless", "Chana Chaat"];
    for (const hint of signatureNames) {
      const item = menuItems.find((m) => m.name && m.name.toLowerCase().includes(hint.toLowerCase()));
      if (item && Array.isArray(item.options) && item.options[0]) {
        const opt = item.options[0];
        choices.push({
          lineId: `${item.id}-${opt.optionId || "small"}`,
          title: item.name,
          subtitle: `${opt.label}${opt.servesText ? ` · ${opt.servesText}` : ""}`,
          unitPrice: opt.price,
          category: item.categoryId || "entrees",
        });
      }
    }
    return choices;
  }

  function renderStep1() {
    const { subtotal, hasCustomQuote } = computeTotals();
    const quickChoices = getQuickAddChoices();
    return `
      <div>
        <div class="rk-bk-format-grid" role="group" aria-label="Service Format">
          ${SERVICE_FORMATS.map((fmt) => {
            const pressed = state.serviceFormat === fmt.id;
            return `
              <button type="button" class="rk-bk-format-btn" data-format="${fmt.id}" aria-pressed="${pressed ? "true" : "false"}">
                ${escapeHtml(fmt.label)}
                <span class="rk-bk-format-sub">${escapeHtml(fmt.leadText)}</span>
              </button>
            `;
          }).join("")}
        </div>
        <div class="rk-bk-split">
          <div class="rk-bk-panel">
            <h3 class="rk-bk-panel-title">Active Order Ledger</h3>
            ${
              state.lines.length === 0
                ? `<p style="color: var(--ink-secondary); font-size: 0.9rem; line-height: 1.55; margin: 0;">No trays or packages added yet. Use the quick-add banquet &amp; signature trays on the right, or continue directly for a custom event consultation.</p>`
                : `
                  <div>
                    ${state.lines
                      .map((l) => {
                        const lineSub =
                          l.isCustomQuote || l.unitPrice === null ? "Custom Quote" : formatMoney(l.unitPrice * l.qty);
                        return `
                          <div class="rk-bag-ledger-row">
                            <div>
                              <p class="rk-ledger-item-title">${escapeHtml(l.title)}</p>
                              ${l.subtitle ? `<p class="rk-ledger-item-sub">${escapeHtml(l.subtitle)}</p>` : ""}
                              <div class="rk-ledger-controls">
                                <div class="rk-stepper">
                                  <button type="button" class="rk-step-btn" data-qty-dec="${escapeHtml(l.lineId)}" aria-label="Decrease ${escapeHtml(l.title)}">-</button>
                                  <span class="rk-step-qty">${l.qty}</span>
                                  <button type="button" class="rk-step-btn" data-qty-inc="${escapeHtml(l.lineId)}" aria-label="Increase ${escapeHtml(l.title)}">+</button>
                                </div>
                                <button type="button" class="rk-btn-destructive" data-remove-line="${escapeHtml(l.lineId)}">Remove</button>
                              </div>
                            </div>
                            <div class="rk-ledger-price">${escapeHtml(lineSub)}</div>
                          </div>
                        `;
                      })
                      .join("")}
                    <div class="rk-subtotal-row" style="margin-top: 14px;">
                      <span class="rk-subtotal-label">Current Priced Subtotal</span>
                      <span class="rk-subtotal-val">${escapeHtml(formatMoney(subtotal))}${hasCustomQuote ? " + Quote" : ""}</span>
                    </div>
                  </div>
                `
            }
          </div>
          <div class="rk-bk-panel">
            <h3 class="rk-bk-panel-title">Quick-Add Dawats &amp; Signature Trays</h3>
            <div class="rk-quick-grid">
              ${quickChoices
                .map(
                  (c, idx) => `
                  <button type="button" class="rk-quick-add" data-quick-idx="${idx}">
                    <span>
                      <strong style="display:block; font-weight:500;">${escapeHtml(c.title)}</strong>
                      <span style="font-size:0.74rem; color:var(--ink-secondary);">${escapeHtml(c.subtitle)}</span>
                    </span>
                    <span class="rk-quick-price">+ ${escapeHtml(formatMoney(c.unitPrice))}</span>
                  </button>
                `
                )
                .join("")}
            </div>
          </div>
        </div>
        <div class="rk-bk-actions">
          <span style="font-size:0.84rem; color:var(--ink-secondary);">50% retainer secures event &amp; grazing dates.</span>
          <button type="button" class="rk-btn-primary" data-step-next="2">Continue to Date &amp; NJ Zone</button>
        </div>
      </div>
    `;
  }

  function renderStep2() {
    const y = state.calendarYear;
    const m = state.calendarMonth;
    const firstDow = new Date(y, m, 1).getDay();
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const minRecommended = state.serviceFormat === "grazing" ? addDays(todayStart, 7) : state.serviceFormat === "frozen" ? todayStart : addDays(todayStart, 3);
    const activeFmt = SERVICE_FORMATS.find((f) => f.id === state.serviceFormat) || SERVICE_FORMATS[0];

    let dayCells = "";
    for (let i = 0; i < firstDow; i++) {
      dayCells += `<span class="rk-cal-blank" aria-hidden="true"></span>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const cellDate = new Date(y, m, d);
      const iso = toIsoDate(cellDate);
      const isPast = cellDate < todayStart;
      const isSelected = state.eventDate === iso;
      dayCells += `
        <button type="button" class="rk-cal-day" data-cal-date="${iso}" aria-pressed="${isSelected ? "true" : "false"}" ${isPast ? "disabled" : ""}>
          ${d}
        </button>
      `;
    }

    const selectedDateObj = state.eventDate ? new Date(`${state.eventDate}T12:00:00`) : null;
    const isShortNotice = selectedDateObj && selectedDateObj < minRecommended && state.serviceFormat !== "frozen";
    const activeZone = zones.find((z) => z.id === state.zoneId) || zones[0];
    const needsAddress = activeZone && activeZone.id !== "carteret-pickup";

    return `
      <div class="rk-bk-split">
        <div class="rk-cal-wrap">
          <div class="rk-cal-head">
            <h3 class="rk-cal-month">${MONTHS[m]} ${y}</h3>
            <div class="rk-cal-nav">
              <button type="button" class="rk-cal-nav-btn" data-cal-prev aria-label="Previous Month">${SVG_PREV}</button>
              <button type="button" class="rk-cal-nav-btn" data-cal-next aria-label="Next Month">${SVG_NEXT}</button>
            </div>
          </div>
          <div class="rk-cal-grid" role="group" aria-label="Select Event Date">
            ${WEEKDAYS.map((w) => `<span class="rk-cal-dow">${w}</span>`).join("")}
            ${dayCells}
          </div>
          <div class="rk-lead-banner">
            Selected: <strong>${escapeHtml(formatHumanDate(state.eventDate))}</strong> · ${escapeHtml(activeFmt.leadText)}.
            ${isShortNotice ? `<br>Short-notice date selected: kitchen availability will be confirmed directly by phone.` : ""}
          </div>
          ${state.errors.eventDate ? `<span class="rk-field-err">${escapeHtml(state.errors.eventDate)}</span>` : ""}
        </div>

        <div style="display:flex; flex-direction:column; gap:18px;">
          <div class="rk-bk-panel">
            <h3 class="rk-bk-panel-title">Service Window</h3>
            <div class="rk-chip-group" role="group" aria-label="Time Window">
              ${TIME_SLOTS.map((slot) => `
                <button type="button" class="rk-chip-btn" data-time-slot="${escapeHtml(slot)}" aria-pressed="${state.timeSlot === slot ? "true" : "false"}">${escapeHtml(slot)}</button>
              `).join("")}
            </div>
          </div>

          <div class="rk-bk-panel">
            <h3 class="rk-bk-panel-title">NJ / Tri-State Fulfillment Zone</h3>
            <div class="rk-chip-group" role="group" aria-label="Fulfillment Zone">
              ${zones
                .map(
                  (z) => `
                  <button type="button" class="rk-chip-btn" data-zone-id="${escapeHtml(z.id)}" aria-pressed="${state.zoneId === z.id ? "true" : "false"}" style="width:100%;">
                    <strong style="display:block; font-weight:500;">${escapeHtml(z.label)}</strong>
                    <span style="font-size:0.75rem; color:var(--ink-secondary);">${escapeHtml(z.description || "")} · ${escapeHtml(z.feeLabel || "")}</span>
                  </button>
                `
                )
                .join("")}
            </div>
            ${
              needsAddress
                ? `
                  <div class="rk-field" style="margin-top:14px;">
                    <label for="rkVenueAddress" class="rk-label">Venue or Street Address (NJ / NY)</label>
                    <input id="rkVenueAddress" class="rk-input" type="text" value="${escapeHtml(state.venueAddress)}" placeholder="Street address, hall name, or city">
                    <span class="rk-field-err">${escapeHtml(state.errors.venueAddress || "")}</span>
                  </div>
                `
                : ""
            }
          </div>
        </div>
      </div>
      <div class="rk-bk-actions">
        <button type="button" class="rk-btn-ghost" data-step-prev="1">Back to Selections</button>
        <button type="button" class="rk-btn-primary" data-step-next="3">Continue to Host Details</button>
      </div>
    `;
  }

  function renderStep3() {
    return `
      <form data-booking-form novalidate>
        <div class="rk-form-grid">
          <div class="rk-field">
            <label for="rkHostName" class="rk-label">Host Full Name</label>
            <input id="rkHostName" class="rk-input" type="text" required autocomplete="name" value="${escapeHtml(state.hostName)}" placeholder="Full name for the dossier">
            <span class="rk-field-err">${escapeHtml(state.errors.hostName || "")}</span>
          </div>
          <div class="rk-field">
            <label for="rkHostPhone" class="rk-label">Mobile Phone</label>
            <input id="rkHostPhone" class="rk-input" type="tel" required autocomplete="tel" value="${escapeHtml(state.hostPhone)}" placeholder="(732) 555-0148">
            <span class="rk-field-err">${escapeHtml(state.errors.hostPhone || "")}</span>
          </div>
          <div class="rk-field">
            <label for="rkHostEmail" class="rk-label">Email Address</label>
            <input id="rkHostEmail" class="rk-input" type="email" required autocomplete="email" value="${escapeHtml(state.hostEmail)}" placeholder="host@example.com">
            <span class="rk-field-err">${escapeHtml(state.errors.hostEmail || "")}</span>
          </div>
          <div class="rk-field">
            <label for="rkGuestCount" class="rk-label">Estimated Guest Count</label>
            <input id="rkGuestCount" class="rk-input" type="number" min="1" max="1000" value="${escapeHtml(String(state.guestCount))}">
            <span class="rk-field-err">${escapeHtml(state.errors.guestCount || "")}</span>
          </div>
          <div class="rk-field rk-field-full">
            <span class="rk-label">Kitchen Spice Calibration</span>
            <div class="rk-chip-group" role="group" aria-label="Spice Calibration">
              ${SPICE_LEVELS.map(
                (sp) => `
                  <button type="button" class="rk-chip-btn" data-spice-level="${escapeHtml(sp)}" aria-pressed="${state.spiceLevel === sp ? "true" : "false"}">${escapeHtml(sp)}</button>
                `
              ).join("")}
            </div>
          </div>
          <div class="rk-field rk-field-full">
            <label for="rkHostNotes" class="rk-label">Chafing Racks, Extra Naan Count &amp; Dietary / Setup Notes</label>
            <textarea id="rkHostNotes" class="rk-textarea" placeholder="Let us know if you need chafing sets, extra naan, nut-free trays, or grazing table dimensions...">${escapeHtml(state.notes)}</textarea>
          </div>
        </div>
        <div class="rk-bk-actions">
          <button type="button" class="rk-btn-ghost" data-step-prev="2">Back to Date &amp; Zone</button>
          <button type="submit" class="rk-btn-primary">Generate Catering Dossier</button>
        </div>
      </form>
    `;
  }

  function renderStep4() {
    const dossier = state.confirmedDossier;
    if (!dossier) {
      state.step = 1;
      return renderStep1();
    }
    const briefText = buildOrderBriefText(dossier);
    const encodedBrief = encodeURIComponent(briefText);
    const waHref = `https://wa.me/${whatsappNum}?text=${encodedBrief}`;
    const smsHref = `sms:${primaryTel}?body=${encodedBrief}`;
    const mailSubject = encodeURIComponent(`RubzzKitchen Inquiry ${dossier.refId} - ${formatHumanDate(dossier.eventDate)}`);
    const mailHref = `mailto:${emailAddr}?subject=${mailSubject}&body=${encodedBrief}`;
    const retainerAmt = dossier.subtotal > 0 ? Math.round(dossier.subtotal * 0.5) : 0;

    return `
      <div class="rk-dossier-card">
        <div class="rk-dossier-top">
          <div>
            <span class="rk-bk-eyebrow">Confirmed Event &amp; Order Dossier</span>
            <h3 class="rk-dossier-ref">${escapeHtml(dossier.refId)}</h3>
          </div>
          <div style="text-align:right;">
            <span class="rk-dossier-kv-label">Priced Subtotal</span>
            <strong class="rk-subtotal-val">${escapeHtml(formatMoney(dossier.subtotal))}${dossier.hasCustomQuote ? " + Custom Quote" : ""}</strong>
            ${retainerAmt > 0 ? `<div style="font-size:0.78rem; color:var(--ink-secondary); margin-top:4px;">50% Date Retainer Estimate: ${escapeHtml(formatMoney(retainerAmt))}</div>` : ""}
          </div>
        </div>

        <div class="rk-dossier-meta-grid">
          <div>
            <span class="rk-dossier-kv-label">Host Contact</span>
            <span class="rk-dossier-kv-val">${escapeHtml(dossier.hostName)}<br>${escapeHtml(dossier.hostPhone)}<br>${escapeHtml(dossier.hostEmail)}</span>
          </div>
          <div>
            <span class="rk-dossier-kv-label">Event Date &amp; Window</span>
            <span class="rk-dossier-kv-val">${escapeHtml(formatHumanDate(dossier.eventDate))}<br>${escapeHtml(dossier.timeSlot)}<br>${escapeHtml(String(dossier.guestCount))} Guests · ${escapeHtml(dossier.spiceLevel)}</span>
          </div>
          <div>
            <span class="rk-dossier-kv-label">Fulfillment Zone</span>
            <span class="rk-dossier-kv-val">${escapeHtml(dossier.zoneLabel)}${dossier.venueAddress ? `<br>${escapeHtml(dossier.venueAddress)}` : ""}</span>
          </div>
        </div>

        <ul class="rk-dossier-items">
          ${
            dossier.lines.length
              ? dossier.lines
                  .map(
                    (l) => `
                  <li>
                    <span>${l.qty}x ${escapeHtml(l.title)}${l.subtitle ? ` (${escapeHtml(l.subtitle)})` : ""}</span>
                    <strong style="color:var(--accent-brass); font-variant-numeric: tabular-nums lining-nums;">${
                      l.isCustomQuote || l.unitPrice === null ? "Custom Quote" : escapeHtml(formatMoney(l.unitPrice * l.qty))
                    }</strong>
                  </li>
                `
                  )
                  .join("")
              : `<li><span>${escapeHtml(dossier.serviceFormatLabel)} Consultation</span><strong>Quote on Confirmation</strong></li>`
          }
        </ul>

        ${dossier.notes ? `<p style="font-size:0.86rem; color:var(--ink-secondary); margin:12px 0 0;">Notes: ${escapeHtml(dossier.notes)}</p>` : ""}
        <p style="font-size:0.8rem; color:var(--ink-muted); margin:12px 0 0;">A 50% retainer holds your event or grazing table date on RubzzKitchen's calendar. Send your dossier via any direct channel below.</p>

        <div class="rk-handoff-grid">
          <a class="rk-btn-primary" href="${waHref}" target="_blank" rel="noopener noreferrer">Send via WhatsApp · (732) 486-5390</a>
          <a class="rk-btn-ghost" href="${smsHref}">Text Kitchen · (732) 486-5390</a>
          <button type="button" class="rk-btn-ghost" data-ig-handoff>Instagram DM · @rubzzkitchen</button>
          <a class="rk-btn-ghost" href="${mailHref}">Email Dossier · rubzzkitchen@gmail.com</a>
          <button type="button" class="rk-btn-ghost" data-download-ics>Download .ics Calendar Hold</button>
          <button type="button" class="rk-btn-ghost" data-copy-dossier>Copy Order Summary</button>
        </div>

        <div class="rk-bk-actions">
          <button type="button" class="rk-btn-ghost" data-step-prev="3">Edit Host Details</button>
          <button type="button" class="rk-btn-ghost" data-new-order>Start Another Inquiry</button>
        </div>
      </div>
    `;
  }

  function renderBooking() {
    if (!bookingEl) return;
    const stepLabels = [
      { n: 1, title: "Service & Trays" },
      { n: 2, title: "Date & NJ Zone" },
      { n: 3, title: "Host & Calibration" },
      { n: 4, title: "Dossier & Dispatch" },
    ];
    let stepContent = "";
    if (state.step === 1) stepContent = renderStep1();
    else if (state.step === 2) stepContent = renderStep2();
    else if (state.step === 3) stepContent = renderStep3();
    else stepContent = renderStep4();

    bookingEl.innerHTML = `
      <div class="rk-bk-shell">
        <div class="rk-bk-head">
          <div>
            <span class="rk-bk-eyebrow">Carteret, NJ · Direct Reservation Desk</span>
            <h2 class="rk-bk-heading">Catering &amp; Grazing Concierge</h2>
          </div>
          <span style="font-size:0.84rem; color:var(--ink-secondary);">100% Zabiha Halal · Direct Kitchen Line (732) 486-5390</span>
        </div>
        <div class="rk-bk-steps" role="tablist" aria-label="Booking Concierge Steps">
          ${stepLabels
            .map(
              (s) => `
              <button type="button" class="rk-bk-step-tab" data-jump-step="${s.n}" ${state.step === s.n ? 'aria-current="step"' : ""}>
                <span class="rk-bk-step-num">Step 0${s.n}</span>
                ${escapeHtml(s.title)}
              </button>
            `
            )
            .join("")}
        </div>
        <div class="rk-bk-body">${stepContent}</div>
      </div>
    `;
  }

  function validateStep2() {
    const errors = {};
    if (!state.eventDate) errors.eventDate = "Please choose an event or pickup date.";
    const activeZone = zones.find((z) => z.id === state.zoneId) || zones[0];
    if (activeZone && activeZone.id !== "carteret-pickup" && !state.venueAddress.trim()) {
      errors.venueAddress = "Enter your venue or street address for delivery/setup.";
    }
    state.errors = errors;
    return Object.keys(errors).length === 0;
  }

  function validateStep3() {
    const errors = {};
    if (!state.hostName.trim()) errors.hostName = "Host name is required.";
    const digits = state.hostPhone.replace(/\D/g, "");
    if (digits.length < 7) errors.hostPhone = "Enter a valid mobile phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.hostEmail.trim())) {
      errors.hostEmail = "Enter a valid email address.";
    }
    if (!Number.isFinite(Number(state.guestCount)) || Number(state.guestCount) < 1) {
      errors.guestCount = "Enter estimated guest count.";
    }
    state.errors = errors;
    return Object.keys(errors).length === 0;
  }

  function finalizeDossier() {
    const totals = computeTotals();
    const activeFmt = SERVICE_FORMATS.find((f) => f.id === state.serviceFormat) || SERVICE_FORMATS[0];
    const activeZone = zones.find((z) => z.id === state.zoneId) || zones[0];
    const seed = `${state.eventDate}|${state.hostPhone}|${state.hostName}|${state.lines.map((l) => l.lineId).join(",")}`;
    const refId = generateDeterministicRef(seed);
    const dossier = {
      refId,
      createdAt: new Date().toISOString(),
      serviceFormat: activeFmt.id,
      serviceFormatLabel: activeFmt.label,
      eventDate: state.eventDate,
      timeSlot: state.timeSlot,
      zoneId: activeZone.id,
      zoneLabel: activeZone.label,
      venueAddress: activeZone.id === "carteret-pickup" ? "" : state.venueAddress.trim(),
      hostName: state.hostName.trim(),
      hostPhone: state.hostPhone.trim(),
      hostEmail: state.hostEmail.trim(),
      guestCount: Number(state.guestCount) || 40,
      spiceLevel: state.spiceLevel,
      notes: state.notes.trim(),
      lines: state.lines.map((l) => ({ ...l })),
      subtotal: totals.subtotal,
      hasCustomQuote: totals.hasCustomQuote,
    };
    state.confirmedDossier = dossier;
    state.step = 4;
    saveOrderDossier(dossier);
    renderBooking();
  }

  if (drawerEl) {
    drawerEl.addEventListener("click", (ev) => {
      if (ev.target.hasAttribute("data-drawer-backdrop") || ev.target.closest("[data-drawer-close]")) {
        closeDrawer();
        return;
      }
      if (ev.target.closest("[data-drawer-browse]")) {
        closeDrawer();
        const menuSec = document.getElementById("menu");
        if (menuSec) menuSec.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      const incBtn = ev.target.closest("[data-qty-inc]");
      if (incBtn) {
        const id = incBtn.getAttribute("data-qty-inc");
        const found = state.lines.find((l) => l.lineId === id);
        if (found) updateQty(id, found.qty + 1);
        return;
      }
      const decBtn = ev.target.closest("[data-qty-dec]");
      if (decBtn) {
        const id = decBtn.getAttribute("data-qty-dec");
        const found = state.lines.find((l) => l.lineId === id);
        if (found) updateQty(id, found.qty - 1);
        return;
      }
      const remBtn = ev.target.closest("[data-remove-line]");
      if (remBtn) {
        removeItem(remBtn.getAttribute("data-remove-line"));
        return;
      }
      if (ev.target.closest("[data-clear-ledger]")) {
        clearBag();
        return;
      }
      if (ev.target.closest("[data-proceed-booking]")) {
        closeDrawer();
        scrollToBooking();
      }
    });
  }

  if (bookingEl) {
    bookingEl.addEventListener("input", (ev) => {
      const t = ev.target;
      if (!t) return;
      if (t.id === "rkVenueAddress") state.venueAddress = t.value;
      else if (t.id === "rkHostName") state.hostName = t.value;
      else if (t.id === "rkHostPhone") state.hostPhone = t.value;
      else if (t.id === "rkHostEmail") state.hostEmail = t.value;
      else if (t.id === "rkGuestCount") state.guestCount = Number(t.value) || 1;
      else if (t.id === "rkHostNotes") state.notes = t.value;
    });

    bookingEl.addEventListener("submit", (ev) => {
      if (ev.target && ev.target.hasAttribute("data-booking-form")) {
        ev.preventDefault();
        if (validateStep3()) {
          finalizeDossier();
        } else {
          renderBooking();
        }
      }
    });

    bookingEl.addEventListener("click", async (ev) => {
      const formatBtn = ev.target.closest("[data-format]");
      if (formatBtn) {
        state.serviceFormat = formatBtn.getAttribute("data-format");
        renderBooking();
        return;
      }
      const quickBtn = ev.target.closest("[data-quick-idx]");
      if (quickBtn) {
        const choices = getQuickAddChoices();
        const choice = choices[Number(quickBtn.getAttribute("data-quick-idx"))];
        if (choice) addItem(choice);
        return;
      }
      const incBtn = ev.target.closest("[data-qty-inc]");
      if (incBtn) {
        const id = incBtn.getAttribute("data-qty-inc");
        const found = state.lines.find((l) => l.lineId === id);
        if (found) updateQty(id, found.qty + 1);
        return;
      }
      const decBtn = ev.target.closest("[data-qty-dec]");
      if (decBtn) {
        const id = decBtn.getAttribute("data-qty-dec");
        const found = state.lines.find((l) => l.lineId === id);
        if (found) updateQty(id, found.qty - 1);
        return;
      }
      const remBtn = ev.target.closest("[data-remove-line]");
      if (remBtn) {
        removeItem(remBtn.getAttribute("data-remove-line"));
        return;
      }
      if (ev.target.closest("[data-cal-prev]")) {
        if (state.calendarMonth === 0) {
          state.calendarMonth = 11;
          state.calendarYear -= 1;
        } else {
          state.calendarMonth -= 1;
        }
        renderBooking();
        return;
      }
      if (ev.target.closest("[data-cal-next]")) {
        if (state.calendarMonth === 11) {
          state.calendarMonth = 0;
          state.calendarYear += 1;
        } else {
          state.calendarMonth += 1;
        }
        renderBooking();
        return;
      }
      const calDay = ev.target.closest("[data-cal-date]");
      if (calDay && !calDay.disabled) {
        state.eventDate = calDay.getAttribute("data-cal-date");
        state.errors.eventDate = "";
        renderBooking();
        return;
      }
      const slotBtn = ev.target.closest("[data-time-slot]");
      if (slotBtn) {
        state.timeSlot = slotBtn.getAttribute("data-time-slot");
        renderBooking();
        return;
      }
      const zoneBtn = ev.target.closest("[data-zone-id]");
      if (zoneBtn) {
        state.zoneId = zoneBtn.getAttribute("data-zone-id");
        state.errors.venueAddress = "";
        renderBooking();
        return;
      }
      const spiceBtn = ev.target.closest("[data-spice-level]");
      if (spiceBtn) {
        state.spiceLevel = spiceBtn.getAttribute("data-spice-level");
        renderBooking();
        return;
      }
      const nextBtn = ev.target.closest("[data-step-next]");
      if (nextBtn) {
        const targetStep = Number(nextBtn.getAttribute("data-step-next"));
        if (state.step === 2 && targetStep === 3 && !validateStep2()) {
          renderBooking();
          return;
        }
        state.errors = {};
        state.step = targetStep;
        renderBooking();
        return;
      }
      const prevBtn = ev.target.closest("[data-step-prev]");
      if (prevBtn) {
        state.errors = {};
        state.step = Number(prevBtn.getAttribute("data-step-prev"));
        renderBooking();
        return;
      }
      const jumpBtn = ev.target.closest("[data-jump-step]");
      if (jumpBtn) {
        const targetStep = Number(jumpBtn.getAttribute("data-jump-step"));
        if (targetStep === 4 && !state.confirmedDossier) {
          if (validateStep2() && validateStep3()) finalizeDossier();
          else renderBooking();
          return;
        }
        state.errors = {};
        state.step = targetStep;
        renderBooking();
        return;
      }
      const igBtn = ev.target.closest("[data-ig-handoff]");
      if (igBtn && state.confirmedDossier) {
        const text = buildOrderBriefText(state.confirmedDossier);
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          /* ignore clipboard denial */
        }
        showToast("Dossier copied for Instagram DM");
        window.open(igDmUrl, "_blank", "noopener,noreferrer");
        return;
      }
      const icsBtn = ev.target.closest("[data-download-ics]");
      if (icsBtn && state.confirmedDossier) {
        const ics = buildIcsContent(state.confirmedDossier);
        const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `rubzzkitchen-${state.confirmedDossier.refId.toLowerCase()}.ics`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showToast("Calendar hold (.ics) downloaded");
        return;
      }
      const copyBtn = ev.target.closest("[data-copy-dossier]");
      if (copyBtn && state.confirmedDossier) {
        const text = buildOrderBriefText(state.confirmedDossier);
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          /* ignore clipboard denial */
        }
        copyBtn.textContent = "Copied";
        setTimeout(() => {
          if (copyBtn.isConnected) copyBtn.textContent = "Copy Order Summary";
        }, 2000);
        return;
      }
      if (ev.target.closest("[data-new-order]")) {
        state.confirmedDossier = null;
        state.step = 1;
        renderBooking();
      }
    });
  }

  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && state.drawerOpen) {
      closeDrawer();
    }
  });

  updateHeaderCount();
  renderDrawer();
  renderBooking();

  return {
    addItem,
    removeItem,
    updateQty,
    clearBag,
    applyPresetBuild,
    getState,
    subscribe,
    openDrawer,
    closeDrawer,
    scrollToBooking,
  };
}
