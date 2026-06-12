"use client";

import { usePathname } from "next/navigation";

import { useBrandOptional } from "@/components/brand-provider";

export function VariantPanelSidebar() {
  const pathname = usePathname();
  const brandCtx = useBrandOptional();
  const onPreview = pathname?.startsWith("/preview/") ?? false;

  if (!onPreview) {
    return null;
  }

  return (
    <aside
      aria-label="Variants"
      className="hidden w-72 shrink-0 flex-col border-l bg-muted/30 lg:flex"
    >
      <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-b px-3">
        <span className="font-medium text-[11px] text-muted-foreground uppercase tracking-wide">
          Variants
        </span>
        {brandCtx ? (
          <span className="truncate text-[10px] text-muted-foreground/80">
            {brandCtx.brand.label}
          </span>
        ) : null}
      </div>
      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain px-3 py-3"
        id="variant-panel-mount"
      />
    </aside>
  );
}
