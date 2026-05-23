"use client"

import { ArrowUpRight, MoreHorizontal } from "lucide-react"

import { Button } from "./button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"

export default function CardDemo() {
  return (
    <div className="flex flex-col gap-8">
      <Group label="Basic">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Email subscribers</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold tabular-nums">12,839</div>
            <p className="text-muted-foreground mt-1 text-sm">
              <span className="text-emerald-500">+428</span> vs previous period
            </p>
          </CardContent>
          <CardFooter className="border-t pt-6">
            <Button variant="outline" size="sm" className="w-full">
              View report
            </Button>
          </CardFooter>
        </Card>
      </Group>

      <Group label="With action">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Best Writing</CardTitle>
            <CardDescription>9 unread articles</CardDescription>
            <CardAction>
              <Button variant="ghost" size="icon" aria-label="More">
                <MoreHorizontal />
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Weekly digest from the network. Catch up on what shipped this
              week.
            </p>
          </CardContent>
        </Card>
      </Group>

      <Group label="Compact stat">
        <div className="grid w-full max-w-md grid-cols-2 gap-3">
          <Card>
            <CardHeader>
              <CardDescription>Impressions</CardDescription>
              <CardTitle className="text-2xl tabular-nums">204,318</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardDescription>Clicks</CardDescription>
              <CardTitle className="text-2xl tabular-nums">12,540</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </Group>

      <Group label="With link footer">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Publishing Network</CardTitle>
            <CardDescription>
              Reach knowledge workers across 9 curated B2B publications.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <a
              href="#"
              className="text-foreground inline-flex items-center gap-1 text-sm font-medium hover:underline"
            >
              Learn more <ArrowUpRight className="size-3.5" />
            </a>
          </CardFooter>
        </Card>
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
      {children}
    </div>
  )
}
