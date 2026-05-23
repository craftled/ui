"use client";

import { AtSign } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/registry/new-york/ui/input";

export type CtaEbookProps = {
  /** Small icon inside the eyebrow tag. */
  tagIcon?: React.ReactNode;
  /** Eyebrow text. Omit to hide the tag entirely. */
  tagLabel?: string;
  title: string;
  description?: string;
  inputPlaceholder?: string;
  ctaLabel?: string;
  /** Right-side slot — pass a book mockup, illustration, or any node. */
  decoration?: React.ReactNode;
  /** Tailwind color stem for the accent (tag + button). Default "rose". */
  accent?: "rose" | "violet" | "blue" | "emerald" | "amber";
  onSubmit?: (email: string) => void | Promise<void>;
  action?: string;
  className?: string;
};

const ACCENT_CLASSES = {
  rose: {
    tag: "border-rose-500/40 bg-rose-500/10 text-rose-400",
    button: "bg-rose-500 hover:bg-rose-500/90 focus-visible:ring-rose-400/40",
  },
  violet: {
    tag: "border-violet-500/40 bg-violet-500/10 text-violet-400",
    button:
      "bg-violet-500 hover:bg-violet-500/90 focus-visible:ring-violet-400/40",
  },
  blue: {
    tag: "border-blue-500/40 bg-blue-500/10 text-blue-400",
    button: "bg-blue-500 hover:bg-blue-500/90 focus-visible:ring-blue-400/40",
  },
  emerald: {
    tag: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
    button:
      "bg-emerald-500 hover:bg-emerald-500/90 focus-visible:ring-emerald-400/40",
  },
  amber: {
    tag: "border-amber-500/40 bg-amber-500/10 text-amber-400",
    button:
      "bg-amber-500 hover:bg-amber-500/90 focus-visible:ring-amber-400/40",
  },
} as const;

export function CtaEbook({
  tagIcon,
  tagLabel,
  title,
  description,
  inputPlaceholder = "Enter email",
  ctaLabel = "Subscribe",
  decoration,
  accent = "rose",
  onSubmit,
  action,
  className,
}: CtaEbookProps) {
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const tone = ACCENT_CLASSES[accent];

  const handleSubmit = async (e: React.FormEvent) => {
    if (!onSubmit) {
      return;
    }
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(email);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-3xl bg-neutral-950 text-white",
        className
      )}
    >
      <div className="grid grid-cols-1 gap-8 p-8 sm:p-12 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-6">
        <div className="flex max-w-md flex-col gap-6">
          {tagLabel ? (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 self-start rounded-md border px-2 py-1 font-medium text-xs",
                tone.tag
              )}
            >
              {tagIcon}
              {tagLabel}
            </span>
          ) : null}
          <h2 className="text-balance font-bold text-3xl leading-[1.05] tracking-tight sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="text-balance text-base text-white/60 leading-relaxed">
              {description}
            </p>
          ) : null}
          <form
            action={action}
            className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 sm:flex-row sm:items-center"
            onSubmit={handleSubmit}
          >
            <div className="relative flex-1">
              <AtSign className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40" />
              <Input
                className="h-auto border-transparent bg-transparent py-2.5 pl-9 text-white shadow-none ring-0 placeholder:text-white/40 focus-visible:border-transparent focus-visible:ring-0"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputPlaceholder}
                required
                type="email"
                value={email}
              />
            </div>
            <button
              className={cn(
                "whitespace-nowrap rounded-xl px-5 py-2.5 font-semibold text-sm text-white",
                "transition-colors disabled:opacity-50",
                "focus-visible:outline-none focus-visible:ring-2",
                tone.button
              )}
              disabled={submitting}
              type="submit"
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
  );
}
