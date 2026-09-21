# Changelog

## 1.0.0 — 2026-09-21

First public release.

- **Web tool** at [3d.omrielcharizi.com/porter](https://3d.omrielcharizi.com/porter): drop filament preset JSON files, pick the target printer, download presets that show up under *Custom* instead of *Unsupported*.
- **CLI + library** (`@omritgm/preset-porter`): `npx github:OMRITGM/preset-porter --to H2S *.json`.
- 14 target printers (A1 mini, A1, A2L, P1P, P1S, P2S, X1, X1 Carbon, X1E, X2D, H2S, H2D, H2D Pro, H2C), map generated from Bambu Studio 2.8.0.6 system profiles.
- Parent swap with `Generic <type>` fallback, per-nozzle-variant array remapping (incl. X2D Bowden variants), calibrated values preserved.
- Import-tested on a real H2S with presets originating from P1S, X1C and A1.
