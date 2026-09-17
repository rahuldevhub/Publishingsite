import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase";
import { sendSubmissionNotification } from "@/lib/notifications";
import {
  CONTACT_LIMITS,
  anonymizeIp,
  assessSpam,
  getTrustedClientIp,
  isAllowedContactOrigin,
  submissionFingerprint,
  validateContactPayload,
  verifyTurnstile,
} from "@/lib/contact-security";

function json(body: object, status = 200, extraHeaders?: HeadersInit) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extraHeaders },
  });
}

function audit(result: string, requestId: string, ipHash: string, reason?: string) {
  // Deliberately omit raw IPs, names, emails, messages, tokens, and cookies.
  console.info("[contact-security]", {
    timestamp: new Date().toISOString(),
    requestId,
    result,
    ...(reason ? { reason } : {}),
    source: ipHash.slice(0, 12),
  });
}

export async function POST(req: NextRequest) {
  const requestId = randomUUID();
  let ipHash = "unavailable";

  try {
    if (!isAllowedContactOrigin(req.headers.get("origin"))) {
      return json({ error: "Request origin is not allowed." }, 403);
    }
    if (!req.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
      return json({ error: "Content-Type must be application/json." }, 415);
    }

    const declaredLength = Number(req.headers.get("content-length") ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > CONTACT_LIMITS.bodyBytes) {
      return json({ error: "Request body is too large." }, 413);
    }
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, "utf8") > CONTACT_LIMITS.bodyBytes) {
      return json({ error: "Request body is too large." }, 413);
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return json({ error: "Malformed JSON request." }, 400);
    }
    const validation = validateContactPayload(parsed);
    if (!validation.ok) return json({ error: validation.error }, 400);
    const submission = validation.value;

    const clientIp = getTrustedClientIp(req.headers);
    ipHash = anonymizeIp(clientIp);

    // Return success so simple bots do not learn the honeypot field name.
    if (submission.website) {
      audit("blocked", requestId, ipHash, "honeypot");
      return json({ success: true });
    }

    const turnstile = await verifyTurnstile(submission.turnstileToken, clientIp);
    if (!turnstile.ok) {
      audit("blocked", requestId, ipHash, `turnstile_${turnstile.reason}`);
      const unavailable =
        turnstile.reason === "not_configured" || turnstile.reason === "verification_unavailable";
      return json(
        {
          error: unavailable
            ? "Verification is temporarily unavailable. Please try again later."
            : "Verification failed. Please try again.",
        },
        unavailable ? 503 : 400,
      );
    }

    const supabase = createServerClient();
    const fingerprint = submissionFingerprint(submission);
    const { data: gateRows, error: gateError } = await supabase.rpc("check_contact_submission", {
      p_ip_hash: ipHash,
      p_payload_hash: fingerprint,
      p_request_id: requestId,
    });
    if (gateError) {
      console.error("[contact-security] submission gate failed", {
        requestId,
        code: gateError.code,
      });
      return json({ error: "Unable to accept enquiries right now. Please try again later." }, 503);
    }

    const gate = Array.isArray(gateRows) ? gateRows[0] : gateRows;
    if (!gate?.allowed) {
      const reason = gate?.reason === "duplicate" ? "duplicate" : "rate_limit";
      audit("blocked", requestId, ipHash, reason);
      return json(
        {
          error:
            reason === "duplicate"
              ? "This enquiry was already received."
              : "Too many submissions. Try again later.",
        },
        429,
        { "Retry-After": reason === "duplicate" ? "600" : "900" },
      );
    }

    const assessment = assessSpam(submission);
    const { error } = await supabase.from("contact_enquiries").insert({
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      message: submission.message,
      status: assessment.status,
      spam_reasons: assessment.reasons,
      request_id: requestId,
      source_ip_hash: ipHash,
    });

    if (error) {
      console.error("[contact-security] database insert failed", {
        requestId,
        code: error.code,
      });
      return json({ error: "Unable to save your enquiry. Please try again later." }, 500);
    }

    audit(assessment.status, requestId, ipHash, assessment.reasons.join(",") || undefined);
    await sendSubmissionNotification("CONTACT");
    return json({ success: true });
  } catch (error) {
    console.error("[contact-security] unexpected failure", {
      requestId,
      type: error instanceof Error ? error.name : "UnknownError",
    });
    return json({ error: "Something went wrong." }, 500);
  }
}
