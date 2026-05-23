"use client";

import {
  ArrowUpRight,
  Bell,
  Bold,
  CheckCircle2,
  CreditCard,
  Italic,
  LogOut,
  MoreHorizontal,
  Search,
  Settings,
  Trash2,
  Underline,
  User,
} from "lucide-react";
import type * as React from "react";

import { DocsShell } from "@/components/docs-shell";
import { ChartAreaGradient } from "@/registry/new-york/blocks/chart-area-gradient/chart-area-gradient";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/new-york/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/registry/new-york/ui/dropdown-menu";
import { Input } from "@/registry/new-york/ui/input";
import { Label } from "@/registry/new-york/ui/label";
import { Separator } from "@/registry/new-york/ui/separator";
import { Skeleton } from "@/registry/new-york/ui/skeleton";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/new-york/ui/tooltip";

const revenueData = [
  { month: "Jan", mrr: 38_400, new: 9200 },
  { month: "Feb", mrr: 39_100, new: 8400 },
  { month: "Mar", mrr: 41_200, new: 10_100 },
  { month: "Apr", mrr: 42_800, new: 9900 },
  { month: "May", mrr: 44_100, new: 8700 },
  { month: "Jun", mrr: 46_500, new: 11_200 },
  { month: "Jul", mrr: 47_300, new: 9500 },
  { month: "Aug", mrr: 48_210, new: 10_400 },
];

export default function ComposePage() {
  return (
    <DocsShell>
      <TooltipProvider>
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-2">
            <h1 className="font-semibold text-3xl tracking-tight">Compose</h1>
            <p className="text-muted-foreground">
              Three compositions exercising every primitive — drop-in patterns
              you can lift verbatim or remix.
            </p>
          </header>

          <Composition
            description="A two-tab settings card that combines Dialog (header action), Tabs (view switcher), Input + Label (form), Button (submit + cancel), and Separator (visual hierarchy)."
            title="1. Settings panel"
          >
            <SettingsPanel />
          </Composition>

          <Composition
            description="Header row with a search Input, an editor toolbar wrapped in Tooltips, a Dropdown user menu, and inline Skeleton loading states for the data row."
            title="2. App shell"
          >
            <AppShell />
          </Composition>

          <Composition
            description="A KPI dashboard composing Card, Chart (area-gradient block), Tabs (date range), and a contextual Dropdown for row actions."
            title="3. Mini dashboard"
          >
            <MiniDashboard />
          </Composition>
        </div>
      </TooltipProvider>
    </DocsShell>
  );
}

function Composition({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="font-medium text-foreground text-sm">{title}</h2>
        <p className="text-muted-foreground text-xs leading-relaxed">
          {description}
        </p>
      </div>
      <div className="rounded-xl border bg-card p-6">{children}</div>
    </section>
  );
}

// ───────── 1. Settings panel ─────────

function SettingsPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">Workspace</h3>
          <p className="text-muted-foreground text-xs">
            Manage your workspace profile and notifications.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <Settings />
              Configure
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Workspace settings</DialogTitle>
              <DialogDescription>
                Changes save when you click Apply. You can revert from the
                history panel.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="ws-name">Display name</Label>
                <Input defaultValue="Craftled" id="ws-name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="ws-slug">Slug</Label>
                <Input defaultValue="craftled" id="ws-slug" />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button>Apply</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Separator />
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col gap-4 pt-4" value="profile">
          <div className="grid gap-2">
            <Label htmlFor="compose-name">Name</Label>
            <Input defaultValue="Tomas Laurinavicius" id="compose-name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="compose-email">Email</Label>
            <Input
              defaultValue="hi@craftled.com"
              id="compose-email"
              type="email"
            />
          </div>
        </TabsContent>
        <TabsContent className="flex flex-col gap-3 pt-4" value="notifications">
          <NotificationRow
            description="Get a digest when something needs your eyes."
            title="Weekly summary"
          />
          <Separator />
          <NotificationRow
            description="Real-time pings for direct mentions."
            title="Mentions"
          />
          <Separator />
          <NotificationRow
            description="Quiet but useful — billing and security only."
            title="Account updates"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotificationRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex flex-col gap-0.5">
        <span className="font-medium text-sm">{title}</span>
        <span className="text-muted-foreground text-xs">{description}</span>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button aria-label="Enabled" size="icon" variant="ghost">
            <CheckCircle2 className="text-emerald-500" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Enabled — click to disable</TooltipContent>
      </Tooltip>
    </div>
  );
}

// ───────── 2. App shell ─────────

function AppShell() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search components…" />
        </div>
        <div className="flex items-center gap-1 rounded-md border bg-background p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Bold" size="icon" variant="ghost">
                <Bold />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold (⌘B)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Italic" size="icon" variant="ghost">
                <Italic />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic (⌘I)</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button aria-label="Underline" size="icon" variant="ghost">
                <Underline />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline (⌘U)</TooltipContent>
          </Tooltip>
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button aria-label="Notifications" size="icon" variant="outline">
              <Bell />
            </Button>
          </TooltipTrigger>
          <TooltipContent>3 new notifications</TooltipContent>
        </Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Account" size="icon" variant="outline">
              <User />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>tomaslau</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-3 rounded-lg border bg-background/40 p-3">
        <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Loading state
        </span>
        <div className="flex items-center gap-3">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
    </div>
  );
}

// ───────── 3. Mini dashboard ─────────

function MiniDashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold">Revenue</h3>
          <p className="text-muted-foreground text-xs">
            Stripe + ConvertKit, last 90 days.
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Row actions" size="icon" variant="ghost">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <ArrowUpRight />
              Open dashboard
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Manage subscription
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              <Trash2 />
              Remove integration
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Tabs defaultValue="30d">
        <TabsList>
          <TabsTrigger value="7d">7d</TabsTrigger>
          <TabsTrigger value="30d">30d</TabsTrigger>
          <TabsTrigger value="90d">90d</TabsTrigger>
        </TabsList>
        <TabsContent className="pt-4" value="30d">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-3">
              <Kpi delta="+12.4%" label="MRR" value="$48,210" />
              <Kpi delta="+3.1%" label="Active subs" value="1,284" />
              <Kpi delta="-0.4%" label="Churn" tone="negative" value="2.3%" />
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Trend</CardTitle>
                <CardDescription>
                  Recurring revenue, week-over-week
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <ChartAreaGradient
                  data={revenueData}
                  labelKey="month"
                  series={[
                    { key: "mrr", label: "MRR ($)" },
                    { key: "new", label: "New ($)" },
                  ]}
                  stacked={false}
                />
              </CardContent>
              <CardFooter className="text-muted-foreground text-xs">
                Updated 2 minutes ago
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent
          className="flex items-center justify-center py-12"
          value="7d"
        >
          <p className="text-muted-foreground text-sm">Switch to 7d view…</p>
        </TabsContent>
        <TabsContent
          className="flex items-center justify-center py-12"
          value="90d"
        >
          <p className="text-muted-foreground text-sm">Switch to 90d view…</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Kpi({
  label,
  value,
  delta,
  tone = "positive",
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "positive" | "negative";
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-background/40 p-3">
      <span className="text-muted-foreground text-xs">{label}</span>
      <span className="font-semibold text-foreground text-xl tabular-nums">
        {value}
      </span>
      <span
        className={
          tone === "positive"
            ? "font-medium text-emerald-500 text-xs"
            : "font-medium text-rose-500 text-xs"
        }
      >
        {delta}
      </span>
    </div>
  );
}
