# Uizador Multicámara — concepto y primera prueba

## Propósito

Convertir un conjunto de teléfonos Android cercanos en un sistema coordinado de grabación multicámara.

Un teléfono actúa como **director** y los demás como **cámaras**. Cada cámara graba localmente con su propia calidad. La aplicación organiza los registros como proyecto, escena, toma y cámara; luego sincroniza los materiales para elegir ángulos, definir cortes y exportar un montaje.

La propuesta no depende de descargar ni modificar videos de YouTube. El resultado final podrá guardarse y, en una etapa posterior, compartirse o subirse a YouTube.

## Dos formas de uso

### Multicámara libre

Los teléfonos pueden permanecer quietos y grabar la escena completa desde distintos ángulos. Después se sincronizan las pistas y el usuario decide en qué intervalos utiliza cada cámara.

Ejemplo de montaje:

- 00:00–00:04: cámara A;
- 00:04–00:07: cámara B;
- 00:07–00:11: cámara C.

La selección de cámara se guarda como metadata; los videos originales no se alteran hasta la exportación.

### Escena dirigida por plantilla

Una plantilla describe la coreografía audiovisual de una escena:

- posición y función de cada cámara;
- encuadre inicial y final;
- trayectoria o rotación;
- duración y velocidad aproximada;
- orden de planos y contraplanos;
- instantes previstos de entrada y salida de cada cámara.

Cada participante ve solamente las instrucciones de su cámara. Sobre la imagen pueden mostrarse guías semitransparentes: silueta del protagonista, horizonte, flechas de movimiento, marcas inicial/final, distancia aproximada y cuenta regresiva.

El teléfono director conserva la vista global de la escena y el estado de todas las cámaras.

## Organización del material

```text
Proyecto
└── Escena
    ├── Toma 1
    │   ├── Cámara A
    │   ├── Cámara B
    │   └── Cámara C
    ├── Toma 2
    │   ├── Cámara A
    │   ├── Cámara B
    │   └── Cámara C
    └── Toma 3
        ├── Cámara A
        ├── Cámara B
        └── Cámara C
```

Un segmento queda identificado, como mínimo, por:

```text
(escena, toma, cámara, t0, t1)
```

## Ciclo automático de tomas

El director configura:

- duración de la escena;
- cuenta regresiva inicial;
- pausa entre tomas;
- cantidad de repeticiones;
- duración opcional de preparación.

Todos los teléfonos ejecutan el mismo ciclo:

```text
cuenta regresiva → grabación durante T → fin → pausa → siguiente toma
```

Esto permite realizar varias tomas sin tocar ni reprogramar los teléfonos. Después se puede conservar una toma completa o combinar cámaras de tomas diferentes cuando resulte válido.

## Sincronización

Enviar la orden `REC` a todos los teléfonos no garantiza que comiencen simultáneamente: existen latencias de red, sistema operativo, cámara y codificación.

Por eso se separan dos niveles:

1. **Coordinación:** el director comunica preparación, cuenta regresiva, inicio, fin y número de toma.
2. **Alineación del material:** después se estima y corrige el desfase real entre los archivos.

### Clock sonoro registrado

Durante el período en que todas las cámaras ya están grabando se emiten marcas sonoras identificables. El director emite una marca de referencia y pueden registrarse respuestas de los demás teléfonos. Las marcas quedan grabadas en las pistas de audio.

Cada marca debería codificar el dispositivo emisor mediante frecuencia, patrón o secuencia. Así pueden estimarse:

- instante local de emisión;
- instante de recepción acústica en cada grabación;
- desfase entre dispositivos;
- estabilidad o deriva de los relojes durante una toma.

La señal sonora no necesita iniciar físicamente todas las cámaras al mismo microsegundo: sirve para alinear posteriormente las líneas temporales que ya estaban grabando.

En futuras versiones se puede combinar con timestamps monotónicos, correlación del audio ambiente, flash visual o detección de movimiento común.

## Relación con el Uizador existente

La estructura de puntos, fronteras e intervalos del segmentador temporal puede extenderse a varias cámaras. Cada archivo conserva su timeline local y se añade una transformación hacia un timeline común.

Ejemplo conceptual:

```json
{
  "scene_id": "S01",
  "take_id": "T02",
  "camera_id": "C03",
  "local_start_ns": 0,
  "common_offset_ms": 137.4,
  "drift_ppm": 3.1,
  "segments": []
}
```

Las decisiones de montaje pueden reutilizar intervalos:

```json
{
  "t0_sec": 4.0,
  "t1_sec": 7.0,
  "camera_id": "C02"
}
```

## Primera prueba mínima

La primera prueba no necesita edición, transferencia de video ni guía cinematográfica.

### Objetivo

Comprobar que varios teléfonos pueden pertenecer a una sesión, repetir tomas automáticamente y producir información suficiente para alinear sus grabaciones.

### Alcance

- dos teléfonos Android;
- uno director y uno cámara;
- conexión local;
- creación o ingreso a una sesión mediante código;
- configuración de cuenta regresiva, duración, pausa y tres repeticiones;
- grabación local en ambos teléfonos;
- marca sonora de sincronización dentro de cada toma;
- identificación automática de escena, toma y cámara;
- pantalla final con los archivos y offsets estimados;
- reproducción simultánea de ambas cámaras para verificar la alineación.

### Criterio de éxito inicial

Después de una sesión de tres tomas, ambas grabaciones deben poder reproducirse alineadas de manera repetible. Primero se medirá el error observado; todavía no se fija una tolerancia definitiva.

## Fuera de la primera prueba

- transferencia automática de videos entre teléfonos;
- montaje y exportación final;
- subida a YouTube;
- cientos o miles de teléfonos;
- reconstrucción 3D o bullet time;
- selección automática del mejor ángulo;
- plantillas de escenas;
- guías de encuadre por visión artificial.

Estas funciones pertenecen al producto, pero no son necesarias para validar el mecanismo fundamental.
