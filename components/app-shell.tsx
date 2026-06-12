"use client";

import { usePathname } from "next/navigation";
import * as React from "react";
import { SiteSidebar } from "@/components/site-sidebar";
import { SiteTopBar } from "@/components/site-top-bar";
import { VariantPanelSidebar } from "@/components/variant-panel-sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLElement>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  // Route changes reset scroll position and close the mobile drawer.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the route-change trigger
  React.useEffect(() => {
    setMobileOpen(false);
    mainRef.current?.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="fixed inset-0 flex min-h-0 overflow-hidden bg-muted/40">
      {mobileOpen ? (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          type="button"
        />
      ) : null}
      <SiteSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-background md:my-2 md:mr-2 md:rounded-xl md:border md:shadow-sm">
        <SiteTopBar onOpenMobileMenu={() => setMobileOpen(true)} />
        <div className="flex min-h-0 min-w-0 flex-1">
          <main
            className={
              mobileOpen
                ? "min-h-0 min-w-0 flex-1 overflow-hidden"
                : "min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
            }
            ref={mainRef}
          >
            {children}
          </main>
          <VariantPanelSidebar />
        </div>
      </div>
    </div>
  );
}
