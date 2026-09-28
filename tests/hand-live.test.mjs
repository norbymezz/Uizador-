import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const html=await readFile(new URL('../web/hand-live/index.html',import.meta.url),'utf8');
const script=html.match(/<script type="module">([\s\S]*)<\/script>/)?.[1]??'';

test('hand live module contains valid JavaScript and unique IDs',()=>{
  assert.ok(script.length>5000);
  assert.doesNotThrow(()=>new Function(script));
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length);
});

test('capture and sound have independent start and stop controls',()=>{
  for(const id of ['startCamera','stopCamera','startSound','stopSound'])
    assert.match(html,new RegExp(`id="${id}"`),`missing #${id}`);
  assert.ok(script.includes("$('#startCamera').onclick=startCamera"));
  assert.ok(script.includes("$('#startSound').onclick=startSound"));
  assert.ok(!script.includes('Iniciar cámara y flautas'));
});

test('capture reports requested, camera, measured, and detection FPS',()=>{
  for(const id of ['fpsTarget','fpsTargetValue','captureFps','captureSettings','detectionFps'])
    assert.match(html,new RegExp(`id="${id}"`),`missing #${id}`);
  for(const marker of ['getSettings','requestVideoFrameCallback','captureMeter','detectionTick','applyConstraints'])
    assert.ok(script.includes(marker),`missing FPS marker ${marker}`);
});

test('representation exposes points, radial zones, and inverse-distance body',()=>{
  for(const value of ['skeleton','rings','body']) assert.match(html,new RegExp(`value="${value}"`));
  for(const id of ['ringSequence','radius','falloff','smoothing','confidence'])
    assert.match(html,new RegExp(`id="${id}"`),`missing representation control #${id}`);
  for(const marker of ['drawSkeleton','drawRings','drawBody','1/(1+Math.pow'])
    assert.ok(script.includes(marker),`missing representation marker ${marker}`);
  assert.match(html,/no se realimentan al detector/);
});

test('sound offers instrument, frequencies, beat, volume source, and MIDI',()=>{
  for(const id of ['instrument','intervals','frequency','tempo','beat','volumeSource','manualVolume','midi'])
    assert.match(html,new RegExp(`id="${id}"`),`missing sound control #${id}`);
  for(const marker of ['Flauta sintética','Seno puro','Órgano','Cuerda sintética','requestMIDIAccess'])
    assert.ok(html.includes(marker),`missing sound option ${marker}`);
});
