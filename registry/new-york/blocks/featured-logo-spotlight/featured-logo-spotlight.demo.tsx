"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantPresets,
  VariantSection,
  VariantShuffle,
} from "@/components/variant-panel";
import { hslToHex, randomPalette } from "@/lib/random-palette";

import { FeaturedLogoSpotlight } from "./featured-logo-spotlight";

type Params = {
  colors: string[];
  positions: number;
  waveX: number;
  waveXShift: number;
  waveY: number;
  waveYShift: number;
  mixing: number;
  rotation: number;
  logoColor: string;
  haloPadding: number;
};

const PRESETS: Record<string, Params> = {
  Default: {
    colors: ["#0a0a0a", "#5e1de3", "#dc2626", "#1e3a8a"],
    positions: 50,
    waveX: 1,
    waveXShift: 0.3,
    waveY: 1,
    waveYShift: 0.5,
    mixing: 0.85,
    rotation: 30,
    logoColor: "#f43f5e",
    haloPadding: 16,
  },
  Sunset: {
    colors: ["#264653", "#9c2b2b", "#f4a261", "#ffffff"],
    positions: 0,
    waveX: 0.6,
    waveXShift: 0.7,
    waveY: 0.7,
    waveYShift: 0.7,
    mixing: 0.5,
    rotation: 0,
    logoColor: "#f59e0b",
    haloPadding: 16,
  },
  Sea: {
    colors: ["#013b65", "#03738c", "#a3d3ff", "#f2faef"],
    positions: 0,
    waveX: 0.53,
    waveXShift: 0,
    waveY: 0.95,
    waveYShift: 0.64,
    mixing: 0.5,
    rotation: 0,
    logoColor: "#0891b2",
    haloPadding: 16,
  },
  "1960s": {
    colors: ["#000000", "#082400", "#b1aa91", "#8e8c15"],
    positions: 42,
    waveX: 0.45,
    waveXShift: 0,
    waveY: 1,
    waveYShift: 0,
    mixing: 0,
    rotation: 0,
    logoColor: "#fbbf24",
    haloPadding: 16,
  },
};

function randomParams(): Params {
  return {
    colors: randomPalette(4),
    positions: Math.floor(Math.random() * 100),
    waveX: Math.random(),
    waveXShift: Math.random(),
    waveY: Math.random(),
    waveYShift: Math.random(),
    mixing: 0.3 + Math.random() * 0.7,
    rotation: Math.floor(Math.random() * 360),
    logoColor: hslToHex(
      Math.random() * 360,
      60 + Math.random() * 30,
      50 + Math.random() * 20
    ),
    haloPadding: 12 + Math.floor(Math.random() * 12),
  };
}

export default function FeaturedLogoSpotlightDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);

  return (
    <>
      <FeaturedLogoSpotlight
        colors={params.colors}
        eyebrow="In the spotlight"
        haloPadding={params.haloPadding}
        logo={
          <div
            className="flex size-full items-center justify-center font-bold text-4xl text-white"
            style={{ backgroundColor: params.logoColor }}
          >
            B
          </div>
        }
        mixing={params.mixing}
        positions={params.positions}
        rotation={params.rotation}
        title="Best Writing"
        waveX={params.waveX}
        waveXShift={params.waveXShift}
        waveY={params.waveY}
        waveYShift={params.waveYShift}
      />

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setParams(PRESETS[name])}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setParams(randomParams())} />
        </VariantSection>
      </ControlsRail>
    </>
  );
}
