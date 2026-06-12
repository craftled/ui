"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantNote,
  VariantPresets,
  VariantSection,
  VariantShuffle,
} from "@/components/variant-panel";
import { randomInRange, randomItem } from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import {
  BackgroundPattern,
  type BackgroundPatternVariant,
} from "./background-pattern";

const VARIANTS: BackgroundPatternVariant[] = [
  "dots",
  "grid",
  "vertical-lines",
  "diagonal-lines",
  "vertical-lines-top",
  "vertical-lines-dome",
  "isometric",
];

type Params = {
  variant: BackgroundPatternVariant;
  size: number;
  strokeWidth: number;
  domeStrength: number;
  fade: boolean;
  patternColor: string;
  opacity: number;
  theme: "light" | "dark";
};

const PRESETS: Record<string, Params> = {
  Dots: {
    variant: "dots",
    size: 24,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: false,
    patternColor: "#000000",
    opacity: 0.12,
    theme: "light",
  },
  Grid: {
    variant: "grid",
    size: 32,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: false,
    patternColor: "#000000",
    opacity: 0.1,
    theme: "light",
  },
  "Vertical lines": {
    variant: "vertical-lines",
    size: 20,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: false,
    patternColor: "#000000",
    opacity: 0.08,
    theme: "light",
  },
  Diagonal: {
    variant: "diagonal-lines",
    size: 16,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: false,
    patternColor: "#000000",
    opacity: 0.1,
    theme: "light",
  },
  "Top dots": {
    variant: "vertical-lines-top",
    size: 20,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: false,
    patternColor: "#000000",
    opacity: 0.12,
    theme: "light",
  },
  Dome: {
    variant: "vertical-lines-dome",
    size: 20,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: false,
    patternColor: "#ffffff",
    opacity: 0.15,
    theme: "dark",
  },
  Isometric: {
    variant: "isometric",
    size: 24,
    strokeWidth: 1,
    domeStrength: 0.35,
    fade: true,
    patternColor: "#ffffff",
    opacity: 0.14,
    theme: "dark",
  },
};

function randomParams(): Params {
  const theme = randomItem(["light", "dark"] as const);
  return {
    variant: randomItem(VARIANTS),
    size: Math.round(randomInRange(12, 40)),
    strokeWidth: randomInRange(0.5, 2),
    domeStrength: randomInRange(0.15, 0.55),
    fade: Math.random() > 0.5,
    patternColor: theme === "dark" ? "#ffffff" : "#000000",
    opacity: randomInRange(0.06, 0.2),
    theme,
  };
}

export default function BackgroundPatternDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Dome);
  const isDark = params.theme === "dark";

  return (
    <>
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-2xl",
          isDark
            ? "bg-zinc-950 text-white"
            : "border bg-background text-foreground"
        )}
      >
        <div className="relative aspect-video min-h-[280px] w-full">
          <BackgroundPattern
            className="absolute inset-0"
            domeStrength={params.domeStrength}
            fade={params.fade}
            size={params.size}
            strokeWidth={params.strokeWidth}
            style={{ color: params.patternColor, opacity: params.opacity }}
            variant={params.variant}
          />
        </div>
        <div
          className={cn(
            "relative border-t px-4 py-3 text-xs",
            isDark ? "border-white/10 text-white/60" : "text-muted-foreground"
          )}
        >
          <span className="font-mono">{params.variant}</span>
          <span className="mx-2 opacity-40">·</span>
          <span>
            size {params.size}px · stroke {params.strokeWidth}px
            {params.variant === "vertical-lines-dome"
              ? ` · dome ${params.domeStrength.toFixed(2)}`
              : null}
          </span>
        </div>
      </div>

      <ControlsRail>
        <VariantSection title="Variants">
          <VariantPresets
            onSelect={(name) => setParams(PRESETS[name])}
            presets={Object.keys(PRESETS)}
          />
          <VariantShuffle onClick={() => setParams(randomParams())} />
          <VariantNote>
            Spacing, opacity, and color are baked into each preset. Adjust via
            props when you install the block.
          </VariantNote>
        </VariantSection>
      </ControlsRail>
    </>
  );
}
