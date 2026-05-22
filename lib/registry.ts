import type { ComponentType } from "react"

import registry from "@/registry.json"
import ChartAreaGradientDemo from "@/registry/new-york/blocks/chart-area-gradient/chart-area-gradient.demo"
import DashboardFinanceDemo from "@/registry/new-york/blocks/dashboard-finance/dashboard-finance.demo"

export type RegistryItem = {
  name: string
  type: string
  title: string
  description: string
  categories?: string[]
}

export const items = registry.items as RegistryItem[]

// Demo map. When you add a new component, add a sibling `<name>.demo.tsx`
// with a default export and register it here.
export const demos: Record<string, ComponentType> = {
  "chart-area-gradient": ChartAreaGradientDemo,
  "dashboard-finance": DashboardFinanceDemo,
}

export function getItem(name: string): RegistryItem | null {
  return items.find((i) => i.name === name) ?? null
}

// --- Sidebar navigation -----------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  chart: "Charts",
  dashboard: "Dashboards",
  form: "Forms",
  layout: "Layout",
}

export type NavLink = {
  name: string
  title: string
  href: string
}

export type NavGroup = {
  title: string
  links: NavLink[]
}

export const staticNav: NavGroup[] = [
  {
    title: "Get Started",
    links: [
      { name: "introduction", title: "Introduction", href: "/" },
    ],
  },
]

export const componentNav: NavGroup[] = (() => {
  const groups = new Map<string, RegistryItem[]>()
  for (const item of items) {
    const key = item.categories?.[0] ?? "components"
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(item)
  }
  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, list]) => ({
      title: CATEGORY_LABELS[key] ?? key.charAt(0).toUpperCase() + key.slice(1),
      links: list
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((i) => ({
          name: i.name,
          title: i.title,
          href: `/preview/${i.name}`,
        })),
    }))
})()
