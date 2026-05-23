# Uizador

Uizador es un prototipo para codificar visualmente un video dividiendo cada frame en franjas verticales y reordenandolas mediante una permutacion. La misma clave permite reconstruir la vista correcta aplicando la permutacion inversa durante la reproduccion.

## Idea central

```text
Original -> P -> Codificado
Codificado -> P^-1 -> Reinterpretado
```

El proyecto separa tres piezas:

- `core/`: logica reutilizable de permutacion y render por franjas.
- `web/encoder-preview/`: demo web para probar original, codificado y reinterpretado.
- `extension/`: futura extension minima para YouTube u otro reproductor web.

## MVP actual

El primer MVP valida el concepto en navegador con Canvas 2D. Todavia no descarga videos ni exporta archivos finales. El objetivo inmediato es comprobar que la misma logica sirve para la app de preview y para una extension liviana.

## Estructura prevista

```text
core/
  permutation.js
  slice-renderer.js
  metadata.js

web/
  encoder-preview/
    index.html
    src/main.js

docs/
  concepto.md
  mvp.md

extension/
  README.md
```
