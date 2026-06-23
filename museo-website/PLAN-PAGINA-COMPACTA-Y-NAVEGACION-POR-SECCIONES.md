# Plan detallado: página principal compacta + navegación por secciones completas

## 1) Objetivo del cambio

Reducir la sensación de “página larguísima” y mejorar la claridad de navegación.

Se propone:

1. **Mantener una sola página principal (Home)** con un resumen breve de cada opción del menú.
2. **Agregar una vista completa por opción** (por ejemplo: Visitas), accesible mediante botón “Ver sección completa”.
3. Hacer que el menú principal lleve a estas vistas completas, no a un scroll largo en la misma pantalla.

---

## 2) Resultado esperado (experiencia de usuario)

- Al abrir el sitio, la persona ve una **Home compacta** con tarjetas resumen de:
  - El Museo
  - Historia
  - Colección
  - Visitas
  - Programación
  - Patrimonio
  - Investigación
  - Contacto

- Cada tarjeta tiene:
  - 1 título
  - 1 resumen de 2–4 líneas
  - 1 botón principal: **“Ver sección completa”**
  - (Opcional) botón secundario: **“Volver al inicio”** en las páginas internas

- Al dar clic en “Visitas” del menú o en el botón de su tarjeta:
  - se abre la **página completa de Visitas**
  - ya no se muestran todas las demás secciones en esa misma vista

---

## 3) Enfoque técnico recomendado (React + Vite actual)

Actualmente el sitio funciona como una sola vista larga con anclas (`#inicio`, `#visita`, etc.).

Para cumplir el requerimiento sin romper contenido existente, implementar **ruteo por vistas**:

- `/` → Home compacta (resúmenes)
- `/museo` → El Museo (completa)
- `/historia` → Historia (completa)
- `/coleccion` → Colección (completa)
- `/visitas` → Visitas (completa)
- `/programacion` → Programación (completa)
- `/patrimonio` → Patrimonio (completa)
- `/investigacion` → Investigación (completa)
- `/contacto` → Contacto (completa)

### Ventaja de este enfoque

- UX mucho más limpia.
- Mejor mantenimiento por módulo.
- Evita una sola carga visual gigante.
- Permite crecimiento futuro por sección.

---

## 4) Estructura de archivos sugerida

Crear nuevas carpetas/componentes para separar Home de páginas internas.

```text
src/
  pages/
    HomePage.tsx
    MuseoPage.tsx
    HistoriaPage.tsx
    ColeccionPage.tsx
    VisitasPage.tsx
    ProgramacionPage.tsx
    PatrimonioPage.tsx
    InvestigacionPage.tsx
    ContactoPage.tsx
  components/
    home/
      SectionPreviewCard.tsx
  App.tsx
  App.css
  App.responsive.css
```

> Nota: No es obligatorio mover todo en un solo paso. Se puede hacer por fases para minimizar riesgo.

---

## 5) Plan de implementación por fases

## Fase 0 — Preparación

1. Crear rama de trabajo, por ejemplo: `feature/home-compacta-secciones`.
2. Verificar build actual en limpio (`npm run build`).
3. Confirmar textos cortos de resumen con cliente antes de maquetar.

---

## Fase 1 — Configurar navegación por rutas

1. Instalar `react-router-dom` si no está instalado.
2. En `main.tsx`, envolver la app con `BrowserRouter`.
3. En `App.tsx`, reemplazar la lógica de una sola página por `<Routes>` y `<Route>`.
4. Definir rutas para Home y páginas de sección.

**Criterio de éxito Fase 1:**
- Al entrar a `/`, carga Home.
- Al entrar a `/visitas`, carga vista de Visitas.
- Sin errores en consola ni en build.

---

## Fase 2 — Crear Home compacta

1. Construir `HomePage.tsx` con:
   - Hero breve (opcional)
   - grid de tarjetas resumen por sección
2. Crear componente reutilizable `SectionPreviewCard.tsx`:
   - props: `title`, `summary`, `to`, `ctaLabel`
3. Cada tarjeta debe tener botón claro: **“Ver sección completa”**.

### Reglas de contenido en Home

- Máximo 60–90 palabras por tarjeta.
- 1 sola idea principal por tarjeta.
- Evitar listas extensas y bloques largos.

**Criterio de éxito Fase 2:**
- Home visible en 1–2 pantallas de alto (desktop promedio).
- Se identifica rápidamente cada opción.

---

## Fase 3 — Separar contenido completo por página

Tomar el contenido existente y moverlo a páginas específicas:

- bloque `id="identidad"` → `MuseoPage.tsx`
- bloque `id="historia"` → `HistoriaPage.tsx`
- bloque `id="coleccion"` → `ColeccionPage.tsx`
- bloque `id="visita"` → `VisitasPage.tsx`
- bloques restantes → páginas equivalentes

### Recomendación clave

Primero migrar **Visitas** (por ser ejemplo prioritario del cliente), luego el resto.

**Criterio de éxito Fase 3:**
- “Visitas” ya no depende de scroll en Home.
- URL directa `/visitas` funciona y comparte correctamente.

---

## Fase 4 — Actualizar Header

1. Cambiar navegación en `Header.tsx`:
   - de `href="#visita"` a rutas (`/visitas`)
2. Resaltar opción activa según ruta actual.
3. Mantener comportamiento responsive del menú hamburguesa.

**Criterio de éxito Fase 4:**
- Menú abre la vista correcta en cada opción.
- Estado activo coincide con la ruta.

---

## Fase 5 — Ajustes visuales y densidad

1. Reducir altura de secciones, márgenes y paddings en Home.
2. Estandarizar tarjetas:
   - altura similar
   - CTA visible sin scroll interno
3. Asegurar legibilidad:
   - interlineado adecuado
   - contraste AA
   - jerarquía H1/H2/H3 coherente

**Criterio de éxito Fase 5:**
- La Home se percibe ligera, escaneable y moderna.

---

## 6) Qué conservar del código actual

- Reutilizar los datos de `src/data/content.ts` para no duplicar contenido.
- Mantener componentes existentes que ya funcionan (ej. tarjetas de obra, bloques de info).
- Migrar por extracción, no reescritura total.

---

## 7) Ajustes SEO y accesibilidad (obligatorio)

1. Definir título por ruta (ej. “Visitas | Museo Arquidiocesano”).
2. `h1` único por página.
3. Botones con texto claro (“Ver sección completa de Visitas”).
4. Mantener navegación por teclado y foco visible.
5. Incluir enlace “Volver al inicio” en páginas internas.

---

## 8) Analítica y métricas recomendadas

Medir antes/después para validar mejora:

- Clics en menú principal por sección.
- Clics en CTA de tarjetas de Home.
- Tiempo hasta primer clic significativo.
- Porcentaje de usuarios que llega a “Visitas”.

---

## 9) Criterios de aceptación final (checklist)

- [ ] Existe Home compacta con resumen breve por opción.
- [ ] Cada opción tiene botón a vista completa.
- [ ] Menú principal abre páginas por sección (no scroll largo).
- [ ] “Visitas” tiene ruta propia y contenido completo.
- [ ] Sitio responsive en móvil/tablet/desktop.
- [ ] Build y lint pasan sin errores.
- [ ] Navegación clara, accesible y consistente.

---

## 10) Riesgos y mitigación

1. **Riesgo:** ruptura de estilos al mover bloques.
   - **Mitigación:** migración incremental por sección + revisión visual por fase.

2. **Riesgo:** enlaces internos viejos (`#ancla`) dejen de funcionar.
   - **Mitigación:** crear redirecciones simples o mantener compatibilidad temporal.

3. **Riesgo:** duplicación de contenido entre Home y páginas internas.
   - **Mitigación:** Home solo muestra resúmenes, páginas internas muestran detalle.

---

## 11) Orden recomendado de ejecución (rápido)

1. Enrutar Home + Visitas.
2. Ajustar Header a rutas.
3. Diseñar Home compacta con tarjetas.
4. Migrar resto de secciones.
5. QA responsive + accesibilidad + build final.

---

## 12) Ejemplo de copy corto para Home (guía editorial)

- **Visitas:** Horarios, tarifas, ubicación y accesibilidad para organizar tu recorrido sin fricciones.
- **Colección:** Obras y técnicas destacadas del arte religioso colonial entre los siglos XVI y XIX.
- **Historia:** Línea de tiempo del Museo, su sede histórica y su evolución institucional.

> Regla: resumen corto, acción clara, un solo CTA por tarjeta.

---

## 13) Conclusión

La solución recomendada cumple ambos puntos: 

- evita la sensación de página saturada,
- mantiene una portada única y compacta,
- y permite entrar a cada sección completa (como Visitas) con un clic.

Es el balance correcto entre claridad visual, experiencia de usuario y escalabilidad técnica.