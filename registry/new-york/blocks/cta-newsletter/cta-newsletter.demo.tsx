"use client";

import { CtaNewsletter } from "./cta-newsletter";

function Mockup() {
  return (
    <div className="relative h-56 w-full">
      <MockCard
        accent="bg-rose-500"
        className="absolute top-0 right-2 w-44 -rotate-6"
        label="Best Writing"
        lines={3}
      />
      <MockCard
        accent="bg-blue-500"
        className="absolute top-16 right-0 w-40 rotate-3"
        label="Pynions"
        lines={2}
      />
      <MockCard
        accent="bg-violet-500"
        className="absolute top-32 right-10 w-44 -rotate-2"
        label="AI Turnpoint"
        lines={2}
      />
    </div>
  );
}

function MockCard({
  className,
  accent,
  label,
  lines,
}: {
  className?: string;
  accent: string;
  label: string;
  lines: number;
}) {
  return (
    <div
      className={`${className} rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/5 dark:bg-neutral-800 dark:ring-white/10`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className={`size-6 rounded-md ${accent}`} />
        <div className="font-semibold text-foreground text-xs">{label}</div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: lines }, (_, i) => (
          <div
            className="h-2 rounded bg-neutral-200 dark:bg-neutral-700"
            key={i}
            style={{ width: `${100 - i * 20}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function CtaNewsletterDemo() {
  return (
    <CtaNewsletter
      ctaLabel="Subscribe"
      decoration={<Mockup />}
      onSubmit={(email) => {
        console.log("subscribed:", email);
      }}
      title="Receive the latest Epigraph Insider updates."
    />
  );
}
