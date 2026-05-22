"use client"

import { CtaGradient } from "./cta-gradient"

export default function CtaGradientDemo() {
  return (
    <div className="mx-auto max-w-md">
      <CtaGradient
        title="Start using ClickUp today"
        bullets={[
          "Manage all your work in one place",
          "Collaborate with your team",
          "Use ClickUp for FREE—forever",
        ]}
        ctaLabel="Get Started"
        ctaHref="#"
      />
    </div>
  )
}
