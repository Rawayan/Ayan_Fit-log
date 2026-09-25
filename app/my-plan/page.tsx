"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useFitLog } from "@/context/FitLogContext";
import EmptyState from "@/components/ui/EmptyState";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState<Tab>("today");

  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
  } = useFitLog();

  const activeWorkouts =
    activeTab === "today" ? plan : saved;

  const totalMinutes = plan.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) => total + workout.calories,
    0
  );

  function handleRemove(id: string | number) {
    if (activeTab === "today") {
      removeFromPlan(id);
    } else {
      removeSaved(id);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="border-b border-black bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
          <p className="text-sm font-bold tracking-[0.2em] text-gray-500">
            FITLOG
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-4 max-w-2xl text-gray-600">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
      </section>

      {/* Metrics */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard
            label="Exercises"
            value={plan.length}
          />

          <MetricCard
            label="Minutes"
            value={totalMinutes}
          />

          <MetricCard
            label="Calories"
            value={totalCalories}
          />
        </div>
      </section>

      {/* Tabs */}
      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="flex border-b border-gray-200">
          <button
            type="button"
            onClick={() => setActiveTab("today")}
            className={`border-b-2 px-5 py-3 text-sm font-bold transition ${
              activeTab === "today"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            TODAY&apos;S PLAN
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
              {plan.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-5 py-3 text-sm font-bold transition ${
              activeTab === "saved"
                ? "border-black text-black"
                : "border-transparent text-gray-500 hover:text-black"
            }`}
          >
            SAVED
            <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs">
              {saved.length}
            </span>
          </button>
        </div>
      </section>

      {/* Workout List */}
      <section className="mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-10">
        {activeWorkouts.length === 0 ? (
          <EmptyState
            title="NOTHING HERE YET"
            description="Browse the library and add a lift to get today moving."
            action={
              <Link
                href="/"
                className="inline-flex rounded-md bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-gray-800"
              >
                GO TO WORKOUTS
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {activeWorkouts.map((workout) => (
              <WorkoutPlanCard
                key={workout.id}
                workout={workout}
                activeTab={activeTab}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

type MetricCardProps = {
  label: string;
  value: number;
};

function MetricCard({
  label,
  value,
}: MetricCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>
    </div>
  );
}

type WorkoutPlanCardProps = {
  workout: import("@/types/workout").Workout;
  activeTab: Tab;
  onRemove: (id: string | number) => void;
};

function WorkoutPlanCard({
  workout,
  activeTab,
  onRemove,
}: WorkoutPlanCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative h-52 w-full shrink-0 bg-gray-100 sm:h-auto sm:w-56">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 640px) 100vw, 224px"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm font-bold text-gray-400">
              NO IMAGE
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between p-5">
          <div>
            <h2 className="text-xl font-black">
              {workout.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {workout.equipment || "No equipment"}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span>
                <strong>{workout.duration}</strong> min
              </span>

              <span>
                <strong>{workout.calories}</strong> cal
              </span>

              <span>
                <strong>★ {workout.rating}</strong>
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`/workout/${workout.id}`}
              className="rounded-md bg-black px-4 py-2.5 text-xs font-bold text-white transition hover:bg-gray-800"
            >
              VIEW DETAILS
            </Link>

            {activeTab === "today" && (
              <button
                type="button"
                className="rounded-md border border-gray-300 px-4 py-2.5 text-xs font-bold text-gray-700 transition hover:border-black hover:text-black"
              >
                MARK DONE
              </button>
            )}

            <button
              type="button"
              onClick={() => onRemove(workout.id)}
              className="rounded-md border border-red-200 px-4 py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-50"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}