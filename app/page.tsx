import Image from "next/image";
import Link from "next/link";

import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-black bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-gray-600 sm:mb-5 sm:text-sm">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-6 text-gray-600 sm:mt-6 sm:text-lg sm:leading-7">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <Link
              href="#library"
              className="mt-7 inline-flex items-center rounded-md bg-black px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 sm:mt-8 sm:px-6"
            >
              BROWSE WORKOUTS

              <span
                className="ml-3 text-lg"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-2xl bg-gray-100">
              <Image
                src="/banner.png"
                alt="FitLog workout training"
                width={334}
                height={334}
                priority
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Library */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="mb-8 sm:mb-10">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-500 sm:text-sm">
            THE LIBRARY
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Workout Library
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <WorkoutLibrary />
      </section>
    </main>
  );
}