# LIVE: puntos azules y contenedor dividido

## Puntos azules: prueba experimental

Abrir [LIVE · puntos azules](../web/blue-point/). Permitir la cámara trasera, apoyar el teléfono inmóvil, retirar la mano y pulsar **Fijar fondo sin mano**. Cada punto compara una pequeña región del fotograma con la referencia RGB. Azul significa sin cambio suficiente; ámbar, cambio. Se muestra el número de zonas cambiadas y un registro local. El umbral ajusta sensibilidad. La secuencia actual es: pulgar solamente → ninguna zona (pausa visual) → índice solamente → ninguna zona → las cinco zonas → evento local `uizador-gesture` con comando `confirm`. El evento no envía MIDI ni graba video.

Esto detecta cambios de imagen, no identifica dedos anatómicamente. Movimiento de cámara, iluminación, sombras o un objeto distinto pueden activar puntos. El micrófono no participa: “pausa” significa imagen estable sin puntos cubiertos. Se requiere ensayo físico para fijar posiciones, umbral y temporización. No se guarda video ni se transmite imagen.

## Multipantalla durante la edición

En `web/sync-preview/`, **Play together** muestra los videos A y B simultáneamente dentro de un solo cuadro, cada uno en la mitad del ancho. El botón **Mostrar A/B por separado** permite volver a los reproductores individuales. Si se elige un tercer archivo de la biblioteca en **Third video in preview**, el cuadro se divide en tres paneles contiguos; el campo Offset C ajusta el momento de C respecto de A. Al quitar C, vuelven dos paneles. El audio sigue viniendo de la selección A/B o de la música de fondo. Los cuadros se actualizan a la tasa reducida de previsualización existente; el audio sigue continuo.

El tercer archivo es por ahora **sólo una fuente candidata para inspección**: no se agrega a la lista de cortes ni al video exportado. Se requiere un perfil de sincronización y cortes A/B/C antes de permitirlo como cámara editable. Esta limitación se muestra en la pantalla, para que nadie crea haber exportado C.

La antigua demostración de permutaciones permanece en `web/encoder-preview/` y `core/permutation.js`. Reordena columnas y las reconstruye mediante una clave inversa. No se aplica al montaje multipantalla. El SHA-256 del proyecto identifica archivos y tampoco altera el orden visual.

## Mano, máscara radial y sonido

Abrir [LIVE · mano, sonido y máscara](../web/hand-live/). La prueba separa cuatro módulos:

1. **Captura.** La cámara trasera puede iniciarse y detenerse sin modificar el sonido. El usuario solicita entre 10 y 60 FPS. La pantalla muestra el valor informado por la cámara, los cuadros de video medidos y los cuadros realmente procesados por el detector.
2. **Detección.** MediaPipe Hand Landmarker devuelve 21 coordenadas por mano, hasta dos manos. La confianza mínima modifica los umbrales de detección, presencia y seguimiento. La estabilidad temporal interpola posiciones consecutivas para reducir temblor gráfico.
3. **Representación.** Puntos y esqueleto muestran las coordenadas directas. Anillos de máscara convierten cada punto en centro, zona de validación y halo. Cuerpo gráfico `1/d` dibuja bandas alrededor de puntos y segmentos cuya influencia disminuye con la distancia; el radio y el exponente `p` son regulables.
4. **Sonido.** Puede comenzar sin cámara. Se elige instrumento sintetizado, frecuencia base, relación entre tres tonos, tempo, beat, notas juntas o alternadas y volumen manual o gobernado por la altura de la mano. La salida MIDI continúa siendo opcional.

La máscara radial se construye después de la detección. Sirve para inspeccionar las coordenadas, definir tolerancias y dar un contorno gráfico al esqueleto; sus colores no vuelven a entrar en MediaPipe y por sí solos no aumentan la precisión del modelo. Los controles que sí afectan el comportamiento son la confianza mínima, el FPS de captura y la estabilidad temporal. Una futura etapa puede usar las zonas radiales como criterio de asociación o validación, pero debe medirse antes de atribuirle una mejora.

El sonido local sigue siendo síntesis Web Audio, no una biblioteca de muestras. La opción **Flauta sintética** usa una onda senoidal con vibrato; seno, órgano y cuerda cambian la forma de onda y el filtrado. El tempo gobierna el cambio de voz en modo alternado y el beat audible cuando está encendido. La frecuencia base se convierte a la nota MIDI más cercana para los tres canales.

El detector usa un modelo externo que se descarga al iniciar. Se requiere Internet la primera vez, HTTPS y permiso de cámara. Todo el procesamiento de video ocurre en el dispositivo. Antes de uso en directo se deben medir latencia, FPS sostenido, estabilidad, temperatura y salida MIDI física en los teléfonos elegidos.
