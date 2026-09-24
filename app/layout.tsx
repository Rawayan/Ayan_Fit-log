import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description:
    "FitLog is a workout library and planning companion for tracking your training.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}