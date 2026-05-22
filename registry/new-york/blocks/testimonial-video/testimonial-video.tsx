"use client"

import * as React from "react"
import { Play } from "lucide-react"

import { cn } from "@/lib/utils"

export type TestimonialVideoProps = {
  /** Background image URL (poster frame). */
  image: string
  imageAlt?: string
  /** When set, the play button becomes a link. */
  videoHref?: string
  /** Or pass a click handler — opens a modal, fires analytics, whatever. */
  onPlay?: () => void
  /** Top-left chip. Pass an <img>, an <svg>, or any element. */
  brandLogo?: React.ReactNode
  /** Bottom-right logo. */
  clientLogo?: React.ReactNode
  /** The pull-quote. Curly quotes are added for you. */
  quote: string
  author: { name: string; role: string }
  /** Show the play button. Defaults to true if videoHref or onPlay is set. */
  showPlayButton?: boolean
  className?: string
}

export function TestimonialVideo({
  image,
  imageAlt = "",
  videoHref,
  onPlay,
  brandLogo,
  clientLogo,
  quote,
  author,
  showPlayButton,
  className,
}: TestimonialVideoProps) {
  const showPlay = showPlayButton ?? Boolean(videoHref || onPlay)
  const playMarkup = (
    <span className="relative flex size-14 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-md transition-transform group-hover:scale-105">
      <span className="absolute inset-[5px] rounded-full bg-white shadow-[inset_0_-1px_2px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.18)]" />
      <Play className="relative size-3.5 translate-x-px fill-neutral-900 text-neutral-900" />
    </span>
  )

  return (
    <article
      className={cn(
        "relative isolate aspect-[3/4] overflow-hidden rounded-3xl bg-neutral-900 text-white",
        className
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      <div className="relative flex h-full flex-col p-5 sm:p-7">
        <div className="flex items-start justify-between gap-3">
          {brandLogo ? (
            <span className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-sm font-semibold text-neutral-900">
              {brandLogo}
            </span>
          ) : (
            <span />
          )}
          {showPlay ? (
            videoHref ? (
              <a
                href={videoHref}
                aria-label="Play video"
                className="group inline-flex"
              >
                {playMarkup}
              </a>
            ) : (
              <button
                type="button"
                onClick={onPlay}
                aria-label="Play video"
                className="group inline-flex"
              >
                {playMarkup}
              </button>
            )
          ) : null}
        </div>

        <div className="mt-auto flex flex-col gap-6">
          <blockquote className="text-xl leading-[1.2] font-medium tracking-tight text-balance sm:text-2xl">
            &ldquo;{quote}&rdquo;
          </blockquote>
          <div className="flex items-end justify-between gap-4">
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-base font-semibold">
                {author.name}
              </span>
              <span className="truncate text-sm text-white/65">
                {author.role}
              </span>
            </div>
            {clientLogo ? (
              <div className="shrink-0 text-white">{clientLogo}</div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  )
}
