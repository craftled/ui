"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantChoice,
  VariantContent,
  VariantPresets,
  VariantSection,
  VariantShuffle,
} from "@/components/variant-panel";
import { useDemoAccentSwatches } from "@/lib/demo-accent-swatches";
import {
  hslToHex,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import {
  FeaturedGrainGradient,
  type FeaturedGrainGradientProps,
  type TitlePosition,
} from "./featured-grain-gradient";

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
  "wave",
  "dots",
  "truchet",
  "corners",
  "ripple",
  "blob",
  "sphere",
] as const;

const OG_TITLE_SIZE_MAX = 28;

type Params = {
  shape: NonNullable<FeaturedGrainGradientProps["shape"]>;
  colors: string[];
  colorBack: string;
  softness: number;
  intensity: number;
  noise: number;
  speed: number;
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const TEXT_DEFAULTS = {
  titleText: "Grain gradient",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
  titleColor: "#ffffff",
};

const PRESETS: Record<string, Params> = {
  Default: {
    shape: "corners",
    colors: ["#7300ff", "#eba8ff", "#00bfff", "#2a00ff"],
    colorBack: "#000000",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.25,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Wave: {
    shape: "wave",
    colors: ["#c4730b", "#bdad5f", "#d8ccc7"],
    colorBack: "#000a0f",
    softness: 0.7,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Dots: {
    shape: "dots",
    colors: ["#6f0000", "#0080ff", "#f2ebc9", "#33cc33"],
    colorBack: "#0a0000",
    softness: 1,
    intensity: 1,
    noise: 0.7,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Truchet: {
    shape: "truchet",
    colors: ["#6f2200", "#eabb7c", "#39b523"],
    colorBack: "#0a0000",
    softness: 0,
    intensity: 0.2,
    noise: 1,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Ripple: {
    shape: "ripple",
    colors: ["#6f2d00", "#88ddae", "#2c0b1d"],
    colorBack: "#140a00",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.5,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Blob: {
    shape: "blob",
    colors: ["#3e6172", "#a49b74", "#568c50"],
    colorBack: "#0f0e18",
    softness: 0,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
};

function randomParams(prev: Params): Params {
  return {
    shape: randomItem(SHAPES),
    colors: randomPalette(3 + Math.floor(Math.random() * 3)),
    colorBack: hslToHex(Math.random() * 360, 30, 4 + Math.random() * 10),
    softness: Math.random(),
    intensity: Math.random(),
    noise: randomInRange(0.1, 0.8),
    speed: 1,
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedGrainGradientDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);
  const [aspectRatio, setAspectRatio] = React.useState<"16/9" | "1200/630">(
    "16/9"
  );
  const titleSwatches = useDemoAccentSwatches([
    ...params.colors,
    "#ffffff",
    "#000000",
  ]);

  return (
    <>
      <FeaturedGrainGradient
        {...params}
        aspectRatio={aspectRatio}
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

        <VariantSection title="Format">
          <VariantChoice
            label="Aspect ratio"
            onChange={(v) => {
              setAspectRatio(v);
              if (v === "1200/630") {
                setParams((prev) => ({
                  ...prev,
                  titleSize: Math.min(prev.titleSize, OG_TITLE_SIZE_MAX),
                }));
              }
            }}
            options={["16/9", "1200/630"] as const}
            value={aspectRatio}
          />
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
