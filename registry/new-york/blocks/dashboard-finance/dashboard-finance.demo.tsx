"use client"

import { CreditCard, DollarSign, Wallet } from "lucide-react"

import { DashboardFinance } from "./dashboard-finance"

const data = [
  { month: "Jan", profit: 20, income: 0, expense: 0 },
  { month: "Feb", profit: 20, income: 8, expense: 0 },
  { month: "Mar", profit: 18, income: 22, expense: 0 },
  { month: "Apr", profit: 12, income: 12, expense: 1 },
  { month: "May", profit: 22, income: 18, expense: 5 },
  { month: "Jun", profit: 15, income: 22, expense: 14 },
  { month: "Jul", profit: 25, income: 7, expense: 13 },
]

export default function DashboardFinanceDemo() {
  return (
    <DashboardFinance
      title="Finance"
      subtitle="Yearly report overview"
      reportTitle="Report"
      reportSubtitle="Monthly Avg. $45.578k"
      data={data}
      series={[
        { key: "profit", label: "Profit", color: "var(--chart-2)" },
        { key: "income", label: "Income", color: "var(--chart-1)" },
        { key: "expense", label: "Expense", color: "var(--chart-4)" },
      ]}
      kpis={[
        {
          label: "Total Profit",
          value: "$48,568.20",
          icon: DollarSign,
          tint: "teal",
        },
        {
          label: "Total Income",
          value: "$38,453.25",
          icon: Wallet,
          tint: "orange",
        },
        {
          label: "Total Expense",
          value: "$2,453.45",
          icon: CreditCard,
          tint: "yellow",
        },
      ]}
      ctaLabel="View Report"
    />
  )
}
