"use client";

import { useEffect, useState } from "react";

import type { Workout } from "@/types/workout";
import { getWorkouts } from "@/lib/api";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/ui/Loader";
import ErrorState from "@/components/ui/ErrorState";

export default function WorkoutLibrary() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        setError("");

        const data = await getWorkouts();
        setWorkouts(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load workouts."
        );
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  if (workouts.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
        <h3 className="text-lg font-black">
          NO WORKOUTS FOUND
        </h3>

        <p className="mt-2 text-sm text-gray-600">
          No workouts are currently available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          workout={workout}
        />
      ))}
    </div>
  );
}