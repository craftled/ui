/** Discrete title sizes — components expose tiers, not continuous px. */
export type TitleSizeTier = "sm" | "md" | "lg";

export const TITLE_SIZE_PX: Record<TitleSizeTier, number> = {
  sm: 28,
  md: 44,
  lg: 60,
};

export const TITLE_SIZE_LABELS: Record<TitleSizeTier, string> = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
};

export function titleSizeTierFromPx(px: number): TitleSizeTier {
  if (px <= 32) {
    return "sm";
  }
  if (px <= 52) {
    return "md";
  }
  return "lg";
}
