# Craftled UI

A craft-led, shadcn-native component library. Charts, blocks, shaders, and primitives — copy/paste with the shadcn CLI.

**[ui.craftled.com](https://ui.craftled.com)** · [Components](https://ui.craftled.com)

![Craftled UI](https://ui.craftled.com/opengraph-image)

## What this is

Craftled UI sits on top of the shadcn ecosystem. Every primitive is shadcn-style — TSX you own, Tailwind classes you can edit, Radix for the unsexy a11y plumbing. No runtime dependency on a published `@craftled/ui` package. You install components by URL through the shadcn CLI, and they land in your repo as plain files.

The library is opinionated about taste, not architecture. The atomic primitives (`button`, `card`, `input`, `label`, `separator`, `skeleton`, `chart`) mirror shadcn's New York style with a few craft-led tweaks. The blocks on top — dashboards, charts, CTAs, testimonials, paper-design shaders — are the value-add: production-ready compositions you can drop into a site in under a minute.

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

## What's inside

### Primitives (7)

`button` · `card` · `chart` · `input` · `label` · `separator` · `skeleton`

Drop-in replacements for the shadcn New York equivalents. The Button is opinionated — a layered ring + shadow treatment lifted from production work — but the rest mirror upstream so you can mix and match without surprises.

### Charts (2)

- **`chart-area-gradient`** — Recharts area chart with gradient fill, themed for both modes.
- **`chart-stems`** — Sparse stem-and-leaf chart for low-density dashboards.

### Dashboards (2)

- **`dashboard-finance`** — KPI cards + a financial chart tile. Drop-in for a Stripe-style overview.
- **`dashboard-net-worth`** — Multi-account net worth view with a stacked area chart.

### CTAs (4)

`cta-gradient` · `cta-newsletter` · `cta-ebook` · `cta-app-stack`

Production-grade marketing CTAs. Each one ships with a demo that uses real-looking content, not lorem ipsum.

### Featured / shader blocks (8)

`featured-halftone` · `featured-halftone-dots` · `featured-dithering` · `featured-fluted-glass` · `featured-grain-gradient` · `featured-mesh-gradient` · `featured-color-panels` · `featured-logo-spotlight`

WebGL shader blocks via [`@paper-design/shaders-react`](https://shaders.paper.design). Each one renders an image with a real shader pass and exposes the right knobs (intensity, scale, color mix). Use them as hero panels, OG images, or as background atmosphere.

### Editorial blocks (6)

- **`featured-event`** — Highlight reel for events / launches.
- **`featured-integrations`** — Orbit-style logo carousel for ecosystem pages.
- **`featured-story`** — Magazine-style story card with optional link wrapping.
- **`annotated-figure`** — Marketing figure with callouts.
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

The `/` route is the gallery; `/preview/[name]` renders any component standalone. Editing a primitive or block hot-reloads everywhere it's used.

### Add a new component

1. Drop your source at `registry/new-york/blocks/<name>/<name>.tsx`.
2. Add a sibling `<name>.demo.tsx` exporting a default demo composition.
3. Register it in `registry.json` with `registryDependencies` for any shadcn primitives you reuse.
4. `bun run registry:build` → preview at `/preview/<name>`.

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

## License

[MIT](./LICENSE) — use it for anything.

---

Made with care by [Craftled](https://craftled.com). Issues and PRs welcome at [github.com/craftled/ui](https://github.com/craftled/ui).
