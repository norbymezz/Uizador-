# Uizador para Android

Base nativa de la aplicación, separada de los prototipos web que siguen funcionando como referencia de producto.

## Estado actual

- Jetpack Compose y Material 3.
- Pantalla inicial y navegación base.
- Tema oscuro juvenil con buen contraste.
- Permisos mínimos declarados: Internet, cámara y micrófono.
- Cámara y micrófono no se solicitan al abrir la app.
- Configuración inicial para generar APK/AAB de debug y release.
- `compileSdk` y `targetSdk` 36.
- Java 17, Android Gradle Plugin 8.13.0 y Kotlin 2.1.20.
- Aplicación compatible desde Android 8.0 (API 26).

## Abrir el proyecto

1. Abrir la carpeta `android/` en Android Studio.
2. Usar JDK 17.
3. Instalar Android SDK Platform 36 si Android Studio lo solicita.
4. Generar el wrapper una sola vez si no existe:
   `gradle wrapper --gradle-version 8.13`
5. Sincronizar Gradle.
6. Ejecutar la variante `debug` en un teléfono o emulador.

## Identidad de Play Store

El identificador actual es provisional:

`com.uizador.app`

Debe confirmarse antes de crear la primera aplicación en Play Console. Una vez publicado el primer artefacto con un `applicationId`, no puede cambiarse sin crear otra ficha de aplicación.

Versión inicial:

- `versionCode = 1`
- `versionName = 0.1.0`
- público previsto: mayores de 18 años
- formato de publicación: Android App Bundle (AAB)

## Verificación automática

Cada cambio dentro de `android/` dispara el workflow `Android`: ejecuta lint, pruebas unitarias, compila el APK de debug y lo guarda como artefacto `uizador-debug`. La firma de producción no se almacena en el repositorio.

## Próximas integraciones nativas

1. CameraX para grabación local.
2. QR y señalización entre teléfonos.
3. clock sonoro de inicio y clac final.
4. guardado por proyecto, cámara y número de toma.
5. sincronización por audio.
6. editor multicámara y exportación.
7. flujo de consentimiento, privacidad y eliminación de proyectos.
8. firma de release y carga a la pista de pruebas internas de Play Console.

No se deben agregar permisos sensibles por adelantado. Cada permiso nuevo debe corresponder a una función visible y explicable en la declaración de seguridad de datos.
