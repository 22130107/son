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

/**
 * Kiểm tra tính hợp lệ và hạn dùng (exp) của JWT token trên client
 */
export function isTokenValid(token: string | null): boolean {
  if (
    !token ||
    typeof token !== "string" ||
    token.trim() === "" ||
    token === "null" ||
    token === "undefined"
  ) {
    return false;
  }

  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;

    // Decode base64url payload an toàn trên trình duyệt
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);

    // Kiểm tra thời gian hết hạn (nếu có claim exp)
    if (payload.exp && typeof payload.exp === "number") {
      // Hết hạn nếu exp (tính bằng ms) <= thời gian hiện tại
      if (payload.exp * 1000 <= Date.now()) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!isTokenValid(token)) {
    logout();
    return false;
  }
  return true;
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem(TOKEN_KEY);
  if (!isTokenValid(token)) {
    logout();
    return null;
  }
  return token;
}

export function setAuth(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(AUTH_KEY, "1");
}
