"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { getItem } from "@/lib/registry";

function pageTitle(pathname: string) {
  if (pathname === "/") {
    return "Introduction";
  }
  if (pathname === "/compose") {
    return "Compose";
  }
  if (pathname.startsWith("/preview/")) {
    const name = pathname.slice("/preview/".length);
    return getItem(name)?.title ?? name;
  }
  const segment = pathname.split("/").filter(Boolean).pop() ?? "";
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function SiteTopBar({
  onOpenMobileMenu,
}: {
  onOpenMobileMenu: () => void;
}) {
  const pathname = usePathname();

  return (
    <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3 sm:px-4">
      <button
        className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
        onClick={onOpenMobileMenu}
        type="button"
      >
        <span className="sr-only">Open menu</span>
        <Menu className="size-4" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-sm">{pageTitle(pathname)}</p>
      </div>
      <div className="flex items-center gap-1">
        <Link
          aria-label="GitHub"
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          href="https://github.com/craftled/ui"
          rel="noreferrer"
          target="_blank"
        >
          <GithubMark className="size-4" />
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <title>GitHub</title>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
