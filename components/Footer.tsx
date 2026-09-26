import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#292d35] bg-[#0c0d10]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-0 sm:h-[85px]">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={20}
            height={20}
          />

          <span className="font-heading text-sm font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <p className="text-center text-xs text-[#747983]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}