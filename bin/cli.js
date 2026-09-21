#!/usr/bin/env node
// preset-porter --to H2S [-o outDir] preset.json [more.json ...]
const fs = require("fs"), path = require("path");
const { portPreset, printers, studioVersion } = require("../index.js");

const args = process.argv.slice(2), files = [];
let to, out = ".";
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--to" || args[i] === "-t") to = args[++i];
  else if (args[i] === "--out" || args[i] === "-o") out = args[++i];
  else if (args[i] === "--list") { console.log(printers.map((p) => p.replace("Bambu Lab ", "")).join("\n")); process.exit(0); }
  else files.push(args[i]);
}
const model = printers.find((p) => p.toLowerCase() === `bambu lab ${to}`.toLowerCase() || p.toLowerCase() === String(to).toLowerCase());
if (!model || !files.length) {
  console.error(`Usage: preset-porter --to <printer> [-o outDir] <preset.json> [...]\n       preset-porter --list\n(printer map built from Bambu Studio ${studioVersion})`);
  process.exit(2);
}
fs.mkdirSync(out, { recursive: true });
let failed = 0;
for (const f of files) {
  try {
    const r = portPreset(JSON.parse(fs.readFileSync(f, "utf8")), model);
    const dest = path.join(out, r.preset.name.replace(/[\\/:*?"<>|]/g, "-") + ".json");
    fs.writeFileSync(dest, JSON.stringify(r.preset, null, 4));
    console.log(`OK    ${dest}\n      ${r.parent || "(no parent)"} -> ${r.newParent || "printer list retargeted"}`);
    r.notes.forEach((n) => console.log("      ! " + n));
  } catch (e) { failed++; console.error(`FAIL  ${f}: ${e.message}`); }
}
process.exit(failed ? 1 : 0);
