"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import {
  FeaturedMeshGradient,
  type FeaturedMeshGradientProps,
} from "@/registry/new-york/blocks/featured-mesh-gradient/featured-mesh-gradient"

export type FeaturedLogoSpotlightProps = Omit<
  FeaturedMeshGradientProps,
  "children"
> & {
  /** Logo content — img, svg, monogram, anything. Rendered inside a circular mask. */
  logo: React.ReactNode
  /** Pixel diameter of the logo disc. Default 96. */
  logoSize?: number
  /** Pixel padding around the logo to form the halo. Default 16. */
  haloPadding?: number
  /** Override the halo container classes. */
  haloClassName?: string
}

const SPOTLIGHT_COLORS = ["#0a0a0a", "#5e1de3", "#dc2626", "#1e3a8a"]

export function FeaturedLogoSpotlight({
  logo,
  logoSize = 96,
  haloPadding = 16,
  haloClassName,
  colors = SPOTLIGHT_COLORS,
  positions = 50,
  waveX = 1,
  waveXShift = 0.3,
  waveY = 1,
  waveYShift = 0.5,
  mixing = 0.85,
  rotation = 30,
  speed = 0,
  aspectRatio = "2/1",
  ...rest
}: FeaturedLogoSpotlightProps) {
  return (
    <FeaturedMeshGradient
      colors={colors}
      positions={positions}
      waveX={waveX}
      waveXShift={waveXShift}
      waveY={waveY}
      waveYShift={waveYShift}
      mixing={mixing}
      rotation={rotation}
      speed={speed}
      aspectRatio={aspectRatio}
      {...rest}
    >
      <div className="flex size-full items-center justify-center">
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
    </FeaturedMeshGradient>
  )
}
