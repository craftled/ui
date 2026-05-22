"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

export type FeaturedStoryProps = {
  image: string
  imageAlt?: string
  /** Top-left: customer logo. Slot — pass any ReactNode. */
  brandLogo?: React.ReactNode
  /** Top-right: small icon (e.g. content type). Slot — pass any ReactNode. */
  brandIcon?: React.ReactNode
  title: string
  ctaLabel?: string
  /** When set, the whole card becomes an <a>. */
  href?: string
  onClick?: () => void
  /**
   * Customer brand color. Drives the duotone tint over the image and the
   * solid color at the bottom. Anything CSS accepts: "#FF6B1A", "rgb(...)",
   * "var(--brand)".
   */
  brandColor?: string
  className?: string
}

export function FeaturedStory({
  image,
  imageAlt = "",
  brandLogo,
  brandIcon,
  title,
  ctaLabel = "Read story",
  href,
  onClick,
  brandColor = "#F97316",
  className,
}: FeaturedStoryProps) {
  const content = (
    <>
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div
        className="absolute inset-0 -z-20 mix-blend-multiply"
        style={{ backgroundColor: brandColor }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to bottom, transparent 35%, ${brandColor} 92%)`,
        }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4 p-7 sm:p-9">
        {brandLogo ? <div className="text-white">{brandLogo}</div> : <span />}
        {brandIcon ? <div className="text-white">{brandIcon}</div> : null}
      </div>

      <div className="mt-auto flex flex-col gap-4 p-7 sm:p-9">
        <h3 className="max-w-[80%] text-2xl leading-[1.15] font-semibold tracking-tight text-balance text-white sm:text-3xl">
          {title}
        </h3>
        {ctaLabel ? (
          <div
            className={cn(
              "text-sm font-medium text-white",
              "translate-y-1 opacity-0 transition-all duration-300 ease-out",
              "group-hover:translate-y-0 group-hover:opacity-100",
              "group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            )}
          >
            <span className="inline-flex items-center gap-2">
              {ctaLabel}
              <ArrowRight className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </span>
          </div>
        ) : null}
      </div>
    </>
  )

  const shared = cn(
    "group relative isolate flex aspect-[16/9] flex-col overflow-hidden rounded-2xl",
    "transition-shadow duration-300 hover:shadow-2xl",
    className
  )

  if (href) {
    return (
      <a href={href} className={shared} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <div role={onClick ? "button" : undefined} className={shared} onClick={onClick}>
      {content}
    </div>
  )
}
