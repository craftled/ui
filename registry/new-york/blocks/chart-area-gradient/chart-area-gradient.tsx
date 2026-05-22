"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york/ui/chart"

export type ChartAreaGradientSeries = {
  key: string
  label: string
  color?: string
}

export type ChartAreaGradientProps = {
  data: Record<string, string | number>[]
  series: ChartAreaGradientSeries[]
  labelKey?: string
  stacked?: boolean
  className?: string
}

export function ChartAreaGradient({
  data,
  series,
  labelKey = "month",
  stacked = true,
  className,
}: ChartAreaGradientProps) {
  const config = React.useMemo<ChartConfig>(() => {
    return Object.fromEntries(
      series.map((s, i) => [
        s.key,
        {
          label: s.label,
          color: s.color ?? `var(--chart-${(i % 5) + 1})`,
        },
      ])
    )
  }, [series])

  const gradientId = React.useId().replace(/:/g, "")

  return (
    <ChartContainer config={config} className={className}>
      <AreaChart
        data={data}
        margin={{ left: 12, right: 12, top: 8 }}
        accessibilityLayer
      >
        <defs>
          {series.map((s) => (
            <linearGradient
              key={s.key}
              id={`${gradientId}-${s.key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor={`var(--color-${s.key})`}
                stopOpacity={0.4}
              />
              <stop
                offset="100%"
                stopColor={`var(--color-${s.key})`}
                stopOpacity={0}
              />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey={labelKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={8} width={40} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        {series.map((s) => (
          <Area
            key={s.key}
            dataKey={s.key}
            type="natural"
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            fill={`url(#${gradientId}-${s.key})`}
            stackId={stacked && series.length > 1 ? "a" : undefined}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  )
}
