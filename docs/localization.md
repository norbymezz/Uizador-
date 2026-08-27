# Localización e idiomas

## Idiomas iniciales

- Español (`es`) como idioma de origen.
- Inglés (`en`).
- Portugués (`pt`).

La infraestructura se encuentra en `core/i18n.js`. Las preferencias se almacenan localmente bajo `uizador-preferences-v1`.

## Alcance

Se deben localizar por separado:

1. interfaz y ayuda;
2. nombres y descripciones del catálogo de presets;
3. teleprompter y diálogo del proyecto;
4. subtítulos;
5. indicaciones habladas;
6. metadata exportada;
7. ficha de Google Play y política de privacidad.

Cambiar el idioma de interfaz no debe traducir automáticamente el diálogo de una escena. El proyecto puede tener interfaz en español, teleprompter en inglés y subtítulos en portugués.

## Modelo de idioma por proyecto

```json
{
  "ui_language": "es",
  "script_language": "en",
  "subtitle_tracks": [
    {"language": "es", "kind": "translation"},
    {"language": "pt", "kind": "translation"}
  ],
  "audio_tracks": [
    {"language": "en", "kind": "guide"},
    {"language": "es", "kind": "dub"}
  ]
}
```

## Reglas

- Todo texto visible de interfaz debe usar una clave estable.
- Los archivos de presets guardan identificadores, no etiquetas traducidas.
- Los subtítulos conservan código de idioma y pueden exportarse como SRT.
- El diálogo original nunca se sobrescribe al agregar una traducción.
- La dirección de lectura debe poder ampliarse en el futuro para idiomas RTL.
- Fechas, números y duraciones deben formatearse según locale.
- No incrustar texto en imágenes de interfaz.
- Las instrucciones de cámara deben tener versión textual e iconográfica.

## Próximos pasos

- Traducir biblioteca de presets.
- Traducir sesión multicámara.
- Agregar idioma del guion al proyecto.
- Agregar pistas múltiples de subtítulos.
- Agregar grabación de doblaje por idioma.
- Preparar español latino, inglés y portugués para la ficha de Play Store.
