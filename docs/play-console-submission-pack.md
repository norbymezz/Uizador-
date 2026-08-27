# Paquete operativo para publicar Uizador en Google Play

Actualizado: 2026-08-27.

Este documento organiza el trabajo de Play Console. Las políticas cambian; deben verificarse nuevamente antes de cada envío.

## 1. Decisiones que hay que cerrar antes de crear la aplicación

- [ ] Tipo de cuenta: personal u organización.
- [ ] Nombre público del desarrollador.
- [ ] Nombre legal y perfil de pagos coherentes con el tipo de cuenta.
- [ ] Correo de contacto público y correo de soporte.
- [ ] Teléfono y dirección que Play Console solicite según el tipo de cuenta.
- [ ] Sitio web público.
- [ ] Identificador definitivo: actualmente `com.uizador.app`.
- [ ] Países del primer lanzamiento.
- [x] Público de producto previsto: exclusivamente mayores de 18 años.
- [x] Sin anuncios en el MVP.
- [x] Sin cuenta obligatoria en el MVP.
- [x] Archivos locales por defecto.
- [ ] Proveedor, región y plazo de retención si se habilitan sesiones remotas.
- [ ] Nombre y contacto que aparecerán en la política de privacidad.

El `applicationId` debe confirmarse antes del primer artefacto publicado. Cambiarlo después implica otra aplicación.

## 2. Cuenta y verificación

### Cuenta personal

Preparar:

- documento oficial vigente;
- datos personales exactamente coincidentes con el perfil de pagos;
- correo verificado;
- teléfono si Play Console lo requiere;
- método de pago para el registro.

Las cuentas personales nuevas creadas después del 13 de noviembre de 2023 deben cumplir la prueba cerrada indicada más abajo antes de acceder a producción.

### Cuenta de organización

Preparar:

- nombre legal;
- domicilio y teléfono;
- correo de la organización;
- sitio web verificable;
- documentación oficial solicitada;
- identificadores empresariales que Play Console solicite para el país;
- persona autorizada para actuar por la organización.

No crear una organización ficticia para evitar la prueba cerrada. La información y los documentos se verifican.

Fuente: https://support.google.com/googleplay/android-developer/answer/13628312

## 3. Identidad técnica y firma

- [ ] Confirmar `com.uizador.app` o reemplazarlo antes del alta.
- [x] `versionCode = 1`.
- [x] `versionName = 0.1.0`.
- [x] `compileSdk = 36`.
- [x] `targetSdk = 36`.
- [x] Formato previsto: Android App Bundle.
- [ ] Crear upload key fuera del repositorio.
- [ ] Guardar keystore, contraseñas y copias de recuperación en ubicaciones separadas.
- [ ] Activar Play App Signing.
- [ ] Registrar huellas SHA-256 necesarias.
- [ ] Generar y probar AAB firmado.
- [ ] Verificar que el paquete no contenga secretos, endpoints de prueba ni contenido protegido.

Play App Signing separa la app signing key de la upload key. La upload key nunca debe guardarse en Git.

Fuente: https://developer.android.com/studio/publish/app-signing

## 4. App content de Play Console

Completar todas las declaraciones según la versión realmente subida:

- [ ] Política de privacidad.
- [ ] Data Safety.
- [ ] Acceso a la aplicación: indicar que no hay login o proporcionar instrucciones/cuenta de revisión.
- [ ] Declaración de anuncios: no contiene anuncios.
- [ ] Público objetivo y contenido: sólo adultos.
- [ ] Cuestionario IARC de clasificación.
- [ ] Uso de permisos sensibles.
- [ ] Declaraciones adicionales que Play Console muestre.
- [ ] Información sobre eliminación de datos.
- [ ] Confirmar que no es una aplicación gubernamental, financiera ni de salud.

El preset “noticiero” es una herramienta creativa. Uizador no debe clasificarse como servicio de noticias mientras no publique, agregue o distribuya noticias reales.

Fuentes:

- https://support.google.com/googleplay/android-developer/answer/9859455
- https://support.google.com/googleplay/android-developer/answer/9859655
- https://support.google.com/googleplay/android-developer/answer/9867159

## 5. Privacidad y Data Safety

Todas las aplicaciones necesitan una política de privacidad, incluso si no manejan datos sensibles. Debe:

- estar en una URL pública activa, sin geobloqueo;
- no ser un PDF;
- estar enlazada desde Play Console y desde la aplicación;
- nombrar Uizador y la entidad/desarrollador de la ficha;
- incluir contacto de privacidad;
- explicar acceso, recopilación, uso y transferencia de datos;
- explicar seguridad, retención y eliminación.

Antes de responder Data Safety:

1. revisar el código final;
2. revisar cada SDK y dependencia;
3. probar tráfico saliente;
4. comparar el resultado con `data-safety-working-draft.md`;
5. actualizar simultáneamente aplicación, formulario y política.

Fuente: https://support.google.com/googleplay/android-developer/answer/10144311

## 6. Prueba interna y prueba cerrada

### Prueba interna

- [ ] Cargar el primer AAB.
- [ ] Agregar teléfonos propios y colaboradores inmediatos.
- [ ] Probar instalación, actualización y restauración.
- [ ] Probar cámara, micrófono, poco espacio, interrupciones y permisos rechazados.
- [ ] Registrar modelo, Android, resultado y evidencia.

### Prueba cerrada para una cuenta personal nueva

Requisito vigente:

- mínimo 12 testers;
- todos inscriptos continuamente;
- al menos 14 días consecutivos;
- después se solicita acceso a producción;
- Play Console pide explicar reclutamiento, uso, comentarios y cambios realizados.

Preparar antes de iniciar:

- [ ] Lista de 15 a 20 personas para conservar margen.
- [ ] Grupo de correo de testers.
- [ ] Instrucciones de instalación.
- [ ] Guion de prueba de una cámara.
- [ ] Guion de prueba con dos teléfonos.
- [ ] Formulario breve de feedback.
- [ ] Registro de errores y correcciones.
- [ ] Consentimiento para usar únicamente métricas y material necesarios.
- [ ] Responsable de comprobar diariamente que continúan inscriptos.

No empezar los 14 días con una versión que sólo contiene pantallas vacías: la solicitud de producción pregunta cómo se probó la función real.

Fuente: https://support.google.com/googleplay/android-developer/answer/14151465

## 7. Ficha de Play Store

Elementos a preparar:

- [ ] Nombre de hasta 30 caracteres.
- [ ] Descripción corta de hasta 80 caracteres.
- [ ] Descripción completa.
- [ ] Icono Play de 512 × 512 PNG.
- [ ] Feature graphic.
- [ ] Mínimo dos capturas válidas; objetivo recomendado: cuatro capturas de 1080 px o más.
- [ ] Texto alternativo para cada captura.
- [ ] Correo de soporte.
- [ ] Sitio web.
- [ ] Política de privacidad.
- [ ] Traducciones consistentes.
- [ ] Video opcional alojado en YouTube, público o no listado, insertable, sin anuncios ni restricción de edad.

Las capturas deben mostrar funciones que existan en el AAB sometido a revisión. No usar logos de canales, películas, series o artistas sin autorización.

Fuente: https://support.google.com/googleplay/android-developer/answer/9866151

## 8. Evidencias que conviene conservar

- planilla de dispositivos y resultados;
- capturas de permisos y explicaciones previas;
- casos de rechazo de permisos;
- videos de las pruebas con uno y dos teléfonos;
- hashes y versiones de AAB;
- feedback de testers;
- lista de SDKs y sus políticas;
- diagrama de datos y proveedores;
- comprobación de eliminación;
- comprobación de cifrado;
- textos enviados a Play Console;
- fecha y fuente de cada decisión de política.

## 9. Orden recomendado de ejecución

1. Confirmar cuenta y package name.
2. Completar grabación nativa mínima.
3. Preparar política e inventario de datos reales.
4. Crear ficha y cargar AAB en prueba interna.
5. Resolver fallos de instalación, cámara y almacenamiento.
6. Reclutar testers.
7. Ejecutar prueba cerrada de 14 días si corresponde.
8. Completar App content y Data Safety.
9. Solicitar producción.
10. Publicar gradualmente y vigilar Android Vitals.
