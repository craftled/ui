"use client"

import { ChartStems } from "./chart-stems"

const N = 90
const data = Array.from({ length: N }, (_, i) => {
  const t = i / (N - 1)
  const wave =
    Math.sin(t * Math.PI * 1.2) * 8 +
    Math.sin(t * Math.PI * 3.5) * 3 +
    Math.sin(t * Math.PI * 7) * 1.5
  const drift = t * 14
  const lateRise = t > 0.85 ? (t - 0.85) * 60 : 0
  return {
    day: `D${i + 1}`,
    impressions: Math.round(50 + wave + drift + lateRise),
  }
})

export default function ChartStemsDemo() {
  return (
    <ChartStems
      data={data}
      dataKey="impressions"
      label="Daily impressions"
      color="var(--chart-3)"
    />
  )
}
