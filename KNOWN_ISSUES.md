# Known issues

Issues that are real but not yet fixed. Each one tracks what we know,
where it bites, and what the fix looks like.

## Paper Shaders WebGL rejections in headless browsers

**Affects:** `featured-halftone`, `featured-halftone-dots`, `featured-dithering`,
`featured-fluted-glass`, `featured-grain-gradient`, `featured-mesh-gradient`,
`featured-color-panels`, `featured-logo-spotlight` (any block backed by
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

## Anything else?

If you hit something that isn't here, open an issue at
[github.com/craftled/ui/issues](https://github.com/craftled/ui/issues)
and we'll add it.
