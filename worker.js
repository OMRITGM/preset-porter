// Static site + an anonymous download counter for Preset Porter.
// Stored per hit: date, target printer, referrer bucket. No IPs, no cookies, no free-text input ever reaches storage.
const PRINTERS = new Set(["A1", "A1 mini", "A2L", "P1P", "P1S", "P2S", "X1", "X1 Carbon", "X1E", "X2D", "H2S", "H2D", "H2D Pro", "H2C"]);
const REFS = { "forum.bambulab.com": "bambu-forum", "www.reddit.com": "reddit", "old.reddit.com": "reddit", "github.com": "github", "www.producthunt.com": "producthunt",
  "www.google.com": "google", "www.facebook.com": "facebook", "m.facebook.com": "facebook", "l.facebook.com": "facebook", "www.youtube.com": "youtube", "makerworld.com": "makerworld" };
const API_HEADERS = { "cache-control": "no-store", "x-content-type-options": "nosniff", "content-security-policy": "default-src 'none'; frame-ancestors 'none'" };
const reply = (status, body = null, extra = {}) => new Response(body, { status, headers: { ...API_HEADERS, ...extra } });

export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (!url.pathname.startsWith("/api/")) return env.ASSETS.fetch(req);

    if (url.pathname === "/api/hit") {
      if (req.method !== "POST") return reply(405, null, { allow: "POST" });
      if (req.headers.get("origin") !== url.origin) return reply(403); // same-origin browser requests only
      if (+req.headers.get("content-length") > 300) return reply(413);
      if (env.HITS) { // coarse flood brake (Cloudflare's limiter is permissive and eventually consistent); the IP is a limiter key only, never stored
        const { success } = await env.HITS.limit({ key: req.headers.get("cf-connecting-ip") || "?" });
        if (!success) return reply(429);
      }
      let body; try { body = JSON.parse((await req.text()).slice(0, 300)); } catch { return reply(400); }
      if (!PRINTERS.has(body?.model)) return reply(400);
      let host = ""; try { host = String(body.ref || ""); } catch {}
      const ref = host === "" ? "direct" : host === url.hostname ? "site" : REFS[host] || "other";
      const n = Math.min(Math.max(parseInt(body.n) || 1, 1), 20);
      const day = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Jerusalem" });
      const key = `porter:${day}:${body.model}:${ref}`; // cardinality is bounded: 14 printers x 11 buckets per day
      try { // hard ceiling per key per day; a KV quota error must never surface to the visitor
        const current = parseInt((await env.STATS.getWithMetadata(key)).metadata?.n) || 0;
        if (current < 2000) await env.STATS.put(key, String(current + n), { metadata: { n: current + n }, expirationTtl: 60 * 60 * 24 * 400 });
      } catch {}
      return reply(204);
    }

    if (url.pathname === "/api/stats") {
      if (req.method !== "GET") return reply(405, null, { allow: "GET" });
      const rows = []; let cursor;
      do { // counts live in key metadata, so listing needs no per-key reads
        const page = await env.STATS.list({ prefix: "porter:", cursor });
        for (const k of page.keys) rows.push([k.name, k.metadata?.n ?? 0]);
        cursor = page.list_complete ? undefined : page.cursor;
      } while (cursor);
      return reply(200, JSON.stringify({ total: rows.reduce((s, r) => s + r[1], 0), rows }), { "content-type": "application/json", "cache-control": "public, max-age=300" });
    }
    return reply(404);
  },
};
