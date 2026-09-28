import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const html=await readFile(new URL('../web/hand-live/index.html',import.meta.url),'utf8');
const script=html.match(/<script type="module">([\s\S]*)<\/script>/)?.[1]??'';
const functionSource=name=>script.match(new RegExp(`function ${name}\\([^\\n]+`))?.[0]??'';

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
  assert.match(html,/lo que se realimenta es la región espacial/);
});

test('sound offers instrument, frequencies, beat, volume source, and MIDI',()=>{
  for(const id of ['instrument','intervals','frequency','tempo','beat','volumeSource','manualVolume','midi'])
    assert.match(html,new RegExp(`id="${id}"`),`missing sound control #${id}`);
  for(const marker of ['Flauta sintética','Seno puro','Órgano','Cuerda sintética','requestMIDIAccess'])
    assert.ok(html.includes(marker),`missing sound option ${marker}`);
});

test('camera can be selected and previous detection masks the next detector input',()=>{
  for(const id of ['cameraDevice','feedback','feedbackStrength','feedbackMargin','detectorInputState'])
    assert.match(html,new RegExp(`id="${id}"`),`missing feedback control #${id}`);
  for(const marker of ['enumerateDevices','deviceId={exact:id}','detectorCanvas','maskCanvas','lastDetectedHands','feedbackFrameIndex%12===0'])
    assert.ok(script.includes(marker),`missing feedback marker ${marker}`);
});

test('hidden-camera surface contains a playable chromatic octave',()=>{
  for(const id of ['keyboardMode','keyboardNote']) assert.match(html,new RegExp(`id="${id}"`));
  for(const marker of ['NOTE_NAMES','WHITE_NOTES','BLACK_NOTES','drawKeyboard','keyboardHit','triggerKeyboardNote'])
    assert.ok(script.includes(marker),`missing keyboard marker ${marker}`);
  assert.match(html,/TECLADO C4–B4/);
});

test('three-gesture confirmation and finger-gun commands remain explicit',()=>{
  for(const id of ['commandRule','gestureStatus','sequenceStatus','commandStatus'])
    assert.match(html,new RegExp(`id="${id}"`),`missing gesture control #${id}`);
  for(const marker of [
    "['thumb','none','point','none','open']",'now-gestureCandidateSince>=500',
    'sequenceDeadline=now+4500',"emitCommand('confirm'","'aim-left'","'aim-right'",'drawGun'
  ]) assert.ok(script.includes(marker),`missing gesture marker ${marker}`);
});

test('finger-gun classifier distinguishes direction and thumb-up',()=>{
  const source=['distance','angle','fingerExtended','classifyGesture'].map(functionSource).join('\n');
  const classify=new Function(source+';return classifyGesture')();
  const blank=()=>Array.from({length:21},()=>({x:.5,y:.5}));
  const folded=(h,m,p,t,x,y)=>{h[m]={x,y};h[p]={x:x+.08,y};h[t]={x:x+.03,y:y+.02}};
  const gun=blank();gun[0]={x:.3,y:.75};gun[2]={x:.42,y:.55};gun[3]={x:.42,y:.45};gun[4]={x:.42,y:.32};gun[5]={x:.4,y:.5};gun[6]={x:.55,y:.5};gun[8]={x:.82,y:.5};folded(gun,9,10,12,.42,.56);folded(gun,13,14,16,.44,.60);folded(gun,17,18,20,.46,.64);
  assert.equal(classify(gun),'gun-right');
  gun[5]={x:.62,y:.5};gun[6]={x:.46,y:.5};gun[8]={x:.18,y:.5};gun[2]={x:.58,y:.55};gun[3]={x:.58,y:.45};gun[4]={x:.58,y:.32};
  assert.equal(classify(gun),'gun-left');
  const thumb=blank();thumb[0]={x:.45,y:.78};thumb[2]={x:.42,y:.62};thumb[3]={x:.42,y:.48};thumb[4]={x:.42,y:.30};folded(thumb,5,6,8,.52,.58);folded(thumb,9,10,12,.53,.60);folded(thumb,13,14,16,.54,.62);folded(thumb,17,18,20,.55,.64);
  assert.equal(classify(thumb),'thumb');
});
