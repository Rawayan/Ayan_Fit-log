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

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 22c4.5 0 7-3 7-7.2 0-3.7-2.1-6.2-4.7-8.8.1 2.7-1 4.2-2.4 5.1.2-4-1.7-6.8-3.4-8.1.2 4.4-4.5 7-4.5 11.8C4 19 7.3 22 12 22Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
    </svg>
  );
}

export default function WorkoutCard({
  workout,
}: WorkoutCardProps) {
  const categories = getCategories(
    workout.category
  );

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-[#292d35] bg-[#15171d] transition hover:border-[#c2f800]"
    >
      {/* Image */}
      <div className="relative h-[192px] overflow-hidden bg-[#1f232b]">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-[#6f747d]">
            NO IMAGE
          </div>
        )}
      </div>

      {/* Content */}
      <div className="h-[174px] px-6 py-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="bg-[#c2f800] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0c0d10]"
            >
              {category}
            </span>
          ))}
        </div>

        <h3 className="font-heading mt-2 text-[22px] font-bold uppercase leading-9 tracking-[-0.4px]">
          {workout.name}
        </h3>

        <p className="text-sm text-[#8d929d]">
          {workout.equipment || "No equipment"}
        </p>

        <div className="mt-3 flex items-center gap-5 border-t border-[#292d35] pt-3 text-xs text-[#b0b4bc]">
          <span className="flex items-center gap-1.5">
            <ClockIcon />
            {workout.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <FlameIcon />
            {workout.calories} kcal
          </span>

          <span className="flex items-center gap-1.5">
            <StarIcon />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}