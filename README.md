# Craftled UI

A parasitic, shadcn-native component library. Stands on the shoulders of [shadcn/ui](https://ui.shadcn.com/) — every Craftled component declares the underlying shadcn primitives as `registryDependencies`, so installing one of ours pulls theirs.

> Live registry: <https://ui.craftled.com>

## Install a component

```bash
bunx shadcn@latest registry add @craftled=https://ui.craftled.com/r/{name}.json
bunx shadcn@latest add @craftled/chart-area-gradient
```

…or, without registering the namespace:

```bash
bunx shadcn@latest add https://ui.craftled.com/r/chart-area-gradient.json
```

## Develop locally

```bash
bun install
bun dev                    # http://localhost:3000
bun run registry:build     # writes public/r/*.json
```

- `/` lists every registry item with a live preview.
- `/preview/[name]` renders a single item in isolation — fast HMR feedback loop.
- Edit a component under `registry/new-york/blocks/<name>/` → see it update instantly.

## Add a new component

1. Drop your source at `registry/new-york/blocks/<name>/<name>.tsx`.
2. Add a sibling `<name>.demo.tsx` exporting a default demo composition.
3. Register it in `registry.json` with `registryDependencies` for any shadcn primitives you reuse.
4. `bun run registry:build` → preview at `/preview/<name>`.

Built on shadcn CLI v4, Next.js 15 App Router, Tailwind v4, React 19.
