# Formato de proyecto .uizador

Estado: versión 1 experimental.

## Objetivo

Un archivo `.uizador` conserva la parte editable de un proyecto:

- escenas, tomas y roles de cámara;
- referencias a video y audio;
- offsets y deriva de sincronización;
- guías y presets;
- decisiones de montaje;
- títulos, efectos y transiciones;
- subtítulos;
- información mínima para recuperar o trasladar el proyecto.

No es el video final. Es el equivalente al archivo de proyecto de un editor.

## Contenedor

`.uizador` es un ZIP estándar sin contraseña con MIME:

`application/vnd.uizador.project+zip`

Contenido mínimo:

```text
mimetype
manifest.json
```

Estructura ampliada:

```text
mimetype
manifest.json
captions/
  es.vtt
effects/
  timeline.json
presets/
  scene-01.json
thumbnails/
proxies/
media/
```

La versión web inicial escribe entradas ZIP sin compresión para mantener el lector pequeño y verificable. Android podrá usar `ZipInputStream` y `ZipOutputStream`. Una versión futura puede admitir DEFLATE sin modificar el manifest.

## Dos formas de guardado

### Proyecto liviano

Guarda metadata, subtítulos y referencias identificadas por nombre, tamaño y SHA-256. No copia los videos originales.

Ventajas:

- archivo pequeño;
- guardado rápido;
- ideal para copias frecuentes.

Límite:

- si los videos se mueven o borran, habrá que volver a localizarlos.

### Proyecto portátil

Puede incluir:

- proxies;
- miniaturas;
- audios auxiliares;
- opcionalmente originales.

Antes de exportar originales se debe mostrar el tamaño estimado. Los paquetes grandes necesitan escritura por streaming y espacio temporal controlado.

## manifest.json

Identidad obligatoria:

```json
{
  "schema": "com.uizador.project",
  "format_version": 1,
  "project": {
    "id": "uuid",
    "title": "Entrevista",
    "created_at": "2026-08-27T00:00:00.000Z",
    "updated_at": "2026-08-27T00:00:00.000Z",
    "locale": "es",
    "aspect_ratio": "16:9",
    "duration_us": 30000000
  },
  "scenes": [],
  "media": [],
  "tracks": {}
}
```

El esquema verificable está en `schemas/uizador-project-v1.schema.json`.

## Tiempo y sincronización

Los instantes y duraciones se guardan como enteros en microsegundos:

- `duration_us`;
- `common_offset_us`;
- puntos de entrada y salida;
- posiciones de subtítulos y efectos.

No se usan flotantes en segundos como representación canónica porque acumulan errores en proyectos largos.

Cada medio puede conservar:

- SHA-256;
- duración;
- rol de cámara;
- offset al timeline común;
- deriva en ppm;
- confianza estimada;
- marcas de clock detectadas.

## Subtítulos

Formato interno preferido: WebVTT UTF-8.

Razones:

- tiempos claros;
- soporte de estilos y regiones;
- buena interoperabilidad web;
- conversión sencilla desde y hacia SRT.

Un proyecto puede incluir varios idiomas:

```json
{
  "tracks": {
    "captions": [
      {
        "id": "captions-es",
        "language": "es",
        "format": "webvtt",
        "path": "captions/es.vtt"
      }
    ]
  }
}
```

## Integridad y relocalización

Los originales externos se reconocen por:

1. SHA-256;
2. tamaño;
3. duración;
4. nombre informativo.

Las rutas absolutas del teléfono o computadora no son portátiles y no deben escribirse en el paquete. Al abrir un proyecto incompleto, Uizador solicita localizar la carpeta o archivo y vuelve a verificar el hash.

## Seguridad

El importador debe:

- rechazar rutas absolutas y componentes `..`;
- limitar cantidad y tamaño total antes de extraer;
- verificar CRC y, para medios, SHA-256;
- no ejecutar contenido del paquete;
- no confiar en MIME ni extensión aportados;
- ignorar campos desconocidos de versiones compatibles;
- nunca incluir tokens de sesión, contraseñas, claves o URLs firmadas vigentes.

El ZIP no cifra. Un paquete con originales sensibles debe almacenarse y compartirse con las mismas precauciones que los videos.

## Versionado

- `format_version` cambia cuando una versión no puede interpretarse con las reglas anteriores.
- Los campos nuevos opcionales no obligan a cambiar la versión.
- El lector conserva campos desconocidos al volver a guardar cuando sea posible.
- Las migraciones deben crear una copia y nunca sobrescribir el único original.

## Implementación actual

`core/uizador-package.js` puede:

- crear un ZIP `.uizador`;
- descargarlo desde el navegador;
- abrir paquetes creados por Uizador;
- validar tipo, versión, rutas y CRC;
- devolver manifest y archivos internos.

La primera prueba automática de ida y vuelta crea el paquete, agrega subtítulos, lo vuelve a abrir y verifica el manifest.
