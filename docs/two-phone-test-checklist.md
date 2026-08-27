# Prueba con dos teléfonos

Esta es la primera prueba física de Uizador. Registrar los resultados en `web/test-center/index.html`; los ID indicados permiten volver exactamente al mismo control.

## Diagnóstico previo de cada teléfono

Antes de reunir los dispositivos, abrir `web/preflight/index.html` mediante HTTPS en cada uno:

1. ejecutar la revisión automática;
2. conceder cámara y micrófono;
3. comprobar la imagen y el medidor de audio;
4. grabar cinco segundos;
5. reproducir el archivo de prueba completo;
6. guardar el informe JSON;
7. nombrar los informes como teléfono A y teléfono B.

El informe no contiene dirección IP, ubicación ni contactos. Sirve para comparar codec, resolución, almacenamiento, batería y red. Completar en el Centro de pruebas `PRE-001` a `PRE-008`.

## Preparación

- Usar dos teléfonos Android con batería suficiente.
- Activar volumen alto en el teléfono director.
- Liberar al menos 1 GB en cada dispositivo.
- Conectarlos a la misma red cuando sea posible.
- Evitar auriculares durante la primera prueba.
- Colocar ambos de modo que escuchen claramente al director.
- Anotar versión o commit, modelos, Android, navegador, red y distancia.

## Procedimiento

1. Abrir la pantalla Uizador Multicámara en el teléfono director.
2. Crear sesión (`LOC-001`).
3. Escanear el QR con el segundo teléfono (`LOC-002`).
4. Confirmar que aparece como cámara B conectada (`LOC-003`).
5. Configurar:
   - duración: 10 segundos;
   - pre-roll: 3 segundos;
   - tomas: **3**;
   - pausa: 5 segundos;
   - movimiento: desplazamiento A → B.
6. Preparar ambas cámaras.
7. Aceptar cámara y micrófono en los dos teléfonos.
8. Confirmar que el director indica “Todas las cámaras están listas” (`LOC-004`).
9. Iniciar la secuencia.
10. Durante la acción, seguir la guía de movimiento.
11. No tocar los teléfonos entre las tres repeticiones.
12. Verificar que cada teléfono conserva o descarga tres archivos (`LOC-006`).

## Qué observar

- El QR abre correctamente la sesión.
- El segundo teléfono no necesita configurar manualmente la toma.
- El director no permite comenzar antes de que la cámara remota esté lista.
- Los seis archivos contienen tres pulsos de inicio (`LOC-007`).
- Los seis archivos contienen el clac final (`LOC-008`).
- La guía de movimiento aparece en ambos teléfonos y en el orden esperado.
- Las tres tomas y las cámaras A/B se identifican correctamente (`LOC-009`).
- La pausa permite volver a posición.
- No se corta el video al bloquear involuntariamente controles.
- No aparecen diferencias inesperadas de orientación o relación de aspecto.
- Audio e imagen permanecen juntos en cada archivo (`SYN-005`).

## Datos a anotar

- Informes de diagnóstico A/B:
- Versión o commit probado:
- Modelos de teléfono:
- Android y navegadores:
- Distancia entre teléfonos:
- Red utilizada:
- Nombres de los seis archivos:
- ¿Se escuchan claramente las marcas?:
- ¿La guía aparece al mismo tiempo?:
- ¿Hubo permisos, cierres o descargas bloqueadas?:
- Batería inicial y final:
- Observaciones:

## Resultado posterior

Con los **seis archivos obtenidos —dos cámaras por tres tomas—** se probará:

1. detección de los tres pulsos (`SYN-001`);
2. detección diferenciada del clac final (`SYN-002`);
3. cálculo y registro del offset A/B por toma (`SYN-003`);
4. reproducción sincronizada (`SYN-004`);
5. unión permanente de sonido e imagen (`SYN-005`);
6. repetibilidad entre las tres tomas (`SYN-006`);
7. corrección manual sin perder el cálculo original (`SYN-009`);
8. elección de la mejor toma.

Exportar al terminar el informe JSON del Centro de pruebas. Si un control bloqueante falla, conservar los videos y describir el defecto antes de repetir.
