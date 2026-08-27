# Sesiones remotas dirigidas

## Idea

Uizador tendrá dos modos de sesión independientes:

1. **Multicámara local:** varios teléfonos graban el mismo espacio. El clock acústico queda registrado por todas las cámaras y sirve como referencia física común.
2. **Grabación remota dirigida:** los participantes pueden estar en casas, ciudades o países distintos. El teléfono director distribuye la escena, los encuadres y una hora común para cada toma.

La grabación remota no exige transmitir video en vivo. Cada teléfono puede grabar el archivo original localmente y subirlo después de la toma.

## Flujo del director

1. Crear una sesión y elegir **A distancia**.
2. Elegir escena, duración, cuenta regresiva, cantidad de tomas y cámaras/roles.
3. Compartir un vínculo o QR.
4. Ver qué participantes ingresaron.
5. Asignar a cada teléfono un personaje, cámara o plano.
6. Enviar guías: encuadre semitransparente, posición, movimiento, diálogo, audio o coreografía.
7. Esperar que todos indiquen **Listo**.
8. Programar la toma para una hora futura común.
9. Seguir el estado: esperando, grabando, procesando, subiendo, recibido o con error.
10. Revisar proxies livianos y solicitar repetición si hace falta.
11. Descargar o abrir los originales en el editor multicámara.

## Sincronización

A distancia no existe un sonido físico que todas las cámaras puedan escuchar. Por eso se combinan tres referencias:

- **reloj común:** cada cliente estima su diferencia respecto del servidor mediante varios intercambios de ida y vuelta;
- **inicio programado:** el director no envía “grabar ahora”, sino “grabar en T0”, con margen suficiente para absorber latencia;
- **marca local:** cada teléfono reproduce y graba el mismo patrón de tres pulsos al comienzo y un clac al final.

Cada toma conserva:

- hora de servidor prevista para T0;
- hora monotónica local de inicio y fin;
- estimación de offset del reloj;
- latencia y dispersión observadas;
- posición exacta de las marcas sonoras dentro del archivo;
- dispositivo, participante, cámara, escena y número de toma.

El editor aplica primero la alineación temporal calculada. Después puede afinarla con las marcas sonoras locales y permitir ajuste manual.

## Ejecución de una toma

El teléfono participante recibe el paquete de escena antes de grabar:

- duración y cuenta regresiva;
- guía visual y movimiento;
- diálogo o teleprompter;
- pista musical o coreográfica;
- patrón del clock;
- configuración de cámara compatible;
- identificadores de sesión y toma.

Al llegar a T0:

1. comienza la captura local;
2. se registra el clock local;
3. se ejecutan las indicaciones temporizadas;
4. al finalizar se registra el clac;
5. se cierra el archivo de forma segura;
6. se genera un proxy de baja resolución;
7. se sube primero el proxy y luego el original reanudable.

Si se pierde Internet después de recibir la orden, la toma continúa. El teléfono conserva el archivo y reanuda la subida cuando recupera conexión.

## Subida y control del director

La primera versión remota necesita un servicio intermedio; una conexión P2P pura no alcanza cuando los teléfonos están detrás de redes domésticas distintas o se desconectan.

Modelo inicial:

- canal de control seguro por WebSocket;
- archivos grabados localmente;
- almacenamiento temporal cifrado;
- subida multipart/reanudable;
- URL firmadas y con vencimiento;
- verificación por hash;
- borrado manual inmediato y caducidad automática;
- proxy rápido para revisión;
- original disponible para edición/exportación.

El director ve progreso por archivo y no marca una toma como completa hasta verificar proxy, duración, audio y hash.

## Roles y variantes

- dos actores remotos, una cámara por actor;
- actor y director en lugares distintos;
- varias personas interpretando una conversación;
- coreografía con una pista común;
- pantalla dividida;
- montaje de reacción;
- doblaje o fondo grabado posteriormente;
- una persona que repite distintos personajes o posiciones en momentos separados.

## Seguridad y privacidad

- ingreso por enlace con token temporal;
- aprobación del director para cada dispositivo;
- indicación visible durante toda grabación;
- consentimiento antes de entrar;
- archivos privados por defecto;
- nada se publica automáticamente;
- el director no activa la cámara de otro teléfono sin una acción previa y visible del participante;
- control de eliminación para participante y director;
- límites de tamaño, duración y retención;
- registro de quién inició cada toma y quién accedió a cada archivo.

## Plan de implementación

Este modo queda preparado conceptualmente pero no bloquea la prueba local.

1. Probar dos teléfonos en el mismo lugar.
2. Medir desfases reales del clock local.
3. Separar protocolo de control y grabación.
4. Crear un pequeño servidor de sesión y reloj.
5. Probar dos teléfonos en redes diferentes sin video en vivo.
6. Agregar subida reanudable de proxies.
7. Incorporar originales y panel del director.
8. Integrar la selección y sincronización en postproducción.
