# Prueba con dos teléfonos

## Diagnóstico previo de cada teléfono

Antes de reunir los dispositivos, abrir `web/preflight/index.html` mediante HTTPS en cada uno:

1. ejecutar la revisión automática;
2. conceder cámara y micrófono;
3. comprobar la imagen y el medidor de audio;
4. grabar cinco segundos;
5. reproducir el archivo de prueba completo;
6. guardar el informe JSON;
7. nombrar los informes como teléfono A y teléfono B.

El informe no contiene dirección IP, ubicación ni contactos. Sirve para comparar codec, resolución, almacenamiento, batería y red.

## Preparación

- Usar dos teléfonos Android con batería suficiente.
- Activar volumen alto en el teléfono director.
- Liberar al menos 1 GB en cada dispositivo.
- Conectarlos a la misma red cuando sea posible.
- Evitar auriculares durante la primera prueba.
- Colocar ambos de modo que escuchen claramente al director.

## Procedimiento

1. Abrir la pantalla Uizador Multicámara en el teléfono director.
2. Crear sesión.
3. Escanear el QR con el segundo teléfono.
4. Confirmar que aparece como cámara conectada.
5. Configurar:
   - duración: 10 segundos;
   - pre-roll: 3 segundos;
   - tomas: 2;
   - pausa: 5 segundos;
   - movimiento: paneo hacia la derecha.
6. Preparar cámaras.
7. Aceptar cámara y micrófono en ambos teléfonos.
8. Confirmar que el director indica “Todas las cámaras están listas”.
9. Iniciar la secuencia.
10. Durante la acción, seguir la guía de movimiento.
11. Verificar que cada teléfono descarga dos archivos.

## Qué observar

- El QR abre correctamente la sesión.
- El segundo teléfono no necesita configurar manualmente la toma.
- El director no permite comenzar antes de que la cámara remota esté lista.
- Ambos archivos contienen tres beeps de inicio.
- Ambos archivos contienen el clac final.
- La guía de movimiento aparece en ambos teléfonos.
- Las dos tomas se numeran correctamente.
- La pausa permite volver a posición.
- No se corta el video al bloquear involuntariamente controles.
- No aparecen diferencias importantes de orientación o relación de aspecto.

## Datos a anotar

- Informes de diagnóstico A/B:
- Modelos de teléfono:
- Navegadores y versiones:
- Distancia entre teléfonos:
- Red utilizada:
- Archivos obtenidos:
- ¿Se escuchan claramente las marcas?:
- ¿La guía aparece al mismo tiempo?:
- ¿Hubo permisos o descargas bloqueadas?:
- Observaciones:

## Resultado posterior

Con los cuatro archivos obtenidos —dos cámaras por dos tomas— se probará:

1. detección de la firma audible;
2. estimación del offset;
3. reproducción sincronizada;
4. selección A/B;
5. continuidad del movimiento;
6. elección de la mejor toma.
