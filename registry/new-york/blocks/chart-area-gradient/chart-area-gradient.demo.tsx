"use client";

import { ChartAreaGradient } from "./chart-area-gradient";

const data = [
  { month: "Jan", impressions: 142_000, engaged: 38_000 },
  { month: "Feb", impressions: 168_000, engaged: 47_000 },
  { month: "Mar", impressions: 198_000, engaged: 58_000 },
  { month: "Apr", impressions: 215_000, engaged: 64_000 },
  { month: "May", impressions: 248_000, engaged: 78_000 },
  { month: "Jun", impressions: 296_000, engaged: 92_000 },
  { month: "Jul", impressions: 332_000, engaged: 108_000 },
  { month: "Aug", impressions: 384_000, engaged: 124_000 },
];

export default function ChartAreaGradientDemo() {
  return (
    <ChartAreaGradient
      data={data}
      labelKey="month"
      series={[
        { key: "impressions", label: "Network impressions" },
        { key: "engaged", label: "Engaged reads" },
      ]}
      stacked={false}
    />
  );
}
