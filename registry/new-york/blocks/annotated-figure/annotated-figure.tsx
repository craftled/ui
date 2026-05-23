"use client";

import type * as React from "react";

import { cn } from "@/lib/utils";

export type AnnotatedFigureAnchor = {
  /** Visible label text. */
  label: string;
  /** Which side of the object the label sits on. */
  side: "left" | "right";
  /** Horizontal % of the anchor dot within the object's width. */
  x: string;
  /** Vertical % of the anchor dot AND label, within the object's height. */
  y: string;
};

export type AnnotatedFigureProps = {
  /** Width of the central object. Anything CSS accepts: "60%", "320px", "20rem". */
  objectWidth?: string;
  annotations: AnnotatedFigureAnchor[];
  /** Tailwind classes for the dot. */
  dotClassName?: string;
  /** Tailwind classes for the dashed stem line. */
  lineClassName?: string;
  /** Tailwind classes for the label text. */
  labelClassName?: string;
  /** The object being annotated. */
  children: React.ReactNode;
  className?: string;
};

export function AnnotatedFigure({
  objectWidth = "60%",
  annotations,
  dotClassName = "bg-rose-500 shadow-[0_0_0_4px] shadow-rose-500/20",
  lineClassName = "border-white/40",
  labelClassName = "text-white/60",
  children,
  className,
}: AnnotatedFigureProps) {
  const left = annotations.filter((a) => a.side === "left");
  const right = annotations.filter((a) => a.side === "right");

  return (
    <figure
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:p-10",
        className
      )}
      style={{ "--ow": objectWidth } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 items-stretch gap-y-6 sm:grid-cols-[1fr_var(--ow)_1fr] sm:gap-y-0">
        <Gutter
          annotations={left}
          labelClassName={labelClassName}
          lineClassName={lineClassName}
          side="left"
        />

        <div className="relative">
          <div className="relative">{children}</div>
          {annotations.map((a, i) => (
            <span
              aria-hidden
              className={cn(
                "absolute z-10 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full",
                dotClassName
              )}
              key={i}
              style={{ left: a.x, top: a.y }}
            />
          ))}
        </div>

        <Gutter
          annotations={right}
          labelClassName={labelClassName}
          lineClassName={lineClassName}
          side="right"
        />
      </div>
    </figure>
  );
}

function Gutter({
  side,
  annotations,
  labelClassName,
  lineClassName,
}: {
  side: "left" | "right";
  annotations: AnnotatedFigureAnchor[];
  labelClassName: string;
  lineClassName: string;
}) {
  if (annotations.length === 0) {
    return <div aria-hidden className="hidden sm:block" />;
  }
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative hidden sm:block",
        side === "left" ? "pr-3" : "pl-3"
      )}
    >
      {annotations.map((a, i) => (
        <div
          className={cn(
            "absolute inset-x-0 flex -translate-y-1/2 items-center gap-3 text-sm",
            side === "right" && "flex-row-reverse",
            labelClassName
          )}
          key={i}
          style={{ top: a.y }}
        >
          <span className="whitespace-nowrap">{a.label}</span>
          <div
            className={cn("h-px flex-1 border-t border-dashed", lineClassName)}
          />
        </div>
      ))}
    </div>
  );
}
