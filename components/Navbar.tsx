"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  planCount?: number;
  savedCount?: number;
}

export default function Navbar({
  planCount = 0,
  savedCount = 0,
}: NavbarProps) {
  const pathname = usePathname();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const isPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            priority
          />

          <span className="text-xl font-black tracking-tight">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav
          className="flex items-center gap-2 sm:gap-4"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              isWorkoutActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
              isPlanActive
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-black px-3 py-1.5 text-xs font-bold transition-colors hover:bg-black hover:text-white"
            aria-label={`${planCount} workouts in today's plan`}
          >
            <span className="hidden sm:inline">Plan</span>
            <span>{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 rounded-full border border-black px-3 py-1.5 text-xs font-bold transition-colors hover:bg-black hover:text-white"
            aria-label={`${savedCount} saved workouts`}
          >
            <span className="hidden sm:inline">Saved</span>
            <span>{savedCount}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}