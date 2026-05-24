# Uizador

Uizador es un prototipo para codificar, analizar y reinterpretar material audiovisual. La primera linea del proyecto codifica visualmente un video dividiendo cada frame en franjas verticales y reordenandolas mediante una permutacion. La misma clave permite reconstruir la vista correcta aplicando la permutacion inversa durante la reproduccion.

La segunda linea del proyecto agrega una capa de analisis temporal: en vez de cortar el video como archivo final, el sistema divide un fragmento de audio/video en una cantidad discreta de ventanas temporales para buscar patrones de alternancia acentual, asertiva o conversacional.

## Idea central

```text
Original -> P -> Codificado
Codificado -> P^-1 -> Reinterpretado
```

Para la capa temporal:

```text
Video/Audio -> N ventanas -> medicion de alternancia -> mapa de ida y vuelta
```

El patron esperado no se define como una verdad fija del video, sino como una alternancia pretendida: una hipotesis de orden perceptivo que se contrasta contra variaciones discretas detectables.

## Objetivo del proyecto

El objetivo no es editar videos por edicion lineal tradicional. El objetivo es construir una herramienta que permita:

- cargar un link o archivo de video;
- elegir un fragmento temporal;
- dividir ese fragmento en N ventanas discretas, por defecto 20;
- estimar marcas de alternancia acentual/asertiva dentro de esas ventanas;
- visualizar posibles zonas de ida y vuelta conversacional;
- comparar el orden original con una reinterpretacion visual o temporal.

## Concepto de ventanas temporales

La unidad basica de analisis no es necesariamente el frame ni el silencio aislado. Para el MVP se propone usar ventanas de duracion regular. Si el fragmento tiene duracion `T` y se eligen `N` ventanas, cada ventana dura:

```text
dt = T / N
```

Con `N = 20`, un clip de 5 segundos produce ventanas de 250 ms. Esa escala es suficientemente gruesa para no caer en microanalisis inestable, pero suficientemente corta para ubicar cambios de turno, pausas breves, acentos, interrupciones y zonas de overlap.

## Hipotesis de trabajo

La minima interaccion valorable no se busca como un punto absoluto. Se busca como una region temporal donde aparecen variaciones medibles:

- energia de voz;
- pausas o gaps;
- cambios de intensidad;
- cambios de pitch aproximado;
- presencia de dos hablantes o superposicion;
- alternancia entre segmentos dominantes.

El sistema no tiene que resolver de entrada quien dijo cada cosa. Primero debe marcar donde hay cambios relevantes. La asignacion fina de hablantes puede quedar para una etapa posterior.

## MVP actual

El primer MVP valida el concepto en navegador con Canvas 2D. Todavia no descarga videos ni exporta archivos finales. El objetivo inmediato es comprobar que la misma logica sirve para la app de preview y para una extension liviana.

La nueva capa de analisis temporal debe poder funcionar aunque todavia no exista descarga completa de YouTube. El flujo minimo puede aceptar:

- archivo local de video/audio;
- URL pegada por el usuario como referencia;
- fragmento de prueba generado manualmente;
- metadata de ventanas calculada en JSON.

## Estructura prevista

```text
core/
  permutation.js
  slice-renderer.js
  metadata.js
  temporal-windows.js
  accentual-metrics.js

web/
  encoder-preview/
    index.html
    src/main.js

analysis/
  sample-window-map.json
  README.md

docs/
  concepto.md
  mvp.md
  accentual-window-analysis.md

extension/
  README.md
```

## Entrada esperada

Para empezar basta con que el usuario provea:

```json
{
  "source_url": "https://youtube.com/...",
  "start_time_sec": 0,
  "duration_sec": 5,
  "window_count": 20,
  "analysis_mode": "accentual_alternation"
}
```

## Salida esperada

El sistema debe producir una estructura simple, inspeccionable y versionable:

```json
{
  "duration_sec": 5,
  "window_count": 20,
  "windows": [
    {
      "i": 0,
      "t0": 0.00,
      "t1": 0.25,
      "energy": 0.72,
      "silence_score": 0.05,
      "accent_shift_score": 0.31,
      "overlap_score": 0.12,
      "label": "voice"
    }
  ]
}
```

## Proxima tarea tecnica

Implementar `core/temporal-windows.js` con una funcion pura que reciba duracion y cantidad de ventanas, y devuelva los intervalos `[t0, t1]`. Despues se agregan metricas de energia, silencio y alternancia.