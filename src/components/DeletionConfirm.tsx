type DeletionConfirmProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
};

export default function DeletionConfirm({
  open,
  onClose,
  onConfirm,
  title = "Confirm delete",
  description = "Are you sure you want to delete this recipe? This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  isLoading = false,
}: DeletionConfirmProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            className="px-4 py-2 rounded-md dark:bg-[#c9ad80] dark:hover:bg-[#b89a5e] dark:text-black bg-green-950/80 hover:bg-green-950 text-white cursor-pointer"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
