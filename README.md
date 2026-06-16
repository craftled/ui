# Craftled UI

A craft-led, shadcn-native component library. Charts, blocks, shaders, and primitives — copy/paste with the shadcn CLI.

**[ui.craftled.com](https://ui.craftled.com)** · [Components](https://ui.craftled.com)

![Craftled UI](https://ui.craftled.com/opengraph-image)

## What this is

Craftled UI sits on top of the shadcn ecosystem. Every primitive is shadcn-style — TSX you own, Tailwind classes you can edit, Radix for the unsexy a11y plumbing. No runtime dependency on a published `@craftled/ui` package. You install components by URL through the shadcn CLI, and they land in your repo as plain files.

The library is opinionated about taste, not architecture. The value-add is the blocks — featured / OG images, charts, dashboards, CTAs, testimonials, and paper-design shaders — production-ready compositions built on shadcn primitives that you can drop into a site in under a minute.

## Install

You'll need [Bun](https://bun.com) (or `pnpm`/`npm`) and a Tailwind v4 project with the [shadcn CLI](https://ui.shadcn.com/docs/cli) initialized.

### Direct URL (simplest)

```bash
bunx shadcn@latest add https://ui.craftled.com/r/button.json
```

Every component has a registry JSON at `ui.craftled.com/r/<name>.json`. Block items automatically pull in their primitive `registryDependencies` (e.g. installing `dashboard-finance` brings `card`, `chart`, and Recharts with it).

### Registered namespace (cleaner for multiple components)

```bash
bunx shadcn@latest registry add @craftled=https://ui.craftled.com/r/{name}.json
bunx shadcn@latest add @craftled/dashboard-finance
bunx shadcn@latest add @craftled/featured-halftone
```

### Live previews

Every component renders standalone at `ui.craftled.com/preview/<name>` — same component, isolated page, no chrome. Useful for sharing in design reviews.

### Brand themes

Docs ship **shadcn-native `registry:theme` presets** you can switch at runtime from the sidebar (Craftled · ElevenLabs). Each brand is a `cssVars` bundle — same shape as upstream color themes — installable into your app:

```bash
bunx shadcn@latest add @craftled/theme-elevenlabs
```

Human/agent references live under [`brands/`](./brands/). Decorative accents (`--brand-violet`, `--brand-orange`) are for shader orbs only; UI chrome stays on semantic tokens. See [`/themes`](https://ui.craftled.com/themes) on the live site.

### Brand themes (2)

`theme-craftled` · `theme-elevenlabs` — `registry:theme` presets (not listed in the preview sidebar). ElevenLabs is light-only on the docs site; the theme toggle hides while it is active.

## What's inside

### Layout backgrounds (1)

- **`background-pattern`** — Decorative section fills (dots, grid, line grids,
  dome curves, isometric wireframe) with no extra deps. Wrap your content in a
  `relative overflow-hidden` container and absolutely position the pattern behind
  it. The demo exposes controls in the **Variants** sidebar via
  `ControlsRail` (portals into the variant panel).

### Charts (3)

- **`chart-area-gradient`** — Recharts area chart with gradient fill, themed for both modes.
- **`chart-stems`** — Sparse stem-and-leaf chart for low-density dashboards.
- **`chart-bar-ranked`** — Horizontal ranked bar chart on shadcn's chart primitive +
  Recharts. Title, subtitle, source line, optional footer branding (text or image +
  link), currency/number/percent formatting with USD/EUR/GBP presets and custom ISO
  4217 codes, sort order, and value labels. Install via
  `npx shadcn@latest add @craftled/chart-bar-ranked`. The live demo adds a
  Variants sidebar playground with article (16/9) and OG (1200/630) aspect presets and
  **Export JPG** (via `html-to-image`).

### Dashboards (2)

- **`dashboard-finance`** — KPI cards + a financial chart tile. Drop-in for a Stripe-style overview.
- **`dashboard-net-worth`** — Multi-account net worth view with a stacked area chart.

### CTAs (4)

`cta-gradient` · `cta-newsletter` · `cta-ebook` · `cta-app-stack`

Production-grade marketing CTAs. Each one ships with a demo that uses real-looking content, not lorem ipsum.

### Featured / shader blocks (9)

`featured-halftone` · `featured-halftone-dots` · `featured-dithering` · `featured-fluted-glass` · `featured-grain-gradient` · `featured-mesh-gradient` · `featured-color-panels` · `featured-logo-spotlight` · `featured-og-banner`

WebGL shader blocks via [`@paper-design/shaders-react`](https://shaders.paper.design). Most render an image, a generative surface, or a social/OG promo frame with a real shader pass and expose the right knobs (intensity, scale, color mix, layout, or frame controls). Use them as hero panels, OG images, or as background atmosphere.

The original seven photo + generative shader blocks accept a shared text-overlay API for placing a title on top of the shader. `featured-logo-spotlight` composes the mesh-gradient, and the OG banner uses its own screenshot/layout API instead.

- `titleText` — string drawn over the shader
- `titlePosition` — one of nine grid positions (`top-left` / `top-center` / `top-right` / `center-left` / `center` / `center-right` / `bottom-left` / `bottom-center` / `bottom-right`), defaults to `bottom-left`
- `titleSize` — title font size in px; the eyebrow scales as `max(11, titleSize * 0.4)`, defaults to `30`
- `titleColor` — optional inline hex color that wins over `titleClassName` via CSS specificity

### Editorial blocks (6)

- **`featured-book-cover`** — Parametric 3D book in pure CSS (perspective + rotateX/Y/Z, no library): a single tilted hardcover, a stacked group, or a horizontal shelf, all from one `BookCover` atom. Typographic or image cover, page-block fore-edge, spine, and a theme-aware `solid` / `wireframe` variant. Grab-to-orbit drag (mouse/touch) via `draggable` + `onRotateChange`; the demo doubles as a cover generator with Copy JSON + Export JPG.
- **`featured-event`** — Highlight reel for events / launches.
- **`featured-integrations`** — Orbit-style logo carousel for ecosystem pages.
- **`featured-story`** — Magazine-style story card with optional link wrapping.
- **`testimonial-video`** — Video thumbnail + quote, with optional play target.
- **`carousel-do-dont`** — Side-by-side do/don't pattern with inline-editable content.

## Local development

```bash
bun install
bun dev                  # next dev (Turbopack) on http://localhost:3000
bun run build            # next build (production)
bun run registry:build   # rebuild all /r/*.json registry items
bun run check            # ultracite check (biome + opinionated rules)
bun run fix              # ultracite fix (auto-fix safe issues)
```

The `/` route is the gallery, `/themes` documents installable brand themes, and `/preview/[name]` renders any component with Preview/Code tabs (Shiki dual-theme) and a **Variants** right rail on preview routes. The docs chrome is `AppShell` (sidebar + top bar + optional variant panel). Editing a block hot-reloads everywhere it's used.

`/raw/[name]` is the no-chrome iframe target for the full-bleed preview shell — its own root layout, no docs chrome. Don't link to it from docs; it exists for the iframe.

### Add a new component

1. Drop your source at `registry/new-york/blocks/<name>/<name>.tsx`.
2. Add a sibling `<name>.demo.tsx` exporting a default demo composition.
3. Register it in `registry.json` with `registryDependencies` for any shadcn primitives you reuse.
4. `bun run registry:build` → preview at `/preview/<name>`.

For a new **brand theme**, edit `lib/brand-themes.ts` and `brands/<name>.brand.md`, run `bun scripts/sync-registry-themes.ts`, then `bun run registry:build`.

## Stack

- **[Next.js 16](https://nextjs.org)** App Router + Turbopack
- **[React 19.2](https://react.dev)**
- **[Tailwind CSS v4](https://tailwindcss.com)** (CSS-first, oklch, container queries)
- **[shadcn CLI](https://ui.shadcn.com)** for distribution
- **[Radix UI](https://www.radix-ui.com)** primitives where needed
- **[Recharts 3](https://recharts.org)** for charts
- **[paper-design/shaders-react](https://shaders.paper.design)** for shader blocks
- **[Bun](https://bun.com)** as runtime + package manager
- **[Biome v2](https://biomejs.dev)** + **[Ultracite](https://www.ultracite.ai)** for lint + format
- **[TypeScript 6](https://www.typescriptlang.org)**

## Stand on the shoulders of giants

Craftled UI is shadcn-native, not a fork. We use shadcn's CLI, registry format, and primitives directly. The custom work is:

1. **Craft-led variants** of the atomic primitives where we have an opinion (Button's layered ring, Card's surface treatment).
2. **Production-quality blocks** assembled from those primitives, written to be deleted from your repo when you outgrow them.

Special thanks to **[@shadcn](https://x.com/shadcn)** for the registry pattern that makes any of this possible, **[Paper Design](https://paper.design)** for the shaders, and **[Recharts](https://recharts.org)** for being the only chart library that survives every React major bump.

## Known issues

- **Shader blocks** — unhandled WebGL rejections in headless browsers without GPU
  passthrough (Puppeteer / Playwright CI). Real users on modern desktop and mobile
  browsers are unaffected. Planned fix: `ShaderErrorBoundary` with static fallback.
- **Cursor embedded browser** — hydration warnings from injected `data-cursor-ref`
  attributes on preview routes. Development-only noise; SSR output is clean. Verify
  in an external browser when chasing real hydration bugs.
- **`featured-logo-spotlight` demo** — Variants rail has presets/shuffle only (no
  title/accent `VariantContent` like other shader demos).

See [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) for symptoms, workarounds, and scope.

## License

[MIT](./LICENSE) — use it for anything.

---

Made with care by [Craftled](https://craftled.com). Issues and PRs welcome at [github.com/craftled/ui](https://github.com/craftled/ui).
