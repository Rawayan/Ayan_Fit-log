"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useFitLog } from "@/context/FitLogContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const workoutActive =
    pathname === "/" ||
    pathname.startsWith("/workout/");

  const planActive =
    pathname.startsWith("/my-plan");

  return (
    <header className="sticky top-0 z-50 h-[67px] border-b border-[#292d35] bg-[#0f1115]">
      <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            priority
          />

          <span className="font-heading text-xl font-bold uppercase tracking-[-0.5px]">
            FITLOG
          </span>
        </Link>

        {/* Navigation */}
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center">
          <Link
            href="/"
            className={`px-4 py-2 text-sm transition ${
              workoutActive
                ? "text-white"
                : "text-[#8d929d] hover:text-white"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`px-4 py-2 text-sm transition ${
              planActive
                ? "text-white"
                : "text-[#8d929d] hover:text-white"
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counters */}
        <Link
          href="/my-plan"
          className="flex items-center gap-7"
        >
          <div className="flex items-center gap-2 text-sm text-[#c6cad2]">
            <span>Plan</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#c2f800] px-1.5 text-[11px] font-bold text-[#0c0d10]">
              {plan.length}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#c6cad2]">
            <span>Saved</span>

            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-[#3a3f48] px-1.5 text-[11px] font-bold text-white">
              {saved.length}
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}