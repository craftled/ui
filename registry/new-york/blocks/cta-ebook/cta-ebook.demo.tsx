"use client";

import { BarChart3 } from "lucide-react";

import { CtaEbook } from "./cta-ebook";

function BookMockup() {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-[240px]">
      <SunburstRays />
      <div className="relative size-full overflow-hidden rounded-md bg-gradient-to-br from-fuchsia-200 via-pink-400 to-rose-600 shadow-[0_30px_60px_-15px_rgba(244,63,94,0.45)]">
        <div className="absolute inset-y-0 left-0 w-1.5 bg-black/15" />
        <div className="px-5 pt-7">
          <h3 className="font-bold text-2xl text-neutral-900 leading-[1.05] tracking-tight">
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
  );
}

const r4 = (n: number) => n.toFixed(4);

function SunburstRays() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-10 size-[180%] -translate-x-[22%] -translate-y-[22%]"
      viewBox="-50 -50 100 100"
    >
      <title>Sunburst rays</title>
      {Array.from({ length: 28 }, (_, i) => {
        const angle = (i / 28) * Math.PI * 2;
        return (
          <line
            key={i}
            stroke="white"
            strokeOpacity={i % 2 === 0 ? 0.04 : 0.02}
            strokeWidth="0.6"
            x1="0"
            x2={r4(Math.cos(angle) * 50)}
            y1="0"
            y2={r4(Math.sin(angle) * 50)}
          />
        );
      })}
    </svg>
  );
}

function FanRays() {
  return (
    <svg
      aria-hidden="true"
      className="absolute right-0 bottom-0 size-full"
      preserveAspectRatio="xMaxYMax meet"
      viewBox="0 0 100 100"
    >
      <title>Fan rays</title>
      {Array.from({ length: 14 }, (_, i) => {
        const angle = ((-90 + (i / 13) * 90) * Math.PI) / 180;
        return (
          <line
            key={i}
            stroke="white"
            strokeOpacity="0.35"
            strokeWidth="3"
            x1="100"
            x2={r4(100 + Math.cos(angle) * 90)}
            y1="100"
            y2={r4(100 + Math.sin(angle) * 90)}
          />
        );
      })}
    </svg>
  );
}

export default function CtaEbookDemo() {
  return (
    <CtaEbook
      accent="rose"
      ctaLabel="Get the report"
      decoration={<BookMockup />}
      description="See how 8,000+ operators monetize newsletters, which channels actually move pipeline, and what works in 2026."
      inputPlaceholder="Enter email"
      onSubmit={(email) => console.log("subscribed:", email)}
      tagIcon={<BarChart3 className="size-3" strokeWidth={2.5} />}
      tagLabel="Industry research"
      title="The state of B2B publishing, 2026."
    />
  );
}
