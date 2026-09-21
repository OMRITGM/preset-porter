// Node entry point: const { portPreset, printers } = require("@omritgm/preset-porter");
const MAP = require("./bbl-map.js");
const core = require("./porter-core.js");

module.exports = {
  /** Port a Bambu Studio filament preset (parsed JSON) to `model`, e.g. "Bambu Lab H2S". `opts.resetMachine` drops cooling/chamber/flow overrides so the target's defaults apply. Returns { preset, notes, parent, newParent }. */
  portPreset: (preset, model, opts) => core.portPreset(preset, model, MAP, opts),
  /** Supported target printers, e.g. ["Bambu Lab A1", "Bambu Lab H2S", ...]. */
  printers: Object.keys(MAP.printers),
  /** Bambu Studio version the printer map was generated from. */
  studioVersion: MAP.version,
};
