"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { FeaturedHalftoneDots } from "./featured-halftone-dots"

type Params = {
  type: "classic" | "gooey" | "holes" | "soft"
  grid: "square" | "hex"
  size: number
  radius: number
  contrast: number
  grainMixer: number
  grainOverlay: number
  grainSize: number
  colorBack: string
  colorFront: string
  originalColors: boolean
  inverted: boolean
}

const PRESETS: Record<string, Params> = {
  Default: {
    type: "gooey",
    grid: "hex",
    size: 0.5,
    radius: 1.25,
    contrast: 0.4,
    grainMixer: 0.2,
    grainOverlay: 0.2,
    grainSize: 0.5,
    colorBack: "#f2f1e8",
    colorFront: "#2b2b2b",
    originalColors: false,
    inverted: false,
  },
  "LED screen": {
    type: "soft",
    grid: "square",
    size: 0.5,
    radius: 1.5,
    contrast: 0.3,
    grainMixer: 0,
    grainOverlay: 0,
    grainSize: 0.5,
    colorBack: "#000000",
    colorFront: "#29ff7b",
    originalColors: false,
    inverted: false,
  },
  Mosaic: {
    type: "classic",
    grid: "hex",
    size: 0.6,
    radius: 2,
    contrast: 0.01,
    grainMixer: 0,
    grainOverlay: 0,
    grainSize: 0.5,
    colorBack: "#000000",
    colorFront: "#b2aeae",
    originalColors: true,
    inverted: false,
  },
  "Round and square": {
    type: "holes",
    grid: "square",
    size: 0.8,
    radius: 1,
    contrast: 1,
    grainMixer: 0.05,
    grainOverlay: 0.3,
    grainSize: 0.5,
    colorBack: "#141414",
    colorFront: "#ff8000",
    originalColors: false,
    inverted: true,
  },
}

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80"

export default function FeaturedHalftoneDotsDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedHalftoneDots
        image={IMAGE}
        title="Halftone dots"
        {...params}
      />

      <div className="text-foreground/80 flex flex-col gap-3 text-xs">
        <div className="space-y-1.5">
          <div className="text-foreground font-semibold">Presets</div>
          <div className="grid grid-cols-2 gap-1.5">
            {Object.keys(PRESETS).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setParams(PRESETS[name])}
                className="border-border hover:bg-muted rounded-md border px-2 py-1.5 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <SelectField
          label="Type"
          value={params.type}
          options={["classic", "gooey", "holes", "soft"]}
          onChange={(v) =>
            setParams({ ...params, type: v as Params["type"] })
          }
        />
        <SelectField
          label="Grid"
          value={params.grid}
          options={["square", "hex"]}
          onChange={(v) =>
            setParams({ ...params, grid: v as Params["grid"] })
          }
        />

        <Slider
          label="Size"
          value={params.size}
          max={1}
          onChange={(v) => setParams({ ...params, size: v })}
        />
        <Slider
          label="Radius"
          value={params.radius}
          max={2}
          onChange={(v) => setParams({ ...params, radius: v })}
        />
        <Slider
          label="Contrast"
          value={params.contrast}
          max={1}
          onChange={(v) => setParams({ ...params, contrast: v })}
        />
        <Slider
          label="Grain"
          value={params.grainOverlay}
          max={1}
          onChange={(v) => setParams({ ...params, grainOverlay: v })}
        />

        <Toggle
          label="Original colors"
          value={params.originalColors}
          onChange={(v) => setParams({ ...params, originalColors: v })}
        />
        <Toggle
          label="Inverted"
          value={params.inverted}
          onChange={(v) => setParams({ ...params, inverted: v })}
        />

        <div className="mt-2 space-y-1.5">
          <ColorField
            label="Back"
            value={params.colorBack}
            onChange={(v) => setParams({ ...params, colorBack: v })}
          />
          <ColorField
            label="Front"
            value={params.colorFront}
            onChange={(v) => setParams({ ...params, colorFront: v })}
          />
        </div>
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0.01,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
}) {
  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="accent-foreground h-1 w-full cursor-pointer"
      />
    </label>
  )
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "border-border bg-background rounded-md border px-2 py-1.5",
          "focus:ring-ring focus:ring-2 focus:outline-none"
        )}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </label>
  )
}

function Toggle({
  label,
  value,
  onChange,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-foreground size-4 cursor-pointer"
      />
    </label>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border-border size-7 cursor-pointer rounded border bg-transparent p-0 [&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value}</span>
      </div>
    </label>
  )
}
