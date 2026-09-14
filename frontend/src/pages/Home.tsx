import { useMemo, useState } from "react";

import { AppGrid } from "../components/AppGrid";
import { SearchBar } from "../components/SearchBar";
import { TopBar } from "../components/TopBar";
import { useApps } from "../hooks/useApps";

const backgroundUrl = import.meta.env.VITE_BACKGROUND_URL;

export function Home() {
  const [search, setSearch] = useState("");

  const { apps, loading, error } = useApps();

  const filteredApps = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return apps;

    return apps.filter((app) => app.name.toLowerCase().includes(value));
  }, [apps, search]);

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
      <div className="fixed inset-0 bg-black/40" />

      <div className="relative z-10 min-h-dvh">
        <TopBar />

        <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          <div className="mb-8">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          {loading && <p className="text-sm text-white/50">Loading apps...</p>}
          {error && (
            <p className="text-sm text-red-400">Unable to load apps.</p>
          )}

          {!loading && !error && <AppGrid apps={filteredApps} />}
        </main>
      </div>
    </div>
  );
}
