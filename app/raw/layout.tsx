import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import type * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

/**
 * Layout for /raw/[name] — no header, no sidebar, no chrome. Used as
 * iframe src by the full-bleed preview shell so blocks can be inspected
 * at real viewport widths with their media queries firing correctly.
 *
 * Re-declares the font next/font instances because iframes are separate
 * documents and don't inherit the parent's font CSS.
 */
export default function RawLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      <div
        className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} min-h-svh font-sans antialiased`}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
