"use client";

import { StaticMeshGradient } from "@paper-design/shaders-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export type FeaturedMeshGradientProps = {
  /** Up to 10 colors. */
  colors?: string[];
  /** Color spot placement seed (0-100). */
  positions?: number;
  /** Sine wave distortion strength along X (0-1). */
  waveX?: number;
  /** X-axis wave phase offset (0-1). */
  waveXShift?: number;
  /** Sine wave distortion strength along Y (0-1). */
  waveY?: number;
  /** Y-axis wave phase offset (0-1). */
  waveYShift?: number;
  /** Blending behavior, 0 = hard stripes, 1 = gradual blend (0-1). */
  mixing?: number;
  /** Grain on shape edges (0-1). */
  grainMixer?: number;
  /** B/W grain overlay (0-1). */
  grainOverlay?: number;
  /** Animation speed (0 = static). */
  speed?: number;
  /** Zoom (0.01-4). */
  scale?: number;
  /** Rotation (0-360). */
  rotation?: number;
  /** Horizontal offset (-1 to 1). */
  offsetX?: number;
  /** Vertical offset (-1 to 1). */
  offsetY?: number;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  titleClassName?: string;
  children?: React.ReactNode;
  aspectRatio?: string;
  className?: string;
};

const DEFAULT_COLORS = ["#ffad0a", "#6200ff", "#e2a3ff", "#ff99fd"];

export function FeaturedMeshGradient({
  colors = DEFAULT_COLORS,
  positions = 2,
  waveX = 1,
  waveXShift = 0.6,
  waveY = 1,
  waveYShift = 0.21,
  mixing = 0.93,
  grainMixer = 0,
  grainOverlay = 0,
  speed = 0,
  scale = 1,
  rotation = 270,
  offsetX = 0,
  offsetY = 0,
  title,
  eyebrow,
  titleClassName = "text-white",
  children,
  aspectRatio = "16/9",
  className,
}: FeaturedMeshGradientProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <StaticMeshGradient
        colors={colors}
        fit="cover"
        grainMixer={grainMixer}
        grainOverlay={grainOverlay}
        mixing={mixing}
        offsetX={offsetX}
        offsetY={offsetY}
        positions={positions}
        rotation={rotation}
        scale={scale}
        speed={speed}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
        waveX={waveX}
        waveXShift={waveXShift}
        waveY={waveY}
        waveYShift={waveYShift}
      />

      {children ? (
        <div className="relative z-10 size-full">{children}</div>
      ) : null}

      {title || eyebrow ? (
        <figcaption className="absolute right-4 bottom-4 left-4 z-10 flex flex-col gap-1">
          {eyebrow ? (
            <span
              className={cn("font-medium text-xs opacity-80", titleClassName)}
            >
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h3
              className={cn(
                "font-bold text-2xl leading-tight tracking-tight sm:text-3xl",
                titleClassName
              )}
            >
              {title}
            </h3>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
