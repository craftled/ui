"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import * as React from "react";
import { Area, AreaChart } from "recharts";
import { cn } from "@/lib/utils";
import { Card } from "@/registry/new-york/ui/card";
import { type ChartConfig, ChartContainer } from "@/registry/new-york/ui/chart";

const GREEN = "rgb(34, 197, 94)";

export type ChangeIndicator = {
  value: string;
  direction: "up" | "down";
};

export type DashboardNetWorthAccount = {
  name: string;
  subtitle?: string;
  amount: string;
  change: ChangeIndicator;
  icon: React.ReactNode;
  iconClassName?: string;
};

export type DashboardNetWorthProps = {
  total: string;
  totalLabel?: string;
  change: ChangeIndicator;
  trend: { label: string; value: number }[];
  accountsTitle?: string;
  accountsAside?: string;
  accounts: DashboardNetWorthAccount[];
  className?: string;
};

function ChangePill({
  change,
  className,
}: {
  change: ChangeIndicator;
  className?: string;
}) {
  const isUp = change.direction === "up";
  const Icon = isUp ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 font-medium text-xs",
        isUp
          ? "bg-green-50 text-green-700 dark:bg-green-950/40 dark:text-green-300"
          : "bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300",
        className
      )}
    >
      <Icon className="size-3" />
      {change.value}
    </span>
  );
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
  } satisfies ChartConfig;

  const gradientId = React.useId().replace(/:/g, "");
  const lastIdx = trend.length - 1;

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <Card className="flex flex-col gap-0 overflow-hidden p-6 pb-0">
        <div className="flex flex-col items-center gap-1.5">
          <ChangePill change={change} />
          <div className="font-bold text-3xl tracking-tight">{total}</div>
          <div className="text-muted-foreground text-sm">{totalLabel}</div>
        </div>
        <ChartContainer className="aspect-[16/7] w-full" config={config}>
          <AreaChart
            data={trend}
            margin={{ left: 8, right: 8, top: 20, bottom: 0 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={GREEN} stopOpacity={0.25} />
                <stop offset="100%" stopColor={GREEN} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              activeDot={false}
              dataKey="value"
              dot={(props) => {
                const { cx, cy, index } = props as {
                  cx: number;
                  cy: number;
                  index: number;
                };
                if (index !== lastIdx) {
                  return <circle cx={cx} cy={cy} key={index} r={0} />;
                }
                return (
                  <circle
                    cx={cx}
                    cy={cy}
                    fill="white"
                    key="last"
                    r={5}
                    stroke={GREEN}
                    strokeWidth={3}
                  />
                );
              }}
              fill={`url(#${gradientId})`}
              isAnimationActive={false}
              stroke={GREEN}
              strokeWidth={3}
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </Card>

      <section className="flex flex-col gap-3">
        <header className="flex items-baseline justify-between">
          <h3 className="font-semibold text-base tracking-tight">
            {accountsTitle}
          </h3>
          {accountsAside ? (
            <span className="text-muted-foreground text-sm">
              {accountsAside}
            </span>
          ) : null}
        </header>
        <ul className="flex flex-col divide-y divide-border">
          {accounts.map((acc, i) => (
            <li className="flex items-center gap-4 py-3" key={i}>
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-full font-semibold text-base text-white",
                  acc.iconClassName
                )}
              >
                {acc.icon}
              </span>
              <div className="flex min-w-0 flex-1 flex-col leading-tight">
                <span className="font-medium text-base">{acc.name}</span>
                {acc.subtitle ? (
                  <span className="text-muted-foreground text-xs">
                    {acc.subtitle}
                  </span>
                ) : null}
              </div>
              <ChangePill change={acc.change} />
              <span className="font-semibold text-base tabular-nums">
                {acc.amount}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
