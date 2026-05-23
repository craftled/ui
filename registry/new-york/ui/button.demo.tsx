"use client"

import * as React from "react"
import { ArrowRight, Loader2, Trash2 } from "lucide-react"

import { Button } from "./button"

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-6">
      <Group label="Variants">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
        <Button variant="destructive">Destructive</Button>
      </Group>

      <Group label="Sizes">
        <Button size="sm">sm</Button>
        <Button size="default">default</Button>
        <Button size="lg">lg</Button>
      </Group>

      <Group label="With icons">
        <Button>
          Continue
          <ArrowRight />
        </Button>
        <Button variant="outline">
          <Trash2 />
          Delete
        </Button>
        <Button disabled>
          <Loader2 className="animate-spin" />
          Loading
        </Button>
      </Group>

      <Group label="Icon-only">
        <Button size="icon" variant="outline" aria-label="Delete">
          <Trash2 />
        </Button>
      </Group>

      <Group label="State">
        <Button disabled>Disabled</Button>
        <Button variant="outline" disabled>
          Disabled outline
        </Button>
      </Group>
    </div>
  )
}

function Group({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  )
}
