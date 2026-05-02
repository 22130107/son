/**
 * Client-side admin auth helpers.
 * Authentication is handled by /api/auth (DB + JWT).
 */

const AUTH_KEY = "nasun_admin_auth";
const TOKEN_KEY = "admin_token";

export function logout(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  return (
    sessionStorage.getItem(AUTH_KEY) === "1" ||
    localStorage.getItem(TOKEN_KEY) !== null
  );
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAuth(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(AUTH_KEY, "1");
}
