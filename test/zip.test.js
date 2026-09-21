const test = require("node:test"), assert = require("node:assert"), zlib = require("node:zlib");
const { makeZip } = require("../zip.js");

test("zip: valid structure, UTF-8 names, CRC matches stored data", () => {
  const files = [{ name: "My PETG @H2S.json", text: '{"a":1}' }, { name: "עברית @H2S.json", text: '{"b":"ש"}' }];
  const z = Buffer.from(makeZip(files));
  assert.equal(z.readUInt32LE(0), 0x04034b50); // local header
  const eocd = z.length - 22;
  assert.equal(z.readUInt32LE(eocd), 0x06054b50);
  assert.equal(z.readUInt16LE(eocd + 10), 2); // entries
  let p = 0;
  for (const f of files) {
    const nameLen = z.readUInt16LE(p + 26), size = z.readUInt32LE(p + 18), crc = z.readUInt32LE(p + 14);
    assert.equal(z.toString("utf8", p + 30, p + 30 + nameLen), f.name);
    const data = z.subarray(p + 30 + nameLen, p + 30 + nameLen + size);
    assert.equal(data.toString("utf8"), f.text);
    assert.equal(crc, zlib.crc32(data));
    p += 30 + nameLen + size;
  }
});
