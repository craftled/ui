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
  randomBool,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import { FeaturedDithering, type TitlePosition } from "./featured-dithering";

const TYPES = ["random", "2x2", "4x4", "8x8"] as const;

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
  type: "random" | "2x2" | "4x4" | "8x8";
  size: number;
  colorSteps: number;
  colorBack: string;
  colorFront: string;
  colorHighlight: string;
  originalColors: boolean;
  inverted: boolean;
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const TEXT_DEFAULTS = {
  titleText: "Image dithering",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
  titleColor: "#ffffff",
};

const PRESETS: Record<string, Params> = {
  Default: {
    type: "8x8",
    size: 2,
    colorSteps: 2,
    colorBack: "#000c38",
    colorFront: "#94ffaf",
    colorHighlight: "#eaff94",
    originalColors: false,
    inverted: false,
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
  },
};

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80";

function randomParams(prev: Params): Params {
  const palette = randomPalette(3, { spreadMin: 80, spreadMax: 200 });
  return {
    type: randomItem(TYPES),
    size: randomInRange(0.5, 5),
    colorSteps: 1 + Math.floor(Math.random() * 6),
    colorBack: palette[0],
    colorFront: palette[1],
    colorHighlight: palette[2],
    originalColors: randomBool(0.2),
    inverted: randomBool(0.2),
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedDitheringDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);
  const titleSwatches = useDemoAccentSwatches([
    params.colorFront,
    params.colorHighlight,
    params.colorBack,
    "#ffffff",
    "#000000",
  ]);

  return (
    <>
      <FeaturedDithering {...params} image={IMAGE} title={params.titleText} />

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
