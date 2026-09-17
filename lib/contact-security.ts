import { createHash, createHmac, randomUUID } from "node:crypto";
import { isIP } from "node:net";

export const CONTACT_LIMITS = {
  bodyBytes: 16_384,
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  phoneMax: 32,
  messageMin: 10,
  messageMax: 2_000,
  turnstileTokenMax: 2_048,
} as const;

export interface ContactSubmission {
  name: string;
  email: string;
  phone: string | null;
  message: string;
  website: string;
  startedAt: number | null;
  turnstileToken: string;
}

export interface SpamAssessment {
  status: "legitimate" | "suspected_spam";
  reasons: string[];
}

type ValidationResult =
  | { ok: true; value: ContactSubmission }
  | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9][0-9().\s-]{5,30}[0-9]$/;
const FORBIDDEN_CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;
const ALLOWED_KEYS = new Set([
  "name",
  "email",
  "phone",
  "message",
  "website",
  "startedAt",
  "turnstileToken",
]);

function requiredString(
  value: unknown,
  label: string,
  min: number,
  max: number,
): { ok: true; value: string } | { ok: false; error: string } {
  if (typeof value !== "string") return { ok: false, error: `${label} must be text.` };
  const normalized = value.trim();
  if (normalized.length < min) return { ok: false, error: `${label} is too short.` };
  if (normalized.length > max) return { ok: false, error: `${label} is too long.` };
  if (FORBIDDEN_CONTROL.test(normalized)) {
    return { ok: false, error: `${label} contains unsupported characters.` };
  }
  return { ok: true, value: normalized };
}

export function validateContactPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const body = input as Record<string, unknown>;
  if (Object.keys(body).some((key) => !ALLOWED_KEYS.has(key))) {
    return { ok: false, error: "Request contains unsupported fields." };
  }

  const name = requiredString(body.name, "Name", CONTACT_LIMITS.nameMin, CONTACT_LIMITS.nameMax);
  if (!name.ok) return name;

  const email = requiredString(body.email, "Email", 3, CONTACT_LIMITS.emailMax);
  if (!email.ok) return email;
  const normalizedEmail = email.value.toLowerCase();
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  let phone: string | null = null;
  if (body.phone !== undefined && body.phone !== null && body.phone !== "") {
    if (typeof body.phone !== "string") return { ok: false, error: "Phone must be text." };
    phone = body.phone.trim();
    if (phone.length > CONTACT_LIMITS.phoneMax || !PHONE_PATTERN.test(phone)) {
      return { ok: false, error: "Please enter a valid phone number." };
    }
  }

  const message = requiredString(
    body.message,
    "Message",
    CONTACT_LIMITS.messageMin,
    CONTACT_LIMITS.messageMax,
  );
  if (!message.ok) return message;

  if (body.website !== undefined && typeof body.website !== "string") {
    return { ok: false, error: "Invalid form data." };
  }
  const website = typeof body.website === "string" ? body.website.trim().slice(0, 200) : "";

  if (
    body.startedAt !== undefined &&
    (typeof body.startedAt !== "number" || !Number.isFinite(body.startedAt))
  ) {
    return { ok: false, error: "Invalid form timing data." };
  }

  if (body.turnstileToken !== undefined && typeof body.turnstileToken !== "string") {
    return { ok: false, error: "Invalid verification token." };
  }
  const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken.trim() : "";
  if (turnstileToken.length > CONTACT_LIMITS.turnstileTokenMax) {
    return { ok: false, error: "Invalid verification token." };
  }

  return {
    ok: true,
    value: {
      name: name.value,
      email: normalizedEmail,
      phone,
      message: message.value,
      website,
      startedAt: typeof body.startedAt === "number" ? body.startedAt : null,
      turnstileToken,
    },
  };
}

export function assessSpam(
  submission: ContactSubmission,
  now = Date.now(),
): SpamAssessment {
  const reasons: string[] = [];
  let score = 0;

  if (/^\d[\d\s()+.-]*$/.test(submission.message)) {
    reasons.push("numeric_only_message");
    score += 2;
  }
  const urlCount = submission.message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (urlCount >= 3) {
    reasons.push("excessive_urls");
    score += 2;
  }
  if (/<\/?(?:script|iframe|object|embed|svg|img|a)\b/i.test(submission.message)) {
    reasons.push("html_markup");
    score += 2;
  }
  if (submission.startedAt !== null && now - submission.startedAt >= 0 && now - submission.startedAt < 1_500) {
    reasons.push("very_fast_submission");
    score += 1;
  }

  return { status: score >= 2 ? "suspected_spam" : "legitimate", reasons };
}

export function getTrustedClientIp(headers: Headers): string | null {
  // Vercel overwrites this header at its edge. Prefer it to a user-supplied
  // X-Forwarded-For chain. For a non-Vercel Cloudflare origin, explicitly opt
  // in only after the origin is restricted to Cloudflare traffic.
  const candidate = process.env.VERCEL
    ? headers.get("x-vercel-forwarded-for")
    : process.env.TRUST_CLOUDFLARE_PROXY === "true"
      ? headers.get("cf-connecting-ip")
      : null;
  const ip = candidate?.split(",")[0]?.trim() ?? "";
  return isIP(ip) ? ip : null;
}

export function anonymizeIp(ip: string | null): string {
  const salt = process.env.CONTACT_IP_HASH_SALT || process.env.ADMIN_JWT_SECRET;
  if (!salt) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("CONTACT_IP_HASH_SALT is not configured");
    }
    return createHash("sha256").update(ip ?? "unknown").digest("hex");
  }
  return createHmac("sha256", salt).update(ip ?? "unknown").digest("hex");
}

export function submissionFingerprint(submission: ContactSubmission): string {
  return createHash("sha256")
    .update([submission.email, submission.phone ?? "", submission.message].join("\u0000"))
    .digest("hex");
}

export function isAllowedContactOrigin(origin: string | null): boolean {
  if (!origin) return true; // Non-browser clients do not always send Origin; this is not bot protection.
  const configured = process.env.CONTACT_ALLOWED_ORIGINS?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  const defaults = [
    "https://riterapublishing.com",
    "https://www.riterapublishing.com",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ];
  return new Set(configured?.length ? configured : defaults).has(origin);
}

interface TurnstileResponse {
  success?: boolean;
  hostname?: string;
  action?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstile(
  token: string,
  ip: string | null,
  fetchImpl: typeof fetch = fetch,
): Promise<{ ok: true; skipped: boolean } | { ok: false; reason: string }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production") return { ok: false, reason: "not_configured" };
    return { ok: true, skipped: true };
  }
  if (!token) return { ok: false, reason: "missing_token" };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5_000);
  try {
    const response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        response: token,
        ...(ip ? { remoteip: ip } : {}),
        idempotency_key: randomUUID(),
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, reason: "verification_unavailable" };
    const result = (await response.json()) as TurnstileResponse;
    if (!result.success) return { ok: false, reason: result["error-codes"]?.[0] ?? "invalid_token" };
    if (result.action !== "contact") return { ok: false, reason: "action_mismatch" };

    const allowedHostnames = (process.env.TURNSTILE_ALLOWED_HOSTNAMES || "riterapublishing.com,www.riterapublishing.com")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    if (result.hostname && !allowedHostnames.includes(result.hostname)) {
      return { ok: false, reason: "hostname_mismatch" };
    }
    return { ok: true, skipped: false };
  } catch {
    return { ok: false, reason: "verification_unavailable" };
  } finally {
    clearTimeout(timeout);
  }
}
