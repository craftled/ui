import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import type * as React from "react";

import { ThemeProvider } from "@/components/theme-provider";

import "../globals.css";

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
 * Root layout for /raw/[name] — no header, no sidebar, no chrome. Used as
 * iframe src by the full-bleed preview shell so blocks can be inspected
 * at real viewport widths with their media queries firing correctly.
 *
 * Lives in the (raw) route group so it does NOT inherit the docs site's
 * SiteHeader. Both this and app/(docs)/layout.tsx are root layouts —
 * each owns its own <html>/<body> — and Next.js full-page-reloads when
 * switching between them. Acceptable: we only navigate to /raw via
 * iframe src, never via client-side routing.
 */
export default function RawRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${geistMono.variable} ${instrumentSerif.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <div className="min-h-svh">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
