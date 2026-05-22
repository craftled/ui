"use client"

import { CtaAppStack } from "./cta-app-stack"

export default function CtaAppStackDemo() {
  return (
    <CtaAppStack
      accent="rose"
      tagLabel="New!"
      title="Publishing Network"
      stats={
        <>
          <span className="font-semibold text-white">9 publications</span>
          <span className="text-white/60"> and growing</span>
        </>
      }
      ctaLabel="See the stack"
      ctaHref="https://epigraphmedia.com"
      layers={[
        {
          bg: "bg-white",
          content: (
            <img
              src="/logos/epigraph.svg"
              alt=""
              className="size-3/5 object-contain"
            />
          ),
        },
        {
          bg: "bg-rose-500",
          content: (
            <span className="text-4xl font-bold tracking-tight text-white">
              B
            </span>
          ),
        },
        {
          bg: "bg-emerald-600",
          content: (
            <Bars />
          ),
        },
        {
          bg: "bg-neutral-900",
          content: <Bars opacity={0.5} />,
        },
      ]}
    />
  )
}

function Bars({ opacity = 1 }: { opacity?: number }) {
  return (
    <div
      className="flex w-3/4 flex-col gap-1.5"
      style={{ opacity }}
    >
      <div className="h-1.5 w-2/3 rounded-full bg-white" />
      <div className="h-1.5 w-full rounded-full bg-white" />
      <div className="h-1.5 w-1/2 rounded-full bg-white" />
    </div>
  )
}
