import { useCallback, useEffect, useState } from "react";

import { getApps } from "../services/apps";
import type { HubApp } from "../types/app";

export function useApps() {
  const [apps, setApps] = useState<HubApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authRequired, setAuthRequired] = useState(false);

  const loadApps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setAuthRequired(false);

      const data = await getApps();
      setApps(data);
    } catch (error) {
      if (error instanceof Error && error.message === "AUTH_REQUIRED") {
        setAuthRequired(true);
        return;
      }

      setError("Unable to load apps.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApps();
  }, [loadApps]);

  return {
    apps,
    loading,
    error,
    reload: loadApps,
    authRequired,
  };
}
