"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { componentNav, staticNav, type NavGroup } from "@/lib/registry"

export function SiteSidebar() {
  const pathname = usePathname()
  const groups: NavGroup[] = [...staticNav, ...componentNav]

  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="sticky top-14 h-[calc(100svh-3.5rem)] overflow-y-auto py-8 pr-4">
        <nav className="flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.title} className="flex flex-col gap-1">
              <h4 className="text-foreground mb-1 px-2 text-sm font-semibold">
                {group.title}
              </h4>
              {group.links.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-muted text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.title}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
