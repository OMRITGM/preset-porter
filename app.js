const $ = (s) => document.querySelector(s);
const TAG_HE = { enclosed: "סגורה", open: "פתוחה", color: "רב-צבעי", big: "משטח גדול", eng: "חומרים הנדסיים", easy: "עובדת מהקופסה", tinker: "פתוחה לשינויים", quiet: "שקטה" };
const fmt = (n) => "₪" + n.toLocaleString("he-IL");
const minPrice = (p) => (p.prices.length ? Math.min(...p.prices.map((x) => x.ils)) : null);
const ext = (url, text) => `<a href="${url}" target="_blank" rel="noopener">${text}</a>`;
const offers = (list) => [...list].sort((a, b) => a.ils - b.ils).map((x) => `${ext(x.url, `${x.store} ${fmt(x.ils)}`)}${x.label ? ` <small>(${x.label})</small>` : ""}`).join("<br>");

// ---- ניווט (כל הדפים)
$("nav").innerHTML = [["index.html", "שאלון"], ["catalog.html", "כל המדפסות"], ["filaments.html", "פילמנטים"], ["guide.html", "השבוע הראשון"], ["porter.html", "Preset Porter"]]
  .map(([h, t]) => `<a href="${h}">${t}</a>`).join("");

function card(p, extra = "") {
  const m = minPrice(p);
  return `<article class="card">${extra}
    <h3><bdi>${p.name}</bdi></h3>
    <p class="meta"><span dir="ltr">${p.build}</span> מ"מ · ${m ? "מ-" + fmt(m) : "מחיר: בדקו בחנות"}</p>
    <p class="tags">${[...new Set(p.tags)].map((t) => `<span>${TAG_HE[t]}</span>`).join("")}</p>
    <p>${p.why}</p><p class="watch"><b>שימו לב:</b> ${p.watch}</p>
    <p><a href="index.html#prices">מחירים בארץ ←</a></p></article>`;
}

// ---- שאלון (index.html)
if ($("#quiz")) {
  const ans = [];
  const step = () => {
    const i = ans.length, Q = QUESTIONS[i];
    if (!Q) return (location.href = "result.html?a=" + ans.join(""));
    $("#quiz").innerHTML = `<p class="step">שאלה ${i + 1} מתוך ${QUESTIONS.length}</p><h2>${Q.q}</h2>
      <div class="opts">${Q.a.map((a, k) => `<button data-k="${k}">${a[0]}</button>`).join("")}</div>
      ${i ? '<button class="back">→ חזרה</button>' : ""}`;
  };
  $("#quiz").addEventListener("click", (e) => {
    if (e.target.dataset.k) ans.push(e.target.dataset.k);
    else if (e.target.classList.contains("back")) ans.pop();
    else return;
    step();
  });
  step();
}

// ---- טבלת המומלצות (index.html)
if ($("#price-table")) {
  $("#price-table").innerHTML = `<table><thead><tr><th>דגם</th><th>מחירים בארץ</th></tr></thead><tbody>${PRINTERS.map((p) => `<tr>
    <td><b><bdi>${p.name}</bdi></b><br><small><span dir="ltr">${p.build}</span> מ"מ</small></td>
    <td>${p.prices.length ? offers(p.prices) : "אין כרגע במלאי בחנויות שבדקתי"}${p.zap ? `<br>${ext(p.zap, "השוואה ב-Zap")}` : ""}</td></tr>`).join("")}</tbody></table>
    <p class="meta">מחירים כפי שפורסמו באתרי החנויות ב-${SITE.pricesChecked}. בלי קישורי שותפים. מחיר ומלאי משתנים — תמיד לוודא בחנות.</p>`;
}

// ---- תוצאות (result.html)
if ($("#result")) {
  const a = (new URLSearchParams(location.search).get("a") || "").split("");
  const picks = QUESTIONS.map((Q, i) => Q.a[a[i]]?.[1]).filter(Boolean);
  if (picks.length !== QUESTIONS.length) { location.replace("index.html"); throw 0; }
  const max = picks[0].max, want = picks.flatMap((p) => p.want || []);
  const score = (p) => want.filter((t) => p.tags.includes(t)).length;
  // שוויון בניקוד → היקרה יותר בתוך התקציב קודמת (מי שהקצה יותר מצפה ליותר)
  const rank = (list) => list.sort((x, y) => score(y) - score(x) || minPrice(y) - minPrice(x));
  const priced = PRINTERS.filter((p) => minPrice(p) !== null);
  const top = rank(priced.filter((p) => minPrice(p) <= max)).slice(0, 3);
  const over = priced.filter((p) => minPrice(p) > max && minPrice(p) <= max * 1.4).sort((x, y) => minPrice(x) - minPrice(y));
  const fill = over.slice(0, 3 - top.length);
  const stretch = rank(over.filter((p) => !fill.includes(p)))[0];
  $("#result").innerHTML =
    (picks.some((p) => p.resin) ? `<p class="note">למיניאטורות ברמת פירוט גבוהה שווה לבדוק גם מדפסת שרף (Resin) — טכנולוגיה אחרת, עם ריח וכימיקלים. ההמלצות כאן הן למדפסות פילמנט.</p>` : "") +
    top.map((p, i) => card(p, i ? "" : '<p class="best">ההתאמה הכי טובה</p>')).join("") +
    fill.map((p) => card(p, '<p class="over">מעט מעל התקציב שבחרתם</p>')).join("") +
    (stretch && top[0] && score(stretch) > score(top[0]) ? `<h2>אם אפשר למתוח את התקציב</h2>${card(stretch)}` : "");
}

// ---- קטלוג מלא (catalog.html)
if ($("#catalog")) {
  const BRANDS = ["Bambu Lab", "Creality", "Elegoo", "Prusa"];
  const all = [
    ...PRINTERS.map((p) => { const brand = BRANDS.find((b) => p.name.startsWith(b)); return { brand, name: p.name.slice(brand.length + 1), build: p.build, enclosed: p.tags.includes("enclosed"), color: p.tags.includes("color") ? "כן" : null, note: "", rec: true, prices: p.prices }; }),
    ...CATALOG.map((c) => ({ ...c, prices: c.o.map(([store, label, ils, url]) => ({ store, label, ils, url })) })),
  ];
  const brands = [...new Set(all.map((m) => m.brand))].sort();
  $("#filters").innerHTML = `<select id="f-brand"><option value="">כל היצרנים</option>${brands.map((b) => `<option>${b}</option>`).join("")}</select>
    <select id="f-max"><option value="">כל מחיר</option>${[1500, 2500, 4000, 6000, 9000].map((n) => `<option value="${n}">עד ${fmt(n)}</option>`).join("")}</select>
    <label><input type="checkbox" id="f-enc"> סגורות בלבד</label> <label><input type="checkbox" id="f-col"> עם רב-צבעי</label>`;
  const yn = (v) => (v === null ? "לא אומת" : v ? "סגורה" : "פתוחה");
  const draw = () => {
    const b = $("#f-brand").value, mx = +$("#f-max").value || Infinity;
    const rows = all.filter((m) => (!b || m.brand === b) && (!$("#f-enc").checked || m.enclosed) && (!$("#f-col").checked || m.color) && (mx === Infinity || (minPrice(m) !== null && minPrice(m) <= mx)))
      .sort((x, y) => (minPrice(x) ?? 1e9) - (minPrice(y) ?? 1e9));
    $("#catalog").innerHTML = `<p class="meta">${rows.length} דגמים</p><table><thead><tr><th>דגם</th><th>מבנה</th><th>מחירים בארץ</th></tr></thead><tbody>${rows.map((m) => `<tr>
      <td><b><bdi>${m.brand} ${m.name}</bdi></b>${m.rec ? ' <span class="best">מומלץ</span>' : ""}<br><small><span dir="ltr">${m.build}</span> מ"מ${m.note ? " · " + m.note : ""}</small></td>
      <td>${yn(m.enclosed)}<br><small>רב-צבעי: ${m.color ?? "אין / לא אומת"}</small></td>
      <td>${m.prices.length ? offers(m.prices) : "אזל במלאי"}</td></tr>`).join("")}</tbody></table>`;
  };
  $("#filters").addEventListener("change", draw);
  draw();
}

// ---- פילמנטים + מחולל פרופיל ל-Bambu Studio (filaments.html)
if ($("#fil")) {
  const mid = (r) => Math.round((r[0] + r[1]) / 10) * 5;
  const clean = (s) => s.replace(/ \(.*\)/, "").replace(/\s*\/\s*/g, "-");
  const brands = [...new Set(FILAMENTS.map((f) => f.brand))];
  $("#fil-pick").innerHTML = `<select id="fb">${brands.map((b) => `<option>${b}</option>`).join("")}</select> <select id="fl" dir="ltr"></select>`;
  const lines = () => { $("#fl").innerHTML = FILAMENTS.filter((f) => f.brand === $("#fb").value).map((f) => `<option>${f.line}</option>`).join(""); show(); };
  const cur = () => FILAMENTS.find((f) => f.brand === $("#fb").value && f.line === $("#fl").value);
  function preset(f, printer) {
    const [parent, n] = BBL_PARENTS[printer][f.mat], nozzle = String(mid(f.nozzle)), bed = [String(Math.min(mid(f.bed), 100))];
    const name = `${f.brand} ${clean(f.line)} @${clean(printer)} HR`, rep = Array(n).fill(nozzle);
    return { filament_settings_id: [name], filament_vendor: [f.brand], from: "User", inherits: parent, name, version: BBL_VERSION,
      nozzle_temperature: rep, nozzle_temperature_initial_layer: rep,
      nozzle_temperature_range_low: [String(f.nozzle[0])], nozzle_temperature_range_high: [String(f.nozzle[1])],
      hot_plate_temp: bed, hot_plate_temp_initial_layer: bed, textured_plate_temp: bed, textured_plate_temp_initial_layer: bed };
  }
  function show() {
    const f = cur(), r = f.ready;
    const ready = [r.bs && `<li><b>Bambu Studio:</b> פרופיל מובנה — חפשו <bdi>"${r.bs}"</bdi> ברשימת הפילמנטים (אם לא מופיע: סמנו אותו תחת ⚙ ← Filament).</li>`,
      r.orca && `<li><b>OrcaSlicer:</b> קיים בספריית הפילמנטים המובנית.</li>`,
      r.url && `<li><b>הורדה רשמית מהיצרן:</b> ${ext(r.url, "דף הפרופילים של " + f.brand)}</li>`].filter(Boolean).join("");
    $("#fil").innerHTML = `<article class="card"><h3><bdi>${f.brand} ${f.line}</bdi></h3>
      <table class="kv"><tbody>
        <tr><th>דיזה</th><td><span dir="ltr">${f.nozzle[0]}–${f.nozzle[1]}°C</span></td></tr>
        <tr><th>משטח</th><td><span dir="ltr">${f.bed[0]}–${f.bed[1]}°C</span></td></tr>
        <tr><th>מהירות מקס' לפי היצרן</th><td>${f.speed} מ"מ/ש</td></tr>
        <tr><th>מאוורר</th><td>${f.fan ?? "היצרן לא מפרסם"}</td></tr>
        <tr><th>ייבוש</th><td>${f.dry ?? "היצרן לא מפרסם"}</td></tr>
        <tr><th>מדפסת סגורה</th><td>${f.enclosure ? "נדרשת" : "לא נדרשת"}</td></tr>
      </tbody></table>
      ${f.note ? `<p class="watch">${f.note}</p>` : ""}
      <p class="meta">${f.verified ? "✔ הדפסתי עם החומר הזה בעצמי." : "נתוני יצרן — עוד לא נבדק על ידי."} ${ext(f.src, "מקור")}</p>
      <h3>פרופיל מוכן</h3>${ready ? `<ul>${ready}</ul>` : "<p>לא מצאתי פרופיל רשמי או מובנה לחומר הזה.</p>"}
      <h3>פרופיל בסיס ל-Bambu Studio <span class="over">בטא</span></h3>
      <p>יורש מ-Generic ${f.mat} של המדפסת ומשנה רק טמפרטורות — אמצע הטווח של היצרן (<span dir="ltr">${mid(f.nozzle)}°C / ${Math.min(mid(f.bed), 100)}°C</span>). נקודת התחלה, לא פרופיל מכויל.${ready ? " אם יש פרופיל רשמי או מובנה — עדיף אותו." : ""}</p>
      <p><select id="fp">${Object.keys(BBL_PARENTS).map((p) => `<option${BBL_PARENTS[p][f.mat] ? "" : " disabled"}>${p}</option>`).join("")}</select>
      <button class="cta" id="dl">הורדת קובץ JSON</button></p>
      <p class="meta">ייבוא: File ← Import ← Import Configs. נבנה מול Bambu Studio ${BBL_VERSION}.</p></article>`;
    $("#fp").value = Object.keys(BBL_PARENTS).find((p) => BBL_PARENTS[p][f.mat]);
  }
  $("#fil-pick").addEventListener("change", (e) => (e.target.id === "fb" ? lines() : show()));
  $("#fil").addEventListener("click", (e) => {
    if (e.target.id !== "dl") return;
    const p = preset(cur(), $("#fp").value), a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(p, null, 4)], { type: "application/json" }));
    a.download = p.name + ".json"; a.click(); URL.revokeObjectURL(a.href);
  });
  lines();
}

// ---- וואטסאפ + סלייסרים
if ($("#wa")) SITE.whatsapp ? ($("#wa").href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent("היי, הגעתי מהאתר ורוצה עזרה עם מדפסת תלת-ממד")}`) : $("#wa").remove();
if ($("#slicers")) $("#slicers").innerHTML = SLICERS.map((s) => `<li><b>${s.brand}:</b> ${ext(s.url, s.name + " — דף ההורדה הרשמי")}</li>`).join("");
