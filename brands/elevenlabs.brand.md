# ElevenLabs — Brand reference

> Parchment command terminal — warm paper surfaces beneath monochrome controls, with ambient color appearing only as sound made visible.

**Registry theme:** `theme-elevenlabs` — `npx shadcn@latest add @craftled/theme-elevenlabs`

**Theme mode:** light only (parchment canvas does not ship a dark UI layer)

## Rules (constrained customization)

- UI chrome stays **monochrome** — black pill primary, white outlined secondary, ghost links
- **Void Violet** (`#0447ff`) and **Ember Orange** (`#ff4704`) are **decorative only** — shader orbs, not buttons or links
- Display type uses light weight + tight tracking; functional UI stays Inter
- Cards use warm sand (`#f5f3f1`) at 20–24px radius; elevation is surface contrast, not heavy shadow

## shadcn token mapping

| Brand token | shadcn semantic |
|-------------|-----------------|
| Parchment White `#fdfcfc` | `--background`, `--sidebar` |
| Warm Sand `#f5f3f1` | `--card`, `--muted`, `--secondary` |
| Ash Border `#e5e5e5` | `--border`, `--input` |
| Midnight Ink `#000000` | `--foreground`, `--primary` |
| Driftwood `#777169` | `--muted-foreground` |
| Void Violet / Ember Orange | `--brand-violet`, `--brand-orange` (decorative) |

Full style reference: [Refero — ElevenLabs](https://styles.refero.design/style/031056ff-7af1-46db-8daa-115f731c5d26)
