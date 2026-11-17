# RubzzKitchen Design System Specification

## 1. Visual Identity & Editorial Direction
- **Brand**: RubzzKitchen (`@rubzzkitchen`) - Zabiha Halal Pakistani & Indian Culinary Atelier, Bespoke Grazing Tables, and Artisan Frozen Appetizers in Carteret, NJ.
- **Creative Reference**: Gymkhana London culinary restraint, Dishoom Bombay archival warmth, Aesop tactile materiality, and Vogue Living editorial pacing.
- **Core Rule**: Zero generic SaaS patterns. No `Inter` or `JetBrains Mono` typography, no pure `#000000`, no neon glows, no rounded pill capsules (`18px` / `9999px`), no 3-column uniform icon boxes, no `100vh` locks, and no em-dashes.

## 2. 100% Original Optical Darkroom Photography Standard
- **Strict Provenance Rule**: Synthetic AI-generated food renders and text-overlaid Reel screenshots or promotional flyers are **100% prohibited** across all site views, menu ledgers, and event portfolios.
- **Authenticated Asset Directory**: Every culinary photograph lives in `assets/originals/*.jpg` (19 curated plates) alongside the verified mark `assets/portfolio/brand-crest.jpg`.
- **Optical Darkroom Calibration (PIL + NumPy)**:
  1. Precision framing crops eliminating letterbox bars, promotional flyer borders, and edge equipment clutter (such as left-edge table fan stems).
  2. Gray-world and warm-daylight white-balance calibration (`35%` blend) to neutralize indoor fluorescent or tungsten venue color casts while preserving real ingredient color.
  3. Luminance-guided shadow recovery (`+12%` to `+16%` toe lift) with highlight shoulder roll-off to reveal kebab sear and chaat detail without clipping white florals or porcelain.
  4. Culinary color and contrast polish (`Color 1.12`, `Contrast 1.08`), `LANCZOS` super-sampling (`1080x1350` for `4:5` plates, `320x200` for `16:10` inline vignettes, `1000x625` for `16:10` holiday roast), luminance-only `YCbCr` unsharp masking (`radius=1.4, percent=115, threshold=3`), and subtle `6%` corner studio vignette (`quality=89`, `<380KB` per plate).
- **Menu Ledger Visual Honesty**: Dishes without an individual verified plate set `imageSrc: null` rather than cloning repetitive thumbnails, while matching dishes, banquet spreads, grazing stations, and 10 curated `PORTFOLIO_EVENTS` map exclusively to `./assets/originals/*.jpg`.

## 3. Color Architecture (OKLCH 5-Plane Stepped Luminance)
Tokens are delivered statically in `styles/tokens.css` and dynamically from `./api/design-system.json`.

### Default Dark Mode: Smoked Cardamom Noir (`cardamom-noir` / "Candlelit Dawat")
- `--plane-0-void`: `oklch(0.115 0.010 45)` - Primary page canvas
- `--plane-1-surface`: `oklch(0.150 0.012 45)` - Section bands & secondary headers
- `--plane-2-card`: `oklch(0.185 0.014 45)` - Ledger rows, plates, and interactive panels
- `--plane-3-elevated`: `oklch(0.225 0.016 45)` - Active controls & elevated drawers
- `--plane-4-overlay`: `oklch(0.265 0.018 45)` - Modal dialogs & lightboxes
- `--ink-primary`: `oklch(0.95 0.015 80)` - Warm ivory primary ink (`APCA Lc >= 92`)
- `--ink-secondary`: `oklch(0.76 0.020 75)` - Aged parchment secondary ink (`APCA Lc >= 68`)
- `--ink-muted`: `oklch(0.67 0.018 72)` - Ledger metadata and subtle captions
- `--accent-brass`: `oklch(0.78 0.095 72)` - Brushed Warm Gold primary action accent
- `--accent-brass-hover`: `oklch(0.83 0.095 74)` - Interactive hover state
- `--accent-ink`: `oklch(0.12 0.010 45)` - High-contrast ink over accent buttons
- `--color-destructive`: `oklch(0.62 0.17 28)` - Semantic terracotta-crimson for Clear / Remove controls

### Light Mode: Sandstone Daylight (`sandstone-daylight` / "Warm Parchment")
- `--plane-0-void`: `oklch(0.965 0.014 82)`
- `--plane-1-surface`: `oklch(0.940 0.018 80)`
- `--plane-2-card`: `oklch(0.982 0.008 84)`
- `--plane-3-elevated`: `oklch(0.915 0.022 78)`
- `--plane-4-overlay`: `oklch(0.990 0.005 85)`
- `--ink-primary`: `oklch(0.18 0.020 42)`
- `--ink-secondary`: `oklch(0.36 0.022 44)`
- `--ink-muted`: `oklch(0.46 0.020 46)`
- `--accent-brass`: `oklch(0.44 0.095 56)`
- `--accent-brass-hover`: `oklch(0.38 0.095 54)`
- `--accent-ink`: `oklch(0.98 0.008 84)`
- `--color-destructive`: `oklch(0.48 0.17 27)`

### Specular Borders & Hairlines
- `--border-hairline`: `color-mix(in oklch, var(--accent-brass) 22%, transparent)`
- `--border-strong`: `color-mix(in oklch, var(--accent-brass) 45%, transparent)`
- `--border-subtle`: `color-mix(in oklch, var(--ink-primary) 10%, transparent)`

## 4. Typography & Optical Scale
- **Display Font (`--font-display`)**: `Fraunces` (`opsz 9..144`, weights `300..600`, italic `300..500`). Used for hero statements, dish titles, section headings, and ledger pricing.
- **Body & UI Font (`--font-sans`)**: `Plus Jakarta Sans` (weights `300..600`). Enforces `font-variant-numeric: tabular-nums lining-nums` across every tray price, guest count, and order subtotal.
- **Eyebrow & Micro-Label Rhythm**: `0.6875rem` uppercase with `+0.14em` tracking, limited to restrained editorial section markers.

## 5. Layout Geometry, Elevation & Motion
- **Edges**: Crisp architectural corners (`--radius-sm: 0px`, `--radius-md: 2px`).
- **Dividers**: `1px` hairline rules replacing drop shadows.
- **Photography Rule**: Museum placards and metadata sit cleanly below photographic plates rather than overlaid across dishes or event spreads.
- **Scroll Anchoring**: All section anchors declare `scroll-margin-top: 96px` beneath the `76px` sticky navigation bar.
- **Motion Physics**: Custom easing (`cubic-bezier(0.23, 1, 0.32, 1)` for standard UI, `cubic-bezier(0.32, 0.72, 0, 1)` for drawers, W3C `linear()` spring curve for tactile state shifts), active press feedback (`scale(0.97)`), and full `prefers-reduced-motion: reduce` support.
