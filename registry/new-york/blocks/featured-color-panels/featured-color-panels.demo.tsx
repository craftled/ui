"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { FeaturedColorPanels } from "./featured-color-panels"

type Params = {
  colors: string[]
  colorBack: string
  density: number
  angle1: number
  angle2: number
  length: number
  edges: boolean
  blur: number
  fadeIn: number
  fadeOut: number
  gradient: number
  speed: number
  scale: number
  rotation: number
  offsetX: number
  offsetY: number
}

const PRESETS: Record<string, Params> = {
  Default: {
    colors: [
      "#ff9d00",
      "#fd4f30",
      "#809bff",
      "#6d2eff",
      "#333aff",
      "#f15cff",
      "#ffd557",
    ],
    colorBack: "#000000",
    density: 3,
    angle1: 0,
    angle2: 0,
    length: 1.1,
    edges: false,
    blur: 0,
    fadeIn: 1,
    fadeOut: 0.3,
    gradient: 0,
    speed: 0.5,
    scale: 0.8,
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
  },
  Glass: {
    colors: ["#00cfff", "#ff2d55", "#34c759", "#af52de"],
    colorBack: "#ffffff00",
    density: 1.6,
    angle1: 0.3,
    angle2: 0.3,
    length: 1,
    edges: true,
    blur: 0.25,
    fadeIn: 0.85,
    fadeOut: 0.3,
    gradient: 0,
    speed: 1,
    scale: 1,
    rotation: 112,
    offsetX: 0,
    offsetY: 0,
  },
  Gradient: {
    colors: ["#f2ff00", "#00000000", "#00000000", "#5a0283", "#005eff"],
    colorBack: "#8ffff2",
    density: 1.65,
    angle1: 0.4,
    angle2: 0.4,
    length: 3,
    edges: false,
    blur: 0.5,
    fadeIn: 1,
    fadeOut: 0.39,
    gradient: 0.78,
    speed: 0.5,
    scale: 1.72,
    rotation: 270,
    offsetX: 0.18,
    offsetY: 0,
  },
  Opening: {
    colors: ["#00ffff"],
    colorBack: "#570044",
    density: 2.21,
    angle1: -1,
    angle2: -1,
    length: 0.52,
    edges: false,
    blur: 0,
    fadeIn: 0,
    fadeOut: 1,
    gradient: 0,
    speed: 2,
    scale: 2.32,
    rotation: 360,
    offsetX: -0.3,
    offsetY: 0.6,
  },
}

export default function FeaturedColorPanelsDemo() {
  const [params, setParams] = React.useState<Params>(PRESETS.Default)

  const setColor = (idx: number, value: string) => {
    const next = [...params.colors]
    next[idx] = value
    setParams({ ...params, colors: next })
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_220px]">
      <FeaturedColorPanels title="Color panels" {...params} />

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

        <Slider
          label="Density"
          value={params.density}
          min={0.25}
          max={7}
          step={0.05}
          onChange={(v) => setParams({ ...params, density: v })}
        />
        <Slider
          label="Angle 1"
          value={params.angle1}
          min={-1}
          max={1}
          step={0.01}
          onChange={(v) => setParams({ ...params, angle1: v })}
        />
        <Slider
          label="Angle 2"
          value={params.angle2}
          min={-1}
          max={1}
          step={0.01}
          onChange={(v) => setParams({ ...params, angle2: v })}
        />
        <Slider
          label="Length"
          value={params.length}
          max={3}
          step={0.01}
          onChange={(v) => setParams({ ...params, length: v })}
        />
        <Slider
          label="Blur"
          value={params.blur}
          max={0.5}
          onChange={(v) => setParams({ ...params, blur: v })}
        />
        <Slider
          label="Fade in"
          value={params.fadeIn}
          max={1}
          onChange={(v) => setParams({ ...params, fadeIn: v })}
        />
        <Slider
          label="Fade out"
          value={params.fadeOut}
          max={1}
          onChange={(v) => setParams({ ...params, fadeOut: v })}
        />
        <Slider
          label="Gradient"
          value={params.gradient}
          max={1}
          onChange={(v) => setParams({ ...params, gradient: v })}
        />
        <Slider
          label="Speed"
          value={params.speed}
          max={3}
          step={0.05}
          onChange={(v) => setParams({ ...params, speed: v })}
        />

        <Toggle
          label="Edges"
          value={params.edges}
          onChange={(v) => setParams({ ...params, edges: v })}
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
  // color inputs don't accept alpha — render swatch with bg-checker for transparency hint
  const isTransparent = value === "#ffffff00" || value === "#00000000"
  return (
    <label className="flex items-center gap-2">
      <input
        type="color"
        value={isTransparent ? "#ffffff" : value}
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
