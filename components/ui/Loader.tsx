export default function Loader() {
  return (
    <div
      className="flex min-h-[260px] items-center justify-center"
      role="status"
      aria-label="Loading workouts"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
    </div>
  );
}