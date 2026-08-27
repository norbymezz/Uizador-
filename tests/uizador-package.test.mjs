import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const source = await readFile(new URL("../core/uizador-package.js", import.meta.url), "utf8");
const api = await import("data:text/javascript;base64," + Buffer.from(source).toString("base64"));

test("round-trips a project with captions", async () => {
  const blob = await api.createUizadorProject({
    manifest: {
      project: { id: "project-1", title: "Prueba", duration_us: 3_000_000 },
      scenes: [{ id: "scene-1", name: "Escena", takes: [] }],
      media: [],
      tracks: {
        captions: [{ id: "es", language: "es", format: "webvtt", path: "captions/es.vtt" }],
      },
    },
    files: [{ name: "captions/es.vtt", data: "WEBVTT\n\n00:00:00.000 --> 00:00:01.000\nHola\n" }],
  });

  const bytes = new Uint8Array(await blob.arrayBuffer());
  assert.deepEqual([...bytes.slice(0, 2)], [0x50, 0x4b]);

  const opened = await api.readUizadorProject(blob);
  assert.equal(opened.manifest.schema, "com.uizador.project");
  assert.equal(opened.manifest.format_version, 1);
  assert.equal(opened.manifest.project.title, "Prueba");
  assert.equal(new TextDecoder().decode(opened.files.get("captions/es.vtt")).includes("Hola"), true);
});

test("rejects unsafe paths", async () => {
  await assert.rejects(
    api.createUizadorProject({
      manifest: { project: { title: "Inseguro" } },
      files: [{ name: "../secreto.txt", data: "no" }],
    }),
    /Ruta insegura/,
  );
});

test("rejects a non-Uizador ZIP payload", async () => {
  await assert.rejects(
    api.readUizadorProject(new Blob([new Uint8Array(32)])),
    /paquete Uizador válido/,
  );
});
