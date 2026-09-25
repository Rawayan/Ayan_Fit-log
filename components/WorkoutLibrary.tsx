"use client";

import { useEffect, useMemo, useState } from "react";

import { getWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";

import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/ui/Loader";
import ErrorState from "@/components/ui/ErrorState";

type SortOption = "duration" | "calories" | "rating";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] =
    useState<SortOption>("duration");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkouts();
        setWorkouts(data);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load workouts."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  const filteredAndSortedWorkouts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = workouts.filter((workout) => {
      if (!query) {
        return true;
      }

      const categories = Array.isArray(workout.category)
        ? workout.category
        : [workout.category];

      const searchableText = [
        workout.name,
        workout.description,
        workout.equipment,
        workout.difficulty,
        ...categories,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    const sorted = [...filtered];

    sorted.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }

      if (sortBy === "calories") {
        return a.calories - b.calories;
      }

      if (sortBy === "rating") {
        return b.rating - a.rating;
      }

      return 0;
    });

    return sorted;
  }, [workouts, search, sortBy]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (workouts.length === 0) {
    return (
      <div className="border border-[#292d35] bg-[#15171d] px-6 py-20 text-center">
        <h3 className="font-heading text-2xl font-bold uppercase text-white">
          NO WORKOUTS FOUND
        </h3>

        <p className="mt-2 text-sm text-[#8d929d]">
          There are no workouts available right now.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Search + Sort */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        {/* Search */}
        <div className="w-full lg:max-w-[380px]">
          <label
            htmlFor="workout-search"
            className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#777c85]"
          >
            Search
          </label>

          <div className="relative">
            <input
              id="workout-search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search workouts..."
              className="h-10 w-full border border-[#292d35] bg-[#15171d] px-4 pr-10 text-sm text-white outline-none placeholder:text-[#5f646d] focus:border-[#c2f800]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-lg leading-none text-[#777c85] transition hover:text-[#c2f800]"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-workouts"
            className="text-xs text-[#777c85]"
          >
            Sort By
          </label>

          <select
            id="sort-workouts"
            value={sortBy}
            onChange={(event) =>
              setSortBy(
                event.target.value as SortOption
              )
            }
            className="h-10 border border-[#292d35] bg-[#15171d] px-4 text-sm text-white outline-none focus:border-[#c2f800]"
          >
            <option value="duration">
              Duration
            </option>

            <option value="calories">
              Calories
            </option>

            <option value="rating">
              Rating
            </option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#777c85]">
          {filteredAndSortedWorkouts.length}{" "}
          {filteredAndSortedWorkouts.length === 1
            ? "WORKOUT"
            : "WORKOUTS"}
        </p>

        {search && (
          <p className="text-xs text-[#777c85]">
            Search:{" "}
            <span className="text-white">
              &quot;{search}&quot;
            </span>
          </p>
        )}
      </div>

      {/* Results */}
      {filteredAndSortedWorkouts.length === 0 ? (
        <div className="border border-dashed border-[#292d35] bg-[#15171d] px-6 py-20 text-center">
          <h3 className="font-heading text-2xl font-bold uppercase text-white">
            NOTHING FOUND
          </h3>

          <p className="mt-2 text-sm text-[#8d929d]">
            Try another workout name, category,
            or equipment.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-6 bg-[#c2f800] px-6 py-3 text-xs font-bold uppercase text-[#0c0d10] transition hover:bg-[#d5ff38]"
          >
            CLEAR SEARCH
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
            />
          ))}
        </div>
      )}
    </div>
  );
}