"use client"

import { BarChart3 } from "lucide-react"

import { CtaEbook } from "./cta-ebook"

function BookMockup() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px]">
      <SunburstRays />
      <div className="relative size-full overflow-hidden rounded-md bg-gradient-to-br from-fuchsia-200 via-pink-400 to-rose-600 shadow-[0_30px_60px_-15px_rgba(244,63,94,0.45)]">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-black/15" />
        <div className="px-5 pt-7">
          <h3 className="text-2xl leading-[1.05] font-bold tracking-tight text-neutral-900">
            B2B
            <br />
            Publishing
            <br />
            2026
          </h3>
        </div>
        <FanRays />
        <div className="absolute right-2.5 bottom-2.5 size-5 rounded-sm bg-neutral-900/35" />
      </div>
    </div>
  )
}

function SunburstRays() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 -z-10 size-[180%] -translate-x-[22%] -translate-y-[22%]"
      viewBox="-50 -50 100 100"
    >
      {Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2
        const x = Math.cos(angle) * 50
        const y = Math.sin(angle) * 50
        return (
          <line
            key={i}
            x1="0"
            y1="0"
            x2={x}
            y2={y}
            stroke="white"
            strokeOpacity={i % 2 === 0 ? 0.04 : 0.02}
            strokeWidth="0.6"
          />
        )
      })}
    </svg>
  )
}

function FanRays() {
  return (
    <svg
      aria-hidden
      className="absolute right-0 bottom-0 size-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMaxYMax meet"
    >
      {Array.from({ length: 14 }, (_, i) => {
        const angle = ((-90 + (i / 13) * 90) * Math.PI) / 180
        return (
          <line
            key={i}
            x1="100"
            y1="100"
            x2={100 + Math.cos(angle) * 90}
            y2={100 + Math.sin(angle) * 90}
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="3"
          />
        )
      })}
    </svg>
  )
}

export default function CtaEbookDemo() {
  return (
    <CtaEbook
      accent="rose"
      tagIcon={<BarChart3 className="size-3" strokeWidth={2.5} />}
      tagLabel="Industry research"
      title="The state of B2B publishing, 2026."
      description="See how 8,000+ operators monetize newsletters, which channels actually move pipeline, and what works in 2026."
      inputPlaceholder="Enter email"
      ctaLabel="Get the report"
      decoration={<BookMockup />}
      onSubmit={(email) => console.log("subscribed:", email)}
    />
  )
}
