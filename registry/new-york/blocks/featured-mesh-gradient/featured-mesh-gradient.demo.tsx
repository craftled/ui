"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import { randomPalette } from "@/lib/random-palette";
import { cn } from "@/lib/utils";

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
    // Keep user's typed title; cycle position + size for variety.
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

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors];
    next[idx] = value;
    setParams({ ...params, colors: next });
  };

  return (
    <>
      <FeaturedMeshGradient {...params} title={params.titleText} />

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
              onClick={() => setParams(randomParams(params))}
              type="button"
            >
              🎲 Randomize
            </button>
          </div>

          <div className="space-y-1.5 border-border border-t pt-3">
            <div className="font-semibold text-foreground">Text</div>
            <input
              className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground text-xs outline-none transition-colors focus:border-foreground/40"
              onChange={(e) =>
                setParams({ ...params, titleText: e.target.value })
              }
              placeholder="Title text"
              type="text"
              value={params.titleText}
            />

            <div className="pt-1">
              <div className="mb-1 text-muted-foreground">Position</div>
              <div className="grid grid-cols-3 gap-1">
                {POSITION_GRID.map((pos) => (
                  <button
                    aria-label={`Position ${pos}`}
                    aria-pressed={params.titlePosition === pos}
                    className={cn(
                      "flex aspect-square items-center justify-center rounded-md border transition-colors",
                      params.titlePosition === pos
                        ? "border-foreground bg-foreground"
                        : "border-border hover:border-foreground/40"
                    )}
                    key={pos}
                    onClick={() => setParams({ ...params, titlePosition: pos })}
                    type="button"
                  >
                    <span
                      className={cn(
                        "block size-1.5 rounded-full transition-colors",
                        params.titlePosition === pos
                          ? "bg-background"
                          : "bg-muted-foreground/40"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Slider
              format={(v) => `${Math.round(v)}px`}
              label="Size"
              max={80}
              min={12}
              onChange={(v) => setParams({ ...params, titleSize: v })}
              step={1}
              value={params.titleSize}
            />

            <ColorField
              label="Color"
              onChange={(v) => setParams({ ...params, titleColor: v })}
              value={params.titleColor}
            />
          </div>

          <Slider
            format={(v) => String(Math.round(v))}
            label="Positions"
            max={100}
            min={0}
            onChange={(v) => setParams({ ...params, positions: v })}
            step={1}
            value={params.positions}
          />
          <Slider
            label="Wave X"
            max={1}
            onChange={(v) => setParams({ ...params, waveX: v })}
            value={params.waveX}
          />
          <Slider
            label="Wave X shift"
            max={1}
            onChange={(v) => setParams({ ...params, waveXShift: v })}
            value={params.waveXShift}
          />
          <Slider
            label="Wave Y"
            max={1}
            onChange={(v) => setParams({ ...params, waveY: v })}
            value={params.waveY}
          />
          <Slider
            label="Wave Y shift"
            max={1}
            onChange={(v) => setParams({ ...params, waveYShift: v })}
            value={params.waveYShift}
          />
          <Slider
            label="Mixing"
            max={1}
            onChange={(v) => setParams({ ...params, mixing: v })}
            value={params.mixing}
          />
          <Slider
            label="Grain mixer"
            max={1}
            onChange={(v) => setParams({ ...params, grainMixer: v })}
            value={params.grainMixer}
          />
          <Slider
            label="Grain overlay"
            max={1}
            onChange={(v) => setParams({ ...params, grainOverlay: v })}
            value={params.grainOverlay}
          />
          <Slider
            format={(v) => `${Math.round(v)}°`}
            label="Rotation"
            max={360}
            min={0}
            onChange={(v) => setParams({ ...params, rotation: v })}
            step={1}
            value={params.rotation}
          />

          <div className="mt-2 space-y-1.5">
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
        className={cn(
          "size-7 cursor-pointer rounded border border-border bg-transparent p-0",
          "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
        )}
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
