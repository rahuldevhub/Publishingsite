import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { SignJWT } from "jose";
import { NextRequest } from "next/server";
import {
  CONTACT_LIMITS,
  assessSpam,
  getTrustedClientIp,
  validateContactPayload,
  verifyTurnstile,
} from "../lib/contact-security";
import { verifyAdminToken } from "../lib/admin-session";
import { proxy } from "../proxy";

const validPayload = {
  name: "Ananya Sharma",
  email: "Ananya@example.com",
  phone: "+91 98765 43210",
  message: "I would like to discuss publishing my first novel.",
  website: "",
  startedAt: Date.now() - 10_000,
  turnstileToken: "test-token",
};

test("normal enquiry validates and normalizes safely", () => {
  const result = validateContactPayload(validPayload);
  assert.equal(result.ok, true);
  if (result.ok) {
    assert.equal(result.value.email, "ananya@example.com");
    assert.equal(assessSpam(result.value).status, "legitimate");
  }
});

test("invalid email and missing required fields are rejected", () => {
  assert.equal(validateContactPayload({ ...validPayload, email: "not-an-email" }).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, name: undefined }).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, message: "" }).ok, false);
});

test("oversized and unexpected structured input are rejected instead of coerced", () => {
  assert.equal(
    validateContactPayload({ ...validPayload, message: "x".repeat(CONTACT_LIMITS.messageMax + 1) }).ok,
    false,
  );
  assert.equal(validateContactPayload({ ...validPayload, name: ["Ananya"] }).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, message: { text: "hello" } }).ok, false);
  assert.equal(validateContactPayload({ ...validPayload, unexpected: "mass assignment" }).ok, false);
});

test("honeypot data is preserved for the route to silently block", () => {
  const result = validateContactPayload({ ...validPayload, website: "https://bot.example" });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.value.website, "https://bot.example");
});

test("digit-only and HTML-bearing messages are marked suspected spam", () => {
  for (const message of ["9001084755", '<script>alert("x")</script> hello']) {
    const result = validateContactPayload({ ...validPayload, message });
    assert.equal(result.ok, true);
    if (result.ok) assert.equal(assessSpam(result.value).status, "suspected_spam");
  }
});

test("React escapes malicious enquiry content in text and title attributes", () => {
  const payload = '<img src=x onerror="alert(1)"><script>alert(1)</script>';
  const html = renderToStaticMarkup(React.createElement("span", { title: payload }, payload));
  assert.doesNotMatch(html, /<script>|<img/i);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /&quot;alert\(1\)&quot;/);
});

test("Turnstile invalid and valid server verification paths", async () => {
  const oldSecret = process.env.TURNSTILE_SECRET_KEY;
  const oldHosts = process.env.TURNSTILE_ALLOWED_HOSTNAMES;
  process.env.TURNSTILE_SECRET_KEY = "placeholder-test-secret";
  process.env.TURNSTILE_ALLOWED_HOSTNAMES = "riterapublishing.com";
  try {
    const invalidFetch = async () =>
      new Response(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }));
    const validFetch = async () =>
      new Response(JSON.stringify({ success: true, hostname: "riterapublishing.com", action: "contact" }));
    assert.deepEqual(
      await verifyTurnstile("bad", null, invalidFetch as typeof fetch),
      { ok: false, reason: "invalid-input-response" },
    );
    assert.deepEqual(
      await verifyTurnstile("good", "203.0.113.10", validFetch as typeof fetch),
      { ok: true, skipped: false },
    );
  } finally {
    if (oldSecret === undefined) delete process.env.TURNSTILE_SECRET_KEY;
    else process.env.TURNSTILE_SECRET_KEY = oldSecret;
    if (oldHosts === undefined) delete process.env.TURNSTILE_ALLOWED_HOSTNAMES;
    else process.env.TURNSTILE_ALLOWED_HOSTNAMES = oldHosts;
  }
});

test("spoofable forwarding headers are ignored without a trusted platform", () => {
  const oldVercel = process.env.VERCEL;
  const oldCloudflare = process.env.TRUST_CLOUDFLARE_PROXY;
  delete process.env.VERCEL;
  delete process.env.TRUST_CLOUDFLARE_PROXY;
  try {
    assert.equal(getTrustedClientIp(new Headers({ "x-forwarded-for": "203.0.113.99" })), null);
  } finally {
    if (oldVercel !== undefined) process.env.VERCEL = oldVercel;
    if (oldCloudflare !== undefined) process.env.TRUST_CLOUDFLARE_PROXY = oldCloudflare;
  }
});

test("rate limiting and duplicate detection are defined as an atomic database gate", () => {
  const sql = readFileSync("supabase/migrations/20260917_secure_contact_enquiries.sql", "utf8");
  assert.match(sql, /pg_advisory_xact_lock/);
  assert.match(sql, /accepted_count >= 5/);
  assert.match(sql, /interval '15 minutes'/);
  assert.match(sql, /interval '10 minutes'/);
  assert.match(sql, /outcome = 'accepted'/);
});

test("admin tokens reject missing/tampered credentials and accept a valid admin", async () => {
  const oldSecret = process.env.ADMIN_JWT_SECRET;
  process.env.ADMIN_JWT_SECRET = "test-secret-that-is-long-enough-for-unit-tests";
  try {
    assert.equal(await verifyAdminToken("tampered"), null);
    const token = await new SignJWT({ adminId: "admin-1", name: "Admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuer("ritera-admin")
      .setAudience("ritera-admin")
      .setExpirationTime("5m")
      .sign(new TextEncoder().encode(process.env.ADMIN_JWT_SECRET));
    assert.deepEqual(await verifyAdminToken(token), { adminId: "admin-1", name: "Admin" });

    const unauthenticated = await proxy(
      new NextRequest("https://riterapublishing.com/api/admin/contact-enquiries"),
    );
    assert.equal(unauthenticated.status, 401);
    const authenticated = await proxy(
      new NextRequest("https://riterapublishing.com/api/admin/contact-enquiries", {
        headers: { cookie: `admin_session=${token}` },
      }),
    );
    assert.equal(authenticated.status, 200);
  } finally {
    if (oldSecret === undefined) delete process.env.ADMIN_JWT_SECRET;
    else process.env.ADMIN_JWT_SECRET = oldSecret;
  }
});

test("contact persistence uses object-based Supabase calls rather than constructed SQL", () => {
  const route = readFileSync("app/api/contact/route.ts", "utf8");
  assert.match(route, /\.from\("contact_enquiries"\)\.insert\(\{/);
  assert.match(route, /\.rpc\("check_contact_submission", \{/);
  assert.doesNotMatch(route, /SELECT .*\$\{|INSERT .*\$\{/i);
});

test("all admin APIs are covered by verified proxy authentication except login", () => {
  const proxy = readFileSync("proxy.ts", "utf8");
  assert.match(proxy, /"\/api\/admin\/:path\*"/);
  assert.match(proxy, /pathname === "\/api\/admin\/login"/);
  assert.match(proxy, /verifyAdminToken\(token\)/);
  assert.match(proxy, /status: 401/);
});

test("admin data pages verify the signed session rather than cookie presence", () => {
  const pages = [
    "app/admin/contact-enquiries/page.tsx",
    "app/admin/dashboard/page.tsx",
    "app/admin/newsletter-subscribers/page.tsx",
    "app/admin/lead-captures/page.tsx",
    "app/admin/package-inquiries/page.tsx",
  ];
  for (const page of pages) {
    const source = readFileSync(page, "utf8");
    assert.match(source, /getAdminSession\(\)/, page);
    assert.doesNotMatch(source, /cookieStore\.get\("admin_session"\)/, page);
  }
});
