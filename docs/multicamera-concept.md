# Uizador Multicámara — concepto y primera prueba

## Propósito

Convertir un conjunto de teléfonos Android cercanos en un sistema coordinado de grabación multicámara.

Un teléfono actúa como **director** y los demás como **cámaras**. Cada cámara graba localmente con su propia calidad. La aplicación organiza los registros como proyecto, escena, toma y cámara; luego sincroniza los materiales para elegir ángulos, definir cortes y exportar un montaje.

La propuesta no depende de descargar ni modificar videos de YouTube. El resultado final podrá guardarse y, en una etapa posterior, compartirse o subirse a YouTube.

## Dos formas de uso

### Multicámara libre

Los teléfonos pueden permanecer quietos y grabar la escena completa desde distintos ángulos. Después se sincronizan las pistas y el usuario decide en qué intervalos utiliza cada cámara.

Ejemplo de montaje:

- 00:00–00:04: cámara A;
- 00:04–00:07: cámara B;
- 00:07–00:11: cámara C.

La selección de cámara se guarda como metadata; los videos originales no se alteran hasta la exportación.

### Escena dirigida por plantilla

Una plantilla describe la coreografía audiovisual de una escena:

- posición y función de cada cámara;
- encuadre inicial y final;
- trayectoria o rotación;
- duración y velocidad aproximada;
- orden de planos y contraplanos;
- instantes previstos de entrada y salida de cada cámara.

Cada participante ve solamente las instrucciones de su cámara. Sobre la imagen pueden mostrarse guías semitransparentes: silueta del protagonista, horizonte, flechas de movimiento, marcas inicial/final, distancia aproximada y cuenta regresiva.

El teléfono director conserva la vista global de la escena y el estado de todas las cámaras.

## Ingreso rápido mediante QR

El primer teléfono crea la sesión y asume inicialmente el rol de director. La aplicación genera un identificador breve y muestra un código QR.

El QR contiene un enlace de sesión, no información audiovisual ni credenciales permanentes. Por ejemplo:

```text
uizador://join?session=K7M4Q2&token=...
```

Cuando otro participante lo escanea:

1. se abre Uizador mediante un enlace profundo;
2. si la aplicación no está instalada, se muestra una página de acceso o instalación;
3. el teléfono solicita ingresar a la sesión;
4. el director lo acepta automáticamente o mediante confirmación, según la configuración;
5. el sistema le asigna un identificador de cámara;
6. aparece en el panel del director con su estado de conexión, batería y disponibilidad.

El director puede cambiar después el nombre y el rol: cámara A, cámara B, protagonista, audio, luz u otro rol previsto.

Para una reunión rápida, el flujo esperado es:

```text
crear sesión → mostrar QR → escanear → entrar → asignar cámara → preparar toma
```

Así ningún participante necesita escribir direcciones de red, códigos largos ni configurar manualmente cada teléfono.

## Multicámara virtual con un solo teléfono

La misma escena puede ejecutarse aunque exista un solo teléfono. En ese caso, la aplicación convierte las cámaras previstas por la plantilla en pasadas sucesivas.

Ejemplo:

1. el teléfono ocupa la posición de cámara A y graba la escena;
2. la aplicación indica dónde ubicarlo para representar la cámara B;
3. se repite la actuación siguiendo la misma timeline;
4. el teléfono pasa a la posición C y realiza una tercera grabación;
5. las tres pasadas se presentan en el editor como si procedieran de tres cámaras diferentes.

Las guías predefinidas siguen funcionando: encuadre semitransparente, altura, inclinación, distancia, trayectoria, duración y momento de cada acción.

Para conservar continuidad entre pasadas, la aplicación puede reproducir:

- cuenta regresiva y clock común;
- indicaciones habladas o auriculares;
- diálogos o pista de referencia de la primera toma;
- marcas de acciones y movimientos;
- una silueta o imagen fantasma del encuadre anterior;
- referencias para posición de actores y objetos.

En el modelo de datos se distingue entre **cámara física** y **rol de cámara**. Un mismo dispositivo puede ejecutar sucesivamente los roles A, B y C. El montaje posterior utiliza los roles y la timeline, por lo que el editor funciona igual con uno o con muchos teléfonos.

Este modo permite reutilizar gramáticas cinematográficas y plantillas de escenas conocidas —rotación alrededor del protagonista, plano/contraplano, plano general, inserto y otras interacciones frecuentes— sin requerir varios dispositivos.

## Organización del material

```text
Proyecto
└── Escena
    ├── Toma 1
    │   ├── Cámara A
    │   ├── Cámara B
    │   └── Cámara C
    ├── Toma 2
    │   ├── Cámara A
    │   ├── Cámara B
    │   └── Cámara C
    └── Toma 3
        ├── Cámara A
        ├── Cámara B
        └── Cámara C
```

Un segmento queda identificado, como mínimo, por:

```text
(escena, toma, cámara, t0, t1)
```

## Ciclo automático de tomas

El director configura:

- duración de la escena;
- cuenta regresiva inicial;
- pausa entre tomas;
- cantidad de repeticiones;
- duración opcional de preparación.

Todos los teléfonos ejecutan el mismo ciclo:

```text
cuenta regresiva → grabación durante T → fin → pausa → siguiente toma
```

Esto permite realizar varias tomas sin tocar ni reprogramar los teléfonos. Después se puede conservar una toma completa o combinar cámaras de tomas diferentes cuando resulte válido.

## Sincronización

Enviar la orden `REC` a todos los teléfonos no garantiza que comiencen simultáneamente: existen latencias de red, sistema operativo, cámara y codificación.

Por eso se separan dos niveles:

1. **Coordinación:** el director comunica preparación, cuenta regresiva, inicio, fin y número de toma.
2. **Alineación del material:** después se estima y corrige el desfase real entre los archivos.

### Clock sonoro registrado

Durante el período en que todas las cámaras ya están grabando se emiten marcas sonoras identificables. El director emite una marca de referencia y pueden registrarse respuestas de los demás teléfonos. Las marcas quedan grabadas en las pistas de audio.

Cada marca debería codificar el dispositivo emisor mediante frecuencia, patrón o secuencia. Así pueden estimarse:

- instante local de emisión;
- instante de recepción acústica en cada grabación;
- desfase entre dispositivos;
- estabilidad o deriva de los relojes durante una toma.

La señal sonora no necesita iniciar físicamente todas las cámaras al mismo microsegundo: sirve para alinear posteriormente las líneas temporales que ya estaban grabando.

### Protocolo audible de inicio y final

La secuencia de una toma debe preservar la unión entre sonido e imagen:

1. el director ordena a todos los teléfonos comenzar a grabar;
2. se espera un margen de seguridad;
3. un único emisor acústico reproduce tres marcas de inicio, por ejemplo `beep · beep · BEEP`;
4. comienza la actuación;
5. al finalizar la duración prevista se reproduce una firma diferente, por ejemplo un `CLAC`;
6. se espera otro margen de seguridad;
7. recién entonces se detienen las grabaciones.

Los tres pulsos iniciales permiten reconocer la firma y medir su cadencia; el último pulso puede ser más agudo, largo o fuerte. La marca final debe ser inequívocamente distinta. Distintos presets pueden usar diferentes ritmos, pero todos los dispositivos de una misma toma deben registrar la misma fuente acústica.

La alineación posterior busca esas formas en cada pista mediante correlación. El video no se separa de su audio local: se desplaza el archivo o la pista audiovisual completa sobre la timeline común. De esta manera se conserva la sincronía interna entre imagen y sonido de cada teléfono.

La propagación del sonido introduce aproximadamente 2,9 ms por metro, además de las latencias de parlante y micrófono. Para una primera prueba en una habitación puede medirse el error obtenido. Si luego se requiere precisión mayor, las marcas audibles se combinan con timestamps monotónicos, estimación de posición o una señal visual simultánea.

En futuras versiones se puede combinar con timestamps monotónicos, correlación del audio ambiente, flash visual o detección de movimiento común.

## Presets visuales de escena y toma

En este proyecto, la preparación principal ocurre antes de grabar. Un preset describe cómo debe encuadrarse y moverse cada cámara durante una escena determinada.

Al elegir una escena, cada teléfono recibe el preset correspondiente a su rol. Sobre la vista de cámara aparecen guías semitransparentes y líneas punteadas que permiten hacer coincidir la imagen real con el encuadre previsto.

Un preset puede definir:

- contorno o caja donde debe ubicarse el protagonista;
- líneas punteadas de composición, horizonte y dirección de mirada;
- puntos de referencia para objetos y actores;
- posición inicial y final del encuadre;
- ángulo inicial y final de paneo o inclinación;
- trayectoria de traslación de la cámara;
- duración prevista del movimiento;
- velocidad y aceleración aproximadas;
- nivel inicial y final de zoom;
- sentido y momento del zoom;
- tolerancia admitida respecto de la guía;
- instante de inicio y final de la toma.

Conviene representar por separado:

- la rotación física de la cámara en grados;
- el desplazamiento físico en distancia o trayectoria;
- el zoom como factor, por ejemplo `1.0x → 2.0x`, o como distancia focal equivalente;
- la duración del cambio, que determina su velocidad.

Durante la ejecución, la interfaz puede mostrar:

- arco punteado con los grados pendientes;
- flecha para indicar dirección y velocidad;
- barra de progreso del movimiento;
- marcos inicial y final superpuestos;
- advertencia si el teléfono se aparta de la trayectoria;
- confirmación por color cuando el encuadre coincide;
- cuenta regresiva para comenzar el movimiento.

Ejemplo conceptual:

```json
{
  "preset_id": "shot-reverse-shot-01",
  "camera_role": "B",
  "framing": {
    "subject_box": [0.55, 0.18, 0.30, 0.62],
    "horizon_y": 0.46,
    "tolerance": 0.04
  },
  "movement": {
    "type": "pan_and_zoom",
    "yaw_start_deg": -12,
    "yaw_end_deg": 18,
    "zoom_start": 1.0,
    "zoom_end": 1.7,
    "duration_sec": 4.0
  }
}
```

El preset no es solamente una imagen de referencia: es una secuencia temporal de objetivos visuales. En cada instante indica dónde debería estar el encuadre y cuánto debería haberse completado el movimiento.

## Teleprompter, diálogo y aprendizaje inicial

Los presets pueden incluir una pista de actuación además de la coreografía de cámara. Cada actor recibe en su teléfono un teleprompter sincronizado con la timeline de la escena.

El teleprompter puede mostrar:

- personaje que habla;
- parlamento actual y siguiente;
- texto desplazándose automáticamente;
- cuenta regresiva hasta la entrada;
- marcas de pausa, énfasis, movimiento y reacción;
- velocidad regulable;
- repetición automática en cada toma;
- indicaciones por auricular cuando el teléfono se utiliza como cámara y no conviene leer la pantalla.

El diálogo, las acciones y los movimientos de cámara comparten el mismo reloj. De ese modo, una línea puede activar simultáneamente una entrada actoral, un paneo, un zoom o un cambio de encuadre.

### Escena demostrativa al iniciar

La primera experiencia de la aplicación debe enseñar el sistema mediante una escena breve y ejecutable:

1. elegir cantidad de teléfonos y participantes;
2. seleccionar una escena o interacción;
3. asignar personajes y roles de cámara;
4. mostrar físicamente dónde colocar cada teléfono;
5. superponer las guías de encuadre;
6. ensayar con teleprompter;
7. ejecutar cuenta regresiva y grabación;
8. repetir las tomas configuradas;
9. mostrar el resultado sincronizado.

La aplicación puede ofrecer familias de puesta en escena como:

- plano de dos;
- plano/contraplano;
- conversación sentada;
- dos personajes caminando;
- entrada y reacción;
- acercamiento dramático;
- rotación alrededor del protagonista;
- plano general seguido de primeros planos.

Una misma categoría, como **plano de dos**, debe admitir variantes de composición: frontal o lateral, personajes simétricos o dominancia de uno, cuerpo entero o primer plano, cámara fija o movimiento. El preset describe relaciones espaciales y temporales, no solamente una captura estática.

### Escenas famosas y derechos

La aplicación puede identificar y explicar patrones cinematográficos conocidos y permitir que el usuario cree una interpretación propia. Para distribuir diálogos completos de películas protegidas se necesitarían licencias.

El catálogo inicial puede usar:

- diálogos originales creados para Uizador;
- textos aportados por el usuario;
- obras de dominio público;
- material expresamente licenciado;
- plantillas abstractas inspiradas en técnicas generales, sin copiar el diálogo protegido.

Los diálogos licenciados o aportados por el usuario pueden asociarse directamente al teleprompter y a las marcas de la escena.

## Pre-edición multicámara

Al terminar una toma, la aplicación genera una pre-edición no destructiva. No modifica ni recodifica inmediatamente los archivos originales: guarda una lista de decisiones que indica qué cámara o rol debe verse en cada intervalo.

La pantalla mínima de pre-edición incluye:

- reproducción sincronizada de todas las cámaras;
- vista principal del corte actual;
- miniaturas de los demás ángulos;
- timeline común con los cambios de cámara;
- selección de la toma que se está editando;
- posibilidad de comparar tomas;
- botones para cambiar el ángulo durante la reproducción;
- ajuste posterior de cada punto de corte;
- deshacer, rehacer y volver al montaje sugerido.

Si la escena utiliza una plantilla, la aplicación crea primero un montaje sugerido con los cortes previstos: plano general, rotación, plano, contraplano e insertos. En el modo libre puede comenzar con una sola cámara o con decisiones manuales.

Una decisión de montaje puede representarse así:

```json
{
  "scene_id": "S01",
  "take_id": "T02",
  "t0_sec": 4.0,
  "t1_sec": 7.0,
  "camera_role": "B",
  "source_device": "device-02"
}
```

El usuario puede realizar una primera edición tocando las miniaturas mientras la escena se reproduce. Cada toque cierra el intervalo anterior y abre uno nuevo con la cámara seleccionada. Después puede arrastrar los límites para afinar el montaje.

La pre-edición también funciona en el modo de un solo teléfono: las pasadas sucesivas A, B y C se alinean sobre la misma timeline y se presentan como ángulos alternativos.

Sólo cuando el usuario confirma el montaje se realiza la exportación final, aplicando sincronización, cortes, audio elegido, transiciones y efectos.

## Relación con el Uizador existente

La estructura de puntos, fronteras e intervalos del segmentador temporal puede extenderse a varias cámaras. Cada archivo conserva su timeline local y se añade una transformación hacia un timeline común.

Ejemplo conceptual:

```json
{
  "scene_id": "S01",
  "take_id": "T02",
  "camera_id": "C03",
  "local_start_ns": 0,
  "common_offset_ms": 137.4,
  "drift_ppm": 3.1,
  "segments": []
}
```

Las decisiones de montaje pueden reutilizar intervalos:

```json
{
  "t0_sec": 4.0,
  "t1_sec": 7.0,
  "camera_id": "C02"
}
```

## Primera prueba mínima

La primera prueba no necesita edición, transferencia de video ni guía cinematográfica.

### Objetivo

Comprobar que varios teléfonos pueden pertenecer a una sesión, repetir tomas automáticamente y producir información suficiente para alinear sus grabaciones.

### Alcance

- dos teléfonos Android;
- uno director y uno cámara;
- conexión local;
- creación o ingreso a una sesión mediante código;
- configuración de cuenta regresiva, duración, pausa y tres repeticiones;
- grabación local en ambos teléfonos;
- marca sonora de sincronización dentro de cada toma;
- identificación automática de escena, toma y cámara;
- pantalla final con los archivos y offsets estimados;
- reproducción simultánea de ambas cámaras para verificar la alineación.

### Criterio de éxito inicial

Después de una sesión de tres tomas, ambas grabaciones deben poder reproducirse alineadas de manera repetible. Primero se medirá el error observado; todavía no se fija una tolerancia definitiva.

## Croma key y escenarios virtuales

Una extensión prevista es el reemplazo de fondos mediante croma verde. Con una manta o pared verde, cada cámara puede separar a las personas del fondo y ubicarlas dentro de un escenario virtual.

Casos de uso:

- videos musicales caseros;
- escenas fantásticas o de películas;
- fondos de cumpleaños;
- actuaciones infantiles;
- escenarios animados;
- integración de participantes grabados por separado;
- composiciones multicámara dentro de un mismo ambiente virtual.

La aplicación puede asistir antes de grabar mediante:

- guía para cubrir correctamente el encuadre con la tela;
- advertencia de sombras y arrugas;
- medición de uniformidad del verde;
- recomendaciones de iluminación;
- detección de ropa u objetos con colores problemáticos;
- vista previa del recorte;
- regulación de tolerancia, suavizado de bordes y reducción del reflejo verde.

El croma puede visualizarse de forma aproximada durante el ensayo, pero conviene conservar siempre el video original. El recorte de mayor calidad y la composición final se realizan después, de manera no destructiva.

Los presets de escena pueden incluir también el fondo previsto y marcas espaciales coherentes con él. Así los actores saben dónde mirar, caminar o señalar aunque el objeto virtual todavía no exista físicamente.

## Fuera de la primera prueba

- transferencia automática de videos entre teléfonos;
- montaje y exportación final;
- subida a YouTube;
- cientos o miles de teléfonos;
- reconstrucción 3D o bullet time;
- selección automática del mejor ángulo;
- plantillas de escenas;
- guías de encuadre por visión artificial.

Estas funciones pertenecen al producto, pero no son necesarias para validar el mecanismo fundamental.
