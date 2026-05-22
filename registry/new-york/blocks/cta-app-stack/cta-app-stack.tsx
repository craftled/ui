"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CtaAppStackLayer = {
  /** Tailwind class(es) for the card background. */
  bg: string
  /** Anything React — an <img>, an <svg>, a letter, a monogram, etc. */
  content?: React.ReactNode
}

export type CtaAppStackProps = {
  tagLabel?: string
  title: string
  stats?: React.ReactNode
  ctaLabel?: string
  ctaHref?: string
  onCtaClick?: () => void
  /** Top → bottom of the stack. First entry is rendered at the front. */
  layers: CtaAppStackLayer[]
  accent?: "rose" | "violet" | "blue" | "emerald" | "amber"
  className?: string
}

const ACCENT_CLASSES = {
  rose: {
    tag: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    button: "bg-rose-500 hover:bg-rose-500/90",
  },
  violet: {
    tag: "border-violet-500/40 bg-violet-500/10 text-violet-300",
    button: "bg-violet-500 hover:bg-violet-500/90",
  },
  blue: {
    tag: "border-blue-500/40 bg-blue-500/10 text-blue-300",
    button: "bg-blue-500 hover:bg-blue-500/90",
  },
  emerald: {
    tag: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    button: "bg-emerald-500 hover:bg-emerald-500/90",
  },
  amber: {
    tag: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    button: "bg-amber-500 hover:bg-amber-500/90",
  },
} as const

const REST_GAP = 44
const HOVER_GAP = 56
const REST_ROTATE = { x: 58, z: -32 }
const HOVER_ROTATE = { x: 56, z: -28 }

export function CtaAppStack({
  tagLabel,
  title,
  stats,
  ctaLabel = "Learn more",
  ctaHref,
  onCtaClick,
  layers,
  accent = "rose",
  className,
}: CtaAppStackProps) {
  const [hovered, setHovered] = React.useState(false)
  const tone = ACCENT_CLASSES[accent]
  const gap = hovered ? HOVER_GAP : REST_GAP
  const rot = hovered ? HOVER_ROTATE : REST_ROTATE

  const cta = (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold text-white",
        "transition-colors",
        tone.button
      )}
    >
      {ctaLabel}
    </span>
  )

  return (
    <section
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl text-white",
        "bg-[radial-gradient(circle_at_85%_50%,rgba(120,40,80,0.45),transparent_55%),linear-gradient(135deg,#1a0a1f_0%,#0a0a0a_60%)]",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-8 p-8 sm:p-12 md:grid-cols-[1fr_1fr] md:items-center md:gap-4">
        <div className="flex flex-col gap-5">
          {tagLabel ? (
            <span
              className={cn(
                "inline-flex items-center self-start rounded-full border px-3 py-0.5 text-sm font-medium",
                tone.tag
              )}
            >
              {tagLabel}
            </span>
          ) : null}
          <h2 className="text-3xl leading-[1.05] font-bold tracking-tight text-balance sm:text-4xl">
            {title}
          </h2>
          {stats ? (
            <p className="text-base text-white/60">{stats}</p>
          ) : null}
          <div className="mt-1">
            {ctaHref ? (
              <a href={ctaHref} onClick={onCtaClick} className="inline-flex">
                {cta}
              </a>
            ) : (
              <button type="button" onClick={onCtaClick}>
                {cta}
              </button>
            )}
          </div>
        </div>

        <div
          aria-hidden
          className="relative mx-auto h-80 w-80"
          style={{ perspective: "1200px" }}
        >
          <div
            className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${rot.x}deg) rotateZ(${rot.z}deg)`,
            }}
          >
            {layers.map((layer, i) => {
              const fromBottom = layers.length - 1 - i
              const z = fromBottom * gap
              return (
                <div
                  key={i}
                  className={cn(
                    "absolute top-1/2 left-1/2 flex size-36 items-center justify-center overflow-hidden rounded-[22%]",
                    "shadow-[0_30px_60px_-15px_rgba(0,0,0,0.55)]",
                    "transition-transform duration-500 ease-out will-change-transform",
                    layer.bg
                  )}
                  style={{
                    transform: `translate(-50%, -50%) translateZ(${z}px)`,
                  }}
                >
                  {layer.content}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
