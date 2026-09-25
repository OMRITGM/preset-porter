// Quiz recommendation logic — pure, shared by result.html (via app.js) and test/quiz.test.js.
// recommend(PRINTERS, QUESTIONS, answers) -> { top, fill, under, stretch, pct(p), price(p), bundled(p), low, resin } | null for invalid answers.
function recommend(PRINTERS, QUESTIONS, answers) {
  const picks = QUESTIONS.map((Q, i) => Q.a[answers[i]]?.[1]).filter(Boolean);
  if (picks.length !== QUESTIONS.length) return null;
  // multi-colour a must -> judge each printer at the price of its multi-colour setup: its combo, or bare + add-on (data.js colorAddon)
  const combo = picks.some((p) => p.combo);
  const combos = (p) => p.prices.filter((x) => /קומבו/.test(x.label || ""));
  const bundled = (p) => combo && (combos(p).length > 0 || !!p.colorAddon);
  const price = (p) => (p.prices.length ? Math.min(...(combo && combos(p).length ? combos(p) : p.prices).map((x) => x.ils)) + (combo && !combos(p).length ? p.colorAddon || 0 : 0) : null);
  const { min = 0, max } = picks[0], want = picks.flatMap((p) => p.want || []);
  // graded 0-1 per trait (data.js `g`), kept as integer thousandths so float noise never decides a ranking or a threshold
  const score = (p) => Math.round(want.reduce((s, t) => s + (p.g[t] || 0), 0) * 1000);
  const of = (share) => want.length * 1000 * share; // score needed for a given share of a perfect match
  const resin = picks.some((p) => p.resin);
  // % is meaningless with one repeated want (everyone scores 100%) or for miniatures (resin is the real answer)
  const pct = (p) => (resin || new Set(want).size < 2 ? null : Math.round((score(p) / of(1)) * 100));
  // real tie = equivalent printers -> the cheaper one first
  const rank = (list) => list.sort((x, y) => score(y) - score(x) || price(x) - price(y));
  const clearlyBetter = (p, ref) => !ref || score(p) - score(ref) >= of(0.05); // at least 5 points
  const priced = PRINTERS.filter((p) => price(p) !== null);
  const top = rank(priced.filter((p) => price(p) >= min && price(p) <= max)).slice(0, 3);
  const best = top[0];
  const low = !!best && score(best) < of(0.5); // weak best match: the UI says so
  const over = priced.filter((p) => price(p) > max).sort((x, y) => price(x) - price(y));
  const near = over.filter((p) => price(p) <= max * 1.4);
  // "slightly over budget" only if it's at least as good as the best match (paying more for less makes no sense)
  // and not clearly better (then it's the stretch pick)
  const fill = near.filter((p) => !best || (score(p) >= score(best) && !clearlyBetter(p, best))).slice(0, 3 - top.length);
  const ref = best || fill[0];
  const wide = !best || score(ref) < of(0.5); // the closest option is weak or missing -> search every price
  // stretch = the CHEAPEST decent (60%+) next step; with a best match it must also be clearly better
  const better = (wide ? over : near).filter((p) => !fill.includes(p) && (!best || clearlyBetter(p, ref))); // cheapest first
  const stretch = better.find((p) => score(p) >= of(0.6)) || rank(better)[0] || null;
  // below the floor (60–100% of it, so a ₪900 printer never returns for ₪8,000): best matches fill leftover slots,
  // and one that's clearly better than the best match is always shown (e.g. the ₪1,699 big-bed A2L for big prints)
  const cheaper = rank(priced.filter((p) => price(p) < min && price(p) >= min * 0.6));
  const under = cheaper.slice(0, Math.max(0, 3 - top.length - fill.length));
  if (best && cheaper[0] && !under.includes(cheaper[0]) && clearlyBetter(cheaper[0], best)) under.unshift(cheaper[0]);
  return { top, fill, under, stretch, pct, score, price, bundled, min, max, want, low, resin };
}
if (typeof module !== "undefined") module.exports = { recommend };
