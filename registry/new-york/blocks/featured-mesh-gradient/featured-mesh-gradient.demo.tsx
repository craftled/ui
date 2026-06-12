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
import { randomPalette } from "@/lib/random-palette";
import { TITLE_SIZE_PX, titleSizeTierFromPx } from "@/lib/variant-tiers";

import {
  FeaturedMeshGradient,
  type TitlePosition,
} from "./featured-mesh-gradient";

type Params = {
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
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

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

const PRESETS: Record<string, Params> = {
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
    titleText: "Mesh gradient",
    titlePosition: "bottom-left",
    titleSize: 30,
    titleColor: "#ffffff",
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
    titleText: "Editorial",
    titlePosition: "center",
    titleSize: 56,
    titleColor: "#f5f5f4",
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
    titleText: "Golden hour",
    titlePosition: "bottom-left",
    titleSize: 36,
    titleColor: "#ffffff",
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
    titleText: "Pacific",
    titlePosition: "top-right",
    titleSize: 32,
    titleColor: "#ffffff",
  },
};

function randomParams(prev: Params): Params {
  return {
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
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
  };
}

export default function FeaturedMeshGradientDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);
  const titleSwatches = useDemoAccentSwatches([
    ...params.colors,
    "#ffffff",
    "#000000",
  ]);

  return (
    <>
      <FeaturedMeshGradient {...params} title={params.titleText} />

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
