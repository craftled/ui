"use client";

import { Info, MoreHorizontal } from "lucide-react";

import { AnnotatedFigure } from "./annotated-figure";

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
  );
}

function SampleAppCard() {
  return (
    <article className="rounded-xl border border-white/10 bg-neutral-900 text-white">
      <header className="flex items-start gap-3 border-white/10 border-b p-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-foreground font-semibold text-background text-base">
          E
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-base">Epigraph Insider</h3>
            <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/40 bg-rose-500/10 px-2 py-0.5 font-medium text-rose-300 text-xs">
              Best
            </span>
          </div>
          <p className="text-white/55 text-xs">
            The weekly B2B publishing newsletter
          </p>
        </div>
        <button
          className="rounded-full border border-rose-500/40 px-3 py-1 font-medium text-rose-300 text-xs hover:bg-rose-500/10"
          type="button"
        >
          Subscribe
        </button>
        <button
          aria-label="More"
          className="flex size-7 items-center justify-center rounded-full border border-white/15 text-white/60 hover:bg-white/5"
          type="button"
        >
          <MoreHorizontal className="size-3.5" />
        </button>
      </header>

      <div className="flex items-center justify-between border-white/10 border-b p-4">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Info className="size-4 text-rose-400" />
          Summary
        </div>
        <div className="text-white/55 text-xs">
          <span className="font-medium text-white/80">2.4k</span> readers
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h4 className="font-semibold text-sm">What is Epigraph Insider?</h4>
        <p className="text-white/65 text-xs leading-relaxed">
          The weekly newsletter for operators in B2B publishing — interviews,
          growth breakdowns, and launches from across the nine-publication
          Epigraph Media network.
        </p>
      </div>
    </article>
  );
}
