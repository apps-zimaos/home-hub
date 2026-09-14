import { Trash2, X } from "lucide-react";
import { useState } from "react";

import type { HubApp } from "../types/app";

interface DeleteAppModalProps {
  app: HubApp;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export function DeleteAppModal({
  app,
  onClose,
  onConfirm,
}: DeleteAppModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    try {
      setLoading(true);
      await onConfirm();
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/60
        p-4
        backdrop-blur-sm
      "
    >
      <div
        className="
          w-full max-w-sm
          rounded-2xl
          border border-white/10
          bg-zinc-900/95
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <header className="flex items-center justify-between px-5 pt-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
            <Trash2 size={20} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg text-white/40
              transition
              hover:bg-white/10 hover:text-white
              cursor-pointer
            "
          >
            <X size={18} />
          </button>
        </header>

        <div className="px-5 pb-5 pt-4">
          <h2 className="text-lg font-medium text-white">
            Delete app?
          </h2>

          <p className="mt-2 text-sm leading-6 text-white/50">
            Are you sure you want to delete{" "}
            <span className="font-medium text-white/80">
              {app.name}
            </span>
            ? This action cannot be undone.
          </p>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-lg px-4 py-2
                text-sm text-white/60
                transition
                hover:bg-white/10 hover:text-white
                disabled:opacity-50
                cursor-pointer
              "
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="
                flex items-center gap-2
                rounded-lg
                bg-red-500
                px-4 py-2
                text-sm font-medium text-white
                transition
                hover:bg-red-400
                disabled:cursor-not-allowed
                disabled:opacity-50
                cursor-pointer
              "
            >
              <Trash2 size={16} />

              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}