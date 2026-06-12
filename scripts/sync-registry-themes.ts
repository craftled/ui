/**
 * Sync registry:theme items in registry.json from lib/brand-themes.ts.
 * Run after editing BRAND_THEMES: `bun scripts/sync-registry-themes.ts`
 */
import { readFileSync, writeFileSync } from "node:fs";

import { BRAND_THEMES } from "../lib/brand-themes";

const registryPath = new URL("../registry.json", import.meta.url);
const registry = JSON.parse(readFileSync(registryPath, "utf8")) as {
  items: Record<string, unknown>[];
};

const themeItems = BRAND_THEMES.map((brand) => ({
  name: brand.registryName,
  type: "registry:theme",
  title: brand.label,
  description: brand.lightOnly
    ? `${brand.label} brand theme (light parchment system). Install with shadcn add @craftled/${brand.registryName}`
    : `Default ${brand.label} docs theme. Install with shadcn add @craftled/${brand.registryName}`,
  cssVars: brand.cssVars,
  categories: ["theme"],
}));

for (const item of themeItems) {
  const idx = registry.items.findIndex((i) => i.name === item.name);
  if (idx >= 0) {
    registry.items[idx] = item;
  } else {
    registry.items.push(item);
  }
}

writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`);
console.log("Synced themes:", themeItems.map((t) => t.name).join(", "));
