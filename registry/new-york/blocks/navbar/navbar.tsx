"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/registry/new-york/ui/accordion";
import { Button } from "@/registry/new-york/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/registry/new-york/ui/navigation-menu";

/**
 * A single nav link. If `items` is provided, the link renders as a dropdown
 * trigger; otherwise it's a flat top-level link.
 */
export type NavbarLink = {
  label: string;
  href: string;
  items?: NavbarDropdownItem[];
};

/**
 * A row inside a dropdown panel. `icon` is optional — when present, the
 * item renders as a rich card (icon + title + description).
 */
export type NavbarDropdownItem = {
  label: string;
  href: string;
  description?: string;
  icon?: React.ReactNode;
};

export type NavbarCta = {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export type NavbarProps = {
  /** Brand mark — pass any node (logo SVG, wordmark, etc.) */
  brand: React.ReactNode;
  /** Brand link target (typically "/") */
  brandHref?: string;
  /** Accessible name for the brand link */
  brandLabel?: string;
  /** Center nav links */
  links: NavbarLink[];
  /** Right-side CTA buttons (rendered in order) */
  ctas?: NavbarCta[];
  /** Optional element rendered after the CTAs (e.g. a theme toggle) */
  trailing?: React.ReactNode;
  /** Tailwind classes for the outer header */
  className?: string;
  /** Pixel offset from top — useful when a banner sits above the navbar */
  topOffset?: number;
  /** Max width of the centered container */
  maxWidthClassName?: string;
  /**
   * Positioning strategy:
   * - "fixed" (default) — locks to the viewport top (standard page navbar).
   * - "absolute" — locks to the nearest positioned ancestor. Useful for
   *   showcasing the navbar inside a card on the page.
   * - "sticky" — stays in-flow until it hits the top.
   * - "static" — fully in-flow.
   */
  position?: "fixed" | "absolute" | "sticky" | "static";
};

/**
 * Sticky top navbar with scroll-aware backdrop blur, centered nav with
 * NavigationMenu dropdowns, CTA buttons, and a mobile menu using Accordion.
 *
 * Visual lineage: the long-running navbar shipped on epigraphmedia.com and
 * its sister sites, ported to a self-contained block with a clean prop API.
 */
export function Navbar({
  brand,
  brandHref = "/",
  brandLabel = "Home",
  links,
  ctas,
  trailing,
  className,
  topOffset = 0,
  maxWidthClassName = "max-w-6xl",
  position = "fixed",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isScrolled = useIsScrolled();
  useBodyScrollLock(isMobileMenuOpen && position === "fixed");

  const positionClass = {
    fixed: "fixed inset-x-0 z-50",
    absolute: "absolute inset-x-0 z-50",
    sticky: "sticky top-0 z-50",
    static: "static",
  }[position];

  return (
    <header
      className={cn(
        positionClass,
        "border-foreground/5 border-b transition-all duration-300",
        "in-data-scrolled:bg-background/75 in-data-scrolled:backdrop-blur",
        isMobileMenuOpen && "max-lg:h-screen max-lg:overflow-hidden",
        isMobileMenuOpen && "bg-background/75 backdrop-blur",
        className
      )}
      data-state={isMobileMenuOpen ? "active" : "inactive"}
      style={position === "fixed" ? { top: topOffset } : undefined}
      {...(isScrolled && { "data-scrolled": true })}
    >
      <div
        className={cn(
          "relative mx-auto px-6",
          "before:absolute before:inset-y-0 before:-left-px before:w-px before:bg-foreground/8 before:content-['']",
          "after:absolute after:inset-y-0 after:-right-px after:w-px after:bg-foreground/8 after:content-['']",
          maxWidthClassName
        )}
      >
        <div className="relative flex h-14 flex-wrap items-center justify-between lg:h-auto lg:py-5">
          {/* Brand + mobile menu trigger */}
          <div className="flex w-full items-center justify-between gap-8 lg:w-auto">
            <Link
              aria-label={brandLabel}
              className="flex items-center"
              href={brandHref}
            >
              {brand}
            </Link>

            <button
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="relative z-20 -m-2.5 -mr-3 block cursor-pointer p-2.5 lg:hidden"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              type="button"
            >
              <Menu className="m-auto size-5 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 duration-200" />
              <X className="absolute inset-0 m-auto size-5 -rotate-180 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 scale-0 in-data-[state=active]:opacity-100 opacity-0 duration-200" />
            </button>
          </div>

          {/* Desktop center nav */}
          <div className="absolute inset-0 m-auto hidden size-fit lg:block">
            <DesktopMenu links={links} />
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="w-full pb-6 lg:hidden">
              <MobileMenu
                closeMenu={() => setIsMobileMenuOpen(false)}
                links={links}
              />
            </div>
          )}

          {/* Right rail */}
          <div className="in-data-[state=active]:flex hidden w-full flex-wrap items-center justify-end gap-3 lg:flex lg:w-fit">
            {ctas?.map((cta) => (
              <Button
                asChild
                key={`${cta.label}-${cta.href}`}
                size="sm"
                variant={cta.variant ?? "default"}
              >
                <Link href={cta.href}>{cta.label}</Link>
              </Button>
            ))}
            {trailing}
          </div>
        </div>
      </div>
    </header>
  );
}

// ───────── Desktop menu ─────────

function DesktopMenu({ links }: { links: NavbarLink[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-1">
        {links.map((link) => {
          if (link.items && link.items.length > 0) {
            const hasRichItems = link.items.some(
              (i) => i.icon || i.description
            );
            return (
              <NavigationMenuItem key={`${link.label}-${link.href}`}>
                <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul
                    className={cn(
                      "grid gap-1 p-2",
                      hasRichItems
                        ? "w-[420px] sm:w-[620px] sm:grid-cols-2"
                        : "w-[260px]"
                    )}
                  >
                    {link.items.map((item) => (
                      <DropdownRow
                        item={item}
                        key={`${item.label}-${item.href}`}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          }

          return (
            <NavigationMenuItem key={`${link.label}-${link.href}`}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={link.href}>{link.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function DropdownRow({ item }: { item: NavbarDropdownItem }) {
  const isRich = Boolean(item.icon || item.description);

  if (!isRich) {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link href={item.href}>
            <span className="font-medium text-foreground text-sm">
              {item.label}
            </span>
          </Link>
        </NavigationMenuLink>
      </li>
    );
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className="grid grid-cols-[auto_1fr] gap-3 rounded-md p-2"
          href={item.href}
        >
          {item.icon && (
            <div className="flex size-10 items-center justify-center rounded border bg-card shadow-sm ring-1 ring-foreground/10">
              {item.icon}
            </div>
          )}
          <div className="min-w-0">
            <div className="truncate font-medium text-foreground text-sm">
              {item.label}
            </div>
            {item.description && (
              <p className="line-clamp-1 text-muted-foreground text-xs">
                {item.description}
              </p>
            )}
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

// ───────── Mobile menu ─────────

function MobileMenu({
  links,
  closeMenu,
}: {
  links: NavbarLink[];
  closeMenu: () => void;
}) {
  return (
    <nav className="w-full">
      <Accordion
        className="-mx-4 mt-0.5 space-y-0.5 **:hover:no-underline"
        collapsible
        type="single"
      >
        {links.map((link) => {
          if (link.items && link.items.length > 0) {
            return (
              <AccordionItem
                className="group relative border-b-0"
                key={`${link.label}-${link.href}`}
                value={link.label}
              >
                <AccordionTrigger className="flex items-center justify-between px-4 py-3 text-lg **:font-normal! data-[state=open]:bg-muted">
                  {link.label}
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <ul>
                    {link.items.map((item) => (
                      <li key={`${item.label}-${item.href}`}>
                        <Link
                          className="grid grid-cols-[auto_1fr] items-center gap-2.5 px-4 py-2"
                          href={item.href}
                          onClick={closeMenu}
                        >
                          {item.icon && (
                            <div
                              aria-hidden="true"
                              className="flex items-center justify-center *:size-4"
                            >
                              {item.icon}
                            </div>
                          )}
                          <div className="text-base">{item.label}</div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            );
          }

          return (
            <Link
              className="group relative block py-4 text-lg"
              href={link.href}
              key={`${link.label}-${link.href}`}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          );
        })}
      </Accordion>
    </nav>
  );
}

// ───────── Hooks ─────────

function useIsScrolled(): boolean {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    let rafId: number | null = null;
    let lastValue = false;

    const update = () => {
      rafId = null;
      const nextValue = window.scrollY > 5;
      if (nextValue !== lastValue) {
        lastValue = nextValue;
        setIsScrolled(nextValue);
      }
    };

    const onScroll = () => {
      if (rafId != null) {
        return;
      }
      rafId = window.requestAnimationFrame(update);
    };

    update();

    const scrollOptions = { passive: true } as EventListenerOptions;
    window.addEventListener("scroll", onScroll, scrollOptions);

    return () => {
      if (rafId != null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", onScroll, scrollOptions);
    };
  }, []);

  return isScrolled;
}

function useBodyScrollLock(locked: boolean) {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    if (locked) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [locked]);
}
