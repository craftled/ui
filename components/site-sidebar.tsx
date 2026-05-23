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
        <nav className="flex flex-col gap-6">
          {groups.map((group) => (
            <div className="flex flex-col gap-1" key={group.title}>
              <h4 className="mb-1 px-2 font-semibold text-foreground text-sm">
                {group.title}
              </h4>
              {group.links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    className={cn(
                      "rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    href={link.href}
                    key={link.href}
                  >
                    {link.title}
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
