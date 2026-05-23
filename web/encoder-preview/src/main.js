import { parsePermutation, invertPermutation } from '../../../core/permutation.js';
import { drawPermutedFrame } from '../../../core/slice-renderer.js';

const fileInput = document.querySelector('#file');
const permInput = document.querySelector('#perm');
const button = document.querySelector('#render');
const video = document.querySelector('#video');
const encoded = document.querySelector('#encoded');
const decoded = document.querySelector('#decoded');

fileInput.addEventListener('change', () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  video.src = URL.createObjectURL(file);
});

button.addEventListener('click', () => {
  const p = parsePermutation(permInput.value);
  const inv = invertPermutation(p);

  drawPermutedFrame(video, encoded, p);
  drawPermutedFrame(encoded, decoded, inv);
});
