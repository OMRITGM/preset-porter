# Preset Porter

[![CI](https://github.com/OMRITGM/preset-porter/actions/workflows/ci.yml/badge.svg)](https://github.com/OMRITGM/preset-porter/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/OMRITGM/preset-porter)](https://github.com/OMRITGM/preset-porter/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Fixes Bambu Studio filament presets that end up under _Unsupported presets_ after you switch printers** (P1S / X1C / A1 → H2S, H2D, H2C, P2S, X2D…).

➡️ **Use it in the browser: [3d.omrielcharizi.com/porter](https://3d.omrielcharizi.com/porter)** — nothing is uploaded, everything runs locally.

## Why presets break

A user preset stores only your changes and `inherits` everything else from a system preset that belongs to **one printer family** (`Generic ABS` → X1, `Generic PLA @BBL P1P` → P1). On another printer that parent does not apply, so Studio hides the preset. Bambu also ships no SUNLU / eSUN PLA+ / PolyLite / Overture system presets for the H2C, P2S or X2D, so presets built on those have no parent at all there. On top of that, newer printers keep one value per nozzle type (Standard / High Flow / E3D High Flow, plus Bowden on the X2D), so per-variant arrays have to match the target.

## What it does

1. Swaps `inherits` for the same material's system preset on the target printer. If the brand preset does not exist there, it falls back to `Generic <type>` and tells you.
2. Remaps per-variant arrays by nozzle-type name. Variants the source never defined inherit the system value (`"nil"`).
3. Leaves every calibrated value (flow ratio, temperatures, speeds) untouched.

**Tested by importing on a real H2S:** presets written for P1S, X1C and A1 moved from *Unsupported* to *Custom* with their calibrated flow ratio intact. Other targets are generated from the same Bambu Studio system-profile data but have not been import-tested yet — [reports welcome](https://github.com/OMRITGM/preset-porter/issues).

## CLI

```bash
npx github:OMRITGM/preset-porter --to H2S -o ported/ "My PETG.json" "My ABS.json"
npx github:OMRITGM/preset-porter --list        # supported printers
```

Runs straight from this repo — no install, no registry setup, no dependencies.

Your presets live in `%APPDATA%\BambuStudio\user\<id>\filament` (Windows) or `~/Library/Application Support/BambuStudio/user/<id>/filament` (macOS). Import the result with **File → Import → Import Configs** while the new printer is selected.

The package is also published to [GitHub Packages](https://github.com/OMRITGM/preset-porter/pkgs/npm/preset-porter) as `@omritgm/preset-porter`. GitHub's npm registry asks for a personal access token with `read:packages` even for public packages, so for one-off use the `github:` form above is simpler.

## Library

```js
const { portPreset, printers } = require("@omritgm/preset-porter");

const { preset, notes } = portPreset(JSON.parse(fs.readFileSync("My PETG.json", "utf8")), "Bambu Lab H2S");
// preset -> ready-to-import JSON, notes -> human-readable warnings (fallbacks, new nozzle variants)
```

## Repository layout

| Path | Role |
|---|---|
| `porter-core.js` | `portPreset(preset, model, map)` — pure function, runs in Node and the browser. |
| `bbl-map.js` | Generated. Printer → nozzle variants, preset family → per-printer preset, per-variant keys. Names and array shapes only — no Bambu profile content is copied. |
| `tools/build-bbl-map.py` | Regenerates `bbl-map.js` from a local Bambu Studio install (`npm run build:map`). Run after a Studio update. |
| `index.js`, `bin/cli.js` | Node entry point and CLI. |
| `test/` | `npm test` (Node's built-in test runner, no dependencies). |
| `porter.html` | The web UI. |
| `worker.js` | Cloudflare Worker: serves the site and counts downloads anonymously (date, target printer, referrer host — no IPs, no cookies). Totals are public at [`/api/stats`](https://3d.omrielcharizi.com/api/stats). |

The same repo also holds **[הדפסה ראשונה](https://3d.omrielcharizi.com)** — an independent Hebrew guide for first-time 3D-printer buyers in Israel (printer picker, Israeli price catalog, manufacturer-sourced filament settings, first-week checklist). Content lives in `data.js`, `catalog.js`, `filaments.js`; `npm run check:links` verifies every external link.

## Development

```bash
npm test            # unit tests
npm run deploy      # wrangler deploy (Cloudflare Workers, static assets)
```

No build step, no runtime dependencies.

---

Not affiliated with Bambu Lab. MIT © [Omri Elcharizi](https://omrielcharizi.com)
