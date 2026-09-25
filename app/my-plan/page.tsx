"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useFitLog } from "@/context/FitLogContext";
import Toast from "@/components/ui/Toast";

import type { Workout } from "@/types/workout";

type Tab = "today" | "saved";

export default function MyPlanPage() {
  const [activeTab, setActiveTab] =
    useState<Tab>("today");

  const [toast, setToast] =
    useState("");

  const {
    plan,
    saved,
    removeFromPlan,
    removeSaved,
    markDone,
    isCompleted,
  } = useFitLog();

  const activeWorkouts =
    activeTab === "today"
      ? plan
      : saved;

  const totalMinutes = plan.reduce(
    (total, workout) =>
      total + workout.duration,
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + workout.calories,
    0
  );

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(
      () => setToast(""),
      3000
    );
  }

  function handleRemove(
    id: string | number,
    name: string
  ) {
    if (activeTab === "today") {
      removeFromPlan(id);
      showToast(`${name} removed from today's plan.`);
    } else {
      removeSaved(id);
      showToast(`${name} removed from saved workouts.`);
    }
  }

  function handleDone(
    id: string | number,
    name: string
  ) {
    const completed = isCompleted(id);

    markDone(id);

    showToast(
      completed
        ? `${name} marked as not completed.`
        : `${name} marked as completed.`
    );
  }

  return (
    <main className="min-h-[630px] bg-[#0c0d10]">
      <section className="mx-auto max-w-[1280px] px-6 py-10">
        <h1 className="font-heading text-3xl font-bold uppercase">
          MY PLAN
        </h1>

        <p className="mt-2 text-sm text-[#8d929d]">
          Cap of five lifts for today. Finish them,
          then load more.
        </p>

        {/* Metrics */}
        <div className="mt-8 grid grid-cols-3 gap-0">
          <Metric
            label="Exercises"
            value={plan.length}
          />

          <Metric
            label="Minutes"
            value={totalMinutes}
          />

          <Metric
            label="Calories"
            value={totalCalories}
          />
        </div>

        {/* Tabs */}
        <div className="mt-8 flex items-center justify-between border-b border-[#292d35]">
          <div className="flex">
            <button
              type="button"
              onClick={() =>
                setActiveTab("today")
              }
              className={`px-5 py-3 text-sm ${
                activeTab === "today"
                  ? "border-b-2 border-[#c2f800] text-white"
                  : "text-[#777c85]"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveTab("saved")
              }
              className={`px-5 py-3 text-sm ${
                activeTab === "saved"
                  ? "border-b-2 border-[#c2f800] text-white"
                  : "text-[#777c85]"
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-6">
          {activeWorkouts.length === 0 ? (
            <div className="flex h-[300px] flex-col items-center justify-center border border-[#292d35] bg-[#15171d] text-center">
              <h2 className="font-heading text-xl font-bold uppercase">
                NOTHING HERE YET
              </h2>

              <p className="mt-2 text-sm text-[#8d929d]">
                Browse the library and add a lift to get today moving.
              </p>

              <Link
                href="/"
                className="mt-5 bg-[#c2f800] px-6 py-2.5 text-xs font-bold uppercase text-[#0c0d10]"
              >
                Go to workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {activeWorkouts.map(
                (workout) => {
                  const completed =
                    isCompleted(
                      workout.id
                    );

                  return (
                    <article
                      key={workout.id}
                      className={`flex min-h-[114px] items-center justify-between border bg-[#14171e] px-4 py-4 ${
                        completed
                          ? "border-[#3e5412]"
                          : "border-[#292d35]"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div className="relative h-20 w-36 shrink-0 overflow-hidden bg-[#1f232b]">
                          {workout.image && (
                            <Image
                              src={workout.image}
                              alt={workout.name}
                              fill
                              sizes="144px"
                              className="object-cover"
                            />
                          )}
                        </div>

                        <div>
                          <h2
                            className={`font-heading text-2xl font-bold uppercase ${
                              completed
                                ? "text-[#6f747d] line-through"
                                : "text-white"
                            }`}
                          >
                            {workout.name}
                          </h2>

                          <p className="mt-1 text-sm text-[#777c85]">
                            {workout.equipment}
                          </p>

                          <div className="mt-2 flex gap-4 text-xs text-[#a0a5ae]">
                            <span>
                              {workout.duration} min
                            </span>

                            <span>
                              {workout.calories} kcal
                            </span>

                            <span>
                              ★ {workout.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/workout/${workout.id}`}
                          className="border border-[#3a3f48] px-4 py-2 text-xs text-white hover:border-[#c2f800]"
                        >
                          View Details
                        </Link>

                        {activeTab === "today" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDone(
                                workout.id,
                                workout.name
                              )
                            }
                            className="border border-[#3a3f48] px-4 py-2 text-xs text-white hover:border-[#c2f800]"
                          >
                            {completed
                              ? "DONE"
                              : "MARK DONE"}
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(
                              workout.id,
                              workout.name
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center border border-[#3a3f48] text-[#8d929d] hover:border-red-500 hover:text-red-400"
                        >
                          ×
                        </button>
                      </div>
                    </article>
                  );
                }
              )}
            </div>
          )}
        </div>
      </section>

      {toast && (
        <Toast
          message={toast}
          onClose={() =>
            setToast("")
          }
        />
      )}
    </main>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="border-r border-[#292d35] py-5 last:border-r-0">
      <p className="text-xs text-[#777c85]">
        {label}
      </p>

      <p className="font-heading mt-1 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}