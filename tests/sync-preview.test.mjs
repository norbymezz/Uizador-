import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const html=await readFile(new URL('../web/sync-preview/index.html',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)?.[1]??'';

test('sync preview contains valid JavaScript',()=>{
  assert.ok(script.length>1000);
  assert.doesNotThrow(()=>new Function(script));
});

test('interactive element IDs are unique',()=>{
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length);
});

test('MVP batch controls remain connected',()=>{
  for(const id of [
    'projectName','exportName','outputLayout','prevCut','nextCut','undoCut',
    'setTrimStart','setTrimEnd','clearTrim','audioA','audioB','audioMix',
    'audioNone','exportSummary','exportVideo'
  ]) assert.match(html,new RegExp(`id="${id}"`),`missing #${id}`);
  for(const handler of [
    "$('#prevCut').onclick","$('#nextCut').onclick","$('#undoCut').onclick",
    "$('#projectName').oninput","$('#exportName').oninput","$('#outputLayout').onchange"
  ]) assert.ok(script.includes(handler),`missing handler ${handler}`);
});

test('project and export compatibility markers are present',()=>{
  assert.ok(script.includes('uizador.multicam.project.v0.8'));
  assert.ok(script.includes('legacyAudioMode'));
  assert.ok(script.includes("safeName(projectName,'uizador-project')+'.uizador'"));
  assert.ok(script.includes("safeName(exportName,'uizador-edited-video')+'.webm'"));
  for(const layout of ['landscape','portrait','square']) assert.ok(html.includes(`value="${layout}"`));
});

test('visible editor copy remains English',()=>{
  assert.doesNotMatch(html,/[áéíóúñ¿¡]/i);
  assert.doesNotMatch(html,/id="mute[AB]"/);
});


test('export explicitly releases and restores preview resources',()=>{
  for(const marker of [
    'releasePreviewForExport','restorePreviewAfterExport','renderStream?.getTracks()',
    "removeAttribute('src')",'setExportLock(true)','setExportLock(false)'
  ]) assert.ok(script.includes(marker),`missing export recovery marker: ${marker}`);
  assert.ok(script.includes("$('#play').textContent='Pause'"));
  assert.ok(script.includes("v.addEventListener('loadedmetadata'"));
});
