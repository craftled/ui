"use client";

import { Separator } from "./separator";

export default function SeparatorDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Horizontal">
        <div className="w-full max-w-sm space-y-1">
          <h4 className="font-semibold text-sm">Best Writing</h4>
          <p className="text-muted-foreground text-sm">
            Weekly newsletter for writers and creators.
          </p>
        </div>
        <Separator className="max-w-sm" />
        <div className="flex max-w-sm items-center gap-4 text-muted-foreground text-xs">
          <span>Editorial</span>
          <Separator className="h-4" orientation="vertical" />
          <span>Newsletter</span>
          <Separator className="h-4" orientation="vertical" />
          <span>2.4k readers</span>
        </div>
      </Group>

      <Group label="Vertical inside row">
        <div className="flex h-12 items-center gap-4 rounded-md border bg-card px-4 text-sm">
          <a className="hover:underline" href="#">
            Account
          </a>
          <Separator orientation="vertical" />
          <a className="hover:underline" href="#">
            Billing
          </a>
          <Separator orientation="vertical" />
          <a className="hover:underline" href="#">
            Team
          </a>
        </div>
      </Group>

      <Group label="Inside a stat row">
        <div className="grid w-full max-w-md grid-cols-3 divide-x rounded-md border bg-card">
          <Stat label="Impressions" value="204k" />
          <Stat label="Clicks" value="12.5k" />
          <Stat label="Conversions" value="1.8k" />
        </div>
      </Group>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-start gap-1 p-4">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-semibold text-lg tabular-nums">{value}</span>
    </div>
  );
}

function Group({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {label}
      </span>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
