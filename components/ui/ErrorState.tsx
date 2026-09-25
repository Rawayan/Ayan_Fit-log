type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({
  message = "Unable to load workouts.",
}: ErrorStateProps) {
  return (
    <div
      className="rounded-xl border border-red-200 bg-red-50 p-8 text-center"
      role="alert"
    >
      <h3 className="text-lg font-black text-red-700">
        SOMETHING WENT WRONG
      </h3>

      <p className="mt-2 text-sm text-red-600">
        {message}
      </p>

      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-5 rounded-md bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gray-800"
      >
        TRY AGAIN
      </button>
    </div>
  );
}