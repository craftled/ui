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
  /** Diameter of the orbital circle in pixels. Default 560. */
  circleDiameter?: number
  className?: string
}

export function FeaturedIntegrations({
  label,
  title,
  description,
  icons,
  iconSize = 56,
  circleDiameter = 560,
  className,
}: FeaturedIntegrationsProps) {
  return (
    <article
      className={cn(
        "bg-background text-foreground relative size-full overflow-hidden",
        className
      )}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: circleDiameter, height: circleDiameter }}
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
            strokeWidth="0.25"
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

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          {label ? (
            <p className="text-muted-foreground mb-3 text-xl">{label}</p>
          ) : null}
          <div className="text-6xl leading-[1.02] font-bold tracking-tight text-balance">
            {title}
          </div>
          {description ? (
            <p className="text-muted-foreground mt-6 max-w-md text-xl leading-snug text-balance">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
