# Uizador

Uizador reúne experimentos de reinterpretación audiovisual y una aplicación de realización guiada. El desarrollo activo de la rama `multicamera-concept` convierte uno o varios teléfonos Android en cámaras coordinadas para ensayar, repetir, sincronizar y editar una escena.

## Aplicación multicámara

El teléfono director crea una sesión y muestra un QR. Los demás teléfonos entran, reciben su rol, encuadre, movimiento, duración y cuenta regresiva. Cada dispositivo graba localmente para conservar la calidad y el material incluye una firma sonora común:

- tres pulsos antes de la acción;
- audio e imagen grabados juntos en cada teléfono;
- clac de cierre;
- tres tomas consecutivas con pausa configurable;
- identificación de proyecto, escena, toma y cámara.

Después de grabar, las pistas se alinean mediante el sonido registrado y se decide qué cámara usar en cada tramo. Los originales no se modifican.

## Estado actual

Ya existen prototipos web para:

- inicio y biblioteca de presets;
- sesión multicámara con ingreso por QR;
- diagnóstico de cámara, micrófono y grabación corta;
- ensayo con guías de encuadre, movimiento y teleprompter;
- sincronización y selección A/B;
- proyectos portables `.uizador`;
- efectos, textos y sonidos planificados como edición posterior;
- ayuda, preferencias e idiomas;
- centro de pruebas con 70 controles versionados.

También existe un esqueleto Android y documentación de preparación para una futura distribución mediante Play Console. Que una función aparezca como concepto o prototipo no significa que esté aprobada para publicación.

## Próxima validación

La prioridad es una prueba física completa con dos teléfonos, no agregar efectos nuevos. Debe producir seis archivos —A1, A2, A3, B1, B2 y B3— y demostrar:

1. ingreso simple por QR;
2. bloqueo hasta que ambos teléfonos estén listos;
3. grabación local completa de tres tomas;
4. presencia del clock y clac en los seis archivos;
5. identidad inequívoca de cada archivo;
6. sincronización reproducible sin separar audio e imagen;
7. recuperación comprensible ante permisos, desconexión o falta de espacio.

El [plan maestro](docs/test-plan.md), la [lista operativa de dos teléfonos](docs/two-phone-test-checklist.md) y el Centro de pruebas definen el criterio de aprobación.

## Documentación

El [índice de documentación](docs/README.md) distingue fuentes de verdad, material operativo y funciones futuras. Los documentos principales son:

- [concepto multicámara](docs/multicamera-concept.md);
- [plan maestro de pruebas](docs/test-plan.md);
- [formato de proyecto `.uizador`](docs/uizador-project-format.md);
- [biblioteca de planos y movimientos](docs/shot-and-movement-library.md);
- [concepto de sesión remota](docs/remote-session-concept.md);
- [preparación para Play Store](docs/play-store-readiness.md).

## Privacidad y archivos

La regla de diseño es local primero: las grabaciones permanecen en cada teléfono hasta que la persona decide compartirlas o exportarlas. Un proyecto `.uizador` guarda decisiones de montaje y referencias de medios; no debe incluir contactos, ubicación, dirección IP ni rutas privadas innecesarias.

## Línea experimental original

El repositorio comenzó como un prototipo para codificar y reinterpretar video mediante permutaciones de franjas verticales y análisis por ventanas temporales. Esa línea continúa siendo parte del proyecto, pero es independiente del mecanismo multicámara:

```text
Original -> permutación -> codificado
Codificado -> inversa -> reinterpretado

Audio/video -> ventanas temporales -> métricas -> mapa de alternancia
```

Separar ambas líneas permite conservar la investigación original sin confundirla con los criterios de calidad de la aplicación de grabación.
