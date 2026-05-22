"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type FeaturedHalftoneProps = {
  image: string
  imageAlt?: string
  /** Title overlay (bottom-left). */
  title?: React.ReactNode
  /** Optional small label rendered above the title. */
  eyebrow?: React.ReactNode
  /** Halftone dot pitch in px. Default 4. */
  dotSize?: number
  /** Dot fill opacity, 0-1. Default 0.45. */
  dotIntensity?: number
  /** CSS filter on the image. Default: warm risograph treatment. */
  imageFilter?: string
  /** Aspect ratio. Default "1/1". */
  aspectRatio?: string
  /** Title text color class. Default text-white. */
  titleClassName?: string
  className?: string
}

const DEFAULT_FILTER =
  "contrast(1.35) saturate(1.2) sepia(0.12) brightness(0.95)"

export function FeaturedHalftone({
  image,
  imageAlt = "",
  title,
  eyebrow,
  dotSize = 4,
  dotIntensity = 0.45,
  imageFilter = DEFAULT_FILTER,
  aspectRatio = "1/1",
  titleClassName = "text-white",
  className,
}: FeaturedHalftoneProps) {
  const dotRadius = dotSize / 4
  const dotPattern = `radial-gradient(circle, rgba(0,0,0,${dotIntensity}) ${dotRadius}px, transparent ${dotRadius + 0.5}px)`

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-stone-100",
        className
      )}
      style={{ aspectRatio }}
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
        style={{ filter: imageFilter }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-multiply"
        style={{
          backgroundImage: dotPattern,
          backgroundSize: `${dotSize}px ${dotSize}px`,
        }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-60"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,${dotIntensity * 0.5}) ${dotRadius / 2}px, transparent ${dotRadius + 0.5}px)`,
          backgroundSize: `${dotSize * 1.4}px ${dotSize * 1.4}px`,
          backgroundPosition: `${dotSize / 2}px ${dotSize / 2}px`,
        }}
      />

      {title || eyebrow ? (
        <figcaption className="absolute right-4 bottom-4 left-4 flex flex-col gap-1">
          {eyebrow ? (
            <span className={cn("text-xs font-medium opacity-80", titleClassName)}>
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
