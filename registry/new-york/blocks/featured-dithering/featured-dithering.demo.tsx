"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
import {
  randomBool,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette";
import { cn } from "@/lib/utils";

import { FeaturedDithering, type TitlePosition } from "./featured-dithering";

const TYPES = ["random", "2x2", "4x4", "8x8"] as const;

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
  const palette = randomPalette(3, { spreadMin: 80, spreadMax: 200 });
  return {
    type: randomItem(TYPES),
    size: randomInRange(0.5, 5),
    colorSteps: 1 + Math.floor(Math.random() * 6),
    colorBack: palette[0],
    colorFront: palette[1],
    colorHighlight: palette[2],
    originalColors: randomBool(0.2),
    inverted: randomBool(0.2),
    titleText: prev.titleText,
    titlePosition:
      POSITION_GRID[Math.floor(Math.random() * POSITION_GRID.length)] ??
      "bottom-left",
    titleSize: 24 + Math.floor(Math.random() * 40),
  };
}

type Params = {
  type: "random" | "2x2" | "4x4" | "8x8";
  size: number;
  colorSteps: number;
  colorBack: string;
  colorFront: string;
  colorHighlight: string;
  originalColors: boolean;
  inverted: boolean;
  titleText: string;
  titlePosition: TitlePosition;
  titleSize: number;
};

const TEXT_DEFAULTS = {
  titleText: "Image dithering",
  titlePosition: "bottom-left" as TitlePosition,
  titleSize: 30,
};

const PRESETS: Record<string, Params> = {
  Default: {
    type: "8x8",
    size: 2,
    colorSteps: 2,
    colorBack: "#000c38",
    colorFront: "#94ffaf",
    colorHighlight: "#eaff94",
    originalColors: false,
    inverted: false,
    ...TEXT_DEFAULTS,
  },
  Noise: {
    type: "random",
    size: 1,
    colorSteps: 1,
    colorBack: "#000000",
    colorFront: "#a2997c",
    colorHighlight: "#ededed",
    originalColors: false,
    inverted: false,
    ...TEXT_DEFAULTS,
  },
  Retro: {
    type: "2x2",
    size: 3,
    colorSteps: 1,
    colorBack: "#5452ff",
    colorFront: "#eeeeee",
    colorHighlight: "#eeeeee",
    originalColors: false,
    inverted: false,
    ...TEXT_DEFAULTS,
  },
  Natural: {
    type: "8x8",
    size: 2,
    colorSteps: 5,
    colorBack: "#000000",
    colorFront: "#ffffff",
    colorHighlight: "#ffffff",
    originalColors: true,
    inverted: false,
    ...TEXT_DEFAULTS,
  },
};

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80";

export default function FeaturedDitheringDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default);

  return (
    <>
      <FeaturedDithering {...params} image={IMAGE} title={params.titleText} />

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
            options={["random", "2x2", "4x4", "8x8"]}
            value={params.type}
          />

          <Slider
            format={(v) => v.toFixed(1)}
            label="Size"
            max={20}
            min={0.5}
            onChange={(v) => setParams({ ...params, size: v })}
            step={0.5}
            value={params.size}
          />
          <Slider
            format={(v) => String(Math.round(v))}
            label="Color steps"
            max={7}
            min={1}
            onChange={(v) => setParams({ ...params, colorSteps: v })}
            step={1}
            value={params.colorSteps}
          />

          <Toggle
            label="Original colors"
            onChange={(v) => setParams({ ...params, originalColors: v })}
            value={params.originalColors}
          />
          <Toggle
            label="Inverted"
            onChange={(v) => setParams({ ...params, inverted: v })}
            value={params.inverted}
          />

          <div className="mt-2 space-y-1.5">
            <ColorField
              label="Back"
              onChange={(v) => setParams({ ...params, colorBack: v })}
              value={params.colorBack}
            />
            <ColorField
              label="Front"
              onChange={(v) => setParams({ ...params, colorFront: v })}
              value={params.colorFront}
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
