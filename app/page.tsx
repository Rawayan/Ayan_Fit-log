import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="border-b border-black bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-24">
          {/* Hero Content */}
          <div>
            <p className="mb-5 text-sm font-bold tracking-[0.2em] text-gray-600">
              WORKOUT LIBRARY
            </p>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-black sm:text-6xl lg:text-7xl">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              FitLog is a dark, no-nonsense gym companion: pick a lift,
              lock it into today&apos;s plan, and watch the week&apos;s work
              add up.
            </p>

            <Link
              href="#library"
              className="mt-8 inline-flex items-center rounded-md bg-black px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-gray-800"
            >
              BROWSE WORKOUTS
              <span className="ml-3 text-lg" aria-hidden="true">
                →
              </span>
            </Link>
          </div>

          {/* Hero Image */}
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

      {/* Workout Library Anchor */}
      <section
        id="library"
        className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10"
      >
        <p className="text-sm font-bold tracking-[0.2em] text-gray-500">
          THE LIBRARY
        </p>

        <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
          Workout Library
        </h2>

        <p className="mt-3 text-gray-600">
          Your workouts will appear here in the next step.
        </p>
      </section>
    </main>
  );
}