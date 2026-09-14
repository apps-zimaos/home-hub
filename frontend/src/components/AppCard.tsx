import { AppIcon } from "./AppIcon";
import type { HubApp } from "../types/app";

interface AppCardProps {
  app: HubApp;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <a
      href={app.url}
      className="
        group
        flex aspect-square flex-col
        items-center justify-center
        gap-4
        rounded-2xl
        border border-white/10
        bg-white/[0.07]
        p-5
        backdrop-blur-md
        transition-all
        duration-200
        hover:-translate-y-1
        hover:bg-white/[0.12]
        active:scale-95
      "
    >
      <AppIcon app={app} />

      <span className="text-center text-sm font-medium text-white">
        {app.name}
      </span>
    </a>
  );
}