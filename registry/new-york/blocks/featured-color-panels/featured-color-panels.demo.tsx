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
  randomPalette,
} from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import {
  FeaturedColorPanels,
  type TitlePosition,
} from "./featured-color-panels";

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
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const TEXT_DEFAULTS = {
  titleText: "Color panels",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
  titleColor: "#ffffff",
};

const PRESETS: Record<string, Params> = {
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
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
    ...TEXT_DEFAULTS,
  },
};

function randomParams(prev: Params): Params {
  return {
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
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedColorPanelsDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);
  const titleSwatches = useDemoAccentSwatches([
    ...params.colors,
    "#ffffff",
    "#000000",
  ]);

  return (
    <>
      <FeaturedColorPanels {...params} title={params.titleText} />

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
