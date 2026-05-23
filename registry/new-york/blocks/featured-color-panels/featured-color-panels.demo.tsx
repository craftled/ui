"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  hslToHex,
  randomBool,
  randomInRange,
  randomPalette,
} from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import { FeaturedColorPanels } from "./featured-color-panels";

function randomParams(): Params {
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
  };
}

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
  },
};

export default function FeaturedColorPanelsDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors];
    next[idx] = value;
    setParams({ ...params, colors: next });
  };

  return (
    <>
      <FeaturedColorPanels title="Color panels" {...params} />

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

          <Slider
            label="Density"
            max={7}
            min={0.25}
            onChange={(v) => setParams({ ...params, density: v })}
            step={0.05}
            value={params.density}
          />
          <Slider
            label="Angle 1"
            max={1}
            min={-1}
            onChange={(v) => setParams({ ...params, angle1: v })}
            step={0.01}
            value={params.angle1}
          />
          <Slider
            label="Angle 2"
            max={1}
            min={-1}
            onChange={(v) => setParams({ ...params, angle2: v })}
            step={0.01}
            value={params.angle2}
          />
          <Slider
            label="Length"
            max={3}
            onChange={(v) => setParams({ ...params, length: v })}
            step={0.01}
            value={params.length}
          />
          <Slider
            label="Blur"
            max={0.5}
            onChange={(v) => setParams({ ...params, blur: v })}
            value={params.blur}
          />
          <Slider
            label="Fade in"
            max={1}
            onChange={(v) => setParams({ ...params, fadeIn: v })}
            value={params.fadeIn}
          />
          <Slider
            label="Fade out"
            max={1}
            onChange={(v) => setParams({ ...params, fadeOut: v })}
            value={params.fadeOut}
          />
          <Slider
            label="Gradient"
            max={1}
            onChange={(v) => setParams({ ...params, gradient: v })}
            value={params.gradient}
          />
          <Slider
            label="Speed"
            max={3}
            onChange={(v) => setParams({ ...params, speed: v })}
            step={0.05}
            value={params.speed}
          />

          <Toggle
            label="Edges"
            onChange={(v) => setParams({ ...params, edges: v })}
            value={params.edges}
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

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <input
        checked={value}
        className="size-4 cursor-pointer accent-foreground"
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
      />
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
  // color inputs don't accept alpha — render swatch with bg-checker for transparency hint
  const isTransparent = value === "#ffffff00" || value === "#00000000";
  return (
    <label className="flex items-center gap-2">
      <input
        className={cn(
          "size-7 cursor-pointer rounded border border-border bg-transparent p-0",
          "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
        )}
        onChange={(e) => onChange(e.target.value)}
        type="color"
        value={isTransparent ? "#ffffff" : value}
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value}</span>
      </div>
    </label>
  );
}
