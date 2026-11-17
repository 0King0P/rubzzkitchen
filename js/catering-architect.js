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
      width: 100%;
      accent-color: var(--accent-brass, #d4a86a);
      height: 6px;
      cursor: pointer;
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
      align-items: baseline;
      padding-top: 8px;
      gap: 12px;
    }

    /* Grazing Scenography Studio */
    .rk-grz-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
    }
    .rk-grz-preview {
      padding: 26px 28px;
      background: var(--plane-2-card, #1d1916);
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .rk-grz-frame {
      position: relative;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-0-void, #0a0807);
    }
    .rk-grz-frame img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    .rk-grz-specs {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
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
      font-size: 1rem;
      color: var(--ink-primary, #f5efe6);
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

    @media (max-width: 940px) {
      .rk-arch-col-left,
      .rk-arch-col-right {
        grid-column: span 12;
        border-right: none;
      }
      .rk-arch-col-left {
        border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      }
      .rk-grz-grid,
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
      .rk-grz-preview,
      .rk-frz-foot {
        padding: 18px 16px;
      }
      .rk-opt-grid,
      .rk-arbitrage-toggle,
      .rk-grz-specs {
        grid-template-columns: 1fr;
      }
      .rk-frz-row {
        padding: 14px 16px;
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
        { id: "pipette-chaat", name: "Pipette Chana Chaat Shooters", detail: "Individual glass cups with tamarind pipettes", imageSrc: "./assets/portfolio/pipette-chaat-shooters.jpg" },
        { id: "croissant-sliders", name: "Flaky Croissant & Brioche Sliders", detail: "Tiered savory cafe sliders & tea sandwiches", imageSrc: "./assets/portfolio/croissant-brioche-table.jpg" },
        { id: "samosa-flight", name: "Hand-Folded Samosa & Spring Roll Flight", detail: "Crisp zabiha halal pastries & mint chutney", imageSrc: "./assets/generated/grazing-architectural-spread.jpg" },
        { id: "halal-charcuterie", name: "Halal Charcuterie & Orchard Fruit", detail: "Artisan cheeses, figs, grapes & nuts", imageSrc: "./assets/portfolio/charcuterie-grazing-spread.jpg" },
        { id: "kheer-parfait", name: "Individual Kheer & Parfait Cups", detail: "Cardamom rice pudding with pistachio & rose", imageSrc: "./assets/portfolio/autumn-grazing-cups.jpg" },
        { id: "floral-brass", name: "Floral & Brass Riser Styling", detail: "Candlelit multi-plane architectural styling", imageSrc: "./assets/portfolio/grazing-magic-table.jpg" },
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

  function renderPortionArchitect() {
    if (!archEl) return;
    const bp = computeBlueprint();
    const activeOccasion = OCCASIONS.find((o) => o.id === archState.occasionId) || OCCASIONS[0];
    const activeProtein = PROTEINS.find((p) => p.id === archState.proteinId) || PROTEINS[0];

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
              <input id="rkGuestSlider" class="rk-range" type="range" min="15" max="250" step="5" value="${archState.guestCount}" aria-label="Guest Count Slider">
              <div style="display:flex; justify-content:space-between; font-size:0.74rem; color:var(--ink-muted); margin-top:6px;">
                <span>15 Guests</span>
                <span>40 Dawat</span>
                <span>100 Banquet</span>
                <span>250 Gala</span>
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

            ${arbitrageHtml}

            <ul class="rk-bp-list">${linesHtml}</ul>

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
        archState.guestCount = Number(ev.target.value) || 40;
        renderPortionArchitect();
      }
    });

    archEl.addEventListener("click", (ev) => {
      if (ev.target.closest("[data-arch-guest-dec]")) {
        archState.guestCount = Math.max(15, archState.guestCount - 5);
        renderPortionArchitect();
        return;
      }
      if (ev.target.closest("[data-arch-guest-inc]")) {
        archState.guestCount = Math.min(250, archState.guestCount + 5);
        renderPortionArchitect();
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
        renderPortionArchitect();
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
  };

  function getGrazingPreviewImage() {
    if (grazingState.selectedStations.includes("pipette-chaat") || grazingState.selectedStations.some((id) => id.includes("pipette") || id.includes("chaat"))) {
      return {
        src: "./assets/portfolio/pipette-chaat-shooters.jpg",
        alt: "RubzzKitchen pipette chana chaat shooters and tea sandwiches",
      };
    }
    if (grazingState.selectedStations.some((id) => id.includes("croissant") || id.includes("slider"))) {
      return {
        src: "./assets/portfolio/croissant-brioche-table.jpg",
        alt: "RubzzKitchen tiered croissant sandwiches and brioche sliders",
      };
    }
    return {
      src: "./assets/generated/grazing-architectural-spread.jpg",
      alt: "RubzzKitchen architectural halal grazing installation",
    };
  }

  function renderGrazingStudio() {
    if (!grazingEl) return;
    const activeTier = grazingTiers.find((t) => t.id === grazingState.tierId) || grazingTiers[0];
    const lastSelectedId = grazingState.selectedStations[grazingState.selectedStations.length - 1];
    const lastStation = grazingStations.find((s) => s.id === lastSelectedId);
    const fallbackPreview = getGrazingPreviewImage();
    const previewSrc = (lastStation && lastStation.imageSrc) || fallbackPreview.src;
    const previewAlt = (lastStation && lastStation.name) || fallbackPreview.alt;

    const footprint = activeTier.footprint || (activeTier.id.includes("petite") ? "6 ft" : activeTier.id.includes("grand") ? "12-16 ft" : "8-10 ft");
    const setupWin = activeTier.setupWindow || (activeTier.id.includes("petite") ? "75 min" : activeTier.id.includes("grand") ? "3 hrs" : "2 hrs");

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
          <div class="rk-arch-col-left" style="border-right:1px solid var(--border-hairline);">
            <div>
              <span class="rk-control-label">01 · Table Scale &amp; Guest Footprint</span>
              <div class="rk-opt-grid" role="group" aria-label="Grazing Table Scale" style="grid-template-columns:repeat(3, minmax(0, 1fr));">
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
              <div class="rk-opt-grid" role="group" aria-label="Grazing Stations">
                ${grazingStations
                  .map((st) => {
                    const active = grazingState.selectedStations.includes(st.id);
                    return `
                      <button type="button" class="rk-opt-btn" data-grz-station="${escapeHtml(st.id)}" aria-pressed="${active ? "true" : "false"}">
                        ${escapeHtml(st.name)}
                        <span class="rk-bp-detail">${escapeHtml(st.detail || "")}</span>
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
          </div>

          <div class="rk-grz-preview">
            <div class="rk-grz-frame">
              <img src="${escapeHtml(previewSrc)}" alt="${escapeHtml(previewAlt)}" loading="lazy">
            </div>
            <div class="rk-grz-specs">
              <div>
                <span class="rk-grz-spec-label">Table Footprint</span>
                <span class="rk-grz-spec-val">${escapeHtml(footprint)}</span>
              </div>
              <div>
                <span class="rk-grz-spec-label">On-Site Setup</span>
                <span class="rk-grz-spec-val">${escapeHtml(setupWin)}</span>
              </div>
              <div>
                <span class="rk-grz-spec-label">Stations</span>
                <span class="rk-grz-spec-val">${grazingState.selectedStations.length} Curated</span>
              </div>
            </div>
            <p style="margin:0; font-size:0.86rem; color:var(--ink-secondary); line-height:1.5;">
              Active tier: <strong>${escapeHtml(activeTier.name)}</strong> (${escapeHtml(activeTier.guestRange || "")}) · ${escapeHtml(activeTier.priceLabel || "Custom Venue Quote")}.
            </p>
            <button type="button" class="rk-btn-primary" data-grz-add>Add Grazing Commission to Inquiry</button>
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
        grazingState.tierId = tierBtn.getAttribute("data-grz-tier");
        grazingState.minNoticeMsg = "";
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
        } else {
          grazingState.selectedStations = [...grazingState.selectedStations, id];
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
