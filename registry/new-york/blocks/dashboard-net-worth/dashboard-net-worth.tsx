"use client"

import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { Area, AreaChart } from "recharts"

import { Card } from "@/registry/new-york/ui/card"
import {
  ChartContainer,
  type ChartConfig,
} from "@/registry/new-york/ui/chart"
import { cn } from "@/lib/utils"

const GREEN = "rgb(34, 197, 94)"

export type ChangeIndicator = {
  value: string
  direction: "up" | "down"
}

export type DashboardNetWorthAccount = {
  name: string
  subtitle?: string
  amount: string
  change: ChangeIndicator
  icon: React.ReactNode
  iconClassName?: string
}

export type DashboardNetWorthProps = {
  total: string
  totalLabel?: string
  change: ChangeIndicator
  trend: { label: string; value: number }[]
  accountsTitle?: string
  accountsAside?: string
  accounts: DashboardNetWorthAccount[]
  className?: string
}

function ChangePill({
  change,
  className,
}: {
  change: ChangeIndicator
  className?: string
}) {
  const isUp = change.direction === "up"
  const Icon = isUp ? ArrowUpRight : ArrowDownRight
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-medium",
        isUp
          ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300"
          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
        className
      )}
    >
      <Icon className="size-3" />
      {change.value}
    </span>
  )
}

export function DashboardNetWorth({
  total,
  totalLabel = "total balance",
  change,
  trend,
  accountsTitle = "Accounts",
  accountsAside,
  accounts,
  className,
}: DashboardNetWorthProps) {
  const config = {
    value: { label: "Balance", color: GREEN },
  } satisfies ChartConfig

  const gradientId = React.useId().replace(/:/g, "")
  const lastIdx = trend.length - 1

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <Card className="flex flex-col gap-0 overflow-hidden p-6 pb-0">
        <div className="flex flex-col items-center gap-1.5">
          <ChangePill change={change} />
          <div className="text-3xl font-bold tracking-tight">{total}</div>
          <div className="text-muted-foreground text-sm">{totalLabel}</div>
        </div>
        <ChartContainer config={config} className="aspect-[16/7] w-full">
          <AreaChart
            data={trend}
            margin={{ left: 8, right: 8, top: 20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity={0.25} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              dataKey="value"
              type="monotone"
              stroke={GREEN}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              activeDot={false}
              isAnimationActive={false}
              dot={(props) => {
                const { cx, cy, index } = props as {
                  cx: number
                  cy: number
                  index: number
                }
                if (index !== lastIdx) {
                  return <circle key={index} cx={cx} cy={cy} r={0} />
                }
                return (
                  <circle
                    key="last"
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill="white"
                    stroke={GREEN}
                    strokeWidth={3}
                  />
                )
              }}
            />
          </AreaChart>
        </ChartContainer>
      </Card>

      <section className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between">
          <h3 className="text-base font-semibold tracking-tight">
            {accountsTitle}
          </h3>
          {accountsAside ? (
            <span className="text-muted-foreground text-sm">
              {accountsAside}
            </span>
          ) : null}
        </header>
        <ul className="divide-border flex flex-col divide-y">
          {accounts.map((acc, i) => (
            <li key={i} className="flex items-center gap-4 py-3">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white",
                  acc.iconClassName
                )}
              >
                {acc.icon}
              </span>
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="text-base font-medium">{acc.name}</span>
                {acc.subtitle ? (
                  <span className="text-muted-foreground text-xs">
                    {acc.subtitle}
                  </span>
                ) : null}
              </div>
              <ChangePill change={acc.change} />
              <span className="text-base font-semibold tabular-nums">
                {acc.amount}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
