# Plan de mejora UX/UI V2 (basado en tareas)

## 1) Objetivo V2
Consolidar la mejora de la experiencia para visitantes de primera vez, cerrando brechas de legibilidad, navegación móvil y conversión en tareas clave (planificar visita y contacto).

## 2) Estado de avance (V1 -> V2)

## Tareas cerradas ✅
- P1-01: Bloque “Planifica tu visita” implementado (horario, tarifa, dirección, CTA).
- P1-02: Promesas de portada alineadas con contenido real.
- P2-02: Consistencia editorial principal corregida (nombres propios y copy crítico).
- P2-03: Mensajería pública de investigación mejorada (sin notas operativas internas).
- P3-02 (parcial): Ajuste semántico de encabezado principal (un solo H1).

## Tareas pendientes ⏳
- P1-03: Legibilidad final de navegación y microtextos (desktop/mobile).
- P2-01: Simplificación adicional de acordeones en secciones densas.
- P3-01: Optimización visual/performance para móviles de gama media-baja.
- Nueva P1-04: Contacto directo accionable (WhatsApp click-to-chat y/o formulario corto).
- Nueva P1-05: CTA principal del hero orientado a “Planear visita”.
- Nueva P2-04: Simplificar patrón de navegación móvil (reducir complejidad del menú flotante).

---

## 3) Backlog V2 priorizado

## ALTO IMPACTO (P1)

### P1-03 · Legibilidad final de navegación
**Objetivo:** mejorar lectura inmediata de menú y etiquetas.

**Tareas:**
- Subir tamaño de texto en navegación principal y menú móvil.
- Ajustar contraste y espaciado en estados normal/hover/focus.
- Verificar lectura sin zoom en 360px, 390px y 768px.

**Criterio de aceptación:**
- 5/5 usuarios leen navegación sin esfuerzo en prueba moderada.

---

### P1-04 · Contacto accionable
**Objetivo:** reducir fricción para contacto inmediato.

**Tareas:**
- Añadir enlace WhatsApp con mensaje prellenado.
- Añadir CTA visible “Escribir por WhatsApp” en sección contacto.
- Mantener correo y teléfono como respaldo.

**Criterio de aceptación:**
- Contacto en 1 clic desde sección Contacto y/o bloque de visita.

---

### P1-05 · Hero orientado a tarea principal
**Objetivo:** aumentar tasa de inicio de “planear visita”.

**Tareas:**
- Reemplazar CTA secundario del hero por “Planear visita”.
- Conectar el CTA al bloque de visita rápida o “Cómo llegar”.

**Criterio de aceptación:**
- Aumento de clics en CTA de visita frente a baseline.

---

## IMPACTO MEDIO (P2)

### P2-01 · Simplificación de acordeones densos
**Objetivo:** reducir carga cognitiva y número de clics.

**Tareas:**
- Mantener abierto por defecto solo contenido crítico por sección.
- Convertir contenido secundario en resúmenes escaneables.
- Evitar acordeones anidados donde no sean necesarios.

**Criterio de aceptación:**
- Reducción >= 30% en clics para hallar información frecuente.

---

### P2-04 · Navegación móvil más simple
**Objetivo:** mejorar descubribilidad en primera visita.

**Tareas:**
- Unificar patrón de menú (evitar duplicidad de controles flotantes).
- Validar apertura/cierre con foco visible y comportamiento predecible.
- Revisar jerarquía visual del menú en pantallas pequeñas.

**Criterio de aceptación:**
- Usuarios encuentran secciones clave sin ayuda en <= 2 interacciones.

---

## IMPACTO BAJO (P3)

### P3-01 · Performance visual en móviles
**Objetivo:** mantener estética sin penalizar fluidez.

**Tareas:**
- Reducir carga de efectos blur/animaciones en breakpoints móviles.
- Auditar peso visual y repaints en scroll.
- Preservar experiencia accesible con prefers-reduced-motion.

**Criterio de aceptación:**
- Scroll fluido y estable en dispositivos de gama media.

---

## 4) Plan de ejecución por sprints (V2)

## Sprint V2-1 (semana 1)
- P1-03 Legibilidad final de navegación.
- P1-04 Contacto accionable.
- P1-05 CTA hero orientado a visita.

**Meta:** mejorar conversión a tareas primarias (visita + contacto).

## Sprint V2-2 (semana 2)
- P2-01 Simplificación de acordeones.
- P2-04 Navegación móvil simplificada.

**Meta:** reducir fricción de exploración en primera visita.

## Sprint V2-3 (semana 3)
- P3-01 Performance visual móvil.
- QA integral cross-device + cierre de regresiones.

**Meta:** estabilidad final y experiencia consistente.

---

## 5) Tablero de tareas V2 (seguimiento)

| ID | Tarea | Estado | Prioridad | Responsable sugerido |
|---|---|---|---|---|
| P1-03 | Legibilidad navegación | Pendiente | Alta | UI + Frontend |
| P1-04 | Contacto accionable | Pendiente | Alta | UX + Frontend |
| P1-05 | CTA hero a visita | Pendiente | Alta | UX + Frontend |
| P2-01 | Simplificar acordeones | Pendiente | Media | UX + Frontend |
| P2-04 | Simplificar menú móvil | Pendiente | Media | UI + Frontend |
| P3-01 | Optimización visual móvil | Pendiente | Baja | Frontend + QA |

---

## 6) KPIs V2
- Tiempo para encontrar horario/tarifa/ubicación: <= 8 segundos.
- Clics hasta contacto efectivo: <= 1 clic desde sección contacto.
- Tasa de éxito en navegación móvil (tareas clave): >= 90%.
- Incidencias visuales responsive críticas: 0 en 360px / 768px / 1366px.

---

## 7) Definición de terminado (DoD V2)
Una tarea V2 se cierra cuando:
- Cumple criterio de aceptación funcional y UX.
- Está validada en desktop, tablet y mobile.
- No introduce regresiones visuales ni de accesibilidad.
- Queda documentada en este tablero con estado actualizado.
