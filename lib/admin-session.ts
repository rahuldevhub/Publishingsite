import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export interface AdminSession {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Reads and validates the admin_session cookie set by /api/admin/login.
 * Returns the parsed session or null if absent / malformed.
 * Use this at the top of every protected admin API route handler.
 */
export async function getAdminSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get("admin_session")?.value;
    if (!raw) return null;
    const data = JSON.parse(raw) as AdminSession;
    if (!data.id || !data.email || !data.role) return null;
    return data;
  } catch {
    return null;
  }
}

/** Convenience: return a 401 Unauthorized response. */
export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
