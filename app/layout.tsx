import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FitLogProvider } from "@/context/FitLogContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a dark, no-nonsense gym companion.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable}`}
    >
      <body>
        <FitLogProvider>
          <Suspense fallback={<div className="h-[67px]" />}>
            <Navbar />
          </Suspense>
          {children}
          <Footer />
        </FitLogProvider>
      </body>
    </html>
  );
}