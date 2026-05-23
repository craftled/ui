"use client";

import { ArrowRight, Sparkles, Wand2, Wrench } from "lucide-react";
import type * as React from "react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./navigation-menu";

export default function NavigationMenuDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Group label="Simple">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Components</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-2 p-2 sm:w-[500px]">
                  <NavigationMenuLink href="#button">
                    <div className="font-medium text-foreground text-sm">
                      Button
                    </div>
                    <p className="line-clamp-1 text-muted-foreground text-xs">
                      Variants, sizes, and icon-only modes.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#card">
                    <div className="font-medium text-foreground text-sm">
                      Card
                    </div>
                    <p className="line-clamp-1 text-muted-foreground text-xs">
                      Surface with header, content, footer slots.
                    </p>
                  </NavigationMenuLink>
                  <NavigationMenuLink href="#chart">
                    <div className="font-medium text-foreground text-sm">
                      Chart
                    </div>
                    <p className="line-clamp-1 text-muted-foreground text-xs">
                      Recharts wrapper with theme config.
                    </p>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="#docs"
              >
                Docs
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="#pricing"
              >
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Group>

      <Group label="Rich dropdown — icon + title + description">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] grid-cols-1 gap-1 p-2 sm:w-[600px] sm:grid-cols-2">
                  <RichItem
                    description="High-contrast variants for marketing pages."
                    href="#shaders"
                    icon={<Sparkles />}
                    title="Shaders"
                  />
                  <RichItem
                    description="Dashboards, CTAs, testimonials, charts."
                    href="#blocks"
                    icon={<Wand2 />}
                    title="Blocks"
                  />
                  <RichItem
                    description="Drop-in shadcn-style atomic components."
                    href="#primitives"
                    icon={<Wrench />}
                    title="Primitives"
                  />
                  <RichItem
                    description="One copy/paste install via the shadcn CLI."
                    href="#install"
                    icon={<ArrowRight />}
                    title="Install"
                  />
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Group>
    </div>
  );
}

function RichItem({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          className="grid grid-cols-[auto_1fr] gap-3 rounded-md p-2"
          href={href}
        >
          <div className="flex size-10 items-center justify-center rounded border bg-card shadow-sm ring-1 ring-foreground/10">
            {icon}
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium text-foreground text-sm">
              {title}
            </div>
            <p className="line-clamp-1 text-muted-foreground text-xs">
              {description}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
