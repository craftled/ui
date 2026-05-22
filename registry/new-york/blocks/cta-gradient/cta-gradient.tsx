"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export type CtaGradientProps = {
  title: string
  bullets: string[]
  ctaLabel: string
  ctaHref?: string
  onCtaClick?: () => void
  className?: string
}

export function CtaGradient({
  title,
  bullets,
  ctaLabel,
  ctaHref,
  onCtaClick,
  className,
}: CtaGradientProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-7 rounded-3xl bg-zinc-950 p-8 text-white",
        className
      )}
    >
      <h3 className="text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
        {title}
      </h3>
      <ul className="flex flex-col gap-3.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-center gap-3">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/30">
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="text-base text-white/95">{b}</span>
          </li>
        ))}
      </ul>
      {ctaHref ? (
        <a
          href={ctaHref}
          onClick={onCtaClick}
          className={CTA_CLASSES}
        >
          {ctaLabel}
        </a>
      ) : (
        <button
          type="button"
          onClick={onCtaClick}
          className={CTA_CLASSES}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  )
}

const CTA_CLASSES =
  "inline-flex h-14 w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 via-fuchsia-500 to-rose-500 text-lg font-semibold text-white transition-transform hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
