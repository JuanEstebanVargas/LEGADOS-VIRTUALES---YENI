# Plan específico de Legibilidad y Reducción de Densidad

## 1) Propósito (prioridad crítica)
Este plan atiende un problema **crítico** del sitio: la alta densidad de información dificulta la lectura, el escaneo y la toma de decisiones rápidas del visitante.

Objetivo central: lograr que una persona nueva pueda **entender, escanear y actuar** sin fatiga cognitiva.

---

## 2) Resultado esperado
Al finalizar este plan:
- El contenido se percibe más claro y respirable.
- La navegación y títulos se leen sin esfuerzo en móvil y desktop.
- Las secciones extensas se consumen por capas (resumen -> detalle).
- Disminuye la fricción en tareas clave (planear visita, contacto, cómo llegar).

---

## 3) Diagnóstico del problema actual

### Síntomas de baja legibilidad
- Textos de navegación y etiquetas con tamaño reducido en algunos contextos.
- Alta cantidad de bloques en paralelo que compiten por atención.
- Secciones con párrafos largos y densos sin “puntos de descanso”.
- Demasiados acordeones/expandibles seguidos para una primera visita.

### Impacto en UX
- Mayor tiempo para encontrar información útil.
- Carga cognitiva alta (lectura lineal forzada).
- Sensación de “sitio pesado”, aunque el rendimiento técnico sea bueno.

---

## 4) Principios de intervención
1. **Escaneabilidad primero**: el usuario debe captar lo esencial en 5–10 segundos.
2. **Una idea por bloque**: cada tarjeta/sección debe comunicar un único mensaje principal.
3. **Lectura por capas**: resumen corto visible + detalle opcional.
4. **Jerarquía fuerte**: títulos, subtítulos y cuerpo claramente diferenciados.
5. **Espacio en blanco funcional**: menos ruido, más respiración visual.

---

## 5) Metas medibles (KPIs)
- Tiempo para identificar la idea principal de cada sección: <= 8 segundos.
- Longitud media de párrafo en secciones informativas: 2–4 líneas visibles.
- Máximo de acordeones cerrados consecutivos por sección principal: 2.
- Tasa de éxito en lectura de navegación móvil sin zoom: >= 95%.
- Reducción de clics para encontrar contenido frecuente: >= 30%.

---

## 6) Backlog específico de mejora (tareas)

## P1 · Alto impacto (ejecutar primero)

### L1. Ajuste de escala tipográfica mínima
**Objetivo:** evitar microtexto y mejorar lectura instantánea.

**Tareas:**
- Definir tamaño mínimo real para:
  - navegación
  - labels
  - ayudas/contexto
- Reforzar contraste de textos secundarios.
- Aumentar ligeramente interlineado en bloques extensos.

**Criterio de aceptación:**
- Menú y labels legibles en 360px sin zoom ni esfuerzo.

---

### L2. Resumen obligatorio al inicio de cada sección densa
**Objetivo:** reducir carga cognitiva inicial.

**Tareas:**
- Añadir un micro-resumen de 2–3 líneas al inicio de:
  - Historia
  - Programación
  - Patrimonio
  - Investigación
- Estructura recomendada: “Qué es + para quién + qué puedo hacer aquí”.

**Criterio de aceptación:**
- Usuario identifica propósito de sección en menos de 8 segundos.

---

### L3. Regla de párrafos cortos y bloques escaneables
**Objetivo:** evitar muros de texto.

**Tareas:**
- Dividir párrafos largos en unidades de 2–4 líneas.
- Convertir texto operativo a listas con viñetas.
- Limitar listas largas: agrupar por subtítulo cuando superen 6 ítems.

**Criterio de aceptación:**
- No quedan párrafos extensos en secciones de decisión rápida.

---

### L4. Simplificación de acordeones por sección
**Objetivo:** disminuir clics y fatiga por expansión constante.

**Tareas:**
- Mantener abierto por defecto el contenido más consultado de cada sección.
- Evitar más de 2 acordeones cerrados consecutivos sin resumen visible.
- Consolidar acordeones redundantes en un único bloque con subtítulos.

**Criterio de aceptación:**
- Menos interacciones para hallar contenido frecuente.

---

## P2 · Impacto medio

### L5. Reestructurar jerarquía visual de tarjetas
**Objetivo:** que cada tarjeta se entienda en escaneo rápido.

**Tareas:**
- Título claro + subtítulo corto + máximo 1 acción principal.
- Reducir texto secundario visible en estado colapsado.
- Homologar espaciado vertical entre tarjetas de una misma sección.

**Criterio de aceptación:**
- Cada tarjeta se comprende en un vistazo.

---

### L6. Densidad en móvil: compresión inteligente
**Objetivo:** lectura cómoda en pantallas pequeñas.

**Tareas:**
- Priorizar una sola columna limpia para contenido denso.
- Evitar acumulación de badges/acciones simultáneas en viewport inicial.
- Incrementar separación entre bloques interactivos para prevenir toque accidental.

**Criterio de aceptación:**
- Sin sensación de saturación en 360px/390px.

---

### L7. Estándar editorial anti-densidad
**Objetivo:** sostener la mejora en el tiempo.

**Tareas:**
- Crear guía breve de redacción para web:
  - frases más cortas
  - voz activa
  - un mensaje por párrafo
  - evitar reiteraciones
- Definir plantilla de sección con estructura fija.

**Criterio de aceptación:**
- Nuevo contenido publicado sin volver a estados densos.

---

## P3 · Impacto bajo (afinamiento)

### L8. Refinamiento visual de separación y ritmo
**Objetivo:** mejorar ritmo de lectura sin cambiar arquitectura.

**Tareas:**
- Ajustar márgenes entre encabezados, intro y contenido.
- Dar más aire en bloques oscuros con mucho texto.
- Uniformar “espaciado entre ideas” dentro de cada sección.

**Criterio de aceptación:**
- Lectura continua sin fatiga ni saltos visuales bruscos.

---

## 7) Reglas de diseño de contenido (obligatorias)

### 7.1 Longitud y ritmo
- Párrafo ideal: 2–4 líneas en desktop, 2–3 en móvil.
- Máximo 90–110 caracteres por línea para texto corrido.
- Evitar bloques de texto de más de 6 líneas seguidas.

### 7.2 Jerarquía de lectura
- 1 título principal por bloque.
- 1 subtítulo funcional.
- 1 idea clave destacada.
- Detalle secundario en acordeón o lista expandible.

### 7.3 Densidad de interacción
- Máximo 2 CTAs visibles por bloque principal.
- Priorizar CTA primario único cuando el usuario debe decidir rápido.
- Evitar duplicar acciones equivalentes en el mismo viewport.

---

## 8) Plan de ejecución (2 semanas)

## Semana 1 (núcleo)
- L1 Escala tipográfica mínima.
- L2 Resúmenes iniciales por sección.
- L3 Párrafos cortos y listas escaneables.
- L4 Simplificación de acordeones.

**Meta:** bajar carga cognitiva de inmediato.

## Semana 2 (consolidación)
- L5 Jerarquía de tarjetas.
- L6 Densidad móvil.
- L7 Estándar editorial.
- L8 Afinamiento de ritmo visual.

**Meta:** estabilizar mejora y evitar regresiones.

---

## 9) Checklist de QA de legibilidad/densidad

### Lectura
- [ ] Navegación legible sin zoom en móvil.
- [ ] Etiquetas y metadatos no parecen microtexto.
- [ ] Párrafos extensos fragmentados correctamente.

### Escaneo
- [ ] Cada sección inicia con resumen claro.
- [ ] Hay “puntos de descanso” visual cada bloque.
- [ ] Acordeones no ocultan información esencial.

### Interacción
- [ ] CTAs principales visibles y no compiten.
- [ ] No hay duplicidad confusa de acciones.
- [ ] Tareas críticas se resuelven con menos clics.

### Responsive
- [ ] 360px: lectura cómoda y sin saturación.
- [ ] 768px: continuidad visual y jerarquía clara.
- [ ] 1366px: densidad equilibrada sin huecos excesivos.

---

## 10) Definición de terminado (DoD)
Este plan se considera completado cuando:
- Se cumplen los KPIs de tiempo de comprensión y reducción de clics.
- QA visual y UX aprueban legibilidad en 3 resoluciones objetivo.
- El estándar editorial queda documentado y aplicado.
- No se detectan regresiones de densidad en nuevas secciones.

---

## 11) Prioridad final
Este apartado es **estratégico y urgente** para la calidad percibida del sitio. Sin mejorar legibilidad y densidad, cualquier avance visual o funcional pierde efectividad en usuarios reales.
