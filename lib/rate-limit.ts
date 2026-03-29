/**
 * Simple in-memory rate limiter.
 * Works for a single Vercel instance / dev server.
 * For multi-region production, replace with an Upstash Redis solution.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

/**
 * Returns true if the request is allowed, false if it should be blocked.
 * @param key        Unique key (e.g. "login:1.2.3.4")
 * @param max        Max allowed requests in the window (default 5)
 * @param windowMs   Window duration in ms (default 15 min)
 */
export function checkRateLimit(
  key: string,
  max = 5,
  windowMs = 15 * 60 * 1000
): boolean {
  const now = Date.now();
  const record = store.get(key);

  if (!record || now > record.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (record.count >= max) {
    return false;
  }

  record.count++;
  return true;
}
