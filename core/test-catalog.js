export const TEST_PLAN_VERSION = 1;

export const PHASES = [
  { id: "preflight", label: "Preparación del teléfono" },
  { id: "local", label: "Sesión local y grabación" },
  { id: "recovery", label: "Interrupciones y recuperación" },
  { id: "sync", label: "Sincronización" },
  { id: "edit", label: "Proyecto y postproducción" },
  { id: "remote", label: "Sesión remota" },
  { id: "ux", label: "Uso, idiomas y accesibilidad" },
  { id: "release", label: "Android y publicación" },
];

export const TEST_CASES = [
  {id:"PRE-001",phase:"preflight",priority:"blocker",core:true,title:"Abrir mediante HTTPS",expected:"La página funciona en contexto seguro y habilita las APIs de cámara."},
  {id:"PRE-002",phase:"preflight",priority:"blocker",core:true,title:"Conceder cámara y micrófono",expected:"Ambos permisos se explican, se conceden y aparece imagen con nivel de audio."},
  {id:"PRE-003",phase:"preflight",priority:"high",core:true,title:"Rechazar permisos",expected:"La app no se bloquea y explica cómo volver a intentarlo."},
  {id:"PRE-004",phase:"preflight",priority:"blocker",core:true,title:"Grabar cinco segundos",expected:"El archivo se cierra, reproduce completo y conserva audio e imagen."},
  {id:"PRE-005",phase:"preflight",priority:"high",core:true,title:"Identificar formato de grabación",expected:"Se selecciona un MIME compatible y se informa en el diagnóstico."},
  {id:"PRE-006",phase:"preflight",priority:"high",core:true,title:"Comprobar espacio disponible",expected:"Se informa una estimación o una advertencia si la API no está disponible."},
  {id:"PRE-007",phase:"preflight",priority:"high",core:true,title:"Comprobar batería y temperatura práctica",expected:"La batería es suficiente y el teléfono no se calienta durante la prueba corta."},
  {id:"PRE-008",phase:"preflight",priority:"medium",core:false,title:"Exportar diagnóstico",expected:"Se descarga JSON sin ubicación, contactos ni dirección IP."},

  {id:"LOC-001",phase:"local",priority:"blocker",core:true,title:"Crear sesión",expected:"El director obtiene código y QR únicos."},
  {id:"LOC-002",phase:"local",priority:"blocker",core:true,title:"Ingresar mediante QR",expected:"El segundo teléfono entra sin escribir direcciones ni configuración manual."},
  {id:"LOC-003",phase:"local",priority:"blocker",core:true,title:"Asignar roles A y B",expected:"Cada teléfono muestra su cámara y rol correctos."},
  {id:"LOC-004",phase:"local",priority:"blocker",core:true,title:"Bloqueo hasta que todos estén listos",expected:"El director no puede iniciar mientras falte una cámara preparada."},
  {id:"LOC-005",phase:"local",priority:"blocker",core:true,title:"Cuenta regresiva común",expected:"Ambos teléfonos muestran la toma y cuenta regresiva previstas."},
  {id:"LOC-006",phase:"local",priority:"blocker",core:true,title:"Tres tomas consecutivas",expected:"Se producen seis archivos: tres de A y tres de B."},
  {id:"LOC-007",phase:"local",priority:"blocker",core:true,title:"Clock inicial",expected:"Los tres pulsos se registran claramente en los seis archivos."},
  {id:"LOC-008",phase:"local",priority:"blocker",core:true,title:"Clac final",expected:"La marca final aparece antes de detener cada archivo."},
  {id:"LOC-009",phase:"local",priority:"blocker",core:true,title:"Identidad de archivos",expected:"Proyecto, escena, toma, cámara y fecha no se confunden."},
  {id:"LOC-010",phase:"local",priority:"high",core:true,title:"Duración real",expected:"Las seis duraciones incluyen márgenes y no presentan cortes prematuros."},
  {id:"LOC-011",phase:"local",priority:"high",core:true,title:"Pausa entre tomas",expected:"Existe tiempo suficiente para volver a posición sin tocar teléfonos."},
  {id:"LOC-012",phase:"local",priority:"high",core:true,title:"Guía de movimiento A → B",expected:"Las marcas y mensajes aparecen en el orden y tiempo previstos."},
  {id:"LOC-013",phase:"local",priority:"high",core:false,title:"Plano y contraplano",expected:"Roles, miradas y cambios A/B son comprensibles durante el ensayo."},
  {id:"LOC-014",phase:"local",priority:"medium",core:false,title:"Teleprompter",expected:"El texto es legible y no tapa el encuadre importante."},
  {id:"LOC-015",phase:"local",priority:"medium",core:false,title:"Una cámara en varias posiciones",expected:"Las pasadas conservan timeline, rol y número de toma."},

  {id:"REC-001",phase:"recovery",priority:"blocker",core:true,title:"Desconexión antes de grabar",expected:"Se pierde el estado listo y el director no inicia incorrectamente."},
  {id:"REC-002",phase:"recovery",priority:"blocker",core:true,title:"Desconexión durante una toma",expected:"La grabación local continúa y el archivo puede recuperarse."},
  {id:"REC-003",phase:"recovery",priority:"blocker",core:true,title:"Aplicación en segundo plano",expected:"La conducta es explícita y el material ya grabado no se pierde."},
  {id:"REC-004",phase:"recovery",priority:"high",core:true,title:"Bloqueo de pantalla",expected:"La aplicación evita el bloqueo o informa y recupera el archivo."},
  {id:"REC-005",phase:"recovery",priority:"high",core:true,title:"Llamada o interrupción",expected:"La toma queda cerrada o marcada como parcial, nunca silenciosamente válida."},
  {id:"REC-006",phase:"recovery",priority:"blocker",core:true,title:"Espacio insuficiente",expected:"Se impide iniciar o se cierra con error recuperable antes de corromper."},
  {id:"REC-007",phase:"recovery",priority:"high",core:false,title:"Director abandona sesión",expected:"Las cámaras conservan sus archivos y reciben un estado comprensible."},
  {id:"REC-008",phase:"recovery",priority:"high",core:true,title:"Reabrir después de cierre",expected:"El proyecto muestra tomas completas, parciales y pendientes correctamente."},

  {id:"SYN-001",phase:"sync",priority:"blocker",core:true,title:"Detectar tres pulsos",expected:"Se identifican las marcas correctas en cada pista sin confundir diálogo."},
  {id:"SYN-002",phase:"sync",priority:"blocker",core:true,title:"Detectar clac final",expected:"La firma final se reconoce y diferencia del clock inicial."},
  {id:"SYN-003",phase:"sync",priority:"blocker",core:true,title:"Calcular offset A/B",expected:"Se obtiene un desplazamiento reproducible para cada toma."},
  {id:"SYN-004",phase:"sync",priority:"blocker",core:true,title:"Reproducir cámaras alineadas",expected:"Una acción común se observa simultánea dentro del error medido."},
  {id:"SYN-005",phase:"sync",priority:"blocker",core:true,title:"Conservar sincronía interna",expected:"Al desplazar una cámara, su audio y su imagen permanecen unidos."},
  {id:"SYN-006",phase:"sync",priority:"high",core:true,title:"Repetibilidad entre tres tomas",expected:"Los offsets no varían de manera inexplicable entre repeticiones."},
  {id:"SYN-007",phase:"sync",priority:"high",core:false,title:"Deriva en toma larga",expected:"Se mide si la alineación cambia entre inicio y final."},
  {id:"SYN-008",phase:"sync",priority:"medium",core:false,title:"Distancias acústicas diferentes",expected:"Se registra el efecto de separar los teléfonos y la fuente sonora."},
  {id:"SYN-009",phase:"sync",priority:"high",core:true,title:"Ajuste manual",expected:"El usuario puede corregir el offset sin destruir el cálculo original."},

  {id:"EDT-001",phase:"edit",priority:"blocker",core:true,title:"Crear y reabrir .uizador",expected:"Proyecto, escenas y tomas sobreviven al ciclo exportar/importar."},
  {id:"EDT-002",phase:"edit",priority:"high",core:true,title:"Subtítulos dentro de .uizador",expected:"WebVTT conserva texto, idioma e instantes en microsegundos."},
  {id:"EDT-003",phase:"edit",priority:"high",core:true,title:"Relocalizar medio faltante",expected:"Un video se reconoce por hash, tamaño y duración sin guardar ruta privada."},
  {id:"EDT-004",phase:"edit",priority:"blocker",core:true,title:"Cambiar cámara durante reproducción",expected:"Cada toque crea una decisión de corte ajustable."},
  {id:"EDT-005",phase:"edit",priority:"high",core:true,title:"Deshacer y rehacer cortes",expected:"Las decisiones se restauran sin modificar originales."},
  {id:"EDT-006",phase:"edit",priority:"high",core:false,title:"Efectos no destructivos",expected:"Un título, fondo o transición puede eliminarse y volver a renderizarse."},
  {id:"EDT-007",phase:"edit",priority:"medium",core:false,title:"Pantalla partida de entrevista",expected:"Ambos videos respetan relación, nombres, ubicaciones y duración."},
  {id:"EDT-008",phase:"edit",priority:"high",core:false,title:"Exportación final",expected:"El archivo final reproduce completo, con audio, orientación y duración correctos."},

  {id:"REM-001",phase:"remote",priority:"blocker",core:false,title:"Ingresar desde otra red",expected:"Un participante entra mediante token temporal sin estar en la misma Wi-Fi."},
  {id:"REM-002",phase:"remote",priority:"blocker",core:false,title:"Estimar reloj común",expected:"Cada dispositivo informa offset, latencia y dispersión."},
  {id:"REM-003",phase:"remote",priority:"blocker",core:false,title:"Inicio programado T0",expected:"La toma comienza por hora acordada y no por llegada instantánea del mensaje."},
  {id:"REM-004",phase:"remote",priority:"blocker",core:false,title:"Grabar sin Internet posterior",expected:"Después de recibir la orden, la toma local termina aunque se corte la red."},
  {id:"REM-005",phase:"remote",priority:"high",core:false,title:"Subir proxy primero",expected:"El director revisa una copia liviana antes de solicitar el original."},
  {id:"REM-006",phase:"remote",priority:"blocker",core:false,title:"Reanudar subida",expected:"Una transferencia interrumpida continúa sin duplicar ni corromper."},
  {id:"REM-007",phase:"remote",priority:"high",core:false,title:"Caducidad y eliminación",expected:"Los archivos temporales se eliminan según la configuración y queda evidencia."},

  {id:"UX-001",phase:"ux",priority:"high",core:true,title:"Primer uso sin explicación externa",expected:"Una persona entiende crear, unir, preparar y grabar."},
  {id:"UX-002",phase:"ux",priority:"high",core:true,title:"Botones durante grabación",expected:"Sólo aparecen controles necesarios y todos explican su función."},
  {id:"UX-003",phase:"ux",priority:"high",core:true,title:"Orientación y pulgar",expected:"Los controles principales son alcanzables y no cambian accidentalmente."},
  {id:"UX-004",phase:"ux",priority:"high",core:false,title:"Texto grande",expected:"Con escala de fuente alta no se cortan botones ni instrucciones."},
  {id:"UX-005",phase:"ux",priority:"high",core:false,title:"Contraste y lector de pantalla",expected:"Estados no dependen sólo del color y los controles tienen nombre accesible."},
  {id:"UX-006",phase:"ux",priority:"medium",core:false,title:"Español, inglés y portugués",expected:"No quedan textos mezclados ni desbordados."},
  {id:"UX-007",phase:"ux",priority:"high",core:true,title:"Ayuda contextual",expected:"Permisos, clock, archivos y recuperación se explican donde hacen falta."},

  {id:"REL-001",phase:"release",priority:"blocker",core:false,title:"Compilar AAB release",expected:"Gradle, lint, pruebas y R8 terminan sin errores."},
  {id:"REL-002",phase:"release",priority:"blocker",core:false,title:"Instalación limpia",expected:"La versión de prueba se instala y abre en dispositivos compatibles."},
  {id:"REL-003",phase:"release",priority:"high",core:false,title:"Actualizar sin perder proyectos",expected:"Una versión nueva conserva o migra datos anteriores."},
  {id:"REL-004",phase:"release",priority:"blocker",core:false,title:"Permisos mínimos en manifest fusionado",expected:"No aparecen permisos sin función visible."},
  {id:"REL-005",phase:"release",priority:"blocker",core:false,title:"Sin secretos en el paquete",expected:"El AAB no contiene claves, tokens, keystores ni endpoints privados."},
  {id:"REL-006",phase:"release",priority:"blocker",core:false,title:"Política y Data Safety coherentes",expected:"Código, tráfico, SDKs, política y formulario describen lo mismo."},
  {id:"REL-007",phase:"release",priority:"high",core:false,title:"Ficha representa la versión real",expected:"Capturas y textos no prometen funciones ausentes."},
  {id:"REL-008",phase:"release",priority:"high",core:false,title:"Prueba cerrada documentada",expected:"Se conservan testers, duración, feedback, fallos y cambios."},
];

export function validateTestCatalog(cases = TEST_CASES) {
  const phases = new Set(PHASES.map(x => x.id));
  const ids = new Set();
  for (const item of cases) {
    if (!item.id || ids.has(item.id)) throw new Error("ID de prueba duplicado o vacío: " + item.id);
    if (!phases.has(item.phase)) throw new Error("Fase desconocida en " + item.id);
    if (!["blocker", "high", "medium"].includes(item.priority)) throw new Error("Prioridad inválida en " + item.id);
    if (!item.title || !item.expected) throw new Error("Caso incompleto: " + item.id);
    ids.add(item.id);
  }
  return true;
}
