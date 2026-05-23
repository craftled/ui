export function hslToHex(h: number, s: number, l: number): string {
  const lightness = l / 100;
  const a = (s / 100) * Math.min(lightness, 1 - lightness);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color =
      lightness - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export type PaletteOptions = {
  minS?: number;
  maxS?: number;
  minL?: number;
  maxL?: number;
  /** Hue spread per step in degrees. Random within range. */
  spreadMin?: number;
  spreadMax?: number;
};

export function randomPalette(
  count: number,
  opts: PaletteOptions = {}
): string[] {
  const {
    minS = 55,
    maxS = 95,
    minL = 35,
    maxL = 85,
    spreadMin = 30,
    spreadMax = 100,
  } = opts;
  const baseHue = Math.random() * 360;
  const spread = spreadMin + Math.random() * (spreadMax - spreadMin);
  return Array.from({ length: count }, (_, i) => {
    const h = (baseHue + i * spread) % 360;
    const s = minS + Math.random() * (maxS - minS);
    const l = minL + Math.random() * (maxL - minL);
    return hslToHex(h, s, l);
  });
}

export function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function randomItem<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

export function randomBool(probability = 0.5): boolean {
  return Math.random() < probability;
}
