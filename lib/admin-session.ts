import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "admin_session";
const MAX_AGE = 8 * 60 * 60; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) throw new Error("ADMIN_JWT_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export interface AdminSession {
  adminId: string;
  name: string;
}

/** Creates a signed JWT and sets it as an httpOnly cookie. */
export async function createSession(adminId: string, name: string): Promise<void> {
  const token = await new SignJWT({ adminId, name })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
}

/**
 * Verifies the signed JWT cookie and returns the session payload.
 * Returns null if the cookie is absent, expired, or tampered with.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    const { payload } = await jwtVerify(token, getSecret());
    const { adminId, name } = payload as unknown as AdminSession;
    if (!adminId) return null;
    return { adminId, name: name ?? "Admin" };
  } catch {
    return null; // expired or tampered
  }
}

/** Deletes the session cookie. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/** Convenience: return a 401 Unauthorized response. */
export function unauthorized(): NextResponse {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
