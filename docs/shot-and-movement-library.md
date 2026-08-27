# Biblioteca de planos, marcas y movimientos

## Propósito

Estas plantillas enseñan unidades reutilizables. Después el usuario puede combinarlas para crear una escena propia. No reproducen una obra o dirección particular: describen técnicas audiovisuales generales.

## Reglas básicas de continuidad

### Línea de 180 grados

En una conversación, se imagina una línea entre las dos personas. Las cámaras de plano y contraplano permanecen inicialmente del mismo lado. Así:

- A mira visualmente hacia B;
- B mira visualmente hacia A;
- el espacio no parece invertirse al cortar.

Cruzar la línea es posible, pero debe mostrarse el movimiento o incluirse un plano neutral que reoriente al espectador.

### Aire de mirada

Una persona ubicada a la izquierda y mirando hacia la derecha necesita espacio libre delante de su mirada. El contraplano aplica la relación opuesta.

### Dirección de marcha

Si alguien sale hacia la derecha, el plano siguiente debe conservar esa dirección salvo que la escena muestre un giro. El preset guarda `screen_direction` para avisar inconsistencias.

### Tamaño y altura

En cortes de conversación conviene conservar:

- altura aproximada de ojos;
- distancia focal compatible;
- tamaños de cabeza relacionados;
- iluminación y balance de blancos;
- volumen de diálogo.

## Plantillas

### Enfrentados: plano y contraplano

Roles:

- cámara A: sobre hombro o primer plano de A;
- cámara B: sobre hombro o primer plano de B;
- cámara G opcional: plano general de seguridad.

Indicaciones:

1. marcar posición de ambos actores;
2. dibujar línea de acción;
3. ubicar A y B del mismo lado;
4. comprobar miradas opuestas;
5. grabar diálogo completo en ambas cámaras o repetirlo con la misma timeline;
6. cortar preferentemente sobre palabra, gesto o reacción.

### Marca A → B

Objetivo: que una persona recorra un trayecto repetible.

El preset define:

- marca física A;
- marca física B;
- instante de salida;
- duración del recorrido;
- velocidad orientativa;
- instante de llegada;
- encuadre inicial y final.

Indicaciones en pantalla:

- “Salí de A”;
- flecha y progreso;
- “Reducí velocidad”;
- “Llegá a B”;
- “Sostené la posición”.

### Seguimiento por espalda

La cámara sigue al protagonista desde atrás.

Controles:

- centro de espalda dentro de la guía;
- altura constante;
- distancia aproximada;
- horizonte;
- recorrido libre;
- final desacelerado.

Para seguridad, quien opera no debe caminar hacia atrás en este preset.

### Caminata frontal

La cámara mira al protagonista mientras retrocede.

Requiere:

- recorrido previamente despejado;
- velocidad baja;
- idealmente una segunda persona que guíe al operador;
- estabilización;
- marca clara de final.

En una versión con trípode o teléfono fijo, el actor puede acercarse mientras la aplicación simula la guía de cámara.

### Seguimiento lateral

Actor y cámara avanzan en paralelo. Se conserva:

- dirección de pantalla;
- tamaño del sujeto;
- separación lateral;
- espacio delante de la marcha;
- velocidad común.

### Dos caminando y hablando

Combina diálogo y recorrido. Puede hacerse:

- de frente;
- lateral;
- desde atrás;
- con cámara fija y entrada/salida de cuadro.

El teleprompter usa acciones cortas o audio por auricular para que los actores no necesiten mirar el teléfono.

### Órbita

La cámara recorre un arco alrededor del protagonista.

El preset define:

- centro;
- radio aproximado;
- ángulo inicial y final;
- duración;
- sentido;
- obstáculos;
- tolerancia de distancia.

### Montaje breve

Una secuencia de montaje comprime una actividad mediante planos con funciones diferentes:

1. general para establecer lugar;
2. medio para mostrar acción;
3. detalle de manos, objeto o paso;
4. reacción;
5. transición o resultado opcional.

Los planos pueden grabarse simultáneamente o en pasadas sucesivas. La edición los ordena sobre una pista musical, narración o ritmo propio.

Ejemplo original:

- general: una persona prepara una mesa;
- medio: acomoda elementos;
- detalle: coloca el último objeto;
- reacción: mira el resultado;
- cierre: entran los demás participantes.

### Mundo dibujado

Se graba a las personas limpias y el escenario se compone después.

Preparación:

- separación clara entre sujeto y fondo;
- iluminación pareja;
- evitar ropa del mismo color que el fondo;
- marcas para objetos imaginarios;
- dirección de mirada anotada;
- suelo y horizonte virtual definidos;
- conservar siempre el video original.

Puede usar segmentación automática o croma. El preset guarda el fondo elegido y las marcas, no lo quema durante la captura.

## Modelo reutilizable

```json
{
  "movement_id": "walk-front-01",
  "actor_path": {
    "start_mark": "A",
    "end_mark": "B",
    "start_us": 0,
    "end_us": 8000000
  },
  "camera": {
    "relation": "front",
    "movement": "backward",
    "screen_direction": "toward_camera",
    "framing_start": "medium",
    "framing_end": "medium_close"
  },
  "cues": [
    {"at_us": 0, "text": "Empezá a retroceder"},
    {"at_us": 6500000, "text": "Reducí velocidad"},
    {"at_us": 8000000, "text": "Frená y sostené"}
  ]
}
```

Estas unidades pueden guardarse dentro del archivo `.uizador` y combinarse en una timeline sin modificar las grabaciones originales.
