// Ports a Bambu Studio user filament preset to another Bambu printer. Pure function, used by the web UI (porter-ui.js) and the CLI (bin/cli.js).
// Why presets break: `inherits` names a system preset bound to ONE printer family, and per-extruder-variant arrays must match the target's variant list.
function portPreset(src, model, MAP = BBL_MAP) {
  const notes = [], codes = [], out = JSON.parse(JSON.stringify(src));
  const note = (code, text, ...args) => { notes.push(text); codes.push({ code, args }); };
  const tgtVariants = MAP.printers[model];
  if (!tgtVariants) throw new Error("Unknown printer: " + model);
  const short = model.replace("Bambu Lab ", "");

  // 1. parent
  const parent = src.inherits || "";
  let base = MAP.leafBase[parent] || (parent.endsWith("@base") ? parent : null);
  if (parent && !base) note("customParent", `Parent "${parent}" is not a Bambu system preset (custom or third-party parent) - falling back to Generic.`, parent);
  let leaf = base && MAP.families[base]?.[model];
  if (parent && !leaf) {
    const type = (src.filament_type?.[0] || (base || parent).match(/\b(PLA|PETG|PCTG|ABS|ASA|TPU|PA|PC|PVA|PET|HIPS|PP|PE)\b/)?.[1] || "").toUpperCase();
    leaf = MAP.families[`Generic ${type} @base`]?.[model];
    if (!leaf) throw new Error(`No ${type || "matching"} system preset exists for ${short} - this material may not be supported on that printer.`);
    if (base) note("brandFallback", `"${base.replace(" @base", "")}" has no ${short} version - inherited from "${leaf}" instead. Check speeds and cooling.`, base.replace(" @base", ""), short, leaf);
  }
  if (parent) { out.inherits = leaf; delete out.compatible_printers; delete out.compatible_printers_condition; }
  else { // flattened preset (no parent): retarget the printer list instead
    out.compatible_printers = ["0.4", "0.6", "0.8"].map((n) => `${model} ${n} nozzle`);
    note("flattened", "Preset has no parent (flattened export) - retargeted its printer list; values were kept as-is.");
  }

  // 2. per-variant arrays
  const DEFAULT = ["Direct Drive Standard", "Direct Drive High Flow", "Direct Drive E3D High Flow"];
  const varKeys = Object.keys(src).filter((k) => MAP.variantKeys.includes(k) && k !== "filament_extruder_variant" && Array.isArray(src[k]));
  const srcVariants = src.filament_extruder_variant || DEFAULT.slice(0, Math.max(1, ...varKeys.map((k) => src[k].length)));
  const want = tgtVariants.length ? tgtVariants : ["Direct Drive Standard"];
  for (const k of varKeys) {
    const byName = Object.fromEntries(srcVariants.map((v, i) => [v, src[k][i] ?? "nil"]));
    const first = src[k].find((v) => v !== "nil");
    out[k] = want.map((v) => byName[v] ?? byName[v.replace("Bowden", "Direct Drive")] ?? (srcVariants.length === 1 ? first : "nil"));
    if (want.length === 1 && out[k][0] === "nil") out[k] = [first ?? "nil"];
    if (out[k].every((v) => v === "nil")) delete out[k];
  }
  if (tgtVariants.length > 1) out.filament_extruder_variant = [...tgtVariants]; else delete out.filament_extruder_variant;
  const added = want.filter((v) => !srcVariants.includes(v) && srcVariants.length > 1);
  if (added.length && varKeys.length) note("newVariants", `${short} has nozzle variants the source never defined (${added.join(", ")}) - those inherit the system values.`, short, added.join(", "));

  // 3. identity
  out.name = `${src.name || "preset"} @${short}`;
  out.filament_settings_id = [out.name];
  out.from = "User";
  for (const k of ["setting_id", "base_id", "user_id", "updated_time"]) delete out[k];
  return { preset: out, notes, noteCodes: codes, parent, newParent: out.inherits || null };
}
if (typeof module !== "undefined") module.exports = { portPreset };
