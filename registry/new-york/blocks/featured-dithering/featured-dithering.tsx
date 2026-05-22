"use client"

import * as React from "react"
import { ImageDithering } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

export type FeaturedDitheringProps = {
  image: string
  imageAlt?: string
  title?: React.ReactNode
  eyebrow?: React.ReactNode
  titleClassName?: string
  /** Dithering pattern. */
  type?: "random" | "2x2" | "4x4" | "8x8"
  /** Pixel grid size, 0.5–20. */
  size?: number
  /** Number of palette colors, 1–7. */
  colorSteps?: number
  /** Background color (paper). */
  colorBack?: string
  /** Foreground color (ink). */
  colorFront?: string
  /** Secondary foreground (set to colorFront for classic 2-color dithering). */
  colorHighlight?: string
  /** Use the image's actual colors instead of the palette. */
  originalColors?: boolean
  /** Invert the image luminance. */
  inverted?: boolean
  aspectRatio?: string
  className?: string
}

export function FeaturedDithering({
  image,
  imageAlt: _imageAlt,
  title,
  eyebrow,
  titleClassName = "text-white",
  type = "8x8",
  size = 2,
  colorSteps = 2,
  colorBack = "#000c38",
  colorFront = "#94ffaf",
  colorHighlight = "#eaff94",
  originalColors = false,
  inverted = false,
  aspectRatio = "16/9",
  className,
}: FeaturedDitheringProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <ImageDithering
        image={image}
        type={type}
        size={size}
        colorSteps={colorSteps}
        colorBack={colorBack}
        colorFront={colorFront}
        colorHighlight={colorHighlight}
        originalColors={originalColors}
        inverted={inverted}
        fit="cover"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {title || eyebrow ? (
        <figcaption className="absolute right-4 bottom-4 left-4 flex flex-col gap-1">
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
