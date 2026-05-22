"use client"

import * as React from "react"
import { Bar, BarChart } from "recharts"

import {
  ChartContainer,
  type ChartConfig,
} from "@/registry/new-york/ui/chart"
import { cn } from "@/lib/utils"

export type ChartStemsProps = {
  data: Record<string, string | number>[]
  /** Numeric key in each row to plot. Default "value". */
  dataKey?: string
  /** Display label for the series (shown in tooltips/legends). */
  label?: string
  /** Series color — anything CSS accepts. Default var(--chart-3). */
  color?: string
  /** Stem opacity 0-1. Default 0.4. */
  stemOpacity?: number
  /** Dot radius in px (non-scaling). Default 3. */
  dotRadius?: number
  /** Stem stroke width in px (non-scaling). Default 1. */
  stemWidth?: number
  /** CSS background — pass any color, gradient, or `var()`. */
  background?: string
  /** Aspect ratio (e.g. "16/5"). Default "16/5". */
  aspectRatio?: string
  className?: string
}

const DEFAULT_BG =
  "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(253,186,116,0.55), transparent 70%), linear-gradient(180deg, #dbeafe 0%, #fed7aa 50%, #dbeafe 100%)"

export function ChartStems({
  data,
  dataKey = "value",
  label,
  color = "var(--chart-3)",
  stemOpacity = 0.4,
  dotRadius = 3,
  stemWidth = 1,
  background = DEFAULT_BG,
  aspectRatio = "16/5",
  className,
}: ChartStemsProps) {
  const config = React.useMemo<ChartConfig>(
    () => ({
      [dataKey]: { label: label ?? dataKey, color },
    }),
    [dataKey, label, color]
  )

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl", className)}
      style={{ background, aspectRatio }}
    >
      <ChartContainer
        config={config}
        className="!aspect-auto absolute inset-0 size-full"
      >
        <BarChart
          data={data}
          margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
          accessibilityLayer
        >
          <Bar
            dataKey={dataKey}
            fill={`var(--color-${dataKey})`}
            shape={(props) => {
              const p = props as unknown as {
                x?: number
                y?: number
                width?: number
                height?: number
                fill?: string
              }
              return (
                <StemShape
                  x={p.x}
                  y={p.y}
                  width={p.width}
                  height={p.height}
                  fill={p.fill}
                  stemOpacity={stemOpacity}
                  stemWidth={stemWidth}
                  dotRadius={dotRadius}
                />
              )
            }}
            isAnimationActive={false}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}

type StemShapeProps = {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
  stemOpacity: number
  stemWidth: number
  dotRadius: number
}

function StemShape({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  fill,
  stemOpacity,
  stemWidth,
  dotRadius,
}: StemShapeProps) {
  const cx = x + width / 2
  const baseline = y + height
  return (
    <g>
      <line
        x1={cx}
        y1={y}
        x2={cx}
        y2={baseline}
        stroke={fill}
        strokeWidth={stemWidth}
        strokeOpacity={stemOpacity}
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={cx} cy={y} r={dotRadius} fill={fill} />
    </g>
  )
}
