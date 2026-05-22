"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { MoreVertical } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/registry/new-york/ui/button"
import { Card } from "@/registry/new-york/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/registry/new-york/ui/chart"
import { cn } from "@/lib/utils"

const TINT_CLASSES = {
  teal: "bg-teal-50 text-teal-600 dark:bg-teal-950/40 dark:text-teal-300",
  orange:
    "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-300",
  yellow:
    "bg-yellow-50 text-yellow-600 dark:bg-yellow-950/40 dark:text-yellow-300",
  rose: "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-300",
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-300",
  violet:
    "bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-300",
} as const

export type DashboardFinanceSeries = {
  key: string
  label: string
  color?: string
}

export type DashboardFinanceKpi = {
  label: string
  value: string
  icon: LucideIcon
  tint?: keyof typeof TINT_CLASSES
}

export type DashboardFinanceProps = {
  title?: string
  subtitle?: string
  reportTitle?: string
  reportSubtitle?: string
  data: Record<string, string | number>[]
  labelKey?: string
  series: DashboardFinanceSeries[]
  kpis: DashboardFinanceKpi[]
  ctaLabel?: string
  onCtaClick?: () => void
  className?: string
}

export function DashboardFinance({
  title = "Finance",
  subtitle,
  reportTitle = "Report",
  reportSubtitle,
  data,
  labelKey = "month",
  series,
  kpis,
  ctaLabel = "View Report",
  onCtaClick,
  className,
}: DashboardFinanceProps) {
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

  return (
    <Card
      className={cn(
        "grid grid-cols-1 gap-0 overflow-hidden p-0 sm:grid-cols-[1fr_240px]",
        className
      )}
    >
      <div className="flex flex-col gap-4 p-6">
        <header className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
            {subtitle ? (
              <p className="text-muted-foreground text-sm">{subtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="More options"
            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
          >
            <MoreVertical className="size-4" />
          </button>
        </header>
        <ChartContainer config={config} className="aspect-[16/10] w-full">
          <BarChart
            data={data}
            margin={{ left: 0, right: 0, top: 8 }}
            accessibilityLayer
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey={labelKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={30}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            {series.map((s, i) => {
              const isTop = i === series.length - 1
              return (
                <Bar
                  key={s.key}
                  dataKey={s.key}
                  stackId="a"
                  fill={`var(--color-${s.key})`}
                  radius={isTop ? [6, 6, 0, 0] : 0}
                />
              )
            })}
          </BarChart>
        </ChartContainer>
      </div>

      <div className="flex flex-col gap-5 border-t p-6 sm:border-t-0 sm:border-l">
        <header className="flex items-start justify-between gap-2">
          <div className="space-y-0.5">
            <h3 className="text-lg font-semibold tracking-tight">
              {reportTitle}
            </h3>
            {reportSubtitle ? (
              <p className="text-muted-foreground text-sm">{reportSubtitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="More options"
            className="text-muted-foreground hover:text-foreground inline-flex size-8 items-center justify-center rounded-full border transition-colors"
          >
            <MoreVertical className="size-4" />
          </button>
        </header>
        <ul className="flex flex-col gap-4">
          {kpis.map((kpi) => (
            <li key={kpi.label} className="flex items-center gap-3">
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg",
                  TINT_CLASSES[kpi.tint ?? "teal"]
                )}
              >
                <kpi.icon className="size-4" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-muted-foreground text-xs">
                  {kpi.label}
                </span>
                <span className="text-sm font-medium tabular-nums">
                  {kpi.value}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Button className="mt-auto w-full" onClick={onCtaClick}>
          {ctaLabel}
        </Button>
      </div>
    </Card>
  )
}
