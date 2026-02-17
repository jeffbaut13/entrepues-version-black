/**
 * Constantes de rutas de la aplicación
 * Usar en lugar de hardcodear strings en toda la app
 */

export const ROUTES = {
  HOME: "/",
  MENU: "/carta",
  MENU_MOBILE: "/cartam",
  LOCATION: "/ubicacion",
  VIDEO_360: "/descubrenos",
  ADMIN: "/admin",
  ADMIN_RESERVAS: "/admin/reservas",
  ADMIN_CONFIG: "/admin/configuracion",
  ADMIN_STORAGE: "/admin/storage",
};

/**
 * Títulos de páginas para SEO/documentación
 */
export const PAGE_TITLES = {
  HOME: "Entrepues - Todas las regiones a tu mesa",
  MENU: "Carta - Entrepues",
  LOCATION: "Ubicacion - Entrepues",
  VIDEO_360: "Descúbrenos - Entrepues",
};

/**
 * Configuración de responsive
 */
export const BREAKPOINTS = {
  MOBILE: 768, // Breakpoint para cambiar entre mobile y desktop
};

/**
 * Configuración de animaciones
 */
export const ANIMATION_DELAYS = {
  MENU_INTRO: 2500,
  CONTENT_FADE: 2.3,
};
