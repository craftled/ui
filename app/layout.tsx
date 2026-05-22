import type { Metadata } from "next"
import { Inter, Geist_Mono } from "next/font/google"

import { SiteHeader } from "@/components/site-header"
import { SiteSidebar } from "@/components/site-sidebar"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
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
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <div className="mx-auto flex w-full max-w-screen-2xl flex-1 gap-8 px-6">
            <SiteSidebar />
            <main className="min-w-0 max-w-[700px] flex-1 py-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
