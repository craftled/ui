"use client"

import * as React from "react"

import {
  hslToHex,
  randomBool,
  randomInRange,
  randomItem,
  randomPalette,
} from "@/lib/random-palette"
import { cn } from "@/lib/utils"

import { FeaturedHalftone } from "./featured-halftone"

const TYPES = ["dots", "ink", "sharp"] as const

function randomParams(): Params {
  const palette = randomPalette(4, { minL: 35, maxL: 70 })
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
  }
}

type Params = {
  type: "dots" | "ink" | "sharp"
  size: number
  softness: number
  contrast: number
  grainOverlay: number
  grainMixer: number
  colorBack: string
  colorC: string
  colorM: string
  colorY: string
  colorK: string
}

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
}

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
}

const IMAGE =
  "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=900&h=900&fit=crop&q=80"

export default function FeaturedHalftoneDemo() {
  const [params, setParams] = React.useState<Params>(DEFAULT)

  const applyPreset = (name: string) => {
    setParams({ ...DEFAULT, ...PRESETS[name] } as Params)
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedHalftone
        image={IMAGE}
        imageAlt="Citrus"
        title="Autumn Vibes"
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
                onClick={() => applyPreset(name)}
                className="border-border hover:bg-muted rounded-md border px-2 py-1.5 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setParams(randomParams())}
            className="bg-foreground text-background hover:bg-foreground/90 mt-1 w-full rounded-md px-2 py-1.5 font-medium transition-colors"
          >
            🎲 Randomize
          </button>
        </div>

        <SelectField
          label="Type"
          value={params.type}
          options={["dots", "ink", "sharp"]}
          onChange={(v) =>
            setParams({ ...params, type: v as Params["type"] })
          }
        />

        <Slider
          label="Size"
          value={params.size}
          max={1}
          onChange={(v) => setParams({ ...params, size: v })}
        />
        <Slider
          label="Softness"
          value={params.softness}
          max={1}
          onChange={(v) => setParams({ ...params, softness: v })}
        />
        <Slider
          label="Contrast"
          value={params.contrast}
          max={2}
          onChange={(v) => setParams({ ...params, contrast: v })}
        />
        <Slider
          label="Grain"
          value={params.grainOverlay}
          max={1}
          onChange={(v) => setParams({ ...params, grainOverlay: v })}
        />

        <div className="mt-2 space-y-1.5">
          <ColorField
            label="Back"
            value={params.colorBack}
            onChange={(v) => setParams({ ...params, colorBack: v })}
          />
          <ColorField
            label="C"
            value={params.colorC}
            onChange={(v) => setParams({ ...params, colorC: v })}
          />
          <ColorField
            label="M"
            value={params.colorM}
            onChange={(v) => setParams({ ...params, colorM: v })}
          />
          <ColorField
            label="Y"
            value={params.colorY}
            onChange={(v) => setParams({ ...params, colorY: v })}
          />
          <ColorField
            label="K"
            value={params.colorK}
            onChange={(v) => setParams({ ...params, colorK: v })}
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
