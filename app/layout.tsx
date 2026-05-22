import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"

import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Craftled UI",
  description:
    "A craft-led, shadcn-native component library. Install via the shadcn CLI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <div className="mx-auto flex w-full max-w-screen-2xl flex-1 gap-8 px-6">
            <SiteSidebar />
            <main className="min-w-0 flex-1 py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
