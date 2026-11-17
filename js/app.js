import {
  BRAND_PROFILE,
  MENU_CATEGORIES,
  MENU_ITEMS,
  BANQUET_PACKAGES,
  GRAZING_TIERS,
  GRAZING_STATIONS,
  DELIVERY_ZONES,
  PORTFOLIO_EVENTS,
  GENERATED_PLATES,
  FAQ_ITEMS,
} from '../data/kitchen-data.js?v=1';
import { initBookingEngine } from './booking-engine.js?v=1';
import { initCateringArchitect } from './catering-architect.js?v=1';
import { initClientReviewMode } from './client-review-mode.js?v=1';

const THEME_STORAGE_KEY = 'rubzzkitchen_theme_v1';

const FALLBACK_DESIGN_SYSTEM = {
  defaultTheme: 'cardamom-noir',
  themes: {
    'cardamom-noir': {
      label: 'Candlelit Dawat',
      mode: 'dark',
      tokens: {
        '--plane-0-void': 'oklch(0.115 0.010 45)',
        '--plane-1-surface': 'oklch(0.150 0.012 45)',
        '--plane-2-card': 'oklch(0.185 0.014 45)',
        '--plane-3-elevated': 'oklch(0.225 0.016 45)',
        '--plane-4-overlay': 'oklch(0.265 0.018 45)',
        '--ink-primary': 'oklch(0.95 0.015 80)',
        '--ink-secondary': 'oklch(0.76 0.020 75)',
        '--ink-muted': 'oklch(0.67 0.018 72)',
        '--accent-brass': 'oklch(0.78 0.095 72)',
        '--accent-brass-hover': 'oklch(0.83 0.095 74)',
        '--accent-ink': 'oklch(0.12 0.010 45)',
        '--color-destructive': 'oklch(0.62 0.17 28)',
      },
    },
    'sandstone-daylight': {
      label: 'Warm Parchment',
      mode: 'light',
      tokens: {
        '--plane-0-void': 'oklch(0.965 0.014 82)',
        '--plane-1-surface': 'oklch(0.940 0.018 80)',
        '--plane-2-card': 'oklch(0.982 0.008 84)',
        '--plane-3-elevated': 'oklch(0.915 0.022 78)',
        '--plane-4-overlay': 'oklch(0.990 0.005 85)',
        '--ink-primary': 'oklch(0.18 0.020 42)',
        '--ink-secondary': 'oklch(0.36 0.022 44)',
        '--ink-muted': 'oklch(0.46 0.020 46)',
        '--accent-brass': 'oklch(0.44 0.095 56)',
        '--accent-brass-hover': 'oklch(0.38 0.095 54)',
        '--accent-ink': 'oklch(0.98 0.008 84)',
        '--color-destructive': 'oklch(0.48 0.17 27)',
      },
    },
  },
};

const kitchenData = {
  BRAND_PROFILE,
  MENU_CATEGORIES,
  MENU_ITEMS,
  BANQUET_PACKAGES,
  GRAZING_TIERS,
  GRAZING_STATIONS,
  DELIVERY_ZONES,
  PORTFOLIO_EVENTS,
  GENERATED_PLATES,
  FAQ_ITEMS,
};

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function showToast(message) {
  const toastEl = document.getElementById('rkStatusToast');
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.hidden = false;
  window.clearTimeout(toastEl._hideTimer);
  toastEl._hideTimer = window.setTimeout(() => {
    toastEl.hidden = true;
  }, 2400);
}

async function loadDesignSystem() {
  try {
    const res = await fetch('./api/design-system.json', { cache: 'no-store' });
    if (!res.ok) return FALLBACK_DESIGN_SYSTEM;
    const json = await res.json();
    if (json && json.themes && json.themes['cardamom-noir']) {
      return json;
    }
  } catch {
    return FALLBACK_DESIGN_SYSTEM;
  }
  return FALLBACK_DESIGN_SYSTEM;
}

function applyThemeTokens(designSystem, themeKey) {
  const themes = designSystem?.themes || FALLBACK_DESIGN_SYSTEM.themes;
  const resolvedKey = themes[themeKey] ? themeKey : (designSystem?.defaultTheme || 'cardamom-noir');
  const themeObj = themes[resolvedKey];
  const root = document.documentElement;

  if (resolvedKey === 'sandstone-daylight') {
    root.setAttribute('data-theme', 'sandstone-daylight');
  } else {
    root.removeAttribute('data-theme');
  }

  if (themeObj && themeObj.tokens) {
    Object.entries(themeObj.tokens).forEach(([prop, val]) => {
      root.style.setProperty(prop, val);
    });
    if (themeObj.tokens['--ink-primary']) {
      root.style.setProperty('--text-primary', themeObj.tokens['--ink-primary']);
    }
  }

  const toggleBtn = document.getElementById('rkThemeToggle');
  const labelEl = document.getElementById('rkThemeLabel');
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-pressed', resolvedKey === 'sandstone-daylight' ? 'true' : 'false');
  }
  if (labelEl && themeObj?.label) {
    labelEl.textContent = themeObj.label;
  }

  try {
    localStorage.setItem(THEME_STORAGE_KEY, resolvedKey);
  } catch {
    // Ignore storage restriction
  }

  return resolvedKey;
}

function initMobileNavigation() {
  const toggleBtn = document.getElementById('rkMobileNavToggle');
  const drawerEl = document.getElementById('rkMobileNav');
  if (!toggleBtn || !drawerEl) return;

  const setOpen = (isOpen) => {
    toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    drawerEl.hidden = !isOpen;
  };

  toggleBtn.addEventListener('click', () => {
    const currentlyOpen = toggleBtn.getAttribute('aria-expanded') === 'true';
    setOpen(!currentlyOpen);
  });

  drawerEl.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggleBtn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggleBtn.focus();
    }
  });
}

function extractBagCount(state) {
  if (!state) return 0;
  const list = Array.isArray(state.items)
    ? state.items
    : Array.isArray(state.lines)
      ? state.lines
      : Array.isArray(state.bag)
        ? state.bag
        : Array.isArray(state)
          ? state
          : [];
  return list.reduce((sum, item) => sum + (Number(item?.qty) || 1), 0);
}

function initMenuLedger(bookingController) {
  const tabsEl = document.getElementById('rkMenuTabs');
  const searchEl = document.getElementById('rkMenuSearch');
  const dietaryEl = document.getElementById('rkDietaryFilters');
  const gridEl = document.getElementById('rkMenuGrid');
  if (!tabsEl || !searchEl || !dietaryEl || !gridEl) return;

  let activeCategory = 'all';
  let activeDietary = 'all';
  let searchQuery = '';

  const categories = [
    { id: 'all', label: 'All Offerings' },
    ...(MENU_CATEGORIES || []),
  ];

  const renderTabs = () => {
    tabsEl.innerHTML = categories
      .map((cat) => {
        const isSelected = cat.id === activeCategory;
        return `<button class="rk-tab rk-tactile" type="button" role="tab" data-category="${escapeHtml(cat.id)}" aria-selected="${isSelected ? 'true' : 'false'}" tabindex="${isSelected ? '0' : '-1'}">${escapeHtml(cat.label)}</button>`;
      })
      .join('');
  };

  const matchesDietary = (entry, filterVal) => {
    if (filterVal === 'all') return true;
    const dietaryList = Array.isArray(entry.dietary) ? entry.dietary.map((d) => d.toLowerCase()) : [];
    const target = filterVal.toLowerCase();
    if (dietaryList.some((d) => d.includes(target))) return true;
    if (target === 'signature') {
      return entry.spiceLevel === 'Signature' || Boolean(entry.badge) || entry.kind === 'package';
    }
    if (target === 'bbq & grill') {
      return entry.categoryId === 'oven-baked-bbq' || /bbq|tikka|boti|kebab|bihari/i.test(`${entry.name} ${entry.description || ''}`);
    }
    if (target === 'ready-to-cook frozen') {
      return entry.categoryId === 'frozen-dozens' || dietaryList.some((d) => d.includes('frozen'));
    }
    if (target === 'vegetarian') {
      return dietaryList.some((d) => d.includes('veg')) || /paneer|pakora|chaat|bhalla|kheer|matanjan|cholay|aloo samosa|veggie/i.test(entry.name);
    }
    return false;
  };

  const normalizeEntries = () => {
    const dishes = (MENU_ITEMS || []).map((item) => ({
      ...item,
      kind: 'dish',
    }));

    const packages = (BANQUET_PACKAGES || []).map((pkg) => ({
      id: pkg.id,
      categoryId: pkg.categoryId || 'banquet-packages',
      name: pkg.name,
      subtitle: pkg.guestRangeLabel || `${pkg.guestCount} Guests`,
      description: pkg.customPricingNote || `Curated ${pkg.guestCount}-guest catering package including ${pkg.naanIncluded || 'fresh naan, salad, and green chutney'}.`,
      includes: pkg.includes || [],
      dietary: ['Signature', 'Banquet Package'],
      badge: pkg.badge || `${pkg.guestCount} Guests`,
      imageSrc: pkg.imageSrc,
      kind: 'package',
      options: [
        {
          optionId: `${pkg.id}-pkg`,
          label: pkg.price ? `${pkg.guestCount}-Guest Dawat` : 'Request Seasonal Quote',
          price: pkg.price,
          isCustomQuote: pkg.price === null || pkg.price === undefined,
          servesText: pkg.guestRangeLabel || `Serves ~${pkg.guestCount}`,
        },
      ],
    }));

    return [...dishes, ...packages];
  };

  const allEntries = normalizeEntries();

  const renderGrid = () => {
    const q = searchQuery.trim().toLowerCase();
    const filtered = allEntries.filter((entry) => {
      if (activeCategory !== 'all' && entry.categoryId !== activeCategory) return false;
      if (!matchesDietary(entry, activeDietary)) return false;
      if (!q) return true;
      const haystack = [
        entry.name,
        entry.subtitle,
        entry.description,
        entry.badge,
        ...(entry.includes || []),
        ...(entry.dietary || []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });

    if (filtered.length === 0) {
      gridEl.innerHTML = `
        <div class="rk-empty-state">
          <p style="margin: 0 0 0.75rem;">No dishes match "${escapeHtml(searchQuery || activeDietary)}".</p>
          <button id="rkResetMenuFilters" class="rk-btn rk-tactile" type="button">Reset Menu Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('rkResetMenuFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          activeDietary = 'all';
          searchQuery = '';
          searchEl.value = '';
          dietaryEl.querySelectorAll('button').forEach((btn) => {
            btn.setAttribute('aria-pressed', btn.dataset.filter === 'all' ? 'true' : 'false');
          });
          renderTabs();
          renderGrid();
        });
      }
      return;
    }

    gridEl.innerHTML = filtered
      .map((entry) => {
        const hasThumb = Boolean(entry.imageSrc);
        const tagText = entry.badge || (Array.isArray(entry.dietary) && entry.dietary[0]) || entry.subtitle || '';
        const includesHtml = Array.isArray(entry.includes) && entry.includes.length
          ? `<ul class="rk-ledger-includes">${entry.includes.map((inc) => `<li>${escapeHtml(inc)}</li>`).join('')}</ul>`
          : '';
        const optionsHtml = (entry.options || [])
          .map((opt, idx) => {
            const hasPrice = typeof opt.price === 'number' && !Number.isNaN(opt.price);
            const priceLabel = hasPrice ? `$${opt.price}` : 'Custom Quote';
            const lineId = `${entry.id}::${opt.optionId || idx}`;
            return `
              <button
                class="rk-add-btn rk-tactile"
                type="button"
                data-line-id="${escapeHtml(lineId)}"
                data-title="${escapeHtml(entry.name)}"
                data-subtitle="${escapeHtml(opt.label + (opt.servesText ? ` · ${opt.servesText}` : ''))}"
                data-price="${hasPrice ? opt.price : ''}"
                data-custom-quote="${hasPrice ? 'false' : 'true'}"
                data-category="${escapeHtml(entry.categoryId)}"
              >
                <span>+ ${escapeHtml(opt.label)}</span>
                <span class="rk-add-price rk-tabular">${escapeHtml(priceLabel)}</span>
              </button>
            `;
          })
          .join('');

        return `
          <article class="rk-ledger-row ${hasThumb ? '' : 'rk-ledger-row--no-thumb'}">
            ${hasThumb ? `<img class="rk-ledger-thumb" src="${escapeHtml(entry.imageSrc)}" alt="${escapeHtml(entry.name)}" width="76" height="92" loading="lazy" />` : ''}
            <div class="rk-ledger-main">
              <div class="rk-ledger-title-line">
                <h3 class="rk-ledger-title">${escapeHtml(entry.name)}</h3>
                ${tagText ? `<span class="rk-ledger-tag">${escapeHtml(tagText)}</span>` : ''}
              </div>
              <p class="rk-ledger-desc">${escapeHtml(entry.description || entry.subtitle || '')}</p>
              ${includesHtml}
            </div>
            <div class="rk-ledger-actions">
              ${optionsHtml}
            </div>
          </article>
        `;
      })
      .join('');
  };

  tabsEl.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-category]');
    if (!btn) return;
    activeCategory = btn.dataset.category;
    renderTabs();
    renderGrid();
  });

  tabsEl.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    const buttons = Array.from(tabsEl.querySelectorAll('button[role="tab"]'));
    const currentIdx = buttons.findIndex((b) => b.getAttribute('aria-selected') === 'true');
    if (currentIdx === -1) return;
    const nextIdx = event.key === 'ArrowRight'
      ? (currentIdx + 1) % buttons.length
      : (currentIdx - 1 + buttons.length) % buttons.length;
    event.preventDefault();
    activeCategory = buttons[nextIdx].dataset.category;
    renderTabs();
    renderGrid();
    const updatedButtons = tabsEl.querySelectorAll('button[role="tab"]');
    if (updatedButtons[nextIdx]) updatedButtons[nextIdx].focus();
  });

  searchEl.addEventListener('input', (event) => {
    searchQuery = event.target.value;
    renderGrid();
  });

  dietaryEl.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-filter]');
    if (!btn) return;
    activeDietary = btn.dataset.filter;
    dietaryEl.querySelectorAll('button[data-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', item === btn ? 'true' : 'false');
    });
    renderGrid();
  });

  gridEl.addEventListener('click', (event) => {
    const btn = event.target.closest('button.rk-add-btn');
    if (!btn) return;
    const rawPrice = btn.dataset.price;
    const isCustomQuote = btn.dataset.customQuote === 'true' || rawPrice === '';
    const unitPrice = isCustomQuote ? 0 : Number(rawPrice);

    if (bookingController && typeof bookingController.addItem === 'function') {
      bookingController.addItem({
        lineId: btn.dataset.lineId,
        title: btn.dataset.title,
        subtitle: btn.dataset.subtitle,
        unitPrice,
        qty: 1,
        isCustomQuote,
        category: btn.dataset.category || 'catering',
      });
    }

    const originalHtml = btn.innerHTML;
    btn.classList.add('is-added');
    btn.innerHTML = '<span>Added to Ledger</span>';
    showToast(`${btn.dataset.title} added to Order Ledger.`);
    window.setTimeout(() => {
      btn.classList.remove('is-added');
      btn.innerHTML = originalHtml;
    }, 1100);
  });

  renderTabs();
  renderGrid();
}

function initPortfolioAndLightbox() {
  const filtersEl = document.getElementById('rkPortfolioFilters');
  const gridEl = document.getElementById('rkPortfolioGrid');
  const dialogEl = document.getElementById('rkLightbox');
  const imgEl = document.getElementById('rkLightboxImg');
  const metaEl = document.getElementById('rkLightboxMeta');
  const titleEl = document.getElementById('rkLightboxTitle');
  const captionEl = document.getElementById('rkLightboxCaption');
  const prevBtn = document.getElementById('rkLightboxPrev');
  const nextBtn = document.getElementById('rkLightboxNext');
  const closeBtn = document.getElementById('rkLightboxClose');
  if (!filtersEl || !gridEl) return;

  const events = PORTFOLIO_EVENTS || [];
  let activeFilter = 'all';
  let visibleList = events;
  let activeLightboxIndex = 0;

  const matchesCategory = (item, filterKey) => {
    if (filterKey === 'all') return true;
    const cat = String(item.category || '').toLowerCase();
    if (filterKey === 'bridal') {
      return cat === 'bridal' || cat === 'banquets' || /nikah|bridal|engagement/i.test(`${item.title} ${item.eventType || ''}`);
    }
    if (filterKey === 'corporate') {
      return cat === 'corporate' || /gala|opening|cafe|fundraising/i.test(`${item.title} ${item.eventType || ''}`);
    }
    return cat === filterKey;
  };

  const renderGallery = () => {
    visibleList = events.filter((item) => matchesCategory(item, activeFilter));
    gridEl.innerHTML = visibleList
      .map((item, idx) => {
        const wideClass = item.aspect === 'landscape' || idx === 0 ? 'rk-portfolio-card--wide' : '';
        return `
          <article class="rk-portfolio-card ${wideClass}">
            <button class="rk-portfolio-trigger" type="button" data-portfolio-index="${idx}" aria-label="View ${escapeHtml(item.title)} full size">
              <div class="rk-portfolio-media">
                <img src="${escapeHtml(item.imageSrc)}" alt="${escapeHtml(item.title)}" loading="lazy" />
              </div>
              <div class="rk-portfolio-placard">
                <p class="rk-portfolio-meta">${escapeHtml(item.eventType || item.category)} &middot; ${escapeHtml(item.location || 'Carteret, NJ')}</p>
                <h3 class="rk-portfolio-title">${escapeHtml(item.title)}</h3>
                <p class="rk-portfolio-caption">${escapeHtml(item.caption || '')}</p>
              </div>
            </button>
          </article>
        `;
      })
      .join('');
  };

  const updateLightbox = (idx) => {
    if (!visibleList.length || !dialogEl) return;
    activeLightboxIndex = (idx + visibleList.length) % visibleList.length;
    const item = visibleList[activeLightboxIndex];
    if (imgEl) {
      imgEl.src = item.imageSrc;
      imgEl.alt = item.title;
    }
    if (metaEl) metaEl.textContent = `${item.eventType || item.category} · ${item.location || 'New Jersey'}`;
    if (titleEl) titleEl.textContent = item.title;
    if (captionEl) captionEl.textContent = item.caption || '';
  };

  const openLightbox = (idx) => {
    if (!dialogEl) return;
    updateLightbox(idx);
    if (typeof dialogEl.showModal === 'function') {
      if (!dialogEl.open) dialogEl.showModal();
    } else {
      dialogEl.setAttribute('open', '');
    }
  };

  const closeLightbox = () => {
    if (!dialogEl) return;
    if (typeof dialogEl.close === 'function') {
      if (dialogEl.open) dialogEl.close();
    } else {
      dialogEl.removeAttribute('open');
    }
  };

  filtersEl.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-portfolio-filter]');
    if (!btn) return;
    activeFilter = btn.dataset.portfolioFilter;
    filtersEl.querySelectorAll('button[data-portfolio-filter]').forEach((item) => {
      item.setAttribute('aria-pressed', item === btn ? 'true' : 'false');
    });
    renderGallery();
  });

  gridEl.addEventListener('click', (event) => {
    const trigger = event.target.closest('button[data-portfolio-index]');
    if (!trigger) return;
    openLightbox(Number(trigger.dataset.portfolioIndex) || 0);
  });

  if (prevBtn) prevBtn.addEventListener('click', () => updateLightbox(activeLightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => updateLightbox(activeLightboxIndex + 1));
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  if (dialogEl) {
    dialogEl.addEventListener('click', (event) => {
      if (event.target === dialogEl) closeLightbox();
    });
    dialogEl.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') updateLightbox(activeLightboxIndex - 1);
      if (event.key === 'ArrowRight') updateLightbox(activeLightboxIndex + 1);
      if (event.key === 'Escape') closeLightbox();
    });
  }

  renderGallery();
}

function renderPoliciesAndFaq() {
  const policiesEl = document.getElementById('rkBookingPolicies');
  const faqEl = document.getElementById('rkFaqList');
  const areasEl = document.getElementById('rkServiceAreaList');

  if (policiesEl && Array.isArray(BRAND_PROFILE?.bookingPolicies)) {
    policiesEl.innerHTML = BRAND_PROFILE.bookingPolicies
      .map((policy) => {
        if (typeof policy === 'string') {
          return `<li class="rk-policy-item"><p>${escapeHtml(policy)}</p></li>`;
        }
        return `
          <li class="rk-policy-item">
            <strong>${escapeHtml(policy.title || policy.label || 'Kitchen Policy')}</strong>
            <p>${escapeHtml(policy.detail || policy.description || policy.text || '')}</p>
          </li>
        `;
      })
      .join('');
  }

  if (areasEl && Array.isArray(BRAND_PROFILE?.serviceAreas)) {
    areasEl.innerHTML = BRAND_PROFILE.serviceAreas
      .map((area) => `<li>${escapeHtml(area)}</li>`)
      .join('');
  }

  if (faqEl && Array.isArray(FAQ_ITEMS)) {
    faqEl.innerHTML = FAQ_ITEMS.map((item, idx) => {
      const panelId = `rk-faq-panel-${idx}`;
      return `
        <div class="rk-faq-item">
          <button class="rk-faq-trigger" type="button" aria-expanded="false" aria-controls="${panelId}">
            <span>${escapeHtml(item.question || item.q)}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
              <path d="M12 5v14M5 12h14"></path>
            </svg>
          </button>
          <div id="${panelId}" class="rk-faq-panel" hidden>
            ${escapeHtml(item.answer || item.a)}
          </div>
        </div>
      `;
    }).join('');

    faqEl.addEventListener('click', (event) => {
      const btn = event.target.closest('button.rk-faq-trigger');
      if (!btn) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      if (panel) panel.hidden = expanded;
    });
  }
}

async function bootstrap() {
  const designSystem = await loadDesignSystem();
  let savedTheme = designSystem.defaultTheme || 'cardamom-noir';
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored) savedTheme = stored;
  } catch {
    // Keep default theme
  }
  let currentTheme = applyThemeTokens(designSystem, savedTheme);

  const themeToggleBtn = document.getElementById('rkThemeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const nextTheme = currentTheme === 'sandstone-daylight' ? 'cardamom-noir' : 'sandstone-daylight';
      currentTheme = applyThemeTokens(designSystem, nextTheme);
    });
  }

  initMobileNavigation();

  const bookingController = initBookingEngine({
    mountBooking: document.getElementById('rkBookingMount'),
    mountDrawer: document.getElementById('rkBagDrawerMount'),
    kitchenData,
  });

  const bagCountEl = document.getElementById('rkBagCount');
  const syncBagCount = (state) => {
    if (bagCountEl) {
      bagCountEl.textContent = String(extractBagCount(state));
    }
  };

  if (bookingController) {
    if (typeof bookingController.getState === 'function') {
      syncBagCount(bookingController.getState());
    }
    if (typeof bookingController.subscribe === 'function') {
      bookingController.subscribe(syncBagCount);
    }
  }

  const bagTrigger = document.getElementById('rkBagTrigger');
  if (bagTrigger && bookingController && typeof bookingController.openDrawer === 'function') {
    bagTrigger.addEventListener('click', () => bookingController.openDrawer());
  }

  initCateringArchitect({
    mountPortionArchitect: document.getElementById('rkPortionArchitectMount'),
    mountGrazingStudio: document.getElementById('rkGrazingStudioMount'),
    mountFrozenBuilder: document.getElementById('rkFrozenBuilderMount'),
    kitchenData,
    bookingController,
  });

  initMenuLedger(bookingController);
  initPortfolioAndLightbox();
  renderPoliciesAndFaq();
  initClientReviewMode({ kitchenData });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
