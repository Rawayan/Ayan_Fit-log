interface EmptyStateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  children,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-60 flex-col items-center justify-center px-6 text-center">
      <h2 className="text-xl font-bold">{title}</h2>

      <p className="mt-2 max-w-md text-sm text-gray-600">
        {description}
      </p>

      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}