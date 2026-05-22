"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type FeaturedEventParticipant = {
  name: string
  role: string
  photo: string
}

export type FeaturedEventProps = {
  brandName: string
  brandLogo?: React.ReactNode
  eventType: string
  title: string
  participants: FeaturedEventParticipant[]
  pattern?: React.ReactNode | false
  className?: string
}

export function FeaturedEvent({
  brandName,
  brandLogo,
  eventType,
  title,
  participants,
  pattern,
  className,
}: FeaturedEventProps) {
  const overlay =
    pattern === false ? null : (pattern ?? <DefaultDotPattern />)

  return (
    <article
      className={cn(
        "relative isolate overflow-hidden rounded-2xl bg-slate-900 text-white",
        className
      )}
    >
      {overlay ? (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          {overlay}
        </div>
      ) : null}
      <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 md:p-12">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 self-start text-sm font-semibold text-slate-900">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1">
              {brandLogo}
              {brandName}
            </span>
            <span
              className="size-1.5 shrink-0 rounded-full bg-white/60"
              aria-hidden
            />
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1">
              {eventType}
            </span>
          </div>
          <h2 className="text-2xl leading-[1.15] font-semibold tracking-tight text-balance sm:text-3xl md:text-[2rem]">
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "grid gap-5",
            participants.length === 1 && "grid-cols-1 justify-items-center",
            participants.length === 2 && "grid-cols-2",
            participants.length >= 3 && "grid-cols-2 sm:grid-cols-3"
          )}
        >
          {participants.map((p, i) => (
            <figure key={i} className="flex flex-col gap-2">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-white/5">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <figcaption className="flex flex-col gap-0.5 leading-tight">
                <span className="text-sm font-semibold sm:text-base">
                  {p.name}
                </span>
                <span className="text-xs text-white/70">{p.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  )
}

function DefaultDotPattern() {
  const id = React.useId().replace(/:/g, "")
  return (
    <svg className="size-full text-white/[0.07]" aria-hidden>
      <defs>
        <pattern
          id={`dot-${id}`}
          width="24"
          height="24"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1.5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#dot-${id})`} />
    </svg>
  )
}
