"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { FeaturedDithering } from "./featured-dithering"

type Params = {
  type: "random" | "2x2" | "4x4" | "8x8"
  size: number
  colorSteps: number
  colorBack: string
  colorFront: string
  colorHighlight: string
  originalColors: boolean
  inverted: boolean
}

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
  },
}

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=1400&h=800&fit=crop&q=80"

export default function FeaturedDitheringDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedDithering image={IMAGE} title="Image dithering" {...params} />

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
          options={["random", "2x2", "4x4", "8x8"]}
          onChange={(v) =>
            setParams({ ...params, type: v as Params["type"] })
          }
        />

        <Slider
          label="Size"
          value={params.size}
          min={0.5}
          max={20}
          step={0.5}
          format={(v) => v.toFixed(1)}
          onChange={(v) => setParams({ ...params, size: v })}
        />
        <Slider
          label="Color steps"
          value={params.colorSteps}
          min={1}
          max={7}
          step={1}
          format={(v) => String(Math.round(v))}
          onChange={(v) => setParams({ ...params, colorSteps: v })}
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
