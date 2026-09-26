# LIVE: puntos azules y contenedor dividido

## Puntos azules: prueba experimental

Abrir [LIVE · puntos azules](../web/blue-point/). Permitir la cámara trasera, apoyar el teléfono inmóvil, retirar la mano y pulsar **Fijar fondo sin mano**. Cada punto compara una pequeña región del fotograma con la referencia RGB. Azul significa sin cambio suficiente; ámbar, cambio. Se muestra el número de zonas cambiadas y un registro local. El umbral ajusta sensibilidad. La secuencia actual es: pulgar solamente → ninguna zona (pausa visual) → índice solamente → ninguna zona → las cinco zonas → evento local `uizador-gesture` con comando `confirm`. El evento no envía MIDI ni graba video.

Esto detecta cambios de imagen, no identifica dedos anatómicamente. Movimiento de cámara, iluminación, sombras o un objeto distinto pueden activar puntos. El micrófono no participa: “pausa” significa imagen estable sin puntos cubiertos. Se requiere ensayo físico para fijar posiciones, umbral y temporización. No se guarda video ni se transmite imagen.

## Contenedor dividido

Abrir [LIVE · contenedor dividido](../web/combined-permutation/). Elegir exactamente dos o tres videos. La vista inicial concatena sus cuadros sin separación y aplica cuatro columnas con la permutación `2,0,3,1`. **Ver reconstruido** aplica la permutación inversa. **Play together** usa el primer video como reloj y vuelve a colocar los otros si se desvían más de 150 ms. Se puede ingresar otra clave válida o generar una nueva.

Reutiliza `core/permutation.js` y `core/slice-renderer.js` de la demo anterior `web/encoder-preview/`. El algoritmo existente reordena **columnas verticales**, no franjas horizontales. La clave es una permutación recuperable, no un hash ni cifrado. SHA-256 en el proyecto identifica medios, pero no reordena columnas.

El editor `web/sync-preview/` ahora muestra por defecto el contenedor A+B de cuatro columnas con clave `2,0,3,1` al cargar dos fuentes y al pulsar **Play together**. El botón **Mostrar A/B originales** devuelve la comparación normal. Esta vista no altera la exportación ni los originales. El editor sigue trabajando con el par A/B; para tres archivos, la prueba se hace en la página de contenedor. Falta persistir la clave y la cantidad de fuentes en `.uizador`, integrar tres fuentes al editor y ensayar el resultado en teléfonos reales.
