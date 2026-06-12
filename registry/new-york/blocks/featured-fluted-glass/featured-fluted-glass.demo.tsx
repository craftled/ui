"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantContent,
  VariantPresets,
  VariantSection,
  VariantShuffle,
} from "@/components/variant-panel";
import { useDemoAccentSwatches } from "@/lib/demo-accent-swatches";
import { randomInRange, randomItem } from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import {
  FeaturedFlutedGlass,
  type TitlePosition,
} from "./featured-fluted-glass";

const POSITION_GRID: TitlePosition[] = [
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

const SHAPES = [
  "lines",
  "linesIrregular",
  "wave",
  "zigzag",
  "pattern",
] as const;
const DISTORTION_SHAPES = [
  "prism",
  "lens",
  "contour",
  "cascade",
  "flat",
] as const;

type Params = {
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
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const TEXT_DEFAULTS = {
  titleText: "Fluted glass",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
  titleColor: "#ffffff",
};

const PRESETS: Record<string, Params> = {
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
  },
};

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80";

function randomParams(prev: Params): Params {
  return {
    shape: randomItem(SHAPES),
    distortionShape: randomItem(DISTORTION_SHAPES),
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
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedFlutedGlassDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);
  const titleSwatches = useDemoAccentSwatches([
    params.colorHighlight,
    params.colorShadow,
    "#ffffff",
    "#000000",
  ]);

  return (
    <>
      <FeaturedFlutedGlass {...params} image={IMAGE} title={params.titleText} />

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setParams(PRESETS[name])}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setParams(randomParams(params))} />
        </VariantSection>

        <VariantContent
          accentSwatches={titleSwatches}
          color={params.titleColor}
          onColorChange={(v) => setParams({ ...params, titleColor: v })}
          onPositionChange={(v) => setParams({ ...params, titlePosition: v })}
          onSizeTierChange={(t) =>
            setParams({ ...params, titleSize: TITLE_SIZE_PX[t] })
          }
          onTextChange={(v) => setParams({ ...params, titleText: v })}
          position={params.titlePosition}
          positions={POSITION_GRID}
          sizeTier={titleSizeTierFromPx(params.titleSize)}
          text={params.titleText}
        />
      </ControlsRail>
    </>
  );
}
