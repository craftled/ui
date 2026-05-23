"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

export type FeaturedIntegrationsIcon = {
  /** Anything React — an <img>, an <svg>, a letter monogram, etc. */
  node: React.ReactNode;
  /** Accessible name for the orbit item. */
  alt?: string;
  /** Override the auto-distributed angle (degrees; 0 = top, clockwise). */
  angle?: number;
};

export type FeaturedIntegrationsProps = {
  /** Small eyebrow above the title. */
  label?: React.ReactNode;
  /** Headline. Pass JSX to mix muted + emphasized weight. */
  title: React.ReactNode;
  /** Optional subtitle below the headline. */
  description?: React.ReactNode;
  /** Icons to orbit. If no angles set, they're evenly distributed starting at top. */
  icons: FeaturedIntegrationsIcon[];
  /** Pixel size of each icon card. Default 56. */
  iconSize?: number;
  /** Diameter of the orbital circle in pixels. Default 560. */
  circleDiameter?: number;
  className?: string;
};

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
        "relative size-full overflow-hidden bg-background text-foreground",
        className
      )}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: circleDiameter, height: circleDiameter }}
      >
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full text-border"
          preserveAspectRatio="xMidYMid meet"
          viewBox="0 0 100 100"
        >
          <title>Orbit circle</title>
          <circle
            cx="50"
            cy="50"
            fill="none"
            r="49.5"
            stroke="currentColor"
            strokeDasharray="0.6 0.9"
            strokeWidth="0.25"
          />
        </svg>

        {icons.map((icon, i) => {
          const angleDeg = icon.angle ?? (i / icons.length) * 360;
          const angleRad = ((angleDeg - 90) * Math.PI) / 180;
          const x = 50 + Math.cos(angleRad) * 50;
          const y = 50 + Math.sin(angleRad) * 50;
          return (
            <div
              aria-label={icon.alt}
              className="absolute flex items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              key={i}
              role="img"
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
          );
        })}

        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          {label ? (
            <p className="mb-3 text-muted-foreground text-xl">{label}</p>
          ) : null}
          <div className="text-balance font-bold text-6xl leading-[1.02] tracking-tight">
            {title}
          </div>
          {description ? (
            <p className="mt-6 max-w-md text-balance text-muted-foreground text-xl leading-snug">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}
