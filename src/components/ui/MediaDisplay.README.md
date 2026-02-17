# MediaDisplay Component 🎥📸

Componente React reutilizable para mostrar videos con fallback automático a imágenes.

## ✨ Características

### 🔍 **Auto-detección inteligente**
- Verifica automáticamente si el video existe
- Fallback suave a imagen si no hay video
- Manejo de errores robusto

### 🎬 **Control total del video**
- AutoPlay, controles, muted, loop configurables
- Soporte para poster/thumbnail
- Optimizado para móviles (playsInline)

### 🎭 **Animaciones integradas**
- Presets de animaciones predefinidas
- Animaciones personalizables con Framer Motion
- Estados de carga con indicador visual

### 📱 **Responsive y accesible**
- Clases CSS totalmente customizables
- Lazy loading para imágenes
- Textos alternativos apropiados

## 🚀 Instalación

```jsx
import { MediaDisplay } from '../path/to/MediaDisplay';
```

## 📋 Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `videoSrc` | string | - | Ruta del archivo de video |
| `imageSrc` | string | - | Ruta de la imagen fallback |
| `alt` | string | "Media content" | Texto alternativo |
| `className` | string | estilos base | Clases CSS personalizadas |
| `autoPlay` | boolean | true | Auto-reproducir video |
| `controls` | boolean | false | Mostrar controles |
| `muted` | boolean | true | Video silenciado |
| `loop` | boolean | true | Repetir video |
| `animated` | boolean | true | Aplicar animaciones |
| `animationVariants` | object | fadeIn | Variantes Framer Motion |
| `posterImage` | string | null | Imagen de poster |

## 🎯 Casos de uso

- **Hero sections** con video de fondo
- **Galerías de productos** con videos promocionales  
- **Testimoniales** en video
- **Menús de restaurante** con videos de platos
- **Portfolios** con contenido multimedia
- **Carruseles** mixtos video/imagen

## 🏗️ Arquitectura

```
MediaDisplay/
├── Estado de carga
├── Detección de video
├── Manejo de errores
├── Renderizado condicional
└── Animaciones opcionales
```

## 🔧 Extensibilidad

- Fácil de tematizar con Tailwind CSS
- Compatible con cualquier librería de estilos
- Eventos de video configurables
- Presets de animación expandibles

## 💡 Tips de rendimiento

1. **Preload videos** importantes para UX fluida
2. **Usa poster images** para carga más rápida
3. **Lazy loading** está habilitado por defecto
4. **Comprime videos** para web (WebM, H.264)

## 🛡️ Manejo de errores

- Fallback automático video → imagen
- Placeholder en caso de error de imagen
- Logs informativos en consola
- Estados de carga visibles

¡Perfecto para cualquier aplicación que necesite contenido multimedia adaptativo! 🎉