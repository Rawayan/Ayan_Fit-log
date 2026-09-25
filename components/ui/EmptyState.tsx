import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: ReactNode;
};

export default function EmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-5 py-10 text-center sm:px-6 sm:py-12">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 sm:h-16 sm:w-16">
        <span
          className="text-2xl font-black text-gray-400"
          aria-hidden="true"
        >
          +
        </span>
      </div>

      <h2 className="mt-5 text-xl font-black tracking-tight text-black sm:mt-6 sm:text-2xl">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
}