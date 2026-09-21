// Minimal ZIP writer (store, no compression) — enough for a handful of small JSON presets. No dependencies.
// Bambu Studio's File → Import → Import Configs accepts a .zip of presets directly.
function makeZip(files) { // files: [{ name, text }] -> Uint8Array
  const enc = new TextEncoder(), crcTable = makeZip.t || (makeZip.t = Array.from({ length: 256 }, (_, n) => {
    let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0;
  }));
  const crc32 = (b) => { let c = 0xffffffff; for (const x of b) c = crcTable[(c ^ x) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const now = new Date(), time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const local = [], central = []; let offset = 0;
  for (const f of files) {
    const name = enc.encode(f.name), data = enc.encode(f.text), crc = crc32(data);
    const common = [0x0800, 0, time, date, crc, data.length, data.length, name.length, 0]; // flags: UTF-8 names
    const lh = new DataView(new ArrayBuffer(30));
    [[0, 0x04034b50, 4], [4, 20, 2], [6, common[0], 2], [8, 0, 2], [10, time, 2], [12, date, 2], [14, crc, 4], [18, data.length, 4], [22, data.length, 4], [26, name.length, 2], [28, 0, 2]]
      .forEach(([o, v, s]) => (s === 4 ? lh.setUint32(o, v, true) : lh.setUint16(o, v, true)));
    const ch = new DataView(new ArrayBuffer(46));
    [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 0, 2], [12, time, 2], [14, date, 2], [16, crc, 4], [20, data.length, 4], [24, data.length, 4], [28, name.length, 2], [42, offset, 4]]
      .forEach(([o, v, s]) => (s === 4 ? ch.setUint32(o, v, true) : ch.setUint16(o, v, true)));
    local.push(new Uint8Array(lh.buffer), name, data); central.push(new Uint8Array(ch.buffer), name);
    offset += 30 + name.length + data.length;
  }
  const cdSize = central.reduce((s, p) => s + p.length, 0), end = new DataView(new ArrayBuffer(22));
  [[0, 0x06054b50, 4], [8, files.length, 2], [10, files.length, 2], [12, cdSize, 4], [16, offset, 4]].forEach(([o, v, s]) => (s === 4 ? end.setUint32(o, v, true) : end.setUint16(o, v, true)));
  const parts = [...local, ...central, new Uint8Array(end.buffer)], out = new Uint8Array(parts.reduce((s, p) => s + p.length, 0));
  let p = 0; for (const x of parts) { out.set(x, p); p += x.length; }
  return out;
}
if (typeof module !== "undefined") module.exports = { makeZip };
