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
import {
  hslToHex,
  randomBool,
  randomInRange,
  randomItem,
} from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import {
  FeaturedHalftoneDots,
  type TitlePosition,
} from "./featured-halftone-dots";

const TYPES = ["classic", "gooey", "holes", "soft"] as const;
const GRIDS = ["square", "hex"] as const;

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

type Params = {
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
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const TEXT_DEFAULTS = {
  titleText: "Halftone dots",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
  titleColor: "#1c1917",
};

const PRESETS: Record<string, Params> = {
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
  },
};

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80";

function randomParams(prev: Params): Params {
  return {
    type: randomItem(TYPES),
    grid: randomItem(GRIDS),
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
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedHalftoneDotsDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);
  const titleSwatches = useDemoAccentSwatches([
    params.colorFront,
    params.colorBack,
    "#ffffff",
    "#000000",
  ]);

  return (
    <>
      <FeaturedHalftoneDots
        {...params}
        image={IMAGE}
        title={params.titleText}
      />

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
