import type { ComponentType } from "react"

import registry from "@/registry.json"
import AnnotatedFigureDemo from "@/registry/new-york/blocks/annotated-figure/annotated-figure.demo"
import CarouselDoDontDemo from "@/registry/new-york/blocks/carousel-do-dont/carousel-do-dont.demo"
import ChartAreaGradientDemo from "@/registry/new-york/blocks/chart-area-gradient/chart-area-gradient.demo"
import ChartStemsDemo from "@/registry/new-york/blocks/chart-stems/chart-stems.demo"
import CtaAppStackDemo from "@/registry/new-york/blocks/cta-app-stack/cta-app-stack.demo"
import CtaEbookDemo from "@/registry/new-york/blocks/cta-ebook/cta-ebook.demo"
import CtaGradientDemo from "@/registry/new-york/blocks/cta-gradient/cta-gradient.demo"
import CtaNewsletterDemo from "@/registry/new-york/blocks/cta-newsletter/cta-newsletter.demo"
import DashboardFinanceDemo from "@/registry/new-york/blocks/dashboard-finance/dashboard-finance.demo"
import DashboardNetWorthDemo from "@/registry/new-york/blocks/dashboard-net-worth/dashboard-net-worth.demo"
import FeaturedColorPanelsDemo from "@/registry/new-york/blocks/featured-color-panels/featured-color-panels.demo"
import FeaturedDitheringDemo from "@/registry/new-york/blocks/featured-dithering/featured-dithering.demo"
import FeaturedEventDemo from "@/registry/new-york/blocks/featured-event/featured-event.demo"
import FeaturedFlutedGlassDemo from "@/registry/new-york/blocks/featured-fluted-glass/featured-fluted-glass.demo"
import FeaturedGrainGradientDemo from "@/registry/new-york/blocks/featured-grain-gradient/featured-grain-gradient.demo"
import FeaturedHalftoneDemo from "@/registry/new-york/blocks/featured-halftone/featured-halftone.demo"
import FeaturedHalftoneDotsDemo from "@/registry/new-york/blocks/featured-halftone-dots/featured-halftone-dots.demo"
import FeaturedIntegrationsDemo from "@/registry/new-york/blocks/featured-integrations/featured-integrations.demo"
import FeaturedMeshGradientDemo from "@/registry/new-york/blocks/featured-mesh-gradient/featured-mesh-gradient.demo"
import FeaturedStoryDemo from "@/registry/new-york/blocks/featured-story/featured-story.demo"
import TestimonialVideoDemo from "@/registry/new-york/blocks/testimonial-video/testimonial-video.demo"

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
  "annotated-figure": AnnotatedFigureDemo,
  "carousel-do-dont": CarouselDoDontDemo,
  "chart-area-gradient": ChartAreaGradientDemo,
  "chart-stems": ChartStemsDemo,
  "cta-app-stack": CtaAppStackDemo,
  "cta-ebook": CtaEbookDemo,
  "cta-gradient": CtaGradientDemo,
  "cta-newsletter": CtaNewsletterDemo,
  "dashboard-finance": DashboardFinanceDemo,
  "dashboard-net-worth": DashboardNetWorthDemo,
  "featured-color-panels": FeaturedColorPanelsDemo,
  "featured-dithering": FeaturedDitheringDemo,
  "featured-event": FeaturedEventDemo,
  "featured-fluted-glass": FeaturedFlutedGlassDemo,
  "featured-grain-gradient": FeaturedGrainGradientDemo,
  "featured-halftone": FeaturedHalftoneDemo,
  "featured-halftone-dots": FeaturedHalftoneDotsDemo,
  "featured-integrations": FeaturedIntegrationsDemo,
  "featured-mesh-gradient": FeaturedMeshGradientDemo,
  "featured-story": FeaturedStoryDemo,
  "testimonial-video": TestimonialVideoDemo,
}

export function getItem(name: string): RegistryItem | null {
  return items.find((i) => i.name === name) ?? null
}

// --- Sidebar navigation -----------------------------------------------------

const CATEGORY_LABELS: Record<string, string> = {
  carousel: "Carousels",
  chart: "Charts",
  cta: "CTAs",
  dashboard: "Dashboards",
  explainer: "Explainers",
  featured: "Featured",
  form: "Forms",
  layout: "Layout",
  "social-proof": "Social Proof",
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
