import type { HubApp } from "../types/app";
import { AppCard } from "./AppCard";

interface AppGridProps {
  apps: HubApp[];
}

export function AppGrid({ apps }: AppGridProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-lg font-medium text-white">
          Remote Apps ({apps.length})
        </h1>

        <button
          className="
            flex h-8 w-8
            items-center justify-center
            rounded-lg
            text-xl text-white/70
            transition
            hover:bg-white/10
            hover:text-white
            cursor-pointer
          "
        >
          +
        </button>
      </div>

      <div
        className="
          grid
          grid-cols-2
          gap-3
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  );
}