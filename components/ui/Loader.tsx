export default function Loader() {
  return (
    <div
      className="flex min-h-40 items-center justify-center"
      role="status"
      aria-label="Loading"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}