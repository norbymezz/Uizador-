export function drawPermutedFrame(source, canvas, permutation) {
  const ctx = canvas.getContext('2d');
  const w = source.videoWidth || source.naturalWidth || source.width;
  const h = source.videoHeight || source.naturalHeight || source.height;
  const n = permutation.length;

  canvas.width = w;
  canvas.height = h;

  const base = Math.floor(w / n);

  for (let target = 0; target < n; target += 1) {
    const sourceIndex = permutation[target];
    const sx = sourceIndex * base;
    const dx = target * base;
    const sw = target === n - 1 ? w - sx : base;
    const dw = target === n - 1 ? w - dx : base;

    ctx.drawImage(source, sx, 0, sw, h, dx, 0, dw, h);
  }
}
