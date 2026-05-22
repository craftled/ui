"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

export type CtaNewsletterProps = {
  title: string
  description?: string
  inputPlaceholder?: string
  ctaLabel?: string
  /** Right-side decorative slot — pass any React node. */
  decoration?: React.ReactNode
  /** Called with the email when the form submits. */
  onSubmit?: (email: string) => void | Promise<void>
  /** Form action — for non-JS or server-action setups. */
  action?: string
  className?: string
}

export function CtaNewsletter({
  title,
  description,
  inputPlaceholder = "Enter your email address",
  ctaLabel = "Subscribe",
  decoration,
  onSubmit,
  action,
  className,
}: CtaNewsletterProps) {
  const [email, setEmail] = React.useState("")
  const [submitting, setSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    if (!onSubmit) return
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit(email)
      setEmail("")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-neutral-50 to-neutral-100",
        "dark:from-neutral-900 dark:to-neutral-950",
        className
      )}
    >
      <div className="relative grid grid-cols-1 gap-8 p-8 sm:p-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-6">
        <div className="flex max-w-md flex-col gap-6">
          <h2 className="text-foreground text-2xl leading-[1.1] font-bold tracking-tight text-balance sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="text-muted-foreground text-base text-balance">
              {description}
            </p>
          ) : null}
          <form
            action={action}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 sm:flex-row"
          >
            <input
              type="email"
              name="email"
              required
              placeholder={inputPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "min-w-0 flex-1 rounded-xl border px-4 py-3 text-sm",
                "border-input bg-background",
                "placeholder:text-muted-foreground",
                "focus-visible:ring-ring/40 focus-visible:border-ring focus-visible:ring-2 focus-visible:outline-none"
              )}
            />
            <button
              type="submit"
              disabled={submitting}
              className={cn(
                "bg-foreground text-background rounded-xl px-6 py-3 text-sm font-semibold",
                "transition-opacity hover:opacity-90 disabled:opacity-50"
              )}
            >
              {submitting ? "…" : ctaLabel}
            </button>
          </form>
        </div>
        {decoration ? (
          <div
            aria-hidden
            className="pointer-events-none relative hidden md:block"
          >
            {decoration}
          </div>
        ) : null}
      </div>
    </section>
  )
}
