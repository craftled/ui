import type { Metadata } from "next";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { SiteSidebar } from "@/components/site-sidebar";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ui.craftled.com"),
  title: {
    default: "Craftled UI",
    template: "%s · Craftled UI",
  },
  description:
    "A craft-led, shadcn-native component library. Charts, blocks, shaders, and primitives — copy/paste with the shadcn CLI.",
  openGraph: {
    title: "Craftled UI",
    description:
      "A craft-led, shadcn-native component library. Charts, blocks, shaders, and primitives — copy/paste with the shadcn CLI.",
    url: "https://ui.craftled.com",
    siteName: "Craftled UI",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Craftled UI",
    description:
      "A craft-led, shadcn-native component library. Charts, blocks, shaders, and primitives — copy/paste with the shadcn CLI.",
    creator: "@tomaslau",
    site: "@craftled_",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <div className="flex min-h-svh flex-col">
            <SiteHeader />
            <div className="mx-auto flex w-full max-w-screen-2xl flex-1 justify-center gap-8 px-6">
              <SiteSidebar />
              <main className="w-full min-w-0 max-w-[700px] py-8">
                {children}
              </main>
              <aside
                className="hidden w-56 shrink-0 py-8 md:block"
                id="controls-rail-mount"
              />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
