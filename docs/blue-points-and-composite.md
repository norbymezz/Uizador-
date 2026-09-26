# LIVE: puntos azules y contenedor dividido

## Puntos azules: prueba experimental

Abrir [LIVE · puntos azules](../web/blue-point/). Permitir la cámara trasera, apoyar el teléfono inmóvil, retirar la mano y pulsar **Fijar fondo sin mano**. Cada punto compara una pequeña región del fotograma con la referencia RGB. Azul significa sin cambio suficiente; ámbar, cambio. Se muestra el número de zonas cambiadas y un registro local. El umbral ajusta sensibilidad. La secuencia actual es: pulgar solamente → ninguna zona (pausa visual) → índice solamente → ninguna zona → las cinco zonas → evento local `uizador-gesture` con comando `confirm`. El evento no envía MIDI ni graba video.

Esto detecta cambios de imagen, no identifica dedos anatómicamente. Movimiento de cámara, iluminación, sombras o un objeto distinto pueden activar puntos. El micrófono no participa: “pausa” significa imagen estable sin puntos cubiertos. Se requiere ensayo físico para fijar posiciones, umbral y temporización. No se guarda video ni se transmite imagen.

## Multipantalla durante la edición

En `web/sync-preview/`, **Play together** muestra los videos A y B simultáneamente dentro de un solo cuadro, cada uno en la mitad del ancho. El botón **Mostrar A/B por separado** permite volver a los reproductores individuales. Si se elige un tercer archivo de la biblioteca en **Third video in preview**, el cuadro se divide en tres paneles contiguos; el campo Offset C ajusta el momento de C respecto de A. Al quitar C, vuelven dos paneles. El audio sigue viniendo de la selección A/B o de la música de fondo. Los cuadros se actualizan a la tasa reducida de previsualización existente; el audio sigue continuo.

El tercer archivo es por ahora **sólo una fuente candidata para inspección**: no se agrega a la lista de cortes ni al video exportado. Se requiere un perfil de sincronización y cortes A/B/C antes de permitirlo como cámara editable. Esta limitación se muestra en la pantalla, para que nadie crea haber exportado C.

La antigua demostración de permutaciones permanece en `web/encoder-preview/` y `core/permutation.js`. Reordena columnas y las reconstruye mediante una clave inversa. No se aplica al montaje multipantalla. El SHA-256 del proyecto identifica archivos y tampoco altera el orden visual.

## Mano real y tres flautas

Abrir [LIVE · mano y tres flautas](../web/hand-live/). **Iniciar cámara y flautas** solicita cámara trasera y carga el detector de 21 puntos. Muestra el esqueleto y registra aparición/desaparición de manos. Inicia tres notas C4, E4 y G4 en canales MIDI 1, 2 y 3, con sonido local sintetizado. La altura de la palma controla el volumen de las tres mediante CC7; el botón de modo alterna entre tres notas simultáneas y una por vez. **Detener** envía Note Off y apaga el audio. Si el navegador ofrece una salida MIDI, puede elegirse en el selector; si no, los mensajes quedan registrados y se oye la síntesis local. La cámara se procesa en el dispositivo.

El detector usa MediaPipe Hand Landmarker con un modelo externo que se descarga al iniciar. Se requiere Internet la primera vez, HTTPS y permiso de cámara. Es una prueba real de landmarks y de orden de eventos; todavía no define la gramática de pulgar, índice, pausas y confirmación. Las tres ondas senoidales son un sonido provisional para escuchar las notas, no instrumentos de flauta muestreados. Probar latencia, orientación de cámara, estabilidad y salida MIDI física en los dispositivos antes de usarlo en directo.
