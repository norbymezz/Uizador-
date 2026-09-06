import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const html=await readFile(new URL('../web/sync-preview/index.html',import.meta.url),'utf8');
const captureHtml=await readFile(new URL('../web/multicamera-session/index.html',import.meta.url),'utf8');
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


test('export releases and restores every preview decoder',()=>{
  for(const marker of [
    'releasePreviewForExport','restorePreviewAfterExport','renderStream?.getTracks()',
    '[videos.A,videos.B,audioPlayers.A,audioPlayers.B]',
    "media.removeAttribute('src')",'a.src=url',
    "audioPlayers[key].addEventListener('loadedmetadata'",
    'setExportLock(true)','setExportLock(false)'
  ]) assert.ok(script.includes(marker),`missing export recovery marker: ${marker}`);
  assert.ok(script.includes("$('#play').textContent='Pause'"));
  assert.ok(script.includes("v.addEventListener('loadedmetadata'"));
});


test('common transport clock is independent from sampled video frames',()=>{
  for(const marker of [
    'transportAnchor','transportStartedAt','mediaLocalTime','syncAudioPlayer',
    'samplePreviewFrame','stopPreviewPlayback','local>=0&&local<d-.01'
  ]) assert.ok(script.includes(marker),`missing transport marker: ${marker}`);
  assert.ok(!script.includes("function commonTime(){return videos.A.currentTime"));
  assert.ok(!script.includes('syncPreviewMedia'));
});

test('renamed capture identity reuses the main preview container',()=>{
  for(const id of ['captureManifestFiles','mediaPreviewPanel','previewVideos','videoA'])
    assert.match(html,new RegExp(`id="${id}"`));
  for(const marker of ['applyCaptureIdentities','previewMedia','closeMediaPreview','labelMedia','uizador.capture.manifest.v0.1'])
    assert.ok(script.includes(marker),`missing identity marker: ${marker}`);
  assert.doesNotMatch(html,/id="setupPreview"/);
});

test('workflow is one ordered collapsible page without duplicated step controls',()=>{
  const ordered=['id="setupPanel"','id="syncPanel"','id="previewCard"','id="exportPanel"'];
  let cursor=-1;
  for(const marker of ordered){
    const next=html.indexOf(marker);
    assert.ok(next>cursor,`out-of-order section: ${marker}`);
    cursor=next;
  }
  for(const removed of ['stepSetup','stepEdit','setupScreen','editorScreen','continueEditor','backSetup'])
    assert.ok(!html.includes(`id="${removed}"`),`obsolete split-screen control remains: ${removed}`);
  assert.ok(!script.includes('showWorkspace('));
  assert.ok(!script.includes('openEditorPreservingSync'));
  assert.match(html,/class="card collapsible" id="previewCard" open/);
});

test('capture page produces shareable named files and SHA manifests',()=>{
  const captureScript=captureHtml.match(/<script>([\s\S]*)<\/script>/)?.[1]??'';
  assert.doesNotThrow(()=>new Function(captureScript));
  for(const marker of ['shareTake','captureManifest','blobSha256','uizador.capture.manifest.v0.1'])
    assert.ok(captureScript.includes(marker),`missing capture marker: ${marker}`);
});


test('continuous audio is decoupled from low-rate phone preview',()=>{
  for(const marker of [
    'mediaClock','audioSignalLabel','audioSignalStatus',
    'audioPlayers={A:new Audio(),B:new Audio()}','PREVIEW_SAMPLE_HZ=3',
    'PREVIEW_SAMPLE_MS=1000/PREVIEW_SAMPLE_HZ','setInterval(syncLoop,100)',
    'videos.A.muted=videos.B.muted=true'
  ]) assert.ok(script.includes(marker),`missing lightweight-preview marker: ${marker}`);
  assert.ok(script.includes("const key=previewTurn++%2===0?'A':'B'"));
  assert.ok(script.includes('a.volume=1'));
  assert.ok(!script.includes('requestMediaPlay'));
  assert.match(html,/Audio stays continuous; final export uses every original frame/);
});
