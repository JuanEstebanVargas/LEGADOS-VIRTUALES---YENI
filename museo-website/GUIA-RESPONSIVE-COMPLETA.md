# Guía completa y auto-contenida de implementación responsive

## 1) Objetivo y garantías

Este documento define **todas las reglas visuales y de layout** para hacer responsive la web del Museo en **mobile, tablet, desktop y pantallas grandes**, sin cambiar la lógica funcional.

### Garantías obligatorias

- Se conserva el diseño desktop actual **sin alteraciones en estilos base**.
- Los cambios son solo por media queries y ajustes de distribución.
- No se modifica JavaScript/TypeScript, eventos, estados ni comportamiento de componentes.
- Se cubren todos los componentes presentes en la página y además los patrones UI globales (formularios, tablas, modales, sidebar).

---

## 2) Inventario completo de componentes (cobertura total)

### Estructura general

1. Shell y layout principal
   - `.site-shell`, `main`, `.content-section`, `.content-section-dark`
2. Header / navegación
   - `.header-bar`, `.header-inner`, `.brand-mark`, `.header-toggle`, `.header-nav`, `.header-nav__link`
3. Hero / portada
   - `.portada`, `.portada-ornamento`, `.portada-sello`, `.portada-badges`, `.badge`, `.hero-actions`, `.button`, `.portada-scroll`
4. Sección Identidad institucional
   - `.descripcion-destacada`, `.manifiesto-box`, `.mv-grid`, `.mv-card`, `.mv-accordion`, `.valores-grid`, `.valor-card`
5. Sección Historia
   - `.historia-resumen-grid`, `.historia-mini-card`, `.timeline`, `.tl-item`, `.directoras-toggle`, `.directora-row-compact`, `.decreto-chip-grid`, `.custodios-toggle`, `.custodio-row-compact`
6. Sección Colección y multimedia
   - `.tecnicas-grid`, `.tecnica-item`, `.artwork-grid`, `.artwork-card`, `.artwork-media`, `.artwork-body`, `.artwork-meta`
7. Sección Visitas
   - `.visit-accordion-list`, `.visit-detail-card`, `.visit-rows`, `.visit-row`, `.visit-map-embed-wrap`, `.visit-map-embed`, `.visit-access-grid`, `.visit-access-item`, `.visit-note`
8. Sección Programación / Patrimonio / Investigación
   - `.program-accordion-list`, `.program-axis-card`, `.program-axis-card-wide`, `.program-axis-list`, `.info-band`
9. Sección Contacto
   - `.contact-grid`, `.info-card`, links y mapa embed
10. Footer
   - `.footer-bar`, `.footer-inner`

### Patrones UI globales (definidos en estilos globales)

- Formularios: `input`, `select`, `textarea`, `button`
- Tablas: `table`, `th`, `td`
- Modales: `dialog`
- Sidebars: `.sidebar`, `[role='complementary']`

---

## 3) Sistema de breakpoints (explícito)

> Enfoque recomendado para este proyecto: **Desktop-first preservado + adaptaciones responsive**.
> 
> - Desktop actual se mantiene como baseline.
> - Se agregan ajustes con `max-width` hacia abajo.
> - Se agregan mejoras opcionales con `min-width` para pantallas grandes.

| Alias | Rango | Uso principal |
|---|---:|---|
| `xs` | `0px – 479px` | móviles pequeños |
| `sm` | `480px – 639px` | móviles grandes |
| `md` | `640px – 979px` | tablet vertical / móvil horizontal |
| `lg` | `980px – 1279px` | tablet horizontal / laptop chica |
| `xl` | `1280px – 1599px` | desktop estándar |
| `xxl` | `>=1600px` | pantallas grandes |

### Reglas de oro

1. **No editar reglas base desktop existentes**.
2. Toda adaptación en bloques `@media`.
3. Priorizar `grid` y `flex`.
4. Evitar anchos fijos salvo casos controlados (ej. `max-width`).

---

## 4) Matriz de comportamiento por breakpoint

| Componente | xs/sm | md | lg/xl | xxl |
|---|---|---|---|---|
| Header/NAV | menú hamburguesa + panel desplegable 1–2 columnas | menú hamburguesa o wrap | navegación horizontal completa | horizontal + más aire lateral |
| Hero | botones en columna, tipografía reducida, scroll hint oculto | botones wrap | layout original | escalado suave de títulos |
| Grids (cards) | 1 columna | 1–2 columnas según bloque | layout desktop original (2/3 col según sección) | ampliar `max-width` contenedor |
| Timeline | eje compacto, menor sangría | sangría media | layout original | igual desktop |
| Directivas/Custodios | filas apiladas | filas apiladas | 4 columnas internas (actual) | igual desktop |
| Visitas (rows/mapa) | label/value apilado, mapa altura menor | label/value apilado o 2 col | 2 columnas internas | mapas más anchos (sin deformar) |
| Programación/Patrimonio | acordeones 1 columna | 1 columna | 2 columnas + cards wide | 2 columnas más espacios |
| Contacto | 1 columna | 1 columna | 3 columnas | 3 columnas con mayor separación |
| Tabla (global) | modo scroll horizontal | scroll horizontal | tabla normal | tabla normal |
| Modal (global) | ancho casi completo | ancho fluido | ancho controlado | ancho controlado |
| Sidebar (global) | pasa debajo del contenido | debajo o lateral estrecho | lateral | lateral más ancho opcional |

---

## 5) Implementación SCSS/CSS completa (lista para usar)

> Este bloque es **auto-contenido** y cubre todos los componentes.
> 
> Debe agregarse **después** de los estilos base para no romper desktop.

```scss
/* =========================================================
   Responsive layer (NO altera base desktop)
   ========================================================= */

/* Tokens de breakpoint */
$bp-xs-max: 479px;
$bp-sm-max: 639px;
$bp-md-max: 979px;
$bp-lg-max: 1279px;
$bp-xl-min: 1280px;
$bp-xxl-min: 1600px;

/* 0) Ajustes transversales seguros */
html,
body {
  overflow-x: clip;
}

img,
iframe,
video {
  max-width: 100%;
  height: auto;
}

.visit-map-embed {
  width: 100%;
  display: block;
}

/* =========================================================
   1) XL / XXL (desktop grande)
   ========================================================= */
@media (min-width: $bp-xxl-min) {
  main,
  .header-inner,
  .footer-inner {
    width: min(1400px, calc(100% - 3rem));
  }

  .content-section {
    padding: clamp(1.5rem, 2.2vw, 2.8rem);
  }

  .artwork-grid,
  .contact-grid,
  .story-grid,
  .info-grid,
  .decreto-chip-grid,
  .historia-resumen-grid {
    gap: 1.25rem;
  }
}

/* =========================================================
   2) LG (<= 1279)
   ========================================================= */
@media (max-width: $bp-lg-max) {
  .header-inner {
    padding-inline: 0.95rem;
  }

  .header-nav {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .header-nav__link {
    padding: 0.68rem 0.8rem;
  }
}

/* =========================================================
   3) MD (<= 979) - tablet y transición
   ========================================================= */
@media (max-width: $bp-md-max) {
  /* Layout principal */
  main,
  .header-inner,
  .footer-inner {
    width: min(100% - 1.25rem, 1220px);
  }

  .content-section {
    padding: 1.1rem;
  }

  /* Grids: una columna para lectura estable */
  .mv-grid,
  .valores-grid,
  .story-grid,
  .contact-grid,
  .info-grid,
  .program-accordion-list,
  .visit-accordion-list,
  .visit-access-grid,
  .artwork-grid,
  .info-band,
  .historia-resumen-grid,
  .decreto-chip-grid {
    grid-template-columns: 1fr;
  }

  .visit-row {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .program-axis-card-wide,
  .visit-detail-card-wide {
    grid-column: auto;
  }

  /* Filas compactas de directoras/custodios */
  .directora-row-compact,
  .custodio-row-compact {
    grid-template-columns: 1fr;
    align-items: flex-start;
  }

  .dir-bio-compact,
  .custodio-bio {
    padding: 0.2rem 0.8rem 0.72rem;
  }

  .directora-row-compact .dir-tag,
  .directora-row-compact .accordion-action,
  .custodio-row-compact .custodio-tag,
  .custodio-row-compact .accordion-action {
    justify-self: start;
    text-align: left;
  }

  /* Mapa y contenido denso */
  .visit-map-embed {
    height: 220px;
  }

  .info-band {
    grid-template-columns: 1fr;
    gap: 0.9rem;
  }
}

/* =========================================================
   4) SM (<= 639) - móvil principal
   ========================================================= */
@media (max-width: $bp-sm-max) {
  /* Header móvil */
  .header-bar {
    position: sticky;
    top: 0;
    padding: 0.45rem 0 0.35rem;
  }

  .header-inner {
    width: min(100% - 0.75rem, 1220px);
    gap: 0.58rem;
    padding: 0.75rem 0.8rem;
    border-radius: 18px;
    position: relative;
  }

  .brand-mark {
    max-width: calc(100% - 56px);
    white-space: normal;
  }

  .brand-mark__title {
    font-size: 0.62rem;
  }

  .brand-mark__detail {
    font-size: 0.5rem;
  }

  .header-toggle {
    display: inline-flex;
    margin-left: auto;
    flex: 0 0 auto;
  }

  .header-nav {
    position: absolute;
    left: 0;
    right: 0;
    top: calc(100% + 0.62rem);
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.45rem;
    padding: 0.72rem;
    border-radius: 16px;
    border: 1px solid rgba(240, 207, 109, 0.25);
    background: rgba(34, 20, 60, 0.98);
    box-shadow: 0 20px 44px rgba(23, 11, 39, 0.38);
    transform: translateY(-10px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    max-height: calc(100vh - 84px);
    overflow: auto;
    scrollbar-width: none;
  }

  .header-nav.is-open {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .header-nav::-webkit-scrollbar {
    display: none;
  }

  .header-nav li,
  .header-nav a {
    width: 100%;
  }

  .header-nav a {
    min-height: 40px;
    text-align: center;
    border-radius: 11px;
    font-size: 0.52rem;
    white-space: normal;
    line-height: 1.1;
    background: rgba(255, 255, 255, 0.08);
  }

  /* Main + secciones */
  main {
    width: min(100% - 0.75rem, 1220px);
    padding-bottom: 2.4rem;
  }

  .portada,
  .content-section {
    border-radius: 20px;
  }

  .content-section {
    padding: 0.95rem;
  }

  .section-heading {
    gap: 0.62rem;
    margin-bottom: 0.95rem;
  }

  /* Hero */
  .portada {
    min-height: calc(72svh - 32px);
    padding: 3.9rem 0.88rem 1.85rem;
  }

  .portada h1 {
    max-width: 16ch;
    font-size: clamp(1.65rem, 7.2vw, 2.3rem);
  }

  .portada-badges {
    gap: 0.32rem;
  }

  .badge {
    min-height: 24px;
    padding: 0.22rem 0.5rem;
    font-size: 0.48rem;
  }

  .portada-scroll {
    display: none;
  }

  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .button {
    width: 100%;
  }

  /* Tipografía / bloques */
  h2 {
    font-size: clamp(1.45rem, 7.2vw, 2rem);
  }

  h3 {
    font-size: 1.2rem;
  }

  .descripcion-destacada {
    margin: 1rem 0;
    padding-left: 1rem;
    font-size: 1rem;
  }

  .manifiesto-box {
    margin: 1.15rem 0;
    padding: 1.3rem 1.05rem;
  }

  .manifiesto-box::before {
    top: -8px;
    left: 4px;
  }

  .mv-card,
  .valor-card,
  .pestana-card,
  .directora-card,
  .tecnica-item,
  .info-card,
  .timeline-item,
  .decreto-item {
    padding: 0.98rem;
  }

  /* Historia */
  .timeline {
    margin: 1.3rem 0;
    padding-left: 1.35rem;
  }

  .timeline-compact {
    margin: 0.8rem 0;
  }

  .tl-dot {
    left: -1.35rem;
  }

  .tl-item-compact {
    margin-bottom: 0.6rem;
    padding-bottom: 0.6rem;
  }

  .tl-titulo {
    font-size: 1.08rem;
  }

  .historia-subtitle {
    margin-top: 0.3rem;
    font-size: 0.94rem;
  }

  .custodios-toggle {
    padding: 0.58rem 0.65rem;
  }

  .custodios-toggle summary h3 {
    font-size: 0.9rem;
  }

  .custodio-bio {
    font-size: 0.7rem;
  }

  /* Visitas y mapas */
  .visit-map-embed {
    height: 190px;
  }

  .visit-map-link {
    width: 100%;
    justify-content: center;
  }

  /* Patrimonio */
  .info-band {
    grid-template-columns: 1fr;
    padding: 1rem;
    gap: 0.72rem;
  }

  .info-band h2 {
    font-size: 1.45rem;
  }

  /* Obras */
  .artwork-card .artwork-body {
    padding: 0.9rem;
  }

  .artwork-card .artwork-meta {
    flex-direction: column;
    gap: 0.24rem;
    align-items: flex-start;
  }

  /* Footer */
  .footer-inner {
    gap: 0.35rem;
    font-size: 0.86rem;
  }

  /* UI global: tabla / modal / sidebar */
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  dialog {
    width: min(100% - 1rem, 560px);
    margin: auto;
    padding: 1rem;
  }

  .sidebar,
  [role='complementary'] {
    width: 100%;
  }
}

/* =========================================================
   5) XS (<= 479) - microajustes móviles pequeños
   ========================================================= */
@media (max-width: $bp-xs-max) {
  .header-nav {
    grid-template-columns: 1fr;
  }

  .portada {
    padding-top: 3.5rem;
    min-height: calc(68svh - 24px);
  }

  .portada h1 {
    font-size: clamp(1.45rem, 8vw, 1.95rem);
  }

  .section-label,
  .program-axis-id,
  .accordion-action,
  .visit-lbl {
    letter-spacing: 0.08em;
  }

  .program-axis-list li,
  .visit-val,
  .tecnica-desc,
  .valor-desc,
  .dir-bio,
  .custodio-bio {
    font-size: 0.78rem;
  }

  .visit-map-embed {
    height: 170px;
  }
}

/* =========================================================
   6) Preferencia de movimiento reducido
   ========================================================= */
@media (prefers-reduced-motion: reduce) {
  .site-shell::before,
  .site-shell::after,
  .portada::before,
  .portada::after,
  .portada-scroll::after,
  .content-section {
    animation: none !important;
  }
}
```

---

## 6) Ejemplos por componente (HTML + SCSS)

### 6.1 Header + menú responsive

```html
<nav class="header-bar" aria-label="Navegación principal">
  <div class="header-inner">
    <a class="brand-mark" href="#inicio">
      <span class="brand-mark__title">Museo Arquidiocesano</span>
      <span class="brand-mark__detail">Popayán</span>
    </a>

    <button class="header-toggle" aria-expanded="false" aria-controls="mobile-navigation">
      <span></span><span></span><span></span>
    </button>

    <ul id="mobile-navigation" class="header-nav">
      <li><a class="header-nav__link" href="#inicio">Inicio</a></li>
      <li><a class="header-nav__link" href="#contacto">Contacto</a></li>
    </ul>
  </div>
</nav>
```

```scss
/* Mantener desktop base.
   Solo en <=639px habilitar toggle y panel overlay (bloque ya incluido arriba). */
```

### 6.2 Grids de cards (valores, técnicas, obras, contacto)

```html
<div class="valores-grid">
  <article class="valor-card">...</article>
  <article class="valor-card">...</article>
  <article class="valor-card">...</article>
</div>
```

```scss
/* Desktop: 3 columnas (base). Tablet/mobile: 1 columna (<=979px). */
```

### 6.3 Acordeones (visitas, programación, patrimonio, investigación)

```html
<details class="program-axis-card">
  <summary>
    <div>
      <div class="program-axis-id">Eje 01</div>
      <h3>Título</h3>
      <p class="accordion-preview">Resumen</p>
    </div>
    <span class="accordion-action">Ver detalle</span>
  </summary>
  <ul class="program-axis-list"><li>Item</li></ul>
</details>
```

```scss
/* Desktop: 2 columnas en .program-accordion-list.
   <=979px: 1 columna. No tocar markup ni estado open/close del <details>. */
```

### 6.4 Filas compactas de directoras/custodios

```html
<summary class="directora-row-compact">
  <div class="dir-periodo">2022—Presente</div>
  <div class="dir-main">
    <div class="dir-nombre">Nombre</div>
    <div class="dir-num">Rol</div>
  </div>
  <span class="dir-tag">Tag</span>
  <span class="accordion-action">Ver perfil</span>
</summary>
```

```scss
/* Desktop: 4 columnas internas. <=979px: apilado 1 columna para evitar recorte. */
```

### 6.5 Formularios, tablas, modales y sidebar (global)

```html
<form>
  <input type="text" placeholder="Nombre" />
  <textarea placeholder="Mensaje"></textarea>
  <button type="submit">Enviar</button>
</form>

<table>
  <thead><tr><th>Campo</th><th>Valor</th></tr></thead>
  <tbody><tr><td>A</td><td>B</td></tr></tbody>
</table>

<dialog open>Contenido modal</dialog>
<aside class="sidebar">Contenido lateral</aside>
```

```scss
/* <=639px:
   - table: overflow horizontal
   - dialog: width fluida y padding reducido
   - sidebar: 100% de ancho */
```

---

## 7) Qué NO hacer (para preservar desktop y funcionalidad)

1. No reemplazar reglas base de `.header-nav`, `.content-section`, `.artwork-grid`, etc.
2. No cambiar clases en JSX.
3. No tocar `useState`, `onClick`, `details/summary`, atributos ARIA.
4. No forzar alturas fijas en cards de contenido variable.
5. No introducir posiciones absolutas hacky para resolver overflow.

---

## 8) Checklist de validación final

### Resoluciones mínimas a probar

- 360×640 (`xs`)
- 390×844 (`sm`)
- 768×1024 (`md`)
- 1024×768 (`lg`)
- 1366×768 (`xl`)
- 1920×1080 (`xxl`)

### Criterios de aceptación

- No existe scroll horizontal accidental.
- Header móvil abre/cierra correctamente y no tapa interacción.
- Todos los acordeones son legibles y accionables.
- Mapa e iframes no desbordan.
- Cards, textos y botones mantienen jerarquía visual.
- Desktop mantiene exactamente el aspecto previo.
- No hay cambios en eventos ni en comportamiento funcional.

---

## 9) Orden recomendado de implementación (paso a paso)

1. Crear un archivo de capa responsive (ej. `src/App.responsive.scss`) e importarlo después de estilos base.
2. Copiar el bloque de la sección 5 completo.
3. Verificar primero `<=639px`, luego `<=979px`, luego `>=1600px`.
4. Hacer QA visual por sección: Header → Hero → Identidad → Historia → Colección → Visitas → Programación/Patrimonio/Investigación → Contacto → Footer.
5. Confirmar build sin errores.

---

Con este documento, cualquier desarrollador puede replicar el comportamiento responsive de forma íntegra sin contexto adicional y sin comprometer el diseño desktop ni la funcionalidad existente.
