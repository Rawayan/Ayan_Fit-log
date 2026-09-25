import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.png"
            alt="FitLog"
            width={28}
            height={28}
            className="rounded-sm invert"
          />

          <span className="text-lg font-black tracking-tight">
            FITLOG
          </span>
        </Link>

        <p className="text-xs leading-5 text-gray-400 sm:text-sm lg:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}