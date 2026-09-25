import type { Workout } from "@/types/workout";

const API_BASE_URL =
  "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const response = await fetch(API_BASE_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch workouts: ${response.status}`
    );
  }

  const data = await response.json();

  return normalizeWorkoutList(data);
}

export async function getWorkout(
  id: string
): Promise<Workout> {
  const response = await fetch(
    `${API_BASE_URL}/${encodeURIComponent(id)}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch workout: ${response.status}`
    );
  }

  const data = await response.json();

  return normalizeWorkout(data);
}

function normalizeWorkoutList(data: unknown): Workout[] {
  if (Array.isArray(data)) {
    return data.map(normalizeWorkout);
  }

  if (
    typeof data === "object" &&
    data !== null &&
    "data" in data
  ) {
    const payload = (data as { data: unknown }).data;

    if (Array.isArray(payload)) {
      return payload.map(normalizeWorkout);
    }
  }

  throw new Error("Invalid workout list response.");
}

function normalizeWorkout(data: unknown): Workout {
  if (
    typeof data !== "object" ||
    data === null
  ) {
    throw new Error("Invalid workout response.");
  }

  const item = data as Record<string, unknown>;

  return {
    id: String(item.id ?? ""),
    name: String(
      item.name ?? item.title ?? "Untitled Workout"
    ),
    description: String(item.description ?? ""),
    image: String(
      item.image ?? item.imageUrl ?? item.thumbnail ?? ""
    ),
    category:
      typeof item.category === "string"
        ? item.category
        : Array.isArray(item.category)
          ? item.category.map(String)
          : "",
    equipment: String(item.equipment ?? ""),
    difficulty: String(item.difficulty ?? ""),
    sets: Number(item.sets ?? 0),
    reps: Number(item.reps ?? 0),
    duration: Number(item.duration ?? 0),
    calories: Number(item.calories ?? 0),
    rating: Number(item.rating ?? 0),
    instructions: Array.isArray(item.instructions)
      ? item.instructions.map(String)
      : [],
  };
}