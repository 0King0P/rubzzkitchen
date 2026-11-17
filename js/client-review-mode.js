const STORAGE_KEY = "rubzzkitchen_review_v1";

const CHECKLIST_ITEMS = [
  { id: "menu-pricing", label: "Menu & Tray Pricing Accuracy" },
  { id: "grazing-photos", label: "Grazing & Event Photography" },
  { id: "portion-math", label: "Portion Architect Math" },
  { id: "frozen-dozens", label: "Frozen Dozen Selection" },
  { id: "contact-zones", label: "Contact Phones & Carteret NJ Zones" },
  { id: "booking-flow", label: "Booking Concierge Flow" },
];

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { checked: {}, notes: "", collapsed: false };
    const parsed = JSON.parse(raw);
    return {
      checked: parsed && typeof parsed.checked === "object" ? parsed.checked : {},
      notes: typeof parsed.notes === "string" ? parsed.notes : "",
      collapsed: Boolean(parsed && parsed.collapsed),
    };
  } catch {
    return { checked: {}, notes: "", collapsed: false };
  }
}

function saveState(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore storage quota errors */
  }
}

function injectReviewStyles() {
  if (document.getElementById("rk-review-styles")) return;
  const style = document.createElement("style");
  style.id = "rk-review-styles";
  style.textContent = `
    #rk-review-drawer {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 950;
      width: min(390px, calc(100vw - 24px));
      background: var(--plane-2-card, #1d1916);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-strong, rgba(212, 168, 106, 0.45));
      border-radius: var(--radius-md, 2px);
      box-shadow: 0 20px 52px rgba(10, 8, 7, 0.55), var(--specular-top, inset 0 1px 0 rgba(212, 168, 106, 0.2));
      font-family: var(--font-sans, sans-serif);
      font-variant-numeric: tabular-nums lining-nums;
      transition: transform var(--dur-mid, 240ms) var(--ease-drawer, cubic-bezier(0.32, 0.72, 0, 1));
    }
    #rk-review-drawer[data-collapsed="true"] .rk-rv-body {
      display: none;
    }
    .rk-rv-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      background: var(--plane-3-elevated, #25201c);
    }
    .rk-rv-title-wrap {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }
    .rk-rv-eyebrow {
      font-size: 0.6875rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: var(--accent-brass, #d4a86a);
      font-weight: 600;
    }
    .rk-rv-title {
      font-family: var(--font-display, Georgia, serif);
      font-size: 1rem;
      font-weight: 500;
      color: var(--ink-primary, #f5efe6);
      margin: 0;
    }
    .rk-rv-toggle {
      min-width: 44px;
      min-height: 44px;
      padding: 0 10px;
      background: transparent;
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.75rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      transition: border-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-rv-toggle:hover {
      border-color: var(--accent-brass, #d4a86a);
    }
    .rk-rv-toggle:active {
      transform: scale(0.97);
    }
    .rk-rv-body {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: min(70dvh, 520px);
      overflow-y: auto;
    }
    .rk-rv-meta {
      font-size: 0.78rem;
      color: var(--ink-secondary, #c6bcb0);
      line-height: 1.45;
      margin: 0;
    }
    .rk-rv-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      border-top: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-rv-item {
      border-bottom: 1px solid var(--border-subtle, rgba(255, 255, 255, 0.1));
    }
    .rk-rv-label {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      padding: 8px 4px;
      cursor: pointer;
      font-size: 0.85rem;
      color: var(--ink-primary, #f5efe6);
    }
    .rk-rv-check {
      width: 18px;
      height: 18px;
      accent-color: var(--accent-brass, #d4a86a);
      cursor: pointer;
      flex-shrink: 0;
    }
    .rk-rv-notes-label {
      display: block;
      font-size: 0.72rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--ink-secondary, #c6bcb0);
      margin-bottom: 6px;
    }
    .rk-rv-textarea {
      width: 100%;
      min-height: 82px;
      box-sizing: border-box;
      padding: 10px 12px;
      background: var(--plane-1-surface, #161310);
      color: var(--ink-primary, #f5efe6);
      border: 1px solid var(--border-hairline, rgba(212, 168, 106, 0.22));
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.85rem;
      line-height: 1.45;
      resize: vertical;
    }
    .rk-rv-textarea:focus {
      outline: 1px solid var(--accent-brass, #d4a86a);
      border-color: var(--accent-brass, #d4a86a);
    }
    .rk-rv-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .rk-rv-copy {
      flex: 1;
      min-height: 44px;
      padding: 10px 14px;
      background: var(--accent-brass, #d4a86a);
      color: var(--accent-ink, #0b0907);
      border: 1px solid var(--accent-brass, #d4a86a);
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: background-color 150ms cubic-bezier(0.23, 1, 0.32, 1), transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-rv-copy:hover {
      background: var(--accent-brass-hover, #e2b87d);
    }
    .rk-rv-copy:active {
      transform: scale(0.97);
    }
    .rk-rv-reset {
      min-height: 44px;
      padding: 10px 12px;
      background: transparent;
      color: var(--color-destructive, #d96b52);
      border: 1px solid color-mix(in oklch, var(--color-destructive, #d96b52) 45%, transparent);
      border-radius: var(--radius-sm, 0px);
      font-family: inherit;
      font-size: 0.78rem;
      font-weight: 500;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.23, 1, 0.32, 1);
    }
    .rk-rv-reset:active {
      transform: scale(0.97);
    }
  `;
  document.head.appendChild(style);
}

export function initClientReviewMode({ kitchenData } = {}) {
  const params = new URLSearchParams(window.location.search);
  if (params.get("review") !== "1") return;

  if (document.getElementById("rk-review-drawer")) return;
  injectReviewStyles();

  const state = loadState();
  const brandName = (kitchenData && kitchenData.BRAND_PROFILE && kitchenData.BRAND_PROFILE.name) || "RubzzKitchen";
  const drawer = document.createElement("aside");
  drawer.id = "rk-review-drawer";
  drawer.setAttribute("role", "region");
  drawer.setAttribute("aria-label", "Client Sign-Off Checklist");
  drawer.setAttribute("data-collapsed", state.collapsed ? "true" : "false");

  const render = () => {
    const doneCount = CHECKLIST_ITEMS.filter((item) => Boolean(state.checked[item.id])).length;
    drawer.setAttribute("data-collapsed", state.collapsed ? "true" : "false");
    drawer.innerHTML = `
      <div class="rk-rv-head">
        <div class="rk-rv-title-wrap">
          <span class="rk-rv-eyebrow">Client Review Mode · ${doneCount}/${CHECKLIST_ITEMS.length}</span>
          <h2 class="rk-rv-title">${escapeHtml(brandName)} Sign-Off Ledger</h2>
        </div>
        <button type="button" class="rk-rv-toggle" data-rv-toggle aria-expanded="${state.collapsed ? "false" : "true"}">
          ${state.collapsed ? "Expand" : "Minimize"}
        </button>
      </div>
      <div class="rk-rv-body">
        <p class="rk-rv-meta">Verify each atelier area below, record feedback notes, and copy your sign-off dossier.</p>
        <ul class="rk-rv-list">
          ${CHECKLIST_ITEMS.map((item) => {
            const isChecked = Boolean(state.checked[item.id]);
            return `
              <li class="rk-rv-item">
                <label class="rk-rv-label">
                  <input type="checkbox" class="rk-rv-check" data-rv-check="${escapeHtml(item.id)}" ${isChecked ? "checked" : ""}>
                  <span>${escapeHtml(item.label)}</span>
                </label>
              </li>
            `;
          }).join("")}
        </ul>
        <div>
          <label for="rkReviewNotes" class="rk-rv-notes-label">Sign-Off &amp; Revision Notes</label>
          <textarea id="rkReviewNotes" class="rk-rv-textarea" placeholder="Add menu edits, photo swaps, or domain notes...">${escapeHtml(state.notes)}</textarea>
        </div>
        <div class="rk-rv-actions">
          <button type="button" class="rk-rv-copy" data-rv-copy>Copy Client Sign-Off Notes</button>
          <button type="button" class="rk-rv-reset" data-rv-reset>Clear</button>
        </div>
      </div>
    `;
  };

  render();
  document.body.appendChild(drawer);

  drawer.addEventListener("change", (ev) => {
    const check = ev.target.closest("[data-rv-check]");
    if (check) {
      const id = check.getAttribute("data-rv-check");
      state.checked[id] = check.checked;
      saveState(state);
      const countEl = drawer.querySelector(".rk-rv-eyebrow");
      if (countEl) {
        const doneCount = CHECKLIST_ITEMS.filter((item) => Boolean(state.checked[item.id])).length;
        countEl.textContent = `Client Review Mode · ${doneCount}/${CHECKLIST_ITEMS.length}`;
      }
    }
  });

  drawer.addEventListener("input", (ev) => {
    if (ev.target && ev.target.id === "rkReviewNotes") {
      state.notes = ev.target.value;
      saveState(state);
    }
  });

  drawer.addEventListener("click", async (ev) => {
    const toggleBtn = ev.target.closest("[data-rv-toggle]");
    if (toggleBtn) {
      state.collapsed = !state.collapsed;
      saveState(state);
      render();
      return;
    }

    const resetBtn = ev.target.closest("[data-rv-reset]");
    if (resetBtn) {
      state.checked = {};
      state.notes = "";
      saveState(state);
      render();
      return;
    }

    const copyBtn = ev.target.closest("[data-rv-copy]");
    if (copyBtn) {
      const lines = [
        `${brandName} Client Review Sign-Off`,
        `URL: ${window.location.href}`,
        `Date: ${new Date().toLocaleString()}`,
        "",
        "Checklist:",
        ...CHECKLIST_ITEMS.map((item) => `[${state.checked[item.id] ? "x" : " "}] ${item.label}`),
        "",
        "Notes:",
        state.notes.trim() || "(No additional notes)",
      ];
      const payload = lines.join("\n");
      try {
        await navigator.clipboard.writeText(payload);
        copyBtn.textContent = "Copied Sign-Off Notes";
      } catch {
        const ta = drawer.querySelector("#rkReviewNotes");
        if (ta) {
          ta.focus();
          ta.select();
        }
        copyBtn.textContent = "Notes Ready to Copy";
      }
      setTimeout(() => {
        if (copyBtn.isConnected) copyBtn.textContent = "Copy Client Sign-Off Notes";
      }, 2200);
    }
  });
}
