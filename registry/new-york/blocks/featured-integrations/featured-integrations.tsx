"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type FeaturedIntegrationsIcon = {
  /** Anything React — an <img>, an <svg>, a letter monogram, etc. */
  node: React.ReactNode
  /** Accessible name for the orbit item. */
  alt?: string
  /** Override the auto-distributed angle (degrees; 0 = top, clockwise). */
  angle?: number
}

export type FeaturedIntegrationsProps = {
  /** Small eyebrow above the title. */
  label?: React.ReactNode
  /** Headline. Pass JSX to mix muted + emphasized weight. */
  title: React.ReactNode
  /** Optional subtitle below the headline. */
  description?: React.ReactNode
  /** Icons to orbit. If no angles set, they're evenly distributed starting at top. */
  icons: FeaturedIntegrationsIcon[]
  /** Pixel size of each icon card. Default 56. */
  iconSize?: number
  className?: string
}

export function FeaturedIntegrations({
  label,
  title,
  description,
  icons,
  iconSize = 56,
  className,
}: FeaturedIntegrationsProps) {
  return (
    <div
      className={cn(
        "bg-background text-foreground relative mx-auto aspect-square w-full max-w-2xl",
        className
      )}
    >
      <svg
        className="text-border absolute inset-0 size-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <circle
          cx="50"
          cy="50"
          r="49.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.2"
          strokeDasharray="0.6 0.9"
        />
      </svg>

      {icons.map((icon, i) => {
        const angleDeg = icon.angle ?? (i / icons.length) * 360
        const angleRad = ((angleDeg - 90) * Math.PI) / 180
        const x = 50 + Math.cos(angleRad) * 50
        const y = 50 + Math.sin(angleRad) * 50
        return (
          <div
            key={i}
            aria-label={icon.alt}
            className="bg-card border-border absolute flex items-center justify-center overflow-hidden rounded-2xl border shadow-sm"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: iconSize,
              height: iconSize,
              transform: "translate(-50%, -50%)",
            }}
          >
            {icon.node}
          </div>
        )
      })}

      <div className="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
        {label ? (
          <p className="text-muted-foreground mb-2 text-sm">{label}</p>
        ) : null}
        <div className="text-3xl leading-[1.05] font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </div>
        {description ? (
          <p className="text-muted-foreground mt-4 max-w-xs text-sm text-balance">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  )
}
