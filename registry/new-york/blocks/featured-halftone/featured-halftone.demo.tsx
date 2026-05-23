"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  hslToHex,
  randomBool,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import { FeaturedHalftone, type TitlePosition } from "./featured-halftone";

const TYPES = ["dots", "ink", "sharp"] as const;

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

function randomParams(prev: Params): Params {
  const palette = randomPalette(4, { minL: 35, maxL: 70 });
  return {
    type: randomItem(TYPES),
    size: randomInRange(0.08, 0.35),
    softness: randomInRange(0.2, 1),
    contrast: randomInRange(0.8, 1.5),
    grainMixer: randomInRange(0, 0.3),
    grainOverlay: randomInRange(0, 0.4),
    colorBack: randomBool(0.4)
      ? "#fbfaf4"
      : hslToHex(Math.random() * 360, 18, 88 + Math.random() * 8),
    colorC: palette[0],
    colorM: palette[1],
    colorY: palette[2],
    colorK: "#1a1a1a",
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
  };
}

type Params = {
  type: "dots" | "ink" | "sharp";
  size: number;
  softness: number;
  contrast: number;
  grainOverlay: number;
  grainMixer: number;
  colorBack: string;
  colorC: string;
  colorM: string;
  colorY: string;
  colorK: string;
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
};

const DEFAULT: Params = {
  type: "ink",
  size: 0.18,
  softness: 0.55,
  contrast: 1.1,
  grainOverlay: 0.25,
  grainMixer: 0.15,
  colorBack: "#f3ead8",
  colorC: "#1f6f97",
  colorM: "#d23a5a",
  colorY: "#e8a334",
  colorK: "#1a1a1a",
  titleText: "Autumn Vibes",
  titlePosition: "bottom-left",
  titleSize: 30,
};

const PRESETS: Record<string, Partial<Params>> = {
  Vintage: { ...DEFAULT },
  Newspaper: {
    type: "dots",
    colorBack: "#fbfaf4",
    colorC: "#1a1a1a",
    colorM: "#1a1a1a",
    colorY: "#1a1a1a",
    colorK: "#1a1a1a",
    size: 0.1,
    softness: 0.2,
    contrast: 1.5,
    grainOverlay: 0,
    grainMixer: 0,
  },
  Default: {
    type: "ink",
    colorBack: "#fbfaf4",
    colorC: "#00b2ff",
    colorM: "#fc4f9d",
    colorY: "#ffd900",
    colorK: "#231f20",
    size: 0.2,
    softness: 1,
    contrast: 1,
    grainOverlay: 0,
    grainMixer: 0,
  },
  Drops: {
    type: "ink",
    colorBack: "#0a0a0a",
    colorC: "#7be0ff",
    colorM: "#ff7ac6",
    colorY: "#ffe066",
    colorK: "#ffffff",
    size: 0.3,
    softness: 0.85,
    contrast: 1.1,
    grainOverlay: 0.4,
    grainMixer: 0.4,
  },
};

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=900&h=900&fit=crop&q=80";

export default function FeaturedHalftoneDemo() {
  const [params, setParams] = React.useState<Params>(DEFAULT);

  const applyPreset = (name: string) => {
    setParams({ ...DEFAULT, ...PRESETS[name] } as Params);
  };

  return (
    <>
      <FeaturedHalftone
        {...params}
        image={IMAGE}
        imageAlt="Citrus"
        title={params.titleText}
      />

      <ControlsRail>
        <div className="flex flex-col gap-3 text-foreground/80 text-xs">
          <div className="space-y-1.5">
            <div className="font-semibold text-foreground">Presets</div>
            <div className="grid grid-cols-2 gap-1.5">
              {Object.keys(PRESETS).map((name) => (
                <button
                  className="rounded-md border border-border px-2 py-1.5 transition-colors hover:bg-muted"
                  key={name}
                  onClick={() => applyPreset(name)}
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

          <TextControls
            onPositionChange={(v) => setParams({ ...params, titlePosition: v })}
            onSizeChange={(v) => setParams({ ...params, titleSize: v })}
            onTextChange={(v) => setParams({ ...params, titleText: v })}
            position={params.titlePosition}
            size={params.titleSize}
            text={params.titleText}
          />

          <SelectField
            label="Type"
            onChange={(v) =>
              setParams({ ...params, type: v as Params["type"] })
            }
            options={["dots", "ink", "sharp"]}
            value={params.type}
          />

          <Slider
            label="Size"
            max={1}
            onChange={(v) => setParams({ ...params, size: v })}
            value={params.size}
          />
          <Slider
            label="Softness"
            max={1}
            onChange={(v) => setParams({ ...params, softness: v })}
            value={params.softness}
          />
          <Slider
            label="Contrast"
            max={2}
            onChange={(v) => setParams({ ...params, contrast: v })}
            value={params.contrast}
          />
          <Slider
            label="Grain"
            max={1}
            onChange={(v) => setParams({ ...params, grainOverlay: v })}
            value={params.grainOverlay}
          />

          <div className="mt-2 space-y-1.5">
            <ColorField
              label="Back"
              onChange={(v) => setParams({ ...params, colorBack: v })}
              value={params.colorBack}
            />
            <ColorField
              label="C"
              onChange={(v) => setParams({ ...params, colorC: v })}
              value={params.colorC}
            />
            <ColorField
              label="M"
              onChange={(v) => setParams({ ...params, colorM: v })}
              value={params.colorM}
            />
            <ColorField
              label="Y"
              onChange={(v) => setParams({ ...params, colorY: v })}
              value={params.colorY}
            />
            <ColorField
              label="K"
              onChange={(v) => setParams({ ...params, colorK: v })}
              value={params.colorK}
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

function TextControls({
  text,
  position,
  size,
  onTextChange,
  onPositionChange,
  onSizeChange,
}: {
  text: string;
  position: TitlePosition;
  size: number;
  onTextChange: (v: string) => void;
  onPositionChange: (v: TitlePosition) => void;
  onSizeChange: (v: number) => void;
}) {
  return (
    <div className="space-y-1.5 border-border border-t pt-3">
      <div className="font-semibold text-foreground">Text</div>
      <input
        className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground text-xs outline-none transition-colors focus:border-foreground/40"
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Title text"
        type="text"
        value={text}
      />
      <div className="pt-1">
        <div className="mb-1 text-muted-foreground">Position</div>
        <div className="grid grid-cols-3 gap-1">
          {POSITION_GRID.map((pos) => (
            <button
              aria-label={`Position ${pos}`}
              aria-pressed={position === pos}
              className={cn(
                "flex aspect-square items-center justify-center rounded-md border transition-colors",
                position === pos
                  ? "border-foreground bg-foreground"
                  : "border-border hover:border-foreground/40"
              )}
              key={pos}
              onClick={() => onPositionChange(pos)}
              type="button"
            >
              <span
                className={cn(
                  "block size-1.5 rounded-full transition-colors",
                  position === pos ? "bg-background" : "bg-muted-foreground/40"
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
        onChange={onSizeChange}
        step={1}
        value={size}
      />
    </div>
  );
}
