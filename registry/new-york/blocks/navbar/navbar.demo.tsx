"use client";

import {
  BookOpen,
  Boxes,
  Layers,
  Palette,
  Sparkles,
  Wand2,
} from "lucide-react";

import { Navbar } from "./navbar";

export default function NavbarDemo() {
  return (
    <div className="relative h-[520px] overflow-hidden rounded-xl border bg-background">
      <Navbar
        brand={<BrandMark />}
        brandHref="#"
        brandLabel="Craftled home"
        ctas={[
          { label: "Sign in", href: "#sign-in", variant: "ghost" },
          { label: "Get started", href: "#start" },
        ]}
        links={[
          {
            label: "Product",
            href: "#product",
            items: [
              {
                label: "Primitives",
                href: "#primitives",
                description: "Atomic shadcn-native components.",
                icon: <Layers />,
              },
              {
                label: "Blocks",
                href: "#blocks",
                description: "Dashboards, CTAs, testimonials.",
                icon: <Boxes />,
              },
              {
                label: "Shaders",
                href: "#shaders",
                description: "WebGL panels via paper-design.",
                icon: <Sparkles />,
              },
              {
                label: "Compose",
                href: "#compose",
                description: "Recipes that combine everything.",
                icon: <Wand2 />,
              },
            ],
          },
          {
            label: "Resources",
            href: "#resources",
            items: [
              { label: "Docs", href: "#docs" },
              { label: "Changelog", href: "#changelog" },
              { label: "GitHub", href: "#github" },
            ],
          },
          { label: "Pricing", href: "#pricing" },
          { label: "Blog", href: "#blog" },
        ]}
        position="absolute"
      />

      {/* Spacer so you can see the navbar in this isolated demo. */}
      <div className="mt-20 px-6 pt-20 pb-12 lg:pt-32">
        <div className="mx-auto max-w-2xl space-y-4 text-center">
          <p className="text-muted-foreground text-xs uppercase tracking-widest">
            Demo viewport
          </p>
          <h1 className="font-semibold text-3xl tracking-tight">
            The navbar floats above this content.
          </h1>
          <p className="text-muted-foreground">
            Scroll inside this card on a real page and you'll see the backdrop
            blur kick in. On mobile, the hamburger swaps the layout for a
            full-height Accordion menu.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-muted-foreground text-xs">
            <Icon>
              <BookOpen />
            </Icon>{" "}
            Try resizing to mobile width.{" "}
            <Icon>
              <Palette />
            </Icon>{" "}
            Hover "Product" for the rich dropdown.
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        aria-hidden="true"
        className="size-6 rounded-md bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-500"
      />
      <span className="font-semibold text-foreground tracking-tight">
        Craftled
      </span>
    </span>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex size-4 items-center justify-center">
      {children}
    </span>
  );
}
