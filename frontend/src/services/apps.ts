import type {
  AppFormData,
  HubApp,
} from "../types/app";

import { API_URL, apiFetch } from "./api";

export async function getApps(): Promise<HubApp[]> {
  const response = await apiFetch(`${API_URL}/apps`);

  if (!response.ok) {
    throw new Error("Unable to load apps.");
  }

  return response.json();
}

export async function createApp(
  data: AppFormData,
): Promise<HubApp> {
  const response = await apiFetch(`${API_URL}/apps`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Unable to add app.");
  }

  return response.json();
}

export async function updateApp(
  id: string,
  data: AppFormData,
): Promise<HubApp> {
  const response = await apiFetch(`${API_URL}/apps/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Unable to update app.");
  }

  return response.json();
}

export async function deleteApp(id: string) {
  const response = await apiFetch(`${API_URL}/apps/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete app.");
  }
}