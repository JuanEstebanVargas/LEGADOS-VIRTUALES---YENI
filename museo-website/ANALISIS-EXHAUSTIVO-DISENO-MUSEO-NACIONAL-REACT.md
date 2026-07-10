# Análisis exhaustivo del diseño del sitio del Museo Nacional de Colombia y guía para replicarlo en React

**Sitio analizado:** https://www.museonacional.gov.co/Paginas/default.aspx  
**Fecha de análisis:** 2026-07-02  
**Objetivo:** documentar patrones de diseño, estructura de información y una estrategia práctica para implementar una versión equivalente en un proyecto React (Vite + TypeScript).

---

## 1) Resumen ejecutivo

La página principal analizada sigue un **patrón de portal institucional cultural**: alta densidad informativa, navegación global amplia, noticias destacadas, agenda de actividades y pie institucional completo.

### Rasgos principales detectados

- **Arquitectura tipo portal** con múltiples verticales: *Su visita, Exposiciones, El Museo, Colecciones, Servicios educativos, Publicaciones, etc.*
- **Home orientada a actualidad** (noticias + eventos/actividades) con bloques repetibles.
- **Modelo editorial por tarjetas/banners** para promover piezas de contenido.
- **Footer de servicio público** con contacto, canales de atención, redes y enlaces de transparencia.
- **Elementos de accesibilidad heredados de plataforma institucional** (saltos de contenido, accesibilidad, desactivar animaciones).

### Conclusión UX

El diseño privilegia:

1. **Cobertura informativa** (muchos accesos y contenidos)  
2. **Jerarquía institucional** (gobierno, museo, ciudadanía)  
3. **Actualización editorial continua** (noticias/eventos)

No está centrado en minimalismo visual, sino en **capacidad de consulta**.

---

## 2) Anatomía del diseño actual (despiece por capas)

## 2.1 Encabezado (Header)

### Función

- Identidad institucional
- Buscador
- Menú de primer nivel
- Atajos de accesibilidad

### Patrón de interacción

- Menú global persistente en la parte superior.
- Priorización de categorías funcionales sobre campañas temporales.

### Recomendación React

- Crear un `Header` fijo con:
  - barra superior de utilidad (accesibilidad, contacto, mapa del sitio)
  - barra principal (logo + búsqueda + navegación)
- Usar `position: sticky` y sombra suave para mantener contexto de navegación.

---

## 2.2 Zona hero / carrusel editorial

### Función

- Destacar noticias prioritarias con imagen + titular + resumen + CTA.

### Patrón detectado

- Banners rotativos o secuenciales.
- Títulos largos y descriptivos.
- CTA explícito: “Mayor información”.

### Recomendación React

- Componente `HeroNewsCarousel` con:
  - autoplay opcional
  - controles manuales
  - pausa en hover/focus
  - versión accesible para teclado y lector de pantalla

---

## 2.3 Bloques de contenido temático

### Estructura dominante

- Noticias
- Eventos y actividades
- Exposiciones actuales/temporales/pasadas
- Colecciones y recursos editoriales

### Patrón visual

- Títulos de sección en mayúscula y alto contraste.
- Repetición de tarjetas con imagen/título/extracto/link.
- Grid que muta a lista en móvil.

### Recomendación React

- Unificar bloques con un *design system* de módulos:
  - `SectionBlock`
  - `CardGrid`
  - `ContentCard`
  - `QuickLinksStrip`

---

## 2.4 Footer institucional

### Contenido observado

- Dirección, horario, teléfonos, correos
- Redes sociales
- Boletín y enlaces de servicio ciudadano
- Relación con entidades públicas

### Recomendación React

- `Footer` en 3 capas:
  1. contacto operativo
  2. enlaces institucionales/legales
  3. redes + copyright

---

## 2.5 Accesibilidad

### Señales detectadas

- “Saltar al contenido principal”
- “Desactivar animaciones”
- Atajos de navegación

### Recomendación React

Implementar desde inicio:

- `skip-link` visible al foco
- control global `prefers-reduced-motion`
- landmarks semánticos (`header`, `nav`, `main`, `footer`)
- foco visible AA
- contraste mínimo AA en textos/controles

---

## 3) Lenguaje visual: cómo replicarlo sin perder mantenibilidad

## 3.1 Paleta sugerida (aproximación institucional)

- Fondo claro neutro: `#F7F7F5`
- Texto principal: `#1F2937`
- Azul institucional: `#1E3A8A`
- Acento cultural (dorado): `#B68A2E`
- Gris UI: `#6B7280`
- Borde sutil: `#D1D5DB`

> Nota: la paleta debe calibrarse con captura visual final del sitio objetivo para máxima fidelidad.

## 3.2 Tipografía

- Titulares: serif editorial (p.ej. *Merriweather* / *Lora*)
- Cuerpo UI: sans legible (p.ej. *Inter*)
- Escala modular recomendada para portal:
  - H1: 40/48
  - H2: 30/38
  - H3: 24/32
  - Body: 16/26
  - Meta: 14/22

## 3.3 Ritmo y espaciado

- Base spacing: 8px
- Secciones grandes: 56–88px
- Gutter desktop: 24–32px
- Gutter móvil: 16px

---

## 4) Arquitectura de información objetivo para React

## 4.1 Mapa de navegación recomendado

- Inicio
- Su visita
- Exposiciones
- El museo
- Colecciones
- Servicios educativos
- Otros servicios
- Publicaciones
- Contacto

## 4.2 Modelo de contenidos (CMS-friendly)

Definir entidades:

- `NewsItem`
- `EventItem`
- `ExhibitionItem`
- `CollectionFeature`
- `InstitutionalLink`
- `ContactChannel`

Esto permite desacoplar UI y datos, y facilitar migración a CMS futuro.

---

## 5) Plan de implementación en tu proyecto React actual

Tu proyecto ya tiene base de rutas y layout. La mejor estrategia es **adaptar, no rehacer desde cero**.

### Archivos base actuales relevantes

- [src/RoutedApp.tsx](src/RoutedApp.tsx)
- [src/components/layout/Header.tsx](src/components/layout/Header.tsx)
- [src/components/layout/Footer.tsx](src/components/layout/Footer.tsx)
- [src/pages/HomePage.tsx](src/pages/HomePage.tsx)
- [src/data/content.ts](src/data/content.ts)
- [src/App.css](src/App.css)
- [src/App.responsive.css](src/App.responsive.css)

## 5.1 Fase 1 — Estructura de home tipo portal

### Objetivo

Transformar home en bloques institucionales equivalentes.

### Tareas

1. Reemplazar hero actual por `HeroNewsCarousel`.
2. Añadir secciones:
   - noticias destacadas
   - eventos y actividades
   - exposiciones
   - colecciones/publicaciones
3. Añadir `QuickLinksStrip` bajo el hero.

### Resultado esperado

Home con lectura editorial y acceso rápido por vertical.

## 5.2 Fase 2 — Sistema de componentes reutilizables

Crear carpeta:

- `src/components/portal/`

Componentes:

- `HeroNewsCarousel.tsx`
- `SectionBlock.tsx`
- `ContentCard.tsx`
- `AgendaList.tsx`
- `QuickLinksStrip.tsx`
- `InstitutionalBar.tsx`

## 5.3 Fase 3 — Datos desacoplados

- Partir [src/data/content.ts](src/data/content.ts) en:
  - `news.ts`
  - `events.ts`
  - `exhibitions.ts`
  - `institutional.ts`
- Tipar todo con interfaces fuertes y campos de fecha ISO.

## 5.4 Fase 4 — Accesibilidad y rendimiento

Checklist mínimo:

- Navegación por teclado en slider
- ARIA labels en icon-only controls
- `loading="lazy"` en imágenes no críticas
- compresión y formato WebP/AVIF
- `prefers-reduced-motion` para animaciones

---

## 6) Estructura de componentes recomendada (árbol)

- `AppShell`
  - `SkipLink`
  - `InstitutionalUtilityBar`
  - `Header`
    - `GlobalSearch`
    - `MainNav`
  - `Main`
    - `HeroNewsCarousel`
    - `QuickLinksStrip`
    - `SectionBlock` (Noticias)
      - `CardGrid`
        - `ContentCard`
    - `SectionBlock` (Eventos y actividades)
      - `AgendaList`
    - `SectionBlock` (Exposiciones)
      - `CardGrid`
    - `SectionBlock` (Colecciones/Publicaciones)
      - `CardGrid`
  - `Footer`
    - `ContactColumns`
    - `InstitutionalLinks`
    - `SocialLinks`

---

## 7) Sistema CSS recomendado para replicar el estilo

## 7.1 Capas

1. `tokens.css` (color, tipografía, spacing, radius, shadow)
2. `base.css` (reset + elementos globales)
3. `layout.css` (containers, grids)
4. `components/*.css`
5. `responsive.css`

## 7.2 Convenciones

- BEM o utility híbrido.
- Evitar reglas demasiado acopladas a la página.
- Usar variables CSS para tema institucional.

---

## 8) Responsive strategy

Breakpoints sugeridos:

- `sm`: 640
- `md`: 768
- `lg`: 1024
- `xl`: 1280

Comportamiento clave:

- Header colapsable desde `md`.
- Hero con ratio fijo en desktop y autoaltura en móvil.
- Grids de 4→2→1 columnas.
- Footer en stack vertical en móvil.

---

## 9) SEO y metadatos

Implementar por ruta:

- `title` único
- `meta description`
- Open Graph (imagen, título, descripción)
- Schema.org (`Organization`, `Museum`, `Event`)

En React:

- `react-helmet-async` o manejo equivalente.

---

## 10) Integración con backend/CMS (si aplica)

Opciones:

- Headless CMS (Strapi, Contentful, Sanity)
- JSON estático versionado (si el equipo editorial es pequeño)

Modelo de publicación:

- borrador → revisión → publicado
- fecha de inicio/fin para eventos
- contenido destacado por prioridad

---

## 11) Riesgos comunes al replicar este tipo de portal

1. **Sobrecarga visual** por exceso de módulos sin jerarquía.  
2. **Inconsistencia tipográfica** al mezclar estilos por sección.  
3. **Mala performance** por imágenes grandes no optimizadas.  
4. **Accesibilidad incompleta** en sliders y menús móviles.  
5. **Acoplamiento del contenido** en JSX en lugar de fuente de datos.

---

## 12) Checklist de “réplica fiel” (control de calidad)

- [ ] Header con búsqueda + navegación institucional
- [ ] Hero editorial con CTA visible
- [ ] Bloque de noticias con tarjetas consistentes
- [ ] Bloque de agenda/eventos con fecha y enlace
- [ ] Bloque de exposiciones y colecciones
- [ ] Footer completo de contacto ciudadano
- [ ] Skip link + navegación teclado + foco visible
- [ ] Performance móvil aceptable
- [ ] SEO básico por ruta

---

## 13) Propuesta de ejecución por semanas

### Semana 1

- arquitectura de componentes
- tokens visuales
- header/footer institucional

### Semana 2

- hero + noticias + eventos
- responsive principal

### Semana 3

- exposiciones/colecciones/publicaciones
- accesibilidad integral

### Semana 4

- optimización de imágenes
- SEO técnico
- QA final

---

## 14) Recomendación final para tu proyecto

Tu base actual ya está bien encaminada (ruteo, páginas y estructura de layout). La estrategia más eficiente es:

1. conservar `RoutedApp` y layout global,  
2. rediseñar `HomePage` como portal editorial institucional,  
3. modularizar bloques en `components/portal`,  
4. mover contenido a fuentes de datos tipadas,  
5. cerrar con accesibilidad + rendimiento + SEO.

Con este enfoque puedes replicar la lógica visual y estructural del sitio analizado de forma mantenible, escalable y lista para crecimiento editorial.

---

## 15) Ampliación muy exhaustiva: diseño CSS para réplica institucional en React

Esta sección aterriza **cómo diseñar y organizar el CSS** para reproducir el estilo de portal cultural/institucional con estándares de mantenibilidad, escalabilidad y accesibilidad.

## 15.1 Objetivo técnico del CSS

El CSS no debe limitarse a “verse parecido”. Debe resolver 5 objetivos simultáneos:

1. **Coherencia visual** entre home, secciones y detalle de contenidos.
2. **Escalabilidad** para más módulos editoriales sin degradar consistencia.
3. **Flexibilidad temática** (campañas, exposiciones temporales, ajustes de marca).
4. **Accesibilidad AA** con foco, contraste y motion control.
5. **Rendimiento** en móvil y desktop.

---

## 15.2 Arquitectura CSS de referencia (ITCSS + tokens + componentes)

Para tu proyecto React/Vite, la estructura recomendada:

```text
src/styles/
  00-settings/
    tokens.css
    themes.css
  01-tools/
    media.css
    utilities-mixins.css
  02-generic/
    reset.css
    normalize.css
  03-elements/
    base.css
    typography.css
  04-objects/
    container.css
    grid.css
    stack.css
    cluster.css
  05-components/
    c-header.css
    c-hero.css
    c-card.css
    c-section.css
    c-footer.css
    c-search.css
    c-chip.css
  06-utilities/
    u-spacing.css
    u-display.css
    u-visibility.css
    u-text.css
  07-overrides/
    legacy-bridge.css
```

### Justificación

- **Tokens** definen el idioma visual.
- **Objects** resuelven layout reusable (grid/stack/container).
- **Components** encapsulan presentación de cada bloque.
- **Utilities** resuelven ajustes rápidos y consistentes.
- **Overrides** sirve para transición sin romper CSS anterior.

---

## 15.3 Sistema de tokens CSS (núcleo del diseño)

Sin tokens, la réplica termina con estilos dispersos y difícil evolución.

### 15.3.1 Tokens de color

```css
:root {
  --color-bg-page: #f6f6f3;
  --color-bg-surface: #ffffff;
  --color-bg-muted: #f1f3f5;

  --color-text-primary: #1f2937;
  --color-text-secondary: #4b5563;
  --color-text-inverse: #f9fafb;

  --color-brand-primary: #1f3b7a;
  --color-brand-primary-strong: #102a5e;
  --color-brand-accent: #b68a2e;
  --color-brand-accent-soft: #d8bf86;

  --color-border-subtle: #d4d8dd;
  --color-border-strong: #9aa3ad;

  --color-state-success: #1c7c54;
  --color-state-warning: #9a6700;
  --color-state-danger: #b42318;
  --color-state-info: #175cd3;
}
```

### 15.3.2 Tokens tipográficos

```css
:root {
  --font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Lora', Georgia, 'Times New Roman', serif;

  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 2rem;

  --leading-tight: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
}
```

### 15.3.3 Tokens de spacing y radius

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 0.875rem;
  --radius-xl: 1.25rem;
  --radius-pill: 999px;
}
```

### 15.3.4 Tokens de sombra y capas

```css
:root {
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-sm: 0 2px 6px rgba(16, 24, 40, 0.08);
  --shadow-md: 0 8px 20px rgba(16, 24, 40, 0.12);
  --shadow-lg: 0 16px 40px rgba(16, 24, 40, 0.16);

  --z-base: 1;
  --z-dropdown: 20;
  --z-sticky: 30;
  --z-modal: 100;
}
```

---

## 15.4 Tipografía editorial para portal cultural

### Reglas recomendadas

- Titulares de sección con serif para peso institucional.
- Cuerpo y UI con sans para legibilidad.
- Anchura máxima de párrafo: 60–75 caracteres.
- Interlineado amplio en bloques informativos densos.

### Escala fluida con `clamp()`

```css
.display-title {
  font-family: var(--font-serif);
  font-size: clamp(1.875rem, 1.2rem + 2.2vw, 3rem);
  line-height: 1.15;
  letter-spacing: 0.01em;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(1.375rem, 1rem + 1.1vw, 2rem);
  line-height: 1.25;
}

.body-copy {
  font-family: var(--font-sans);
  font-size: var(--text-md);
  line-height: var(--leading-relaxed);
}
```

---

## 15.5 Layout CSS: container, grid, stack y densidad

### 15.5.1 Container institucional

```css
.o-container {
  width: min(1200px, 100% - 2rem);
  margin-inline: auto;
}
```

### 15.5.2 Grid editorial adaptable

```css
.o-grid {
  display: grid;
  gap: var(--space-6);
}

.o-grid--cards {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

@media (max-width: 1024px) {
  .o-grid--cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .o-grid--cards {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
}
```

### 15.5.3 Stack para ritmo vertical

```css
.o-stack > * + * {
  margin-top: var(--stack-space, 1rem);
}

.o-stack--lg {
  --stack-space: 2rem;
}
```

---

## 15.6 Header CSS: comportamiento, contraste y estado activo

### Objetivos

- Mantener navegación visible.
- Estado activo inequívoco por ruta.
- Menú móvil con foco seguro.

```css
.c-header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(10px);
  background: color-mix(in srgb, var(--color-brand-primary) 88%, white 12%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.18);
}

.c-header__nav-link {
  color: var(--color-text-inverse);
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  padding: 0.45rem 0.75rem;
  transition: background 200ms ease, border-color 200ms ease;
}

.c-header__nav-link:hover,
.c-header__nav-link:focus-visible {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(255, 255, 255, 0.32);
}

.c-header__nav-link[aria-current='page'] {
  background: var(--color-brand-accent);
  color: #1d1d1d;
}
```

---

## 15.7 Hero CSS: identidad visual sin afectar performance

### Reglas clave

- Imagen principal con overlay para contraste.
- Texto limitado a ancho legible.
- CTA primario y secundario diferenciados.

```css
.c-hero {
  position: relative;
  border-radius: var(--radius-xl);
  overflow: clip;
  min-height: clamp(340px, 46vw, 560px);
  box-shadow: var(--shadow-lg);
}

.c-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0.12) 0%, rgba(0, 0, 0, 0.58) 100%),
    radial-gradient(circle at 15% 25%, rgba(182, 138, 46, 0.28), transparent 48%);
}

.c-hero__content {
  position: relative;
  z-index: 1;
  color: var(--color-text-inverse);
  max-width: 68ch;
  padding: clamp(1rem, 2.5vw, 2.5rem);
}
```

---

## 15.8 Tarjetas CSS (noticias/exposiciones/colecciones)

### Principios

- Misma estructura base, variantes por contexto.
- Altura equilibrada para evitar “mosaico roto”.
- Microinteracciones suaves (no distractoras).

```css
.c-card {
  display: grid;
  grid-template-rows: auto 1fr auto;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.c-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.c-card__media {
  aspect-ratio: 16 / 9;
  background-size: cover;
  background-position: center;
}

.c-card__body {
  padding: var(--space-4);
}

.c-card__title {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  line-height: var(--leading-tight);
  margin-bottom: var(--space-2);
}

.c-card__meta {
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
}
```

---

## 15.9 Secciones CSS: patrones repetibles y consistentes

```css
.c-section {
  padding-block: clamp(2rem, 4vw, 4.5rem);
}

.c-section__header {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.c-section__title {
  font-family: var(--font-serif);
  font-size: clamp(1.35rem, 1rem + 1vw, 2rem);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.c-section__link {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-brand-primary);
}
```

---

## 15.10 Footer CSS institucional robusto

```css
.c-footer {
  margin-top: var(--space-16);
  padding-block: var(--space-10);
  background: #0f1f45;
  color: #ecf1f8;
}

.c-footer__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: var(--space-8);
}

.c-footer a {
  color: #f4d58c;
}

@media (max-width: 900px) {
  .c-footer__grid {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }
}
```

---

## 15.11 Responsive CSS avanzado (más allá de media queries básicas)

### Recomendaciones

1. Preferir `clamp()` para tipografía y spacing fluido.
2. Usar `aspect-ratio` para medios y prevenir CLS.
3. Consolidar breakpoints (evitar “breakpoint sprawl”).
4. Priorizar mobile-first.

### Convención de breakpoints

```css
@custom-media --sm (width >= 40rem);
@custom-media --md (width >= 48rem);
@custom-media --lg (width >= 64rem);
@custom-media --xl (width >= 80rem);
```

Si no usas PostCSS custom media, mantener `@media (min-width: 640px)` etc.

---

## 15.12 Accesibilidad CSS: implementación de nivel profesional

### 15.12.1 Focus visible consistente

```css
:focus-visible {
  outline: 3px solid var(--color-brand-accent);
  outline-offset: 2px;
}
```

### 15.12.2 Skip link

```css
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
}

.skip-link:focus {
  left: 1rem;
  top: 1rem;
  z-index: 999;
  background: #fff;
  color: #000;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
}
```

### 15.12.3 Reducir movimiento

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 15.13 Performance CSS (muy importante en portal multimedia)

### Buenas prácticas clave

- Evitar selectores muy profundos (costo de matching).
- Evitar sombras excesivas en listas grandes.
- Evitar animar `top/left`; animar `transform/opacity`.
- Minimizar repaints en hover masivo.
- Usar `content-visibility: auto` en bloques largos no críticos.

```css
.c-section[data-deferred='true'] {
  content-visibility: auto;
  contain-intrinsic-size: 900px;
}
```

---

## 15.14 Estrategia de temas y campañas temporales

Para eventos del museo (Semana Santa, exposiciones especiales, aniversarios), evita duplicar CSS completo.

### Modelo recomendado

```css
:root[data-theme='default'] {
  --color-brand-primary: #1f3b7a;
  --color-brand-accent: #b68a2e;
}

:root[data-theme='campaign-semana-santa'] {
  --color-brand-primary: #3d1f62;
  --color-brand-accent: #d9b86a;
}
```

Con esto puedes cambiar el carácter visual por campaña con mínimo riesgo.

---

## 15.15 Convenciones de naming CSS recomendadas

- Componente: `.c-card`, `.c-header`
- Objeto layout: `.o-grid`, `.o-stack`
- Utility: `.u-mt-4`, `.u-text-center`
- Estado: `.is-active`, `.is-open`
- JS hook: `.js-carousel` (sin estilos visuales)

Regla clave: **nunca mezclar clases de estado con semántica de componente** en un mismo selector complejo.

---

## 15.16 Integración CSS + React (patrón práctico)

### Recomendación

1. Mantener CSS modular por componente.
2. Importar estilos por feature o layout.
3. Usar utilidades para variaciones pequeñas.
4. Evitar inline styles salvo variables dinámicas (ej. imagen de fondo).

Ejemplo de uso dinámico controlado:

```tsx
<article
  className="c-card"
  style={{ '--card-image': `url(${item.image})` } as React.CSSProperties}
>
  ...
</article>
```

```css
.c-card__media {
  background-image: var(--card-image);
}
```

---

## 15.17 Guía de migración desde tu CSS actual

Tu proyecto ya posee base visual fuerte en [src/App.css](src/App.css) y [src/App.responsive.css](src/App.responsive.css). Para evolucionar sin romper:

### Paso A

- Mover variables globales a `tokens.css`.

### Paso B

- Extraer bloques por componente:
  - header → `c-header.css`
  - footer → `c-footer.css`
  - preview cards → `c-card.css`
  - hero portada → `c-hero.css`

### Paso C

- Reemplazar valores hardcoded por tokens.

### Paso D

- Reducir especificidad de selectores (evitar encadenamientos largos).

### Paso E

- Crear `legacy-bridge.css` para mantener compatibilidad temporal.

---

## 15.18 Checklist CSS de nivel producción

- [ ] Todos los colores provienen de tokens.
- [ ] Escala tipográfica consistente por rol.
- [ ] Grillas responden 4→2→1 sin saltos bruscos.
- [ ] Header y menú móvil pasan prueba de teclado.
- [ ] Focus visible en enlaces, botones y controles.
- [ ] Contraste AA validado en texto/CTA.
- [ ] Menor movimiento con `prefers-reduced-motion`.
- [ ] Sin `!important` salvo utilidades de accesibilidad justificadas.
- [ ] Sin duplicación de reglas por campaña/temporada.
- [ ] Lighthouse CSS/Performance en rango alto.

---

## 15.19 Errores CSS frecuentes al replicar portales institucionales

1. Definir tamaños absolutos rígidos que colapsan en móvil.
2. Exceso de `position: absolute` en cabeceras y hero.
3. Contrastes insuficientes sobre imágenes de banner.
4. Tarjetas con alturas desbalanceadas y CTA inestable.
5. Breakpoints demasiados específicos por página.
6. Acoplar estilos al texto del contenido (fragilidad editorial).
7. Repetir reglas en cada componente en lugar de tokens/objetos.

---

## 15.20 Roadmap CSS recomendado (implementación real en tu repo)

### Sprint 1 (base)

- crear `tokens.css`, `base.css`, `layout.css`
- migrar header/footer

### Sprint 2 (home)

- hero, tarjetas, bloques de sección, quick links

### Sprint 3 (hardening)

- accesibilidad avanzada, motion, QA responsive

### Sprint 4 (optimización)

- limpieza de legacy rules, reducción de peso CSS, auditoría final

---

## 15.21 Cierre técnico

Si replicas el diseño institucional con esta arquitectura CSS, obtendrás un front React que:

- se ve sólido y editorial,
- escala a nuevos contenidos sin degradarse,
- soporta campañas visuales con bajo costo,
- y mantiene control profesional de accesibilidad y rendimiento.

Este es el punto crítico: **la fidelidad visual no depende de copiar estilos sueltos, sino de diseñar un sistema CSS gobernado por tokens, layout objects y componentes estables**.
