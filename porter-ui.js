// Shared UI for porter.html (en) and porter-he.html (he). Strings are picked by <html lang>.
(() => {
  try { const t = localStorage.getItem("theme"); if (t) document.documentElement.dataset.theme = t; } catch {}
  const $ = (s) => document.querySelector(s), esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const he = document.documentElement.lang === "he", L = (s) => `<bdi dir="ltr">${esc(s)}</bdi>`;
  const T = he ? {
    dl: "הורדה", all: "הורדת הכול", fail: "לא ניתן להמיר:", noParent: "בלי פרופיל אב", retarget: "רשימת המדפסות עודכנה",
    err: (m) => m.replace(/^No (\S*) ?system preset exists for (.+?) - .*$/, (_, t, p) => `אין פרופיל מערכת ל-${t || "חומר הזה"} במדפסת ${p} — ייתכן שהחומר לא נתמך בה.`),
    customParent: (p) => `פרופיל האב ${L(p)} אינו פרופיל מערכת של Bambu (אב מותאם אישית או של צד שלישי) — עברתי ל-Generic.`,
    brandFallback: (b, s, leaf) => `ל-${L(b)} אין גרסה ל-${L(s)} — הפרופיל יורש עכשיו מ-${L(leaf)}. כדאי לבדוק מהירויות וקירור.`,
    flattened: () => "לפרופיל אין אב (ייצוא מלא) — עדכנתי את רשימת המדפסות שלו; הערכים נשארו כמו שהם.",
    newVariants: (s, list) => `ל-${L(s)} יש סוגי דיזה שלא היו במדפסת המקורית (${L(list)}) — הם יורשים את ערכי המערכת.`,
  } : { dl: "Download", all: "Download all", fail: "Could not port:", noParent: "no parent", retarget: "printer list retargeted", err: (m) => m };

  const order = ["H2S", "H2D", "H2D Pro", "H2C", "P2S", "X2D", "A2L", "A1", "A1 mini", "P1S", "P1P", "X1 Carbon", "X1", "X1E"];
  $("#model").innerHTML = Object.keys(BBL_MAP.printers).sort((a, b) => order.indexOf(a.slice(10)) - order.indexOf(b.slice(10))).map((m) => `<option value="${m}">${m.slice(10)}</option>`).join("");
  $("#ver").textContent = BBL_MAP.version.replace(/\b0(\d)/g, "$1");

  let last = [];
  async function run(files) {
    last = files.length ? [...files] : last;
    const rows = await Promise.all(last.map(async (f) => {
      try { return { f, r: portPreset(JSON.parse(await f.text()), $("#model").value) }; } catch (e) { return { f, err: e.message }; }
    }));
    const ok = rows.filter((x) => x.r);
    const notes = (r) => (he ? r.noteCodes.map((n) => T[n.code](...n.args)) : r.notes.map(esc));
    $("#out").innerHTML = rows.map(({ f, r, err }, i) => `<article class="card"><h3><bdi>${esc(r ? r.preset.name : f.name)}</bdi></h3>${err ? `<p class="watch"><b>${T.fail}</b> ${esc(he ? T.err(err) : err)}</p>` :
      `<p class="meta" dir="ltr">${esc(r.parent || T.noParent)} → ${esc(r.newParent || T.retarget)}</p>${r.notes.length ? `<ul class="res">${notes(r).map((n) => `<li>${n}</li>`).join("")}</ul>` : ""}
       <button class="cta" data-i="${i}">${T.dl}</button>`}</article>`).join("") + (ok.length > 1 ? `<p><button class="cta" data-i="all">${T.all}</button></p>` : "");
    $("#out").onclick = (e) => {
      const i = e.target.dataset.i; if (i === undefined) return;
      const picked = i === "all" ? ok : [rows[i]];
      let ref = ""; try { ref = new URL(document.referrer).hostname; } catch {}
      // anonymous count: target printer + referrer host only
      fetch("/api/hit", { method: "POST", body: JSON.stringify({ model: $("#model").value.slice(10), ref, n: picked.length }), keepalive: true }).catch(() => {});
      picked.forEach(({ r }, n) => setTimeout(() => {
        const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(r.preset, null, 4)], { type: "application/json" }));
        a.download = r.preset.name.replace(/[\\/:*?"<>|]/g, "-") + ".json"; a.click(); URL.revokeObjectURL(a.href);
      }, n * 250));
    };
  }
  const drop = $("#drop");
  drop.onclick = () => $("#pick").click(); drop.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); $("#pick").click(); } };
  $("#pick").onchange = (e) => run(e.target.files); $("#model").onchange = () => run([]);
  ["dragover", "dragleave", "drop"].forEach((t) => drop.addEventListener(t, (e) => { e.preventDefault(); drop.classList.toggle("on", t === "dragover"); if (t === "drop") run(e.dataTransfer.files); }));
  window.porterRun = run; // for tests
})();
