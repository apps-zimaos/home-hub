export const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

export async function apiFetch(
  input: RequestInfo | URL,
  init?: RequestInit,
) {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
  });

  const contentType =
    response.headers.get("content-type") ?? "";

  const redirectedToAccess =
    response.redirected &&
    response.url.includes("cloudflareaccess.com");

  const expectedJson =
    contentType.includes("application/json");

  if (redirectedToAccess || !expectedJson) {
    throw new Error("AUTH_REQUIRED");
  }

  return response;
}