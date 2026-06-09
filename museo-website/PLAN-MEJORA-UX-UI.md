# Plan de mejora UX/UI basado en tareas

## 1. Objetivo
Mejorar la experiencia de usuario de la web del museo para que una persona visitante (primera visita) encuentre información clave de forma rápida, clara y confiable, sin perder la identidad institucional del sitio.

## 2. Alcance
- UX: arquitectura de información, navegación y descubribilidad.
- UI: legibilidad, jerarquía visual y consistencia.
- Contenido: claridad, precisión editorial y foco en tareas del visitante.
- Performance percibido: carga inicial y fluidez.
- Responsive: experiencia consistente en desktop, tablet y mobile.

---

## 3. Backlog priorizado por impacto

## Alto impacto (P1)

### Tarea P1-01 · Módulo "Planifica tu visita" visible sin desplegar
**Problema:** Horarios, tarifas y ubicación requieren scroll + interacción en acordeones.

**Acciones:**
- Crear un bloque fijo al inicio de la sección de visitas con:
  - Horario de hoy
  - Tarifa general
  - Dirección corta
  - CTA principal: "Cómo llegar"
- Mantener acordeones para detalle avanzado.

**Entregables:**
- Nuevo bloque de información práctica en primer pantallazo de visitas.
- CTA destacado y consistente.

**Criterios de aceptación:**
- Usuario identifica horarios + precio + ubicación en menos de 10 segundos.
- No necesita abrir acordeones para datos básicos.

**Responsables sugeridos:** UX + Frontend + Contenido.

---

### Tarea P1-02 · Alinear promesa de portada con contenido real
**Problema:** Se anuncian elementos no implementados (ej. formulario/noticias) y genera desconfianza.

**Acciones:**
- Revisar y ajustar badges/claims de portada.
- Si no existe formulario funcional, reemplazar por canal real (WhatsApp / correo).
- Si no hay sección de noticias activa, no prometerla en hero.

**Entregables:**
- Portada coherente con funcionalidades reales.

**Criterios de aceptación:**
- 0 claims de portada sin soporte en el sitio.
- Mensajería de hero alineada con capacidades actuales.

**Responsables sugeridos:** UX Writing + Contenido + Frontend.

---

### Tarea P1-03 · Mejorar legibilidad de navegación y microtextos
**Problema:** Tipografía pequeña en navegación, afecta lectura y escaneo.

**Acciones:**
- Definir tamaño mínimo legible para navegación y etiquetas.
- Ajustar contraste en estados normal/hover/active.
- Validar lectura en móviles de gama media.

**Entregables:**
- Escala tipográfica actualizada para elementos críticos.

**Criterios de aceptación:**
- Navegación legible sin zoom en mobile y desktop.
- Contraste conforme a criterios de accesibilidad.

**Responsables sugeridos:** UI + Frontend + QA.

---

## Impacto medio (P2)

### Tarea P2-01 · Simplificación de acordeones (reducción de carga cognitiva)
**Problema:** Exceso de bloques expandibles dificulta escaneo rápido.

**Acciones:**
- Consolidar acordeones redundantes.
- Mostrar resúmenes útiles por defecto.
- Dejar detalle profundo bajo "Ver más".

**Entregables:**
- Estructura de secciones más escaneable.

**Criterios de aceptación:**
- Menos clics para encontrar información frecuente.
- Mejor comprensión de la arquitectura de contenido.

**Responsables sugeridos:** UX + Frontend.

---

### Tarea P2-02 · Corrección editorial y consistencia institucional
**Problema:** Inconsistencias de nombres propios, acentuación y redacción.

**Acciones:**
- Crear checklist editorial institucional.
- Corregir nombres propios, tildes y términos recurrentes.
- Homogeneizar tono (institucional cercano, claro, no ambiguo).

**Entregables:**
- Documento de guía editorial breve.
- Contenido normalizado en todo el sitio.

**Criterios de aceptación:**
- 0 inconsistencias de nombres propios.
- Estilo homogéneo en todas las secciones.

**Responsables sugeridos:** Contenido + Dirección de proyecto.

---

### Tarea P2-03 · Gestión de contenido "pendiente"
**Problema:** Exponer texto de "permisos pendientes" reduce percepción de calidad.

**Acciones:**
- Mover contenido no aprobado a estado interno/no público.
- Reemplazar por texto neutral (próximamente / en actualización) si aplica.

**Entregables:**
- Secciones públicas sin mensajes de proceso interno.

**Criterios de aceptación:**
- Sitio público sin notas operativas internas.

**Responsables sugeridos:** Contenido + Frontend.

---

## Impacto bajo (P3)

### Tarea P3-01 · Ajustes de performance visual
**Problema:** Efectos de blur y capas animadas pueden penalizar dispositivos limitados.

**Acciones:**
- Reducir intensidad/cantidad de efectos en mobile.
- Optimizar recursos tipográficos e imágenes.
- Mantener versión reducida para contextos de bajo rendimiento.

**Entregables:**
- CSS optimizado para escenarios móviles.

**Criterios de aceptación:**
- Mayor fluidez percibida en scroll/transiciones.
- Menor carga visual sin perder identidad.

**Responsables sugeridos:** Frontend + QA.

---

### Tarea P3-02 · Refinamiento semántico y SEO técnico básico
**Problema:** Jerarquía de headings mejorable (ej. más de un h1).

**Acciones:**
- Dejar un solo h1 por página.
- Validar estructura de h2/h3 por secciones.
- Revisar textos alternativos donde corresponda.

**Entregables:**
- Estructura semántica limpia.

**Criterios de aceptación:**
- Jerarquía HTML consistente y auditable.

**Responsables sugeridos:** Frontend + QA.

---

## 4. Plan por sprints (3 semanas)

## Sprint 1 (Semana 1) · Fundaciones de conversión y claridad
- P1-01 Módulo "Planifica tu visita".
- P1-02 Alineación de promesas de portada.
- P1-03 Legibilidad de navegación.

**Meta de sprint:** Reducir fricción para tareas primarias de visita.

---

## Sprint 2 (Semana 2) · Orden de información y calidad editorial
- P2-01 Simplificación de acordeones.
- P2-02 Corrección editorial y consistencia.
- P2-03 Gestión de contenido pendiente.

**Meta de sprint:** Aumentar comprensión y confianza del usuario.

---

## Sprint 3 (Semana 3) · Optimización final y robustez
- P3-01 Performance visual responsive.
- P3-02 Semántica/SEO técnico básico.
- QA integral cross-device.

**Meta de sprint:** Afinar experiencia final y estabilidad visual.

---

## 5. Matriz esfuerzo vs impacto (resumen)

| ID | Tarea | Impacto | Esfuerzo estimado | Prioridad |
|---|---|---|---|---|
| P1-01 | Módulo Planifica tu visita | Alto | Medio | 1 |
| P1-02 | Coherencia hero/contenido | Alto | Bajo | 2 |
| P1-03 | Legibilidad navegación | Alto | Bajo-Medio | 3 |
| P2-01 | Simplificar acordeones | Medio | Medio | 4 |
| P2-02 | Consistencia editorial | Medio | Bajo | 5 |
| P2-03 | Ocultar contenido pendiente | Medio | Bajo | 6 |
| P3-01 | Optimización visual/performance | Bajo-Medio | Medio | 7 |
| P3-02 | Semántica y SEO base | Bajo | Bajo | 8 |

---

## 6. KPIs de validación

### KPI de descubribilidad
- Tiempo para encontrar horario, tarifa y ubicación: objetivo <= 10 segundos.

### KPI de interacción
- Reducción de clics para datos clave: objetivo >= 30%.

### KPI de calidad percibida
- Disminución de comentarios de "no encuentro información" en pruebas cualitativas.

### KPI de legibilidad
- Tasa de éxito en lectura de navegación en mobile sin zoom: objetivo 100% en pruebas de 5 usuarios.

### KPI de estabilidad responsive
- Sin solapamientos ni truncamientos críticos en 360px, 768px y 1366px.

---

## 7. Definición de terminado (DoD)
Una tarea se considera terminada cuando:
- Cumple criterios de aceptación.
- Está validada en desktop, tablet y mobile.
- No introduce regresiones visuales.
- Tiene revisión editorial aprobada (si aplica).
- Está integrada con QA funcional y visual.

---

## 8. Riesgos y mitigaciones
- **Riesgo:** Cambios visuales rompen identidad institucional.
  - **Mitigación:** Mantener tokens visuales de marca y validar con dirección.
- **Riesgo:** Simplificación elimina contexto histórico importante.
  - **Mitigación:** Mantener detalle en segundo nivel (acordeón/expandible).
- **Riesgo:** Priorización dispersa sin foco en usuario visitante.
  - **Mitigación:** Ejecutar primero tareas P1 y medir.

---

## 9. Próximo paso recomendado
Iniciar Sprint 1 con implementación inmediata de P1-01, P1-02 y P1-03, y realizar prueba rápida con 5 usuarios al cierre de semana para validar mejora real en la tarea "planificar visita".
