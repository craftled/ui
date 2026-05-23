"use client";

import { Eye, MousePointerClick, TrendingUp } from "lucide-react";

import { DashboardFinance } from "./dashboard-finance";

const data = [
  { month: "Jan", impressions: 18, clicks: 4, conversions: 1 },
  { month: "Feb", impressions: 22, clicks: 6, conversions: 1 },
  { month: "Mar", impressions: 28, clicks: 8, conversions: 2 },
  { month: "Apr", impressions: 24, clicks: 7, conversions: 2 },
  { month: "May", impressions: 32, clicks: 10, conversions: 3 },
  { month: "Jun", impressions: 38, clicks: 12, conversions: 4 },
  { month: "Jul", impressions: 42, clicks: 14, conversions: 5 },
];

export default function DashboardFinanceDemo() {
  return (
    <DashboardFinance
      ctaLabel="View Report"
      data={data}
      kpis={[
        {
          label: "Impressions",
          value: "204,318",
          icon: Eye,
          tint: "teal",
        },
        {
          label: "Clicks",
          value: "12,540",
          icon: MousePointerClick,
          tint: "orange",
        },
        {
          label: "Conversions",
          value: "1,847",
          icon: TrendingUp,
          tint: "yellow",
        },
      ]}
      reportSubtitle="Monthly Avg. 28.5k delivery"
      reportTitle="Report"
      series={[
        { key: "impressions", label: "Impressions", color: "var(--chart-2)" },
        { key: "clicks", label: "Clicks", color: "var(--chart-1)" },
        { key: "conversions", label: "Conversions", color: "var(--chart-4)" },
      ]}
      subtitle="Network delivery, last 7 months"
      title="Campaign Performance"
    />
  );
}
