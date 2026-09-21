// Static site + an anonymous counter for Preset Porter downloads. Stores only: date, target printer, referrer host. No IPs, no cookies.
export default {
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === "/api/hit" && req.method === "POST") {
      const { model = "?", ref = "" } = await req.json().catch(() => ({}));
      const clean = (s) => String(s).replace(/[^\w .-]/g, "").slice(0, 40);
      const key = `porter:${new Date().toISOString().slice(0, 10)}:${clean(model)}:${clean(ref) || "direct"}`;
      await env.STATS.put(key, String(parseInt((await env.STATS.get(key)) || "0") + 1));
      return new Response(null, { status: 204 });
    }
    if (url.pathname === "/api/stats") {
      const { keys } = await env.STATS.list({ prefix: "porter:" });
      const rows = await Promise.all(keys.map(async (k) => [k.name, +(await env.STATS.get(k.name))]));
      return Response.json({ total: rows.reduce((s, r) => s + r[1], 0), rows });
    }
    return env.ASSETS.fetch(req);
  },
};
