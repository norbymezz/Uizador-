# Inventario provisional de datos y Data Safety

Actualizado: 2026-08-27.

No es el formulario definitivo. Debe contrastarse con el AAB, los SDKs y el tráfico de red de la versión que se presente.

## Regla práctica

Un archivo que permanece solamente en el teléfono no suele tratarse igual que un dato transmitido fuera del dispositivo. En cuanto Uizador envía video, audio, identificadores o telemetría a un servidor, hay que revaluar recopilación, uso, transferencia, retención y eliminación.

## Inventario previsto

| Dato o acceso | MVP local | Modo remoto futuro | Finalidad | Decisión pendiente |
|---|---|---|---|---|
| Video de cámara | Se guarda localmente | Se subiría por acción del usuario | Crear y editar escenas | Proveedor, región y retención |
| Audio de micrófono | Unido al video local | Se subiría con la toma | Sincronización y contenido | Política de eliminación |
| Presets y guiones | Locales | Podrían enviarse a participantes | Dirección de escena | Cifrado y caducidad |
| Código/token de sesión | No necesario sin sesión | Se transmite | Vincular participantes | Duración y rotación |
| Nombre o alias del participante | Opcional y local | Puede transmitirse | Identificar roles | Evitar nombre real obligatorio |
| Estado “listo/grabando” | No | Se transmite | Coordinación | Retención efímera |
| Batería y conectividad | No | Podrían transmitirse | Ayudar al director | Confirmar necesidad real |
| Modelo del dispositivo y Android | Diagnóstico local | Podría registrarse | Compatibilidad y soporte | Minimizar y agregar consentimiento |
| Dirección IP | No se usa como función | El servidor la recibe técnicamente | Seguridad/conexión | Política del proveedor y logs |
| Ubicación precisa | No | No prevista | Ninguna | No pedir permiso |
| Contactos | No | No previsto | Ninguna | Usar vínculo/QR, no agenda |
| Identificador publicitario | No | No previsto | Ninguna | No incorporar SDK publicitario |
| Analítica | No incluida | No decidida | Calidad | Elegir sólo después de auditoría |
| Informes de fallos | No incluidos | No decididos | Estabilidad | Revisar datos enviados por SDK |
| Cuenta de usuario | No prevista | Evitable inicialmente | Ninguna en MVP | Mantener sin cuenta si es posible |

## Respuestas provisionales de producto

- Datos cifrados en tránsito: **debe ser sí** para toda función remota.
- Venta de datos: **no**.
- Publicidad: **no** en el MVP.
- Uso obligatorio de cuenta: **no**.
- Ubicación, contactos, salud, finanzas y mensajes personales: **no**.
- Material publicado automáticamente: **no**.
- Grabaciones privadas por defecto: **sí**.
- Inicio de subida: únicamente por una acción clara o una configuración explícita.
- Eliminación local: desde cada proyecto y desde Preferencias.
- Eliminación remota: debe existir antes de habilitar subida.
- Caducidad automática de archivos remotos: pendiente de definir.
- Descarga/exportación: controlada por el usuario/director autorizado.

## Riesgos de inconsistencia

El formulario sería incorrecto si se declarara “no se recopilan datos” pero la versión incluyera cualquiera de estos comportamientos:

- subida remota de tomas;
- servicio de errores que reciba identificadores o logs;
- analítica de uso;
- autenticación;
- almacenamiento en nube;
- SDK de publicidad;
- logs de servidor conservados;
- soporte que adjunte proyectos automáticamente.

Cada dependencia nueva debe agregarse a este inventario antes de entrar en la compilación release.

## Auditoría antes del envío

- [ ] Enumerar permisos del manifest final.
- [ ] Enumerar dependencias y SDKs.
- [ ] Revisar manifest fusionado.
- [ ] Inspeccionar tráfico durante todos los flujos.
- [ ] Probar sin otorgar cámara ni micrófono.
- [ ] Probar eliminación local.
- [ ] Probar eliminación remota si existe.
- [ ] Verificar plazos reales de logs y backups.
- [ ] Verificar cifrado y URLs firmadas.
- [ ] Comparar política, interfaz y Data Safety palabra por palabra.
- [ ] Guardar copia fechada del formulario enviado.

Fuentes oficiales:

- https://support.google.com/googleplay/android-developer/answer/10787469
- https://support.google.com/googleplay/android-developer/answer/10144311
- https://support.google.com/googleplay/android-developer/answer/13327111
