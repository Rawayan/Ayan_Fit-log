import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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

type SpecCardProps = {
  label: string;
  value: string | number;
};

function SpecCard({ label, value }: SpecCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-black text-black">
        {value || "—"}
      </p>
    </div>
  );
}

export default async function WorkoutDetailPage({
  params,
}: WorkoutDetailPageProps) {
  const { id } = await params;

  let workout;

  try {
    workout = await getWorkout(id);
  } catch {
    notFound();
  }

  const categories = getCategories(workout.category);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Back to Library */}
      <section className="border-b border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-bold text-gray-500 transition hover:text-black"
          >
            <span className="mr-2 text-lg" aria-hidden="true">
              ←
            </span>

            BACK TO LIBRARY
          </Link>
        </div>
      </section>

      {/* Workout Overview */}
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

          {/* Workout Information */}
          <div>
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge key={category}>
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="mt-5 text-4xl font-black tracking-tight text-black sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-6 text-base leading-7 text-gray-600">
              {workout.description ||
                "No description available for this workout."}
            </p>

            {/* Workout Specs */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <SpecCard
                label="Equipment"
                value={workout.equipment}
              />

              <SpecCard
                label="Difficulty"
                value={workout.difficulty}
              />

              <SpecCard
                label="Sets"
                value={workout.sets}
              />

              <SpecCard
                label="Reps"
                value={workout.reps}
              />

              <SpecCard
                label="Duration"
                value={`${workout.duration} min`}
              />

              <SpecCard
                label="Calories"
                value={workout.calories}
              />

              <SpecCard
                label="Rating"
                value={`★ ${workout.rating}`}
              />
            </div>

            {/* Actions */}
            <WorkoutActions workout={workout} />
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10 lg:py-16">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-500">
            HOW TO TRAIN
          </p>

          <h2 className="mt-2 text-3xl font-black tracking-tight text-black sm:text-4xl">
            INSTRUCTIONS
          </h2>

          {workout.instructions.length > 0 ? (
            <ol className="mt-8 max-w-4xl space-y-5">
              {workout.instructions.map(
                (instruction, index) => (
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
                )
              )}
            </ol>
          ) : (
            <p className="mt-6 text-gray-600">
              No instructions available for this workout.
            </p>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-10 text-center sm:px-8 lg:px-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-md bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            BROWSE MORE WORKOUTS

            <span
              className="ml-3 text-lg"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}