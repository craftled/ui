"use client";

/**
 * Featured-effects registry — the single source of truth for the unified
 * `/preview/featured-effects` explorer.
 *
 * Each entry folds in what used to be a standalone `<name>.demo.tsx`: its
 * presets, its shuffle randomizer, the swatches its title picker offers, and
 * how it renders. The title overlay (text / position / size / color) is NOT
 * stored here — it's shared content the explorer owns and threads through to
 * whichever effect is active, so switching effects keeps your headline.
 *
 * The shipped components stay separate, self-contained registry items (one
 * installable file each). This module only consolidates the *docs* surface.
 */

import type * as React from "react";

import {
  hslToHex,
  randomBool,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette";
import { FeaturedColorPanels } from "@/registry/new-york/blocks/featured-color-panels/featured-color-panels";
import { FeaturedDithering } from "@/registry/new-york/blocks/featured-dithering/featured-dithering";
import { FeaturedFlutedGlass } from "@/registry/new-york/blocks/featured-fluted-glass/featured-fluted-glass";
import { FeaturedGrainGradient } from "@/registry/new-york/blocks/featured-grain-gradient/featured-grain-gradient";
import { FeaturedHalftone } from "@/registry/new-york/blocks/featured-halftone/featured-halftone";
import { FeaturedHalftoneDots } from "@/registry/new-york/blocks/featured-halftone-dots/featured-halftone-dots";
import { FeaturedMeshGradient } from "@/registry/new-york/blocks/featured-mesh-gradient/featured-mesh-gradient";

export type TitlePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export const FX_POSITION_GRID: TitlePosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "center-left",
  "center",
  "center-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

/** Shared title overlay — owned by the explorer, applied to every effect. */
export type FxContent = {
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

/** Opaque per-effect params. Each effect's own closures know the real shape. */
export type FxParams = Record<string, unknown>;

/** Pan/zoom applied to the source image (image effects only). */
export type ImageTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

/** A tunable control bound to one key of an effect's params. */
export type FxControl =
  | { kind: "choice"; key: string; label: string; options: readonly string[] }
  | {
      kind: "slider";
      key: string;
      label: string;
      min: number;
      max: number;
      step?: number;
    }
  | { kind: "toggle"; key: string; label: string }
  | { kind: "color"; key: string; label: string }
  | { kind: "colorList"; key: string; label: string; max: number };

export type FxEffect = {
  /** Registry name — also the install id (`/r/<id>.json`). */
  id: string;
  label: string;
  /** Whether the effect refracts a featured image (vs. generative). */
  takesImage: boolean;
  presetNames: string[];
  defaultPreset: string;
  /** Legible title color for this effect's typical background. */
  defaultTitleColor: string;
  getPreset: (name: string) => FxParams;
  randomParams: (prev: FxParams) => FxParams;
  /** Title-color swatches drawn from the effect's current palette. */
  swatches: (params: FxParams) => string[];
  /** Per-effect tuning controls, rendered in order in the panel. */
  controls: FxControl[];
  render: (args: {
    params: FxParams;
    content: FxContent;
    image: string;
    imageTransform: ImageTransform;
    webGlContextAttributes?: WebGLContextAttributes;
  }) => React.ReactNode;
};

/** OG image proportions (1200×630 ⇒ 1400×735) — the explorer renders to this. */
export const FX_ASPECT_RATIO = "1200/630";

function titleProps(content: FxContent) {
  return {
    title: content.titleText,
    titlePosition: content.titlePosition,
    titleSize: content.titleSize,
    titleColor: content.titleColor,
  };
}

/** Shared frame props every effect renders with inside the explorer. */
function frameProps(webGlContextAttributes?: WebGLContextAttributes) {
  return {
    aspectRatio: FX_ASPECT_RATIO,
    className: "rounded-none",
    webGlContextAttributes,
  };
}

// ───────────────────────── Dithering ─────────────────────────

type DitherParams = {
  type: "random" | "2x2" | "4x4" | "8x8";
  size: number;
  colorSteps: number;
  colorBack: string;
  colorFront: string;
  colorHighlight: string;
  originalColors: boolean;
  inverted: boolean;
};

const DITHER_TYPES = ["random", "2x2", "4x4", "8x8"] as const;

const DITHER_PRESETS: Record<string, DitherParams> = {
  Default: {
    type: "8x8",
    size: 2,
    colorSteps: 2,
    colorBack: "#000c38",
    colorFront: "#94ffaf",
    colorHighlight: "#eaff94",
    originalColors: false,
    inverted: false,
  },
  Noise: {
    type: "random",
    size: 1,
    colorSteps: 1,
    colorBack: "#000000",
    colorFront: "#a2997c",
    colorHighlight: "#ededed",
    originalColors: false,
    inverted: false,
  },
  Retro: {
    type: "2x2",
    size: 3,
    colorSteps: 1,
    colorBack: "#5452ff",
    colorFront: "#eeeeee",
    colorHighlight: "#eeeeee",
    originalColors: false,
    inverted: false,
  },
  Natural: {
    type: "8x8",
    size: 2,
    colorSteps: 5,
    colorBack: "#000000",
    colorFront: "#ffffff",
    colorHighlight: "#ffffff",
    originalColors: true,
    inverted: false,
  },
};

const dithering: FxEffect = {
  id: "featured-dithering",
  label: "Dithering",
  takesImage: true,
  presetNames: Object.keys(DITHER_PRESETS),
  defaultPreset: "Default",
  defaultTitleColor: "#ffffff",
  getPreset: (name) => DITHER_PRESETS[name] as FxParams,
  randomParams: () => {
    const palette = randomPalette(3, { spreadMin: 80, spreadMax: 200 });
    return {
      type: randomItem(DITHER_TYPES),
      size: randomInRange(0.5, 5),
      colorSteps: 1 + Math.floor(Math.random() * 6),
      colorBack: palette[0],
      colorFront: palette[1],
      colorHighlight: palette[2],
      originalColors: randomBool(0.2),
      inverted: randomBool(0.2),
    } satisfies DitherParams;
  },
  swatches: (params) => {
    const p = params as DitherParams;
    return [p.colorFront, p.colorHighlight, p.colorBack, "#ffffff", "#000000"];
  },
  controls: [
    { kind: "choice", key: "type", label: "Pattern", options: DITHER_TYPES },
    {
      kind: "slider",
      key: "size",
      label: "Pixel size",
      min: 0.5,
      max: 20,
      step: 0.5,
    },
    {
      kind: "slider",
      key: "colorSteps",
      label: "Color steps",
      min: 1,
      max: 7,
      step: 1,
    },
    { kind: "color", key: "colorBack", label: "Background" },
    { kind: "color", key: "colorFront", label: "Foreground" },
    { kind: "color", key: "colorHighlight", label: "Highlight" },
    { kind: "toggle", key: "originalColors", label: "Original colors" },
    { kind: "toggle", key: "inverted", label: "Invert" },
  ],
  render: ({
    params,
    content,
    image,
    imageTransform,
    webGlContextAttributes,
  }) => (
    <FeaturedDithering
      {...(params as DitherParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
      image={image}
      offsetX={imageTransform.offsetX}
      offsetY={imageTransform.offsetY}
      scale={imageTransform.scale}
    />
  ),
};

// ───────────────────────── Halftone (CMYK) ─────────────────────────

type HalftoneParams = {
  type: "dots" | "ink" | "sharp";
  size: number;
  softness: number;
  contrast: number;
  grainOverlay: number;
  grainMixer: number;
  colorBack: string;
  colorC: string;
  colorM: string;
  colorY: string;
  colorK: string;
};

const HALFTONE_TYPES = ["dots", "ink", "sharp"] as const;

const HALFTONE_DEFAULT: HalftoneParams = {
  type: "ink",
  size: 0.18,
  softness: 0.55,
  contrast: 1.1,
  grainOverlay: 0.25,
  grainMixer: 0.15,
  colorBack: "#f3ead8",
  colorC: "#1f6f97",
  colorM: "#d23a5a",
  colorY: "#e8a334",
  colorK: "#1a1a1a",
};

const HALFTONE_PRESETS: Record<string, Partial<HalftoneParams>> = {
  Vintage: { ...HALFTONE_DEFAULT },
  Newspaper: {
    type: "dots",
    colorBack: "#fbfaf4",
    colorC: "#1a1a1a",
    colorM: "#1a1a1a",
    colorY: "#1a1a1a",
    colorK: "#1a1a1a",
    size: 0.1,
    softness: 0.2,
    contrast: 1.5,
    grainOverlay: 0,
    grainMixer: 0,
  },
  Default: {
    type: "ink",
    colorBack: "#fbfaf4",
    colorC: "#00b2ff",
    colorM: "#fc4f9d",
    colorY: "#ffd900",
    colorK: "#231f20",
    size: 0.2,
    softness: 1,
    contrast: 1,
    grainOverlay: 0,
    grainMixer: 0,
  },
  Drops: {
    type: "ink",
    colorBack: "#0a0a0a",
    colorC: "#7be0ff",
    colorM: "#ff7ac6",
    colorY: "#ffe066",
    colorK: "#ffffff",
    size: 0.3,
    softness: 0.85,
    contrast: 1.1,
    grainOverlay: 0.4,
    grainMixer: 0.4,
  },
};

const halftone: FxEffect = {
  id: "featured-halftone",
  label: "Halftone CMYK",
  takesImage: true,
  presetNames: Object.keys(HALFTONE_PRESETS),
  defaultPreset: "Vintage",
  defaultTitleColor: "#1c1917",
  getPreset: (name) =>
    ({ ...HALFTONE_DEFAULT, ...HALFTONE_PRESETS[name] }) as FxParams,
  randomParams: () => {
    const palette = randomPalette(4, { minL: 35, maxL: 70 });
    return {
      type: randomItem(HALFTONE_TYPES),
      size: randomInRange(0.08, 0.35),
      softness: randomInRange(0.2, 1),
      contrast: randomInRange(0.8, 1.5),
      grainMixer: randomInRange(0, 0.3),
      grainOverlay: randomInRange(0, 0.4),
      colorBack: randomBool(0.4)
        ? "#fbfaf4"
        : hslToHex(Math.random() * 360, 18, 88 + Math.random() * 8),
      colorC: palette[0],
      colorM: palette[1],
      colorY: palette[2],
      colorK: "#1a1a1a",
    } satisfies HalftoneParams;
  },
  swatches: (params) => {
    const p = params as HalftoneParams;
    return [
      p.colorC,
      p.colorM,
      p.colorY,
      p.colorK,
      p.colorBack,
      "#ffffff",
      "#000000",
    ];
  },
  controls: [
    {
      kind: "choice",
      key: "type",
      label: "Dot style",
      options: HALFTONE_TYPES,
    },
    {
      kind: "slider",
      key: "size",
      label: "Cell size",
      min: 0.05,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "softness",
      label: "Softness",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "contrast",
      label: "Contrast",
      min: 0,
      max: 2,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainOverlay",
      label: "Grain overlay",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainMixer",
      label: "Grain mixer",
      min: 0,
      max: 1,
      step: 0.01,
    },
    { kind: "color", key: "colorBack", label: "Paper" },
    { kind: "color", key: "colorC", label: "Cyan" },
    { kind: "color", key: "colorM", label: "Magenta" },
    { kind: "color", key: "colorY", label: "Yellow" },
    { kind: "color", key: "colorK", label: "Key (black)" },
  ],
  render: ({
    params,
    content,
    image,
    imageTransform,
    webGlContextAttributes,
  }) => (
    <FeaturedHalftone
      {...(params as HalftoneParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
      image={image}
      imageAlt="Featured"
      offsetX={imageTransform.offsetX}
      offsetY={imageTransform.offsetY}
      scale={imageTransform.scale}
    />
  ),
};

// ───────────────────────── Halftone dots ─────────────────────────

type HalftoneDotsParams = {
  type: "classic" | "gooey" | "holes" | "soft";
  grid: "square" | "hex";
  size: number;
  radius: number;
  contrast: number;
  grainMixer: number;
  grainOverlay: number;
  grainSize: number;
  colorBack: string;
  colorFront: string;
  originalColors: boolean;
  inverted: boolean;
};

const DOTS_TYPES = ["classic", "gooey", "holes", "soft"] as const;
const DOTS_GRIDS = ["square", "hex"] as const;

const DOTS_PRESETS: Record<string, HalftoneDotsParams> = {
  Default: {
    type: "gooey",
    grid: "hex",
    size: 0.5,
    radius: 1.25,
    contrast: 0.4,
    grainMixer: 0.2,
    grainOverlay: 0.2,
    grainSize: 0.5,
    colorBack: "#f2f1e8",
    colorFront: "#2b2b2b",
    originalColors: false,
    inverted: false,
  },
  "LED screen": {
    type: "soft",
    grid: "square",
    size: 0.5,
    radius: 1.5,
    contrast: 0.3,
    grainMixer: 0,
    grainOverlay: 0,
    grainSize: 0.5,
    colorBack: "#000000",
    colorFront: "#29ff7b",
    originalColors: false,
    inverted: false,
  },
  Mosaic: {
    type: "classic",
    grid: "hex",
    size: 0.6,
    radius: 2,
    contrast: 0.01,
    grainMixer: 0,
    grainOverlay: 0,
    grainSize: 0.5,
    colorBack: "#000000",
    colorFront: "#b2aeae",
    originalColors: true,
    inverted: false,
  },
  "Round and square": {
    type: "holes",
    grid: "square",
    size: 0.8,
    radius: 1,
    contrast: 1,
    grainMixer: 0.05,
    grainOverlay: 0.3,
    grainSize: 0.5,
    colorBack: "#141414",
    colorFront: "#ff8000",
    originalColors: false,
    inverted: true,
  },
};

const halftoneDots: FxEffect = {
  id: "featured-halftone-dots",
  label: "Halftone dots",
  takesImage: true,
  presetNames: Object.keys(DOTS_PRESETS),
  defaultPreset: "Default",
  defaultTitleColor: "#1c1917",
  getPreset: (name) => DOTS_PRESETS[name] as FxParams,
  randomParams: () =>
    ({
      type: randomItem(DOTS_TYPES),
      grid: randomItem(DOTS_GRIDS),
      size: randomInRange(0.25, 0.8),
      radius: randomInRange(0.8, 2),
      contrast: randomInRange(0.2, 1),
      grainMixer: randomInRange(0, 0.3),
      grainOverlay: randomInRange(0, 0.3),
      grainSize: 0.5,
      colorBack: randomBool(0.5)
        ? "#000000"
        : hslToHex(Math.random() * 360, 25, 90 + Math.random() * 5),
      colorFront: hslToHex(
        Math.random() * 360,
        60 + Math.random() * 30,
        35 + Math.random() * 45
      ),
      originalColors: randomBool(0.25),
      inverted: randomBool(0.2),
    }) satisfies HalftoneDotsParams,
  swatches: (params) => {
    const p = params as HalftoneDotsParams;
    return [p.colorFront, p.colorBack, "#ffffff", "#000000"];
  },
  controls: [
    { kind: "choice", key: "type", label: "Dot style", options: DOTS_TYPES },
    { kind: "choice", key: "grid", label: "Grid", options: DOTS_GRIDS },
    {
      kind: "slider",
      key: "size",
      label: "Grid size",
      min: 0.1,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "radius",
      label: "Dot radius",
      min: 0,
      max: 2,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "contrast",
      label: "Contrast",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainMixer",
      label: "Grain mixer",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainOverlay",
      label: "Grain overlay",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainSize",
      label: "Grain size",
      min: 0,
      max: 1,
      step: 0.01,
    },
    { kind: "color", key: "colorBack", label: "Paper" },
    { kind: "color", key: "colorFront", label: "Dot" },
    { kind: "toggle", key: "originalColors", label: "Original colors" },
    { kind: "toggle", key: "inverted", label: "Invert" },
  ],
  render: ({
    params,
    content,
    image,
    imageTransform,
    webGlContextAttributes,
  }) => (
    <FeaturedHalftoneDots
      {...(params as HalftoneDotsParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
      image={image}
      offsetX={imageTransform.offsetX}
      offsetY={imageTransform.offsetY}
      scale={imageTransform.scale}
    />
  ),
};

// ───────────────────────── Fluted glass ─────────────────────────

type FlutedParams = {
  shape: "lines" | "linesIrregular" | "wave" | "zigzag" | "pattern";
  distortionShape: "prism" | "lens" | "contour" | "cascade" | "flat";
  size: number;
  angle: number;
  distortion: number;
  shift: number;
  stretch: number;
  blur: number;
  edges: number;
  margin: number;
  shadows: number;
  highlights: number;
  grainOverlay: number;
  colorShadow: string;
  colorHighlight: string;
};

const FLUTED_SHAPES = [
  "lines",
  "linesIrregular",
  "wave",
  "zigzag",
  "pattern",
] as const;
const FLUTED_DISTORTION_SHAPES = [
  "prism",
  "lens",
  "contour",
  "cascade",
  "flat",
] as const;

const FLUTED_PRESETS: Record<string, FlutedParams> = {
  Default: {
    shape: "lines",
    distortionShape: "prism",
    size: 0.5,
    angle: 0,
    distortion: 0.5,
    shift: 0,
    stretch: 0,
    blur: 0,
    edges: 0.25,
    margin: 0,
    shadows: 0.25,
    highlights: 0.1,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
  Abstract: {
    shape: "linesIrregular",
    distortionShape: "flat",
    size: 0.7,
    angle: 30,
    distortion: 1,
    shift: 0,
    stretch: 1,
    blur: 1,
    edges: 0.5,
    margin: 0,
    shadows: 0,
    highlights: 0,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
  Waves: {
    shape: "wave",
    distortionShape: "contour",
    size: 0.9,
    angle: 0,
    distortion: 0.5,
    shift: 0,
    stretch: 1,
    blur: 0.1,
    edges: 0.5,
    margin: 0,
    shadows: 0,
    highlights: 0,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
  Folds: {
    shape: "lines",
    distortionShape: "cascade",
    size: 0.4,
    angle: 0,
    distortion: 0.75,
    shift: 0,
    stretch: 0,
    blur: 0.25,
    edges: 0.5,
    margin: 0.1,
    shadows: 0.4,
    highlights: 0,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
};

const flutedGlass: FxEffect = {
  id: "featured-fluted-glass",
  label: "Fluted glass",
  takesImage: true,
  presetNames: Object.keys(FLUTED_PRESETS),
  defaultPreset: "Default",
  defaultTitleColor: "#ffffff",
  getPreset: (name) => FLUTED_PRESETS[name] as FxParams,
  randomParams: () =>
    ({
      shape: randomItem(FLUTED_SHAPES),
      distortionShape: randomItem(FLUTED_DISTORTION_SHAPES),
      size: randomInRange(0.3, 0.9),
      angle: Math.random() * 180,
      distortion: randomInRange(0.3, 1),
      shift: randomInRange(-0.5, 0.5),
      stretch: Math.random(),
      blur: randomInRange(0, 0.4),
      edges: randomInRange(0.1, 0.7),
      margin: 0,
      shadows: randomInRange(0, 0.5),
      highlights: randomInRange(0, 0.3),
      grainOverlay: 0,
      colorShadow: "#000000",
      colorHighlight: "#ffffff",
    }) satisfies FlutedParams,
  swatches: (params) => {
    const p = params as FlutedParams;
    return [p.colorHighlight, p.colorShadow, "#ffffff", "#000000"];
  },
  controls: [
    {
      kind: "choice",
      key: "shape",
      label: "Grid shape",
      options: FLUTED_SHAPES,
    },
    {
      kind: "choice",
      key: "distortionShape",
      label: "Distortion",
      options: FLUTED_DISTORTION_SHAPES,
    },
    {
      kind: "slider",
      key: "size",
      label: "Grid size",
      min: 0,
      max: 1,
      step: 0.01,
    },
    { kind: "slider", key: "angle", label: "Angle", min: 0, max: 180, step: 1 },
    {
      kind: "slider",
      key: "distortion",
      label: "Distortion",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "shift",
      label: "Shift",
      min: -1,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "stretch",
      label: "Stretch",
      min: 0,
      max: 1,
      step: 0.01,
    },
    { kind: "slider", key: "blur", label: "Blur", min: 0, max: 1, step: 0.01 },
    {
      kind: "slider",
      key: "edges",
      label: "Edges",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "margin",
      label: "Margin",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "shadows",
      label: "Shadows",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "highlights",
      label: "Highlights",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainOverlay",
      label: "Grain overlay",
      min: 0,
      max: 1,
      step: 0.01,
    },
    { kind: "color", key: "colorShadow", label: "Shadow tint" },
    { kind: "color", key: "colorHighlight", label: "Highlight tint" },
  ],
  render: ({
    params,
    content,
    image,
    imageTransform,
    webGlContextAttributes,
  }) => (
    <FeaturedFlutedGlass
      {...(params as FlutedParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
      image={image}
      offsetX={imageTransform.offsetX}
      offsetY={imageTransform.offsetY}
      scale={imageTransform.scale}
    />
  ),
};

// ───────────────────────── Color panels (generative) ─────────────────────────

type ColorPanelsParams = {
  colors: string[];
  colorBack: string;
  density: number;
  angle1: number;
  angle2: number;
  length: number;
  edges: boolean;
  blur: number;
  fadeIn: number;
  fadeOut: number;
  gradient: number;
  speed: number;
  scale: number;
  rotation: number;
  offsetX: number;
  offsetY: number;
};

const COLOR_PANELS_PRESETS: Record<string, ColorPanelsParams> = {
  Default: {
    colors: [
      "#ff9d00",
      "#fd4f30",
      "#809bff",
      "#6d2eff",
      "#333aff",
      "#f15cff",
      "#ffd557",
    ],
    colorBack: "#000000",
    density: 3,
    angle1: 0,
    angle2: 0,
    length: 1.1,
    edges: false,
    blur: 0,
    fadeIn: 1,
    fadeOut: 0.3,
    gradient: 0,
    speed: 0.5,
    scale: 0.8,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  },
  Glass: {
    colors: ["#00cfff", "#ff2d55", "#34c759", "#af52de"],
    colorBack: "#ffffff00",
    density: 1.6,
    angle1: 0.3,
    angle2: 0.3,
    length: 1,
    edges: true,
    blur: 0.25,
    fadeIn: 0.85,
    fadeOut: 0.3,
    gradient: 0,
    speed: 1,
    scale: 1,
    rotation: 112,
    offsetX: 0,
    offsetY: 0,
  },
  Gradient: {
    colors: ["#f2ff00", "#00000000", "#00000000", "#5a0283", "#005eff"],
    colorBack: "#8ffff2",
    density: 1.65,
    angle1: 0.4,
    angle2: 0.4,
    length: 3,
    edges: false,
    blur: 0.5,
    fadeIn: 1,
    fadeOut: 0.39,
    gradient: 0.78,
    speed: 0.5,
    scale: 1.72,
    rotation: 270,
    offsetX: 0.18,
    offsetY: 0,
  },
  Opening: {
    colors: ["#00ffff"],
    colorBack: "#570044",
    density: 2.21,
    angle1: -1,
    angle2: -1,
    length: 0.52,
    edges: false,
    blur: 0,
    fadeIn: 0,
    fadeOut: 1,
    gradient: 0,
    speed: 2,
    scale: 2.32,
    rotation: 360,
    offsetX: -0.3,
    offsetY: 0.6,
  },
};

const colorPanels: FxEffect = {
  id: "featured-color-panels",
  label: "Color panels",
  takesImage: false,
  presetNames: Object.keys(COLOR_PANELS_PRESETS),
  defaultPreset: "Default",
  defaultTitleColor: "#ffffff",
  getPreset: (name) => COLOR_PANELS_PRESETS[name] as FxParams,
  randomParams: () =>
    ({
      colors: randomPalette(4 + Math.floor(Math.random() * 4)),
      colorBack: randomBool(0.4)
        ? "#000000"
        : hslToHex(Math.random() * 360, 20, 5),
      density: randomInRange(1, 5),
      angle1: randomInRange(-1, 1),
      angle2: randomInRange(-1, 1),
      length: randomInRange(0.5, 2.5),
      edges: randomBool(0.3),
      blur: randomInRange(0, 0.4),
      fadeIn: randomInRange(0, 1),
      fadeOut: randomInRange(0, 1),
      gradient: randomInRange(0, 1),
      speed: 0.5,
      scale: randomInRange(0.7, 1.8),
      rotation: Math.floor(Math.random() * 360),
      offsetX: randomInRange(-0.3, 0.3),
      offsetY: randomInRange(-0.3, 0.3),
    }) satisfies ColorPanelsParams,
  swatches: (params) => {
    const p = params as ColorPanelsParams;
    return [...p.colors, "#ffffff", "#000000"];
  },
  controls: [
    { kind: "colorList", key: "colors", label: "Colors", max: 7 },
    { kind: "color", key: "colorBack", label: "Background" },
    {
      kind: "slider",
      key: "density",
      label: "Density",
      min: 0.25,
      max: 7,
      step: 0.05,
    },
    {
      kind: "slider",
      key: "angle1",
      label: "Skew 1",
      min: -1,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "angle2",
      label: "Skew 2",
      min: -1,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "length",
      label: "Length",
      min: 0,
      max: 3,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "blur",
      label: "Blur",
      min: 0,
      max: 0.5,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "fadeIn",
      label: "Fade in",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "fadeOut",
      label: "Fade out",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "gradient",
      label: "Gradient mix",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "scale",
      label: "Zoom",
      min: 0.1,
      max: 4,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "rotation",
      label: "Rotation",
      min: 0,
      max: 360,
      step: 1,
    },
    {
      kind: "slider",
      key: "offsetX",
      label: "Offset X",
      min: -1,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "offsetY",
      label: "Offset Y",
      min: -1,
      max: 1,
      step: 0.01,
    },
    { kind: "slider", key: "speed", label: "Speed", min: 0, max: 3, step: 0.1 },
    { kind: "toggle", key: "edges", label: "Edge highlights" },
  ],
  render: ({ params, content, webGlContextAttributes }) => (
    <FeaturedColorPanels
      {...(params as ColorPanelsParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
    />
  ),
};

// ───────────────────────── Grain gradient (generative) ─────────────────────────

type GrainGradientParams = {
  shape: "wave" | "dots" | "truchet" | "corners" | "ripple" | "blob" | "sphere";
  colors: string[];
  colorBack: string;
  softness: number;
  intensity: number;
  noise: number;
  speed: number;
};

const GRAIN_SHAPES = [
  "wave",
  "dots",
  "truchet",
  "corners",
  "ripple",
  "blob",
  "sphere",
] as const;

const GRAIN_PRESETS: Record<string, GrainGradientParams> = {
  Default: {
    shape: "corners",
    colors: ["#7300ff", "#eba8ff", "#00bfff", "#2a00ff"],
    colorBack: "#000000",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.25,
    speed: 1,
  },
  Wave: {
    shape: "wave",
    colors: ["#c4730b", "#bdad5f", "#d8ccc7"],
    colorBack: "#000a0f",
    softness: 0.7,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
  },
  Dots: {
    shape: "dots",
    colors: ["#6f0000", "#0080ff", "#f2ebc9", "#33cc33"],
    colorBack: "#0a0000",
    softness: 1,
    intensity: 1,
    noise: 0.7,
    speed: 1,
  },
  Truchet: {
    shape: "truchet",
    colors: ["#6f2200", "#eabb7c", "#39b523"],
    colorBack: "#0a0000",
    softness: 0,
    intensity: 0.2,
    noise: 1,
    speed: 1,
  },
  Ripple: {
    shape: "ripple",
    colors: ["#6f2d00", "#88ddae", "#2c0b1d"],
    colorBack: "#140a00",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.5,
    speed: 1,
  },
  Blob: {
    shape: "blob",
    colors: ["#3e6172", "#a49b74", "#568c50"],
    colorBack: "#0f0e18",
    softness: 0,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
  },
};

const grainGradient: FxEffect = {
  id: "featured-grain-gradient",
  label: "Grain gradient",
  takesImage: false,
  presetNames: Object.keys(GRAIN_PRESETS),
  defaultPreset: "Default",
  defaultTitleColor: "#ffffff",
  getPreset: (name) => GRAIN_PRESETS[name] as FxParams,
  randomParams: () =>
    ({
      shape: randomItem(GRAIN_SHAPES),
      colors: randomPalette(3 + Math.floor(Math.random() * 3)),
      colorBack: hslToHex(Math.random() * 360, 30, 4 + Math.random() * 10),
      softness: Math.random(),
      intensity: Math.random(),
      noise: randomInRange(0.1, 0.8),
      speed: 1,
    }) satisfies GrainGradientParams,
  swatches: (params) => {
    const p = params as GrainGradientParams;
    return [...p.colors, "#ffffff", "#000000"];
  },
  controls: [
    { kind: "choice", key: "shape", label: "Shape", options: GRAIN_SHAPES },
    { kind: "colorList", key: "colors", label: "Colors", max: 7 },
    { kind: "color", key: "colorBack", label: "Background" },
    {
      kind: "slider",
      key: "softness",
      label: "Softness",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "intensity",
      label: "Intensity",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "noise",
      label: "Grain",
      min: 0,
      max: 1,
      step: 0.01,
    },
    { kind: "slider", key: "speed", label: "Speed", min: 0, max: 3, step: 0.1 },
  ],
  render: ({ params, content, webGlContextAttributes }) => (
    <FeaturedGrainGradient
      {...(params as GrainGradientParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
    />
  ),
};

// ───────────────────────── Mesh gradient (generative) ─────────────────────────

type MeshGradientParams = {
  colors: string[];
  positions: number;
  waveX: number;
  waveXShift: number;
  waveY: number;
  waveYShift: number;
  mixing: number;
  grainMixer: number;
  grainOverlay: number;
  rotation: number;
};

const MESH_PRESETS: Record<string, MeshGradientParams> = {
  Default: {
    colors: ["#ffad0a", "#6200ff", "#e2a3ff", "#ff99fd"],
    positions: 2,
    waveX: 1,
    waveXShift: 0.6,
    waveY: 1,
    waveYShift: 0.21,
    mixing: 0.93,
    grainMixer: 0,
    grainOverlay: 0,
    rotation: 270,
  },
  "1960s": {
    colors: ["#000000", "#082400", "#b1aa91", "#8e8c15"],
    positions: 42,
    waveX: 0.45,
    waveXShift: 0,
    waveY: 1,
    waveYShift: 0,
    mixing: 0,
    grainMixer: 0.37,
    grainOverlay: 0.78,
    rotation: 0,
  },
  Sunset: {
    colors: ["#264653", "#9c2b2b", "#f4a261", "#ffffff"],
    positions: 0,
    waveX: 0.6,
    waveXShift: 0.7,
    waveY: 0.7,
    waveYShift: 0.7,
    mixing: 0.5,
    grainMixer: 0,
    grainOverlay: 0,
    rotation: 0,
  },
  Sea: {
    colors: ["#013b65", "#03738c", "#a3d3ff", "#f2faef"],
    positions: 0,
    waveX: 0.53,
    waveXShift: 0,
    waveY: 0.95,
    waveYShift: 0.64,
    mixing: 0.5,
    grainMixer: 0,
    grainOverlay: 0,
    rotation: 0,
  },
};

const meshGradient: FxEffect = {
  id: "featured-mesh-gradient",
  label: "Mesh gradient",
  takesImage: false,
  presetNames: Object.keys(MESH_PRESETS),
  defaultPreset: "Default",
  defaultTitleColor: "#ffffff",
  getPreset: (name) => MESH_PRESETS[name] as FxParams,
  randomParams: () =>
    ({
      colors: randomPalette(4),
      positions: Math.floor(Math.random() * 100),
      waveX: Math.random(),
      waveXShift: Math.random(),
      waveY: Math.random(),
      waveYShift: Math.random(),
      mixing: 0.3 + Math.random() * 0.7,
      grainMixer: Math.random() > 0.7 ? Math.random() * 0.5 : 0,
      grainOverlay: Math.random() > 0.6 ? Math.random() * 0.7 : 0,
      rotation: Math.floor(Math.random() * 360),
    }) satisfies MeshGradientParams,
  swatches: (params) => {
    const p = params as MeshGradientParams;
    return [...p.colors, "#ffffff", "#000000"];
  },
  controls: [
    { kind: "colorList", key: "colors", label: "Colors", max: 10 },
    {
      kind: "slider",
      key: "positions",
      label: "Spot seed",
      min: 0,
      max: 100,
      step: 1,
    },
    {
      kind: "slider",
      key: "waveX",
      label: "Wave X",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "waveXShift",
      label: "Wave X shift",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "waveY",
      label: "Wave Y",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "waveYShift",
      label: "Wave Y shift",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "mixing",
      label: "Mixing",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainMixer",
      label: "Grain mixer",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "grainOverlay",
      label: "Grain overlay",
      min: 0,
      max: 1,
      step: 0.01,
    },
    {
      kind: "slider",
      key: "rotation",
      label: "Rotation",
      min: 0,
      max: 360,
      step: 1,
    },
  ],
  render: ({ params, content, webGlContextAttributes }) => (
    <FeaturedMeshGradient
      {...(params as MeshGradientParams)}
      {...titleProps(content)}
      {...frameProps(webGlContextAttributes)}
    />
  ),
};

/**
 * Ordered effect list — image effects first, generative next. Keep the ids in
 * sync with `FEATURED_FX_IDS` in `lib/registry.ts` (kept separate so server
 * routes don't pull these client shader components into their bundle).
 */
export const FEATURED_FX_EFFECTS: FxEffect[] = [
  dithering,
  halftone,
  halftoneDots,
  flutedGlass,
  colorPanels,
  grainGradient,
  meshGradient,
];

export function getFxEffect(id: string): FxEffect {
  return FEATURED_FX_EFFECTS.find((e) => e.id === id) ?? FEATURED_FX_EFFECTS[0];
}
