# Claude / AI agent guidance for Craftled UI

Single source of truth for any AI agent (Claude Code, Codex, Cursor,
OpenClaw, etc.) working in this repo. Humans should read
[`README.md`](./README.md) instead.

## What this repo is

A **craft-led, shadcn-native** component library. Distribution happens
through the shadcn CLI — every block and primitive is fetched as a
self-contained TSX file from `ui.craftled.com/r/<name>.json` and lives
in the consumer's repo, not as an npm dependency.

Live at [ui.craftled.com](https://ui.craftled.com). Deployed on Vercel
under the `craftled` team scope.

## Voice rules

- Call the relationship to shadcn **"craft-led, shadcn-native"**.
- Never say **"parasitic"** (older framing — explicitly retired).
- The repo is `craftled/ui`, the namespace is `@craftled`, the registry
  name is `craftled`.

## Stack

- Next.js 16 (App Router + Turbopack) on Fluid Compute
- React 19.2, TypeScript 6, Tailwind CSS v4
- Bun toolchain — `bun install --frozen-lockfile` is wired in `vercel.json`
- Biome v2 + Ultracite for lint/format
- Radix primitives where a11y matters
- `@paper-design/shaders-react` for WebGL shader blocks

## Critical structural rules

1. **Registry items must be self-contained.** A block at
   `registry/new-york/blocks/<name>/<name>.tsx` cannot import from
   another block. When two blocks need the same helper
   (e.g. `POSITION_CLASSES`), duplicate it per file — shadcn CLI
   installs a single block in isolation and any cross-block import
   would 404 in the consumer's repo.
2. **Two root layouts via route groups.** `app/(docs)/layout.tsx`
   wraps everything that shows the SiteHeader. `app/(raw)/layout.tsx`
   is a fully independent root used by iframed previews so no chrome
   leaks in. Don't merge these.
3. **`registry.json` is the registry index.** Adding a component means
   adding an entry there plus a TSX file under
   `registry/new-york/{ui,blocks}/`. Then `bun run registry:build`
   regenerates everything under `public/r/`.
4. **Inline styles win over `titleClassName` for color.** The shader
   blocks expose `titleColor` as an optional hex; when set, it ships
   as `style={{ color }}` so CSS specificity beats any `text-*`
   utility on `titleClassName`. Leave the prop unset to keep the
   block's default color.

## Common commands

```bash
bun install                # pulls deps
bun dev                    # next dev (Turbopack) on :3000  — keep running
bun run build              # production build
bun run registry:build     # regenerate public/r/*.json
bun run check              # ultracite check (lint + format check)
bun run fix                # ultracite fix
```

**Do not kill `bun dev` after verifying a change.** The user keeps it
warm between tasks — restarting costs HMR state and Turbopack cache.

## Ship workflow (v0.3.x convention)

1. Land the code change. Run `bun run check` — must be clean.
2. Run `bun run registry:build` — regenerates `public/r/*.json`.
3. Bump `package.json` `version`.
4. Add a dated entry to `CHANGELOG.md` at the top.
5. Commit from the repo root (not a subdirectory — `git add` resolves
   relative to cwd, and an earlier ship lost files because of this).
6. Tag the version commit itself, not the latest HEAD:
   `git tag -a vX.Y.Z <commit-sha> -m "..."`
7. Push main + tag.
8. `gh release create vX.Y.Z` with notes.
9. Wait for Vercel auto-deploy, smoke test the changed routes on prod.

## Known gotchas

- **Direct pushes to `main` are guarded** by the agent classifier.
  When a push is blocked, surface the exact command for the user to
  run rather than retrying.
- **`bunx vercel@latest`** rather than the global CLI — global is
  often outdated.
- **Paper Shaders WebGL rejection in headless browsers.** Pre-existing
  caveat — see [`KNOWN_ISSUES.md`](./KNOWN_ISSUES.md).
- **Cursor embedded-browser hydration noise on preview routes.** Injected
  `data-cursor-ref` attributes cause dev-only mismatches — not a registry bug.
  See [`KNOWN_ISSUES.md`](./KNOWN_ISSUES.md).

## Reference docs

- [README.md](./README.md) — human-facing overview, install, inventory
- [CHANGELOG.md](./CHANGELOG.md) — per-release notes
- [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) — caveats the docs need to be
  honest about
- [LICENSE](./LICENSE) — MIT
