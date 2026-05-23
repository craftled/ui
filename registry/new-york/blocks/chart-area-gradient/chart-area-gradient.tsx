"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/new-york/ui/chart";

export type ChartAreaGradientSeries = {
  key: string;
  label: string;
  color?: string;
};

export type ChartAreaGradientProps = {
  data: Record<string, string | number>[];
  series: ChartAreaGradientSeries[];
  labelKey?: string;
  stacked?: boolean;
  className?: string;
};

export function ChartAreaGradient({
  data,
  series,
  labelKey = "month",
  stacked = true,
  className,
}: ChartAreaGradientProps) {
  const config = React.useMemo<ChartConfig>(
    () =>
      Object.fromEntries(
        series.map((s, i) => [
          s.key,
          {
            label: s.label,
            color: s.color ?? `var(--chart-${(i % 5) + 1})`,
          },
        ])
      ),
    [series]
  );

  const gradientId = React.useId().replace(/:/g, "");

  return (
    <ChartContainer className={className} config={config}>
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{ left: 12, right: 12, top: 8 }}
      >
        <defs>
          {series.map((s) => (
            <linearGradient
              id={`${gradientId}-${s.key}`}
              key={s.key}
              x1="0"
              x2="0"
              y1="0"
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
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          axisLine={false}
          dataKey={labelKey}
          tickLine={false}
          tickMargin={8}
        />
        <YAxis axisLine={false} tickLine={false} tickMargin={8} width={40} />
        <ChartTooltip
          content={<ChartTooltipContent indicator="dot" />}
          cursor={false}
        />
        {series.map((s) => (
          <Area
            dataKey={s.key}
            fill={`url(#${gradientId}-${s.key})`}
            key={s.key}
            stackId={stacked && series.length > 1 ? "a" : undefined}
            stroke={`var(--color-${s.key})`}
            strokeWidth={2}
            type="natural"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
