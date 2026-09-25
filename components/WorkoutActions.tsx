"use client";

import { useState } from "react";

import type { Workout } from "@/types/workout";
import { useFitLog } from "@/context/FitLogContext";
import Toast from "@/components/ui/Toast";

type WorkoutActionsProps = {
  workout: Workout;
};

export default function WorkoutActions({
  workout,
}: WorkoutActionsProps) {
  const {
    addToPlan,
    saveWorkout,
    isInPlan,
    isSaved,
  } = useFitLog();

  const [toast, setToast] = useState("");

  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  function showToast(message: string) {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 3000);
  }

  function handleAddToPlan() {
    if (inPlan) {
      showToast("This workout is already in today's plan.");
      return;
    }

    const added = addToPlan(workout);

    if (!added) {
      showToast(
        "Today's plan is full. You can add up to 5 lifts."
      );
      return;
    }

    showToast("Workout added to today's plan.");
  }

  function handleSave() {
    if (saved) {
      showToast("This workout is already saved.");
      return;
    }

    const savedSuccessfully = saveWorkout(workout);

    if (!savedSuccessfully) {
      showToast("This workout is already saved.");
      return;
    }

    showToast("Workout saved for later.");
  }

  return (
    <>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToPlan}
          className={`rounded-md px-6 py-3 text-sm font-bold transition ${
            inPlan
              ? "cursor-default bg-gray-200 text-gray-500"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {inPlan
            ? "ADDED TO TODAY'S PLAN"
            : "ADD TO TODAY'S PLAN"}
        </button>

        <button
          type="button"
          onClick={handleSave}
          className={`rounded-md border px-6 py-3 text-sm font-bold transition ${
            saved
              ? "cursor-default border-gray-300 bg-gray-100 text-gray-500"
              : "border-black bg-white text-black hover:bg-black hover:text-white"
          }`}
        >
          {saved ? "SAVED" : "SAVE FOR LATER"}
        </button>
      </div>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast("")}
        />
      )}
    </>
  );
}