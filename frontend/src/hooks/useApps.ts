import { useCallback, useEffect, useState } from "react";

import { getApps } from "../services/apps";
import type { HubApp } from "../types/app";

export function useApps() {
  const [apps, setApps] = useState<HubApp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadApps = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getApps();

      setApps(data);
    } catch {
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
  };
}