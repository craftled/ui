# Changelog

All notable changes to Craftled UI are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and this project
adheres to [Semantic Versioning](https://semver.org/).

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
