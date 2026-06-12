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
  randomPalette,
} from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import { FeaturedHalftone, type TitlePosition } from "./featured-halftone";

const TYPES = ["dots", "ink", "sharp"] as const;

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
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const DEFAULT: Params = {
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
  titleText: "Autumn Vibes",
  titlePosition: "bottom-left",
  titleSize: 30,
  titleColor: "#1c1917",
};

const PRESETS: Record<string, Partial<Params>> = {
  Vintage: { ...DEFAULT },
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

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=900&h=900&fit=crop&q=80";

function randomParams(prev: Params): Params {
  const palette = randomPalette(4, { minL: 35, maxL: 70 });
  return {
    type: randomItem(TYPES),
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
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedHalftoneDemo() {
  const [params, setParams] = React.useState<Params>(DEFAULT);
  const titleSwatches = useDemoAccentSwatches([
    params.colorC,
    params.colorM,
    params.colorY,
    params.colorK,
    params.colorBack,
    "#ffffff",
    "#000000",
  ]);

  const applyPreset = (name: string) => {
    setParams({ ...DEFAULT, ...PRESETS[name] } as Params);
  };

  return (
    <>
      <FeaturedHalftone
        {...params}
        image={IMAGE}
        imageAlt="Citrus"
        title={params.titleText}
      />

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => applyPreset(name)}
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
