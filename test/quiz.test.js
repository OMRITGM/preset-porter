// Exhaustive check of the printer quiz: every combination of answers (5 x 4 x 3 x 3 x 2 = 360).
const test = require("node:test"), assert = require("node:assert");
const { PRINTERS, QUESTIONS } = require("../data.js");
const { recommend, colourPrice } = require("../quiz-core.js");

const all = [[]];
for (const Q of QUESTIONS) all.splice(0, all.length, ...all.flatMap((c) => Q.a.map((_, k) => [...c, k])));
const run = (a) => ({ a, R: recommend(PRINTERS, QUESTIONS, a.map(String)) });
const cases = all.map(run);
const shown = (R) => [...R.top, ...R.fill, ...R.under, ...(R.stretch ? [R.stretch] : [])];
const label = (a) => a.map((k, i) => QUESTIONS[i].a[k][0]).join(" / ");
const has = (p, t) => p.tags.includes(t);

test(`covers all ${all.length} answer combinations`, () => assert.equal(cases.length, QUESTIONS.reduce((n, Q) => n * Q.a.length, 1)));

// One card is allowed only when the budget holds a single printer and nothing over it is at least as good
// (e.g. up to ₪1,200: A1 mini only — showing a pricier, worse-matching A1 would be "pay more, get less").
test("every combination returns printers (2+ when the budget holds 2+), no duplicates", () => {
  for (const { a, R } of cases) {
    const s = shown(R), inBudget = PRINTERS.filter((p) => R.price(p) !== null && R.price(p) >= R.min && R.price(p) <= R.max).length;
    assert.ok(s.length >= Math.min(2, Math.max(1, inBudget)), `only ${s.length} for: ${label(a)}`);
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

test("regression (Facebook report): entry-level A1 mini only for the two lowest budgets (its combo is ₪1,449)", () => {
  for (const { a, R } of cases) if (a[0] > 1) assert.ok(!shown(R).some((p) => p.id === "a1-mini"), `A1 mini for: ${label(a)}`);
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

// A below-budget extra may outrank the top pick (e.g. "above ₪8,000" + toys: H2S fits better than H2D) — it's shown,
// but the card must say so instead of silently sitting under a lower-% "best match" badge.
test("a cheaper extra that outranks the top pick is labelled as such in the UI", () => {
  const app = require("fs").readFileSync(require("path").join(__dirname, "../app.js"), "utf8");
  assert.ok(app.includes("ומתאימה לתשובות שלכם אפילו יותר"));
  for (const { a, R } of cases) for (const p of R.under) assert.ok(R.top[0], `below-budget extra with no top pick: ${label(a)}`);
});
for (const [name, applies, ok] of must) test(`hard requirement: ${name}`, () => {
  const bad = cases.filter(({ a, R }) => applies(a) && R.top.length && !ok(R.top[0]) && R.top.some(ok)) // a better-fitting in-budget printer was ranked below
    .map(({ a, R }) => `${label(a)} -> ${R.top[0].name}`);
  assert.deepEqual(bad, [], bad.slice(0, 5).join("\n"));
  // and if any printer near the budget (60% of the floor .. max) satisfies it, one of them is on screen (Ramsay: hidden A2L)
  const hidden = cases.filter(({ a, R }) => applies(a) && !shown(R).some(ok) && PRINTERS.some((p) => ok(p) && R.price(p) !== null && R.price(p) >= R.min * 0.6 && R.price(p) <= R.max))
    .map(({ a }) => label(a));
  assert.deepEqual(hidden, [], hidden.slice(0, 5).join("\n"));
});

test("resin note iff miniatures; stretch only when clearly (5+ points) better", () => {
  for (const { a, R } of cases) {
    assert.equal(R.resin, a[1] === 3, label(a));
    const ref = R.top[0] || R.fill[0]; // nothing in budget -> compared with the closest over-budget pick
    if (R.stretch) assert.ok(!shown({ ...R, stretch: null }).includes(R.stretch), label(a));
    if (R.stretch && R.top[0]) assert.ok(R.score(R.stretch) - R.score(ref) >= R.want.length * 50, label(a));
  }
});

test("invalid answers are rejected", () => {
  for (const bad of [[], ["0"], ["9", "0", "0", "0", "0"], ["0", "0", "0", "0"], ["x", "y", "z", "w", "v"], ["-1", "0", "0", "0", "0"]])
    assert.equal(recommend(PRINTERS, QUESTIONS, bad), null, JSON.stringify(bad));
});

test("multi-color must: a waste-free toolchanger in budget is ranked ahead of AMS machines when it fits the rest equally", () => {
  const a = ["2", "0", "0", "1", "0"]; // ₪2,500-5,000 / toys / color must / workroom / just works
  const R = recommend(PRINTERS, QUESTIONS, a);
  assert.ok(R.top.some((p) => p.id === "u1"), `U1 missing for ${label(a.map(Number))}: ${R.top.map((p) => p.name)}`);
});

test("regression (Facebook report): above ₪8,000 the picks cost above ₪8,000", () => {
  for (const { a, R } of cases) if (a[0] === 4) assert.ok(R.top.length && R.top.every((p) => R.price(p) >= 8000), `cheap top pick for: ${label(a)}`);
});

test("regression (Facebook report): with multi-colour a must, dual-nozzle H2D beats single-nozzle H2S", () => {
  for (const { a, R } of cases) if (a[2] === 0) {
    const h2d = PRINTERS.find((p) => p.id === "h2d"), h2s = PRINTERS.find((p) => p.id === "h2s");
    assert.ok(R.score(h2d) > R.score(h2s), `H2D ${R.score(h2d)} vs H2S ${R.score(h2s)}: ${label(a)}`);
  }
});

const TRAITS = ["enclosed", "eng", "color", "nowaste", "big", "easy", "quiet", "tinker"];
test("every printer has all graded traits in [0,1], and its display tags match the grades (tag <=> grade >= 0.7)", () => {
  for (const p of PRINTERS) for (const t of TRAITS) {
    assert.ok(typeof p.g?.[t] === "number" && p.g[t] >= 0 && p.g[t] <= 1, `${p.name}: g.${t} = ${p.g?.[t]}`);
    assert.equal(has(p, t), p.g[t] >= 0.7, `${p.name}: tag "${t}" vs grade ${p.g[t]}`);
  }
});

test("'slightly over budget' never clearly (5+ points) outranks the best-match badge", () => {
  for (const { a, R } of cases) if (R.top[0]) for (const p of R.fill) assert.ok(R.score(p) - R.score(R.top[0]) < R.want.length * 50, `${p.name} beats ${R.top[0].name}: ${label(a)}`);
});

test("regression (Ramsay review): multi-colour a must is priced as the multi-colour combo", () => {
  const mini = PRINTERS.find((p) => p.id === "a1-mini");
  for (const { a, R } of cases) if (a[2] === 0) assert.ok(R.price(mini) > 1200, `A1 mini priced bare for: ${label(a)}`);
});

// Ramsay review: "multi-colour is a must" once recommended an Ender-3 (no multi-colour at all).
const canColour = (p) => colourPrice(p) !== null;
test("multi-colour a must: every printer on screen can actually print multi-colour", () => {
  for (const { a, R } of cases) if (a[2] === 0) for (const p of shown(R)) assert.ok(canColour(p), `${p.name} for: ${label(a)}`);
});

test("data: an add-on-only multi-colour printer declares colorAddon; 'open' tag <=> no enclosure at all", () => {
  for (const p of PRINTERS) {
    const addonOnly = p.g.color > 0 && p.g.color < 0.7 && !p.prices.some((x) => x.mc || /קומבו/.test(x.label || ""));
    if (addonOnly) assert.ok("colorAddon" in p, `${p.name}: multi-colour via add-on but no colorAddon`);
    assert.equal(has(p, "open"), p.g.enclosed === 0, `${p.name}: open tag vs enclosed ${p.g.enclosed}`);
  }
});

test("data: a printer graded as multi-colour (color >= 0.7) has a way to buy it: combo, priced add-on or built in", () => {
  for (const p of PRINTERS) if (p.g.color >= 0.7) assert.ok(colourPrice(p) !== null, `${p.name}: color ${p.g.color} but no multi-colour offer`);
});
