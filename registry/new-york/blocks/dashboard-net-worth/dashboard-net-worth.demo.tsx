"use client";

import { DashboardNetWorth } from "./dashboard-net-worth";

const trend = [
  { label: "Jan", value: 9500 },
  { label: "Feb", value: 9800 },
  { label: "Mar", value: 9300 },
  { label: "Apr", value: 11_200 },
  { label: "May", value: 11_600 },
  { label: "Jun", value: 10_900 },
  { label: "Jul", value: 12_100 },
  { label: "Aug", value: 12_500 },
  { label: "Sep", value: 12_300 },
  { label: "Oct", value: 13_400 },
  { label: "Nov", value: 14_100 },
  { label: "Dec", value: 13_800 },
  { label: "Jan", value: 14_700 },
  { label: "Feb", value: 15_400 },
  { label: "Mar", value: 16_200 },
  { label: "Apr", value: 16_825 },
];

export default function DashboardNetWorthDemo() {
  return (
    <DashboardNetWorth
      accounts={[
        {
          name: "Best Writing",
          subtitle: "2 hours ago",
          amount: "$6,281",
          change: { value: "1.97%", direction: "up" },
          icon: "B",
          iconClassName: "bg-rose-500",
        },
        {
          name: "Pynions",
          subtitle: "4 hours ago",
          amount: "$3,360",
          change: { value: "0.22%", direction: "down" },
          icon: "P",
          iconClassName: "bg-blue-500",
        },
        {
          name: "AI Turnpoint",
          subtitle: "2 hours ago",
          amount: "$2,906",
          change: { value: "1.81%", direction: "up" },
          icon: "A",
          iconClassName: "bg-violet-500",
        },
      ]}
      accountsAside="3m revenue change"
      accountsTitle="Publications"
      change={{ value: "2.29%", direction: "up" }}
      total="$16,825"
      totalLabel="total earnings"
      trend={trend}
    />
  );
}
