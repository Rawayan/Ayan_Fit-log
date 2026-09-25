"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const isWorkoutActive =
    pathname === "/" || pathname.startsWith("/workout");

  const isPlanActive = pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 border-b border-black bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="FitLog home"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
          />

          <span className="text-xl font-black tracking-tight">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`rounded-md px-3 py-2 text-sm font-bold transition ${
              isWorkoutActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            WORKOUT
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-md px-3 py-2 text-sm font-bold transition ${
              isPlanActive
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-black"
            }`}
          >
            MY PLAN
          </Link>

          {/* Counters */}
          <Link
            href="/my-plan"
            className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-bold sm:flex"
          >
            <span>PLAN</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-white">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-bold sm:flex"
          >
            <span>SAVED</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-white">
              {saved.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}