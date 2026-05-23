"use client"

import { Separator } from "./separator"

export default function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Horizontal">
        <div className="w-full max-w-sm space-y-1">
          <h4 className="text-sm font-semibold">Best Writing</h4>
          <p className="text-muted-foreground text-sm">
            Weekly newsletter for writers and creators.
          </p>
        </div>
        <Separator className="max-w-sm" />
        <div className="text-muted-foreground flex max-w-sm items-center gap-4 text-xs">
          <span>Editorial</span>
          <Separator orientation="vertical" className="h-4" />
          <span>Newsletter</span>
          <Separator orientation="vertical" className="h-4" />
          <span>2.4k readers</span>
        </div>
      </Group>

      <Group label="Vertical inside row">
        <div className="bg-card flex h-12 items-center gap-4 rounded-md border px-4 text-sm">
          <a href="#" className="hover:underline">
            Account
          </a>
          <Separator orientation="vertical" />
          <a href="#" className="hover:underline">
            Billing
          </a>
          <Separator orientation="vertical" />
          <a href="#" className="hover:underline">
            Team
          </a>
        </div>
      </Group>

      <Group label="Inside a stat row">
        <div className="bg-card grid w-full max-w-md grid-cols-3 divide-x rounded-md border">
          <Stat label="Impressions" value="204k" />
          <Stat label="Clicks" value="12.5k" />
          <Stat label="Conversions" value="1.8k" />
        </div>
      </Group>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1 p-4">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="text-lg font-semibold tabular-nums">{value}</span>
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
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}
