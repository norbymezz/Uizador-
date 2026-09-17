import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const html=await readFile(new URL('../web/sync-preview/index.html',import.meta.url),'utf8');
const captureHtml=await readFile(new URL('../web/multicamera-session/index.html',import.meta.url),'utf8');
const presetHtml=await readFile(new URL('../web/preset-library/index.html',import.meta.url),'utf8');
const rootHtml=await readFile(new URL('../index.html',import.meta.url),'utf8');
const guidedTestDoc=await readFile(new URL('../docs/guided-end-to-end-test.md',import.meta.url),'utf8');
const script=html.match(/<script>([\s\S]*)<\/script>/)?.[1]??'';
const presetScript=presetHtml.match(/<script(?:\s[^>]*)?>([\s\S]*)<\/script>/)?.[1]??'';
const presetExecutable=presetScript.replace(/^\s*import[^\n]+\n/,'');

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
    'audioNone','exportSummary','exportVideo','musicFile','musicAudition','musicWave',
    'musicStartRange','musicEndRange','musicVolume','musicLoop','previewMusic'
  ]) assert.match(html,new RegExp(`id="${id}"`),`missing #${id}`);
  for(const handler of [
    "$('#prevCut').onclick","$('#nextCut').onclick","$('#undoCut').onclick",
    "$('#projectName').oninput","$('#exportName').oninput","$('#outputLayout').onchange"
  ]) assert.ok(script.includes(handler),`missing handler ${handler}`);
});

test('project and export compatibility markers are present',()=>{
  assert.ok(script.includes('uizador.multicam.project.v1.0'));
  assert.ok(script.includes('uizador.multicam.edl.v0.6'));
  assert.ok(script.includes('legacyAudioMode'));
  assert.ok(script.includes("safeName(projectName,'uizador-project')+'.uizador'"));
  assert.ok(script.includes("safeName(exportName,'uizador-edited-video')+'.webm'"));
  for(const layout of ['landscape','portrait','square']) assert.ok(html.includes(`value="${layout}"`));
});

test('news and podcast presets are editable, persistent, and renderable',()=>{
  for(const id of [
    'productionPreset','applyProductionPreset','presetBrand','presetHeadline',
    'presetNameA','presetNameB','presetUrgent','graphicsPreview','chooseSplit'
  ]) assert.match(html,new RegExp(`id="${id}"`),`missing #${id}`);
  for(const marker of [
    "'breaking-news'","'video-podcast'",'productionState()',
    "addCut('S')",'drawProgramFrame','drawProductionGraphics',
    "['A','B','S'].includes",'report.production=productionState()'
  ]) assert.ok(script.includes(marker),`missing production preset marker: ${marker}`);
  assert.match(html,/Split A \+ B/);
  assert.match(html,/\.cut\.s\{/);
});

test('preset library exposes the two production presets directly',()=>{
  assert.doesNotThrow(()=>new Function(presetExecutable));
  assert.ok(presetScript.includes("href:'../sync-preview/index.html?preset=breaking-news'"));
  assert.ok(presetScript.includes("href:'../sync-preview/index.html?preset=video-podcast'"));
  const sceneIds=[...presetScript.matchAll(/\{id:'([^']+)'/g)].map(x=>x[1]);
  assert.equal(new Set(sceneIds).size,sceneIds.length);
  assert.match(presetHtml,/Use preset/);
});

test('visible editor copy remains English',()=>{
  assert.match(html,/<html lang="en">/);
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

test('recording completion continues to synchronization on the director phone',()=>{
  const captureScript=captureHtml.match(/<script>([\s\S]*)<\/script>/)?.[1]??'';
  for(const id of ['directorNext','remoteNext','continueSync'])
    assert.match(captureHtml,new RegExp(`id="${id}"`),`missing handoff control #${id}`);
  for(const marker of ['synchronizationContinuationUrl','updateContinuation',"from:'capture'","query.set('capturePreset',id)"])
    assert.ok(captureScript.includes(marker),`missing capture continuation marker: ${marker}`);
  assert.match(captureHtml,/Ya grabé y tengo los archivos/);
  assert.match(captureHtml,/Agregar archivos y sincronizar/);
});

test('sync editor explains the remaining guided steps after capture',()=>{
  for(const id of ['captureFlow','capturePresetLabel','hideCaptureFlow','setupSummary','syncSummary','previewSummary','exportPanelSummary'])
    assert.match(html,new RegExp(`id="${id}"`),`missing guided-sync control #${id}`);
  for(const marker of ['configureCaptureContinuation','fromCapture','CAPTURE_PRESET_NAMES',"'3 · Add recordings'","'6 · Export final video'"])
    assert.ok(script.includes(marker),`missing guided-sync marker: ${marker}`);
});

test('repository root is the clean shareable guided entry',()=>{
  assert.match(rootHtml,/url=\.\/web\/multicamera-session\//);
  assert.match(rootHtml,/location\.replace\('\.\/web\/multicamera-session\/'\)/);
  assert.match(guidedTestDoc,/https:\/\/norbymezz\.github\.io\/Uizador-\//);
  for(const step of ['preset','QR','sincronización','export']) assert.ok(guidedTestDoc.includes(step));
});

test('a director chooses a detailed preset before creating the session',()=>{
  const captureScript=captureHtml.match(/<script>([\s\S]*)<\/script>/)?.[1]??'';
  const ids=[...captureHtml.matchAll(/\sid="([^"]+)"/g)].map(x=>x[1]);
  assert.equal(new Set(ids).size,ids.length);
  for(const id of ['presetGrid','create','lobbyPresetName','lobbyPresetPlan','cameraPreset'])
    assert.match(captureHtml,new RegExp(`id="${id}"`),`missing session preset control #${id}`);
  assert.ok(captureHtml.indexOf('id="presetGrid"')<captureHtml.indexOf('id="qr"'));
  assert.match(captureHtml,/id="create"[^>]+disabled>Elegí un preset para continuar/);
  for(const title of [
    'Prueba de sincronización','Plano / contraplano','Friends · “We were on a break”',
    'A Few Good Men · tribunal','Sitcom de tres planos','Breaking News','Video Podcast','Caminata con diálogo'
  ]) assert.ok(captureScript.includes(title),`missing session preset: ${title}`);
  for(const marker of [
    'SESSION_PRESETS','renderPresetChooser','selectPreset','presetFromConfig','applyPresetToCamera',
    "if(joinId)join(joinId);else renderPresetChooser()",'presetId:preset?.id',
    'preset_id:item.presetId','preset:{id:currentCfg?.presetId'
  ]) assert.ok(captureScript.includes(marker),`missing session preset marker: ${marker}`);
});

test('plain shot reverse shot uses one subject per camera frame',()=>{
  const captureScript=captureHtml.match(/<script>([\s\S]*)<\/script>/)?.[1]??'';
  const reverse=captureScript.slice(captureScript.indexOf("{id:'reverse'"),captureScript.indexOf("{id:'friends-front-back'"));
  for(const marker of [
    "people:'1 persona por plano'","visual:'single-per-shot'","guideMode:'single-subject'",
    "promptA:'Encuadrá solamente al personaje A.'","promptB:'Encuadrá solamente al personaje B.'"
  ]) assert.ok(reverse.includes(marker),`missing reverse-shot marker: ${marker}`);
  for(const marker of ['presetVisual','single-per-shot','single-shot','promptForCamera'])
    assert.ok(captureScript.includes(marker),`missing single-subject rendering marker: ${marker}`);
  assert.match(captureHtml,/\.stage\.single-subject \.face\.b\{display:none\}/);
  assert.match(captureHtml,/\.stage\.single-subject \.face\.a\{left:34%\}/);
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
  assert.match(html,/Camera audio stays continuous and remains the synchronization clock/);
});

test('background music uses a selected fragment without becoming the sync clock',()=>{
  for(const marker of [
    'backgroundMusicState','selectBackgroundMusic','musicSourceTime','syncMusicPlayer',
    "anchor:'export_start'","report.background_music=backgroundMusicState()",
    'musicSource=ac.createBufferSource()','musicSource.loopStart','musicSource.loopEnd',
    'musicGain.gain.value=musicVolume','musicSelectionDuration()'
  ]) assert.ok(script.includes(marker),`missing background-music marker: ${marker}`);
  const mediaClock=script.slice(script.indexOf('function mediaClock()'),script.indexOf('function commonTime()'));
  assert.doesNotMatch(mediaClock,/musicPlayer|backgroundMusic/);
  assert.match(html,/Repeat the selected fragment to fill the complete export range/);
  assert.match(html,/Background music never changes the A\/B offset/);
});

test('background music status follows range changes',()=>{
  const bounds=script.slice(script.indexOf('function setMusicBounds('),script.indexOf('function drawMusicWave'));
  assert.ok(bounds.includes("$('#musicStatus').textContent=musicFile.name+' · '+format(musicDuration)+' · selected '+format(musicSelectionDuration())+'.'"));
});

test('background music mapping anchors, wraps, and stops exactly',()=>{
  const source=script.match(/function mapMusicSourceTime\([^\n]+\}/)?.[0]??'';
  const map=new Function(source+';return mapMusicSourceTime')();
  assert.equal(map(5,5,20,10,14,true),10);
  assert.equal(map(8,5,20,10,14,true),13);
  assert.equal(map(9,5,20,10,14,true),10);
  assert.equal(map(9,5,20,10,14,false),null);
  assert.equal(map(4.99,5,20,10,14,true),null);
  assert.equal(map(20,5,20,10,14,true),null);
});

test('background music selection and preview survive export decoder release',()=>{
  for(const marker of [
    "state={time:commonTime(),a:mediaUrls.A",
    'music:musicUrl','music_audition_time','[musicPlayer,audition]',
    "musicPlayer.addEventListener('loadedmetadata'","Reselect '+musicRef.name"
  ]) assert.ok(script.includes(marker),`missing music recovery marker: ${marker}`);
  assert.ok(script.includes("if(musicRef&&!musicFile)"));
  assert.ok(html.includes('accept="audio/*"'));
});
