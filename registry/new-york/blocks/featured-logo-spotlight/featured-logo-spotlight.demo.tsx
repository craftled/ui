"use client"

import * as React from "react"

import {
  hslToHex,
  randomInRange,
  randomPalette,
} from "@/lib/random-palette"
import { cn } from "@/lib/utils"

import { FeaturedLogoSpotlight } from "./featured-logo-spotlight"

type Params = {
  colors: string[]
  positions: number
  waveX: number
  waveXShift: number
  waveY: number
  waveYShift: number
  mixing: number
  rotation: number
  logoColor: string
  haloPadding: number
}

const PRESETS: Record<string, Params> = {
  Default: {
    colors: ["#0a0a0a", "#5e1de3", "#dc2626", "#1e3a8a"],
    positions: 50,
    waveX: 1,
    waveXShift: 0.3,
    waveY: 1,
    waveYShift: 0.5,
    mixing: 0.85,
    rotation: 30,
    logoColor: "#f43f5e",
    haloPadding: 16,
  },
  Sunset: {
    colors: ["#264653", "#9c2b2b", "#f4a261", "#ffffff"],
    positions: 0,
    waveX: 0.6,
    waveXShift: 0.7,
    waveY: 0.7,
    waveYShift: 0.7,
    mixing: 0.5,
    rotation: 0,
    logoColor: "#f59e0b",
    haloPadding: 16,
  },
  Sea: {
    colors: ["#013b65", "#03738c", "#a3d3ff", "#f2faef"],
    positions: 0,
    waveX: 0.53,
    waveXShift: 0,
    waveY: 0.95,
    waveYShift: 0.64,
    mixing: 0.5,
    rotation: 0,
    logoColor: "#0891b2",
    haloPadding: 16,
  },
  "1960s": {
    colors: ["#000000", "#082400", "#b1aa91", "#8e8c15"],
    positions: 42,
    waveX: 0.45,
    waveXShift: 0,
    waveY: 1,
    waveYShift: 0,
    mixing: 0,
    rotation: 0,
    logoColor: "#fbbf24",
    haloPadding: 16,
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
    rotation: Math.floor(Math.random() * 360),
    logoColor: hslToHex(
      Math.random() * 360,
      60 + Math.random() * 30,
      50 + Math.random() * 20
    ),
    haloPadding: 12 + Math.floor(Math.random() * 12),
  }
}

export default function FeaturedLogoSpotlightDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors]
    next[idx] = value
    setParams({ ...params, colors: next })
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedLogoSpotlight
        title="Best Writing"
        eyebrow="In the spotlight"
        haloPadding={params.haloPadding}
        colors={params.colors}
        positions={params.positions}
        waveX={params.waveX}
        waveXShift={params.waveXShift}
        waveY={params.waveY}
        waveYShift={params.waveYShift}
        mixing={params.mixing}
        rotation={params.rotation}
        logo={
          <div
            className="flex size-full items-center justify-center text-4xl font-bold text-white"
            style={{ backgroundColor: params.logoColor }}
          >
            B
          </div>
        }
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
          <button
            type="button"
            onClick={() => setParams(randomParams())}
            className="bg-foreground text-background hover:bg-foreground/90 mt-1 w-full rounded-md px-2 py-1.5 font-medium transition-colors"
          >
            🎲 Randomize
          </button>
        </div>

        <Slider
          label="Halo padding"
          value={params.haloPadding}
          min={0}
          max={40}
          step={1}
          format={(v) => `${Math.round(v)}px`}
          onChange={(v) => setParams({ ...params, haloPadding: v })}
        />
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
          label="Wave Y"
          value={params.waveY}
          max={1}
          onChange={(v) => setParams({ ...params, waveY: v })}
        />
        <Slider
          label="Mixing"
          value={params.mixing}
          max={1}
          onChange={(v) => setParams({ ...params, mixing: v })}
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
          <ColorField
            label="Logo"
            value={params.logoColor}
            onChange={(v) => setParams({ ...params, logoColor: v })}
          />
          {params.colors.map((c, i) => (
            <ColorField
              key={i}
              label={`Mesh ${i + 1}`}
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
