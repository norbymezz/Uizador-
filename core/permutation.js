export function parsePermutation(text) {
  return String(text)
    .split(',')
    .map((x) => Number(x.trim()))
    .filter((x) => Number.isInteger(x));
}

export function validatePermutation(p) {
  const n = p.length;
  const seen = new Set(p);
  if (seen.size !== n) return false;
  return p.every((x) => Number.isInteger(x) && x >= 0 && x < n);
}

export function invertPermutation(p) {
  if (!validatePermutation(p)) throw new Error('invalid permutation');
  const inv = new Array(p.length);
  for (let i = 0; i < p.length; i += 1) inv[p[i]] = i;
  return inv;
}
