"use client"

import * as React from "react"

import { randomPalette } from "@/lib/random-palette"
import { cn } from "@/lib/utils"

import { FeaturedMeshGradient } from "./featured-mesh-gradient"

type Params = {
  colors: string[]
  positions: number
  waveX: number
  waveXShift: number
  waveY: number
  waveYShift: number
  mixing: number
  grainMixer: number
  grainOverlay: number
  rotation: number
}

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
  },
}

function randomParams(): Params {
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
  }
}

export default function FeaturedMeshGradientDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors]
    next[idx] = value
    setParams({ ...params, colors: next })
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedMeshGradient title="Mesh gradient" {...params} />

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
          <button
            type="button"
            onClick={() => setParams(randomParams())}
            className="bg-foreground text-background hover:bg-foreground/90 mt-1 w-full rounded-md px-2 py-1.5 font-medium transition-colors"
          >
            🎲 Randomize
          </button>
        </div>

        <Slider
          label="Positions"
          value={params.positions}
          min={0}
          max={100}
          step={1}
          format={(v) => String(Math.round(v))}
          onChange={(v) => setParams({ ...params, positions: v })}
        />
        <Slider
          label="Wave X"
          value={params.waveX}
          max={1}
          onChange={(v) => setParams({ ...params, waveX: v })}
        />
        <Slider
          label="Wave X shift"
          value={params.waveXShift}
          max={1}
          onChange={(v) => setParams({ ...params, waveXShift: v })}
        />
        <Slider
          label="Wave Y"
          value={params.waveY}
          max={1}
          onChange={(v) => setParams({ ...params, waveY: v })}
        />
        <Slider
          label="Wave Y shift"
          value={params.waveYShift}
          max={1}
          onChange={(v) => setParams({ ...params, waveYShift: v })}
        />
        <Slider
          label="Mixing"
          value={params.mixing}
          max={1}
          onChange={(v) => setParams({ ...params, mixing: v })}
        />
        <Slider
          label="Grain mixer"
          value={params.grainMixer}
          max={1}
          onChange={(v) => setParams({ ...params, grainMixer: v })}
        />
        <Slider
          label="Grain overlay"
          value={params.grainOverlay}
          max={1}
          onChange={(v) => setParams({ ...params, grainOverlay: v })}
        />
        <Slider
          label="Rotation"
          value={params.rotation}
          min={0}
          max={360}
          step={1}
          format={(v) => `${Math.round(v)}°`}
          onChange={(v) => setParams({ ...params, rotation: v })}
        />

        <div className="mt-2 space-y-1.5">
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
        className={cn(
          "border-border size-7 cursor-pointer rounded border bg-transparent p-0",
          "[&::-webkit-color-swatch-wrapper]:p-0 [&::-webkit-color-swatch]:rounded [&::-webkit-color-swatch]:border-none"
        )}
      />
      <div className="flex flex-1 items-center justify-between">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-[11px]">{value}</span>
      </div>
    </label>
  )
}
