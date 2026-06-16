# Known issues

Issues that are real but not yet fixed. Each one tracks what we know,
where it bites, and what the fix looks like.

## Paper Shaders WebGL rejections in headless browsers

**Affects:** `featured-halftone`, `featured-halftone-dots`, `featured-dithering`,
`featured-fluted-glass`, `featured-grain-gradient`, `featured-mesh-gradient`,
`featured-color-panels`, `featured-logo-spotlight`, `featured-og-banner`
(any block backed by
[`@paper-design/shaders-react`](https://shaders.paper.design)).

**Symptom:** In headless Chromium / Puppeteer / Playwright runs without a
GPU, the shader components emit an unhandled promise rejection during
WebGL context creation. Pages still render — the canvas just stays blank
or falls back to a transparent surface — but the rejection bubbles to
the test runner's console and can fail strict-mode QA suites.

**Impact:** Pre-existing since `v0.1.0`. Real users on Chrome / Safari /
Firefox / Edge with a GPU are unaffected. Only headless CI environments
without GPU passthrough see the rejection.

**Workarounds:**

- Suppress unhandled rejections in your test harness for the affected
  routes (most QA runners support per-test allow-lists).
- Use the `image` prop without an effect by passing a wrapper that opts
  out — pending a proper `ShaderErrorBoundary`.

**Planned fix:** Add a `ShaderErrorBoundary` to each shader block that
catches the WebGL init failure and renders a static `<img>` fallback.
Tracked for a future minor release. PR welcome.

## Hydration warnings from `data-cursor-ref` in Cursor's embedded browser

**Affects:** Any preview page when opened in Cursor's built-in browser
(Glass / Simple Browser / agent browse tools). Examples: `/preview/*`,
any route using `PreviewCodeTabs` or demo sidebars.

**Symptom:** React reports a hydration mismatch on `data-cursor-ref`
attributes — often surfacing near `TabsTrigger`, `Button`, `h3`, or `p`
elements. The server HTML does not contain these attributes; Cursor's
browser automation injects them into the live DOM for element targeting
before or during hydration.

**Impact:** Development-only noise in Cursor's browser. SSR output is
clean (verify with `curl` — zero `data-cursor-ref` matches). Normal
Chrome, Safari, Firefox, and Edge are unaffected.

**Workarounds:**

- Verify previews in an external browser (Chrome, Arc, etc.) when
  checking for real hydration bugs.
- Ignore the warning when it only mentions `data-cursor-ref`.

**Not a registry bug:** No app code emits `data-cursor-ref`. Do not add
`suppressHydrationWarning` to silence this.

## `featured-logo-spotlight` demo — limited variant panel

**Affects:** `/preview/featured-logo-spotlight` only (the block itself is fine).

**Symptom:** The **Variants** rail exposes preset names and shuffle only. Unlike
other shader demos, there is no `VariantContent` section for title text, accent
swatches, or position — logo and palette colors live inside each preset.

**Impact:** Cosmetic / DX inconsistency on the docs site. Installable block API
is unchanged.

**Workaround:** Use preset variants or shuffle; edit `featured-logo-spotlight.demo.tsx`
if you need the full title-overlay control set.

## Brand theme constraints (docs site)

**Affects:** `theme-elevenlabs`, `BrandProvider`, `ThemeToggle`.

**Behavior:**

- **ElevenLabs** is `lightOnly` — activating it forces light mode and hides the
  dark/light toggle until you switch back to Craftled.
- Decorative tokens (`--brand-violet`, `--brand-orange`) are for shader accents
  in demos, not primary UI chrome. See `brands/*.brand.md`.

**Not a bug:** Intentional product rules for the parchment brand system.

## Biome 2.5.0 flags committed SVG assets

**Affects:** `bun run check` (Ultracite + Biome) if `@biomejs/biome` is bumped
from the pinned `2.4.16` to `2.5.0`+.

**Symptom:** Biome 2.5.0 began linting and formatting `.svg` files. The committed
assets under `public/` (Next.js defaults + brand logos) then trip
`lint/a11y/noSvgWithoutTitle`, `assist/source/useSortedAttributes`, and the
formatter — 25 findings on an otherwise-clean tree.

**Impact:** `bun run check` fails after a naive Biome bump. Held at `2.4.16` in
[`package.json`](./package.json) since v0.4.1; Ultracite `7.8.3` pairs cleanly
with it (no peer constraint, so the two can move independently).

**Planned fix:** Add `public/**/*.svg` to Biome's ignore list (or add `<title>`
elements and sort attributes on the SVGs), then take Biome 2.5.0+. Tracked for a
future chore release.

## Anything else?

If you hit something that isn't here, open an issue at
[github.com/craftled/ui/issues](https://github.com/craftled/ui/issues)
and we'll add it.
