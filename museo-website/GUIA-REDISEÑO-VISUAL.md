# Guía de Rediseño Visual

## Objetivo del rediseño

Modernizar por completo la capa visual de la aplicación web del museo sin alterar su estructura, funcionalidades, lógica, componentes ni organización actual.

Este documento define una dirección de UI/UX orientada a una apariencia más moderna, elegante, consistente y premium, manteniendo intacto el comportamiento existente. El rediseño debe entenderse como una actualización superficial y controlada sobre la base ya construida.

## Alcance

- Se permite actualizar estilos globales, tipografía, paleta de color, sombras, bordes, fondos, estados visuales, animaciones y composición visual.
- No se permite modificar flujos de navegación, reglas de negocio, contenido funcional ni estructura lógica.
- No se deben eliminar componentes existentes; solo se puede modernizar su apariencia.
- Cualquier mejora visual debe preservar la accesibilidad, la legibilidad y el rendimiento.

## Principios visuales a seguir

### 1. Modernidad sin exceso

La interfaz debe sentirse actual y refinada, evitando recursos visuales recargados o decorativos en exceso. El objetivo es transmitir una estética contemporánea, limpia y sobria.

### 2. Claridad jerárquica

Cada sección debe comunicar con rapidez qué es principal, secundario y complementario. Los títulos, subtítulos, tarjetas, botones y bloques de contenido deben tener una jerarquía evidente.

### 3. Elegancia y consistencia

Todos los elementos visuales deben compartir un mismo lenguaje de diseño. Espaciados, radios, sombras, transparencias y estados interactivos deben responder a una misma lógica en toda la interfaz.

### 4. Sensación premium

La interfaz debe proyectar una identidad más institucional, cuidada y de alto valor percibido. Para ello se recomienda usar superficies suaves, profundidad sutil, gradientes discretos y tipografía más sofisticada.

### 5. Legibilidad primero

Ningún recurso visual debe comprometer la lectura del contenido. El contraste, el tamaño tipográfico y la densidad visual deben mantenerse en niveles óptimos.

### 6. Responsividad real

La experiencia visual debe adaptarse de forma natural a escritorio, tablet y móvil, sin depender de soluciones distintas por cada dispositivo.

## Lineamientos UI/UX

### Tipografía

- Usar una tipografía más refinada, profesional y con buena lectura en pantalla.
- Definir una jerarquía tipográfica clara para títulos, subtítulos, cuerpo, etiquetas y textos auxiliares.
- Ajustar interlineado, tracking y pesos para mejorar la percepción editorial de la interfaz.
- Evitar combinaciones tipográficas inconsistentes o demasiado genéricas.

### Color

- Adoptar una paleta moderna, sobria y coherente con el carácter institucional del proyecto.
- Mantener una base limpia con acentos controlados y uso estratégico del color de marca.
- Emplear degradados discretos cuando aporten profundidad, pero sin saturar la interfaz.
- Garantizar contraste suficiente entre texto y fondo.

### Espaciado y composición

- Unificar márgenes, padding y separación entre secciones.
- Dar más aire visual a los bloques principales.
- Evitar densidad excesiva en tarjetas, listados y paneles.
- Alinear visualmente elementos relacionados para reforzar orden y lectura.

### Superficies y profundidad

- Usar sombras suaves y bordes sutiles para separar capas de contenido.
- Incorporar transparencias ligeras cuando aporten elegancia sin afectar legibilidad.
- Evitar sombras duras, contornos agresivos o efectos exagerados.

### Componentes interactivos

- Botones, cards, inputs, tabs, menus y enlaces deben tener estados hover, focus, active y disabled bien definidos.
- Los estados interactivos deben ser suaves, visibles y coherentes con el resto del sistema.
- Las transiciones deben ser cortas, elegantes y no invasivas.

### Consistencia visual

- Mantener el mismo tratamiento en toda la aplicación para encabezados, bloques de contenido, contenedores y elementos de acción.
- Repetir patrones visuales con intención, evitando variaciones innecesarias entre secciones similares.

## Recomendaciones de animaciones y motion design

### Principios de motion

- Las animaciones deben apoyar la experiencia, no dominarla.
- Toda animación debe sentirse sutil, fluida y profesional.
- Se deben priorizar transiciones de opacidad, desplazamiento leve, escala mínima y cambios de blur o brillo muy controlados.

### Recomendaciones concretas

- Usar entradas suaves para secciones principales al cargar la vista.
- Aplicar microinteracciones en botones, cards y elementos navegables.
- Emplear transiciones discretas entre estados visuales para mejorar la percepción de calidad.
- Incorporar un movimiento ambiental de fondo que aporte dinamismo sin distraer.

### Motion Background / Animated Background

El fondo animado debe cumplir estas condiciones:

- Ser sutil, elegante y no invasivo.
- Mantener la atención en el contenido principal.
- No afectar el rendimiento general de la aplicación.
- Evitar saturación visual, parpadeos o patrones agresivos.

#### Recursos visuales permitidos

- Gradientes dinámicos lentos y muy suaves.
- Formas abstractas difuminadas con movimiento ligero.
- Partículas discretas de baja densidad.
- Ondas o halos de luz con animación lenta.
- Capas translúcidas con desplazamiento mínimo.

#### Restricciones para el motion background

- No usar animaciones rápidas o repetitivas que cansen la vista.
- No interferir con la lectura del texto ni con los elementos interactivos.
- No introducir bloques pesados de JavaScript o efectos costosos sin justificación.
- Debe existir una versión visualmente estable para casos de bajo rendimiento o preferencia de movimiento reducido.

### Accesibilidad y preferencias del usuario

- Respetar `prefers-reduced-motion` cuando corresponda.
- Mantener focus visible en todos los elementos interactivos.
- No basar información importante solo en color o animación.
- Evitar contrastes inestables sobre fondos animados.

## Restricciones técnicas

- La estructura actual de la aplicación debe permanecer intacta.
- No se deben cambiar rutas, flujos, jerarquía de componentes ni lógica de negocio.
- No se deben alterar datos, contenido funcional ni mecanismos existentes.
- El rediseño debe implementarse únicamente como una capa visual.
- No eliminar componentes actuales; cualquier mejora debe reutilizar la arquitectura ya existente.
- No introducir dependencias innecesarias si el objetivo puede resolverse con estilos y animaciones ligeras.

## Criterios de modernización por componente

### `App.tsx`

- Mantener la composición general sin cambiar el comportamiento.
- Asegurar que la estructura visual global soporte la nueva dirección estética.
- Preparar el contenedor principal para el fondo animado y las nuevas capas visuales.

### `App.css`

- Convertirlo en la base de la identidad visual global.
- Definir variables de color, sombras, radios, espaciado y transiciones.
- Centralizar reglas de fondo, contenedores y superficies principales.

### `index.css`

- Normalizar tipografía, base de color, antialiasing y comportamiento global.
- Establecer una base visual limpia para toda la aplicación.
- Asegurar coherencia entre navegador, sistema y componentes.

### `src/components/layout/Header.tsx`

- Modernizar la barra superior con una apariencia más refinada.
- Mejorar jerarquía, contraste, espaciado y estados interactivos.
- Favorecer una presencia más institucional y ordenada.

### `src/components/layout/Footer.tsx`

- Dar al pie de página una composición más sólida y elegante.
- Unificar tipografía, enlaces, separadores y tratamiento de fondo.
- Mantener claridad informativa sin densidad excesiva.

### `src/components/artwork/ArtworkCard.tsx`

- Elevar la presentación visual de las tarjetas.
- Mejorar profundidad, hover, borde, sombra y jerarquía interna.
- Asegurar consistencia con el resto del sistema visual.

### `src/components/`

- Revisar cada componente existente para aplicar el mismo lenguaje visual.
- Evitar diferencias marcadas entre piezas funcionalmente similares.
- Unificar estados visuales, radios, padding y microinteracciones.

### `src/data/content.ts`

- No modificar la lógica del contenido.
- Solo asegurar que la presentación de los datos soporte el nuevo diseño sin afectar su estructura.

## Checklist de modernización

### Base visual global

- [ ] Definir una paleta moderna y consistente.
- [ ] Ajustar tipografía principal y jerarquía de textos.
- [ ] Unificar radios, sombras, bordes y transparencias.
- [ ] Establecer una base de espaciado más limpia.
- [ ] Revisar contraste y legibilidad en toda la interfaz.

### Layout general

- [ ] Mejorar alineación y composición de secciones.
- [ ] Dar más aire visual entre bloques principales.
- [ ] Mantener una lectura clara en desktop y mobile.
- [ ] Asegurar que el contenido no se vea comprimido.

### Header y navegación

- [ ] Modernizar apariencia del encabezado.
- [ ] Reforzar estados hover, active y focus.
- [ ] Mejorar jerarquía visual de navegación.

### Tarjetas y bloques de contenido

- [ ] Refinar cards, contenedores y paneles.
- [ ] Incorporar profundidad visual sutil.
- [ ] Homologar títulos, textos y acciones.

### Botones e interacciones

- [ ] Modernizar botones primarios y secundarios.
- [ ] Unificar microinteracciones.
- [ ] Mantener estados visibles y accesibles.

### Fondo animado

- [ ] Diseñar un Motion Background sutil y profesional.
- [ ] Confirmar que no degrade rendimiento.
- [ ] Validar compatibilidad con `prefers-reduced-motion`.
- [ ] Verificar que no afecte la legibilidad.

### Responsive y accesibilidad

- [ ] Validar el diseño en móvil, tablet y escritorio.
- [ ] Comprobar contraste de color suficiente.
- [ ] Mantener focus visible y navegación clara.
- [ ] Evitar dependencias visuales exclusivas de animación.

## Resultado esperado

Al finalizar el rediseño, la aplicación debe conservar exactamente su estructura y funcionamiento, pero ofrecer una experiencia visual más moderna, elegante, limpia, institucional y memorable. El usuario debe percibir una evolución clara en calidad visual sin notar cambios en la lógica del sistema.
