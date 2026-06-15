"use client";

import { StaticMeshGradient } from "@paper-design/shaders-react";
import type * as React from "react";

import { cn } from "@/lib/utils";

export type TitlePosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

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
  /** Where to anchor the title block. Defaults to "bottom-left". */
  titlePosition?: TitlePosition;
  /** Font size for the title, in px. Eyebrow scales proportionally. */
  titleSize?: number;
  /** Inline color for the title + eyebrow. Overrides titleClassName color. */
  titleColor?: string;
  titleClassName?: string;
  children?: React.ReactNode;
  /** Forwarded to the WebGL canvas. Pass `{ preserveDrawingBuffer: true }` to allow exporting the canvas to an image. */
  webGlContextAttributes?: WebGLContextAttributes;
  aspectRatio?: string;
  className?: string;
};

const POSITION_CLASSES: Record<TitlePosition, string> = {
  "top-left": "items-start justify-start text-left",
  "top-center": "items-start justify-center text-center",
  "top-right": "items-start justify-end text-right",
  "center-left": "items-center justify-start text-left",
  center: "items-center justify-center text-center",
  "center-right": "items-center justify-end text-right",
  "bottom-left": "items-end justify-start text-left",
  "bottom-center": "items-end justify-center text-center",
  "bottom-right": "items-end justify-end text-right",
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
  titlePosition = "bottom-left",
  titleSize = 30,
  titleColor,
  titleClassName = "text-white",
  children,
  webGlContextAttributes,
  aspectRatio = "16/9",
  className,
}: FeaturedMeshGradientProps) {
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));
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
        webGlContextAttributes={webGlContextAttributes}
      />

      {children ? (
        <div className="relative z-10 size-full">{children}</div>
      ) : null}

      {title || eyebrow ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 z-10 flex p-4 sm:p-6",
            POSITION_CLASSES[titlePosition]
          )}
        >
          <figcaption className="flex max-w-full flex-col gap-1">
            {eyebrow ? (
              <span
                className={cn("font-medium opacity-80", titleClassName)}
                style={{ fontSize: `${eyebrowSize}px`, color: titleColor }}
              >
                {eyebrow}
              </span>
            ) : null}
            {title ? (
              <h3
                className={cn(
                  "font-bold leading-tight tracking-tight",
                  titleClassName
                )}
                style={{ fontSize: `${titleSize}px`, color: titleColor }}
              >
                {title}
              </h3>
            ) : null}
          </figcaption>
        </div>
      ) : null}
    </figure>
  );
}
