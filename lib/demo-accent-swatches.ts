"use client";

import { useBrandOptional } from "@/components/brand-provider";

/** Merge block palette swatches with the active brand's decorative accents. */
export function useDemoAccentSwatches(extra: string[]): string[] {
  const brandCtx = useBrandOptional();
  const decorative = brandCtx?.brand.decorativeSwatches ?? [];
  return [...new Set([...decorative, ...extra])];
}
