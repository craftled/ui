"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

export type FeaturedEventParticipant = {
  name: string;
  role: string;
  photo: string;
};

export type FeaturedEventProps = {
  brandName: string;
  brandLogo?: React.ReactNode;
  eventType: string;
  title: string;
  participants: FeaturedEventParticipant[];
  pattern?: React.ReactNode | false;
  className?: string;
};

export function FeaturedEvent({
  brandName,
  brandLogo,
  eventType,
  title,
  participants,
  pattern,
  className,
}: FeaturedEventProps) {
  const overlay = pattern === false ? null : (pattern ?? <DefaultDotPattern />);

  return (
    <article
      className={cn(
        "@container relative isolate size-full overflow-hidden rounded-2xl bg-slate-900 text-white",
        className
      )}
    >
      {overlay ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {overlay}
        </div>
      ) : null}
      <div className="grid h-full @2xl:grid-cols-[1.1fr_1fr] grid-cols-1 @2xl:items-center @2xl:gap-10 @4xl:gap-14 gap-6 @2xl:p-12 @4xl:p-16 p-8">
        <div className="flex flex-col @2xl:gap-8 @4xl:gap-10 gap-5">
          <div className="flex items-center gap-2 self-start font-semibold @2xl:text-base @sm:text-sm text-slate-900 text-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white @2xl:px-4 px-3 @2xl:py-1.5 py-1">
              {brandLogo}
              {brandName}
            </span>
            <span
              aria-hidden
              className="size-1.5 shrink-0 rounded-full bg-white/60"
            />
            <span className="inline-flex items-center rounded-full bg-white @2xl:px-4 px-3 @2xl:py-1.5 py-1">
              {eventType}
            </span>
          </div>
          <h2 className="text-balance font-semibold @2xl:text-5xl @4xl:text-[3.5rem] @lg:text-4xl @sm:text-3xl text-2xl leading-[1.08] tracking-tight">
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "grid @2xl:gap-6 @4xl:gap-7 gap-4",
            participants.length === 1 && "grid-cols-1 justify-items-center",
            participants.length === 2 && "grid-cols-2",
            participants.length >= 3 && "@sm:grid-cols-3 grid-cols-2"
          )}
        >
          {participants.map((p, i) => (
            <figure className="flex flex-col @2xl:gap-3 gap-2" key={i}>
              <div className="aspect-square w-full overflow-hidden @4xl:rounded-xl rounded-lg bg-white/5">
                <img
                  alt={p.name}
                  className="size-full object-cover"
                  loading="lazy"
                  src={p.photo}
                />
              </div>
              <figcaption className="flex flex-col gap-0.5 leading-tight">
                <span className="font-semibold @2xl:text-lg @4xl:text-xl text-sm">
                  {p.name}
                </span>
                <span className="@2xl:text-sm @4xl:text-base text-white/70 text-xs">
                  {p.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </article>
  );
}

function DefaultDotPattern() {
  const id = React.useId().replace(/:/g, "");
  return (
    <svg aria-hidden="true" className="size-full text-white/[0.07]">
      <title>Dot pattern</title>
      <defs>
        <pattern
          height="24"
          id={`dot-${id}`}
          patternUnits="userSpaceOnUse"
          width="24"
        >
          <circle cx="2" cy="2" fill="currentColor" r="1.5" />
        </pattern>
      </defs>
      <rect fill={`url(#dot-${id})`} height="100%" width="100%" />
    </svg>
  );
}
