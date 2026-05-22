"use client"

import * as React from "react"
import { HalftoneDots } from "@paper-design/shaders-react"

import { cn } from "@/lib/utils"

export type FeaturedHalftoneDotsProps = {
  image: string
  imageAlt?: string
  title?: React.ReactNode
  eyebrow?: React.ReactNode
  titleClassName?: string
  /** Dot rendering style. */
  type?: "classic" | "gooey" | "holes" | "soft"
  /** Grid pattern. */
  grid?: "square" | "hex"
  /** Grid size relative to image (0-1). */
  size?: number
  /** Max dot size relative to cell (0-2). */
  radius?: number
  /** Image contrast (0-1). */
  contrast?: number
  /** Paper / background color. */
  colorBack?: string
  /** Dot color. */
  colorFront?: string
  /** Use the image's actual colors instead of colorFront. */
  originalColors?: boolean
  /** Invert image luminance. */
  inverted?: boolean
  /** Grain distortion on dot edges (0-1). */
  grainMixer?: number
  /** Black/white grain overlay (0-1). */
  grainOverlay?: number
  /** Grain scale (0-1). */
  grainSize?: number
  aspectRatio?: string
  className?: string
}

export function FeaturedHalftoneDots({
  image,
  imageAlt: _imageAlt,
  title,
  eyebrow,
  titleClassName = "text-stone-900",
  type = "gooey",
  grid = "hex",
  size = 0.5,
  radius = 1.25,
  contrast = 0.4,
  colorBack = "#f2f1e8",
  colorFront = "#2b2b2b",
  originalColors = false,
  inverted = false,
  grainMixer = 0.2,
  grainOverlay = 0.2,
  grainSize = 0.5,
  aspectRatio = "16/9",
  className,
}: FeaturedHalftoneDotsProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-stone-100",
        className
      )}
      style={{ aspectRatio }}
    >
      <HalftoneDots
        image={image}
        type={type}
        grid={grid}
        size={size}
        radius={radius}
        contrast={contrast}
        colorBack={colorBack}
        colorFront={colorFront}
        originalColors={originalColors}
        inverted={inverted}
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        grainSize={grainSize}
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
