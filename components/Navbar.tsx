"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout/");

  const isPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            priority
          />

          <span className="text-lg font-black tracking-tight">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
              isWorkoutActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            WORKOUTS
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-md px-3 py-2 text-xs font-bold transition sm:px-4 sm:text-sm ${
              isPlanActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            MY PLAN
          </Link>
        </nav>

        {/* Counters */}
        <Link
          href="/my-plan"
          className="hidden items-center gap-2 sm:flex"
        >
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-black">
            PLAN {plan.length}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-black">
            SAVED {saved.length}
          </span>
        </Link>
      </div>

      {/* Mobile counters */}
      <div className="border-t border-gray-100 px-4 py-2 sm:hidden">
        <Link
          href="/my-plan"
          className="flex items-center justify-center gap-2"
        >
          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold">
            PLAN {plan.length}
          </span>

          <span className="rounded-full bg-gray-100 px-3 py-1 text-[11px] font-bold">
            SAVED {saved.length}
          </span>
        </Link>
      </div>
    </header>
  );
}