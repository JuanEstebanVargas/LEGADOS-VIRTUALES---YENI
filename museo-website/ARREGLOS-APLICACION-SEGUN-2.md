# Arreglos requeridos en la aplicación (según 2.docx)

## Objetivo
Documentar **todos los cambios solicitados** para corregir diseño, legibilidad, navegación y consistencia visual del sitio del Museo.

---

## 1) Tipografía y consistencia editorial

### Problemas detectados
- Se perciben **3 o más tipografías** distintas sin un criterio claro.
- Hay variación de estilos entre secciones (tamaño, peso y jerarquía) que rompe la coherencia.
- Hay textos con cortes incómodos de línea (frases partidas de forma antinatural).

### Arreglos obligatorios
1. Definir un sistema tipográfico único:
   - 1 fuente principal para texto corrido.
   - 1 fuente de display (opcional) solo para títulos.
2. Homologar jerarquías:
   - `h1`, `h2`, `h3`, cuerpo, leyendas y botones con escalas consistentes.
3. Ajustar ancho de columna y espaciado para evitar frases cortadas:
   - Mejorar `max-width` de párrafos.
   - Reducir cortes duros en líneas.
   - Revisar `line-height` para lectura cómoda.
4. Eliminar cualquier texto basura temporal (ejemplo reportado en el documento: “QUITAR ESTO”).

### Dónde aplicar
- `src/App.css`
- `src/App.responsive.css`
- `src/index.css`

### Criterio de aceptación
- Toda la app se ve con la misma familia tipográfica base y jerarquías claras.
- No hay frases partidas de forma extraña ni textos “apretados”.

---

## 2) Hero / portada principal

### Problemas detectados
- La portada se percibe como un bloque morado vacío con el nombre.
- Exceso de espacio vacío sin contenido visual principal.

### Arreglos obligatorios
1. Incorporar imagen principal de alto impacto en el hero:
   - Si aún no existe foto final, usar imagen de referencia/placeholder editorial.
2. Mantener overlay para legibilidad del título (sin perder contraste).
3. Balancear altura del hero:
   - Reducir sensación de vacío.
   - Mantener CTA visible sin scroll excesivo.

### Dónde aplicar
- `src/App.tsx` (estructura del hero)
- `src/App.css` (fondo/overlay/alto/espaciado)
- `src/assets/` (imagen temporal o final)

### Criterio de aceptación
- El primer pantallazo comunica identidad visual del museo con imagen relevante.
- No se percibe “vacío morado”.

---

## 3) Sistema de color y ritmo entre secciones

### Problemas detectados
- Alternancia sin lógica entre fondos oscuros y claros.
- Se siente como “dos sitios pegados”.

### Arreglos obligatorios
1. Definir ritmo visual intencional:
   - Base clara para la mayoría de secciones.
   - Oscuro solo para énfasis (por ejemplo: Hero, bloque de cita, “Planifica tu visita”).
2. Unificar tokens de color (fondos, bordes, texto, acentos).
3. Evitar que cada pestaña tenga un criterio distinto de color.

### Dónde aplicar
- `src/App.css`
- Variables globales en `src/index.css`

### Criterio de aceptación
- Transición visual coherente entre secciones.
- El color guía la jerarquía, no genera ruido.

---

## 4) Legibilidad y accesibilidad visual

### Problemas detectados
- Combinaciones de bajo contraste (amarillo sobre blanco, gris sobre morado).
- Tamaños de fuente pequeños para personas mayores o con baja visión.

### Arreglos obligatorios
1. Subir contraste en todo texto informativo:
   - Evitar texto claro sobre fondo claro y gris tenue sobre morado.
2. Aumentar tamaños mínimos:
   - Cuerpo ideal >= 16px en desktop, con buena escala responsive.
3. Ajustar interlineado y espaciado entre párrafos.
4. Revisar estados `hover`, `focus`, `active` para accesibilidad.

### Dónde aplicar
- `src/App.css`
- `src/App.responsive.css`
- `src/components/layout/Header.tsx` + estilos de navegación

### Criterio de aceptación
- Texto legible en todas las secciones y breakpoints.
- Contraste aceptable para lectura continua.

---

## 5) Íconos (reemplazar emojis)

### Problemas detectados
- En técnicas de colección se usan emojis de celular (informales para un museo).

### Arreglos obligatorios
1. Reemplazar emojis por iconografía de línea profesional.
2. Usar estilo visual consistente (grosor, tamaño y color dorado institucional).
3. Ajustar vertical alignment y tamaño para no desbalancear tarjetas.

### Dónde aplicar
- `src/data/content.ts` (actualmente campos `icon` con emojis)
- `src/App.tsx` o componentes dedicados (render de íconos)
- `src/App.css` (estilos de íconos)

### Recomendación técnica
- Usar biblioteca de íconos vectoriales (ej. `lucide-react` o similar) y mapear por tipo.

### Criterio de aceptación
- No quedan emojis en tarjetas de pintura/talla/orfebrería/textiles.
- Íconos se ven sobrios y editoriales.

---

## 6) Estandarización de botones

### Problemas detectados
- Botones con estilos heterogéneos (dorado, borde, verde brillante, tamaños distintos, formas distintas).

### Arreglos obligatorios
1. Definir solo 2 variantes globales:
   - Primario (dorado).
   - Secundario (outline).
2. WhatsApp se mantiene, pero con tratamiento más sobrio y alineado al sistema.
3. Unificar forma:
   - Botones semicuadrados (no ovalados/píldora extrema).
4. Homologar alturas, paddings y tipografía de botones.

### Dónde aplicar
- `src/App.css` (`.button`, `.button-primary`, `.button-secondary`, `.button-whatsapp`)
- Componentes que consumen botones en `src/App.tsx` y `src/components/`

### Criterio de aceptación
- Todo CTA pertenece al mismo sistema.
- No hay botones “aislados” con estilos ajenos.

---

## 7) Densidad de contenido y espaciado interno

### Problemas detectados
- Secciones de Historia y Directoras/Custodios se ven comprimidas.
- Texto amontonado y bloques sin “aire”.

### Arreglos obligatorios
1. Incrementar espacios verticales entre bloques informativos.
2. Reducir ancho de lectura en textos largos.
3. Mejorar padding interno de cards, acordeones y listados.
4. Ajustar ritmo visual en:
   - Historia.
   - Directoras.
   - Custodios.

### Dónde aplicar
- `src/App.css` (clases de historia/directoras/custodios/accordion)
- `src/App.tsx` (si hay que dividir bloques en subcomponentes para legibilidad)

### Criterio de aceptación
- Las secciones se leen con comodidad.
- Ya no se perciben “apretadas”.

---

## 8) Arquitectura de navegación (de una sola página larga a vista por sección)

### Problemas detectados
- Actualmente todo está en una página extremadamente larga.
- Se solicita que cada opción del menú muestre su sección de forma aislada.

### Arreglos obligatorios
1. Migrar a navegación por secciones/pestañas reales:
   - Al hacer clic en “Visitas”, mostrar solo “Visitas” (y equivalente para cada sección).
2. Implementar routing o render condicional por vista activa.
3. Mantener URL navegable por hash o rutas internas para compartir vista actual.

### Dónde aplicar
- `src/App.tsx` (estructura principal y render por vista)
- `src/components/layout/Header.tsx` (interacción de menú)
- Potencialmente `src/main.tsx` (si se integra router)

### Criterio de aceptación
- No se requiere hacer scroll por todo el sitio para llegar a una sección.
- El menú funciona como navegación de vistas.

---

## 9) Comportamiento al cambiar de pestaña

### Problemas detectados
- Al cambiar de sección, no siempre inicia desde arriba.
- El menú marca “Inicio” aunque el usuario esté en otra pestaña.

### Arreglos obligatorios
1. Forzar scroll al inicio en cada cambio de pestaña/vista.
2. Implementar estado de navegación activa real (`active link`).
3. Sincronizar estado activo con hash/ruta actual.

### Dónde aplicar
- `src/components/layout/Header.tsx`
- `src/App.tsx`

### Criterio de aceptación
- Cada vista inicia desde top.
- El menú resalta correctamente la pestaña actual.

---

## 10) Ajustes de microcopy y limpieza visual

### Problemas detectados
- Se reportan fragmentos con redacción cortada o incómoda.
- Posibles textos repetidos o ruido visual.

### Arreglos obligatorios
1. Revisar microcopy por sección para evitar duplicidades y cortes abruptos.
2. Corregir textos con saltos mal ubicados.
3. Eliminar bloques redundantes o repetitivos.

### Dónde aplicar
- `src/data/content.ts`
- `src/App.tsx`

### Criterio de aceptación
- El contenido se lee fluido y limpio.

---

## Plan de implementación sugerido (orden)
1. Sistema de tipografía + color + botones (base UI).
2. Hero con imagen y jerarquía visual.
3. Legibilidad/accesibilidad global.
4. Reemplazo de emojis por íconos profesionales.
5. Espaciado y densidad en Historia/Directoras/Custodios.
6. Migración de arquitectura a navegación por pestañas/vistas.
7. Scroll-to-top + menú activo real.
8. QA visual y responsive final.

---

## Checklist final de validación
- [ ] Tipografías unificadas y jerarquía coherente.
- [ ] Hero con imagen relevante (o placeholder de calidad).
- [ ] Ritmo claro/oscuro definido y consistente.
- [ ] Contraste y tamaños de texto aptos para lectura inclusiva.
- [ ] Emojis reemplazados por iconografía editorial.
- [ ] Solo 2 estilos de botón + WhatsApp sobrio.
- [ ] Secciones de Historia/Directoras/Custodios con más aire.
- [ ] Menú navega por secciones aisladas (no página interminable).
- [ ] Cambio de pestaña inicia arriba.
- [ ] Menú marca correctamente la pestaña activa.
- [ ] Limpieza de textos residuales y cortes no deseados.
