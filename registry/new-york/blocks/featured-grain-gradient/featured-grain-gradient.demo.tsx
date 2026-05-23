"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  hslToHex,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import {
  FeaturedGrainGradient,
  type FeaturedGrainGradientProps,
} from "./featured-grain-gradient";

const SHAPES = [
  "wave",
  "dots",
  "truchet",
  "corners",
  "ripple",
  "blob",
  "sphere",
] as const;

function randomParams(): Params {
  return {
    shape: randomItem(SHAPES),
    colors: randomPalette(3 + Math.floor(Math.random() * 3)),
    colorBack: hslToHex(Math.random() * 360, 30, 4 + Math.random() * 10),
    softness: Math.random(),
    intensity: Math.random(),
    noise: randomInRange(0.1, 0.8),
    speed: 1,
  };
}

type Params = {
  shape: NonNullable<FeaturedGrainGradientProps["shape"]>;
  colors: string[];
  colorBack: string;
  softness: number;
  intensity: number;
  noise: number;
  speed: number;
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
  },
  Wave: {
    shape: "wave",
    colors: ["#c4730b", "#bdad5f", "#d8ccc7"],
    colorBack: "#000a0f",
    softness: 0.7,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
  },
  Dots: {
    shape: "dots",
    colors: ["#6f0000", "#0080ff", "#f2ebc9", "#33cc33"],
    colorBack: "#0a0000",
    softness: 1,
    intensity: 1,
    noise: 0.7,
    speed: 1,
  },
  Truchet: {
    shape: "truchet",
    colors: ["#6f2200", "#eabb7c", "#39b523"],
    colorBack: "#0a0000",
    softness: 0,
    intensity: 0.2,
    noise: 1,
    speed: 1,
  },
  Ripple: {
    shape: "ripple",
    colors: ["#6f2d00", "#88ddae", "#2c0b1d"],
    colorBack: "#140a00",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.5,
    speed: 1,
  },
  Blob: {
    shape: "blob",
    colors: ["#3e6172", "#a49b74", "#568c50"],
    colorBack: "#0f0e18",
    softness: 0,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
  },
};

export default function FeaturedGrainGradientDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors];
    next[idx] = value;
    setParams({ ...params, colors: next });
  };

  return (
    <>
      <FeaturedGrainGradient title="Grain gradient" {...params} />

      <ControlsRail>
        <div className="flex flex-col gap-3 text-foreground/80 text-xs">
          <div className="space-y-1.5">
            <div className="font-semibold text-foreground">Presets</div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.keys(PRESETS).map((name) => (
                <button
                  className="rounded-md border border-border px-2 py-1.5 transition-colors hover:bg-muted"
                  key={name}
                  onClick={() => setParams(PRESETS[name])}
                  type="button"
                >
                  {name}
                </button>
              ))}
            </div>
            <button
              className="mt-1 w-full rounded-md bg-foreground px-2 py-1.5 font-medium text-background transition-colors hover:bg-foreground/90"
              onClick={() => setParams(randomParams())}
              type="button"
            >
              🎲 Randomize
            </button>
          </div>

          <SelectField
            label="Shape"
            onChange={(v) =>
              setParams({ ...params, shape: v as Params["shape"] })
            }
            options={[
              "wave",
              "dots",
              "truchet",
              "corners",
              "ripple",
              "blob",
              "sphere",
            ]}
            value={params.shape}
          />

          <Slider
            label="Softness"
            max={1}
            onChange={(v) => setParams({ ...params, softness: v })}
            value={params.softness}
          />
          <Slider
            label="Intensity"
            max={1}
            onChange={(v) => setParams({ ...params, intensity: v })}
            value={params.intensity}
          />
          <Slider
            label="Noise"
            max={1}
            onChange={(v) => setParams({ ...params, noise: v })}
            value={params.noise}
          />
          <Slider
            label="Speed"
            max={3}
            onChange={(v) => setParams({ ...params, speed: v })}
            step={0.05}
            value={params.speed}
          />

          <div className="mt-2 space-y-1.5">
            <ColorField
              label="Back"
              onChange={(v) => setParams({ ...params, colorBack: v })}
              value={params.colorBack}
            />
            {params.colors.map((c, i) => (
              <ColorField
                key={i}
                label={`Color ${i + 1}`}
                onChange={(v) => setColor(i, v)}
                value={c}
              />
            ))}
          </div>
        </div>
      </ControlsRail>
    </>
  );
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value.toFixed(2)}</span>
      </div>
      <input
        className="h-1 w-full cursor-pointer accent-foreground"
        max={max}
        min={min}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        step={step}
        type="range"
        value={value}
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <select
        className={cn(
          "rounded-md border border-border bg-background px-2 py-1.5",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        className="size-7 cursor-pointer rounded border border-border bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
        onChange={(e) => onChange(e.target.value)}
        type="color"
        value={value}
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value}</span>
      </div>
    </label>
  );
}
