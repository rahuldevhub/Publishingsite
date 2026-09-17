# Contact-enquiry security review — 17 September 2026

## Executive conclusion

The observed random names, Gmail addresses, and digit-only messages are most consistent with ordinary automated form/API spam. The old public endpoint could be called directly and had no CAPTCHA, honeypot, durable throttling, duplicate protection, or useful spam classification. No code, screenshot, or repository evidence establishes a server compromise. No production exploitation tests were performed.

This repository copy contains no Git metadata, application logs, or database export, so commit-history exposure and historical request attribution could not be verified.

## Architecture discovered

```text
Browser /contact
  -> ContactForm.tsx
  -> JSON POST /api/contact
  -> route content/type/size/origin checks
  -> strict field validation + honeypot + timing signal
  -> Cloudflare Turnstile Siteverify (server-side)
  -> atomic Supabase/PostgreSQL rate + duplicate gate
  -> spam assessment
  -> contact_enquiries insert through server-only service-role client
  -> metadata-only SMTP notification

Admin browser
  -> signed HttpOnly admin_session JWT
  -> proxy verification and page-level verification
  -> /admin/contact-enquiries server component
  -> direct service-role query of contact_enquiries

Optional admin JSON consumer
  -> GET /api/admin/contact-enquiries
  -> proxy verification + handler verification
  -> selected enquiry fields only
```

The admin page does not call the admin JSON API; both independently query Supabase. The service-role key bypasses row-level security, so every server route/component using it must maintain its own authorization boundary.

## Root cause and evidence classification

- **Ordinary form spam:** strongly supported by generated-looking identities and numeric-only messages.
- **Automated API abuse:** likely. The endpoint was directly callable by curl, scripts, Postman, or headless browsers.
- **Attempted exploitation:** not established. The submitted examples do not demonstrate an exploit payload.
- **Actual compromise:** no evidence found.

The old ten-per-15-minute limiter lived in one process and therefore did not reliably coordinate serverless instances. It also trusted the first `X-Forwarded-For` value without proving a trusted proxy had overwritten it. CORS would not have prevented a script from calling the public endpoint and was not treated as bot protection.

## Findings and fixes

### High — unrestricted automated contact submission

- **Location:** `app/api/contact/route.ts`, `app/contact/ContactForm.tsx`, `lib/rate-limit.ts`
- **Problem:** no CAPTCHA, honeypot, duplicate gate, durable rate limit, or spam status; direct API calls worked.
- **Attack scenario:** a script repeatedly posts plausible strings and fills the enquiries table.
- **Fix:** server-verified Turnstile, honeypot, timing signal, atomic database throttling (five accepted submissions per anonymized source per 15 minutes), ten-minute content duplicate blocking, and conservative spam classification.

### High — admin boundary relied too heavily on proxy behavior

- **Location:** `proxy.ts`, admin server pages, Next.js 16.2.4
- **Problem:** several server pages tested only for cookie presence and delegated signature validation to the proxy. The installed Next.js release had published proxy-bypass advisories. API handlers already had explicit checks, but the proxy did not cover `/api/admin/*` as a second boundary.
- **Attack scenario:** a framework proxy-bypass combined with an arbitrary cookie could expose a server page that uses the service-role client.
- **Fix:** Next.js 16.3.3, signed-session verification inside every data-bearing admin page, proxy coverage for `/api/admin/*`, JSON 401 responses for unauthenticated API calls, issuer/audience-bound JWTs, and retained handler checks.

### High — vulnerable framework/auth dependency versions

- **Location:** `package.json`, `package-lock.json`
- **Problem:** the audit reported critical/high Next.js issues and vulnerable NextAuth releases.
- **Attack scenario:** framework-specific proxy bypass, denial of service, or other advisory-specific attacks.
- **Fix:** upgraded Next.js to 16.3.3 and NextAuth to 4.24.15, then removed the unused parallel NextAuth route and package entirely. Safe transitive `ws` and browser-mapping fixes were applied.

### Medium — weak server-side validation and request handling

- **Location:** old `app/api/contact/route.ts`
- **Problem:** truthiness checks plus `String(...)` coercion accepted arrays/objects and silently truncated oversized data; no body/content-type guard existed.
- **Attack scenario:** malformed or large bodies consume resources or create misleading stored records.
- **Fix:** exact object schema, unknown-field rejection, string-only fields, trim/normalization, control-character rejection, 16 KiB body limit, JSON/content-type checks, and field constraints: name 2–100, email 3–254, optional international phone 7–32, message 10–2,000.

### Medium — admin-login throttling was server-local and IP-spoofable

- **Location:** `app/api/admin/login/route.ts`, `lib/rate-limit.ts`
- **Problem:** in-memory attempt counting and unqualified `X-Forwarded-For` trust.
- **Attack scenario:** distributed/serverless attempts bypass throttling or spoof keys.
- **Fix:** atomic database-backed five-per-15-minute gate, trusted Vercel/explicit Cloudflare IP derivation, HMAC pseudonymization, body/type/length limits, and safe logs.

### Medium — internal database errors leaked to clients

- **Location:** contact submission and enquiry API responses
- **Problem:** Supabase error messages were returned directly.
- **Attack scenario:** schema/provider details aid reconnaissance.
- **Fix:** generic client messages; logs retain only request ID and safe provider error code.

### Medium — hard-coded sample admin password in tooling

- **Location:** `scripts/create-admin.ts`, `scripts/test-bcrypt.ts`
- **Problem:** a known default password could be accidentally provisioned.
- **Attack scenario:** running the helper unchanged creates predictable credentials.
- **Fix:** environment-supplied password with a 14-character minimum; the bcrypt test also requires explicit input.

### Stored XSS assessment — no exploitable sink found in this flow

Enquiry name, email, phone, and message are rendered as React text or a React-managed `title` attribute. React escapes them. No enquiry data is passed to `dangerouslySetInnerHTML`; the only contact-page use is static JSON-LD. HTML-bearing messages are additionally labeled `suspected_spam`, but safe rendering—not input stripping—is the security boundary. Automated rendering tests confirm script/image markup is escaped.

### Injection and related checks

- Supabase query-builder calls pass values as parameters; no constructed SQL was found in this flow.
- Strict scalar validation and an allowed-key list prevent NoSQL-style operator objects, mass assignment, and prototype-property copying.
- No shell/command execution uses enquiry data.
- Notification email sender, recipient, subject, and body are server-controlled and contain no submitter fields, so enquiry values cannot inject mail headers.
- CSRF does not apply to public submission in the usual sense because it consumes no authenticated ambient authority. Same-origin checking is included as browser hardening, not represented as bot protection.
- The admin list has no record-by-ID operation, so no enquiry IDOR surface was found.

## Files changed

- Contact flow: `app/contact/ContactForm.tsx`, new `app/contact/TurnstileWidget.tsx`, `app/api/contact/route.ts`, and new `lib/contact-security.ts`.
- Persistence: new `supabase/migrations/20260917_secure_contact_enquiries.sql`.
- Enquiry admin: `app/admin/contact-enquiries/page.tsx` and `app/api/admin/contact-enquiries/route.ts`.
- Authentication: `proxy.ts`, `lib/admin-session.ts`, `app/api/admin/login/route.ts`, and all data-bearing admin listing pages under `app/admin/*/page.tsx` that previously checked only cookie presence.
- Removed unused parallel authentication: `lib/auth.ts` and `app/api/auth/[...nextauth]/route.ts`.
- Configuration/dependencies: `next.config.ts`, `package.json`, and `package-lock.json`.
- Tooling/tests: `scripts/create-admin.ts`, `scripts/test-bcrypt.ts`, and new `scripts/contact-security.test.ts`.
- Documentation: new `docs/contact-enquiry-security.md` and this report.

## Protections added

- Server-side Cloudflare Turnstile validation with action, hostname, timeout, token-length, and single-use enforcement through Siteverify.
- CSP allowances limited to `https://challenges.cloudflare.com` for scripts and frames. Existing CSP, HSTS, MIME-sniffing, referrer, permissions, and framing controls remain.
- Hidden honeypot, form-start timing signal, strict validation, 16 KiB body cap, origin allowlist, and generic errors.
- Database-serialized contact rate/duplicate gate and admin-login rate gate.
- HMAC-pseudonymized IP keys; raw IPs and personal enquiry content are not logged.
- `legitimate` / `suspected_spam` status and reason tags shown safely in the admin table. Existing records are preserved and default to `legitimate` rather than being retroactively guessed.
- Request IDs and structured security-result logs without credentials, tokens, secrets, cookies, or raw payloads.
- Signed admin session verification in proxy, API handlers, and server pages.

## Secrets review

`.env.local` contains Supabase service-role, admin JWT, cron, and related secret variable types. It is covered by `.gitignore`. No private key file or hard-coded runtime secret was found. Because this directory has no `.git`, prior commits cannot be checked.

Rotation is required if `.env.local`, a build artifact containing secrets, the former hard-coded admin password, or any deployment secret was ever published or shared. Otherwise, no evidence-based rotation requirement was established. Remove the obsolete `NEXTAUTH_SECRET` deployment variable after confirming no older deployment still runs the deleted NextAuth route.

## Dependency audit

Fixed critical/high Next.js and NextAuth issues and safe transitive updates. The final production audit reports four high-severity package entries:

- Nodemailer 7 advisories; remediation requires major version 10. Current usage has fixed server-controlled addresses/text and does not use attacker-controlled raw content, URLs, files, envelope options, or address lists, which limits exposure. Upgrade separately with SMTP regression testing.
- Prisma CLI/config's `deepmerge-ts` recursive-object denial of service; npm proposes a forced downgrade to 6.12. Prisma configuration is developer-controlled and the contact runtime uses Supabase, so no blind downgrade was made. Reassess on the next supported Prisma release.

## External configuration and exact variables

Apply `supabase/migrations/20260917_secure_contact_enquiries.sql` **before** deploying the application. Then configure:

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<public-cloudflare-turnstile-site-key>
TURNSTILE_SECRET_KEY=<private-cloudflare-turnstile-secret-key>
TURNSTILE_ALLOWED_HOSTNAMES=riterapublishing.com,www.riterapublishing.com
CONTACT_IP_HASH_SALT=<at-least-32-random-bytes>
CONTACT_ALLOWED_ORIGINS=https://riterapublishing.com,https://www.riterapublishing.com
ADMIN_JWT_SECRET=<at-least-32-random-bytes>
```

Only for a direct Cloudflare-to-origin topology whose origin rejects non-Cloudflare traffic:

```dotenv
TRUST_CLOUDFLARE_PROXY=true
```

Do not set that flag merely because DNS uses Cloudflare. Vercel deployments automatically use Vercel's edge-overwritten header. Configure a daily seven-day cleanup for `contact_submission_attempts` and `admin_login_attempts` as documented in `docs/contact-enquiry-security.md`.

## Tests and results

- `npm test`: 16/16 passing after final changes (validation, malformed types, size constraints, honeypot, spam scoring, React escaping, Turnstile mock success/failure, IP trust, atomic-gate structure, admin JWT and proxy 401/authorized paths, page session checks, and parameterized persistence).
- `npm run lint`: passing.
- `npm run build`: passing on Next.js 16.3.3 after a clean generated cache.
- `npm audit --omit=dev`: zero critical; four high package entries remain as explained above.
- No production requests, destructive payloads, database mutations, or live malicious tests were performed.
- The SQL gates were structurally tested but not executed against a disposable Postgres/Supabase test project; that remains an integration-test item.

## Deployment checklist

1. Back up the database schema and apply the migration.
2. Create a managed Turnstile widget restricted to the production hostnames.
3. add the exact environment variables above in the deployment secret manager.
4. Confirm the production topology uses Vercel's overwritten IP header, or explicitly secure and configure Cloudflare origin trust.
5. Deploy the application; existing admin sessions will need to sign in again because JWT issuer/audience checks were added.
6. Configure seven-day cleanup of abuse-control rows.
7. Retain the existing HSTS preload setting only if every current and future subdomain is HTTPS-capable.

## Post-deployment verification

1. Submit one legitimate enquiry and confirm it appears as `Legitimate` and triggers only the metadata notification.
2. Verify missing/invalid Turnstile tokens fail and a valid token succeeds.
3. Repeat identical content and confirm HTTP 429; confirm the sixth accepted source submission in 15 minutes receives 429.
4. Fill the honeypot with a test client and confirm a success-shaped response without a database record.
5. Submit HTML as inert test text in staging and confirm it displays escaped in admin.
6. Request `/api/admin/contact-enquiries` and an admin page with no/tampered cookie and confirm 401/redirect; verify a real admin can access both.
7. Confirm CSP has no Turnstile violations and analytics/video embeds still function.
8. Confirm logs contain request IDs/categories only, not raw IPs, enquiry data, CAPTCHA tokens, or cookies.

## Remaining risks and manual investigation

- Turnstile and database migration are inactive until externally configured/applied; production intentionally fails closed without the Turnstile secret or database gate.
- A distributed spam campaign can rotate IPs and content. Monitor Turnstile analytics, 429 counts, suspected-spam ratios, and database growth; consider a Cloudflare WAF/rate rule as an additional edge layer.
- Spam classification is intentionally conservative; review suspected items rather than deleting automatically.
- Check Vercel/Cloudflare access logs and database timestamps around 16 September, 15 September, 6 September, and the other screenshot dates for request bursts, common network/provider patterns, user agents, and paths. Do not infer compromise from the records alone.
- Inspect repository history in the authoritative Git clone for `.env` or former default-password exposure; this copy cannot answer that question.
- Reconcile schema drift: Prisma's `Admin` model uses `email`, while the active custom login queries a Supabase `username` column. The old helper may not provision accounts compatible with the live login schema.
- Plan tested major upgrades for Nodemailer and a supported Prisma release rather than using `npm audit fix --force`.
