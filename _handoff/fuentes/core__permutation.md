# core/permutation.js

```js
export function parsePermutation(text) {
  return String(text)
    .split(',')
    .map((x) => Number(x.trim()))
    .filter((x) => Number.isInteger(x));
}

export function validatePermutation(p) {
  const n = p.length;
  const seen = new Set(p);
  if (n < 1) return false;
  if (seen.size !== n) return false;
  return p.every((x) => Number.isInteger(x) && x >= 0 && x < n);
}

export function assertPermutation(p) {
  if (!validatePermutation(p)) {
    throw new Error('La permutacion debe contener cada indice una sola vez, desde 0 hasta N-1.');
  }
  return p;
}

export function invertPermutation(p) {
  assertPermutation(p);
  const inv = new Array(p.length);
  for (let i = 0; i < p.length; i += 1) inv[p[i]] = i;
  return inv;
}

export function identityPermutation(n) {
  return Array.from({ length: n }, (_, i) => i);
}

export function seededShuffle(n, seed = 123456789) {
  const p = identityPermutation(n);
  let s = seed >>> 0;
  const random = () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 4294967296;
  };

  for (let i = n - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }

  return p;
}

export function permutationToText(p) {
  return p.join(',');
}
```
