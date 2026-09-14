const UIZADOR_GUIDE_BASE='https://norbymezz.github.io/Uizador-/web/app-home/index.html';

export const PREBUILT_GUIDES=Object.freeze([
 Object.freeze({
  id:'friends-front-back',
  title:'Plano/contraplano — Friends',
  cardTitle:'Friends · “We were on a break”',
  description:'Caso específico de referencia: alterna a Ross y Rachel y termina con un reencuadre lateral.',
  reference:'Friends · S04E01 · The One with the Jellyfish',
  span:'“For the record…” → “front and back”',
  specialLabel:'CASO ESPECÍFICO · S04E01',
  sourceUrl:'../prebuilt-guides/friends-for-record-front-back.html',
  sourceCodeUrl:'https://github.com/norbymezz/norbertachatelli/blob/main/examples/friends-for-record-front-back.html',
  sourceRevision:'fd59ca3772e11a05ad2456af635c8484735fb045',
  durationSec:13.3,
  beatSec:1.9,
  tags:Object.freeze(['one','multi','dialogue']),
  phones:'1 or more',
  move:'A ⇆ B',
  theme:'cinema',
  script:[
   'ROSS|0|Primera intervención en el plano conjunto.',
   'RACHEL|1.9|Respuesta en plano medio corto.',
   'ROSS|3.8|Contraplano de Ross.',
   'RACHEL|5.7|Primer plano de reacción.',
   'ROSS|7.6|Primer plano de respuesta.',
   'RACHEL|9.5|Nueva reacción de Rachel.',
   'ROSS|11.4|Cierre en plano conjunto con reencuadre lateral.'
  ].join('\n')
 })
]);

export function getPrebuiltGuide(id){return PREBUILT_GUIDES.find(guide=>guide.id===id)||null}

export function prebuiltGuideUrl(guide,options={}){
 const base=typeof location==='undefined'?UIZADOR_GUIDE_BASE:location.href;
 const url=new URL(guide.sourceUrl,base);
 url.searchParams.set('embed',options.embed===false?'0':'1');
 url.searchParams.set('autoplay',options.autoplay?'1':'0');
 if(options.run!==undefined)url.searchParams.set('run',String(options.run));
 return url.href;
}

export function rehearsalUrl(guide){
 const params=new URLSearchParams({preset:guide.id,theme:guide.theme});
 return '../scene-rehearsal/index.html?'+params.toString();
}
