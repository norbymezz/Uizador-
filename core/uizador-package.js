const MIME = "application/vnd.uizador.project+zip";
const te = new TextEncoder();
const td = new TextDecoder();

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (const byte of bytes) c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function safePath(name) {
  const value = String(name || "").replaceAll("\\", "/");
  if (!value || value.startsWith("/") || value.includes("\0") || value.split("/").includes("..")) {
    throw new Error("Ruta insegura dentro del proyecto: " + name);
  }
  return value;
}

async function bytesOf(value) {
  if (value instanceof Uint8Array) return value;
  if (value instanceof ArrayBuffer) return new Uint8Array(value);
  if (value instanceof Blob) return new Uint8Array(await value.arrayBuffer());
  return te.encode(String(value));
}

function concat(parts) {
  const size = parts.reduce((sum, part) => sum + part.length, 0);
  const out = new Uint8Array(size);
  let offset = 0;
  for (const part of parts) {
    out.set(part, offset);
    offset += part.length;
  }
  return out;
}

function dosDateTime(date = new Date()) {
  const year = Math.max(1980, date.getFullYear());
  return {
    time: (date.getHours() << 11) | (date.getMinutes() << 5) | Math.floor(date.getSeconds() / 2),
    date: ((year - 1980) << 9) | ((date.getMonth() + 1) << 5) | date.getDate(),
  };
}

function localHeader(name, data, crc, stamp) {
  const nameBytes = te.encode(name);
  const out = new Uint8Array(30 + nameBytes.length);
  const v = new DataView(out.buffer);
  v.setUint32(0, 0x04034b50, true);
  v.setUint16(4, 20, true);
  v.setUint16(6, 0x0800, true);
  v.setUint16(8, 0, true);
  v.setUint16(10, stamp.time, true);
  v.setUint16(12, stamp.date, true);
  v.setUint32(14, crc, true);
  v.setUint32(18, data.length, true);
  v.setUint32(22, data.length, true);
  v.setUint16(26, nameBytes.length, true);
  v.setUint16(28, 0, true);
  out.set(nameBytes, 30);
  return out;
}

function centralHeader(entry, stamp) {
  const nameBytes = te.encode(entry.name);
  const out = new Uint8Array(46 + nameBytes.length);
  const v = new DataView(out.buffer);
  v.setUint32(0, 0x02014b50, true);
  v.setUint16(4, 20, true);
  v.setUint16(6, 20, true);
  v.setUint16(8, 0x0800, true);
  v.setUint16(10, 0, true);
  v.setUint16(12, stamp.time, true);
  v.setUint16(14, stamp.date, true);
  v.setUint32(16, entry.crc, true);
  v.setUint32(20, entry.data.length, true);
  v.setUint32(24, entry.data.length, true);
  v.setUint16(28, nameBytes.length, true);
  v.setUint16(30, 0, true);
  v.setUint16(32, 0, true);
  v.setUint16(34, 0, true);
  v.setUint16(36, 0, true);
  v.setUint32(38, 0, true);
  v.setUint32(42, entry.offset, true);
  out.set(nameBytes, 46);
  return out;
}

function endRecord(total, centralSize, centralOffset) {
  const out = new Uint8Array(22);
  const v = new DataView(out.buffer);
  v.setUint32(0, 0x06054b50, true);
  v.setUint16(4, 0, true);
  v.setUint16(6, 0, true);
  v.setUint16(8, total, true);
  v.setUint16(10, total, true);
  v.setUint32(12, centralSize, true);
  v.setUint32(16, centralOffset, true);
  v.setUint16(20, 0, true);
  return out;
}

export function normalizeManifest(manifest) {
  const now = new Date().toISOString();
  const source = structuredClone(manifest || {});
  source.schema = "com.uizador.project";
  source.format_version = 1;
  source.project = source.project || {};
  source.project.id = source.project.id || crypto.randomUUID();
  source.project.title = source.project.title || "Proyecto sin nombre";
  source.project.created_at = source.project.created_at || now;
  source.project.updated_at = now;
  source.scenes = Array.isArray(source.scenes) ? source.scenes : [];
  source.media = Array.isArray(source.media) ? source.media : [];
  source.tracks = source.tracks || {};
  return source;
}

export async function createUizadorProject({ manifest, files = [] }) {
  const normalized = normalizeManifest(manifest);
  const requested = [
    { name: "mimetype", data: MIME },
    { name: "manifest.json", data: JSON.stringify(normalized, null, 2) + "\n" },
    ...files,
  ];
  const seen = new Set();
  const entries = [];
  for (const item of requested) {
    const name = safePath(item.name);
    if (seen.has(name)) throw new Error("Archivo duplicado: " + name);
    seen.add(name);
    const data = await bytesOf(item.data);
    entries.push({ name, data, crc: crc32(data), offset: 0 });
  }

  const stamp = dosDateTime();
  const local = [];
  let offset = 0;
  for (const entry of entries) {
    entry.offset = offset;
    const header = localHeader(entry.name, entry.data, entry.crc, stamp);
    local.push(header, entry.data);
    offset += header.length + entry.data.length;
  }

  const central = entries.map(entry => centralHeader(entry, stamp));
  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const zip = concat([...local, ...central, endRecord(entries.length, centralSize, offset)]);
  return new Blob([zip], { type: MIME });
}

function findEnd(bytes) {
  const min = Math.max(0, bytes.length - 65557);
  for (let i = bytes.length - 22; i >= min; i--) {
    if (bytes[i] === 0x50 && bytes[i + 1] === 0x4b && bytes[i + 2] === 0x05 && bytes[i + 3] === 0x06) return i;
  }
  throw new Error("El archivo no contiene un paquete Uizador válido.");
}

export async function readUizadorProject(input) {
  const bytes = input instanceof Uint8Array ? input : new Uint8Array(
    input instanceof ArrayBuffer ? input : await input.arrayBuffer()
  );
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const end = findEnd(bytes);
  const total = view.getUint16(end + 10, true);
  let cursor = view.getUint32(end + 16, true);
  const files = new Map();

  for (let i = 0; i < total; i++) {
    if (view.getUint32(cursor, true) !== 0x02014b50) throw new Error("Directorio ZIP dañado.");
    const method = view.getUint16(cursor + 10, true);
    const expectedCrc = view.getUint32(cursor + 16, true);
    const compressedSize = view.getUint32(cursor + 20, true);
    const nameLength = view.getUint16(cursor + 28, true);
    const extraLength = view.getUint16(cursor + 30, true);
    const commentLength = view.getUint16(cursor + 32, true);
    const localOffset = view.getUint32(cursor + 42, true);
    const name = safePath(td.decode(bytes.subarray(cursor + 46, cursor + 46 + nameLength)));
    if (method !== 0) throw new Error("Compresión no compatible en " + name);
    if (view.getUint32(localOffset, true) !== 0x04034b50) throw new Error("Entrada ZIP dañada.");
    const localNameLength = view.getUint16(localOffset + 26, true);
    const localExtraLength = view.getUint16(localOffset + 28, true);
    const start = localOffset + 30 + localNameLength + localExtraLength;
    const data = bytes.slice(start, start + compressedSize);
    if (crc32(data) !== expectedCrc) throw new Error("Falló la integridad de " + name);
    files.set(name, data);
    cursor += 46 + nameLength + extraLength + commentLength;
  }

  const type = files.get("mimetype");
  if (!type || td.decode(type) !== MIME) throw new Error("No es un proyecto Uizador.");
  const rawManifest = files.get("manifest.json");
  if (!rawManifest) throw new Error("Falta manifest.json.");
  const manifest = JSON.parse(td.decode(rawManifest));
  if (manifest.schema !== "com.uizador.project" || manifest.format_version !== 1) {
    throw new Error("Versión de proyecto no compatible.");
  }
  return { manifest, files, mimeType: MIME };
}

export async function downloadUizadorProject(project, filename) {
  const blob = await createUizadorProject(project);
  const safe = String(filename || project.manifest?.project?.title || "proyecto")
    .normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "").toLowerCase() || "proyecto";
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = safe + ".uizador";
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export { MIME as UIZADOR_PROJECT_MIME };
