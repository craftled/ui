"use client";

import { GrainGradient } from "@paper-design/shaders-react";
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

export type FeaturedGrainGradientProps = {
  /** Up to 7 colors. */
  colors?: string[];
  /** Background color. */
  colorBack?: string;
  /** Shape variant. */
  shape?:
    | "wave"
    | "dots"
    | "truchet"
    | "corners"
    | "ripple"
    | "blob"
    | "sphere";
  /** Color transition smoothness, 0-1. */
  softness?: number;
  /** Distortion strength, 0-1. */
  intensity?: number;
  /** Grain noise overlay, 0-1. */
  noise?: number;
  /** Animation speed multiplier. 0 = static. */
  speed?: number;
  /** Zoom, 0.01-4. */
  scale?: number;
  /** Rotation in degrees, 0-360. */
  rotation?: number;
  /** Title overlay. */
  title?: React.ReactNode;
  /** Small label above title. */
  eyebrow?: React.ReactNode;
  /** Where to anchor the title block. Default "bottom-left". */
  titlePosition?: TitlePosition;
  /** Title font size in px. Eyebrow scales proportionally. Default 30. */
  titleSize?: number;
  titleClassName?: string;
  /** Optional arbitrary content rendered over the gradient. */
  children?: React.ReactNode;
  /** Aspect ratio, default "16/9". */
  aspectRatio?: string;
  className?: string;
};

const DEFAULT_COLORS = ["#7300ff", "#eba8ff", "#00bfff", "#2a00ff"];

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
  titlePosition = "bottom-left",
  titleSize = 30,
  titleClassName = "text-white",
  children,
  aspectRatio = "16/9",
  className,
}: FeaturedGrainGradientProps) {
  const eyebrowSize = Math.max(11, Math.round(titleSize * 0.4));

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-900",
        className
      )}
      style={{ aspectRatio }}
    >
      <GrainGradient
        colorBack={colorBack}
        colors={colors}
        fit="cover"
        intensity={intensity}
        noise={noise}
        rotation={rotation}
        scale={scale}
        shape={shape}
        softness={softness}
        speed={speed}
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
                style={{ fontSize: `${eyebrowSize}px` }}
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
                style={{ fontSize: `${titleSize}px` }}
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
