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
import FeaturedBookCoverDemo from "@/registry/new-york/blocks/featured-book-cover/featured-book-cover.demo";
import FeaturedEventDemo from "@/registry/new-york/blocks/featured-event/featured-event.demo";
import FeaturedIntegrationsDemo from "@/registry/new-york/blocks/featured-integrations/featured-integrations.demo";
import FeaturedLogoSpotlightDemo from "@/registry/new-york/blocks/featured-logo-spotlight/featured-logo-spotlight.demo";
import FeaturedOgBannerDemo from "@/registry/new-york/blocks/featured-og-banner/featured-og-banner.demo";
import FeaturedStoryDemo from "@/registry/new-york/blocks/featured-story/featured-story.demo";
import NavbarDemo from "@/registry/new-york/blocks/navbar/navbar.demo";
import TestimonialVideoDemo from "@/registry/new-york/blocks/testimonial-video/testimonial-video.demo";
import AccordionDemo from "@/registry/new-york/ui/accordion.demo";
import BackgroundPatternDemo from "@/registry/new-york/ui/background-pattern.demo";
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

export const themeItems = items.filter((i) => i.type === "registry:theme");

export const previewItems = items.filter((i) => i.type !== "registry:theme");

/**
 * Shader/effect blocks folded into the unified `/preview/featured-effects`
 * explorer. They remain real, individually-installable registry items — they
 * just no longer get their own nav link, gallery card, or preview page (those
 * redirect to the explorer). Keep this list in sync with `FEATURED_FX_EFFECTS`
 * in `lib/featured-fx.tsx` (kept separate so server code doesn't pull the
 * client shader components into its bundle).
 */
export const FEATURED_FX_IDS = [
  "featured-dithering",
  "featured-halftone",
  "featured-halftone-dots",
  "featured-fluted-glass",
  "featured-color-panels",
  "featured-grain-gradient",
  "featured-mesh-gradient",
];

/** Synthetic nav/gallery entry for the unified explorer (not installable). */
export const FEATURED_FX_ITEM: RegistryItem = {
  name: "featured-effects",
  type: "registry:block",
  title: "Featured effects",
  description:
    "One featured image, seven shader effects — dithering, halftone, fluted glass, color panels, and gradients. Pick an effect in the panel; install any one via the shadcn CLI.",
  categories: ["featured"],
};

/** Home-gallery items: folded effects collapsed into the explorer card. */
export const galleryItems: RegistryItem[] = [
  FEATURED_FX_ITEM,
  ...previewItems.filter((i) => !FEATURED_FX_IDS.includes(i.name)),
];

// Demo map. When you add a new component, add a sibling `<name>.demo.tsx`
// with a default export and register it here.
export const demos: Record<string, ComponentType> = {
  accordion: AccordionDemo,
  "annotated-figure": AnnotatedFigureDemo,
  "background-pattern": BackgroundPatternDemo,
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
  "featured-book-cover": FeaturedBookCoverDemo,
  "featured-event": FeaturedEventDemo,
  "featured-integrations": FeaturedIntegrationsDemo,
  "featured-logo-spotlight": FeaturedLogoSpotlightDemo,
  "featured-og-banner": FeaturedOgBannerDemo,
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
  theme: "Themes",
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
      { name: "themes", title: "Brand themes", href: "/themes" },
    ],
  },
];

export const componentNav: NavGroup[] = (() => {
  const groups = new Map<string, RegistryItem[]>();
  for (const item of previewItems) {
    // Folded into the unified explorer — hidden from per-effect nav.
    if (FEATURED_FX_IDS.includes(item.name)) {
      continue;
    }
    const key = item.categories?.[0] ?? "components";
    const existing = groups.get(key) ?? [];
    existing.push(item);
    groups.set(key, existing);
  }
  // Surface the unified explorer at the top of the Featured group.
  const featured = groups.get("featured") ?? [];
  featured.unshift(FEATURED_FX_ITEM);
  groups.set("featured", featured);
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
