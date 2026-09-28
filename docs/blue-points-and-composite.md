# LIVE: puntos azules y contenedor dividido

## Puntos azules: prueba experimental

Abrir [LIVE · puntos azules](../web/blue-point/). Permitir la cámara trasera, apoyar el teléfono inmóvil, retirar la mano y pulsar **Fijar fondo sin mano**. Cada punto compara una pequeña región del fotograma con la referencia RGB. Azul significa sin cambio suficiente; ámbar, cambio. Se muestra el número de zonas cambiadas y un registro local. El umbral ajusta sensibilidad. La secuencia actual es: pulgar solamente → ninguna zona (pausa visual) → índice solamente → ninguna zona → las cinco zonas → evento local `uizador-gesture` con comando `confirm`. El evento no envía MIDI ni graba video.

Esto detecta cambios de imagen, no identifica dedos anatómicamente. Movimiento de cámara, iluminación, sombras o un objeto distinto pueden activar puntos. El micrófono no participa: “pausa” significa imagen estable sin puntos cubiertos. Se requiere ensayo físico para fijar posiciones, umbral y temporización. No se guarda video ni se transmite imagen.

## Multipantalla durante la edición

En `web/sync-preview/`, **Play together** muestra los videos A y B simultáneamente dentro de un solo cuadro, cada uno en la mitad del ancho. El botón **Mostrar A/B por separado** permite volver a los reproductores individuales. Si se elige un tercer archivo de la biblioteca en **Third video in preview**, el cuadro se divide en tres paneles contiguos; el campo Offset C ajusta el momento de C respecto de A. Al quitar C, vuelven dos paneles. El audio sigue viniendo de la selección A/B o de la música de fondo. Los cuadros se actualizan a la tasa reducida de previsualización existente; el audio sigue continuo.

El tercer archivo es por ahora **sólo una fuente candidata para inspección**: no se agrega a la lista de cortes ni al video exportado. Se requiere un perfil de sincronización y cortes A/B/C antes de permitirlo como cámara editable. Esta limitación se muestra en la pantalla, para que nadie crea haber exportado C.

La antigua demostración de permutaciones permanece en `web/encoder-preview/` y `core/permutation.js`. Reordena columnas y las reconstruye mediante una clave inversa. No se aplica al montaje multipantalla. El SHA-256 del proyecto identifica archivos y tampoco altera el orden visual.

## Mano, máscara radial y sonido

Abrir [LIVE · mano, sonido y máscara](../web/hand-live/). La prueba separa cinco módulos:

1. **Captura.** Después del primer permiso se enumeran las cámaras disponibles y el usuario puede cambiar entre ellas. La captura se inicia y se detiene sin modificar el sonido. El usuario solicita entre 10 y 60 FPS. La pantalla muestra el valor informado por la cámara, los cuadros medidos y los cuadros realmente procesados por el detector.
2. **Detección y realimentación.** MediaPipe Hand Landmarker devuelve 21 coordenadas por mano, hasta dos manos. Si la realimentación está activa, las coordenadas anteriores generan una región suave que oscurece el exterior del siguiente fotograma antes de enviarlo al detector. La fuerza y el margen son regulables. Cada 12 cuadros se procesa una imagen completa para recuperar una mano que abandone la región.
3. **Representación.** Puntos y esqueleto muestran las coordenadas directas. Anillos de máscara convierten cada punto en centro, zona de validación y halo. Cuerpo gráfico `1/d` dibuja bandas alrededor de puntos y segmentos cuya influencia disminuye con la distancia. El radio, el exponente `p`, la confianza mínima y la estabilidad temporal son regulables.
4. **Superficie sonora.** Al ocultar la cámara, o si la cámara termina, el fondo negro muestra un teclado cromático C4–B4 de doce notas. La punta del índice ilumina y ejecuta la tecla que atraviesa. Puede mantenerse siempre visible o apagarse. Requiere haber iniciado el sonido para oír las notas.
5. **Sonido y comandos.** Se elige instrumento sintetizado, frecuencia base, relación entre tres tonos, tempo, beat, notas juntas o alternadas y volumen manual o gobernado por la altura de la mano. La salida MIDI continúa siendo opcional.

Los colores visibles se construyen después de la detección y no entran en MediaPipe. La realimentación usa la geometría de la mano anterior, no esos colores. Es experimental: puede estabilizar una mano ya localizada, pero también puede perjudicar la recuperación; por eso se conserva el retorno periódico a imagen completa y debe compararse encendida y apagada.

La regla de confirmación anterior queda reconstruida con anatomía: **pulgar → pausa visual → índice → pausa visual → mano abierta**. Cada estado debe mantenerse 500 ms. Emite `uizador-gesture` con `{command:"confirm", points:5}` y se reinicia si un paso tarda más de 4,5 s o aparece un gesto incorrecto. Como alternativa se puede elegir pulgar arriba sostenido durante 1,5 s.

Cuando el índice queda extendido horizontalmente, el pulgar está abierto y los otros dedos están plegados, la representación se transforma en una pistola esquemática. La orientación produce `aim-left` o `aim-right`. Es un cambio del dibujo y un comando local; no altera el video original.

El sonido local sigue siendo síntesis Web Audio, no una biblioteca de muestras. La opción **Flauta sintética** usa una onda senoidal con vibrato; seno, órgano y cuerda cambian la forma de onda y el filtrado. El tempo gobierna el cambio de voz en modo alternado y el beat audible cuando está encendido. La frecuencia base se convierte a la nota MIDI más cercana para los tres canales.

El detector usa un modelo externo que se descarga al iniciar. Se requiere Internet la primera vez, HTTPS y permiso de cámara. Todo el procesamiento de video ocurre en el dispositivo. Antes de uso en directo se deben medir latencia, FPS sostenido, estabilidad, temperatura y salida MIDI física en los teléfonos elegidos.
