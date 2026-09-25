"use client";

type ErrorStateProps = {
  message?: string;
};

export default function ErrorState({
  message = "Unable to load workouts.",
}: ErrorStateProps) {
  return (
    <div className="border border-[#4a2528] bg-[#15171d] p-12 text-center">
      <h3 className="font-heading text-2xl font-bold uppercase text-[#ff6868]">
        SOMETHING WENT WRONG
      </h3>

      <p className="mt-3 text-sm text-[#8d929d]">
        {message}
      </p>

      <button
        type="button"
        onClick={() =>
          window.location.reload()
        }
        className="mt-6 bg-[#c2f800] px-5 py-2.5 text-xs font-bold uppercase text-[#0c0d10]"
      >
        TRY AGAIN
      </button>
    </div>
  );
}