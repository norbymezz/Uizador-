import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';

const source=await readFile(new URL('../core/test-catalog.js',import.meta.url),'utf8');
const api=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('el catálogo es válido y tiene 70 casos',()=>{
  assert.equal(api.validateTestCatalog(),true);
  assert.equal(api.TEST_CASES.length,70);
});

test('todos los ID son únicos y todas las fases tienen casos',()=>{
  assert.equal(new Set(api.TEST_CASES.map(x=>x.id)).size,api.TEST_CASES.length);
  for(const phase of api.PHASES){
    assert.ok(api.TEST_CASES.some(x=>x.phase===phase.id),`fase vacía: ${phase.id}`);
  }
});

test('el camino principal cubre grabación y sincronización bloqueantes',()=>{
  const coreBlockers=api.TEST_CASES.filter(x=>x.core&&x.priority==='blocker');
  assert.ok(coreBlockers.length>=15);
  for(const id of ['LOC-001','LOC-002','LOC-006','LOC-007','LOC-008','SYN-003','SYN-005']){
    assert.ok(coreBlockers.some(x=>x.id===id),`falta ${id}`);
  }
});

test('el validador rechaza duplicados y fases desconocidas',()=>{
  const one=api.TEST_CASES[0];
  assert.throws(()=>api.validateTestCatalog([one,{...one}]),/duplicado/);
  assert.throws(()=>api.validateTestCatalog([{...one,id:'BAD-001',phase:'inexistente'}]),/Fase desconocida/);
});
