# Contact enquiry security deployment

Apply `supabase/migrations/20260917_secure_contact_enquiries.sql` before deploying the application. The submission route fails closed if the database rate/duplicate gate has not been installed.

Configure these deployment environment variables with values from your own secret manager or Cloudflare dashboard:

```dotenv
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<public-cloudflare-turnstile-site-key>
TURNSTILE_SECRET_KEY=<private-cloudflare-turnstile-secret-key>
TURNSTILE_ALLOWED_HOSTNAMES=riterapublishing.com,www.riterapublishing.com
CONTACT_IP_HASH_SALT=<at-least-32-random-bytes>
CONTACT_ALLOWED_ORIGINS=https://riterapublishing.com,https://www.riterapublishing.com
```

The site key is intentionally public. Never expose `TURNSTILE_SECRET_KEY` or `CONTACT_IP_HASH_SALT` to client-side variables.

For direct Cloudflare-to-origin hosting only, `TRUST_CLOUDFLARE_PROXY=true` may be set after firewalling the origin so it accepts Cloudflare traffic only. On Vercel, leave this unset; the code uses Vercel's edge-overwritten client-IP header. Do not trust arbitrary `X-Forwarded-For` values.

Create a Turnstile widget restricted to the production hostnames. Use separate Cloudflare testing keys for local/staging environments. The backend validates the token, `contact` action, and hostname.

Schedule the following maintenance statement daily (for example with Supabase Cron) to limit retention of pseudonymous abuse-control records:

```sql
DELETE FROM public.contact_submission_attempts
WHERE created_at < now() - interval '7 days';
DELETE FROM public.admin_login_attempts
WHERE created_at < now() - interval '7 days';
```

After deployment, verify a normal submission, an invalid Turnstile token, a duplicate submission, the sixth submission inside 15 minutes, and unauthenticated access to `/api/admin/contact-enquiries`. Confirm the admin table shows suspicious numeric/HTML submissions as `Suspected spam` and renders payload text rather than markup.
