"use client"

import * as React from "react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york/ui/chart"
import { cn } from "@/lib/utils"

export type ChartStemsProps = {
  data: Record<string, string | number>[]
  /** Numeric key in each row to plot. Default "value". */
  dataKey?: string
  /** Key holding the x-axis label (used by tooltips + axis). Default "label". */
  labelKey?: string
  /** Display label for the series. */
  label?: string
  /** Series color — anything CSS accepts. Default var(--chart-3). */
  color?: string
  /** Stem opacity 0-1. Default 0.4. */
  stemOpacity?: number
  /** Dot radius in px. Default 3. */
  dotRadius?: number
  /** Stem stroke width in px (non-scaling). Default 1. */
  stemWidth?: number
  /** CSS background. */
  background?: string
  /** Aspect ratio (e.g. "16/5"). Default "16/5". */
  aspectRatio?: string
  /** Hover tooltip. Default true. */
  showTooltip?: boolean
  /** Render X + Y axes. Default false (keeps the ambient look). */
  showAxes?: boolean
  /** Render legend below. Default false. */
  showLegend?: boolean
  className?: string
}

const DEFAULT_BG =
  "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(253,186,116,0.55), transparent 70%), linear-gradient(180deg, #dbeafe 0%, #fed7aa 50%, #dbeafe 100%)"

export function ChartStems({
  data,
  dataKey = "value",
  labelKey = "label",
  label,
  color = "var(--chart-3)",
  stemOpacity = 0.4,
  dotRadius = 3,
  stemWidth = 1,
  background = DEFAULT_BG,
  aspectRatio = "16/5",
  showTooltip = true,
  showAxes = false,
  showLegend = false,
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
          margin={{
            top: 12,
            right: showAxes ? 12 : 4,
            left: showAxes ? 0 : 4,
            bottom: showAxes ? 4 : 4,
          }}
          accessibilityLayer
        >
          {showAxes ? (
            <>
              <XAxis
                dataKey={labelKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval="preserveStartEnd"
                minTickGap={32}
                tick={{ fill: "currentColor", fillOpacity: 0.55, fontSize: 11 }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={6}
                width={32}
                tick={{ fill: "currentColor", fillOpacity: 0.55, fontSize: 11 }}
              />
            </>
          ) : null}

          {showTooltip ? (
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  indicator="dot"
                  labelKey={labelKey}
                />
              }
            />
          ) : null}

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

          {showLegend ? <ChartLegend content={<ChartLegendContent />} /> : null}
        </BarChart>
      </ChartContainer>
    </div>
  )
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
}: {
  x?: number
  y?: number
  width?: number
  height?: number
  fill?: string
  stemOpacity: number
  stemWidth: number
  dotRadius: number
}) {
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
