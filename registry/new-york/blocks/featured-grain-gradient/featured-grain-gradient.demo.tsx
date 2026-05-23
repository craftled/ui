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
  type TitlePosition,
} from "./featured-grain-gradient";

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

const SHAPES = [
  "wave",
  "dots",
  "truchet",
  "corners",
  "ripple",
  "blob",
  "sphere",
] as const;

function randomParams(prev: Params): Params {
  return {
    shape: randomItem(SHAPES),
    colors: randomPalette(3 + Math.floor(Math.random() * 3)),
    colorBack: hslToHex(Math.random() * 360, 30, 4 + Math.random() * 10),
    softness: Math.random(),
    intensity: Math.random(),
    noise: randomInRange(0.1, 0.8),
    speed: 1,
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
    titleColor: prev.titleColor,
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
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
  titleColor: string;
};

const TEXT_DEFAULTS = {
  titleText: "Grain gradient",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
  titleColor: "#ffffff",
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
    ...TEXT_DEFAULTS,
  },
  Wave: {
    shape: "wave",
    colors: ["#c4730b", "#bdad5f", "#d8ccc7"],
    colorBack: "#000a0f",
    softness: 0.7,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Dots: {
    shape: "dots",
    colors: ["#6f0000", "#0080ff", "#f2ebc9", "#33cc33"],
    colorBack: "#0a0000",
    softness: 1,
    intensity: 1,
    noise: 0.7,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Truchet: {
    shape: "truchet",
    colors: ["#6f2200", "#eabb7c", "#39b523"],
    colorBack: "#0a0000",
    softness: 0,
    intensity: 0.2,
    noise: 1,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Ripple: {
    shape: "ripple",
    colors: ["#6f2d00", "#88ddae", "#2c0b1d"],
    colorBack: "#140a00",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.5,
    speed: 1,
    ...TEXT_DEFAULTS,
  },
  Blob: {
    shape: "blob",
    colors: ["#3e6172", "#a49b74", "#568c50"],
    colorBack: "#0f0e18",
    softness: 0,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
    ...TEXT_DEFAULTS,
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
      <FeaturedGrainGradient {...params} title={params.titleText} />

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

          <TextControls
            color={params.titleColor}
            onColorChange={(v) => setParams({ ...params, titleColor: v })}
            onPositionChange={(v) => setParams({ ...params, titlePosition: v })}
            onSizeChange={(v) => setParams({ ...params, titleSize: v })}
            onTextChange={(v) => setParams({ ...params, titleText: v })}
            position={params.titlePosition}
            size={params.titleSize}
            text={params.titleText}
          />

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
  color,
  onTextChange,
  onPositionChange,
  onSizeChange,
  onColorChange,
}: {
  text: string;
  position: TitlePosition;
  size: number;
  color: string;
  onTextChange: (v: string) => void;
  onPositionChange: (v: TitlePosition) => void;
  onSizeChange: (v: number) => void;
  onColorChange: (v: string) => void;
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
      <ColorField label="Color" onChange={onColorChange} value={color} />
    </div>
  );
}
