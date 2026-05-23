"use client"

import * as React from "react"
import { StaticMeshGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

export type FeaturedLogoSpotlightProps = {
  /** Logo content — img, svg, monogram, anything. Rendered inside a circular mask. */
  logo: React.ReactNode
  /** Pixel diameter of the logo disc. Default 96. */
  logoSize?: number
  /** Pixel padding around the logo to form the halo. Default 16. */
  haloPadding?: number
  /** Override the halo container classes. */
  haloClassName?: string
  /** Mesh gradient colors (up to 10). */
  colors?: string[]
  /** Mesh placement seed (0-100). */
  positions?: number
  waveX?: number
  waveXShift?: number
  waveY?: number
  waveYShift?: number
  mixing?: number
  rotation?: number
  /** Animation speed. 0 = static (default — best for export). */
  speed?: number
  title?: React.ReactNode
  eyebrow?: React.ReactNode
  titleClassName?: string
  /** Card aspect ratio. Default "2/1". */
  aspectRatio?: string
  className?: string
}

const DEFAULT_COLORS = ["#0a0a0a", "#5e1de3", "#dc2626", "#1e3a8a"]

export function FeaturedLogoSpotlight({
  logo,
  logoSize = 96,
  haloPadding = 16,
  haloClassName,
  colors = DEFAULT_COLORS,
  positions = 50,
  waveX = 1,
  waveXShift = 0.3,
  waveY = 1,
  waveYShift = 0.5,
  mixing = 0.85,
  rotation = 30,
  speed = 0,
  title,
  eyebrow,
  titleClassName = "text-white",
  aspectRatio = "2/1",
  className,
}: FeaturedLogoSpotlightProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-950",
        className
      )}
      style={{ aspectRatio }}
    >
      <StaticMeshGradient
        colors={colors}
        positions={positions}
        waveX={waveX}
        waveXShift={waveXShift}
        waveY={waveY}
        waveYShift={waveYShift}
        mixing={mixing}
        rotation={rotation}
        speed={speed}
        fit="cover"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full",
            "bg-black/15 ring-1 ring-white/15 backdrop-blur-[3px]",
            "shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]",
            haloClassName
          )}
          style={{ padding: haloPadding }}
        >
          <div
            className="overflow-hidden rounded-full"
            style={{ width: logoSize, height: logoSize }}
          >
            {logo}
          </div>
        </div>
      </div>

      {title || eyebrow ? (
        <figcaption className="absolute right-4 bottom-4 left-4 z-10 flex flex-col gap-1">
          {eyebrow ? (
            <span
              className={cn(
                "text-xs font-medium opacity-80",
                titleClassName
              )}
            >
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h3
              className={cn(
                "text-2xl leading-tight font-bold tracking-tight sm:text-3xl",
                titleClassName
              )}
            >
              {title}
            </h3>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
