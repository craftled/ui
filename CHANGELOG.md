# Changelog

All notable changes to Craftled UI are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
adheres to [Semantic Versioning](https://semver.org/).

## [0.3.8] - 2026-06-11

### Added

- **`background-pattern` primitive** — zero-dependency decorative section
  backgrounds with seven variants: `dots`, `grid`, `vertical-lines`,
  `diagonal-lines`, `vertical-lines-top`, `vertical-lines-dome`, and
  `isometric`. Theme-aware via `currentColor`; size, stroke, dome strength,
  and optional edge fade are tunable. Install via
  `npx shadcn@latest add @craftled/background-pattern`.
- **Interactive demo** with `ControlsRail`: switch variants, randomize presets,
  tune size/stroke/opacity/dome strength, pick panel theme and pattern color,
  and toggle edge fade — the same configurator pattern as chart and book blocks.

### Fixed

- **`background-pattern`** — guard invalid `size` values so column variants
  cannot throw at runtime; set real `aria-hidden` on the decorative wrapper
  instead of a no-op CSS class.

## [0.3.7] - 2026-05-29

### Added

- **`featured-book-cover` block** — a parametric 3D book rendered in pure CSS
  (perspective + rotateX/Y/Z, no library). One `BookCover` atom composes into a
  single tilted hardcover, a stacked group (`BookStack`), or a horizontal shelf
  (`BookRow`). Typographic or image cover, page-block fore-edge, spine, and
  `solid` + `wireframe` variants. Install via
  `npx shadcn@latest add @craftled/featured-book-cover`.
- **Grab-to-orbit drag** on `BookCover` / `BookStack` (mouse + touch) via the
  `draggable` prop, with an `onRotateChange` callback so external controls stay
  in sync with the live rotation.
- **Interactive demo** with `ControlsRail`: switch layout (single / stack /
  row), tune geometry sliders (size, depth, rotation, perspective), edit the
  cover, and Copy JSON / Export JPG — the configurator doubles as a cover
  generator.

### Changed

- Book wireframe edges/faces and the scene background default to shadcn theme
  tokens (`var(--foreground)` / `var(--card)`), so the block adapts to light and
  dark mode out of the box. Solid cover colors stay authored (a book is a
  physical object, not theme chrome).

## [0.3.6] - 2026-05-25

### Added

- **`featured-og-banner` block** — configurable social/OG promo frame with a
  mesh gradient or image background, three layered screenshot slots, shared
  stroke/radius controls, a glass center card, and bottom fade overlay. Install
  via `npx shadcn@latest add @craftled/featured-og-banner`.
- **Interactive demo** with `ControlsRail`: upload screenshots, tune the
  1400×735 design-space layout, switch to the 1200×630 OG aspect ratio, edit
  mesh/stroke/fade controls, and save/load local template JSON in the browser.

## [0.3.5] - 2026-05-24

### Added

- **`chart-bar-ranked` block** — horizontal ranked bar chart on shadcn's
  chart primitive + Recharts. Title, subtitle, source line, optional footer
  branding (text or image + link), currency/number/percent value formatting,
  USD/EUR/GBP presets plus custom ISO 4217 codes, sort order, and value
  labels. Install via `npx shadcn@latest add @craftled/chart-bar-ranked`.
- **Interactive demo** with `ControlsRail`: edit copy, data rows, format,
  aspect ratio (article 16/9 or OG 1200/630), branding, and **Export JPG**
  (via `html-to-image`).
- **`featured-grain-gradient` demo** — OG (1200/630) aspect preset with a
  title-size cap so headlines fit social cards.

### Changed

- Documented a **Cursor embedded-browser hydration caveat** (`data-cursor-ref`
  on preview routes) in `KNOWN_ISSUES.md` — agent tooling only, not production.

## [0.3.4] - 2026-05-23

### Added

- **`titleColor` prop across all 7 shader/gradient featured blocks.**
  `featured-mesh-gradient`, `featured-halftone`, `featured-halftone-dots`,
  `featured-dithering`, `featured-fluted-glass`, `featured-grain-gradient`,
  `featured-color-panels` each accept an optional `titleColor` hex string.
  When set, the value is applied as an inline `style={{ color }}` on both
  the eyebrow and title, so it wins over any `titleClassName` color via
  CSS specificity. Omit the prop to keep the block's stock text color.
- Each demo's Text section gets a swatch-style **Color** field directly
  under the size slider. Randomize preserves the user's chosen color
  (alongside the typed text), so cycling through randomized variants
  doesn't surprise-reset the type treatment.

## [0.3.3] - 2026-05-23

### Added

- **Text controls across all 6 shader/gradient featured blocks.** Brought
  the v0.3.2 `featured-mesh-gradient` text props to the rest of the family:
  `featured-halftone`, `featured-halftone-dots`, `featured-dithering`,
  `featured-fluted-glass`, `featured-grain-gradient`,
  `featured-color-panels`. Each block now accepts:
  - `titlePosition` (9 values: `top-left` / `top-center` / `top-right` /
    `center-left` / `center` / `center-right` / `bottom-left` /
    `bottom-center` / `bottom-right`). Defaults to `bottom-left`.
  - `titleSize` (px number). Eyebrow scales as `max(11, titleSize * 0.4)`.
    Defaults to `30`.
- Each demo's right rail gets a Text section with: a live text input, a
  3×3 position picker, and a size slider (12–80px). Randomize cycles
  position + size and preserves the user's typed text.

### Changed

- The figcaption pattern in all 6 blocks switched from hard-pinned
  absolute (`right-4 bottom-4 left-4`) to a full-bleed flex container
  driven by `POSITION_CLASSES`. Backward-compatible: blocks called
  without `titlePosition` keep the previous bottom-left look.

## [0.3.2] - 2026-05-23

### Added

- **`featured-mesh-gradient` text controls.** Two new props on the block:
  - `titlePosition` (9 values: `top-left` / `top-center` / `top-right` /
    `center-left` / `center` / `center-right` / `bottom-left` /
    `bottom-center` / `bottom-right`). Defaults to `bottom-left` so
    existing usage is unchanged.
  - `titleSize` (px number). The eyebrow scales proportionally
    (`max(11, titleSize * 0.4)`).
- The mesh gradient demo's right rail now has a Text section with:
  text input, 3×3 position grid, and a size slider (12–80px). Each
  preset (Default / 1960s / Sunset / Sea) ships its own coordinated
  text + position + size combination.

## [0.3.1] - 2026-05-23

### Fixed

- **Navbar frosted-glass effect** wasn't visibly applying. The Navbar
  block's scrolled-state classes used the `in-data-scrolled:` Tailwind
  variant ("ancestor has the attr") but `data-scrolled` was set on the
  same element after the v0.3.0 sticky-positioning refactor. Switched to
  `data-[scrolled=true]:` (variant for "element itself"), so scrolling
  now properly applies `bg-background/85` + `backdrop-blur-md` + a subtle
  shadow. Also added an always-on baseline (`bg-background/80 +
  backdrop-blur`) so the navbar reads as a surface even at the top of
  the page.
- **`/raw/[name]` was rendering the docs SiteHeader.** Iframe previews
  showed two stacked navbars. Root cause: `app/raw/layout.tsx` was
  nested under the root layout. Refactored with Next.js route groups:
  `app/(docs)/` and `app/(raw)/` now each have their own root layout,
  so /raw routes get no docs chrome. URL paths are unchanged.

## [0.3.0] - 2026-05-23

### Added

- **Navbar block** — sticky top navigation with brand mark, NavigationMenu
  dropdowns (flat or rich icon/description rows), CTA buttons, scroll-aware
  backdrop blur, and an Accordion-driven mobile menu. Ported from the
  long-running epigraphmedia navbar with a clean prop API.
- **Accordion primitive** — single or multi-open accordion built on
  `@radix-ui/react-accordion`. Pairs with `tw-animate-css`'s accordion-down
  / accordion-up keyframes for smooth height transitions.
- **NavigationMenu primitive** — top-bar navigation menu with rich dropdowns,
  built on `@radix-ui/react-navigation-menu`. Includes Root, List, Item,
  Trigger, Content, Link, Viewport, Indicator, and a shared
  `navigationMenuTriggerStyle` for flat top-level links.
- **Full-bleed preview** for block-style components. Adding
  `"layout": "fullwidth"` to a registry item renders its preview inside an
  iframe with a viewport toggle (Mobile 375 / Tablet 768 / Laptop 1024 /
  Desktop full) so block media queries fire against the iframe's viewport,
  not the docs viewport.
- **`/raw/[name]` route** — bare demo render with no docs chrome. Used as
  the iframe `src` by the full-bleed preview shell, also opens directly in
  a new tab via the "Open standalone" button.
- **Preview / Code tabs** on every preview page. The Code tab shows the
  same source `bunx shadcn@latest add` would land in your repo, syntax-
  highlighted via shiki (dual light/dark themes baked in), with a copy
  button per file.
- **`/compose` link in the sidebar** — second click after Introduction.

### Changed

- **`SiteHeader` now uses the Navbar block.** Dogfooding the same
  component visitors install, so every page in the docs is a live demo.
- **Sidebar restyled** to match the epigraphmedia blog table-of-contents:
  smaller 13px font, muted-foreground group titles, tighter spacing, no
  hover background. Reads as docs nav, not a marketing widget.
- **`Navbar` block — sticky positioning bug fix.** The original block
  used an absolute inner div (designed for `position="fixed"` only), which
  left the outer `<header>` with zero intrinsic height and broke
  `position="sticky"` (content overlapped instead of being pushed down).
  Refactored to put content in normal flow with the styling on the header
  itself; both `fixed` and `sticky` now displace content correctly.
- **`app/layout.tsx` simplified.** The docs chrome (sidebar + 700px column
  + right rail mount) moved into a new `<DocsShell>` component so
  full-width pages can opt out.

### Stats

| | v0.1.0 | v0.2.0 | v0.3.0 |
|---|---|---|---|
| Primitives | 7 | 11 | **13** |
| Blocks | 22 | 22 | **23** |
| Total registry items | 29 | 33 | **36** |
| Pages | 2 | 3 | **4** (+ /raw) |

## [0.2.0] - 2026-05-23

### Added

- **Dialog primitive** — modal with overlay, header, footer, title,
  description, and an opt-out close button.
- **Dropdown Menu primitive** — full surface: items, checkbox items, radio
  groups, labels, separators, shortcuts, nested sub-menus, destructive
  variant.
- **Tabs primitive** — pill-style tab switcher with active lift + shadow.
- **Tooltip primitive** — built on `@radix-ui/react-tooltip` with
  `TooltipProvider` baked in.
- **`/compose` page** — three real-world compositions (Settings panel, App
  shell, Mini dashboard) exercising every primitive together.

## [0.1.0] - 2026-05-23

### Added

- First public release of Craftled UI.
- 7 atomic primitives: button, card, chart, input, label, separator, skeleton.
- 22 blocks across 5 groups: charts, dashboards, CTAs, shader-powered
  featured panels, and editorial blocks.
- shadcn CLI distribution via per-component URLs at `ui.craftled.com/r/`.
- Built on Next.js 16, React 19.2, Tailwind v4, TypeScript 6, Bun.
- OpenGraph image generation via `next/og`.
- MIT license.
