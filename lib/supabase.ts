import { createClient } from "@supabase/supabase-js";

/**
 * Server-side Supabase client using the service role key.
 * - Uses SUPABASE_SERVICE_ROLE_KEY (runtime secret, never exposed to client)
 * - Bypasses RLS entirely — safe to use in server components and API routes
 * - Call this inside functions/components, NOT at module level
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error(
      `Missing Supabase env vars. NEXT_PUBLIC_SUPABASE_URL=${url ? "set" : "MISSING"}, SUPABASE_SERVICE_ROLE_KEY=${key ? "set" : "MISSING"}`
    );
  }

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}
