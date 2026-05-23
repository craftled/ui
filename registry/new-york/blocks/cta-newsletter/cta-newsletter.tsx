"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/new-york/ui/button";
import { Input } from "@/registry/new-york/ui/input";

export type CtaNewsletterProps = {
  title: string;
  description?: string;
  inputPlaceholder?: string;
  ctaLabel?: string;
  /** Right-side decorative slot — pass any React node. */
  decoration?: React.ReactNode;
  /** Called with the email when the form submits. */
  onSubmit?: (email: string) => void | Promise<void>;
  /** Form action — for non-JS or server-action setups. */
  action?: string;
  className?: string;
};

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
  const [email, setEmail] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

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
        "relative isolate overflow-hidden rounded-3xl",
        "bg-gradient-to-br from-neutral-50 to-neutral-100",
        "dark:from-neutral-900 dark:to-neutral-950",
        className
      )}
    >
      <div className="relative grid grid-cols-1 gap-8 p-8 sm:p-12 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-6">
        <div className="flex max-w-md flex-col gap-6">
          <h2 className="text-balance font-bold text-2xl text-foreground leading-[1.1] tracking-tight sm:text-3xl">
            {title}
          </h2>
          {description ? (
            <p className="text-balance text-base text-muted-foreground">
              {description}
            </p>
          ) : null}
          <form
            action={action}
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={handleSubmit}
          >
            <Input
              className="flex-1"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={inputPlaceholder}
              required
              type="email"
              value={email}
            />
            <Button disabled={submitting} type="submit">
              {submitting ? "…" : ctaLabel}
            </Button>
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
