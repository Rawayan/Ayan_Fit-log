"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import type { Workout } from "@/types/workout";

const MAX_PLAN_ITEMS = 5;

type FitLogContextType = {
  plan: Workout[];
  saved: Workout[];
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: string | number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (workoutId: string | number) => void;
  isInPlan: (workoutId: string | number) => boolean;
  isSaved: (workoutId: string | number) => boolean;
};

const FitLogContext = createContext<
  FitLogContextType | undefined
>(undefined);

export function FitLogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);

  function addToPlan(workout: Workout) {
    if (plan.some((item) => String(item.id) === String(workout.id))) {
      return false;
    }

    if (plan.length >= MAX_PLAN_ITEMS) {
      return false;
    }

    setPlan((current) => [...current, workout]);
    return true;
  }

  function removeFromPlan(workoutId: string | number) {
    setPlan((current) =>
      current.filter(
        (item) => String(item.id) !== String(workoutId)
      )
    );
  }

  function saveWorkout(workout: Workout) {
    if (
      saved.some(
        (item) => String(item.id) === String(workout.id)
      )
    ) {
      return false;
    }

    setSaved((current) => [...current, workout]);
    return true;
  }

  function removeSaved(workoutId: string | number) {
    setSaved((current) =>
      current.filter(
        (item) => String(item.id) !== String(workoutId)
      )
    );
  }

  function isInPlan(workoutId: string | number) {
    return plan.some(
      (item) => String(item.id) === String(workoutId)
    );
  }

  function isSaved(workoutId: string | number) {
    return saved.some(
      (item) => String(item.id) === String(workoutId)
    );
  }

  const value = useMemo(
    () => ({
      plan,
      saved,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      isInPlan,
      isSaved,
    }),
    [plan, saved]
  );

  return (
    <FitLogContext.Provider value={value}>
      {children}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error(
      "useFitLog must be used inside FitLogProvider"
    );
  }

  return context;
}