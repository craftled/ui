"use client";

import { Check, ChevronDown } from "lucide-react";
import * as React from "react";

import { useBrand } from "@/components/brand-provider";
import { cn } from "@/lib/utils";

function BrandMark({ brandId }: { brandId: string }) {
  if (brandId === "elevenlabs") {
    return (
      <span
        aria-hidden
        className="size-6 shrink-0 rounded-md bg-linear-to-br from-[#0447ff] to-[#ff4704] shadow-sm ring-1 ring-black/5"
      />
    );
  }

  return (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-sidebar-primary font-mono text-[10px] text-sidebar-primary-foreground shadow-sm ring-1 ring-black/5">
      C
    </span>
  );
}

export function BrandSwitcher({
  className,
  onClose,
}: {
  className?: string;
  onClose?: () => void;
}) {
  const { brand, brands, setBrandId } = useBrand();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={cn("relative min-w-0", className)} ref={rootRef}>
      <button
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition-colors hover:bg-sidebar-accent"
        onClick={() => setOpen((v) => !v)}
        type="button"
      >
        <BrandMark brandId={brand.id} />
        <span className="min-w-0 flex-1 truncate font-medium text-sidebar-foreground text-sm">
          {brand.label}
        </span>
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open ? (
        <div
          className="absolute top-full right-0 left-0 z-50 mt-1 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md"
          role="listbox"
        >
          {brands.map((item) => {
            const selected = item.id === brand.id;
            return (
              <button
                aria-selected={selected}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors",
                  selected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent/60"
                )}
                key={item.id}
                onClick={() => {
                  setBrandId(item.id);
                  setOpen(false);
                  onClose?.();
                }}
                role="option"
                type="button"
              >
                <BrandMark brandId={item.id} />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                {selected ? (
                  <Check className="size-3.5 shrink-0 opacity-70" />
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
