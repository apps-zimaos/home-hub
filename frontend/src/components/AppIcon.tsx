import { AppWindow } from "lucide-react";
import { useState } from "react";

import type { HubApp } from "../types/app";

interface AppIconProps {
  app: HubApp;
  size?: "sm" | "md";
}

export function AppIcon({
  app,
  size = "md",
}: AppIconProps) {
  const [hasError, setHasError] = useState(false);

  const dimensions = {
    sm: "h-11 w-11 rounded-xl",
    md: "h-16 w-16 rounded-2xl",
  };

  if (!app.icon || hasError) {
    return (
      <div
        className={`
          ${dimensions[size]}
          flex shrink-0
          items-center justify-center
          bg-white/10
          text-white/60
          shadow-lg
        `}
      >
        <AppWindow
          size={size === "sm" ? 22 : 32}
          strokeWidth={1.5}
        />
      </div>
    );
  }

  return (
    <img
      src={app.icon}
      alt=""
      onError={() => setHasError(true)}
      className={`
        ${dimensions[size]}
        shrink-0 object-cover
        shadow-lg
      `}
    />
  );
}