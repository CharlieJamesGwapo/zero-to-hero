import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/site-header";
import { MotionController } from "@/components/motion-controller";
import { Suspense } from "react";
import "./globals.css";
import "./motion.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "ZERO → HERO — Learn. Build. Ship.",
    template: "%s | ZERO → HERO",
  },
  description:
    "A practical, open-source path from your first line of code to building and shipping full-stack applications.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "https://zero-to-hero-omega-one.vercel.app",
  ),
  openGraph: {
    title: "ZERO → HERO — Learn. Build. Ship.",
    description:
      "A practical, open-source path from web fundamentals to building, shipping, and contributing to software.",
    images: [
      {
        url: "/zero-to-hero-logo.png",
        width: 1254,
        height: 1254,
        alt: "ZERO → HERO logo",
      },
    ],
  },
  icons: { icon: "/brand-icon.svg" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <Suspense fallback={null}>
          <MotionController />
        </Suspense>
      </body>
    </html>
  );
}
