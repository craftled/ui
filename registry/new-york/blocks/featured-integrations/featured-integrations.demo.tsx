"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

import { FeaturedIntegrations } from "./featured-integrations"

const OG_WIDTH = 1400
const OG_HEIGHT = 735

function Monogram({
  letter,
  color,
}: {
  letter: string
  color: string
}) {
  return (
    <span
      className={cn(
        "flex size-9 items-center justify-center rounded-lg text-base font-bold text-white",
        color
      )}
    >
      {letter}
    </span>
  )
}

const SHARED_PROPS = {
  label: "Network",
  title: (
    <>
      <span className="text-muted-foreground">Reach every</span>
      <br />
      <span className="text-foreground">audience.</span>
    </>
  ),
  description:
    "Epigraph distributes your message across our owned-and-operated B2B publications. No retargeting. No spray.",
  icons: [
    { node: <Monogram letter="B" color="bg-rose-500" />, alt: "Best Writing" },
    { node: <Monogram letter="M" color="bg-cyan-500" />, alt: "Marketful" },
    { node: <Monogram letter="U" color="bg-amber-500" />, alt: "UI Things" },
    { node: <Monogram letter="X" color="bg-emerald-500" />, alt: "UX Crush" },
    { node: <Monogram letter="P" color="bg-blue-500" />, alt: "Pynions" },
    { node: <Monogram letter="A" color="bg-violet-500" />, alt: "AI Turnpoint" },
  ],
}

export default function FeaturedIntegrationsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background overflow-hidden rounded-xl border">
        <OgFrame width={OG_WIDTH} height={OG_HEIGHT}>
          <FeaturedIntegrations {...SHARED_PROPS} />
        </OgFrame>
      </div>
      <div className="dark bg-background overflow-hidden rounded-xl border">
        <OgFrame width={OG_WIDTH} height={OG_HEIGHT}>
          <FeaturedIntegrations {...SHARED_PROPS} />
        </OgFrame>
      </div>
    </div>
  )
}

function OgFrame({
  width,
  height,
  children,
}: {
  width: number
  height: number
  children: React.ReactNode
}) {
  return (
    <div
      className="@container relative w-full overflow-hidden"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="absolute top-0 left-0"
        style={{
          width,
          height,
          transformOrigin: "top left",
          transform: `scale(calc(100cqw / ${width}px))`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
