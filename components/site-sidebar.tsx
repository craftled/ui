"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandSwitcher } from "@/components/brand-switcher";
import { componentNav, type NavGroup, staticNav } from "@/lib/registry";
import { cn } from "@/lib/utils";

export function SiteSidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const groups: NavGroup[] = [...staticNav, ...componentNav];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex min-h-0 w-60 flex-col overflow-hidden border-sidebar-border bg-sidebar transition-transform duration-200 ease-out md:static md:z-auto md:h-full md:translate-x-0 md:border-r",
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-sidebar-border border-b px-3">
        <BrandSwitcher className="min-w-0 flex-1" onClose={onClose} />
        <button
          className="inline-flex size-8 items-center justify-center rounded-md text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground md:hidden"
          onClick={onClose}
          type="button"
        >
          <span className="sr-only">Close menu</span>
          <X className="size-4" />
        </button>
      </div>

      <nav
        aria-label="Components"
        className="min-h-0 flex-1 overflow-y-auto px-3 py-4 text-left"
      >
        <div className="space-y-3">
          {groups.map((group) => (
            <div className="space-y-0.5" key={group.title}>
              <h4 className="flex items-center gap-1.5 px-2 pb-1 font-medium text-[13px] text-muted-foreground uppercase tracking-wide">
                {group.title}
              </h4>
              {group.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    className={cn(
                      "flex min-w-0 items-center gap-1.5 rounded-md py-1 pr-2 pl-4 text-[13px] transition-all",
                      isActive
                        ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                    )}
                    href={link.href}
                    key={link.href}
                    onClick={onClose}
                  >
                    <span className="truncate">{link.title}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
}
