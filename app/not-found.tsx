import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gray-50 px-6 py-16">
      <section className="w-full max-w-2xl text-center">
        <p className="text-sm font-black tracking-[0.25em] text-gray-400">
          ERROR 404
        </p>

        <h1 className="mt-4 text-6xl font-black tracking-tight text-black sm:text-8xl">
          PAGE NOT FOUND
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-gray-600 sm:text-lg">
          The page you are looking for does not exist or may have
          been moved.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
        >
          BACK TO WORKOUTS
          <span className="ml-3 text-lg" aria-hidden="true">
            →
          </span>
        </Link>
      </section>
    </main>
  );
}