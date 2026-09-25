// node check-links.mjs — בודק כל קישור חיצוני באתר. לא עולה לפרסום (.assetsignore).
import { readFileSync, readdirSync } from "node:fs";
const src = ["data.js", "filaments.js"].map((f) => readFileSync(new URL(f, import.meta.url), "utf8")).join("\n");
const d = new Function(src + "; return { PRINTERS, FILAMENTS, SLICERS };")();
const urls = new Map(), add = (u, where) => u && urls.set(u, where);
d.PRINTERS.forEach((p) => { add(p.zap, p.name + " zap"); p.prices.forEach((x) => add(x.url, `${p.name} / ${x.store}`)); });
d.FILAMENTS.forEach((f) => { add(f.src, `${f.brand} ${f.line} src`); add(f.ready.url, f.brand + " presets"); });
d.SLICERS.forEach((s) => add(s.url, s.name));
for (const f of readdirSync(new URL(".", import.meta.url)).filter((f) => f.endsWith(".html")))
  for (const m of readFileSync(new URL(f, import.meta.url), "utf8").matchAll(/href="(https?:[^"]+)"/g)) if (!m[1].includes("fonts.g")) add(m[1], f);

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36";
const check = async ([url, where]) => {
  try {
    const r = await fetch(url, { headers: { "user-agent": UA, "accept-language": "he,en" }, redirect: "follow", signal: AbortSignal.timeout(25000) });
    const moved = new URL(r.url).pathname !== new URL(url).pathname ? ` -> ${r.url}` : "";
    return { s: r.status, url, where, moved };
  } catch (e) { return { s: "ERR " + (e.cause?.code || e.name), url, where, moved: "" }; }
};
const res = [];
const list = [...urls];
for (let i = 0; i < list.length; i += 6) res.push(...(await Promise.all(list.slice(i, i + 6).map(check))));
const bad = res.filter((r) => r.s !== 200 || r.moved);
console.log(`${res.length} links, ${res.length - bad.length} OK`);
bad.forEach((r) => console.log(`${r.s}\t${r.where}\t${r.url}${r.moved}`));
