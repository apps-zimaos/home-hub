import { Settings } from "lucide-react";
import { Link } from "react-router-dom";

const systemName = import.meta.env.VITE_SYSTEM_NAME || "Home Hub";

export function TopBar() {
  return (
    <header
      className="
        flex h-12
        items-center
        justify-between
        border-b border-white/5
        bg-black/30
        px-5
        backdrop-blur-xl
      "
    >
      <span className="text-sm font-medium text-white/80">
        {systemName}
      </span>

      <Link
        to="/settings"
        className="
          flex h-8 w-8
          items-center justify-center
          rounded-lg
          text-white/70
          transition
          hover:bg-white/10
          hover:text-white
        "
      >
        <Settings />
      </Link>
    </header>
  );
}