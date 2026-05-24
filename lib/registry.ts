import type { ComponentType } from "react";
import AnnotatedFigureDemo from "@/registry/new-york/blocks/annotated-figure/annotated-figure.demo";
import CarouselDoDontDemo from "@/registry/new-york/blocks/carousel-do-dont/carousel-do-dont.demo";
import ChartAreaGradientDemo from "@/registry/new-york/blocks/chart-area-gradient/chart-area-gradient.demo";
import ChartBarRankedDemo from "@/registry/new-york/blocks/chart-bar-ranked/chart-bar-ranked.demo";
import ChartStemsDemo from "@/registry/new-york/blocks/chart-stems/chart-stems.demo";
import CtaAppStackDemo from "@/registry/new-york/blocks/cta-app-stack/cta-app-stack.demo";
import CtaEbookDemo from "@/registry/new-york/blocks/cta-ebook/cta-ebook.demo";
import CtaGradientDemo from "@/registry/new-york/blocks/cta-gradient/cta-gradient.demo";
import CtaNewsletterDemo from "@/registry/new-york/blocks/cta-newsletter/cta-newsletter.demo";
import DashboardFinanceDemo from "@/registry/new-york/blocks/dashboard-finance/dashboard-finance.demo";
import DashboardNetWorthDemo from "@/registry/new-york/blocks/dashboard-net-worth/dashboard-net-worth.demo";
import FeaturedColorPanelsDemo from "@/registry/new-york/blocks/featured-color-panels/featured-color-panels.demo";
import FeaturedDitheringDemo from "@/registry/new-york/blocks/featured-dithering/featured-dithering.demo";
import FeaturedEventDemo from "@/registry/new-york/blocks/featured-event/featured-event.demo";
import FeaturedFlutedGlassDemo from "@/registry/new-york/blocks/featured-fluted-glass/featured-fluted-glass.demo";
import FeaturedGrainGradientDemo from "@/registry/new-york/blocks/featured-grain-gradient/featured-grain-gradient.demo";
import FeaturedHalftoneDemo from "@/registry/new-york/blocks/featured-halftone/featured-halftone.demo";
import FeaturedHalftoneDotsDemo from "@/registry/new-york/blocks/featured-halftone-dots/featured-halftone-dots.demo";
import FeaturedIntegrationsDemo from "@/registry/new-york/blocks/featured-integrations/featured-integrations.demo";
import FeaturedLogoSpotlightDemo from "@/registry/new-york/blocks/featured-logo-spotlight/featured-logo-spotlight.demo";
import FeaturedMeshGradientDemo from "@/registry/new-york/blocks/featured-mesh-gradient/featured-mesh-gradient.demo";
import FeaturedStoryDemo from "@/registry/new-york/blocks/featured-story/featured-story.demo";
import NavbarDemo from "@/registry/new-york/blocks/navbar/navbar.demo";
import TestimonialVideoDemo from "@/registry/new-york/blocks/testimonial-video/testimonial-video.demo";
import AccordionDemo from "@/registry/new-york/ui/accordion.demo";
import ButtonDemo from "@/registry/new-york/ui/button.demo";
import CardDemo from "@/registry/new-york/ui/card.demo";
import DialogDemo from "@/registry/new-york/ui/dialog.demo";
import DropdownMenuDemo from "@/registry/new-york/ui/dropdown-menu.demo";
import InputDemo from "@/registry/new-york/ui/input.demo";
import LabelDemo from "@/registry/new-york/ui/label.demo";
import NavigationMenuDemo from "@/registry/new-york/ui/navigation-menu.demo";
import SeparatorDemo from "@/registry/new-york/ui/separator.demo";
import SkeletonDemo from "@/registry/new-york/ui/skeleton.demo";
import TabsDemo from "@/registry/new-york/ui/tabs.demo";
import TooltipDemo from "@/registry/new-york/ui/tooltip.demo";
import registry from "@/registry.json";

export type RegistryItem = {
  name: string;
  type: string;
  title: string;
  description: string;
  categories?: string[];
  /**
   * Preview layout strategy:
   * - "contained" (default) — renders inside the 700px docs column.
   * - "fullwidth" — renders in a full-bleed iframe with a viewport toggle.
   *   Use for blocks that span the full page width (Navbar, hero sections,
   *   large dashboards).
   */
  layout?: "contained" | "fullwidth";
};

export const items = registry.items as RegistryItem[];

// Demo map. When you add a new component, add a sibling `<name>.demo.tsx`
// with a default export and register it here.
export const demos: Record<string, ComponentType> = {
  accordion: AccordionDemo,
  "annotated-figure": AnnotatedFigureDemo,
  button: ButtonDemo,
  card: CardDemo,
  "carousel-do-dont": CarouselDoDontDemo,
  "chart-area-gradient": ChartAreaGradientDemo,
  "chart-bar-ranked": ChartBarRankedDemo,
  "chart-stems": ChartStemsDemo,
  "cta-app-stack": CtaAppStackDemo,
  "cta-ebook": CtaEbookDemo,
  "cta-gradient": CtaGradientDemo,
  "cta-newsletter": CtaNewsletterDemo,
  "dashboard-finance": DashboardFinanceDemo,
  "dashboard-net-worth": DashboardNetWorthDemo,
  dialog: DialogDemo,
  "dropdown-menu": DropdownMenuDemo,
  "featured-color-panels": FeaturedColorPanelsDemo,
  "featured-dithering": FeaturedDitheringDemo,
  "featured-event": FeaturedEventDemo,
  "featured-fluted-glass": FeaturedFlutedGlassDemo,
  "featured-grain-gradient": FeaturedGrainGradientDemo,
  "featured-halftone": FeaturedHalftoneDemo,
  "featured-halftone-dots": FeaturedHalftoneDotsDemo,
  "featured-integrations": FeaturedIntegrationsDemo,
  "featured-logo-spotlight": FeaturedLogoSpotlightDemo,
  "featured-mesh-gradient": FeaturedMeshGradientDemo,
  "featured-story": FeaturedStoryDemo,
  input: InputDemo,
  label: LabelDemo,
  navbar: NavbarDemo,
  "navigation-menu": NavigationMenuDemo,
  separator: SeparatorDemo,
  skeleton: SkeletonDemo,
  tabs: TabsDemo,
  "testimonial-video": TestimonialVideoDemo,
  tooltip: TooltipDemo,
};

export function getItem(name: string): RegistryItem | null {
  return items.find((i) => i.name === name) ?? null;
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
  navigation: "Navigation",
  primitive: "Primitives",
  "social-proof": "Social Proof",
};

export type NavLink = {
  name: string;
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  links: NavLink[];
};

export const staticNav: NavGroup[] = [
  {
    title: "Get Started",
    links: [
      { name: "introduction", title: "Introduction", href: "/" },
      { name: "compose", title: "Compose", href: "/compose" },
    ],
  },
];

export const componentNav: NavGroup[] = (() => {
  const groups = new Map<string, RegistryItem[]>();
  for (const item of items) {
    const key = item.categories?.[0] ?? "components";
    const existing = groups.get(key) ?? [];
    existing.push(item);
    groups.set(key, existing);
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
    }));
})();
