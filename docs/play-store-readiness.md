# Preparación para Google Play

Actualizado: 2026-08-27.

## Estrategia inicial recomendada

- Aplicación Android nativa en Kotlin y Jetpack Compose.
- Público inicial: exclusivamente personas mayores de 18 años.
- Sin publicidad en el MVP.
- Sin cuenta obligatoria.
- Grabaciones y proyectos locales por defecto.
- Sesiones P2P efímeras; no almacenar videos en un servidor central.
- Permisos solicitados solamente al entrar en una función que realmente los necesita.

La orientación visual juvenil o femenina es una decisión estética y no una declaración de público infantil. La ficha, las declaraciones de audiencia, la política de privacidad y la comunicación del producto deben indicar coherentemente que la aplicación está destinada a mayores de 18 años.

## Arquitectura prevista

Los prototipos web actuales sirven para validar experiencia, flujo y modelos de datos. La versión publicable debería trasladar las funciones principales a Android:

- CameraX o APIs modernas de cámara para captura;
- MediaRecorder/MediaCodec/Media3 según las necesidades de grabación, reproducción y exportación;
- Jetpack Compose para interfaz;
- WebRTC u otra capa segura para coordinación entre dispositivos;
- almacenamiento mediante APIs de medios y archivos compatibles con scoped storage;
- trabajo prolongado visible y correctamente declarado cuando la grabación o el procesamiento continúen fuera de la pantalla principal.

## Requisitos técnicos de publicación

- Generar Android App Bundle (AAB).
- Configurar Play App Signing y conservar separada la upload key.
- Usar package name definitivo antes de publicar.
- Mantener versionCode y versionName.
- Target API: desde el 31 de agosto de 2026, las aplicaciones nuevas y actualizaciones deben apuntar a Android 16 / API 36 o superior, salvo extensiones aplicables.
- Probar en dispositivos físicos; el emulador no sustituye las pruebas de cámara y micrófono.
- Preparar ícono, feature graphic, capturas, descripción corta y larga.
- Utilizar primero los canales internal testing y closed testing.

Fuentes oficiales:

- https://support.google.com/googleplay/android-developer/answer/11926878
- https://developer.android.com/guide/app-bundle
- https://developer.android.com/studio/publish/app-signing
- https://developer.android.com/studio/publish/upload-bundle

## Cámara, micrófono y archivos

Permisos mínimos previstos:

- CAMERA;
- RECORD_AUDIO;
- acceso a videos seleccionado por el usuario mediante mecanismos modernos;
- notificaciones solamente si una función visible las necesita;
- foreground service correctamente tipado únicamente cuando exista un caso real que lo justifique.

Reglas de producto:

- explicar por qué se solicita cada permiso antes del diálogo del sistema;
- no pedir cámara y micrófono al abrir la aplicación;
- mostrar indicador inequívoco durante la grabación;
- permitir continuar sin funciones opcionales cuando sea posible;
- no recopilar videos, audios, contactos, ubicación ni identificadores para finalidades ajenas;
- evitar SDKs publicitarios o analíticos invasivos durante el MVP.

Fuentes oficiales:

- https://support.google.com/googleplay/android-developer/answer/10144311
- https://support.google.com/googleplay/android-developer/answer/16558241
- https://support.google.com/googleplay/android-developer/answer/11150561
- https://developer.android.com/reference/android/Manifest.permission

## Privacidad y Data Safety

Antes de revisión:

- política de privacidad pública y accesible;
- formulario Data Safety coherente con el comportamiento real;
- inventario de SDKs y datos transmitidos;
- cifrado en tránsito para coordinación P2P y servicios;
- explicación del almacenamiento local;
- controles para borrar proyectos, presets y archivos auxiliares;
- si en el futuro existen cuentas, mecanismo de eliminación de cuenta y datos;
- consentimiento de las personas grabadas como parte de las reglas de uso.

Si se agregan nube, análisis, login, métricas o publicidad, deben actualizarse simultáneamente aplicación, política de privacidad y Data Safety.

## Menores y familias

Cámara y micrófono son datos sensibles en el contexto de menores. Si la aplicación se dirige total o parcialmente a niños, se aplican requisitos adicionales de Families Policy y restricciones sobre SDKs, datos, anuncios y consentimiento.

Para el primer lanzamiento:

- establecer y declarar una audiencia exclusivamente mayor de 18 años;
- evitar nombres, textos promocionales o categorías que presenten el producto como infantil;
- mantener la estética juvenil como una opción visual, no como segmentación por edad;
- no subir ni compartir material sin una acción clara del usuario;
- mantener controles sobre exportaciones y eliminación;
- revisar nuevamente políticas, consentimiento y diseño si alguna vez cambia el público objetivo.

Fuente oficial:

- https://support.google.com/googleplay/android-developer/answer/9893335

## Revisión funcional previa al envío

- QR y deep links probados desde cámara, navegador y aplicación instalada;
- permisos rechazados y posteriormente concedidos;
- pérdida y recuperación de conexión;
- llamada o bloqueo de pantalla durante la grabación;
- batería baja, poco espacio y sobrecalentamiento;
- diferentes cámaras, resoluciones y orientaciones;
- audio guía, clock audible y auriculares;
- archivos parciales después de una interrupción;
- sincronización con diferentes modelos de teléfono;
- accesibilidad, contraste, tamaños de fuente y lectores de pantalla;
- funcionamiento sin cuenta y con conectividad limitada;
- eliminación completa de proyectos.

## Etapas de publicación

1. Prototipos web y validación física.
2. MVP Android local con una cámara.
3. Sesión Android con dos teléfonos.
4. Sincronización y selección multicámara.
5. Prueba interna.
6. Prueba cerrada con participantes reales.
7. Corrección de estabilidad, privacidad y accesibilidad.
8. Ficha de Play Store y revisión.
9. Lanzamiento gradual.
