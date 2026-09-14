import { X } from "lucide-react";
import { useEffect, useState } from "react";

import type { AppFormData, HubApp } from "../types/app";

interface AppModalProps {
  app?: HubApp | null;
  onClose: () => void;
  onSubmit: (data: AppFormData) => Promise<void>;
}

export function AppModal({ app, onClose, onSubmit }: AppModalProps) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!app) return;

    setName(app.name);
    setUrl(app.url);
    setIcon(app.icon ?? "");
  }, [app]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        name,
        url,
        icon,
      });

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
          w-full max-w-md
          rounded-2xl
          border border-white/10
          bg-zinc-900/95
          shadow-2xl
          backdrop-blur-xl
        "
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 className="font-medium text-white">
            {app ? "Edit app" : "Add app"}
          </h2>

          <button onClick={onClose} className="text-white/50 hover:text-white cursor-pointer">
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5 p-5">
          <Field label="Name">
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="English"
              className={inputClass}
            />
          </Field>

          <Field label="URL">
            <input
              required
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://english.example.com"
              className={inputClass}
            />
          </Field>

          <Field label="Icon URL">
            <input
              type="url"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </Field>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-sm text-white/60 hover:bg-white/10 cursor-pointer"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Saving..." : app ? "Save changes" : "Add app"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/60">{label}</span>

      {children}
    </label>
  );
}

const inputClass = `
  w-full
  rounded-xl
  border border-white/10
  bg-white/[0.06]
  px-4 py-3
  text-sm text-white
  outline-none
  transition
  placeholder:text-white/20
  focus:border-white/30
  focus:bg-white/[0.09]
`;
