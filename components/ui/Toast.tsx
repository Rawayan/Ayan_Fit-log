"use client";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export default function Toast({
  message,
  onClose,
}: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-4 rounded-lg bg-black px-5 py-4 text-sm font-bold text-white shadow-xl">
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="text-lg leading-none text-gray-300 hover:text-white"
      >
        ×
      </button>
    </div>
  );
}