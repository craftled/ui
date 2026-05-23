import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { Navbar } from "@/registry/new-york/blocks/navbar/navbar";

/**
 * Site-wide top navigation. Dogfoods the Navbar block from our own
 * registry so every page is a live demo of the component visitors can
 * install. The trailing slot carries the GitHub icon link + theme toggle.
 */
export function SiteHeader() {
  return (
    <Navbar
      brand={<BrandMark />}
      brandHref="/"
      brandLabel="Craftled UI home"
      links={[
        { label: "Components", href: "/" },
        { label: "Compose", href: "/compose" },
      ]}
      position="sticky"
      trailing={
        <>
          <Link
            aria-label="GitHub"
            className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/craftled/ui"
            rel="noreferrer"
            target="_blank"
          >
            <GithubMark className="size-4" />
          </Link>
          <ThemeToggle />
        </>
      }
    />
  );
}

function BrandMark() {
  return (
    <span className="flex items-center gap-2 font-semibold text-sm tracking-tight">
      <span className="flex size-5 items-center justify-center rounded-sm bg-foreground font-mono text-[10px] text-background">
        C
      </span>
      Craftled UI
    </span>
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
