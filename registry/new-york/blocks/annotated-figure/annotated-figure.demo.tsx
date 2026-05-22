"use client"

import { Info, MoreHorizontal } from "lucide-react"

import { AnnotatedFigure } from "./annotated-figure"

export default function AnnotatedFigureDemo() {
  return (
    <AnnotatedFigure
      annotations={[
        { label: "App snapshot", side: "left", x: "10%", y: "10%" },
        { label: "Quick actions", side: "right", x: "92%", y: "10%" },
        { label: "Summary section", side: "left", x: "6%", y: "32%" },
      ]}
    >
      <SampleAppCard />
    </AnnotatedFigure>
  )
}

function SampleAppCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-neutral-900 text-white">
      <header className="flex items-start gap-3 border-b border-white/10 p-4">
        <div className="bg-foreground text-background flex size-10 shrink-0 items-center justify-center rounded-lg text-base font-semibold">
          E
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold">Epigraph Insider</h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-300">
              Best
            </span>
          </div>
          <p className="text-xs text-white/55">
            The weekly B2B publishing newsletter
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-rose-500/40 px-3 py-1 text-xs font-medium text-rose-300 hover:bg-rose-500/10"
        >
          Subscribe
        </button>
        <button
          type="button"
          aria-label="More"
          className="flex size-7 items-center justify-center rounded-full border border-white/15 text-white/60 hover:bg-white/5"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </header>

      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <Info className="size-4 text-rose-400" />
          Summary
        </div>
        <div className="text-xs text-white/55">
          <span className="font-medium text-white/80">2.4k</span> readers
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h4 className="text-sm font-semibold">What is Epigraph Insider?</h4>
        <p className="text-xs leading-relaxed text-white/65">
          The weekly newsletter for operators in B2B publishing — interviews,
          growth breakdowns, and launches from across the nine-publication
          Epigraph Media network.
        </p>
      </div>
    </article>
  )
}
