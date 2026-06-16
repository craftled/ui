"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  VariantChoice,
  VariantColor,
  VariantPresets,
  VariantSection,
  VariantSelect,
  VariantShuffle,
  VariantSlider,
  VariantToggle,
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

const VARIANT_OPTIONS: { value: BackgroundPatternVariant; label: string }[] = [
  { value: "dots", label: "Dots" },
  { value: "grid", label: "Grid" },
  { value: "vertical-lines", label: "Vertical" },
  { value: "diagonal-lines", label: "Diagonal" },
  { value: "vertical-lines-top", label: "Top dots" },
  { value: "vertical-lines-dome", label: "Dome" },
  { value: "isometric", label: "Isometric" },
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

  const set = <K extends keyof Params>(key: K, value: Params[K]) =>
    setParams((p) => ({ ...p, [key]: value }));

  // Switching surface flips the pattern color to a legible default; the color
  // control can still override it afterward.
  const setTheme = (theme: "light" | "dark") =>
    setParams((p) => ({
      ...p,
      theme,
      patternColor: theme === "dark" ? "#ffffff" : "#000000",
    }));

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
        </VariantSection>

        <VariantSection title="Pattern">
          <VariantSelect
            columns={2}
            label="Style"
            onChange={(v) => set("variant", v)}
            options={VARIANT_OPTIONS}
            value={params.variant}
          />
          <VariantChoice
            label="Surface"
            onChange={setTheme}
            options={["light", "dark"] as const}
            value={params.theme}
          />
          <VariantSlider
            label="Spacing"
            max={64}
            min={8}
            onChange={(v) => set("size", v)}
            step={1}
            value={params.size}
          />
          <VariantSlider
            label="Stroke width"
            max={4}
            min={0.5}
            onChange={(v) => set("strokeWidth", v)}
            step={0.25}
            value={params.strokeWidth}
          />
          <VariantSlider
            label="Opacity"
            max={1}
            min={0}
            onChange={(v) => set("opacity", v)}
            step={0.01}
            value={params.opacity}
          />
          {params.variant === "vertical-lines-dome" ? (
            <VariantSlider
              label="Dome strength"
              max={1}
              min={0}
              onChange={(v) => set("domeStrength", v)}
              step={0.01}
              value={params.domeStrength}
            />
          ) : null}
          <VariantColor
            label="Pattern color"
            onChange={(v) => set("patternColor", v)}
            value={params.patternColor}
          />
          <VariantToggle
            label="Fade edges"
            onChange={(v) => set("fade", v)}
            value={params.fade}
          />
        </VariantSection>
      </ControlsRail>
    </>
  );
}
