"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type AnnotatedFigureAnchor = {
  /** Visible label text. */
  label: string
  /** Which edge of the figure the label sits at. */
  side: "left" | "right"
  /** Horizontal position of the anchor dot, as a % of the object's width. */
  x: string
  /** Vertical position of the anchor dot AND the label, as a % of the figure's height. */
  y: string
}

export type AnnotatedFigureProps = {
  /** Width of the central object as a % of the figure (the rest is split as label gutters). */
  objectWidth?: string
  /** Dot + label specs. */
  annotations: AnnotatedFigureAnchor[]
  /** Tailwind class for the dot color (background). */
  dotClassName?: string
  /** Tailwind class for the dashed stem line. */
  lineClassName?: string
  /** Tailwind class for the label text. */
  labelClassName?: string
  /** The central object being annotated. */
  children: React.ReactNode
  className?: string
}

export function AnnotatedFigure({
  objectWidth = "62%",
  annotations,
  dotClassName = "bg-rose-500 shadow-[0_0_0_4px] shadow-rose-500/20",
  lineClassName = "border-white/25",
  labelClassName = "text-white/55",
  children,
  className,
}: AnnotatedFigureProps) {
  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:p-10",
        className
      )}
    >
      <div className="relative mx-auto" style={{ width: objectWidth }}>
        <div className="relative">{children}</div>
        {annotations.map((a, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
              dotClassName
            )}
            style={{ left: a.x, top: a.y }}
          />
        ))}
      </div>

      {annotations.map((a, i) => (
        <div
          key={i}
          className={cn(
            "pointer-events-none absolute z-0 hidden -translate-y-1/2 items-center gap-3 text-sm sm:flex",
            a.side === "left"
              ? "left-6 sm:left-10"
              : "right-6 flex-row-reverse sm:right-10",
            labelClassName
          )}
          style={{
            top: a.y,
            width: `calc((100% - ${objectWidth}) / 2 - 1.5rem)`,
          }}
        >
          <span className="whitespace-nowrap">{a.label}</span>
          <div
            className={cn(
              "h-px flex-1 border-t border-dashed",
              lineClassName
            )}
          />
        </div>
      ))}
    </figure>
  )
}
