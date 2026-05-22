"use client"

import * as React from "react"
import { ColorPanels } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

export type FeaturedColorPanelsProps = {
  /** Up to 7 colors. */
  colors?: string[]
  /** Background color. */
  colorBack?: string
  /** Angle between panels (0.25-7). */
  density?: number
  /** Skew angle (-1 to 1). */
  angle1?: number
  /** Skew angle (-1 to 1). */
  angle2?: number
  /** Panel length relative to height (0-3). */
  length?: number
  /** Color highlight on panel edges. */
  edges?: boolean
  /** Side blur, 0 = sharp (0-0.5). */
  blur?: number
  /** Transparency near central axis (0-1). */
  fadeIn?: number
  /** Transparency near viewer (0-1). */
  fadeOut?: number
  /** Color mixing within a panel, 0 = solid, 1 = gradient (0-1). */
  gradient?: number
  /** Animation speed multiplier. 0 = static. */
  speed?: number
  /** Zoom, 0.01-4. */
  scale?: number
  /** Rotation in degrees, 0-360. */
  rotation?: number
  /** Horizontal offset (-1 to 1). */
  offsetX?: number
  /** Vertical offset (-1 to 1). */
  offsetY?: number
  title?: React.ReactNode
  eyebrow?: React.ReactNode
  titleClassName?: string
  children?: React.ReactNode
  aspectRatio?: string
  className?: string
}

const DEFAULT_COLORS = [
  "#ff9d00",
  "#fd4f30",
  "#809bff",
  "#6d2eff",
  "#333aff",
  "#f15cff",
  "#ffd557",
]

export function FeaturedColorPanels({
  colors = DEFAULT_COLORS,
  colorBack = "#000000",
  density = 3,
  angle1 = 0,
  angle2 = 0,
  length = 1.1,
  edges = false,
  blur = 0,
  fadeIn = 1,
  fadeOut = 0.3,
  gradient = 0,
  speed = 0.5,
  scale = 0.8,
  rotation = 0,
  offsetX = 0,
  offsetY = 0,
  title,
  eyebrow,
  titleClassName = "text-white",
  children,
  aspectRatio = "16/9",
  className,
}: FeaturedColorPanelsProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <ColorPanels
        colors={colors}
        colorBack={colorBack}
        density={density}
        angle1={angle1}
        angle2={angle2}
        length={length}
        edges={edges}
        blur={blur}
        fadeIn={fadeIn}
        fadeOut={fadeOut}
        gradient={gradient}
        speed={speed}
        scale={scale}
        rotation={rotation}
        offsetX={offsetX}
        offsetY={offsetY}
        fit="cover"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {children ? (
        <div className="relative z-10 size-full">{children}</div>
      ) : null}

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
