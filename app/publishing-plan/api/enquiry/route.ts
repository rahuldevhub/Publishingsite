import { createHash, createHmac, randomUUID } from 'node:crypto';
import { isIP } from 'node:net';

export const runtime = 'nodejs';
export const maxDuration = 60;
const MAX_BYTES = 12 * 1024;

function reply(status: number, error: string) {
  return Response.json({ error }, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
}

async function readPayload(request: Request): Promise<unknown> {
  if (Number(request.headers.get('content-length')) > MAX_BYTES) throw new Error('body_too_large');
  if (!request.body) throw new Error('invalid_input');
  const reader = request.body.getReader();
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const expired = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => { void reader.cancel(); reject(new Error('invalid_input')); }, 5000);
  });
  try {
    const read = async () => {
      let length = 0;
      const chunks: Uint8Array[] = [];
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        length += chunk.value.byteLength;
        if (length > MAX_BYTES) { void reader.cancel(); throw new Error('body_too_large'); }
        chunks.push(chunk.value);
      }
      const bytes = Buffer.concat(chunks);
      return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
    };
    return await Promise.race([read(), expired]);
  } finally {
    clearTimeout(timeout);
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const env = process.env;
  if (env.ENQUIRY_ENABLED !== 'true' || env.VERCEL !== '1' || !env.ENQUIRY_PROXY_SECRET || env.ENQUIRY_PROXY_SECRET.length < 32 || !env.ENQUIRY_PROXY_ORIGIN || !env.ENQUIRY_PROXY_TARGET) return reply(503, 'not_configured');
  let target: URL;
  try {
    target = new URL(env.ENQUIRY_PROXY_TARGET);
    const origin = new URL(env.ENQUIRY_PROXY_ORIGIN);
    if (origin.protocol !== 'https:' || origin.origin !== env.ENQUIRY_PROXY_ORIGIN || target.protocol !== 'https:' || target.hostname !== 'ritera-publishing-plan.vercel.app' || target.pathname !== '/api/enquiry' || target.search || target.hash || target.username || target.password || target.port) return reply(503, 'not_configured');
  } catch { return reply(503, 'not_configured'); }
  if (request.headers.get('origin') !== env.ENQUIRY_PROXY_ORIGIN || new URL(request.url).origin !== env.ENQUIRY_PROXY_ORIGIN || request.headers.get('sec-fetch-site') === 'cross-site') return reply(403, 'forbidden');
  if (!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type') || '')) return reply(415, 'invalid_content_type');
  // Only trust the IP Vercel supplies at the public edge. Never accept a browser's
  // x-ritera-* headers or copy its forwarded header chain into our signature.
  const ip = request.headers.get('x-vercel-forwarded-for') || '';
  if (!isIP(ip)) return reply(503, 'temporarily_unavailable');
  let payload: unknown;
  try { payload = await readPayload(request); } catch (error) { return reply(error instanceof Error && error.message === 'body_too_large' ? 413 : 400, 'invalid_input'); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return reply(400, 'invalid_input');
  const timestamp = String(Math.floor(Date.now() / 1000));
  const nonce = randomUUID();
  const body = JSON.stringify(payload);
  const digest = createHash('sha256').update(body).digest('hex');
  const message = JSON.stringify(['v1', 'POST', '/api/enquiry', timestamp, nonce, env.ENQUIRY_PROXY_ORIGIN, ip, digest]);
  const signature = createHmac('sha256', env.ENQUIRY_PROXY_SECRET).update(message).digest('hex');
  try {
    const response = await fetch(target, {
      method: 'POST', redirect: 'error', cache: 'no-store', credentials: 'omit',
      signal: AbortSignal.timeout(54000),
      headers: {
        'Content-Type': 'application/json', Origin: env.ENQUIRY_PROXY_ORIGIN,
        'x-ritera-client-ip': ip, 'x-ritera-timestamp': timestamp,
        'x-ritera-nonce': nonce, 'x-ritera-signature': signature,
      },
      body,
    });
    const content = await response.text();
    if (content.length > 2048) return reply(503, 'temporarily_unavailable');
    const data = JSON.parse(content);
    // Relay only the documented response fields. Never return upstream headers,
    // internal URLs, HTML error pages, or service credentials to the browser.
    const safe: { id?: string; error?: string } = {};
    if (typeof data.id === 'string' && /^[0-9a-f-]{36}$/i.test(data.id)) safe.id = data.id;
    if (typeof data.error === 'string' && /^[a-z_]{1,60}$/.test(data.error)) safe.error = data.error;
    if ((!response.ok && !safe.error) || (response.ok && !safe.id)) return reply(503, 'temporarily_unavailable');
    const headers: Record<string, string> = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
    if (response.status === 429) headers['Retry-After'] = '900';
    return Response.json(safe, { status: response.status, headers });
  } catch { return reply(503, 'temporarily_unavailable'); }
}
