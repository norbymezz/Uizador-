# Documentación de Uizador

Este índice separa lo que define el producto actual, lo que sirve para probarlo y lo que está planificado para después.

## Empezar aquí

| Documento | Para qué sirve | Estado |
|---|---|---|
| [Concepto multicámara](multicamera-concept.md) | Fuente principal del flujo director/cámaras, clocks y tomas. | Esencial |
| [Plan maestro de pruebas](test-plan.md) | Criterios, fases, evidencia y aprobación. | Esencial |
| [Prueba con dos teléfonos](two-phone-test-checklist.md) | Guion operativo de la primera sesión física. | Listo para ejecutar |
| [Formato `.uizador`](uizador-project-format.md) | Contrato del proyecto portable y no destructivo. | Implementado v1 |
| [Ayuda de usuario](../web/help/index.html) | Explicaciones breves dentro del prototipo. | En evolución |

## Producto y realización

| Documento | Alcance |
|---|---|
| [Biblioteca de planos y movimientos](shot-and-movement-library.md) | Presets originales de encuadre, recorrido y montaje. |
| [Sesiones remotas](remote-session-concept.md) | Reloj común, grabación local, proxy y transferencia futura. |
| [Localización](localization.md) | Idiomas y reglas para no mezclar textos. |

## Publicación Android

| Documento | Alcance |
|---|---|
| [Preparación para Play Store](play-store-readiness.md) | Requisitos técnicos y proceso general. |
| [Paquete de Play Console](play-console-submission-pack.md) | Lista concreta para la presentación. |
| [Borrador de ficha](store-listing-draft.md) | Textos que deberán reflejar la versión real. |
| [Brief visual de Play Store](play-store-creative-brief.md) | Capturas, mensajes, feature graphic, icono y video. |
| [Data Safety](data-safety-working-draft.md) | Declaración de datos que debe verificarse contra el código final. |
| [Datos para privacidad](privacy-policy-inputs.md) | Decisiones pendientes para la política definitiva. |

## Fuente de verdad

- Los casos e identificadores de prueba se mantienen en `core/test-catalog.js`.
- La ejecución y exportación de resultados se hace en `web/test-center/index.html`.
- El formato portable se valida contra `schemas/uizador-project-v1.schema.json`.
- La primera prueba no exige funciones futuras como croma, fondos o sesión remota.
- La ficha de la tienda nunca debe prometer algo que la compilación publicada todavía no hace.

Cuando dos documentos se contradigan, prevalece el contrato técnico o catálogo versionado correspondiente. La contradicción debe corregirse; no se resuelve durante una prueba improvisando.
