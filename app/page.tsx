import Image from "next/image";
import Link from "next/link";

import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="mx-auto max-w-[1280px] px-4 sm:px-6 pt-6">
        <div className="grid min-h-[460px] grid-cols-1 items-center gap-8 rounded-2xl bg-[#222630] px-6 py-12 lg:grid-cols-2 lg:px-[57px]">
          {/* Left */}
          <div className="max-w-[558px]">
            <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#c2f800]">
              WORKOUT LIBRARY
            </p>

            <h1 className="font-heading text-[60px] font-bold uppercase leading-none tracking-[-1.5px]">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-[512px] text-sm leading-6 text-[#8d929d]">
              FitLog is a dark, no-nonsense gym companion:
              pick a lift, lock it into today&apos;s plan,
              and watch the week&apos;s work add up.
            </p>

            <Link
              href="#library"
              className="mt-5 inline-flex h-10 items-center rounded-md bg-[#c2f800] px-6 text-xs font-bold uppercase text-[#0c0d10] transition hover:bg-[#d5ff38]"
            >
              BROWSE WORKOUTS
            </Link>
          </div>

          {/* Banner */}
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/banner.png"
              alt="FitLog training"
              width={334}
              height={334}
              priority
              className="h-[334px] w-[334px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section
        id="library"
        className="mx-auto max-w-[1280px] px-4 sm:px-6 pb-24 pt-8"
      >
        <div className="mb-10">
          <h2 className="font-heading text-3xl font-bold uppercase tracking-[-0.75px]">
            THE LIBRARY
          </h2>

          <p className="mt-2 text-sm text-[#8d929d]">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <WorkoutLibrary />
      </section>
    </main>
  );
}