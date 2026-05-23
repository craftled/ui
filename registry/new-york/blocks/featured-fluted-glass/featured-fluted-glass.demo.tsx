"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import { randomInRange, randomItem } from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import { FeaturedFlutedGlass } from "./featured-fluted-glass";

const SHAPES = [
  "lines",
  "linesIrregular",
  "wave",
  "zigzag",
  "pattern",
] as const;
const DISTORTION_SHAPES = [
  "prism",
  "lens",
  "contour",
  "cascade",
  "flat",
] as const;

function randomParams(): Params {
  return {
    shape: randomItem(SHAPES),
    distortionShape: randomItem(DISTORTION_SHAPES),
    size: randomInRange(0.3, 0.9),
    angle: Math.random() * 180,
    distortion: randomInRange(0.3, 1),
    shift: randomInRange(-0.5, 0.5),
    stretch: Math.random(),
    blur: randomInRange(0, 0.4),
    edges: randomInRange(0.1, 0.7),
    margin: 0,
    shadows: randomInRange(0, 0.5),
    highlights: randomInRange(0, 0.3),
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  };
}

type Params = {
  shape: "lines" | "linesIrregular" | "wave" | "zigzag" | "pattern";
  distortionShape: "prism" | "lens" | "contour" | "cascade" | "flat";
  size: number;
  angle: number;
  distortion: number;
  shift: number;
  stretch: number;
  blur: number;
  edges: number;
  margin: number;
  shadows: number;
  highlights: number;
  grainOverlay: number;
  colorShadow: string;
  colorHighlight: string;
};

const PRESETS: Record<string, Params> = {
  Default: {
    shape: "lines",
    distortionShape: "prism",
    size: 0.5,
    angle: 0,
    distortion: 0.5,
    shift: 0,
    stretch: 0,
    blur: 0,
    edges: 0.25,
    margin: 0,
    shadows: 0.25,
    highlights: 0.1,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
  Abstract: {
    shape: "linesIrregular",
    distortionShape: "flat",
    size: 0.7,
    angle: 30,
    distortion: 1,
    shift: 0,
    stretch: 1,
    blur: 1,
    edges: 0.5,
    margin: 0,
    shadows: 0,
    highlights: 0,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
  Waves: {
    shape: "wave",
    distortionShape: "contour",
    size: 0.9,
    angle: 0,
    distortion: 0.5,
    shift: 0,
    stretch: 1,
    blur: 0.1,
    edges: 0.5,
    margin: 0,
    shadows: 0,
    highlights: 0,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
  Folds: {
    shape: "lines",
    distortionShape: "cascade",
    size: 0.4,
    angle: 0,
    distortion: 0.75,
    shift: 0,
    stretch: 0,
    blur: 0.25,
    edges: 0.5,
    margin: 0.1,
    shadows: 0.4,
    highlights: 0,
    grainOverlay: 0,
    colorShadow: "#000000",
    colorHighlight: "#ffffff",
  },
};

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80";

export default function FeaturedFlutedGlassDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);

  return (
    <>
      <FeaturedFlutedGlass image={IMAGE} title="Fluted glass" {...params} />

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
            options={["lines", "linesIrregular", "wave", "zigzag", "pattern"]}
            value={params.shape}
          />
          <SelectField
            label="Distortion shape"
            onChange={(v) =>
              setParams({
                ...params,
                distortionShape: v as Params["distortionShape"],
              })
            }
            options={["prism", "lens", "contour", "cascade", "flat"]}
            value={params.distortionShape}
          />

          <Slider
            label="Size"
            max={1}
            onChange={(v) => setParams({ ...params, size: v })}
            value={params.size}
          />
          <Slider
            format={(v) => `${Math.round(v)}°`}
            label="Angle"
            max={180}
            min={0}
            onChange={(v) => setParams({ ...params, angle: v })}
            step={1}
            value={params.angle}
          />
          <Slider
            label="Distortion"
            max={1}
            onChange={(v) => setParams({ ...params, distortion: v })}
            value={params.distortion}
          />
          <Slider
            label="Stretch"
            max={1}
            onChange={(v) => setParams({ ...params, stretch: v })}
            value={params.stretch}
          />
          <Slider
            label="Blur"
            max={1}
            onChange={(v) => setParams({ ...params, blur: v })}
            value={params.blur}
          />
          <Slider
            label="Edges"
            max={1}
            onChange={(v) => setParams({ ...params, edges: v })}
            value={params.edges}
          />
          <Slider
            label="Shadows"
            max={1}
            onChange={(v) => setParams({ ...params, shadows: v })}
            value={params.shadows}
          />
          <Slider
            label="Highlights"
            max={1}
            onChange={(v) => setParams({ ...params, highlights: v })}
            value={params.highlights}
          />

          <div className="mt-2 space-y-1.5">
            <ColorField
              label="Shadow"
              onChange={(v) => setParams({ ...params, colorShadow: v })}
              value={params.colorShadow}
            />
            <ColorField
              label="Highlight"
              onChange={(v) => setParams({ ...params, colorHighlight: v })}
              value={params.colorHighlight}
            />
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
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (v: number) => string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">
          {format ? format(value) : value.toFixed(2)}
        </span>
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
