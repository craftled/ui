"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { FeaturedFlutedGlass } from "./featured-fluted-glass"

type Params = {
  shape: "lines" | "linesIrregular" | "wave" | "zigzag" | "pattern"
  distortionShape: "prism" | "lens" | "contour" | "cascade" | "flat"
  size: number
  angle: number
  distortion: number
  shift: number
  stretch: number
  blur: number
  edges: number
  margin: number
  shadows: number
  highlights: number
  grainOverlay: number
  colorShadow: string
  colorHighlight: string
}

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
}

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80"

export default function FeaturedFlutedGlassDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedFlutedGlass image={IMAGE} title="Fluted glass" {...params} />

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
          label="Shape"
          value={params.shape}
          options={["lines", "linesIrregular", "wave", "zigzag", "pattern"]}
          onChange={(v) =>
            setParams({ ...params, shape: v as Params["shape"] })
          }
        />
        <SelectField
          label="Distortion shape"
          value={params.distortionShape}
          options={["prism", "lens", "contour", "cascade", "flat"]}
          onChange={(v) =>
            setParams({
              ...params,
              distortionShape: v as Params["distortionShape"],
            })
          }
        />

        <Slider
          label="Size"
          value={params.size}
          max={1}
          onChange={(v) => setParams({ ...params, size: v })}
        />
        <Slider
          label="Angle"
          value={params.angle}
          min={0}
          max={180}
          step={1}
          format={(v) => `${Math.round(v)}°`}
          onChange={(v) => setParams({ ...params, angle: v })}
        />
        <Slider
          label="Distortion"
          value={params.distortion}
          max={1}
          onChange={(v) => setParams({ ...params, distortion: v })}
        />
        <Slider
          label="Stretch"
          value={params.stretch}
          max={1}
          onChange={(v) => setParams({ ...params, stretch: v })}
        />
        <Slider
          label="Blur"
          value={params.blur}
          max={1}
          onChange={(v) => setParams({ ...params, blur: v })}
        />
        <Slider
          label="Edges"
          value={params.edges}
          max={1}
          onChange={(v) => setParams({ ...params, edges: v })}
        />
        <Slider
          label="Shadows"
          value={params.shadows}
          max={1}
          onChange={(v) => setParams({ ...params, shadows: v })}
        />
        <Slider
          label="Highlights"
          value={params.highlights}
          max={1}
          onChange={(v) => setParams({ ...params, highlights: v })}
        />

        <div className="mt-2 space-y-1.5">
          <ColorField
            label="Shadow"
            value={params.colorShadow}
            onChange={(v) => setParams({ ...params, colorShadow: v })}
          />
          <ColorField
            label="Highlight"
            value={params.colorHighlight}
            onChange={(v) => setParams({ ...params, colorHighlight: v })}
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
  format,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
  step?: number
  format?: (v: number) => string
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
