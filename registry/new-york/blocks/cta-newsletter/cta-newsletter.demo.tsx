"use client"

import { CtaNewsletter } from "./cta-newsletter"

function Mockup() {
  return (
    <div className="relative h-72 w-full">
      <MockCard
        className="absolute top-0 right-4 w-64 -rotate-6"
        accent="bg-rose-500"
        label="Best Writing"
        lines={3}
      />
      <MockCard
        className="absolute top-24 right-0 w-56 rotate-3"
        accent="bg-blue-500"
        label="Pynions"
        lines={2}
      />
      <MockCard
        className="absolute top-44 right-20 w-60 -rotate-2"
        accent="bg-violet-500"
        label="AI Turnpoint"
        lines={2}
      />
    </div>
  )
}

function MockCard({
  className,
  accent,
  label,
  lines,
}: {
  className?: string
  accent: string
  label: string
  lines: number
}) {
  return (
    <div
      className={`${className} rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className={`size-6 rounded-md ${accent}`} />
        <div className="text-foreground text-xs font-semibold">{label}</div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            key={i}
            className="h-2 rounded bg-neutral-200 dark:bg-neutral-700"
            style={{ width: `${100 - i * 20}%` }}
          />
        ))}
      </div>
    </div>
  )
}

export default function CtaNewsletterDemo() {
  return (
    <CtaNewsletter
      title="Receive the latest Epigraph Insider updates."
      ctaLabel="Subscribe"
      decoration={<Mockup />}
      onSubmit={(email) => {
        console.log("subscribed:", email)
      }}
    />
  )
}
