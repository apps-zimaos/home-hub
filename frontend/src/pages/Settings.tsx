import { ArrowLeft, Pencil, Plus, Trash2 } from "lucide-react";

import { useState } from "react";
import { Link } from "react-router-dom";

import { AppIcon } from "../components/AppIcon";
import { AppModal } from "../components/AppModal";
import { DeleteAppModal } from "../components/DeleteAppModal";
import { useApps } from "../hooks/useApps";
import { createApp, deleteApp, updateApp } from "../services/apps";
import type { AppFormData, HubApp } from "../types/app";

const backgroundUrl = import.meta.env.VITE_BACKGROUND_URL;

export function Settings() {
  const { apps, loading, reload } = useApps();

  const [modalOpen, setModalOpen] = useState(false);

  const [selectedApp, setSelectedApp] = useState<HubApp | null>(null);

  const [appToDelete, setAppToDelete] = useState<HubApp | null>(null);

  function handleCreate() {
    setSelectedApp(null);
    setModalOpen(true);
  }

  function handleEdit(app: HubApp) {
    setSelectedApp(app);
    setModalOpen(true);
  }

  async function handleSubmit(data: AppFormData) {
    if (selectedApp) {
      await updateApp(selectedApp.id, data);
    } else {
      await createApp(data);
    }

    await reload();
  }

  async function handleDelete() {
    if (!appToDelete) return;

    await deleteApp(appToDelete.id);
    await reload();
  }

  return (
    <div
      className="min-h-dvh bg-zinc-950 bg-cover bg-center bg-fixed"
      style={
        backgroundUrl
          ? {
              backgroundImage: `url("${backgroundUrl}")`,
            }
          : undefined
      }
    >
      <div className="fixed inset-0 bg-black/50" />

      <div className="relative z-10 min-h-dvh">
        <header className="flex h-12 items-center border-b border-white/5 bg-black/30 px-5 backdrop-blur-xl">
          <Link
            to="/"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 hover:bg-white/10"
          >
            <ArrowLeft size={18} />
          </Link>
        </header>

        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-white">Settings</h1>

            <p className="mt-1 text-sm text-white/50">
              Manage your apps and preferences.
            </p>
          </div>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <h2 className="font-medium text-white">Apps</h2>

                <p className="mt-1 text-sm text-white/40">
                  Manage the services displayed on your Home Hub.
                </p>
              </div>

              <button
                onClick={handleCreate}
                className="
                  flex h-9 items-center gap-2
                  rounded-lg bg-white px-3
                  text-sm font-medium text-black
                  transition
                  hover:bg-white/90
                  active:scale-95
                  cursor-pointer
                "
              >
                <Plus size={16} />
                <span>Add app</span>
              </button>
            </div>

            {!loading && (
              <div className="divide-y divide-white/10">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-white/4"
                  >
                    <AppIcon app={app} size="sm" />

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white">{app.name}</p>

                      <p className="truncate text-sm text-white/40">
                        {app.url}
                      </p>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(app)}
                        aria-label={`Edit ${app.name}`}
                        title="Edit"
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-lg
                          text-white/40
                          transition
                          hover:bg-white/10 hover:text-white
                          cursor-pointer
                        "
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() => setAppToDelete(app)}
                        aria-label={`Delete ${app.name}`}
                        title="Delete"
                        className="
                          flex h-9 w-9 items-center justify-center
                          rounded-lg
                          text-white/40
                          transition
                          hover:bg-red-500/10 hover:text-red-400
                          cursor-pointer
                        "
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && apps.length === 0 && (
              <div className="px-5 py-12 text-center">
                <p className="text-sm text-white/50">No apps added yet.</p>

                <p className="mt-1 text-xs text-white/30">
                  Add your first app to get started.
                </p>
              </div>
            )}
          </section>
        </main>
      </div>

      {modalOpen && (
        <AppModal
          app={selectedApp}
          onClose={() => {
            setModalOpen(false);
            setSelectedApp(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {appToDelete && (
        <DeleteAppModal
          app={appToDelete}
          onClose={() => setAppToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
