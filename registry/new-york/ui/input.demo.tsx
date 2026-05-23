"use client"

import { AtSign, Search } from "lucide-react"

import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"

export default function InputDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Basic">
        <Input placeholder="Enter text…" />
      </Group>

      <Group label="With label">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
      </Group>

      <Group label="Inline form">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex w-full max-w-sm gap-2"
        >
          <Input type="email" placeholder="Enter email" />
          <Button type="submit">Subscribe</Button>
        </form>
      </Group>

      <Group label="With icon">
        <div className="relative w-full max-w-sm">
          <AtSign className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input type="email" placeholder="Email address" className="pl-9" />
        </div>
        <div className="relative w-full max-w-sm">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input placeholder="Search…" className="pl-9" />
        </div>
      </Group>

      <Group label="States">
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Invalid" aria-invalid />
      </Group>

      <Group label="File">
        <Input type="file" />
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
      <div className="flex w-full max-w-sm flex-col gap-2">{children}</div>
    </div>
  )
}
