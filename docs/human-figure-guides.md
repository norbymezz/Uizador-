# Guía de figura humana: estado y próximos pasos

Estado: integración estática y primer circuito de guía pregrabada implementados. Última revisión: 2026-09-14.

Este documento conserva las decisiones tomadas durante el desarrollo para que la figura no quede reducida a un detalle visual perdido dentro del código.

## Decisión base

Hay una sola forma humana reutilizable. No se desarrollan motores separados para “Actor”, “Editor” o “Director”: esos nombres describen el contexto en que aparece la misma figura.

En la etapa actual la figura funciona como guía espacial de la escena:

- es deliberadamente simple y sin cara;
- usa la pose existente con los brazos atrás;
- cambia mediante posición, tamaño, recorte y cantidad de instancias;
- no interpreta el cuerpo real ni analiza la cámara;
- no necesita todavía animación facial, gestos nuevos ni reglas anatómicas.

## Implementado

### Estudio de noticias

Archivo: `web/news-studio/index.html`.

El plan de composición contiene dos tramos seleccionables:

1. una persona de cuerpo entero en el estudio;
2. dos personas de la cintura para arriba en pantalla partida.

Ambas vistas reutilizan la misma geometría humana. La exportación del preset añade un `guide_plan` con `studio-full-body` y `split-waist-up`.

### Selector de presets

Archivo: `web/preset-library/index.html`.

Los óvalos punteados de las tarjetas fueron reemplazados por la misma figura humana mínima. La flecha o marca de movimiento propia de cada preset se mantiene. Los filtros y favoritos existentes se conservan.

### Circuito de escena HTML/SVG pregrabada

Archivos: `core/prebuilt-guides.js`, `web/preset-library/index.html` y `web/scene-rehearsal/index.html`.

El primer caso completo es **Friends · S04E01 · “For the record…” → “front and back”**:

1. aparece identificado como caso específico dentro de la biblioteca;
2. su propio HTML/SVG funciona como vista previa de la tarjeta;
3. **Use preset** conserva la selección y abre el ensayo;
4. el mismo HTML/SVG se superpone a la cámara como guía;
5. al ensayar o grabar, Uizador reinicia el clock de la escena;
6. al finalizar, la guía se detiene.

La fuente de la escena permanece en `norbertachatelli`. Uizador incluye una copia de distribución en `web/prebuilt-guides/` para que el preset no dependa de publicar otro sitio; no la vuelve a generar ni la convierte en video. Los próximos casos se agregan con su HTML y una entrada de catálogo que conserva origen, revisión, duración y metadatos.

## No implementado todavía

- cambio automático entre las dos composiciones durante ensayo o grabación;
- persistencia y restauración completa de `guide_plan` dentro del proyecto `.uizador`;
- un componente compartido: actualmente la geometría está repetida en los dos HTML;
- parpadeo, rostro o pulso autónomo;
- reacción del brazo al clic;
- personaje Director durante la grabación;
- extracción de figuras o movimiento desde fotografías o videos;
- modelo de apoyos, partes colgantes y límites articulares.

## Próximo paso concreto

1. Probar en un teléfono la vuelta completa del caso Friends: biblioteca → ensayo → cámara → grabación.
2. Ajustar únicamente transparencia, tamaño o recorte si la guía tapa demasiado la imagen real.
3. Incorporar el caso de *A Few Good Men* como segunda entrada pregrabada del catálogo.
4. Conectar la guía del estudio de noticias a su timeline automática.
5. Guardar y restaurar los planes de guía dentro del proyecto `.uizador`.
6. Extraer la figura genérica a un único componente para evitar divergencias entre pantallas.

## Ideas posteriores conservadas

### Figura como interfaz

La misma forma podrá actuar como interlocutor visual de opciones binarias. No hace falta crear poses nuevas: alcanza con contrastar la pose de brazos atrás con alguna acción de brazo ya existente, o reflejar horizontalmente una sola pose.

Un clock de baja frecuencia podrá producir un parpadeo ocasional, aproximadamente cada tres o cuatro segundos. El clic del usuario podrá ser el acontecimiento que active la respuesta visible. Esto no forma parte de la guía actual.

### Figura como storyboard

Una fotografía, un fotograma o un video propio podrá reducirse inicialmente a una composición estática de una o dos formas humanas. Para cada plano bastará guardar cantidad, posición, tamaño, recorte, orientación y momento del corte. El objetivo inicial no es capturar movimiento.

### Movimiento sobre la timeline

Después podrá agregarse un desplazamiento simple de la figura entre dos posiciones. Ese movimiento seguirá siendo una indicación pregrabada, no reconocimiento de la persona.

### Modelo articulado posterior

Para animación futura, las partes del cuerpo podrán organizarse como una cadena de elementos apoyados o colgantes, con un apoyo principal, contactos secundarios y ángulos articulares acotados. Esa idea pertenece al desarrollo futuro del carácter y no debe mezclarse con la guía estática actual.

## Registro de cambios

- 2026-09-11 — [PR #2](https://github.com/norbymezz/Uizador-/pull/2): figura humana aplicada al estudio de noticias; plano de cuerpo entero y pantalla partida de cintura para arriba.
- 2026-09-11 — [PR #3](https://github.com/norbymezz/Uizador-/pull/3): figuras humanas aplicadas a las tarjetas del selector de presets.
- 2026-09-14 — Primer circuito completo para una escena Chatelli pregrabada: selección, aplicación, ensayo y guía durante la grabación.

Cada agregado posterior a esta línea de trabajo debe anotarse aquí bajo una de tres categorías: **implementado**, **próximo paso** o **idea posterior**.

