import { getWorkouts } from "@/lib/api";

export default async function ApiTestPage() {
  try {
    const workouts = await getWorkouts();

    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-black">
            API Test
          </h1>

          <p className="mt-2 text-gray-600">
            Total workouts: {workouts.length}
          </p>

          <div className="mt-8 space-y-4">
            {workouts.slice(0, 5).map((workout) => (
              <div
                key={workout.id}
                className="rounded-xl border border-gray-200 bg-white p-5"
              >
                <h2 className="text-lg font-bold">
                  {workout.name}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                  ID: {workout.id}
                </p>

                <p className="mt-2 text-sm text-gray-600">
                  {workout.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-black">
            API Error
          </h1>

          <p className="mt-4 text-red-600">
            {error instanceof Error
              ? error.message
              : "Unable to load workouts."}
          </p>
        </div>
      </main>
    );
  }
}