import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("FATAL: JWT_SECRET environment variable is required in production!");
    }
    console.warn("[SECURITY WARNING] JWT_SECRET is not set. Using temporary dev secret. Do not use this in production!");
    return "dev_secret_change_in_production";
  }
  return secret;
}

const EXPIRES = process.env.JWT_EXPIRES_IN ?? "7d";

export interface JwtPayload {
  id: number;
  username: string;
  role: "superadmin" | "admin" | "editor";
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: EXPIRES } as jwt.SignOptions);
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, getJwtSecret()) as JwtPayload;
}

/** Extract and verify Bearer token from request */
export function getAuthUser(req: NextRequest): JwtPayload | null {
  try {
    const header = req.headers.get("authorization") ?? "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (!token) return null;
    return verifyToken(token);
  } catch {
    return null;
  }
}

/** Middleware helper — returns 401 response if not authenticated */
export function requireAuth(req: NextRequest): JwtPayload | Response {
  const user = getAuthUser(req);
  if (!user) {
    return Response.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  return user;
}

/** Require specific roles */
export function requireRole(
  req: NextRequest,
  roles: JwtPayload["role"][]
): JwtPayload | Response {
  const user = getAuthUser(req);
  if (!user) {
    return Response.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  if (!roles.includes(user.role)) {
    return Response.json({ success: false, message: "Forbidden" }, { status: 403 });
  }
  return user;
}
