/**
 * Brand themes — shadcn-native `registry:theme` cssVars shape.
 * @see https://ui.shadcn.com/docs/registry/examples#registrytheme
 * @see https://ui.shadcn.com/r/colors/neutral.json (inlineColors / cssVars)
 *
 * After editing BRAND_THEMES, run `bun scripts/sync-registry-themes.ts`
 * then `bun run registry:build`.
 */

export type ThemeCssVars = {
  light: Record<string, string>;
  dark: Record<string, string>;
  theme?: Record<string, string>;
};

export type BrandTheme = {
  id: string;
  label: string;
  /** Registry item name — `shadcn add @craftled/<registryName>` */
  registryName: string;
  /** When set, always applies `light` tokens (e.g. ElevenLabs parchment system). */
  lightOnly?: boolean;
  cssVars: ThemeCssVars;
  /** Optional human reference — not loaded at runtime */
  brandDoc?: string;
  /** Curated hex swatches for variant-panel title/accent picks */
  decorativeSwatches?: string[];
};

/** Default docs shell — matches :root / .dark in app/globals.css */
const CRAFTLED_CSS_VARS: ThemeCssVars = {
  light: {
    radius: "0.625rem",
    background: "oklch(1 0 0)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(1 0 0)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "oklch(0.205 0 0)",
    "primary-foreground": "oklch(0.985 0 0)",
    secondary: "oklch(0.97 0 0)",
    "secondary-foreground": "oklch(0.205 0 0)",
    muted: "oklch(0.97 0 0)",
    "muted-foreground": "oklch(0.556 0 0)",
    accent: "oklch(0.97 0 0)",
    "accent-foreground": "oklch(0.205 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    border: "oklch(0.922 0 0)",
    input: "oklch(0.922 0 0)",
    ring: "oklch(0.708 0 0)",
    "chart-1": "oklch(0.646 0.222 41.116)",
    "chart-2": "oklch(0.6 0.118 184.704)",
    "chart-3": "oklch(0.398 0.07 227.392)",
    "chart-4": "oklch(0.828 0.189 84.429)",
    "chart-5": "oklch(0.769 0.188 70.08)",
    sidebar: "oklch(0.985 0 0)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "oklch(0.205 0 0)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.97 0 0)",
    "sidebar-accent-foreground": "oklch(0.205 0 0)",
    "sidebar-border": "oklch(0.922 0 0)",
    "sidebar-ring": "oklch(0.708 0 0)",
  },
  dark: {
    background: "oklch(0.145 0 0)",
    foreground: "oklch(0.985 0 0)",
    card: "oklch(0.205 0 0)",
    "card-foreground": "oklch(0.985 0 0)",
    popover: "oklch(0.205 0 0)",
    "popover-foreground": "oklch(0.985 0 0)",
    primary: "oklch(0.922 0 0)",
    "primary-foreground": "oklch(0.205 0 0)",
    secondary: "oklch(0.269 0 0)",
    "secondary-foreground": "oklch(0.985 0 0)",
    muted: "oklch(0.269 0 0)",
    "muted-foreground": "oklch(0.708 0 0)",
    accent: "oklch(0.269 0 0)",
    "accent-foreground": "oklch(0.985 0 0)",
    destructive: "oklch(0.704 0.191 22.216)",
    border: "oklch(1 0 0 / 10%)",
    input: "oklch(1 0 0 / 15%)",
    ring: "oklch(0.556 0 0)",
    "chart-1": "oklch(0.488 0.243 264.376)",
    "chart-2": "oklch(0.696 0.17 162.48)",
    "chart-3": "oklch(0.769 0.188 70.08)",
    "chart-4": "oklch(0.627 0.265 303.9)",
    "chart-5": "oklch(0.645 0.246 16.439)",
    sidebar: "oklch(0.205 0 0)",
    "sidebar-foreground": "oklch(0.985 0 0)",
    "sidebar-primary": "oklch(0.488 0.243 264.376)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.269 0 0)",
    "sidebar-accent-foreground": "oklch(0.985 0 0)",
    "sidebar-border": "oklch(1 0 0 / 10%)",
    "sidebar-ring": "oklch(0.556 0 0)",
  },
};

/** ElevenLabs parchment system — monochrome UI, decorative accents only */
const ELEVENLABS_CSS_VARS: ThemeCssVars = {
  theme: {
    "brand-violet": "oklch(0.45 0.31 264)",
    "brand-orange": "oklch(0.63 0.24 35)",
  },
  light: {
    radius: "1.25rem",
    background: "oklch(0.994 0.002 85)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(0.965 0.004 80)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "oklch(0.145 0 0)",
    "primary-foreground": "oklch(0.985 0 0)",
    secondary: "oklch(0.965 0.004 80)",
    "secondary-foreground": "oklch(0.145 0 0)",
    muted: "oklch(0.965 0.004 80)",
    "muted-foreground": "oklch(0.52 0.015 75)",
    accent: "oklch(0.965 0.004 80)",
    "accent-foreground": "oklch(0.145 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    border: "oklch(0.91 0 0)",
    input: "oklch(0.91 0 0)",
    ring: "oklch(0.52 0.015 75)",
    "chart-1": "oklch(0.45 0.31 264)",
    "chart-2": "oklch(0.63 0.24 35)",
    "chart-3": "oklch(0.52 0.015 75)",
    "chart-4": "oklch(0.965 0.004 80)",
    "chart-5": "oklch(0.145 0 0)",
    sidebar: "oklch(0.994 0.002 85)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "oklch(0.145 0 0)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.965 0.004 80)",
    "sidebar-accent-foreground": "oklch(0.145 0 0)",
    "sidebar-border": "oklch(0.91 0 0)",
    "sidebar-ring": "oklch(0.52 0.015 75)",
  },
  dark: {
    radius: "1.25rem",
    background: "oklch(0.994 0.002 85)",
    foreground: "oklch(0.145 0 0)",
    card: "oklch(0.965 0.004 80)",
    "card-foreground": "oklch(0.145 0 0)",
    popover: "oklch(1 0 0)",
    "popover-foreground": "oklch(0.145 0 0)",
    primary: "oklch(0.145 0 0)",
    "primary-foreground": "oklch(0.985 0 0)",
    secondary: "oklch(0.965 0.004 80)",
    "secondary-foreground": "oklch(0.145 0 0)",
    muted: "oklch(0.965 0.004 80)",
    "muted-foreground": "oklch(0.52 0.015 75)",
    accent: "oklch(0.965 0.004 80)",
    "accent-foreground": "oklch(0.145 0 0)",
    destructive: "oklch(0.577 0.245 27.325)",
    border: "oklch(0.91 0 0)",
    input: "oklch(0.91 0 0)",
    ring: "oklch(0.52 0.015 75)",
    "chart-1": "oklch(0.45 0.31 264)",
    "chart-2": "oklch(0.63 0.24 35)",
    "chart-3": "oklch(0.52 0.015 75)",
    "chart-4": "oklch(0.965 0.004 80)",
    "chart-5": "oklch(0.145 0 0)",
    sidebar: "oklch(0.994 0.002 85)",
    "sidebar-foreground": "oklch(0.145 0 0)",
    "sidebar-primary": "oklch(0.145 0 0)",
    "sidebar-primary-foreground": "oklch(0.985 0 0)",
    "sidebar-accent": "oklch(0.965 0.004 80)",
    "sidebar-accent-foreground": "oklch(0.145 0 0)",
    "sidebar-border": "oklch(0.91 0 0)",
    "sidebar-ring": "oklch(0.52 0.015 75)",
  },
};

export const BRAND_THEMES: BrandTheme[] = [
  {
    id: "craftled",
    label: "Craftled",
    registryName: "theme-craftled",
    brandDoc: "brands/craftled.brand.md",
    decorativeSwatches: ["#ea580c", "#0891b2", "#4f46e5", "#ffffff", "#000000"],
    cssVars: CRAFTLED_CSS_VARS,
  },
  {
    id: "elevenlabs",
    label: "ElevenLabs",
    registryName: "theme-elevenlabs",
    lightOnly: true,
    brandDoc: "brands/elevenlabs.brand.md",
    decorativeSwatches: ["#0447ff", "#ff4704", "#000000", "#fdfcfc", "#777169"],
    cssVars: ELEVENLABS_CSS_VARS,
  },
];

export const DEFAULT_BRAND_ID = "craftled";

export function getBrandTheme(id: string): BrandTheme {
  return BRAND_THEMES.find((b) => b.id === id) ?? BRAND_THEMES[0];
}
