# Plan maestro de pruebas

Este documento define cómo probar Uizador sin mezclar una demostración prometedora con una función realmente confiable. El catálogo ejecutable vive en `core/test-catalog.js` y el seguimiento se realiza desde `web/test-center/index.html`.

## Regla principal

La primera sesión física valida solamente el mecanismo esencial:

1. dos teléfonos pueden preparar una misma sesión;
2. el segundo entra por QR;
3. ambos graban tres tomas sin intervención entre ellas;
4. las seis grabaciones contienen clock inicial y clac final;
5. los archivos se identifican sin ambigüedad;
6. audio e imagen permanecen unidos;
7. las parejas A/B pueden alinearse y reproducirse sincronizadas.

Croma, fondos, filtros, sesión remota, títulos, subtítulos, transiciones y publicación son fases posteriores. Permanecen documentados, pero un fallo suyo no debe distraer de un fallo de grabación o sincronización.

## Resultados permitidos

| Estado | Significado |
|---|---|
| Sin probar | Todavía no se ejecutó con esta versión y estos dispositivos. |
| Pasa | Se obtuvo exactamente el resultado esperado y quedó evidencia. |
| Falla | Se pudo ejecutar, pero el resultado fue incorrecto o incompleto. |
| Bloqueada | No pudo ejecutarse por una dependencia, permiso, dispositivo o función ausente. |

Una prueba no pasa por “parecer que anda”. En clock y sincronía deben conservarse los archivos y anotar el desplazamiento observado.

## Prioridades

- **Bloqueante:** impide confiar en la grabación, recuperar el material, sincronizar o publicar de forma segura.
- **Alta:** afecta una tarea importante o crea confusión considerable.
- **Media:** conviene corregirla, pero permite continuar la evaluación principal.

## Orden de ejecución

1. Preparación individual de cada teléfono.
2. Sesión local y tres tomas con dos teléfonos.
3. Recuperación ante permisos, bloqueo, falta de espacio y desconexión.
4. Sincronización y ajuste manual.
5. Proyecto `.uizador` y postproducción no destructiva.
6. Comprensión, idiomas y accesibilidad.
7. Sesión remota cuando exista una implementación real.
8. Android release y Play Console antes de distribuir.

## Entrada para la primera prueba física

- dos teléfonos Android cargados y con al menos 1 GB libre;
- acceso HTTPS a la versión que se está evaluando;
- cámara y micrófono verificados individualmente;
- volumen audible y sin auriculares;
- espacio donde ambos capten el clock del director;
- versión o commit anotado en el Centro de pruebas.

## Salida mínima aceptable

La primera prueba se considera exitosa sólo si:

- pasan todos los controles principales bloqueantes ejecutables de preparación y sesión local;
- se obtienen **seis archivos**: A1, A2, A3, B1, B2 y B3;
- ninguno queda vacío, truncado o sin audio;
- los tres pulsos iniciales y el clac final son reconocibles en los seis;
- proyecto, escena, toma y cámara se pueden reconstruir desde el nombre o metadatos;
- se calcula un offset A/B para cada toma y se conserva su valor;
- una acción visible y audible común queda alineada dentro del error medido;
- no existe pérdida inexplicada de material.

Si falla un bloqueante, se detiene la ampliación de funciones y se abre un defecto reproducible.

## Matriz de dispositivos

En cada ejecución se anota:

| Dato | Teléfono A | Teléfono B |
|---|---|---|
| Marca y modelo | | |
| Android | | |
| Navegador / app | | |
| Resolución elegida | | |
| MIME / codec | | |
| Batería inicial/final | | |
| Espacio inicial | | |
| Orientación | | |

Las combinaciones posteriores deben incluir, como mínimo, un equipo modesto, uno reciente y una pareja con versiones Android diferentes.

## Evidencia de una ejecución

Conservar juntos:

- JSON de diagnóstico de cada teléfono;
- JSON exportado por el Centro de pruebas;
- seis videos originales sin modificar;
- captura o grabación del estado del director;
- valores de offset y deriva;
- versión o commit probado;
- defectos encontrados.

Nombre recomendado de carpeta: `AAAA-MM-DD_modeloA_modeloB_build`.

## Cómo registrar un defecto

Cada fallo debe incluir:

1. ID del caso, por ejemplo `LOC-006`;
2. versión, teléfonos y red;
3. pasos exactos para repetirlo;
4. resultado esperado;
5. resultado real;
6. frecuencia: siempre, intermitente o una vez;
7. evidencia y nombre de los archivos afectados;
8. si hubo riesgo de perder una grabación.

Después de corregirlo se repite el caso fallido y los bloqueantes de su misma fase. No se cambia un “Falla” por “Pasa” sin ejecutar nuevamente.

## Alcance del catálogo

El catálogo actual contiene 70 controles en ocho fases. El interruptor **Mostrar primero la prueba principal** reduce la lista al camino crítico. Los controles futuros permanecen visibles para planificación, pero se marcan como bloqueados —no como fallidos— cuando aún no existe la función.
