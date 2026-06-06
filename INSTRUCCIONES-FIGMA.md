# 📚 Guía Completa: Desarrollo de Sitio Web para Museo
## Manual Técnico Detallado - Frontend Moderno

---

## 📋 Tabla de Contenidos

1. [Descripción del Proyecto](#1-descripción-del-proyecto)
2. [Estructura del Sitio](#2-estructura-del-sitio)
3. [Arquitectura del Frontend](#3-arquitectura-del-frontend)
4. [Stack Tecnológico](#4-stack-tecnológico)
5. [Estructura de Carpetas](#5-estructura-de-carpetas)
6. [Diseño UI/UX](#6-diseño-uiux)
7. [Diseño Responsive](#7-diseño-responsive)
8. [Funcionalidades Clave](#8-funcionalidades-clave)
9. [Manejo de Contenido](#9-manejo-de-contenido)
10. [Animaciones e Interactividad](#10-animaciones-e-interactividad)
11. [Optimización de Rendimiento](#11-optimización-de-rendimiento)
12. [SEO Básico](#12-seo-básico)
13. [Despliegue](#13-despliegue)
14. [Buenas Prácticas](#14-buenas-prácticas)
15. [Checklist Final](#15-checklist-final)

---

## 1. Descripción del Proyecto

### 1.1 Objetivo del Sitio Web

Crear una **experiencia digital inmersiva** que permita a los visitantes:
- Explorar colecciones del museo desde cualquier lugar
- Conocer la historia y misión institucional
- Descubrir exposiciones actuales y futuras
- Realizar recorridos virtuales 360°
- Interactuar con la comunidad del museo
- Planificar visitas presenciales

### 1.2 Público Objetivo

**Primario:**
- Estudiantes e investigadores (18-35 años)
- Familias con niños (30-50 años)
- Turistas culturales (todas las edades)

**Secundario:**
- Educadores y profesores
- Historiadores del arte
- Medios de comunicación

### 1.3 Tipo de Museo

Este manual aplica para:
- ✅ Museos de arte (clásico, moderno, contemporáneo)
- ✅ Museos históricos
- ✅ Museos de ciencias
- ✅ Galerías de arte
- ✅ Centros culturales

### 1.4 Características del Proyecto

```
Tipo: Single Page Application (SPA) o Multi-Page Application (MPA)
Frontend: React + TypeScript
Estilo: Tailwind CSS v4
Animaciones: Framer Motion
Estado: React Hooks (useState, useContext)
Despliegue: Vercel / Netlify
Backend: Opcional (Servicios externos o APIs simples)
```

---

## 2. Estructura del Sitio

### 2.1 Mapa del Sitio (Sitemap)

```
📁 Museo Website
├── 🏠 Inicio (Home)
├── 📖 Historia (About/History)
├── 🎨 Colecciones (Collections)
│   ├── Arte Barroco
│   ├── Arte Renacentista
│   └── Arte Contemporáneo
├── 🖼️ Exposiciones (Exhibitions)
│   ├── Actuales
│   └── Pasadas
├── 🌐 Recorrido Virtual 360° (Virtual Tour)
├── 💬 Foro / Comunidad (Community)
├── 📰 Noticias y Eventos (News & Events)
├── ℹ️ Información Práctica (Visit Info)
│   ├── Horarios
│   ├── Ubicación
│   └── Precios
└── 📧 Contacto (Contact)
```

### 2.2 Secciones Detalladas

#### **Página de Inicio (Home)**
- Hero section con imagen impactante
- Breve introducción al museo
- Exposiciones destacadas
- Acceso rápido a recorrido virtual
- Últimas noticias/eventos
- Call-to-action para planificar visita

#### **Historia (About)**
- Timeline histórico del museo
- Misión y visión
- Equipo directivo
- Arquitectura del edificio
- Logros y reconocimientos

#### **Colecciones (Collections)**
- Catálogo completo de obras
- Filtros por época, artista, técnica
- Vista de grid o lista
- Búsqueda de obras
- Detalle de cada obra (modal o página dedicada)

#### **Recorrido Virtual 360°**
- Navegación inmersiva por salas
- Hotspots interactivos en obras
- Vista detallada de obras seleccionadas
- Mapa de navegación
- Controles de visualización

#### **Noticias y Eventos**
- Grid de noticias con paginación
- Categorías (exposiciones, talleres, conferencias)
- Sistema de fechas
- Detalle de cada noticia

#### **Contacto**
- Formulario de contacto
- Mapa de ubicación (Google Maps / OpenStreetMap)
- Información de contacto
- Horarios de atención

---

## 3. Arquitectura del Frontend

### 3.1 Patrón de Diseño: Component-Based Architecture

```
┌─────────────────────────────────────┐
│         App Component (Root)        │
└─────────────────┬───────────────────┘
                  │
      ┌───────────┴───────────┐
      │                       │
┌─────▼─────┐         ┌──────▼──────┐
│  Layout   │         │   Router    │
│ Component │         │  Component  │
└─────┬─────┘         └──────┬──────┘
      │                      │
      ├─ Header              ├─ HomePage
      ├─ Navigation          ├─ AboutPage
      ├─ Footer              ├─ CollectionsPage
      └─ Sidebar (opt)       ├─ VirtualTourPage
                             └─ ContactPage
```

### 3.2 Organización de Componentes

#### **Componentes de Layout**
```tsx
// src/components/layout/Header.tsx
// src/components/layout/Footer.tsx
// src/components/layout/Navigation.tsx
```

#### **Componentes de UI Reutilizables**
```tsx
// src/components/ui/Button.tsx
// src/components/ui/Card.tsx
// src/components/ui/Modal.tsx
// src/components/ui/Input.tsx
```

#### **Componentes de Página**
```tsx
// src/pages/HomePage.tsx
// src/pages/CollectionsPage.tsx
// src/pages/VirtualTourPage.tsx
```

#### **Componentes Específicos**
```tsx
// src/components/artwork/ArtworkCard.tsx
// src/components/artwork/ArtworkDetail.tsx
// src/components/tour/VirtualTour360.tsx
// src/components/tour/Hotspot.tsx
```

### 3.3 Manejo de Estado

**Estado Local (Component State)**
```tsx
// Para estado simple dentro de un componente
const [isOpen, setIsOpen] = useState(false);
const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
```

**Estado Global (Context API)**
```tsx
// src/context/MuseumContext.tsx
import { createContext, useContext, useState } from 'react';

interface MuseumContextType {
  language: 'es' | 'en';
  setLanguage: (lang: 'es' | 'en') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const MuseumContext = createContext<MuseumContextType | undefined>(undefined);

export function MuseumProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <MuseumContext.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </MuseumContext.Provider>
  );
}

export const useMuseum = () => {
  const context = useContext(MuseumContext);
  if (!context) throw new Error('useMuseum must be used within MuseumProvider');
  return context;
};
```

---

## 4. Stack Tecnológico

### 4.1 Tecnologías Core

#### **React 18.3+** (Biblioteca principal)
```bash
npm install react react-dom
```

**¿Por qué React?**
- Componentes reutilizables
- Ecosistema maduro
- Excelente rendimiento
- Gran comunidad

#### **TypeScript 5+** (Tipado estático)
```bash
npm install -D typescript @types/react @types/react-dom
```

**¿Por qué TypeScript?**
- Prevención de errores en tiempo de desarrollo
- Mejor autocompletado en IDE
- Código más mantenible
- Documentación implícita

#### **Tailwind CSS 4.x** (Framework CSS)
```bash
npm install tailwindcss @tailwindcss/vite
```

**¿Por qué Tailwind?**
- Desarrollo rápido con utility classes
- Diseño consistente
- No hay CSS no utilizado en producción
- Responsive design integrado

#### **Vite** (Build tool)
```bash
npm create vite@latest museo-app -- --template react-ts
```

**¿Por qué Vite?**
- Inicio de desarrollo instantáneo
- Hot Module Replacement (HMR) rápido
- Build optimizado para producción

### 4.2 Librerías Adicionales Recomendadas

#### **Animaciones: Framer Motion**
```bash
npm install motion
```

```tsx
// Ejemplo de uso
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  <h1>Museo de Arte</h1>
</motion.div>
```

#### **Iconos: Lucide React**
```bash
npm install lucide-react
```

```tsx
import { Menu, X, Search, MapPin } from 'lucide-react';

<Menu size={24} />
<Search className="text-amber-700" />
```

#### **Formularios: React Hook Form**
```bash
npm install react-hook-form
```

```tsx
import { useForm } from 'react-hook-form';

const { register, handleSubmit, formState: { errors } } = useForm();
```

#### **Gestión de Fechas: date-fns**
```bash
npm install date-fns
```

```tsx
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

format(new Date(), 'dd MMMM yyyy', { locale: es });
```

#### **Galería de Imágenes: React Responsive Masonry**
```bash
npm install react-responsive-masonry
```

#### **HTTP Requests (Opcional): Axios**
```bash
npm install axios
```

```tsx
import axios from 'axios';

const { data } = await axios.get('https://api.museo.com/artworks');
```

### 4.3 Fuentes y Tipografía

**Google Fonts (Recomendado)**
```css
/* src/styles/fonts.css */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
```

**Fuentes Recomendadas para Museos:**
- **Títulos**: Cormorant Garamond, Playfair Display, Libre Baskerville
- **Cuerpo**: Inter, Open Sans, Lato

---

## 5. Estructura de Carpetas

### 5.1 Estructura Completa del Proyecto

```
museo-website/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── artworks/
│   │   ├── gallery/
│   │   └── icons/
│   ├── favicon.ico
│   └── manifest.json
│
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Componente raíz
│   │   └── App.css
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   └── Badge.tsx
│   │   │
│   │   ├── artwork/
│   │   │   ├── ArtworkCard.tsx
│   │   │   ├── ArtworkDetail.tsx
│   │   │   ├── ArtworkGrid.tsx
│   │   │   └── ArtworkFilter.tsx
│   │   │
│   │   ├── news/
│   │   │   ├── NewsCard.tsx
│   │   │   └── NewsDetail.tsx
│   │   │
│   │   ├── tour/
│   │   │   ├── VirtualTour360.tsx
│   │   │   ├── Hotspot.tsx
│   │   │   ├── ArtworkDetail.tsx
│   │   │   ├── NavigationControls.tsx
│   │   │   └── TourIntro.tsx
│   │   │
│   │   └── forms/
│   │       ├── ContactForm.tsx
│   │       └── NewsletterForm.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── CollectionsPage.tsx
│   │   ├── ExhibitionsPage.tsx
│   │   ├── VirtualTourPage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── CommunityPage.tsx
│   │   └── ContactPage.tsx
│   │
│   ├── hooks/
│   │   ├── useMediaQuery.ts
│   │   ├── useScrollPosition.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── context/
│   │   └── MuseumContext.tsx
│   │
│   ├── types/
│   │   ├── artwork.ts
│   │   ├── exhibition.ts
│   │   └── news.ts
│   │
│   ├── data/
│   │   ├── artworks.json
│   │   ├── exhibitions.json
│   │   └── news.json
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── cn.ts                      # Utility para classNames
│   │   └── api.ts
│   │
│   ├── styles/
│   │   ├── fonts.css
│   │   ├── theme.css
│   │   ├── tailwind.css
│   │   └── index.css
│   │
│   └── main.tsx                       # Punto de entrada
│
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

### 5.2 Explicación de Carpetas Clave

**`/public`**: Archivos estáticos accesibles públicamente
**`/src/app`**: Componente principal de la aplicación
**`/src/components`**: Todos los componentes React organizados por categoría
**`/src/pages`**: Componentes de página completa
**`/src/hooks`**: Custom hooks reutilizables
**`/src/context`**: Contextos de React para estado global
**`/src/types`**: Definiciones de TypeScript
**`/src/data`**: Datos estáticos o mock data
**`/src/utils`**: Funciones auxiliares
**`/src/styles`**: Archivos de estilos CSS

---

## 6. Diseño UI/UX

### 6.1 Principios de Diseño para Museos

1. **Elegancia y Sofisticación**: Diseño minimalista que respeta el contenido
2. **Jerarquía Visual Clara**: Contenido organizado por importancia
3. **Espacio en Blanco Generoso**: Respiración entre elementos
4. **Tipografía Legible**: Tamaños apropiados y contraste adecuado
5. **Imágenes de Alta Calidad**: Fotografías profesionales de obras
6. **Accesibilidad**: Cumplir con WCAG 2.1 AA

### 6.2 Paleta de Colores

#### **Opción 1: Museo Clásico**
```css
:root {
  /* Colores principales */
  --color-primary: #1c1917;        /* Stone 900 - Negro suave */
  --color-secondary: #78716c;      /* Stone 500 - Gris medio */
  --color-accent: #b45309;         /* Amber 700 - Dorado */
  
  /* Fondos */
  --color-background: #fafaf9;     /* Stone 50 - Blanco cálido */
  --color-surface: #ffffff;        /* Blanco puro */
  
  /* Textos */
  --color-text-primary: #1c1917;   /* Negro suave */
  --color-text-secondary: #57534e; /* Stone 600 */
  --color-text-muted: #a8a29e;     /* Stone 400 */
  
  /* Estados */
  --color-success: #16a34a;        /* Green 600 */
  --color-error: #dc2626;          /* Red 600 */
  --color-warning: #ea580c;        /* Orange 600 */
}
```

#### **Opción 2: Museo Moderno**
```css
:root {
  --color-primary: #0f172a;        /* Slate 900 */
  --color-secondary: #475569;      /* Slate 600 */
  --color-accent: #6366f1;         /* Indigo 500 */
  
  --color-background: #f8fafc;     /* Slate 50 */
  --color-surface: #ffffff;
  
  --color-text-primary: #0f172a;
  --color-text-secondary: #334155;
  --color-text-muted: #94a3b8;
}
```

### 6.3 Tipografía

#### **Sistema de Escalas**
```css
/* theme.css */
:root {
  /* Escala tipográfica */
  --text-xs: 0.75rem;      /* 12px */
  --text-sm: 0.875rem;     /* 14px */
  --text-base: 1rem;       /* 16px */
  --text-lg: 1.125rem;     /* 18px */
  --text-xl: 1.25rem;      /* 20px */
  --text-2xl: 1.5rem;      /* 24px */
  --text-3xl: 1.875rem;    /* 30px */
  --text-4xl: 2.25rem;     /* 36px */
  --text-5xl: 3rem;        /* 48px */
  --text-6xl: 3.75rem;     /* 60px */
  --text-7xl: 4.5rem;      /* 72px */
  --text-8xl: 6rem;        /* 96px */
  
  /* Pesos de fuente */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  /* Familias de fuente */
  --font-serif: 'Cormorant Garamond', Georgia, serif;
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

/* Aplicación */
h1 {
  font-family: var(--font-serif);
  font-size: var(--text-6xl);
  font-weight: var(--font-weight-light);
  line-height: 1.1;
  letter-spacing: -0.02em;
}

h2 {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-normal);
  line-height: 1.2;
}

body {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-weight-normal);
  line-height: 1.6;
}
```

### 6.4 Espaciado y Layout

```css
/* Sistema de espaciado (múltiplos de 4px) */
:root {
  --spacing-1: 0.25rem;    /* 4px */
  --spacing-2: 0.5rem;     /* 8px */
  --spacing-3: 0.75rem;    /* 12px */
  --spacing-4: 1rem;       /* 16px */
  --spacing-5: 1.25rem;    /* 20px */
  --spacing-6: 1.5rem;     /* 24px */
  --spacing-8: 2rem;       /* 32px */
  --spacing-10: 2.5rem;    /* 40px */
  --spacing-12: 3rem;      /* 48px */
  --spacing-16: 4rem;      /* 64px */
  --spacing-20: 5rem;      /* 80px */
  --spacing-24: 6rem;      /* 96px */
  --spacing-32: 8rem;      /* 128px */
  
  /* Contenedores */
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1400px;
}
```

### 6.5 Componentes UI Base

#### **Botón (Button.tsx)**
```tsx
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = ''
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 transition-colors';
  
  const variants = {
    primary: 'bg-amber-700 hover:bg-amber-600 text-white',
    secondary: 'bg-stone-200 hover:bg-stone-300 text-stone-900',
    outline: 'border-2 border-amber-700 hover:bg-amber-50 text-amber-700'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  );
}
```

#### **Card (Card.tsx)**
```tsx
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className={`
      bg-white shadow-sm overflow-hidden
      ${hover ? 'transition-shadow hover:shadow-lg' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}
```

### 6.6 Accesibilidad (A11y)

**Checklist de Accesibilidad:**

```tsx
// ✅ Contraste de colores (mínimo 4.5:1 para texto)
<p className="text-stone-900 bg-white">Texto legible</p>

// ✅ Etiquetas alt en imágenes
<img src="/artwork.jpg" alt="La Gloria Celestial - Fresco barroco del siglo XVII" />

// ✅ Labels en formularios
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ Aria labels en iconos
<button aria-label="Cerrar menú">
  <X size={24} />
</button>

// ✅ Navegación por teclado
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  tabIndex={0}
>
  Acción
</button>

// ✅ Skip links para navegación rápida
<a href="#main-content" className="sr-only focus:not-sr-only">
  Saltar al contenido principal
</a>
```

---

## 7. Diseño Responsive

### 7.1 Breakpoints de Tailwind CSS

```css
/* Tailwind CSS Breakpoints */
sm: 640px   /* Móvil grande / Tablet pequeña */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop pequeño */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

### 7.2 Estrategia Mobile-First

```tsx
// Ejemplo: Hero responsive
<section className="
  py-20 md:py-32 lg:py-40           /* Padding vertical */
  px-6 md:px-12 lg:px-24            /* Padding horizontal */
">
  <h1 className="
    text-4xl md:text-6xl lg:text-8xl /* Tamaño de texto */
    mb-6 md:mb-10                     /* Margen inferior */
  ">
    Museo de Arte Sacro
  </h1>
  
  <div className="
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  /* Grid responsive */
    gap-6 md:gap-10 lg:gap-16                       /* Gap entre items */
  ">
    {/* Cards */}
  </div>
</section>
```

### 7.3 Imágenes Responsive

```tsx
// Picture element para diferentes resoluciones
<picture>
  <source
    media="(min-width: 1024px)"
    srcSet="/images/hero-desktop.jpg"
  />
  <source
    media="(min-width: 768px)"
    srcSet="/images/hero-tablet.jpg"
  />
  <img
    src="/images/hero-mobile.jpg"
    alt="Interior del museo"
    className="w-full h-auto object-cover"
  />
</picture>
```

### 7.4 Custom Hook para Media Queries

```tsx
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);

    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

// Uso:
const isMobile = useMediaQuery('(max-width: 768px)');
const isDesktop = useMediaQuery('(min-width: 1024px)');
```

---

## 8. Funcionalidades Clave

### 8.1 Sistema de Navegación

#### **Header con Navegación Sticky**

```tsx
// components/layout/Header.tsx
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Historia', href: '#historia' },
    { label: 'Colecciones', href: '#colecciones' },
    { label: 'Recorrido 360', href: '#recorrido' },
    { label: 'Contacto', href: '#contacto' }
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200"
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#inicio" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-700 flex items-center justify-center text-white">
            M
          </div>
          <span className="hidden sm:block text-lg" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Museo de Arte
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="text-sm text-stone-700 hover:text-amber-700 transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-amber-700 transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-20 left-0 right-0 bg-white border-b border-stone-200 lg:hidden"
            >
              <ul className="py-6 px-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <a
                      href={item.href}
                      className="block py-3 text-stone-700 hover:text-amber-700"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
```

### 8.2 Galería de Obras de Arte

#### **Componente de Card de Obra**

```tsx
// components/artwork/ArtworkCard.tsx
import { motion } from 'motion/react';

interface ArtworkCardProps {
  id: number;
  title: string;
  artist: string;
  year: string;
  image: string;
  onClick: () => void;
}

export function ArtworkCard({ title, artist, year, image, onClick }: ArtworkCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      {/* Imagen */}
      <div className="aspect-[3/4] overflow-hidden bg-stone-100 mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Info */}
      <div>
        <h3 className="text-xl mb-2 group-hover:text-amber-700 transition-colors"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          {title}
        </h3>
        <p className="text-sm text-stone-600">{artist}</p>
        <p className="text-sm text-stone-500">{year}</p>
      </div>
    </motion.article>
  );
}
```

#### **Grid de Obras con Filtros**

```tsx
// components/artwork/ArtworkGrid.tsx
import { useState } from 'react';
import { ArtworkCard } from './ArtworkCard';
import { ArtworkDetail } from './ArtworkDetail';

interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  period: string;
  image: string;
  description: string;
}

export function ArtworkGrid({ artworks }: { artworks: Artwork[] }) {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const periods = ['all', 'Barroco', 'Renacentista', 'Contemporáneo'];

  const filteredArtworks = filter === 'all'
    ? artworks
    : artworks.filter(art => art.period === filter);

  return (
    <section className="py-20">
      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-12">
        {periods.map((period) => (
          <button
            key={period}
            onClick={() => setFilter(period)}
            className={`
              px-6 py-2 transition-colors
              ${filter === period
                ? 'bg-amber-700 text-white'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }
            `}
          >
            {period === 'all' ? 'Todas' : period}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredArtworks.map((artwork) => (
          <ArtworkCard
            key={artwork.id}
            {...artwork}
            onClick={() => setSelectedArtwork(artwork)}
          />
        ))}
      </div>

      {/* Modal de Detalle */}
      {selectedArtwork && (
        <ArtworkDetail
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
        />
      )}
    </section>
  );
}
```

### 8.3 Recorrido Virtual 360°

#### **Componente Principal**

```tsx
// components/tour/VirtualTour360.tsx
import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Hotspot } from './Hotspot';
import { ArtworkDetail } from './ArtworkDetail';

const artworks = [
  {
    id: 1,
    title: 'La Gloria Celestial',
    artist: 'Maestro Barroco',
    year: '1680',
    image: '/artworks/gloria.jpg',
    description: '...',
    hotspotX: 25,
    hotspotY: 35
  },
  // ... más obras
];

export function VirtualTour360() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;
    setPosition({ x: newX, y: Math.max(Math.min(newY, 50), -50) });
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-stone-950">
      {/* 360 View */}
      <div
        className={isDragging ? 'cursor-grabbing' : 'cursor-grab'}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setIsDragging(false)}
      >
        <motion.div style={{ x: position.x, y: position.y }}>
          {/* Imagen de fondo 360° */}
          <img
            src="/gallery-360.jpg"
            alt="Galería 360°"
            className="w-full h-full object-cover select-none"
            draggable={false}
          />

          {/* Hotspots */}
          {artworks.map((artwork) => (
            <Hotspot
              key={artwork.id}
              x={artwork.hotspotX}
              y={artwork.hotspotY}
              title={artwork.title}
              onClick={() => setSelectedArtwork(artwork)}
            />
          ))}
        </motion.div>
      </div>

      {/* Modal de Obra */}
      <ArtworkDetail
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
      />
    </div>
  );
}
```

### 8.4 Formulario de Contacto

```tsx
// components/forms/ContactForm.tsx
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function ContactForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulación de envío (reemplazar con API real)
    setTimeout(() => {
      console.log('Form data:', data);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      {/* Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm mb-2">
          Nombre completo *
        </label>
        <input
          id="name"
          {...register('name', { required: 'El nombre es requerido' })}
          className={`
            w-full px-4 py-3 border bg-white
            ${errors.name ? 'border-red-500' : 'border-stone-300'}
            focus:outline-none focus:ring-2 focus:ring-amber-700
          `}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'El email es requerido',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email inválido'
            }
          })}
          className={`
            w-full px-4 py-3 border bg-white
            ${errors.email ? 'border-red-500' : 'border-stone-300'}
            focus:outline-none focus:ring-2 focus:ring-amber-700
          `}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Asunto */}
      <div>
        <label htmlFor="subject" className="block text-sm mb-2">
          Asunto *
        </label>
        <select
          id="subject"
          {...register('subject', { required: 'Selecciona un asunto' })}
          className="w-full px-4 py-3 border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-700"
        >
          <option value="">Selecciona una opción</option>
          <option value="general">Consulta general</option>
          <option value="visita">Planear una visita</option>
          <option value="exposicion">Información sobre exposición</option>
          <option value="otro">Otro</option>
        </select>
        {errors.subject && (
          <p className="text-red-600 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Mensaje */}
      <div>
        <label htmlFor="message" className="block text-sm mb-2">
          Mensaje *
        </label>
        <textarea
          id="message"
          rows={6}
          {...register('message', { required: 'El mensaje es requerido' })}
          className={`
            w-full px-4 py-3 border bg-white
            ${errors.message ? 'border-red-500' : 'border-stone-300'}
            focus:outline-none focus:ring-2 focus:ring-amber-700
          `}
        />
        {errors.message && (
          <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-amber-700 hover:bg-amber-600 text-white transition-colors disabled:bg-stone-400"
      >
        {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {/* Success Message */}
      {submitSuccess && (
        <div className="p-4 bg-green-100 text-green-800 border border-green-200">
          ¡Mensaje enviado con éxito! Te responderemos pronto.
        </div>
      )}
    </form>
  );
}
```

---

## 9. Manejo de Contenido

### 9.1 Estructura de Datos (TypeScript)

```tsx
// types/artwork.ts
export interface Artwork {
  id: number;
  title: string;
  artist: string;
  year: string;
  period: 'Barroco' | 'Renacentista' | 'Contemporáneo';
  medium: string;
  dimensions: string;
  description: string;
  image: string;
  gallery?: string;
}

// types/exhibition.ts
export interface Exhibition {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  image: string;
  artworks: number[]; // IDs de obras
  status: 'upcoming' | 'current' | 'past';
}

// types/news.ts
export interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  category: 'exhibition' | 'workshop' | 'conference' | 'general';
  image: string;
}
```

### 9.2 Datos Estáticos (JSON)

```json
// data/artworks.json
[
  {
    "id": 1,
    "title": "La Gloria Celestial",
    "artist": "Maestro Anónimo Barroco",
    "year": "1680-1690",
    "period": "Barroco",
    "medium": "Fresco sobre bóveda",
    "dimensions": "450 x 620 cm",
    "description": "Magnífico fresco barroco que representa la ascensión celestial...",
    "image": "/artworks/gloria-celestial.jpg",
    "gallery": "Sala Principal"
  },
  {
    "id": 2,
    "title": "Madonna con el Niño",
    "artist": "Escuela Renacentista",
    "year": "1520",
    "period": "Renacentista",
    "medium": "Óleo sobre tabla",
    "dimensions": "95 x 120 cm",
    "description": "Representación clásica de la Virgen María...",
    "image": "/artworks/madonna.jpg",
    "gallery": "Sala del Renacimiento"
  }
]
```

### 9.3 Hook para Cargar Datos

```tsx
// hooks/useArtworks.ts
import { useState, useEffect } from 'react';
import artworksData from '../data/artworks.json';
import { Artwork } from '../types/artwork';

export function useArtworks() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Simulación de carga asíncrona
      setTimeout(() => {
        setArtworks(artworksData as Artwork[]);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Error al cargar las obras');
      setLoading(false);
    }
  }, []);

  return { artworks, loading, error };
}
```

### 9.4 Integración con API Externa (Opcional)

```tsx
// utils/api.ts
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Funciones de API
export const artworkService = {
  getAll: () => api.get('/artworks'),
  getById: (id: number) => api.get(`/artworks/${id}`),
  search: (query: string) => api.get(`/artworks/search?q=${query}`)
};

export const exhibitionService = {
  getCurrent: () => api.get('/exhibitions/current'),
  getUpcoming: () => api.get('/exhibitions/upcoming')
};

// Hook de ejemplo
import { useState, useEffect } from 'react';

export function useArtworksFromAPI() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    artworkService.getAll()
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
```

---

## 10. Animaciones e Interactividad

### 10.1 Animaciones con Framer Motion

#### **Animación de Entrada (Fade In Up)**

```tsx
import { motion } from 'motion/react';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }
};

<motion.div {...fadeInUp}>
  <h2>Título con animación</h2>
</motion.div>
```

#### **Stagger Children (Animación en Cascada)**

```tsx
const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.15 } },
  viewport: { once: true }
};

const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

<motion.div {...staggerContainer} className="grid grid-cols-3 gap-8">
  {items.map((item, i) => (
    <motion.div key={i} {...staggerItem}>
      <Card>{item}</Card>
    </motion.div>
  ))}
</motion.div>
```

#### **Scroll-Linked Animation**

```tsx
import { useScroll, useTransform, motion } from 'motion/react';

function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div style={{ y, opacity }}>
      <img src="/bg.jpg" alt="Background" />
    </motion.div>
  );
}
```

### 10.2 Transiciones de Página

```tsx
import { motion, AnimatePresence } from 'motion/react';

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 10.3 Hover Effects

```css
/* Zoom en imágenes */
.image-container {
  overflow: hidden;
}

.image-container img {
  transition: transform 0.7s ease;
}

.image-container:hover img {
  transform: scale(1.05);
}

/* Underline animado */
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-accent);
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
```

---

## 11. Optimización de Rendimiento

### 11.1 Lazy Loading de Imágenes

```tsx
// Componente de Imagen con Lazy Loading
function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
    />
  );
}
```

### 11.2 Code Splitting con React.lazy

```tsx
import { lazy, Suspense } from 'react';

// Lazy load de páginas
const VirtualTourPage = lazy(() => import('./pages/VirtualTourPage'));
const CollectionsPage = lazy(() => import('./pages/CollectionsPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/tour" element={<VirtualTourPage />} />
        <Route path="/collections" element={<CollectionsPage />} />
      </Routes>
    </Suspense>
  );
}
```

### 11.3 Optimización de Imágenes

```bash
# Instalar plugin de optimización
npm install vite-plugin-imagemin -D
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imagemin from 'vite-plugin-imagemin';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9], speed: 4 },
      svgo: {
        plugins: [
          { name: 'removeViewBox' },
          { name: 'removeEmptyAttrs', active: false }
        ]
      }
    })
  ]
});
```

### 11.4 Memoization

```tsx
import { memo, useMemo } from 'react';

// Memo en componentes
const ArtworkCard = memo(({ artwork }: { artwork: Artwork }) => {
  return (
    <div>
      <h3>{artwork.title}</h3>
      <p>{artwork.artist}</p>
    </div>
  );
});

// useMemo para cálculos costosos
function ArtworkList({ artworks, filter }: Props) {
  const filteredArtworks = useMemo(() => {
    return artworks.filter(art => art.period === filter);
  }, [artworks, filter]);

  return (
    <div>
      {filteredArtworks.map(art => <ArtworkCard key={art.id} artwork={art} />)}
    </div>
  );
}
```

---

## 12. SEO Básico

### 12.1 Meta Tags Esenciales

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- SEO Básico -->
  <title>Museo de Arte Religioso | Colecciones Barrocas y Renacentistas</title>
  <meta name="description" content="Explora nuestra colección de arte sacro con obras barrocas y renacentistas. Visita virtual 360°, exposiciones temporales y eventos culturales." />
  <meta name="keywords" content="museo, arte religioso, barroco, renacimiento, galería, exposiciones" />
  <meta name="author" content="Museo de Arte Religioso" />
  
  <!-- Open Graph (Facebook) -->
  <meta property="og:title" content="Museo de Arte Religioso" />
  <meta property="og:description" content="Descubre siglos de arte sacro en nuestro museo" />
  <meta property="og:image" content="https://museo.com/og-image.jpg" />
  <meta property="og:url" content="https://museo.com" />
  <meta property="og:type" content="website" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Museo de Arte Religioso" />
  <meta name="twitter:description" content="Explora nuestra colección de arte sacro" />
  <meta name="twitter:image" content="https://museo.com/twitter-card.jpg" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://museo.com" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
</html>
```

### 12.2 Estructura Semántica HTML5

```tsx
// Ejemplo de estructura semántica
<body>
  <a href="#main-content" className="sr-only focus:not-sr-only">
    Saltar al contenido principal
  </a>
  
  <header role="banner">
    <nav aria-label="Navegación principal">
      {/* Navegación */}
    </nav>
  </header>
  
  <main id="main-content" role="main">
    <article>
      <header>
        <h1>Título de la página</h1>
      </header>
      <section aria-labelledby="exposiciones">
        <h2 id="exposiciones">Exposiciones</h2>
        {/* Contenido */}
      </section>
    </article>
  </main>
  
  <aside role="complementary" aria-label="Información adicional">
    {/* Sidebar */}
  </aside>
  
  <footer role="contentinfo">
    {/* Footer */}
  </footer>
</body>
```

### 12.3 Schema.org (JSON-LD)

```tsx
// Componente para Schema.org
function MuseumSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Museum",
    "name": "Museo de Arte Religioso",
    "description": "Colección de arte sacro barroco y renacentista",
    "image": "https://museo.com/image.jpg",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calle Principal 123",
      "addressLocality": "Ciudad",
      "addressRegion": "Estado",
      "postalCode": "00000",
      "addressCountry": "MX"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "19.432608",
      "longitude": "-99.133209"
    },
    "url": "https://museo.com",
    "telephone": "+52-123-456-7890",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 12.4 Sitemap.xml

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://museo.com/</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://museo.com/colecciones</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://museo.com/exposiciones</loc>
    <lastmod>2026-04-21</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

---

## 13. Despliegue

### 13.1 Preparación para Producción

```bash
# Compilar para producción
npm run build

# Preview del build localmente
npm run preview
```

### 13.2 Despliegue en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

**Archivo de configuración (vercel.json):**
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### 13.3 Despliegue en Netlify

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Deploy a producción
netlify deploy --prod
```

**Archivo de configuración (netlify.toml):**
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### 13.4 Variables de Entorno

```bash
# .env.local
VITE_API_URL=https://api.museo.com
VITE_GOOGLE_MAPS_KEY=your_key_here
VITE_GA_TRACKING_ID=UA-XXXXX-X
```

```tsx
// Uso en código
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## 14. Buenas Prácticas

### 14.1 Convenciones de Código

#### **Nombres de Archivos**
- Componentes: `PascalCase.tsx` (ej: `ArtworkCard.tsx`)
- Hooks: `camelCase.ts` (ej: `useArtworks.ts`)
- Utilidades: `camelCase.ts` (ej: `formatDate.ts`)
- Tipos: `camelCase.ts` (ej: `artwork.ts`)

#### **Nombres de Componentes**
```tsx
// ✅ Bueno
export function ArtworkCard() { }

// ❌ Evitar
export default function() { }
```

#### **Organización de Imports**
```tsx
// 1. Imports de React
import { useState, useEffect } from 'react';

// 2. Imports de librerías externas
import { motion } from 'motion/react';
import { format } from 'date-fns';

// 3. Imports de componentes locales
import { Header } from './components/layout/Header';
import { ArtworkCard } from './components/artwork/ArtworkCard';

// 4. Imports de tipos
import type { Artwork } from './types/artwork';

// 5. Imports de estilos
import './styles/main.css';
```

### 14.2 TypeScript Best Practices

```tsx
// ✅ Definir tipos explícitos
interface ArtworkCardProps {
  artwork: Artwork;
  onClick: (id: number) => void;
}

// ✅ Usar tipos de retorno en funciones
function formatArtworkDate(date: Date): string {
  return format(date, 'dd MMMM yyyy');
}

// ✅ Evitar 'any'
// ❌ const data: any = response.data;
// ✅ const data: Artwork[] = response.data;

// ✅ Usar tipos genéricos
function createArray<T>(items: T[]): T[] {
  return [...items];
}
```

### 14.3 Performance Best Practices

```tsx
// ✅ Evitar re-renders innecesarios
const ArtworkCard = memo(({ artwork }) => { ... });

// ✅ Memoizar cálculos costosos
const filteredArtworks = useMemo(
  () => artworks.filter(/* ... */),
  [artworks, filterValue]
);

// ✅ useCallback para funciones pasadas como props
const handleClick = useCallback(() => {
  setSelected(artwork.id);
}, [artwork.id]);

// ✅ Lazy loading de componentes pesados
const VirtualTour = lazy(() => import('./components/tour/VirtualTour360'));
```

### 14.4 Accesibilidad Best Practices

```tsx
// ✅ Contraste de colores adecuado
<p className="text-stone-900 bg-white">Texto legible</p>

// ✅ Alt text descriptivo
<img src="/artwork.jpg" alt="La Gloria Celestial - Fresco barroco del siglo XVII" />

// ✅ ARIA labels
<button aria-label="Cerrar modal">
  <X size={24} />
</button>

// ✅ Focus visible
<a href="#" className="focus:outline-none focus:ring-2 focus:ring-amber-700">
  Link
</a>

// ✅ Navegación por teclado
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Acción
</button>
```

### 14.5 Git Best Practices

```bash
# Commits semánticos
git commit -m "feat: añadir recorrido virtual 360"
git commit -m "fix: corregir scroll en modal de obra"
git commit -m "style: actualizar paleta de colores"
git commit -m "docs: actualizar README"
git commit -m "refactor: reorganizar componentes de layout"

# Branches descriptivos
git checkout -b feature/virtual-tour
git checkout -b fix/modal-scroll
git checkout -b refactor/component-structure
```

---

## 15. Checklist Final

### ✅ Pre-lanzamiento

#### **Funcionalidad**
- [ ] Todas las páginas funcionan correctamente
- [ ] Navegación entre secciones fluida
- [ ] Formularios validados y funcionales
- [ ] Recorrido 360° operativo
- [ ] Galería de obras con filtros
- [ ] Responsive en todos los dispositivos
- [ ] Compatibilidad cross-browser (Chrome, Firefox, Safari, Edge)

#### **Performance**
- [ ] Imágenes optimizadas
- [ ] Lazy loading implementado
- [ ] Code splitting configurado
- [ ] Tiempo de carga < 3 segundos
- [ ] Build de producción optimizado

#### **SEO**
- [ ] Meta tags configurados
- [ ] Sitemap.xml creado
- [ ] Robots.txt configurado
- [ ] Schema.org implementado
- [ ] URLs amigables
- [ ] Canonical tags

#### **Accesibilidad**
- [ ] Contraste de colores WCAG AA
- [ ] Alt text en todas las imágenes
- [ ] ARIA labels en iconos
- [ ] Navegación por teclado
- [ ] Skip links implementados
- [ ] Focus indicators visibles

#### **Seguridad**
- [ ] HTTPS configurado
- [ ] Headers de seguridad
- [ ] Validación de formularios
- [ ] No hay datos sensibles expuestos

#### **Testing**
- [ ] Pruebas en diferentes dispositivos
- [ ] Pruebas en diferentes navegadores
- [ ] Pruebas de rendimiento (Lighthouse)
- [ ] Pruebas de accesibilidad

---

## 📚 Recursos Adicionales

### Documentación Oficial
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Herramientas de Desarrollo
- [Vite](https://vitejs.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Lucide Icons](https://lucide.dev/)

### Optimización y Performance
- [web.dev](https://web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)

### Accesibilidad
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [a11y Project](https://www.a11yproject.com/)

### Despliegue
- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)

---

**Versión**: 1.0.0  
**Última actualización**: 21 de abril de 2026  
**Autor**: Equipo de Desarrollo

---

Este documento proporciona una guía completa para el desarrollo de un sitio web de museo moderno, elegante y funcional. Sigue estos pasos y mejores prácticas para crear una experiencia digital excepcional. 🎨✨
