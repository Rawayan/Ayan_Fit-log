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
  const [search, setSearch] = useState("");

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
      if (!query) return true;

      const categories = Array.isArray(workout.category)
        ? workout.category
        : [workout.category];

      return [
        workout.name,
        workout.description,
        workout.equipment,
        workout.difficulty,
        ...categories,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
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
      {/* Search + Sort */}
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="w-full lg:max-w-xl">
          <label
            htmlFor="workout-search"
            className="mb-2 block text-sm font-bold text-gray-600"
          >
            Search Workouts
          </label>

          <input
            id="workout-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search by name, equipment, category..."
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-black outline-none transition placeholder:text-gray-400 focus:border-black"
          />
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

      {/* Result Count */}
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-[0.15em] text-gray-400">
          {filteredAndSortedWorkouts.length}{" "}
          {filteredAndSortedWorkouts.length === 1
            ? "WORKOUT"
            : "WORKOUTS"}
        </p>

        {search && (
          <p className="mt-1 text-sm text-gray-500">
            Results for &quot;{search}&quot;
          </p>
        )}
      </div>

      {/* Results */}
      {filteredAndSortedWorkouts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center">
          <h3 className="text-xl font-black">
            NO MATCHES FOUND
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try a different workout name, category,
            or equipment.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
            className="mt-5 rounded-md bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800"
          >
            CLEAR SEARCH
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAndSortedWorkouts.map(
            (workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}