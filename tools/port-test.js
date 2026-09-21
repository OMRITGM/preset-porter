// node tools/port-test.js "<target model>" <outDir> <file.json>...  — ports real presets with the same code the page uses.
const fs = require("fs"), path = require("path");
global.BBL_MAP = require("../bbl-map.js");
const { portPreset } = require("../porter-core.js");
const [model, outDir, ...files] = process.argv.slice(2);
fs.mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const src = JSON.parse(fs.readFileSync(f, "utf8"));
  try {
    const r = portPreset(src, model);
    fs.writeFileSync(path.join(outDir, r.preset.name.replace(/[\\/:*?"<>|]/g, "-") + ".json"), JSON.stringify(r.preset, null, 4));
    console.log(`OK   ${src.name}\n     ${r.parent || "(no parent)"} -> ${r.newParent}`);
    for (const k of Object.keys(r.preset)) if (Array.isArray(src[k]) && JSON.stringify(src[k]) !== JSON.stringify(r.preset[k]) && k !== "filament_settings_id") console.log(`     ${k}: ${JSON.stringify(src[k])} -> ${JSON.stringify(r.preset[k])}`);
    r.notes.forEach((n) => console.log("     ! " + n));
  } catch (e) { console.log(`FAIL ${src.name}: ${e.message}`); }
}
