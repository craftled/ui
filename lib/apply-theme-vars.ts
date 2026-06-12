import type { ThemeCssVars } from "@/lib/brand-themes";

const SEMANTIC_KEYS = new Set([
  "radius",
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  "chart-1",
  "chart-2",
  "chart-3",
  "chart-4",
  "chart-5",
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]);

/** Apply shadcn registry:theme cssVars to the document root (runtime brand switch). */
export function applyThemeCssVars(
  cssVars: ThemeCssVars,
  options: { colorScheme: "light" | "dark"; lightOnly?: boolean }
) {
  const root = document.documentElement;
  const mode =
    options.lightOnly || options.colorScheme === "light" ? "light" : "dark";
  const vars = { ...cssVars.theme, ...cssVars[mode] };

  for (const [key, value] of Object.entries(vars)) {
    const prop = SEMANTIC_KEYS.has(key) ? `--${key}` : `--${key}`;
    root.style.setProperty(prop, value);
  }
}

/** Clear inline overrides so globals.css :root / .dark tokens apply again. */
export function clearThemeCssVars(cssVars: ThemeCssVars) {
  const root = document.documentElement;
  const keys = new Set([
    ...Object.keys(cssVars.light),
    ...Object.keys(cssVars.dark),
    ...Object.keys(cssVars.theme ?? {}),
  ]);

  for (const key of keys) {
    root.style.removeProperty(`--${key}`);
  }
}
