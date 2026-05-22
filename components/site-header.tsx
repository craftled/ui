import Link from "next/link"
import { Github } from "lucide-react"

import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  return (
    <header className="bg-background/80 sticky top-0 z-40 w-full border-b backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="bg-foreground text-background flex size-5 items-center justify-center rounded-sm font-mono text-[10px]">
            C
          </span>
          Craftled UI
        </Link>
        <nav className="text-muted-foreground ml-auto flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="hover:text-foreground transition-colors"
          >
            Components
          </Link>
          <a
            href="https://github.com/craftled/ui"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground inline-flex items-center gap-1.5 transition-colors"
            aria-label="GitHub"
          >
            <Github className="size-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
