# Changelog

## 1.2.0 — 2026-09-21

- **Cooling/chamber overrides are flagged.** A preset tuned on one machine (e.g. low part-cooling for ABS on an unheated P1S) would carry those values to a printer with a heated chamber and cancel its defaults. The porter now lists every overridden fan, chamber and max-volumetric-speed key so you can review it.
- **Optional reset:** tick *Reset cooling, chamber & flow* (web) or pass `--reset-cooling` (CLI) / `{ resetMachine: true }` (Node) to drop those overrides and take the target printer's system values. Temperatures, flow ratio and pressure advance are kept. Thanks to Gerrit on the Bambu forum for the report.

## 1.1.0 — 2026-09-21

- **Download all → one `.zip`.** Bambu Studio's *Import Configs* takes the zip directly, so porting a whole library is one download and one import (verified on a real H2S).
- Presets that would end up with the same name get a numeric suffix — Studio keys presets by name, so duplicates used to overwrite each other.
- **Hebrew UI** at [/porter-he](https://3d.omrielcharizi.com/porter-he), with translated notes and errors.
- Security: strict Content-Security-Policy and security headers; escaped error output in the Hebrew UI; hardened download counter (same-origin only, allow-listed values, bounded storage).
- Accessibility: keyboard-operable drop zone, labelled controls.

## 1.0.0 — 2026-09-21

First public release.

- **Web tool** at [3d.omrielcharizi.com/porter](https://3d.omrielcharizi.com/porter): drop filament preset JSON files, pick the target printer, download presets that show up under *Custom* instead of *Unsupported*.
- **CLI + library** (`@omritgm/preset-porter`): `npx github:OMRITGM/preset-porter --to H2S *.json`.
- 14 target printers (A1 mini, A1, A2L, P1P, P1S, P2S, X1, X1 Carbon, X1E, X2D, H2S, H2D, H2D Pro, H2C), map generated from Bambu Studio 2.8.0.6 system profiles.
- Parent swap with `Generic <type>` fallback, per-nozzle-variant array remapping (incl. X2D Bowden variants), calibrated values preserved.
- Import-tested on a real H2S with presets originating from P1S, X1C and A1.
