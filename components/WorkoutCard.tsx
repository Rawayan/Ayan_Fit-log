import Image from "next/image";
import Link from "next/link";

import type { Workout } from "@/types/workout";

type WorkoutCardProps = {
  workout: Workout;
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

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  const categories = getCategories(workout.category);

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-black hover:shadow-lg"
    >
      {/* Image */}
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

        {/* Category */}
        {categories.length > 0 && (
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-black shadow-sm"
              >
                {category}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-black tracking-tight text-black">
          {workout.name}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {workout.equipment || "No equipment"}
        </p>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-3 border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
              Duration
            </p>
            <p className="mt-1 text-sm font-bold text-black">
              {workout.duration} min
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
              Calories
            </p>
            <p className="mt-1 text-sm font-bold text-black">
              {workout.calories}
            </p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
              Rating
            </p>
            <p className="mt-1 text-sm font-bold text-black">
              ★ {workout.rating}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}