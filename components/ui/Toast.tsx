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
    <div className="fixed bottom-6 right-6 z-[100] flex max-w-sm items-center gap-4 border border-[#c2f800] bg-[#15171d] px-5 py-4 text-sm text-white shadow-2xl">
      <span>{message}</span>

      <button
        type="button"
        onClick={onClose}
        className="text-lg text-[#c2f800]"
      >
        ×
      </button>
    </div>
  );
}