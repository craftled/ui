"use client"

import { ChartAreaGradient } from "./chart-area-gradient"

const data = [
  { month: "Jan", revenue: 18200, expenses: 12400 },
  { month: "Feb", revenue: 22100, expenses: 13800 },
  { month: "Mar", revenue: 25400, expenses: 14100 },
  { month: "Apr", revenue: 24800, expenses: 14950 },
  { month: "May", revenue: 31200, expenses: 16100 },
  { month: "Jun", revenue: 38600, expenses: 17700 },
  { month: "Jul", revenue: 41200, expenses: 18400 },
  { month: "Aug", revenue: 45800, expenses: 19900 },
]

export default function ChartAreaGradientDemo() {
  return (
    <ChartAreaGradient
      data={data}
      labelKey="month"
      stacked={false}
      series={[
        { key: "revenue", label: "Revenue" },
        { key: "expenses", label: "Expenses" },
      ]}
    />
  )
}
