"use client";

import * as React from "react";

import { ControlsRail } from "@/components/controls-rail";
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
            label="Variant"
            onChange={(v) =>
              setParams({
                ...params,
                variant: v as BackgroundPatternVariant,
              })
            }
            options={VARIANTS}
            value={params.variant}
          />

          <SelectField
            label="Panel theme"
            onChange={(v) =>
              setParams({
                ...params,
                theme: v as Params["theme"],
                patternColor: v === "dark" ? "#ffffff" : "#000000",
              })
            }
            options={["light", "dark"]}
            value={params.theme}
          />

          <Slider
            format={(v) => `${Math.round(v)}px`}
            label="Size"
            max={48}
            min={8}
            onChange={(v) => setParams({ ...params, size: v })}
            step={1}
            value={params.size}
          />

          <Slider
            format={(v) => v.toFixed(1)}
            label="Stroke"
            max={3}
            min={0.5}
            onChange={(v) => setParams({ ...params, strokeWidth: v })}
            step={0.5}
            value={params.strokeWidth}
          />

          {params.variant === "vertical-lines-dome" ? (
            <Slider
              label="Dome strength"
              max={0.8}
              min={0.05}
              onChange={(v) => setParams({ ...params, domeStrength: v })}
              value={params.domeStrength}
            />
          ) : null}

          <Slider
            format={(v) => `${Math.round(v * 100)}%`}
            label="Opacity"
            max={0.4}
            min={0.02}
            onChange={(v) => setParams({ ...params, opacity: v })}
            step={0.01}
            value={params.opacity}
          />

          <ColorField
            label="Pattern color"
            onChange={(v) => setParams({ ...params, patternColor: v })}
            value={params.patternColor}
          />

          <Toggle
            label="Edge fade"
            onChange={(v) => setParams({ ...params, fade: v })}
            value={params.fade}
          />
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
