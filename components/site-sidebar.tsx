"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { componentNav, type NavGroup, staticNav } from "@/lib/registry";
import { cn } from "@/lib/utils";

export function SiteSidebar() {
  const pathname = usePathname();
  const groups: NavGroup[] = [...staticNav, ...componentNav];

  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto py-8 pr-4">
        <nav aria-label="Components" className="space-y-3 text-left">
          {groups.map((group) => (
            <div className="space-y-0.5" key={group.title}>
              <h4 className="flex items-center gap-1.5 px-2 pb-1 font-medium text-[13px] text-muted-foreground">
                {group.title}
              </h4>
              {group.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    className={cn(
                      "flex min-w-0 items-center gap-1.5 rounded-md px-2 py-1 text-[13px] transition-all",
                      isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    href={link.href}
                    key={link.href}
                  >
                    <span className="truncate">{link.title}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
}
