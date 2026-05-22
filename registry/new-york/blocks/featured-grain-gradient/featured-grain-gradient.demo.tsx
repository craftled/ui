"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  FeaturedGrainGradient,
  type FeaturedGrainGradientProps,
} from "./featured-grain-gradient"

type Params = {
  shape: NonNullable<FeaturedGrainGradientProps["shape"]>
  colors: string[]
  colorBack: string
  softness: number
  intensity: number
  noise: number
  speed: number
}

const PRESETS: Record<string, Params> = {
  Default: {
    shape: "corners",
    colors: ["#7300ff", "#eba8ff", "#00bfff", "#2a00ff"],
    colorBack: "#000000",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.25,
    speed: 1,
  },
  Wave: {
    shape: "wave",
    colors: ["#c4730b", "#bdad5f", "#d8ccc7"],
    colorBack: "#000a0f",
    softness: 0.7,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
  },
  Dots: {
    shape: "dots",
    colors: ["#6f0000", "#0080ff", "#f2ebc9", "#33cc33"],
    colorBack: "#0a0000",
    softness: 1,
    intensity: 1,
    noise: 0.7,
    speed: 1,
  },
  Truchet: {
    shape: "truchet",
    colors: ["#6f2200", "#eabb7c", "#39b523"],
    colorBack: "#0a0000",
    softness: 0,
    intensity: 0.2,
    noise: 1,
    speed: 1,
  },
  Ripple: {
    shape: "ripple",
    colors: ["#6f2d00", "#88ddae", "#2c0b1d"],
    colorBack: "#140a00",
    softness: 0.5,
    intensity: 0.5,
    noise: 0.5,
    speed: 1,
  },
  Blob: {
    shape: "blob",
    colors: ["#3e6172", "#a49b74", "#568c50"],
    colorBack: "#0f0e18",
    softness: 0,
    intensity: 0.15,
    noise: 0.5,
    speed: 1,
  },
}

export default function FeaturedGrainGradientDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors]
    next[idx] = value
    setParams({ ...params, colors: next })
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedGrainGradient title="Grain gradient" {...params} />

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
          options={[
            "wave",
            "dots",
            "truchet",
            "corners",
            "ripple",
            "blob",
            "sphere",
          ]}
          onChange={(v) =>
            setParams({ ...params, shape: v as Params["shape"] })
          }
        />

        <Slider
          label="Softness"
          value={params.softness}
          max={1}
          onChange={(v) => setParams({ ...params, softness: v })}
        />
        <Slider
          label="Intensity"
          value={params.intensity}
          max={1}
          onChange={(v) => setParams({ ...params, intensity: v })}
        />
        <Slider
          label="Noise"
          value={params.noise}
          max={1}
          onChange={(v) => setParams({ ...params, noise: v })}
        />
        <Slider
          label="Speed"
          value={params.speed}
          max={3}
          step={0.05}
          onChange={(v) => setParams({ ...params, speed: v })}
        />

        <div className="mt-2 space-y-1.5">
          <ColorField
            label="Back"
            value={params.colorBack}
            onChange={(v) => setParams({ ...params, colorBack: v })}
          />
          {params.colors.map((c, i) => (
            <ColorField
              key={i}
              label={`Color ${i + 1}`}
              value={c}
              onChange={(v) => setColor(i, v)}
            />
          ))}
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
