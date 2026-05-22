"use client"

import * as React from "react"
import { GrainGradient } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

export type FeaturedGrainGradientProps = {
  /** Up to 7 colors. */
  colors?: string[]
  /** Background color. */
  colorBack?: string
  /** Shape variant. */
  shape?:
    | "wave"
    | "dots"
    | "truchet"
    | "corners"
    | "ripple"
    | "blob"
    | "sphere"
  /** Color transition smoothness, 0-1. */
  softness?: number
  /** Distortion strength, 0-1. */
  intensity?: number
  /** Grain noise overlay, 0-1. */
  noise?: number
  /** Animation speed multiplier. 0 = static. */
  speed?: number
  /** Zoom, 0.01-4. */
  scale?: number
  /** Rotation in degrees, 0-360. */
  rotation?: number
  /** Title overlay (bottom-left). */
  title?: React.ReactNode
  /** Small label above title. */
  eyebrow?: React.ReactNode
  titleClassName?: string
  /** Optional arbitrary content rendered over the gradient. */
  children?: React.ReactNode
  /** Aspect ratio, default "16/9". */
  aspectRatio?: string
  className?: string
}

const DEFAULT_COLORS = ["#7300ff", "#eba8ff", "#00bfff", "#2a00ff"]

export function FeaturedGrainGradient({
  colors = DEFAULT_COLORS,
  colorBack = "#000000",
  shape = "corners",
  softness = 0.5,
  intensity = 0.5,
  noise = 0.25,
  speed = 1,
  scale = 1,
  rotation = 0,
  title,
  eyebrow,
  titleClassName = "text-white",
  children,
  aspectRatio = "16/9",
  className,
}: FeaturedGrainGradientProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <GrainGradient
        colors={colors}
        colorBack={colorBack}
        shape={shape}
        softness={softness}
        intensity={intensity}
        noise={noise}
        speed={speed}
        scale={scale}
        rotation={rotation}
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
