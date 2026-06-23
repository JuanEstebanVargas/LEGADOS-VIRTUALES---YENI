# Guía rápida: aumentar un poco el tamaño de letra en toda la página

Este documento explica cómo hacer que el texto del sitio sea un poco más grande de forma global y controlada.

## Opción recomendada (global y segura)

1. Abre el archivo de estilos globales:
   - `src/index.css`
2. Agrega (o ajusta) esta regla:

```css
html {
  font-size: 106.25%; /* 17px aprox. en vez de 16px */
}
```

Con ese cambio, la mayoría de textos que usan `rem` crecerán ligeramente en toda la web.

---

## Si quieres un cambio más suave

Usa alguno de estos valores:

- `103.125%` (16.5px aprox.)
- `104%` (16.64px aprox.)
- `105%` (16.8px aprox.)

Ejemplo:

```css
html {
  font-size: 104%;
}
```

---

## Importante para mantener consistencia

- Prioriza unidades `rem` en títulos, párrafos y botones.
- Evita mezclar muchos tamaños en `px`, porque no escalan de forma uniforme.
- Verifica en móvil y desktop después del ajuste.

---

## Dónde revisar en este proyecto

- `src/index.css` (base global)
- `src/App.css` y `src/App.responsive.css` (ajustes de componentes y responsive)

Si algunas secciones no cambian, probablemente tengan tamaños fijos en `px`; en esos casos conviene migrarlos a `rem`.
