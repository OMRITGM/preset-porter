// Quiz recommendation logic — pure, shared by result.html (via app.js) and test/quiz.test.js.
// recommend(PRINTERS, QUESTIONS, answers) -> { top, fill, under, stretch, pct(p), resin } | null for invalid answers.
function recommend(PRINTERS, QUESTIONS, answers) {
  const picks = QUESTIONS.map((Q, i) => Q.a[answers[i]]?.[1]).filter(Boolean);
  if (picks.length !== QUESTIONS.length) return null;
  const price = (p) => (p.prices.length ? Math.min(...p.prices.map((x) => x.ils)) : null);
  const { min = 0, max } = picks[0], want = picks.flatMap((p) => p.want || []);
  const score = (p) => want.reduce((s, t) => s + (p.tags.includes(t) ? 1 : p.part?.[t] || 0), 0);
  const pct = (p) => (want.length ? Math.round((score(p) / want.length) * 100) : null);
  // tie on score -> the pricier one inside the budget first (someone who allotted more expects more)
  const rank = (list) => list.sort((x, y) => score(y) - score(x) || price(y) - price(x));
  const priced = PRINTERS.filter((p) => price(p) !== null);
  const top = rank(priced.filter((p) => price(p) >= min && price(p) <= max)).slice(0, 3);
  const over = priced.filter((p) => price(p) > max && price(p) <= max * 1.4).sort((x, y) => price(x) - price(y));
  const fill = over.slice(0, 3 - top.length);
  // below the floor: closest to the budget (priciest) — never "best matching", or a ₪900 printer returns for an ₪8,000 budget
  const under = top.length + fill.length < 3 ? priced.filter((p) => price(p) < min).sort((x, y) => price(y) - price(x)).slice(0, 3 - top.length - fill.length) : [];
  const s = rank(over.filter((p) => !fill.includes(p)))[0];
  const stretch = s && top[0] && score(s) > score(top[0]) ? s : null;
  return { top, fill, under, stretch, pct, score, price, min, max, want, resin: picks.some((p) => p.resin) };
}
if (typeof module !== "undefined") module.exports = { recommend };
