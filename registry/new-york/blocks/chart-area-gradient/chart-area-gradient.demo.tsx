"use client"

import { ChartAreaGradient } from "./chart-area-gradient"

const data = [
  { month: "Jan", impressions: 142000, engaged: 38000 },
  { month: "Feb", impressions: 168000, engaged: 47000 },
  { month: "Mar", impressions: 198000, engaged: 58000 },
  { month: "Apr", impressions: 215000, engaged: 64000 },
  { month: "May", impressions: 248000, engaged: 78000 },
  { month: "Jun", impressions: 296000, engaged: 92000 },
  { month: "Jul", impressions: 332000, engaged: 108000 },
  { month: "Aug", impressions: 384000, engaged: 124000 },
]

export default function ChartAreaGradientDemo() {
  return (
    <ChartAreaGradient
      data={data}
      labelKey="month"
      stacked={false}
      series={[
        { key: "impressions", label: "Network impressions" },
        { key: "engaged", label: "Engaged reads" },
      ]}
    />
  )
}
