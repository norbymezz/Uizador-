import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../core/prebuilt-guides.js',import.meta.url),'utf8');
const api=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('el catálogo de guías pregrabadas tiene identificadores y fuentes válidas',()=>{
 assert.ok(api.PREBUILT_GUIDES.length>0);
 assert.equal(new Set(api.PREBUILT_GUIDES.map(x=>x.id)).size,api.PREBUILT_GUIDES.length);
 for(const guide of api.PREBUILT_GUIDES){
  assert.match(guide.id,/^[a-z0-9-]+$/);
  assert.ok(guide.durationSec>0);
  assert.ok(guide.beatSec>0);
  assert.match(guide.sourceUrl,/^\.\.\/prebuilt-guides\/.+\.html$/);
 }
});

test('Friends conserva el caso específico y su recorrido hasta grabación',async()=>{
 const guide=api.getPrebuiltGuide('friends-front-back');
 assert.ok(guide);
 assert.match(guide.reference,/S04E01/);
 assert.match(guide.span,/For the record/);
 assert.match(api.prebuiltGuideUrl(guide),/^https:\/\/norbymezz\.github\.io\/Uizador-\/web\/prebuilt-guides\/.+embed=1/);
 const bundled=await readFile(new URL('../web/prebuilt-guides/friends-for-record-front-back.html',import.meta.url),'utf8');
 assert.match(bundled,/uizador-guide/);
 assert.match(bundled,/autoplay/);
 const library=await readFile(new URL('../web/preset-library/index.html',import.meta.url),'utf8');
 const rehearsal=await readFile(new URL('../web/scene-rehearsal/index.html',import.meta.url),'utf8');
 assert.match(library,/PREBUILT_GUIDES/);
 assert.match(library,/sceneVisual/);
 assert.match(rehearsal,/id="prebuiltGuide"/);
 assert.match(rehearsal,/loadPrebuiltGuide\(true\)/);
});
