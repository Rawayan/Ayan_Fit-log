"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Workout } from "@/types/workout";

const MAX_PLAN_ITEMS = 5;

const STORAGE_KEYS = {
  plan: "fitlog-plan",
  saved: "fitlog-saved",
  completed: "fitlog-completed",
};

type FitLogContextType = {
  plan: Workout[];
  saved: Workout[];
  completed: string[];
  hydrated: boolean;
  addToPlan: (workout: Workout) => boolean;
  removeFromPlan: (workoutId: string | number) => void;
  saveWorkout: (workout: Workout) => boolean;
  removeSaved: (workoutId: string | number) => void;
  markDone: (workoutId: string | number) => void;
  isCompleted: (workoutId: string | number) => boolean;
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
  const [completed, setCompleted] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load saved data from localStorage
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(STORAGE_KEYS.plan);
      const storedSaved = localStorage.getItem(STORAGE_KEYS.saved);
      const storedCompleted = localStorage.getItem(
        STORAGE_KEYS.completed
      );

      if (storedPlan) {
        const parsedPlan = JSON.parse(storedPlan);

        if (Array.isArray(parsedPlan)) {
          setPlan(parsedPlan);
        }
      }

      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);

        if (Array.isArray(parsedSaved)) {
          setSaved(parsedSaved);
        }
      }

      if (storedCompleted) {
        const parsedCompleted = JSON.parse(storedCompleted);

        if (Array.isArray(parsedCompleted)) {
          setCompleted(parsedCompleted.map(String));
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEYS.plan);
      localStorage.removeItem(STORAGE_KEYS.saved);
      localStorage.removeItem(STORAGE_KEYS.completed);
    } finally {
      setHydrated(true);
    }
  }, []);

  // Save plan
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      STORAGE_KEYS.plan,
      JSON.stringify(plan)
    );
  }, [plan, hydrated]);

  // Save saved workouts
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      STORAGE_KEYS.saved,
      JSON.stringify(saved)
    );
  }, [saved, hydrated]);

  // Save completed workouts
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(
      STORAGE_KEYS.completed,
      JSON.stringify(completed)
    );
  }, [completed, hydrated]);

  function addToPlan(workout: Workout) {
    if (
      plan.some(
        (item) => String(item.id) === String(workout.id)
      )
    ) {
      return false;
    }

    if (plan.length >= MAX_PLAN_ITEMS) {
      return false;
    }

    setPlan((current) => [...current, workout]);
    return true;
  }

  function removeFromPlan(workoutId: string | number) {
    const id = String(workoutId);

    setPlan((current) =>
      current.filter(
        (item) => String(item.id) !== id
      )
    );

    setCompleted((current) =>
      current.filter(
        (completedId) => completedId !== id
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

  function markDone(workoutId: string | number) {
    const id = String(workoutId);

    setCompleted((current) => {
      if (current.includes(id)) {
        return current.filter(
          (completedId) => completedId !== id
        );
      }

      return [...current, id];
    });
  }

  function isCompleted(workoutId: string | number) {
    return completed.includes(String(workoutId));
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
      completed,
      hydrated,
      addToPlan,
      removeFromPlan,
      saveWorkout,
      removeSaved,
      markDone,
      isCompleted,
      isInPlan,
      isSaved,
    }),
    [plan, saved, completed, hydrated]
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