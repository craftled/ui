"use client"

import { Input } from "./input"
import { Label } from "./label"

export default function LabelDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Basic">
        <Label htmlFor="basic">Email address</Label>
      </Group>

      <Group label="With required indicator">
        <Label htmlFor="required">
          Email
          <span aria-hidden className="text-destructive">
            *
          </span>
        </Label>
      </Group>

      <Group label="Pairs with Input">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Work email</Label>
          <Input id="email" type="email" placeholder="you@company.com" />
        </div>
      </Group>

      <Group label="Stacked field group">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Jane Doe" />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="company">Company</Label>
          <Input id="company" placeholder="Acme Inc." />
        </div>
      </Group>

      <Group label="Disabled">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="readonly">Locked field</Label>
          <Input
            id="readonly"
            value="Cannot edit"
            disabled
            onChange={() => {}}
          />
        </div>
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
      <div className="flex w-full max-w-sm flex-col gap-3">{children}</div>
    </div>
  )
}
