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
    default: "ZERO → HERO DEV — Learn. Build. Ship.",
    template: "%s | ZERO → HERO DEV",
  },
  description:
    "A practical, open-source path from your first line of code to building and shipping full-stack applications.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://zerotoherodev.vercel.app",
  ),
  authors: [
    {
      name: "Charlie James Z. Abejo",
      url: "https://portfoliobboy.vercel.app/",
    },
  ],
  creator: "Charlie James Z. Abejo",
  openGraph: {
    title: "ZERO → HERO DEV — Learn. Build. Ship.",
    description:
      "A practical, open-source path from web fundamentals to building, shipping, and contributing to software.",
    images: [
      {
        url: "/logo.png",
        width: 1254,
        height: 1254,
        alt: "ZERO → HERO logo",
      },
    ],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Suspense fallback={null}>
          <MotionController />
        </Suspense>
      </body>
    </html>
  );
}
