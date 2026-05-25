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
`/compose`, any route using `PreviewCodeTabs` or demo sidebars.

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

## Anything else?

If you hit something that isn't here, open an issue at
[github.com/craftled/ui/issues](https://github.com/craftled/ui/issues)
and we'll add it.
