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

  const sortedWorkouts = useMemo(() => {
    const sorted = [...workouts];

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
  }, [workouts, sortBy]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (workouts.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
        <h3 className="text-xl font-black">
          NO WORKOUTS FOUND
        </h3>

        <p className="mt-2 text-gray-600">
          There are no workouts available right now.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400">
            {workouts.length} WORKOUTS
          </p>

          <h3 className="mt-1 text-2xl font-black">
            Choose your next lift
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="sort-workouts"
            className="text-sm font-bold text-gray-600"
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
            className="rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-bold text-black outline-none transition focus:border-black"
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            workout={workout}
          />
        ))}
      </div>
    </div>
  );
}