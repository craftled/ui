"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type ChartStemsDatum = {
  label: string
  value: number
}

export type ChartStemsProps = {
  data: ChartStemsDatum[]
  /** Color of the dots + stems. */
  color?: string
  /** Stem opacity 0-1. Default 0.4. */
  stemOpacity?: number
  /** Stem stroke width (pixels, non-scaling). Default 1. */
  stemWidth?: number
  /** Dot radius (in viewBox units relative to ~1000 width). Default 3. */
  dotRadius?: number
  /** CSS background. Pass any gradient. */
  background?: string
  /** Aspect ratio (e.g. "16/5"). */
  aspectRatio?: string
  /** Vertical headroom from the top before the highest dot, as a fraction (0-1). Default 0.08. */
  topPadding?: number
  /** Vertical range the dots occupy, as a fraction of the chart height (0-1). Default 0.35. */
  range?: number
  className?: string
}

const DEFAULT_BACKGROUND =
  "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(253,186,116,0.55), transparent 70%), linear-gradient(180deg, #dbeafe 0%, #fed7aa 50%, #dbeafe 100%)"

export function ChartStems({
  data,
  color = "#3b82f6",
  stemOpacity = 0.4,
  stemWidth = 1,
  dotRadius = 3,
  background = DEFAULT_BACKGROUND,
  aspectRatio = "16/5",
  topPadding = 0.08,
  range = 0.35,
  className,
}: ChartStemsProps) {
  const W = 1000
  const H = 250

  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const span = max - min || 1
  const topY = H * topPadding
  const rangeY = H * range

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{ background, aspectRatio }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden
      >
        {data.map((d, i) => {
          const x = data.length === 1 ? W / 2 : (i / (data.length - 1)) * W
          const normalized = (d.value - min) / span
          const y = topY + (1 - normalized) * rangeY
          return (
            <g key={i}>
              <line
                x1={x}
                y1={y}
                x2={x}
                y2={H}
                stroke={color}
                strokeWidth={stemWidth}
                strokeOpacity={stemOpacity}
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={x} cy={y} r={dotRadius} fill={color} />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
