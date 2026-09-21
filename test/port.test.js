const test = require("node:test"), assert = require("node:assert");
const { portPreset, printers } = require("../index.js");

test("X1C preset -> H2S: parent swapped, calibrated flow kept, new nozzle variant inherits", () => {
  const { preset, notes } = portPreset({ name: "My PETG", inherits: "Bambu PETG Basic @BBL X1C", from: "User",
    filament_extruder_variant: ["Direct Drive Standard", "Direct Drive High Flow"], filament_flow_ratio: ["0.94", "nil"] }, "Bambu Lab H2S");
  assert.equal(preset.inherits, "Bambu PETG Basic @BBL H2S");
  assert.deepEqual(preset.filament_flow_ratio, ["0.94", "nil", "nil"]);
  assert.deepEqual(preset.filament_extruder_variant, ["Direct Drive Standard", "Direct Drive High Flow", "Direct Drive E3D High Flow"]);
  assert.equal(preset.name, "My PETG @H2S");
  assert.ok(notes.some((n) => n.includes("E3D High Flow")));
});

test("single-variant source -> multi-variant target: value applies to every nozzle type", () => {
  const { preset } = portPreset({ name: "ABS cal", inherits: "Generic ABS", filament_flow_ratio: ["0.931"] }, "Bambu Lab H2S");
  assert.equal(preset.inherits, "Generic ABS @BBL H2S 0.4 nozzle");
  assert.deepEqual(preset.filament_flow_ratio, ["0.931", "0.931", "0.931"]);
});

test("multi-variant source -> A1: collapses to one value, no variant list", () => {
  const { preset } = portPreset({ name: "P", inherits: "Generic PLA @BBL P1P", nozzle_temperature: ["215", "nil"],
    filament_extruder_variant: ["Direct Drive Standard", "Direct Drive High Flow"] }, "Bambu Lab A1");
  assert.deepEqual(preset.nozzle_temperature, ["215"]);
  assert.equal(preset.filament_extruder_variant, undefined);
});

test("brand preset missing on target falls back to Generic and says so", () => {
  const { preset, notes } = portPreset({ name: "S", inherits: "SUNLU PLA+ @BBL X1C" }, "Bambu Lab H2C");
  assert.equal(preset.inherits, "Generic PLA @BBL H2C 0.4 nozzle");
  assert.ok(notes.some((n) => n.includes("no H2C version")));
});

test("X2D gets Bowden variants mapped from their Direct Drive twins", () => {
  const { preset } = portPreset({ name: "T", inherits: "Generic PLA", nozzle_temperature: ["215", "220"],
    filament_extruder_variant: ["Direct Drive Standard", "Direct Drive High Flow"] }, "Bambu Lab X2D");
  assert.deepEqual(preset.nozzle_temperature, ["215", "220", "nil", "215", "220", "nil"]);
});

test("material unsupported on target is an error, unknown printer is an error", () => {
  assert.throws(() => portPreset({ name: "A", inherits: "Generic ABS" }, "Bambu Lab A1 mini"), /No ABS system preset/);
  assert.throws(() => portPreset({ name: "A", inherits: "Generic PLA" }, "Bambu Lab Z9"), /Unknown printer/);
  assert.ok(printers.includes("Bambu Lab H2S"));
});

test("cooling/chamber overrides are flagged, or reset on request", () => {
  const src = { name: "ABS P1S", inherits: "Bambu ABS @BBL X1C", fan_max_speed: ["20"], chamber_temperatures: ["0"], nozzle_temperature: ["255"] };
  const kept = portPreset(src, "Bambu Lab H2S");
  assert.equal(kept.preset.fan_max_speed[0], "20");
  assert.ok(kept.notes.some((n) => /fan_max_speed, chamber_temperatures/.test(n)));
  const reset = portPreset(src, "Bambu Lab H2S", { resetMachine: true });
  assert.ok(!("fan_max_speed" in reset.preset) && !("chamber_temperatures" in reset.preset));
  assert.equal(reset.preset.nozzle_temperature[0], "255");
});
