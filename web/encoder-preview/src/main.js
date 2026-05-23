import {
  parsePermutation,
  invertPermutation,
  assertPermutation,
} from '../../../core/permutation.js';

import { drawPermutedFrame } from '../../../core/slice-renderer.js';

const fileInput = document.querySelector('#file');
const permInput = document.querySelector('#perm');
const button = document.querySelector('#render');
const video = document.querySelector('#video');
const encoded = document.querySelector('#encoded');
const decoded = document.querySelector('#decoded');
const status = document.querySelector('#status');

let currentPermutation = parsePermutation(permInput.value);
let inversePermutation = invertPermutation(currentPermutation);
let started = false;

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (!file) return;

  video.src = URL.createObjectURL(file);
  video.play();
  startLoop();
});

button.addEventListener('click', applyPermutation);
permInput.addEventListener('change', applyPermutation);

function applyPermutation() {
  try {
    currentPermutation = parsePermutation(permInput.value);
    assertPermutation(currentPermutation);
    inversePermutation = invertPermutation(currentPermutation);

    status.textContent = `Permutacion valida. N = ${currentPermutation.length}`;
  } catch (error) {
    status.textContent = error.message;
  }
}

function startLoop() {
  if (started) return;
  started = true;
  requestAnimationFrame(loop);
}

function loop() {
  if (video.readyState >= 2) {
    drawPermutedFrame(video, encoded, currentPermutation);
    drawPermutedFrame(encoded, decoded, inversePermutation);
  }

  requestAnimationFrame(loop);
}

applyPermutation();
