interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  title = "Something went wrong",
  message = "We could not load the workouts.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-gray-600">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-md bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
        >
          Try Again
        </button>
      )}
    </div>
  );
}