import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkout } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

type WorkoutDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function getCategories(
  category: string | string[]
) {
  if (Array.isArray(category)) {
    return category;
  }

  return category
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

type SpecRowProps = {
  label: string;
  value: string | number;
};

function SpecRow({
  label,
  value,
}: SpecRowProps) {
  return (
    <div className="flex min-h-12 items-center justify-between border-b border-[#292d35] px-5 py-3 last:border-b-0">
      <span className="text-xs font-bold uppercase tracking-[0.08em] text-[#777c85]">
        {label}
      </span>

      <span className="max-w-[60%] text-right text-sm text-white">
        {value || "—"}
      </span>
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

  if (!workout) {
    notFound();
  }

  const categories = getCategories(
    workout.category
  );

  return (
    <main className="min-h-screen bg-[#0c0d10] text-white">
      {/* Back navigation */}
      <section className="border-b border-[#292d35]">
        <div className="mx-auto max-w-[1280px] px-6 py-5">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold uppercase tracking-[0.08em] text-[#777c85] transition hover:text-[#c2f800]"
          >
            <span
              className="mr-2 text-base"
              aria-hidden="true"
            >
              ←
            </span>

            Back to library
          </Link>
        </div>
      </section>

      {/* Main detail */}
      <section className="mx-auto max-w-[1280px] px-6 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden bg-[#15171d] lg:aspect-auto lg:min-h-[600px]">
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
              <div className="flex h-full min-h-[400px] items-center justify-center text-xs font-bold text-[#777c85]">
                NO IMAGE
              </div>
            )}
          </div>

          {/* Information */}
          <div className="flex flex-col justify-center">
            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="bg-[#c2f800] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#0c0d10]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="font-heading mt-5 text-4xl font-bold uppercase leading-[0.95] tracking-[-0.8px] sm:text-5xl">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-xl text-sm leading-7 text-[#8d929d]">
              {workout.description ||
                "No description available for this workout."}
            </p>

            {/* Specs */}
            <div className="mt-8 border border-[#292d35] bg-[#151922]">
              <SpecRow
                label="Equipment"
                value={workout.equipment}
              />

              <SpecRow
                label="Difficulty"
                value={workout.difficulty}
              />

              <SpecRow
                label="Sets"
                value={workout.sets}
              />

              <SpecRow
                label="Reps"
                value={workout.reps}
              />

              <SpecRow
                label="Duration"
                value={`${workout.duration} min`}
              />

              <SpecRow
                label="Calories"
                value={`${workout.calories} kcal`}
              />

              <SpecRow
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
      <section className="border-t border-[#292d35] bg-[#101217]">
        <div className="mx-auto max-w-[1280px] px-6 py-12 lg:py-16">
          <div className="max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c2f800]">
              HOW TO TRAIN
            </p>

            <h2 className="font-heading mt-2 text-3xl font-bold uppercase tracking-[-0.5px]">
              INSTRUCTIONS
            </h2>

            {workout.instructions.length > 0 ? (
              <ol className="mt-7 space-y-5">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li
                      key={`${index}-${instruction}`}
                      className="flex gap-4"
                    >
                      <span className="font-heading flex h-7 w-7 shrink-0 items-center justify-center bg-[#c2f800] text-sm font-bold text-[#0c0d10]">
                        {index + 1}
                      </span>

                      <p className="pt-0.5 text-sm leading-6 text-[#a0a5ae]">
                        {instruction}
                      </p>
                    </li>
                  )
                )}
              </ol>
            ) : (
              <p className="mt-6 text-sm text-[#777c85]">
                No instructions available for this workout.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-[#292d35] bg-[#0c0d10]">
        <div className="mx-auto max-w-[1280px] px-6 py-10 text-center">
          <Link
            href="/"
            className="inline-flex h-11 items-center bg-[#c2f800] px-7 text-xs font-bold uppercase text-[#0c0d10] transition hover:bg-[#d5ff38]"
          >
            Browse More Workouts
            <span
              className="ml-3 text-base"
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