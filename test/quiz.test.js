// Exhaustive check of the printer quiz: every combination of answers (5 x 4 x 3 x 3 x 2 = 360).
const test = require("node:test"), assert = require("node:assert");
const { PRINTERS, QUESTIONS } = require("../data.js");
const { recommend } = require("../quiz-core.js");

const all = [[]];
for (const Q of QUESTIONS) all.splice(0, all.length, ...all.flatMap((c) => Q.a.map((_, k) => [...c, k])));
const run = (a) => ({ a, R: recommend(PRINTERS, QUESTIONS, a.map(String)) });
const cases = all.map(run);
const shown = (R) => [...R.top, ...R.fill, ...R.under, ...(R.stretch ? [R.stretch] : [])];
const label = (a) => a.map((k, i) => QUESTIONS[i].a[k][0]).join(" / ");
const has = (p, t) => p.tags.includes(t);

test(`covers all ${all.length} answer combinations`, () => assert.equal(cases.length, QUESTIONS.reduce((n, Q) => n * Q.a.length, 1)));

test("every combination returns at least 2 printers, no duplicates", () => {
  for (const { a, R } of cases) {
    const s = shown(R);
    assert.ok(s.length >= 2, `only ${s.length} for: ${label(a)}`);
    assert.equal(new Set(s).size, s.length, `duplicate printer for: ${label(a)}`);
    assert.ok(s.every((p) => R.price(p) !== null), `unpriced printer shown for: ${label(a)}`);
  }
});

test("budget: in-budget picks respect the range, extras stay close to it", () => {
  for (const { a, R } of cases) {
    for (const p of R.top) assert.ok(R.price(p) >= R.min && R.price(p) <= R.max, `${p.name} ₪${R.price(p)} outside ${R.min}-${R.max}: ${label(a)}`);
    for (const p of R.fill) assert.ok(R.price(p) <= R.max * 1.4, `${p.name} too far over budget: ${label(a)}`);
    for (const p of shown(R)) assert.ok(R.price(p) >= R.min * 0.5, `${p.name} ₪${R.price(p)} far below a ₪${R.min}+ budget: ${label(a)}`);
  }
});

test("regression (Facebook report): entry-level A1 mini only for the lowest budget", () => {
  for (const { a, R } of cases) if (a[0] > 0) assert.ok(!shown(R).some((p) => p.id === "a1-mini"), `A1 mini for: ${label(a)}`);
});

test("the best match is ranked first and match % is sane", () => {
  for (const { a, R } of cases) {
    const scores = R.top.map(R.score);
    assert.deepEqual(scores, [...scores].sort((x, y) => y - x), `not sorted by score: ${label(a)}`);
    for (const p of shown(R)) { const v = R.pct(p); assert.ok(v === null || (v >= 0 && v <= 100), `pct ${v}: ${label(a)}`); }
  }
});

// hard requirements: if the budget has a printer that satisfies it, the top pick must satisfy it.
// Priority when they conflict: physical size (a helmet does not fit a 256 mm bed) beats the room preference.
const must = [
  ["multi-color is a must", (a) => a[2] === 0, (p) => has(p, "color")],
  ["functional parts need an enclosed printer", (a) => a[1] === 1, (p) => has(p, "enclosed")],
  ["big prints need a big bed", (a) => a[1] === 2, (p) => has(p, "big")],
  ["living room / kids room -> enclosed (unless a big bed is required)", (a) => a[3] === 0 && a[1] !== 2, (p) => has(p, "enclosed")],
];

test("top pick is never beaten by a cheaper extra with a higher match", () => {
  for (const { a, R } of cases) for (const p of R.under)
    assert.ok(R.score(p) <= R.score(R.top[0]), `${p.name} (${R.pct(p)}%) outranks the best match ${R.top[0].name} (${R.pct(R.top[0])}%): ${label(a)}`);
});
for (const [name, applies, ok] of must) test(`hard requirement: ${name}`, () => {
  const bad = cases.filter(({ a, R }) => applies(a) && R.top.length && !ok(R.top[0]) && R.top.some(ok)) // a better-fitting in-budget printer was ranked below
    .map(({ a, R }) => `${label(a)} -> ${R.top[0].name}`);
  assert.deepEqual(bad, [], bad.slice(0, 5).join("\n"));
});

test("resin note iff miniatures; stretch only when strictly better", () => {
  for (const { a, R } of cases) {
    assert.equal(R.resin, a[1] === 3, label(a));
    if (R.stretch) assert.ok(R.score(R.stretch) > R.score(R.top[0]) && !R.top.includes(R.stretch), label(a));
  }
});

test("invalid answers are rejected", () => {
  for (const bad of [[], ["0"], ["9", "0", "0", "0", "0"], ["0", "0", "0", "0"], ["x", "y", "z", "w", "v"], ["-1", "0", "0", "0", "0"]])
    assert.equal(recommend(PRINTERS, QUESTIONS, bad), null, JSON.stringify(bad));
});
