import type { ComponentType } from "react"

import registry from "@/registry.json"
import ChartAreaGradientDemo from "@/registry/new-york/blocks/chart-area-gradient/chart-area-gradient.demo"

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
}

export function getItem(name: string): RegistryItem | null {
  return items.find((i) => i.name === name) ?? null
}
