import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/types/workout";

type WorkoutCardProps = {
  workout: Workout;
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

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  const categories = getCategories(workout.category);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-black hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-bold text-gray-400">
            NO IMAGE
          </div>
        )}

        {categories.length > 0 && (
          <div className="absolute left-3 top-3 flex max-w-[calc(100%-24px)] flex-wrap gap-2 sm:left-4 sm:top-4">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-black shadow-sm sm:px-3 sm:text-xs"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg font-black tracking-tight text-black sm:text-xl">
          {workout.name}
        </h3>

        <p className="mt-2 truncate text-sm text-gray-500">
          {workout.equipment || "No equipment"}
        </p>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 sm:text-xs">
              Duration
            </p>

            <p className="mt-1 text-xs font-bold text-black sm:text-sm">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 sm:text-xs">
              Calories
            </p>

            <p className="mt-1 text-xs font-bold text-black sm:text-sm">
              {workout.calories}
            </p>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wide text-gray-400 sm:text-xs">
              Rating
            </p>

            <p className="mt-1 text-xs font-bold text-black sm:text-sm">
              ★ {workout.rating}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}