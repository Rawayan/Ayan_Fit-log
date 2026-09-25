import Image from "next/image";
import Link from "next/link";

import { getWorkout } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import WorkoutActions from "@/components/WorkoutActions";

type WorkoutDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getCategories(category: string | string[]) {
  if (Array.isArray(category)) {
    return category;
  }

  return category
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    return (
      <main className="min-h-screen bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-black">
            WORKOUT NOT FOUND
          </h1>

          <p className="mt-4 text-gray-600">
            The workout you are looking for could not be found.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-md bg-black px-6 py-3 text-sm font-bold text-white hover:bg-gray-800"
          >
            BACK TO WORKOUTS
          </Link>
        </div>
      </main>
    );
  }

  const categories = getCategories(workout.category);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="text-sm font-bold text-gray-500 transition hover:text-black"
          >
            ← BACK TO LIBRARY
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-200">
            {workout.image ? (
              <Image
                src={workout.image}
                alt={workout.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-bold text-gray-400">
                NO IMAGE
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category}>{category}</Badge>
                ))}
              </div>
            )}

            <h1 className="mt-5 text-4xl font-black tracking-tight sm:text-5xl">
              {workout.name}
            </h1>

            <p className="mt-6 text-base leading-7 text-gray-600">
              {workout.description}
            </p>

            {/* Specifications */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Equipment
                </p>
                <p className="mt-2 font-bold">
                  {workout.equipment || "None"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Difficulty
                </p>
                <p className="mt-2 font-bold">
                  {workout.difficulty || "N/A"}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Sets
                </p>
                <p className="mt-2 font-bold">
                  {workout.sets}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Reps
                </p>
                <p className="mt-2 font-bold">
                  {workout.reps}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Duration
                </p>
                <p className="mt-2 font-bold">
                  {workout.duration} min
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Calories
                </p>
                <p className="mt-2 font-bold">
                  {workout.calories}
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-4 sm:col-span-3">
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Rating
                </p>
                <p className="mt-2 font-bold">
                  ★ {workout.rating}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-md bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                ADD TO TODAY&apos;S PLAN
              </button>

              <button
                type="button"
                className="rounded-md border border-black bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-black hover:text-white"
              >
                SAVE FOR LATER
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-500">
            HOW TO TRAIN
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight">
            INSTRUCTIONS
          </h2>

          {workout.instructions.length > 0 ? (
            <ol className="mt-8 space-y-5">
              {workout.instructions.map((instruction, index) => (
                <li
                  key={`${index}-${instruction}`}
                  className="flex gap-4"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
                    {index + 1}
                  </span>

                  <p className="pt-1 leading-6 text-gray-600">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-6 text-gray-600">
              No instructions available for this workout.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}