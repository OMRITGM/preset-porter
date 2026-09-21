# Preset Porter + הדפסה ראשונה

Source of **https://3d.omrielcharizi.com** — a static site (no build step) served from a Cloudflare Worker.

## Preset Porter — [3d.omrielcharizi.com/porter](https://3d.omrielcharizi.com/porter)

Fixes Bambu Studio filament presets that end up under **Unsupported presets** after you switch printers (P1S / X1C / A1 → H2S, H2D, H2C, P2S, X2D…).

**Why they break.** A user preset stores only your changes and `inherits` everything else from a system preset that belongs to one printer family (`Generic ABS` → X1, `Generic PLA @BBL P1P` → P1). On another printer that parent does not apply, so Studio hides the preset. Newer printers also keep one value per nozzle type (Standard / High Flow / E3D High Flow, plus Bowden on the X2D), so per-variant arrays have to match the target.

**What the tool does** — entirely in the browser, nothing is uploaded:

1. swaps `inherits` for the same material's system preset on the target printer (falls back to `Generic <type>` and says so);
2. remaps per-variant arrays by nozzle-type name; variants the source never defined inherit the system value (`"nil"`);
3. leaves every calibrated value (flow ratio, temperatures, speeds) untouched.

Tested by importing on a real H2S: presets written for P1S, X1C and A1 moved from *Unsupported* to *Custom* with their calibrated flow ratio intact. Other targets are generated from the same system-profile data but have not been import-tested yet — reports welcome.

| File | Role |
|---|---|
| `porter-core.js` | `portPreset(preset, "Bambu Lab H2S")` → `{ preset, notes }`. Pure function, works in Node and the browser. |
| `bbl-map.js` | Generated. Printer → nozzle variants, preset family → per-printer leaf, per-variant keys. Names and array shapes only — no Bambu profile content is copied. |
| `tools/build-bbl-map.py` | Regenerates `bbl-map.js` from a local Bambu Studio install. Run after a Studio update. |
| `tools/port-test.js` | `node tools/port-test.js "Bambu Lab H2S" out/ *.json` — batch-port real presets with the same code the page uses. |
| `porter.html` | The UI. |
| `worker.js` | Serves the static assets and counts downloads anonymously (date, target printer, referrer host — no IPs, no cookies). `/api/stats` is public. |

## הדפסה ראשונה (Hebrew)

An independent Hebrew guide for people buying their first 3D printer in Israel: a 5-question picker, a price table of Israeli stores, a catalog of ~40 printers, manufacturer-sourced filament settings with a Bambu Studio preset generator, and a first-week checklist. All editable content lives in `data.js`, `catalog.js`, `filaments.js`. `node check-links.mjs` verifies every external link.

## Deploy

```bash
npx wrangler deploy   # run from this folder
```

Not affiliated with Bambu Lab. Code: MIT.
